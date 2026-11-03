// Owner back office: separate address, password login, session cookie.
import ADMIN_HTML from "../web/admin.html";
import { q, tx, json, html, route, dispatch, readJson, bad, HttpError, clientIp, rateLimit, getSettings, loadProducts, SIZES, stockOf,
  str, normPhone, validPhone, hashPassword, verifyPassword, sha256, randToken, presignGet, putObject, publicUrl, sniffFile, sendOrderEmail, audit, DEFAULT_SETTINGS } from "./lib.js";

const CSP0 = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: blob: __IMG__ __S3__; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";
const origin = (u) => { try { return new URL(u).origin; } catch { return ""; } };
const CSP = () => CSP0.replace("__IMG__", origin(process.env.IMG_BASE)).replace("__S3__", origin(process.env.AWS_ENDPOINT_URL_S3));
const COOKIE = "__Host-gb_admin";
const SESSION_HOURS = 12;

function cookieOf(req, name) {
  const c = req.headers.get("cookie") || ""; for (const p of c.split(/;\s*/)) { const i = p.indexOf("="); if (p.slice(0, i) === name) return p.slice(i + 1); } return null;
}
async function currentAdmin(req) {
  const tok = cookieOf(req, COOKIE); if (!tok || tok.length > 100) return null;
  const r = await q("select s.admin_id, u.username from admin_sessions s join admin_users u on u.id = s.admin_id where s.token_hash = $1 and s.expires_at > now()", [sha256(tok)]);
  return r.rows[0] || null;
}
// Every state-changing call must come from our own page (same origin + custom header) and a live session.
async function guard(req, c) {
  if (req.method !== "GET") {
    const origin = req.headers.get("origin"); const self = new URL(req.url).origin;
    if (origin && origin !== self) throw new HttpError(403, "Request blocked.");
    if (req.headers.get("x-gb") !== "1") throw new HttpError(403, "Request blocked.");
  }
  const a = await currentAdmin(req); if (!a) throw new HttpError(401, "Please sign in again.");
  c.admin = a; return a;
}
const A = (fn) => async (req, c) => { await guard(req, c); return fn(req, c); };

async function loadOrder(db, id) {
  const r = await db.query("select * from orders where id = $1 for update", [id]); if (!r.rows[0]) throw new HttpError(404, "Order not found."); return r.rows[0];
}
async function moveStock(db, items, dir) {
  for (const i of items) {
    const r = await db.query("select data from products where id = $1 for update", [i.pid]); if (!r.rows[0]) continue;
    const d = r.rows[0].data; const v = stockOf(d, i.ck, i.size); if (v === null) continue;
    d.stock[i.ck][i.size] = Math.max(0, v + dir * i.qty);
    await db.query("update products set data = $2, updated_at = now() where id = $1", [i.pid, d]);
  }
}
const pushLog = (o, st, extra) => JSON.stringify([...(o.log || []), { st, at: Date.now(), ...(extra || {}) }]);
const SETTINGS_KEYS = ["banner", "codes", "instagram", "whatsapp", "bank", "drivers", "pointsPer", "setDeal", "lowStock", "storeEmail"];

