// Shared server helpers for the Gym Babes shop and back office.
import pg from "pg";
import { AwsClient } from "aws4fetch";
import crypto from "node:crypto";

/* ---------------- database ---------------- */
let pool = null, testDb = null;
export function setTestDb(db) { testDb = db; }
function getPool() {
  if (!pool) {
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5, idleTimeoutMillis: 30000 });
    pool.on("error", () => {}); // idle disconnects are expected with scale-to-zero
  }
  return pool;
}
export async function q(text, params = []) {
  if (testDb) return testDb.query(text, params);
  return getPool().query(text, params);
}
// Run fn(client) inside a transaction; client.query has the same shape as q.
export async function tx(fn) {
  if (testDb) { await testDb.query("begin"); try { const r = await fn(testDb); await testDb.query("commit"); return r; } catch (e) { await testDb.query("rollback"); throw e; } }
  const c = await getPool().connect();
  try { await c.query("begin"); const r = await fn(c); await c.query("commit"); return r; }
  catch (e) { try { await c.query("rollback"); } catch (_) {} throw e; }
  finally { c.release(); }
}

/* ---------------- http ---------------- */
export const SEC_HEADERS = {
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "cross-origin-opener-policy": "same-origin",
};
export function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...SEC_HEADERS, ...extra } });
}
export function html(body, csp, extra = {}) {
  return new Response(body, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "content-security-policy": csp, ...SEC_HEADERS, ...extra } });
}
export class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }
export const bad = (m) => { throw new HttpError(400, m); };
export function clientIp(req) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}
export async function readJson(req, max = 20000) {
  const t = await req.text();
  if (t.length > max) bad("Request too large.");
  try { return t ? JSON.parse(t) : {}; } catch { bad("Invalid request."); }
}
export function route(method, pattern) {
  const keys = []; const re = new RegExp("^" + pattern.replace(/:([a-z]+)/gi, (_, k) => { keys.push(k); return "([^/]+)"; }) + "$");
  return { method, re, keys };
}
export async function dispatch(routes, req, ctx) {
  const url = new URL(req.url);
  for (const [r, fn] of routes) {
    if (r.method !== req.method) continue;
    const m = url.pathname.match(r.re); if (!m) continue;
    const params = {}; r.keys.forEach((k, i) => params[k] = decodeURIComponent(m[i + 1]));
    try { return await fn(req, { ...ctx, url, params }); }
    catch (e) {
      if (e instanceof HttpError) return json({ error: e.message }, e.status);
      console.error("handler error", req.method, url.pathname, e && e.stack || e);
      return json({ error: "Something went wrong. Please try again." }, 500);
    }
  }
  return null;
}

/* ---------------- rate limiting (fixed window in Postgres) ---------------- */
export async function rateLimit(key, limit, windowSec) {
  const r = await q(
    `insert into rate_limits (key, count, reset_at) values ($1, 1, now() + make_interval(secs => $2))
     on conflict (key) do update set
       count = case when rate_limits.reset_at < now() then 1 else rate_limits.count + 1 end,
       reset_at = case when rate_limits.reset_at < now() then now() + make_interval(secs => $2) else rate_limits.reset_at end
     returning count`, [key, windowSec]);
  if (r.rows[0].count > limit) throw new HttpError(429, "Too many attempts. Please wait a few minutes and try again.");
}

/* ---------------- crypto ---------------- */
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const h = crypto.scryptSync(pw, salt, 64, { N: 16384, r: 8, p: 1 });
  return "scrypt$" + salt.toString("base64") + "$" + h.toString("base64");
}
export function verifyPassword(pw, stored) {
  const [alg, s, h] = String(stored).split("$");
  if (alg !== "scrypt" || !s || !h) return false;
  const want = Buffer.from(h, "base64");
  const got = crypto.scryptSync(pw, Buffer.from(s, "base64"), want.length, { N: 16384, r: 8, p: 1 });
  return crypto.timingSafeEqual(want, got);
}
export const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
export const randToken = (n = 32) => crypto.randomBytes(n).toString("base64url");
export function hmac(s) {
  const key = process.env.APP_SECRET; if (!key) throw new Error("APP_SECRET not set");
  return crypto.createHmac("sha256", key).update(s).digest("base64url").slice(0, 22);
}
export function safeEq(a, b) { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); }
// Order ids: 8 chars from an unambiguous alphabet, ~40 bits, not guessable in sequence.
export function orderId() {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; const b = crypto.randomBytes(8);
  return "GB-" + [...b].map(x => A[x % A.length]).join("");
}

