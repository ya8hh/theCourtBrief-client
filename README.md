# Client

Standalone Next.js application. Node 24 required.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Local address: http://localhost:3000.

Set the CMS and website URLs in `.env.local`; never commit credentials. Production variables must use the actual HTTPS hostnames. The CMS must be reachable from Vercel for published articles to load.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Vercel

Push this folder to its own GitHub repository and import it in Vercel. Framework: Next.js. Root Directory: repository root. If using the combined repository, set Root Directory to `client`. Install: `npm ci`; Build: `npm run build`; Output: Next.js default. Copy the variable names from `.env.example` into Vercel Settings → Environment Variables, replace localhost with hosted addresses, then deploy. No CMS secrets or AI keys are needed here.

This project uses only its own bundled schema package under `vendor/shared-types`; sibling folders are not required.
