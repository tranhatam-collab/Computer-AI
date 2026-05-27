# B7 — DEPLOYMENT AND ENVIRONMENT PLAN


> Package: COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026  
> Status: REPO REALITY REVIEW APPROVED · ARCHITECTURE BRIDGE REQUIRED · PRODUCTION BLOCKERS IDENTIFIED · COMPLIANCE LAYER REQUIRED · NOT PRODUCTION-READY  
> Scope: Documentation and planning conversion package only. No secrets. No deploy. No destructive file operations.


## 1. Environments

```text
local
preview
staging
production
```

## 2. Rules

```text
No production secret in local.
No production deploy without migration pass.
No production deploy without health check.
No production deploy without rollback plan.
No payment live mode in preview.
No provider live keys in test env.
```

## 3. Suggested hybrid deployment

```text
Cloudflare = edge routing, CDN, WAF, public web/API entry
Regional Core = API backend, jobs, browser runtime, AI provider gateway
PostgreSQL = source of truth
Redis = ephemeral cache/queues/locks
S3/R2 = files, evidence, exports, artifacts
```

## 4. Required checks

```text
pnpm install
pnpm typecheck
pnpm build
migration dry run
security lint
secret scan
env validation
health check
rollback test
```