/* ---------------- validation ---------------- */
export const str = (v, max, name, required = true) => {
  const s = String(v ?? "").trim();
  if (required && !s) bad(`Please add your ${name}.`);
  if (s.length > max) bad(`${name[0].toUpperCase() + name.slice(1)} is too long.`);
  return s;
};
export const normPhone = (p) => String(p || "").replace(/[^\d+]/g, "").replace(/^\+?960/, "");
export const validPhone = (p) => /^[3-9]\d{6}$/.test(normPhone(p));
export const validEmail = (e) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(String(e || ""));

/* ---------------- object storage ---------------- */
let aws = null;
function s3() {
  if (!aws) aws = new AwsClient({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, service: "s3", region: process.env.AWS_REGION || "ap-southeast-1" });
  return aws;
}
const s3url = (bucket, key) => `${process.env.AWS_ENDPOINT_URL_S3}/${bucket}/${key.split("/").map(encodeURIComponent).join("/")}`;
export async function putObject(bucket, key, body, type) {
  const r = await s3().fetch(s3url(bucket, key), { method: "PUT", body, headers: { "content-type": type } });
  if (!r.ok) throw new Error("storage put failed " + r.status + " " + (await r.text()).slice(0, 200));
}
export async function presignGet(bucket, key, seconds = 300) {
  const u = new URL(s3url(bucket, key)); u.searchParams.set("X-Amz-Expires", String(seconds));
  const signed = await s3().sign(u.toString(), { method: "GET", aws: { signQuery: true } });
  return signed.url;
}
export const publicUrl = (key) => s3url("public", key);
// Accept only real images/PDFs, judged by magic bytes, not by the client's claim.
export function sniffFile(buf) {
  const b = new Uint8Array(buf.slice(0, 12));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: "image/jpeg", ext: "jpg" };
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return { type: "image/png", ext: "png" };
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45) return { type: "image/webp", ext: "webp" };
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return { type: "application/pdf", ext: "pdf" };
  const brand = String.fromCharCode(...b.slice(4, 12));
  if (brand.startsWith("ftyphei") || brand.startsWith("ftypmif1") || brand.startsWith("ftypheic")) return { type: "image/heic", ext: "heic" };
  return null;
}

