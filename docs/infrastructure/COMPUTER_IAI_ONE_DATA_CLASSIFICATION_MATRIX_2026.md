# COMPUTER.IAI.ONE — DATA CLASSIFICATION MATRIX 2026

**Status:** Architecture approved (not production-ready)

## Matrix

| Class | Examples | Storage | Encryption | Region Rule | Access |
|-------|----------|---------|------------|-------------|--------|
| Public | Landing page, docs, blog | CDN / R2 | Standard TLS | Global | No auth |
| User Private | Files, prompts, results, memory | Vault (R2) | AES-256 per tenant | User region | User + approved agents |
| Sensitive | ID docs, finance data, legal | Restricted Vault | Key per tenant (KMS) | Region-locked | User + explicit approval |
| Secret | API keys, tokens, encryption keys | Secret Vault | Envelope (KMS) | Not in prompt/agent context | Auth service only |
| Audit | Action logs, evidence, upgrade history | Append-only R2 | Immutable + signed | Region + backup | Admin + audit team |
| Billing | Invoices, payment state, subscriptions | Billing DB | AES-256 | Legal entity jurisdiction | Finance admin |
| Telemetry | Usage metrics, error traces, perf data | Observability DB | Standard | Regional | Ops team |

## Rules

- No secret data ever enters AI prompt context
- Sensitive data requires explicit approval before agent access
- User private data never leaves home region
- Audit records are immutable and cryptographically signed
- Backup copies follow same classification rules
