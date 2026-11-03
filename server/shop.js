// Public storefront: serves the shop page and the customer API.
import SHOP_HTML from "../web/shop.html";
import { q, tx, json, html, route, dispatch, readJson, bad, HttpError, clientIp, rateLimit, getSettings, loadProducts, priceOrder,
  str, normPhone, validPhone, validEmail, orderId, putObject, sniffFile, hmac, safeEq, sendOrderEmail, audit, stockOf } from "./lib.js";

const CSP0 = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: __IMG__ __S3__; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";
const origin = (u) => { try { return new URL(u).origin; } catch { return ""; } };
const CSP = () => CSP0.replace("__IMG__", origin(process.env.IMG_BASE)).replace("__S3__", origin(process.env.AWS_ENDPOINT_URL_S3));

const PUBLIC_KEYS = ["banner", "instagram", "whatsapp", "bank", "pointsPer", "setDeal", "lowStock"];
const ORDER_PUBLIC = (o, settings) => ({
  id: o.id, at: new Date(o.created_at).getTime(), status: o.status, payStatus: o.pay_status, paid: o.paid, items: o.items,
  subtotal: o.subtotal, discount: o.discount, discountLabel: o.discount_label, total: o.total, name: o.name,
  island: o.island, deliverDay: o.deliver_day ? new Date(o.deliver_day).toISOString().slice(0, 10) : null, deliverSlot: o.deliver_slot,
  hasReceipt: !!o.receipt_key, rejectReason: o.reject_reason, request: o.request, refunded: o.refunded,
  driver: o.status === "shipped" && o.driver ? { name: o.driver.name, phone: o.driver.phone, vehicle: o.driver.vehicle } : null,
  deliveredAt: o.delivered_at ? new Date(o.delivered_at).getTime() : null,
});

async function findOrderFor(id, phone, token) {
  const r = await q("select * from orders where id = $1", [String(id || "").toUpperCase().slice(0, 20)]);
  const o = r.rows[0];
  const okTok = token && o && safeEq(token, hmac("track:" + o.id));
  const okPhone = phone && o && normPhone(phone) === o.phone;
  if (!o || !(okTok || okPhone)) throw new HttpError(404, "We couldn't find an order with that number and phone.");
  return o;
}
async function readForm(req, maxBytes) {
  const len = Number(req.headers.get("content-length") || 0);
  if (len > maxBytes) bad("That file is too large. Please upload a screenshot under 8 MB.");
  try { return await req.formData(); } catch { bad("Upload failed. Please try again."); }
}
async function storeReceipt(file, oid) {
  if (!file || typeof file === "string") return null;
  if (file.size > 8 * 1024 * 1024) bad("That file is too large. Please upload a screenshot under 8 MB.");
  const buf = await file.arrayBuffer(); const kind = sniffFile(buf);
  if (!kind) bad("Receipts must be a photo (JPG, PNG, WEBP, HEIC) or a PDF.");
  const key = `receipts/${oid}-${Date.now().toString(36)}.${kind.ext}`;
  await putObject("private", key, buf, kind.type);
  return { key, type: kind.type };
}

