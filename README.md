# computer.iai.one

computer.iai.one là catalog các **AI computers dựng sẵn theo gói**.

## Current status

This repo is a reviewable scaffold, not a production-ready system.

- Web: product catalog, URL routes, pricing, and product detail pages.
- API: local Fastify scaffold with product, command, and run endpoints.
- Mobile: Expo command-center starter with API client, tasks, detail, approvals, and results screens.
- Runtime: simulated workers only.
- Production blockers: PostgreSQL, real AI workers, auth UI, payment gateway, email delivery, EAS/device builds.

## Verify

```bash
pnpm install
pnpm run verify
```

## Chạy web
```bash
pnpm run dev:web
```

## Chạy mobile
```bash
pnpm run dev:mobile
```

## Chạy API
```bash
pnpm run dev:api
```
