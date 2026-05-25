# COMPUTER.IAI.ONE — RUNTIME SANDBOX SECURITY SPEC 2026

**Status:** Architecture approved (not production-ready)

## Runtime Classes

| Class | Use Case | Isolation | Execution Limit |
|-------|----------|-----------|-----------------|
| Edge | Search, fetch, lightweight API | Cloudflare Worker | 30s CPU |
| Agent | Task orchestration, tool calls | Workerd sandbox | 5m wall clock |
| Browser | Web automation, scraping | Browser isolation (Cloudflare) | 10m |
| Code | Code generation, review, execution | Firecracker microVM | 30m |
| File | Document conversion, media processing | Dedicated container | 60m |
| GPU | Model inference, embeddings | GPU-enabled sandbox | By plan |

## Sandbox Guarantees

- No network access to internal services
- No filesystem persistence between runs
- No access to other tenants' data
- Memory/CPU hard limits enforced
- All outbound requests logged
- DNS filtering for known-bad domains

## Security

- Every runtime starts clean (no state from previous runs)
- Network policy per runtime class
- Egress filtering (allowlist model APIs, search engines)
- Secrets injected via environment (never in code)
- Audit trail for every execution