const routes = [
  [route("GET", "/"), async () => html(SHOP_HTML.replace("__CONFIG__", JSON.stringify({ img: process.env.IMG_BASE || "" })), CSP())],
  [route("GET", "/api/catalog"), async () => {
    const [settings, products, revs] = await Promise.all([getSettings(), loadProducts(false),
      q("select product_id, rating, fit, title, body, name, size, created_at from reviews where not hidden order by created_at desc limit 500")]);
    const pub = Object.fromEntries(PUBLIC_KEYS.map(k => [k, settings[k]]));
    pub.drivers = undefined;
    return json({ settings: pub, products, reviews: revs.rows.map(r => ({ pid: r.product_id, rating: r.rating, fit: r.fit, title: r.title, text: r.body, name: r.name, size: r.size, at: new Date(r.created_at).getTime() })) }, 200, { "cache-control": "public, max-age=30" });
  }],
  [route("POST", "/api/quote"), async (req, c) => {
    await rateLimit("quote:" + c.ip, 60, 600);
    const b = await readJson(req);
    const [settings, products] = await Promise.all([getSettings(), loadProducts(false)]);
    const p = await priceOrder(b.items, b.code, b.phone, settings, products);
    return json({ subtotal: p.subtotal, discount: p.discount, discountLabel: p.discountLabel, total: p.total, codeMsg: p.codeMsg });
  }],
  [route("POST", "/api/orders"), async (req, c) => {
    await rateLimit("order:" + c.ip, 8, 3600);
    const form = await readForm(req, 9 * 1024 * 1024);
    let b; try { b = JSON.parse(String(form.get("order") || "{}")); } catch { bad("Invalid order."); }
    const name = str(b.name, 80, "name"), address = str(b.address, 200, "delivery address"), island = str(b.island, 60, "island");
    const phone = normPhone(b.phone); if (!validPhone(phone)) bad("Please enter a 7-digit Maldivian contact number.");
    const email = str(b.email, 254, "email").toLowerCase(); if (!validEmail(email)) bad("Please check your email address.");
    const note = str(b.note, 400, "note", false);
    if (!b.terms) bad("Please confirm you've read the returns policy.");
    const day = /^\d{4}-\d{2}-\d{2}$/.test(b.deliverDay || "") ? b.deliverDay : null;
    const slot = str(b.deliverSlot, 60, "delivery time", false);
    const settings = await getSettings();
    if (!settings.bank?.acct) bad("Online orders open once our bank details are set. Please message us on Instagram.");
    const file = form.get("receipt"); if (!file || typeof file === "string") bad("Attach your transfer receipt so we can confirm your order.");
    const id = orderId();
    const rec = await storeReceipt(file, id);
    const order = await tx(async (db) => {
      const products = (await db.query("select id, data, active from products where active for update")).rows.map(x => ({ ...x.data, id: x.id, active: x.active }));
      const p = await priceOrder(b.items, b.code, phone, settings, products, db);
      if (b.code && p.codeMsg) bad(p.codeMsg);
      const r = await db.query(`insert into orders (id, items, subtotal, discount, discount_label, code, total, name, phone, email, address, island, deliver_day, deliver_slot, note, marketing, receipt_key, receipt_type, ip, log)
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19, jsonb_build_array(jsonb_build_object('st','review','at',now())))
        returning *`, [id, JSON.stringify(p.lines), p.subtotal, p.discount, p.discountLabel, p.code || null, p.total, name, phone, email, address, island, day, slot || null, note || null, !!b.marketing, rec.key, rec.type, c.ip]);
      if (p.code) { // count uses for limited codes
        const s = await db.query("select data from settings where id = 1 for update");
        const data = s.rows[0].data || {}; const codes = data.codes || settings.codes;
        const ix = codes.findIndex(x => x.code === p.code); if (ix >= 0) { codes[ix].uses = (codes[ix].uses || 0) + 1; data.codes = codes; await db.query("update settings set data = $1, updated_at = now() where id = 1", [data]); }
      }
      return r.rows[0];
    });
    sendOrderEmail(order, "received").catch(e => console.error("email", e));
    return json({ order: ORDER_PUBLIC(order, settings), track: hmac("track:" + order.id) }, 201);
  }],
  [route("GET", "/api/track"), async (req, c) => {
    await rateLimit("track:" + c.ip, 30, 600);
    const o = await findOrderFor(c.url.searchParams.get("id"), c.url.searchParams.get("phone"), c.url.searchParams.get("t"));
    const settings = await getSettings();
    const pts = await q("select coalesce(sum(floor((total - refunded) / $2::numeric)),0)::int as p from orders where phone = $1 and status = 'delivered'", [o.phone, settings.pointsPer || 10]);
    const reviewed = (await q("select product_id from reviews where order_id = $1", [o.id])).rows.map(r => r.product_id);
    return json({ order: ORDER_PUBLIC(o, settings), points: pts.rows[0].p, reviewed, token: hmac("track:" + o.id) });
  }],
  [route("POST", "/api/orders/:id/receipt"), async (req, c) => {
    await rateLimit("reupload:" + c.ip, 10, 3600);
    const form = await readForm(req, 9 * 1024 * 1024);
    const o = await findOrderFor(c.params.id, form.get("phone"), form.get("t"));
    if (!(o.status === "review" && o.pay_status === "rejected")) bad("This order isn't waiting for a new receipt.");
    const rec = await storeReceipt(form.get("receipt"), o.id); if (!rec) bad("Attach your receipt.");
    await q("update orders set receipt_key=$2, receipt_type=$3, pay_status='pending', reject_reason=null, log = log || jsonb_build_array(jsonb_build_object('st','reupload','at',now())) where id=$1", [o.id, rec.key, rec.type]);
    return json({ ok: true });
  }],
  [route("POST", "/api/orders/:id/report"), async (req, c) => {
    await rateLimit("report:" + c.ip, 10, 3600);
    const b = await readJson(req);
    const o = await findOrderFor(c.params.id, b.phone, b.t);
    if (o.status !== "delivered") bad("You can report a problem once your order is delivered.");
    if (o.request) bad("You've already reported a problem with this order. We'll be in touch.");
    if (Date.now() - new Date(o.delivered_at || o.created_at).getTime() > 48 * 3600e3) bad("Problems must be reported within 48 hours of delivery. Please message us on Instagram.");
    const type = b.type === "refund" ? "refund" : "dispute";
    const reasons = ["Wrong item or size sent", "Item is faulty or damaged", "Item missing from my order", "Order never arrived"];
    if (!reasons.includes(b.reason)) bad("Choose what went wrong.");
    await q("update orders set request = $2 where id = $1", [o.id, { type, reason: b.reason, details: str(b.details, 800, "details", false), at: Date.now(), status: "open" }]);
    return json({ ok: true });
  }],
  [route("POST", "/api/reviews"), async (req, c) => {
    await rateLimit("review:" + c.ip, 20, 3600);
    const b = await readJson(req);
    const o = await findOrderFor(b.orderId, b.phone, b.t);
    if (o.status !== "delivered") bad("You can review items once your order is delivered.");
    const item = (o.items || []).find(i => i.pid === b.productId); if (!item) bad("That item isn't in this order.");
    const rating = Math.round(Number(b.rating)); if (!(rating >= 1 && rating <= 5)) bad("Choose a star rating.");
    const body = str(b.text, 800, "review"); if (body.length < 10) bad("Write at least a sentence about the fit or feel.");
    const fit = ["small", "true", "large"].includes(b.fit) ? b.fit : null;
    const nm = String(o.name).trim().split(/\s+/); const name = nm[0] + (nm[1] ? " " + nm[1][0] + "." : "");
    await q(`insert into reviews (order_id, product_id, rating, fit, title, body, name, size) values ($1,$2,$3,$4,$5,$6,$7,$8)
      on conflict (order_id, product_id) do nothing`, [o.id, item.pid, rating, fit, str(b.title, 80, "headline", false), body, name, item.size]);
    return json({ ok: true });
  }],
  [route("POST", "/api/notify"), async (req, c) => {
    await rateLimit("notify:" + c.ip, 20, 3600);
    const b = await readJson(req);
    const contact = str(b.contact, 254, "phone or email");
    if (!validPhone(contact) && !validEmail(contact)) bad("Enter a phone number or email.");
    await q("insert into notify_requests (product_id, ck, size, contact) values ($1,$2,$3,$4) on conflict do nothing", [str(b.pid, 40, "product"), str(b.ck, 40, "colour"), str(b.size, 5, "size"), contact]);
    return json({ ok: true });
  }],
  [route("POST", "/api/subscribe"), async (req, c) => {
    await rateLimit("sub:" + c.ip, 10, 3600);
    const b = await readJson(req);
    const contact = str(b.contact, 254, "phone or email");
    if (!validPhone(contact) && !validEmail(contact)) bad("Enter a phone number or email.");
    await q("insert into subscribers (contact) values ($1) on conflict do nothing", [contact]);
    return json({ ok: true });
  }],
];

export default {
  async fetch(req) {
    const ip = clientIp(req);
    const res = await dispatch(routes, req, { ip });
    return res || json({ error: "Not found" }, 404);
  },
};
