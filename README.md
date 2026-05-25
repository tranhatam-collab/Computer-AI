# computer.iai.one

**Global Self-Upgrading Personal AI Computer Infrastructure.**

Not a web app. Not a chatbot. Not a product catalog.

Every user gets their own AI Computer Instance with isolated Memory, Vault, Runtime, Super Apps, Agent Team, Command Kernel, Verification Engine, Security Kernel, and Self-Upgrading Kernel.

---

## Current Status

```
GLOBAL INFRASTRUCTURE ARCHITECTURE APPROVED
DEVELOPMENT SPEC REQUIRED
NOT PRODUCTION-READY
```

## Architecture

```
Global Edge (Cloudflare PoP)
  └─ Regional Control Plane (per data zone)
       └─ AI Computer Instance (per user)
            ├─ Secure Runtime (sandbox)
            ├─ Data Vault (encrypted per tenant)
            ├─ Memory System (encrypted at rest)
            ├─ Super Apps (modular capabilities)
            ├─ Agent Team (orchestration)
            ├─ Command Kernel (Vietnamese-first + EN)
            ├─ Verification Engine (auto + manual)
            ├─ Security Kernel (zero-trust, least-privilege)
            └─ Self-Upgrading Kernel (L1-L3 governance)
```

## Repo Structure

```
apps/          — Web console, mobile remote, admin console, API gateway
computer-os/   — Instance manager, command kernel, app runtime, agent engine
super-apps/    — Browser, office, code, research, content, media, finance, ...
agents/        — Router, planner, executor, reviewer, security, fact-check
runtimes/      — Edge, agent, sandbox, browser, code, file, dedicated
governance/    — Approval board, audit, incident, rollback, admin policy
protocols/     — MCP, A2A, OpenAPI, webhooks, telemetry
packages/      — Contracts, registry, entitlement, billing, audit, providers
infrastructure/— Architecture docs, security, DR, lifecycle, cost governance
```

## Quick Start

```bash
pnpm install
pnpm run check
```

## Documentation

See `docs/` for architecture, infrastructure, and execution plans.

## Prohibited Claims

- ❌ "production-ready" — must pass Production Readiness Gate first
- ❌ "bảo mật tuyệt đối" — security is always evolving
- ❌ "100% không lỗi" — no system is bug-free
- ❌ "AI tự làm mọi thứ" — human governance is required
- ❌ "global live" — only after readiness gate passes
