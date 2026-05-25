# COMPUTER.IAI.ONE — ZERO TRUST SECURITY ARCHITECTURE 2026

**Status:** Architecture approved (not production-ready)

## Principles

- Zero Trust: no implicit trust, verify every request
- Least Privilege: every runtime/user/agent gets minimum permissions
- Tenant Isolation: each AI Computer Instance fully isolated
- Defense in Depth: edge → control → instance → runtime → data

## Layers

| Layer | Controls |
|-------|----------|
| Edge | Rate limit, DDoS, TLS, API key validation |
| Gateway | Session auth, entitlement check, scope gate |
| Control Plane | JWT + refresh, multi-tenant DB isolation |
| Instance | Per-instance runtime sandbox, resource quota |
| Runtime | Sandbox (Cloudflare Workerd / Firecracker) |
| Data Vault | Per-tenant encryption keys, access audit |
| Memory | Encrypted at rest, tenant-scoped |
| Audit | Append-only, immutable, region-locked |

## Prohibited Claims

- "bảo mật tuyệt đối" — do not use
- "100% không lỗi" — do not use
- "production-ready" — only after readiness gate passes
