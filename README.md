# CourtroomDigest client

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

## Production domain

In Netlify environment variables, set `SITE_URL=https://courtroomdigest.com` and redeploy. This controls canonical article URLs, sitemap, RSS links and metadata. Keep `CMS_URL` pointing to your hosted CMS.

## Google Analytics 4

1. Create a GA4 property and Web data stream for `https://courtroomdigest.com`. Copy the Measurement ID (`G-…`), not the property ID or a Tag Manager ID.
2. In the stream's Enhanced measurement settings, disable automatic **Page views** (including browser-history page changes). This app explicitly sends one page view on each public route navigation; leaving automatic page views enabled can double-count. Keep other desired engagement measurements enabled. Do not install a second Google tag via Netlify or Tag Manager.
3. This client defaults to the public Measurement ID `G-390ZEXVFWM`. To override it, set `GA_MEASUREMENT_ID=G-YOURREALID` in the Netlify **client** site's environment variables and redeploy. Set the variable to an empty value to disable. If an empty variable already exists in Netlify, replace it with `G-390ZEXVFWM` to enable. No Google API secret is needed.
4. Visit courtroomdigest.com in a browser without a tracking blocker, open an article, and check Analytics **Realtime**. Check that navigation creates one page view and court-source clicks create `court_source_click`. Normal reporting can take longer to populate.

Tracking runs only in production on courtroomdigest.com and www.courtroomdigest.com. Localhost, preview deploys, editorial and CMS are excluded. Page views omit URL query strings/fragments; custom source clicks send the article path and source hostname, not PDF query strings or document text. Google signals and advertising personalization are disabled. The privacy page describes the integration; configure consent handling appropriate to your audience before enabling where required.

Verification: `node --experimental-strip-types --test tests/analytics.test.mjs`, `npm run lint`, `npm run typecheck`, `npm run build`. Live event delivery must be checked with the real GA4 Measurement ID after deployment.
