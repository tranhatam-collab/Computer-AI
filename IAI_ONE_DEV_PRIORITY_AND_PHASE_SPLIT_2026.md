# COMPUTER.IAI.ONE — DEV PRIORITY & PHASE SPLIT 2026

**Status:** PHASE 1 ACTIVE — PHASE 2 DEFERRED UNTIL REAL USERS
**Date:** 2026-05-26
**Rule:** Không over-engineer phase 1. Phase 2 chỉ cập nhật khi có người dùng thật sự.

---

## Phase 1: Foundation (Dev xong ngay — 4-6 tuần)

Mục tiêu: API chạy được, DB hoạt động, AI kết nối, cost governor hoạt động.

### Thứ tự ưu tiên (làm lần lượt, không song song)

| # | File / Task | Mục đích | Est. Time |
|---|-------------|----------|-----------|
| 1 | `docker-compose.yml` (local) | PostgreSQL + Redis cho dev local | 30 min |
| 2 | `scripts/migrate.ts` | Runner apply SQL migration | 1h |
| 3 | `apps/api/src/db.ts` | PostgreSQL connection (pg) | 1h |
| 4 | `apps/api/src/routes/health.ts` | Health check với DB + Redis | 30 min |
| 5 | `apps/api/src/routes/computers.ts` | CRUD computer instances | 2h |
| 6 | `packages/ai-provider/src/index.ts` | OpenAI primary + Anthropic fallback + circuit breaker | 3h |
| 7 | `packages/cost-governor/src/index.ts` | Per-command, per-user, daily/monthly cap | 2h |
| 8 | `apps/api/src/routes/commands.ts` | Receive command → validate → route → track cost | 3h |
| 9 | `apps/api/src/routes/runs.ts` | Run lifecycle, sandbox call, result store | 3h |
| 10 | `apps/api/Dockerfile` | Containerize API cho ECS/Hetzner | 1h |
| 11 | `wrangler.toml` (Worker routing) | Cloudflare Worker proxy tới ALB | 1h |
| 12 | `.env.template` | Document mọi biến cần thiết | 30 min |

### Phase 1 — Không làm (scope cut)

- ❌ Multi-region (chỉ Singapore)
- ❌ Bedrock (chưa có enterprise user)
- ❌ Self-hosted GPU (chưa có volume)
- ❌ Firecracker/gVisor (Docker seccomp đủ phase 1)
- ❌ Durable Objects WebSocket (REST polling đủ phase 1)
- ❌ RLS policies (apply sau khi auth production-ready)
- ❌ Audit log partitioning (chưa có volume)
- ❌ Auto-scaling rules (manual scaling đủ phase 1)
- ❌ Advanced monitoring (CloudWatch basic đủ)

---

## Phase 2: Scale (Cập nhật khi có user thật — >100 active users)

Trigger: Daily active users > 100, hoặc monthly AI cost > $500.

| # | Cập nhật | Lý do |
|---|----------|-------|
| 1 | RDS Multi-AZ | High availability khi có paying users |
| 2 | Redis Cluster | Session volume cao |
| 3 | Durable Objects + WebSocket | Mobile realtime control |
| 4 | Bedrock integration | Enterprise compliance requests |
| 5 | Self-hosted GPU (Hetzner) | Cost reduction + sensitive data |
| 6 | Firecracker/gVisor sandbox | Security hardening |
| 7 | Audit log partitioning | Volume lớn |
| 8 | RLS policies | Tenant isolation production |
| 9 | Auto-scaling (ECS) | Traffic spike handling |
| 10 | Multi-region (EU, US) | Data residency compliance |
| 11 | Advanced monitoring (Grafana) | Observability cho team lớn |

---

## Decision Log

| Date | Quyết định | Lý do |
|------|------------|-------|
| 2026-05-26 | Docker seccomp thay vì Firecracker | Phase 1 không cần VM isolation |
| 2026-05-26 | REST polling thay vì WebSocket | Phase 1 mobile chưa cần realtime |
| 2026-05-26 | Manual scaling thay vì auto-scaling | Chưa biết traffic pattern |
| 2026-05-26 | OpenAI + Anthropic only | Bedrock cần enterprise contract |

---

*Phase 1 locked. Phase 2 gated by user metrics.*