const routes = [
  [route("GET", "/"), async () => html(ADMIN_HTML.replace("__CONFIG__", JSON.stringify({ img: process.env.IMG_BASE || "", shop: process.env.SHOP_URL || "" })), CSP(), { "x-robots-tag": "noindex, nofollow" })],
  [route("POST", "/api/login"), async (req, c) => {
    const origin = req.headers.get("origin"); if (origin && origin !== new URL(req.url).origin) throw new HttpError(403, "Request blocked.");
    await rateLimit("login-ip:" + c.ip, 8, 900);
    const b = await readJson(req, 2000);
    const user = String(b.username || "").trim().toLowerCase().slice(0, 60);
    await rateLimit("login-user:" + user, 10, 900);
    const r = await q("select id, pass_hash from admin_users where username = $1", [user]);
    const ok = r.rows[0] ? verifyPassword(String(b.password || ""), r.rows[0].pass_hash) : (verifyPassword("x", "scrypt$AAAAAAAAAAAAAAAAAAAAAA==$" + "A".repeat(86)), false);
    if (!ok) { await audit(user, "login_failed", { ip: c.ip }); throw new HttpError(401, "Wrong username or password."); }
    const tok = randToken(32);
    await q("insert into admin_sessions (token_hash, admin_id, expires_at, ip) values ($1, $2, now() + make_interval(hours => $3), $4)", [sha256(tok), r.rows[0].id, SESSION_HOURS, c.ip]);
    await q("delete from admin_sessions where expires_at < now()");
    await audit(user, "login", { ip: c.ip });
    return json({ ok: true }, 200, { "set-cookie": `${COOKIE}=${tok}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}` });
  }],
  [route("POST", "/api/logout"), async (req) => {
    const tok = cookieOf(req, COOKIE); if (tok) await q("delete from admin_sessions where token_hash = $1", [sha256(tok)]);
    return json({ ok: true }, 200, { "set-cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` });
  }],
  [route("GET", "/api/me"), async (req) => { const a = await currentAdmin(req); return a ? json({ user: a.username }) : json({ error: "Signed out" }, 401); }],
  [route("POST", "/api/password"), A(async (req, c) => {
    const b = await readJson(req, 2000);
    const r = await q("select pass_hash from admin_users where id = $1", [c.admin.admin_id]);
    if (!verifyPassword(String(b.current || ""), r.rows[0].pass_hash)) bad("Your current password is wrong.");
    const n = String(b.next || ""); if (n.length < 12) bad("Use at least 12 characters for the new password.");
    await q("update admin_users set pass_hash = $2 where id = $1", [c.admin.admin_id, hashPassword(n)]);
    await q("delete from admin_sessions where admin_id = $1 and token_hash <> $2", [c.admin.admin_id, sha256(cookieOf(req, COOKIE))]);
    await audit(c.admin.username, "password_changed");
    return json({ ok: true });
  })],

  [route("GET", "/api/state"), A(async () => {
    const [settings, products, costs, orders, reviews, suppliers, pos, notify, bonus, subs] = await Promise.all([
      getSettings(), loadProducts(true), q("select product_id, cost from product_costs"),
      q("select * from orders order by created_at desc limit 1000"),
      q("select * from reviews order by created_at desc limit 1000"),
      q("select * from suppliers order by id"), q("select * from purchase_orders order by created_at desc limit 300"),
      q("select product_id, ck, size, count(*)::int n from notify_requests group by 1,2,3"),
      q("select * from customer_bonus"), q("select count(*)::int n from subscribers")]);
    return json({
      settings, products,
      costs: Object.fromEntries(costs.rows.map(r => [r.product_id, { cost: Number(r.cost) }])),
      orders: orders.rows.map(o => ({ ...o, at: new Date(o.created_at).getTime() })),
      reviews: reviews.rows, suppliers: suppliers.rows, pos: pos.rows.map(p => ({ ...p.data, id: p.id, status: p.status, created: new Date(p.created_at).getTime() })),
      notify: notify.rows, bonus: Object.fromEntries(bonus.rows.map(b => [b.phone, b.points])), subscribers: subs.rows[0].n,
    });
  })],
  [route("GET", "/api/orders/:id/receipt"), A(async (req, c) => {
    const r = await q("select receipt_key from orders where id = $1", [c.params.id]);
    if (!r.rows[0]?.receipt_key) throw new HttpError(404, "No receipt for this order.");
    await audit(c.admin.username, "receipt_viewed", { id: c.params.id });
    return new Response(null, { status: 302, headers: { location: await presignGet("private", r.rows[0].receipt_key, 300), "cache-control": "no-store" } });
  })],
  [route("POST", "/api/orders/:id/verify"), A(async (req, c) => {
    const o = await tx(async db => {
      const o = await loadOrder(db, c.params.id);
      if (o.status !== "review") bad("This order has already been handled.");
      if (!o.stock_out) await moveStock(db, o.items, -1);
      const r = await db.query("update orders set paid=true, pay_status='verified', status='confirmed', stock_out=true, verified_at=now(), log=$2 where id=$1 returning *", [o.id, pushLog(o, "confirmed", { by: c.admin.username })]);
      return r.rows[0];
    });
    await audit(c.admin.username, "payment_verified", { id: o.id, total: o.total });
    const e = await sendOrderEmail(o, "confirmed").catch(() => ({ ok: false }));
    return json({ ok: true, email: e });
  })],
  [route("POST", "/api/orders/:id/reject"), A(async (req, c) => {
    const b = await readJson(req);
    const reason = str(b.reason, 300, "reason", false) || "The receipt didn't match a payment in our account.";
    const r = await q("update orders set pay_status='rejected', reject_reason=$2 where id=$1 and status='review' returning *", [c.params.id, reason]);
    if (!r.rows[0]) bad("This order isn't waiting for payment.");
    await audit(c.admin.username, "receipt_rejected", { id: c.params.id });
    sendOrderEmail(r.rows[0], "rejected").catch(() => {});
    return json({ ok: true });
  })],
  [route("POST", "/api/orders/:id/dispatch"), A(async (req, c) => {
    const b = await readJson(req);
    const phone = normPhone(b.phone); if (!validPhone(phone)) bad("Enter the driver's 7-digit number.");
    const driver = { name: str(b.name, 60, "driver's name"), phone, vehicle: str(b.vehicle, 40, "vehicle", false), fare: Math.max(0, Math.min(5000, Number(b.fare) || 0)), ref: str(b.ref, 80, "trip note", false), at: Date.now() };
    const o = await tx(async db => {
      const o = await loadOrder(db, c.params.id);
      if (!["confirmed", "shipped"].includes(o.status)) bad("Verify the payment before dispatching.");
      return (await db.query("update orders set driver=$2, status='shipped', log=$3 where id=$1 returning *", [o.id, driver, pushLog(o, "shipped", { driver: driver.name })])).rows[0];
    });
    if (b.save) {
      await tx(async db => { const s = await db.query("select data from settings where id=1 for update"); const d = s.rows[0].data || {};
        const list = d.drivers || []; if (!list.some(x => x.phone === phone)) { list.push({ name: driver.name, phone, vehicle: driver.vehicle, fare: driver.fare }); d.drivers = list; await db.query("update settings set data=$1, updated_at=now() where id=1", [d]); } });
    }
    sendOrderEmail(o, "shipped").catch(() => {});
    return json({ ok: true });
  })],
  [route("POST", "/api/orders/:id/status"), A(async (req, c) => {
    const b = await readJson(req); const st = b.status;
    if (!["delivered", "cancelled", "confirmed"].includes(st)) bad("Unknown status.");
    const o = await tx(async db => {
      const o = await loadOrder(db, c.params.id);
      const allowed = { delivered: ["shipped"], cancelled: ["review", "confirmed"], confirmed: ["shipped"] }[st];
      if (!allowed.includes(o.status)) bad("That change isn't allowed for this order.");
      if (st === "cancelled" && o.stock_out) await moveStock(db, o.items, +1);
      return (await db.query(`update orders set status=$2, ${st === "cancelled" ? "stock_out=false," : ""} ${st === "delivered" ? "delivered_at=now()," : ""} log=$3 where id=$1 returning *`, [o.id, st, pushLog(o, st, { by: c.admin.username })])).rows[0];
    });
    await audit(c.admin.username, "order_" + st, { id: o.id });
    if (st === "delivered") sendOrderEmail(o, "delivered").catch(() => {});
    return json({ ok: true });
  })],
  [route("POST", "/api/orders/:id/resolve"), A(async (req, c) => {
    const b = await readJson(req); const st = b.status;
    if (!["approved", "resolved", "rejected"].includes(st)) bad("Unknown decision.");
    await tx(async db => {
      const o = await loadOrder(db, c.params.id); if (!o.request || o.request.status !== "open") bad("There's no open request on this order.");
      const amt = st === "approved" ? Math.max(0, Math.min(o.total, Math.round(Number(b.amount) || 0))) : 0;
      const note = str(b.note, 300, "note", false) || ({ approved: "Your refund has been approved.", resolved: "We've sorted this for you.", rejected: "We couldn't approve this request." })[st];
      const request = { ...o.request, status: st, resolution: note, refundAmount: amt || undefined, closedAt: Date.now() };
      await db.query(`update orders set request=$2, refunded=$3, status = case when $3 >= total then 'refunded' else status end where id=$1`, [o.id, request, amt || o.refunded]);
    });
    await audit(c.admin.username, "request_" + st, { id: c.params.id, amount: b.amount });
    return json({ ok: true });
  })],

  [route("POST", "/api/products/:id"), A(async (req, c) => {
    const b = await readJson(req, 60000);
    await tx(async db => {
      const r = await db.query("select data from products where id=$1 for update", [c.params.id]); if (!r.rows[0]) throw new HttpError(404, "Product not found.");
      const d = r.rows[0].data;
      if (b.price !== undefined) { const p = Math.round(Number(b.price)); if (!(p >= 0 && p < 100000)) bad("Check the price."); d.price = p; d.priceSet = true; }
      if (b.compareAt !== undefined) d.compareAt = Number(b.compareAt) > 0 ? Math.round(Number(b.compareAt)) : null;
      if (b.badge !== undefined) d.badge = str(b.badge, 24, "badge", false);
      if (b.name !== undefined) d.name = str(b.name, 80, "name");
      if (b.desc !== undefined) d.desc = str(b.desc, 800, "description", false);
      if (b.stock !== undefined) {
        if (b.stock === null) d.stock = null; else {
          const st = {}; for (const col of d.colours || []) { st[col.k] = {}; for (const s of SIZES) { const v = b.stock?.[col.k]?.[s]; if (v !== undefined && v !== null && v !== "") st[col.k][s] = Math.max(0, Math.min(9999, Math.floor(Number(v)) || 0)); } }
          d.stock = st;
        }
      }
      const active = b.active === undefined ? undefined : !!b.active;
      await db.query(`update products set data=$2, ${active === undefined ? "" : "active=" + (active ? "true" : "false") + ","} updated_at=now() where id=$1`, [c.params.id, d]);
    });
    await audit(c.admin.username, "product_saved", { id: c.params.id });
    return json({ ok: true });
  })],
  [route("POST", "/api/products"), A(async (req, c) => {
    const form = await req.formData().catch(() => bad("Upload failed."));
    const file = form.get("image"); if (!file || typeof file === "string") bad("Add a photo.");
    if (file.size > 8 * 1024 * 1024) bad("Photo must be under 8 MB.");
    const buf = await file.arrayBuffer(); const kind = sniffFile(buf);
    if (!kind || !kind.type.startsWith("image/") || kind.ext === "heic") bad("Use a JPG, PNG or WEBP photo.");
    const id = "p" + Date.now().toString(36);
    const key = `products/${id}.${kind.ext}`; await putObject("public", key, buf, kind.type);
    const colour = str(form.get("colour"), 30, "colour", false) || "Black";
    const hex = /^#[0-9a-f]{6}$/i.test(String(form.get("hex"))) ? String(form.get("hex")) : "#1b1b1e";
    const price = Math.round(Number(form.get("price"))); if (!(price > 0)) bad("Add a price.");
    const data = { name: str(form.get("name"), 80, "name"), cat: form.get("cat") === "leggings" ? "leggings" : "tops", price, priceSet: true, desc: str(form.get("desc"), 800, "description", false), feats: [], cover: form.get("cover") === "1", custom: true,
      colours: [{ k: colour.toLowerCase().replace(/[^a-z0-9]/g, "") || "c1", n: colour, hex, img: publicUrl(key) }], stock: null };
    await q("insert into products (id, data, sort) values ($1,$2,1000)", [id, data]);
    await audit(c.admin.username, "product_added", { id });
    return json({ ok: true, id });
  })],
  [route("DELETE", "/api/products/:id"), A(async (req, c) => {
    const r = await q("delete from products where id=$1 and (data->>'custom')::boolean is true returning id", [c.params.id]);
    if (!r.rows[0]) bad("Only products added in the back office can be deleted. Hide others instead.");
    await audit(c.admin.username, "product_deleted", { id: c.params.id });
    return json({ ok: true });
  })],
  [route("POST", "/api/settings"), A(async (req, c) => {
    const b = await readJson(req, 60000);
    await tx(async db => {
      const s = await db.query("select data from settings where id=1 for update"); const d = { ...DEFAULT_SETTINGS, ...(s.rows[0]?.data || {}) };
      for (const k of SETTINGS_KEYS) if (b[k] !== undefined) d[k] = b[k];
      if (JSON.stringify(d).length > 50000) bad("Settings too large.");
      d.codes = (d.codes || []).map(x => ({ code: String(x.code).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20), type: x.type === "amt" ? "amt" : "pct", value: Math.max(0, Math.min(x.type === "amt" ? 100000 : 90, Number(x.value) || 0)), first: !!x.first, on: !!x.on, maxUses: x.maxUses ? Number(x.maxUses) : undefined, uses: Number(x.uses) || 0, phone: x.phone ? normPhone(x.phone) : undefined })).filter(x => x.code);
      await db.query("update settings set data=$1, updated_at=now() where id=1", [d]);
    });
    await audit(c.admin.username, "settings_saved", { keys: Object.keys(b) });
    return json({ ok: true });
  })],
  [route("POST", "/api/reviews/hide"), A(async (req, c) => {
    const b = await readJson(req);
    await q("update reviews set hidden=$3 where order_id=$1 and product_id=$2", [b.orderId, b.productId, !!b.hidden]);
    return json({ ok: true });
  })],
  [route("POST", "/api/bonus"), A(async (req, c) => {
    const b = await readJson(req); const phone = normPhone(b.phone); const n = Math.round(Number(b.points));
    if (!validPhone(phone) || !n || Math.abs(n) > 100000) bad("Check the phone and points.");
    await q("insert into customer_bonus (phone, points) values ($1,$2) on conflict (phone) do update set points = customer_bonus.points + $2", [phone, n]);
    await audit(c.admin.username, "bonus_points", { phone, n });
    return json({ ok: true });
  })],
  [route("POST", "/api/suppliers"), A(async (req) => {
    const b = await readJson(req);
    await q("insert into suppliers (name, platform, contact, notes) values ($1,$2,$3,$4)", [str(b.name, 80, "name"), str(b.platform, 40, "platform", false), str(b.contact, 200, "contact", false), str(b.notes, 300, "notes", false)]);
    return json({ ok: true });
  })],
  [route("DELETE", "/api/suppliers/:id"), A(async (req, c) => { await q("delete from suppliers where id=$1", [Number(c.params.id) || 0]); return json({ ok: true }); })],
  [route("POST", "/api/pos/:id"), A(async (req, c) => {
    const b = await readJson(req, 100000); const id = String(c.params.id).replace(/[^A-Z0-9-]/gi, "").slice(0, 20);
    const data = { supplier: str(b.supplier, 80, "supplier", false), platform: str(b.platform, 40, "platform", false), currency: ["USD", "CNY", "MVR"].includes(b.currency) ? b.currency : "USD", rate: Number(b.rate) || 1,
      lines: (b.lines || []).slice(0, 60).map(l => ({ pid: String(l.pid).slice(0, 40), ck: String(l.ck).slice(0, 40), cost: Number(l.cost) || 0, qty: Object.fromEntries(SIZES.map(s => [s, Math.max(0, Math.floor(Number(l.qty?.[s]) || 0))])) })),
      freight: Number(b.freight) || 0, duty: Number(b.duty) || 0, other: Number(b.other) || 0, eta: /^\d{4}-\d{2}-\d{2}$/.test(b.eta || "") ? b.eta : "", tracking: str(b.tracking, 80, "tracking", false), notes: str(b.notes, 400, "notes", false) };
    await q(`insert into purchase_orders (id, data) values ($1,$2) on conflict (id) do update set data = $2 where purchase_orders.status <> 'received'`, [id, data]);
    return json({ ok: true });
  })],
  [route("POST", "/api/pos/:id/status"), A(async (req, c) => {
    const b = await readJson(req); if (!["ordered", "shipped"].includes(b.status)) bad("Unknown status.");
    await q("update purchase_orders set status=$2, data = data || jsonb_build_object($3::text, $4::bigint) where id=$1 and status <> 'received'", [c.params.id, b.status, b.status + "At", Date.now()]);
    return json({ ok: true });
  })],
  [route("POST", "/api/pos/:id/receive"), A(async (req, c) => {
    const units = await tx(async db => {
      const r = await db.query("select * from purchase_orders where id=$1 for update", [c.params.id]); const po = r.rows[0];
      if (!po) throw new HttpError(404, "Purchase order not found."); if (po.status === "received") bad("Already received.");
      const d = po.data, rate = Number(d.rate) || 1, u = l => SIZES.reduce((a, s) => a + (Number(l.qty?.[s]) || 0), 0);
      const goods = d.lines.reduce((a, l) => a + u(l) * l.cost, 0) * rate, extra = (d.freight || 0) + (d.duty || 0) + (d.other || 0), factor = goods ? (goods + extra) / goods : 1;
      let total = 0; const byP = {};
      for (const l of d.lines) { (byP[l.pid] = byP[l.pid] || []).push(l); }
      for (const [pid, ls] of Object.entries(byP)) {
        const pr = await db.query("select data from products where id=$1 for update", [pid]); if (!pr.rows[0]) continue;
        const pd = pr.rows[0].data; pd.stock = pd.stock || {}; let n = 0, val = 0;
        for (const l of ls) { pd.stock[l.ck] = pd.stock[l.ck] || {}; for (const s of SIZES) { const k = Number(l.qty?.[s]) || 0; if (k) { pd.stock[l.ck][s] = (Number(pd.stock[l.ck][s]) || 0) + k; n += k; val += k * l.cost * rate * factor; } } }
        await db.query("update products set data=$2, updated_at=now() where id=$1", [pid, pd]);
        if (n) await db.query("insert into product_costs (product_id, cost, po_id) values ($1,$2,$3) on conflict (product_id) do update set cost=$2, po_id=$3, updated_at=now()", [pid, Math.round(val / n * 100) / 100, po.id]);
        total += n;
      }
      await db.query("update purchase_orders set status='received', data = data || jsonb_build_object('receivedAt', $2::bigint) where id=$1", [po.id, Date.now()]);
      return total;
    });
    await audit(c.admin.username, "po_received", { id: c.params.id, units });
    return json({ ok: true, units });
  })],
  [route("DELETE", "/api/pos/:id"), A(async (req, c) => { await q("delete from purchase_orders where id=$1 and status='draft'", [c.params.id]); return json({ ok: true }); })],
];

export default {
  async fetch(req) {
    const res = await dispatch(routes, req, { ip: clientIp(req) });
    return res || json({ error: "Not found" }, 404);
  },
};
