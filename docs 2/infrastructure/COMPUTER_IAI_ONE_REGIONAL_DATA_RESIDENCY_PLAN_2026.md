# COMPUTER.IAI.ONE — REGIONAL DATA RESIDENCY PLAN 2026

**Status:** Architecture approved (not production-ready)

## Zone Map

| Region | Code | Control Plane | Data Vault | Backup |
|--------|------|---------------|------------|--------|
| Vietnam | VN | Cloudflare + self-hosted | VN-only | VN + SG |
| US | US | Cloudflare Workers | US | US + EU |
| Europe | EU | Cloudflare Workers | EU | EU + US |
| Japan | JP | Cloudflare Workers | JP | JP + SG |
| Singapore | SG | Cloudflare Workers | SG | SG + AU |
| Australia | AU | Cloudflare Workers | AU | AU + JP |

## Rules

- User data stays in home region by default
- Cross-region sync requires explicit admin policy
- Vault keys never leave home region
- Audit logs region-locked for legal compliance
- Billing records follow legal entity jurisdiction

## Enterprise Data Residency

- Dedicated control plane per enterprise tenant
- Custom region rules (e.g., data must stay in EU)
- Private network integration (AWS Direct Connect / Cloudflare Tunnel)
