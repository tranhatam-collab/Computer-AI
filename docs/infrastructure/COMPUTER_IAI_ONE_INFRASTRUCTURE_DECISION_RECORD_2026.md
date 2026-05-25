# COMPUTER.IAI.ONE — INFRASTRUCTURE DECISION RECORD 2026

**Status:** APPROVED WITH CONDITIONS
**Date:** 2026-05-26
**Scope:** computer.iai.one core infrastructure

---

## 1. Nguyên tắc vàng (bắt buộc)

- Không phụ thuộc 1 vendor
- Không báo production-ready cho đến khi verified
- Không dùng D1/KV làm source of truth cho user data
- Không chạy business logic nặng trên Workers
- Sandbox runtime tách khỏi control plane
- Mobile là remote control chính

---

## 2. Quyết định từng layer

### 2.1 Edge Layer — Cloudflare

| Chức năng | Quyết định | Lý do |
|-----------|-----------|-------|
| DNS | Cloudflare | Nhanh nhất, DDoS protection built-in |
| CDN | Cloudflare | 330+ PoP, Argo Smart Routing |
| WAF | Cloudflare | Best-in-class ở tier này |
| TLS/SSL | Cloudflare Universal SSL | 0-RTT, free tier tốt |
| Lightweight routing | Cloudflare Workers | Auth pre-check, rate limit, edge cache |
| Realtime coordination | Cloudflare Durable Objects | Per-user command session, per-computer live state, approvals, mobile sync |
| Config/edge cache | Cloudflare KV | Feature flags, system registries, public catalog |

**Sửa đổi quan trọng:** Cloudflare không chỉ làm edge. Durable Objects được tận dụng cho stateful coordination giữa mobile, web và computer instance.

### 2.2 Core Compute — AWS / Hetzner

| Chức năng | Quyết định | Lý do |
|-----------|-----------|-------|
| Control plane | ECS Fargate hoặc Hetzner Cloud | Fastify/Node, stateful session, long-running |
| Background jobs | AWS Lambda hoặc Hetzner workers | Event-driven, queue-based |
| Database | PostgreSQL (AWS RDS) | Relational mạnh, transaction, audit |
| Cache/Session | Redis (ElastiCache) | High-frequency state, rate limit |
| Object storage | S3 primary + R2 secondary | Dual-write, không lock-in |
| Email | AWS SES hoặc Resend | SES cheaper volume lớn |
| Secrets | AWS Secrets Manager | Không hardcode, rotation |

**Region tháng 1:** Singapore (ap-southeast-1) — gần VN nhất, latency 30-50ms.

### 2.3 AI Layer — Multi-provider

| Provider | Vai trò | Thời điểm |
|----------|---------|-----------|
| OpenAI | Primary general reasoning | Tháng 1 |
| Anthropic | Fallback, long context, safety | Tháng 1 |
| AWS Bedrock | Enterprise, compliance | Sau tháng 6 |
| Self-hosted (Ollama/LM Studio) | Sensitive data, cost control | Sau tháng 6 |

**Bắt buộc:** Circuit breaker + cost governor cho mọi provider.

### 2.4 Data Layer

| Loại dữ liệu | Primary | Secondary | Không dùng |
|-------------|---------|-----------|------------|
| User data, identity, computer instances | PostgreSQL RDS | — | D1/KV |
| Session, rate limit, hot state | Redis | — | D1/KV |
| Config, feature flags, edge cache | KV | D1 (lightweight) | — |
| Per-computer coordination state | Durable Objects | — | — |
| Artifacts, backups, logs | S3 | R2 | — |
| Audit, evidence | PostgreSQL + S3 | — | — |

---

## 3. Kiến trúc 3 mặt phẳng (3-plane architecture)

### Plane A: Identity & Entitlement
- users, organizations
- products, plans, entitlements
- payments, device trust, passkeys

### Plane B: Computer Control
- computer_templates, computer_instances
- instance lifecycle, runtime registry
- command routing, approvals, state sync
- budgets, audit

### Plane C: Work Execution
- browser workers, code runners
- document workers, content/media workers
- data workers, enterprise isolated jobs

**Ràng buộc:** Plane C không được đụng trực tiếp production DB của Plane A và B. Mọi tương tác qua queue hoặc API.

---

## 4. Lớp per-user AI computer instance

Bắt buộc có:

- `computer_templates` — định nghĩa cấu hình máy
- `computer_instances` — instance đang chạy của user
- `computer_state` — trạng thái runtime hiện tại
- `computer_memory_profiles` — memory và preference
- `computer_runtime_bindings` — kết nối tới worker/agent
- `computer_result_store` — kết quả đầu ra
- `computer_approval_policy` — quy tắc phê duyệt
- `computer_cost_policy` — giới hạn chi phí

---

## 5. Mobile realtime control architecture

- Push events qua Durable Objects WebSocket
- Run status channels (subscribe per-run)
- Approval prompts (push notification)
- Resumable commands (state persisted)
- Background task notifications
- Attachment upload from phone
- Command handoff desktop ↔ phone

---

## 6. Các câu đã sửa so với bản gốc

| Câu cũ | Câu mới |
|--------|---------|
| "Cloudflare chỉ edge, không dùng cho logic nặng" | Cloudflare = edge + lightweight routing + Durable Objects coordination. Compute nặng ở ECS/Hetzner |
| "D1 beta, không nên dùng cho user data" | D1/KV không dùng làm source of truth cho user data. Chỉ dùng cho config nhẹ, edge cache, feature flags |
| "S3 là source of truth, R2 secondary" | S3 primary cho AWS core phase đầu. R2 dùng cho edge delivery, backup, egress optimization. Sau này primary theo region/enterprise |
| "RDS free tier 12 tháng" | Kiểm tra điều kiện free tier thực tế của tài khoản AWS trước khi chốt chi phí tháng 1 |
| "Control plane gộp chung" | Tách 3 planes: Identity, Computer Control, Work Execution |

---

## 7. Không được làm ngay (tháng 1)

- Không dựng Kubernetes
- Không multi-cloud đầy đủ
- Không self-host GPU
- Không mở EU region
- Không mở Bedrock enterprise
- Không Lambda@Edge backup
- Không D1 cho user data
- Không deploy business logic nặng lên Workers
- Không payment production nếu legal chưa khóa

---

## 8. Trạng thái được phép báo

```text
INFRASTRUCTURE PLAN APPROVED WITH CONDITIONS
HYBRID EDGE-CORE ARCHITECTURE SELECTED
NOT PRODUCTION-READY
NO AWS RESOURCE CREATION UNTIL FOUNDER SIGNOFF
```

---

*Decision locked. Implement only after Founder signoff for AWS resources.*
