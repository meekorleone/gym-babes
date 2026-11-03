import http from "node:http";
import { PGlite } from "@electric-sql/pglite";
import { setTestDb, hashPassword } from "../server/lib.js";
import shop from "../server/shop.js";
import admin from "../server/admin.js";
import fs from "node:fs";

process.env.APP_SECRET = "dev-secret-123";
process.env.AWS_ACCESS_KEY_ID = "x"; process.env.AWS_SECRET_ACCESS_KEY = "y"; process.env.AWS_REGION = "ap-southeast-1";
process.env.AWS_ENDPOINT_URL_S3 = "http://localhost:8803";
process.env.IMG_BASE = "http://localhost:8804/";
process.env.SHOP_URL = "http://localhost:8801/";

const db = new PGlite();
const schema = fs.readFileSync(new URL("./schema.sql", import.meta.url), "utf8");
await db.exec(schema);
await db.exec(fs.readFileSync(new URL("../seed.sql", import.meta.url), "utf8"));
await db.query("insert into admin_users (username, pass_hash) values ($1,$2)", ["owner", hashPassword("correct-horse-battery")]);
setTestDb({ query: (t, p) => db.query(t, p) });

const store = new Map();
http.createServer((req, res) => { // fake S3
  const key = decodeURIComponent(req.url.split("?")[0]);
  if (req.method === "PUT") { const ch = []; req.on("data", c => ch.push(c)); req.on("end", () => { store.set(key, { body: Buffer.concat(ch), type: req.headers["content-type"] }); res.end("ok"); }); }
  else { const o = store.get(key); if (!o) { res.statusCode = 404; return res.end(); } res.setHeader("content-type", o.type); res.end(o.body); }
}).listen(8803);
http.createServer((req, res) => { // static photos
  const f = "/home/claude/gymbabes" + decodeURIComponent(req.url.split("?")[0]);
  if (fs.existsSync(f)) { res.setHeader("access-control-allow-origin", "*"); res.setHeader("content-type", f.endsWith(".png") ? "image/png" : "image/jpeg"); fs.createReadStream(f).pipe(res); } else { res.statusCode = 404; res.end(); }
}).listen(8804);

function serve(handler, port) {
  http.createServer(async (req, res) => {
    const ch = []; for await (const c of req) ch.push(c);
    const body = ch.length ? Buffer.concat(ch) : undefined;
    const headers = new Headers(); for (const [k, v] of Object.entries(req.headers)) headers.set(k, Array.isArray(v) ? v.join(",") : v);
    headers.set("x-forwarded-for", "127.0.0.1");
    const r = await handler.fetch(new Request(`http://localhost:${port}${req.url}`, { method: req.method, headers, body: ["GET", "HEAD"].includes(req.method) ? undefined : body, duplex: "half" }));
    res.statusCode = r.status; r.headers.forEach((v, k) => res.setHeader(k, v));
    res.end(Buffer.from(await r.arrayBuffer()));
  }).listen(port);
}
serve(shop, 8801); serve(admin, 8802);
globalThis.__db = db;
console.log("dev up");
