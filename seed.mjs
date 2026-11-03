// Generates seed SQL from the prototype catalogue.
import fs from "node:fs";
const src = fs.readFileSync("/home/claude/gymbabes/store.html", "utf8");
const cat = src.slice(src.indexOf("const CATALOG=["), src.indexOf("const DEF_SETTINGS="));
const CATALOG = new Function(cat.replace("const CATALOG=", "return ").replace(/;\s*$/, ""))();
const rows = CATALOG.map((p, i) => ({ id: p.id, sort: i, data: { ...p, id: undefined, priceSet: false, stock: null } }));
const lit = (o) => "'" + JSON.stringify(o).replace(/'/g, "''") + "'";
const sql = "insert into products (id, data, sort) values " + rows.map(r => `(${lit(r.id).replace(/^'"|"'$/g, "'")}, ${lit(r.data)}::jsonb, ${r.sort})`).join(",\n") + " on conflict (id) do nothing";
fs.writeFileSync("seed.sql", sql);
console.log(sql.length, rows.length);
