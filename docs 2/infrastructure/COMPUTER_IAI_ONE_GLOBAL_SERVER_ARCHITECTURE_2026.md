# COMPUTER.IAI.ONE — GLOBAL SERVER ARCHITECTURE 2026

**Status:** Architecture approved (not production-ready)

## Architecture

```
User → Global Edge (Cloudflare) → Regional Control Plane → AI Computer Instance
```

## Global Edge (Cloudflare)

- Points of Presence (PoP) in 330+ cities
- Static asset delivery via CDN
- API Gateway: auth pre-check, rate limit, routing
- Durable Objects for session state
- Queues for async command processing

## Regional Control Plane

One region per data residency zone (VN, US, EU, JP, SG, AU):

- Control API (Fastify/Node)
- Auth service
- Entitlement service
- Orchestrator (creates/manages AI Computer Instances)
- Synchronization service (Memory, Vault cross-region sync)

## AI Computer Instance Layer

- One instance per user
- Isolated runtime (sandbox container/worker)
- Attached: Memory, Vault, Super Apps, Agent Team, Security Kernel

## Hybrid Runtime

- Edge: lightweight routing, auth, caching, search
- Regional: heavy compute, browser, code, file processing
- Dedicated: enterprise sandbox, GPU inference, private deployment
