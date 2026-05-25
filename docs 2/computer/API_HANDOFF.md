# API HANDOFF — computer.iai.one

## Status

API is a local Fastify scaffold. It is not production infrastructure.

## Implemented

- Product routes.
- Product pricing and shell routes.
- Command endpoint that creates a workflow run, resolves routing, assigns route metadata, and completes a simulated run.
- Run create/list/detail endpoints.
- Workflow engine uses a `RunStore` interface with an in-memory implementation.

## Verify

```bash
pnpm run typecheck:api
pnpm run build:api
```

## Still missing

- PostgreSQL repository implementation.
- Auth middleware.
- Entitlement checks on API requests.
- Real AI runtime dispatch.
- Audit event persistence.
- Rate-limit persistence across process restarts.
