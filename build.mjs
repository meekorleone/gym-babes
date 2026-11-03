import { build } from "esbuild";
const banner = { js: "import{createRequire as ___cr}from'module';const require=___cr(process.cwd()+'/');" };
for (const n of ["shop", "admin"]) {
  await build({ entryPoints: [`server/${n}.js`], bundle: true, platform: "node", target: "node22", format: "esm", outfile: `dist/${n}.mjs`, loader: { ".html": "text" }, banner, minify: true, legalComments: "none", external: ["pg-native", "cloudflare:sockets"] });
}
console.log("built");
