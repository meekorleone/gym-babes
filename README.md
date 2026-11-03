# Gym Babes store

Women's activewear shop for the Maldives (@gymbabes.mv).

- `server/shop.js` – public shop and customer API (orders, tracking, reviews)
- `server/admin.js` – owner back office on a separate address, password login
- `server/lib.js` – database, storage, email, security helpers
- `web/` – shop and back office pages, product photos
- `dist/` – built bundles loaded by the Neon Functions (pinned by commit and SHA-256)

No secrets live in this repository. Passwords, keys and customer data are stored in Neon.

Build: `npm install && node build.mjs`. Local test: `node dev/build-dev.mjs && node dev/dev.mjs`.
