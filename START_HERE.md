# START HERE — computer.iai.one

This repo is currently a P1 reviewable scaffold. Do not report it as production-ready.

## Current shape

- `apps/web`: Vite React catalog with URL routes for `/`, `/products/:id`, and `/pricing`.
- `apps/api`: Fastify API scaffold for products, command routing, and workflow runs.
- `apps/mobile`: Expo command-center starter with API client, task list/detail, approvals, and results screens.
- `packages/product-registry`: 12 product definitions, tiers, pricing, shells, entitlements.
- `packages/routing-matrix`: intent to lane/model/tools routing scaffold.
- `packages/workflow-engine`: state machine, run store interface, in-memory store, run controller, verification, replay, scoring.
- `packages/runtime-registry`: simulated worker registry with metadata, limits, lane mapping, and capability map.

## Required verification

```bash
pnpm install
pnpm run typecheck
pnpm run build
pnpm --filter ./apps/api build
pnpm --filter ./apps/web build
git status --short
```

## Production blockers

- PostgreSQL persistence is not wired.
- Real AI worker calls are not wired.
- Login/register UI is not implemented.
- Stripe/PayOS is not wired.
- Email delivery provider is not wired.
- EAS/device mobile builds are not done.
