import { build } from "esbuild";
await build({ entryPoints: ["dev/devserver.js"], bundle: true, platform: "node", format: "esm", outfile: "dev/dev.mjs", loader: { ".html": "text" }, external: ["@electric-sql/pglite", "pg-native", "cloudflare:sockets"], banner: { js: "import{createRequire as ___cr}from'module';const require=___cr(import.meta.url);" } });
