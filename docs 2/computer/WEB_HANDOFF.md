# WEB HANDOFF — computer.iai.one

## Status

Web is a reviewable product catalog scaffold.

## Implemented

- Vite React app under `apps/web`.
- URL routes for `/`, `/products/:id`, and `/pricing` using the browser History API.
- Product grid and product detail pages read from `@iai/product-registry`.
- Compare strip and pricing page are data-driven from registry data.
- Base path remains `/Computer-AI/` for the current GitHub Pages deployment.

## Verify

```bash
pnpm run typecheck:web
pnpm run build:web
```

## Still missing

- Authenticated product shell routing.
- Checkout/payment flow.
- Server-side redirects for direct deep links on non-SPA hosts.
- Production domain deployment on Cloudflare.