/* ---------------- settings, catalogue, pricing ---------------- */
export const DEFAULT_SETTINGS = {
  banner: { on: true, text: "Free delivery anywhere in the Maldives. New here? WELCOME10 takes 10% off your first order.", link: "shop", cta: "Shop now" },
  codes: [{ code: "WELCOME10", type: "pct", value: 10, first: true, on: true }],
  instagram: "gymbabes.mv", whatsapp: "", bank: { bank: "", acct: "", holder: "" }, drivers: [],
  pointsPer: 10, setDeal: 10, lowStock: 2, storeEmail: "",
};
export async function getSettings() {
  const r = await q("select data from settings where id = 1");
  return { ...DEFAULT_SETTINGS, ...(r.rows[0]?.data || {}) };
}
export const SIZES = ["XS", "S", "M", "L", "XL"];
export function stockOf(p, ck, sz) { const v = p.stock?.[ck]?.[sz]; return (v === undefined || v === null || v === "") ? null : Number(v); }
export async function loadProducts(all = false) {
  const r = await q(`select id, data, active, sort from products ${all ? "" : "where active"} order by sort, id`);
  return r.rows.map(x => ({ ...x.data, id: x.id, active: x.active, sort: x.sort }));
}
// Server-side price calculation: the client's numbers are never trusted.
export async function priceOrder(items, codeIn, phone, settings, products, db = { query: q }) {
  if (!Array.isArray(items) || !items.length) bad("Your bag is empty.");
  if (items.length > 30) bad("Too many lines in one order.");
  const byId = Object.fromEntries(products.map(p => [p.id, p]));
  const lines = items.map(i => {
    const p = byId[i.pid]; if (!p || p.active === false) bad("An item in your bag is no longer available. Please refresh.");
    const col = (p.colours || []).find(c => c.k === i.ck); if (!col) bad("Please choose a colour again for " + p.name + ".");
    const sizes = p.sizes || SIZES; if (!sizes.includes(i.size)) bad("Please choose a size again for " + p.name + ".");
    const qty = Math.floor(Number(i.qty)); if (!(qty >= 1 && qty <= 10)) bad("Quantities must be between 1 and 10.");
    return { pid: p.id, name: p.name, ck: col.k, colour: col.n, img: col.img, size: i.size, qty, price: Number(p.price), cat: p.cat };
  });
  const merged = {}; lines.forEach(l => { const k = l.pid + "|" + l.ck + "|" + l.size; merged[k] ? merged[k].qty += l.qty : merged[k] = { ...l }; });
  const L = Object.values(merged);
  for (const l of L) { const v = stockOf(byId[l.pid], l.ck, l.size); if (v !== null && l.qty > v) bad(`${l.name} (${l.colour}, ${l.size}) has only ${v} left.`); }
  const sub = L.reduce((a, l) => a + l.price * l.qty, 0);
  const opts = [];
  if (L.some(l => l.cat === "leggings") && L.some(l => l.cat === "tops") && settings.setDeal > 0) opts.push({ label: `Set deal (${settings.setDeal}%)`, amt: Math.round(sub * settings.setDeal / 100) });
  let codeMsg = "", code = String(codeIn || "").trim().toUpperCase().slice(0, 30);
  if (code) {
    const c = (settings.codes || []).find(x => x.code === code && x.on);
    if (!c) codeMsg = "That code isn't valid.";
    else if (c.maxUses && (c.uses || 0) >= c.maxUses) codeMsg = "That code has already been used.";
    else {
      let firstOk = true;
      if (c.first) { const r = await db.query("select 1 from orders where phone = $1 and status <> 'cancelled' limit 1", [normPhone(phone)]); firstOk = !r.rows.length; }
      if (c.phone && normPhone(c.phone) !== normPhone(phone)) codeMsg = "That code belongs to another customer.";
      else if (!firstOk) codeMsg = "That code is for first orders only.";
      else opts.push({ label: `Code ${c.code}`, amt: c.type === "pct" ? Math.round(sub * c.value / 100) : Math.min(sub, c.value), code: c.code });
    }
  }
  const best = opts.sort((a, b) => b.amt - a.amt)[0] || null;
  return { lines: L, subtotal: sub, discount: best?.amt || 0, discountLabel: best?.label || "", code: best?.code || "", codeMsg, total: Math.max(0, sub - (best?.amt || 0)) };
}
export async function audit(actor, action, detail) {
  try { await q("insert into audit_log (actor, action, detail) values ($1, $2, $3)", [actor, action, detail || null]); } catch (_) {}
}

