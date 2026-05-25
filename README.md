# computer.iai.one

computer.iai.one là **Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng**.

Đây không phải app, chatbot, web desktop giả lập hay product catalog thông thường. Mỗi người dùng sở hữu một **AI Computer Instance** riêng, có Data Vault, Memory, Super Apps, Agent Team, Command Kernel, Security Kernel, Sync Layer, Verification Engine và Self-Upgrading Kernel.

Mobile chỉ là Remote Control. Web chỉ là Console. Phần lõi thật là Computer OS.

## Current status

**INFRASTRUCTURE PLAN APPROVED WITH CONDITIONS**
**HYBRID EDGE-CORE ARCHITECTURE SELECTED**
**NOT PRODUCTION-READY**

This repo is still a reviewable scaffold, not a production-ready system.

### Infrastructure decisions (locked)

- Cloudflare = Edge + Coordination (DNS, CDN, WAF, Durable Objects realtime, lightweight routing)
- AWS Singapore = Core compute (Month 1)
- PostgreSQL RDS = Source of truth (user data, computer instances, audit)
- Redis = Session, cache, rate limit, hot state
- S3 + R2 = Dual-write object storage
- SES / Resend = Email
- OpenAI + Anthropic = Multi-provider AI (circuit breaker mandatory)
- D1/KV = Config only, NOT source of truth for user data
- Workers = Routing only, NOT heavy business logic
- Sandbox runtime = Separate from control plane

### Current implemented layer

- Web: product catalog, URL routes, pricing, and product detail pages.
- API: local Fastify scaffold with product, command, and run endpoints.
- Mobile: Expo command-center starter with API client, tasks, detail, approvals, and results screens.
- Runtime: simulated workers only.

### Target architecture

- Computer OS: instance manager, command kernel, data vault, memory, security kernel, self-upgrade kernel.
- Super Apps: browser, office, code, research, content, media, data, finance, sales, automation.
- Agent Team: router, planner, executor, reviewer, security, fact-check, release, report.
- Verification Court: evidence pack, confidence score, risk flags, truthful reporting.
- Vietnamese-first language system: tiếng Việt là ngôn ngữ gốc, English là ngôn ngữ thứ hai.

### Production blockers

- Real AI provider integration.
- PostgreSQL or production database.
- Auth UI and passkeys.
- Payment gateway.
- Email delivery.
- Admin console.
- Self-upgrade approval and rollback engine.
- EAS/device builds.
- CI/CD and deployment gates.
- Global infrastructure verification.
- Backup restore drill.
- Security review.

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

## Required status wording

Sau khi cập nhật tài liệu và kiến trúc, chỉ được báo:

```text
GLOBAL INFRASTRUCTURE ARCHITECTURE READY
SECURITY MODEL DEFINED
NOT PRODUCTION-READY UNTIL VERIFIED
```