/* ---------------- email (Resend) ---------------- */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const mvr = (n) => "MVR " + Math.round(n).toLocaleString("en-US");
export function imgAbs(src) { return /^https?:/.test(src) ? src : (process.env.IMG_BASE || "") + src; }
export function trackLink(o) { return `${process.env.SHOP_URL || ""}?track=${encodeURIComponent(o.id)}&t=${hmac("track:" + o.id)}`; }
function emailShell(title, intro, o, extra) {
  const rows = (o.items || []).map(i => `<tr><td style="padding:10px 0;width:76px"><img src="${esc(imgAbs(i.img))}" width="64" height="76" alt="${esc(i.name)}" style="border-radius:10px;object-fit:cover;display:block"></td><td style="padding:10px 12px;font:14px Arial,sans-serif;color:#21101a"><b>${esc(i.name)}</b><br><span style="color:#7a6270">${esc(i.colour)} · ${esc(i.size)} · Qty ${i.qty}</span></td><td style="padding:10px 0;font:bold 14px Arial,sans-serif;color:#21101a;text-align:right;white-space:nowrap">${mvr(i.price * i.qty)}</td></tr>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#fff8fb"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:18px;border:1px solid #f0dbe6" cellpadding="0" cellspacing="0">
<tr><td style="padding:24px 24px 8px;font:800 26px Arial,sans-serif;color:#e5007e">Gym Babes</td></tr>
<tr><td style="padding:0 24px;font:bold 20px Arial,sans-serif;color:#21101a">${esc(title)}</td></tr>
<tr><td style="padding:8px 24px 0;font:15px/1.5 Arial,sans-serif;color:#21101a">${intro}</td></tr>
<tr><td style="padding:16px 24px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0dbe6;border-bottom:1px solid #f0dbe6">${rows}</table></td></tr>
<tr><td style="padding:12px 24px 0;font:14px Arial,sans-serif;color:#21101a">${o.discount ? `${esc(o.discount_label || o.discountLabel)}: −${mvr(o.discount)}<br>` : ""}Delivery: Free<br><b style="font-size:17px">Total paid: ${mvr(o.total)}</b><br><span style="color:#7a6270">Order ${esc(o.id)}</span></td></tr>
${extra || ""}
<tr><td style="padding:20px 24px"><a href="${esc(trackLink(o))}" style="display:inline-block;background:#e5007e;color:#ffffff;font:bold 15px Arial,sans-serif;text-decoration:none;padding:14px 24px;border-radius:999px">Track my order</a></td></tr>
<tr><td style="padding:0 24px 24px;font:12px/1.5 Arial,sans-serif;color:#7a6270">Questions? Message us on Instagram @gymbabes.mv. All sales are final; report a wrong or faulty item within 48 hours of delivery from the tracking page.</td></tr>
</table></td></tr></table></body></html>`;
}
export async function sendOrderEmail(o, kind) {
  const key = process.env.RESEND_API_KEY, from = process.env.EMAIL_FROM;
  if (!key || !from || !o.email) return { skipped: true };
  const first = esc(String(o.name || "").split(" ")[0]);
  const slot = o.deliver_slot ? `${esc(o.deliver_day ? new Date(o.deliver_day).toDateString().slice(0, 10) : "")}, ${esc(o.deliver_slot)}` : "";
  const T = {
    received: ["We've got your order", `Hi ${first}, thank you! We're checking your transfer receipt now. Once the payment shows in our account we'll email your confirmation.`],
    confirmed: ["Payment confirmed: here's your receipt", `Hi ${first}, your payment is confirmed and your order is being packed.${slot ? ` Preferred delivery: <b>${slot}</b>.` : ""}`],
    rejected: ["We couldn't match your receipt", `Hi ${first}, we couldn't find this payment in our account${o.reject_reason ? `: ${esc(o.reject_reason)}` : "."} Please upload a new receipt from your tracking page.`],
    shipped: ["Your order is on its way", `Hi ${first}, your order is out for delivery${o.driver ? ` with <b>${esc(o.driver.name)}</b> (${esc(o.driver.phone)})` : ""}.`],
    delivered: ["Delivered! How did it fit?", `Hi ${first}, your order has been delivered. Help other Babes choose their size by leaving a quick review from your tracking page.`],
  }[kind];
  if (!T) return { skipped: true };
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [o.email], subject: `${T[0]} · ${o.id}`, html: emailShell(T[0], T[1], o), reply_to: process.env.EMAIL_REPLY_TO || undefined }),
  });
  const ok = r.ok; let id = null; try { id = (await r.json()).id; } catch (_) {}
  await q("update orders set emails = emails || jsonb_build_object($2::text, jsonb_build_object('at', now(), 'ok', $3::boolean, 'id', $4::text)) where id = $1", [o.id, kind, ok, id]);
  return { ok };
}
