# IAI.ONE — KẾ HOẠCH TỐI ƯU HÓA HẠ TẦNG, BẢO MẬT & PHÂN BỔ MULTI-PROVIDER

**Ngày:** 2026-05-26
**Phạm vi:** iai.one core (iai.one, flow.iai.one, dash.iai.one, api.iai.one)
**Mục tiêu:** Không phụ thuộc đơn nhà cung cấp, tối ưu chi phí, bảo mật phân lớp
**Policy:** Không báo production-ready cho đến khi verified.

---

## 1. PHÂN TÍCH RỦI RO KHI DÙNG 100% CLOUDFLARE

Cloudflare là nền tảng edge xuất sắc (CDN, DNS, DDoS, Workers) nhưng phụ thuộc hoàn toàn vào một vendor tạo các điểm yếu chiến lược:

| Rủi ro | Mức độ | Tác động thực tế |
|--------|--------|-----------------|
| Vendor Lock-in | CAO | Workers API, D1 SQL dialect, KV API khó migrate |
| Pricing opacity | TRUNG BÌNH | D1 available on Free and Paid plans, but pricing model may evolve. Không dùng D1 cho user data chính |
| Regional latency | TRUNG BÌNH | Edge tốt cho static, nhưng DB query nặng vẫn cần regional compute |
| Enterprise negotiation | THẤP | Cloudflare ít linh hoạt discount so với AWS/GCP cho workload lớn |
| Data residency VN | TRUNG BÌNH | Không có PoP/DB region tại VN, latency ~50-80ms |
| Service outage | THẤP nhưng nghiêm trọng | Nếu CF sập, toàn bộ hệ (CDN + compute + DB + storage) chết |
| Feature gap | TRUNG BÌNH | Không có GPU inference, không có managed Kubernetes, vector search hạn chế |

**Kết luận:** Dùng Cloudflare cho edge layer (CDN, DNS, DDoS, lightweight routing) là tối ưu. Nhưng đặt toàn bộ compute, database, storage, AI vào Cloudflare là rủi ro tập trung (single point of failure).

---

## 2. KIẾN TRÚC ĐỀ XUẤT: HYBRID EDGE-CORE-CLOUD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER REQUEST                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌──────────────────────────┐          ┌──────────────────────────┐
│  DNS + CDN + WAF         │          │  DNS + CDN + WAF           │
│  Cloudflare (Primary)    │          │  AWS CloudFront (Backup)   │
│  api.iai.one             │          │  (failover CNAME)          │
└──────────┬───────────────┘          └──────────┬───────────────┘
           │                                       │
           ▼                                       ▼
┌──────────────────────────┐          ┌──────────────────────────┐
│  Edge Router / Gateway   │          │  Edge Router / Gateway     │
│  Cloudflare Workers      │          │  AWS Lambda@Edge           │
│  - Auth pre-check        │◄────────►│  - Failover routing       │
│  - Rate limit            │  sync    │  - Static cache            │
│  - Caching               │          │                            │
└──────────┬───────────────┘          └──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTROL PLANE (Region-aware)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ Auth Service│  │ Billing     │  │ Entitlement │  │ Orchestrator│       │
│  │ Fastify/Node│  │ Stripe/PayOS│  │ Gate        │  │ (instance)  │       │
│  │ (Container) │  │ (Webhooks)  │  │ (D1/Redis)  │  │             │       │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │
│         │                │                │                │              │
│         └────────────────┴────────────────┴────────────────┘              │
│                              AWS/GCP/Hetzner                               │
│                    (Multi-AZ, auto-scaling, managed)                       │
└──────────────────────────────────┬────────────────────────────────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
┌────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
│  Primary Database  │  │  Cache + Session   │  │  Object Storage    │
│  PostgreSQL (RDS)  │  │  Redis (ElastiCache)│  │  S3 / R2 (dual)    │
│  or Cloud SQL      │  │  or Memorystore    │  │                    │
│  - Users           │  │  - Sessions        │  │  - Backups         │
│  - Check-ins       │  │  - Rate limit      │  │  - Artifacts       │
│  - Flows           │  │  - Real-time data  │  │  - Audit logs      │
│  - Audit logs      │  │                    │  │                    │
└────────────────────┘  └────────────────────┘  └────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         AI / COMPUTE LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ OpenAI API  │  │ Anthropic   │  │ AWS Bedrock │  │ Self-hosted │       │
│  │ (Primary)   │  │ (Backup)    │  │ (Enterprise)│  │ Ollama/LM   │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  │ Studio      │       │
│                                                     │ (Hetzner)   │       │
│                                                     └─────────────┘       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. PHÂN BỔ NHÀ CUNG CẤP THEO LAYER

### Layer 1: Edge / DNS / CDN (Always Cloudflare)

| Chức năng | Provider | Lý do |
|-----------|----------|-------|
| DNS | Cloudflare | Nhanh nhất, DDoS protection built-in, free tier tốt |
| CDN | Cloudflare | 330+ PoP, Argo Smart Routing tốt |
| WAF / DDoS | Cloudflare | Tốt nhất thị trường ở tier này |
| SSL / TLS edge | Cloudflare | Universal SSL, 0-RTT |

**Không thay thế:** Edge layer giữ nguyên Cloudflare.

### Layer 2: API Gateway / Lightweight Compute (Hybrid)

| Chức năng | Primary | Backup / Overflow | Lý do |
|-----------|---------|-------------------|-------|
| Auth pre-check | Cloudflare Workers | AWS Lambda@Edge | Workers nhanh, Lambda@Edge dự phòng |
| Rate limiting | Cloudflare Workers + KV | Redis (regional) | KV tốt cho global, Redis cho precision |
| Static routing | Cloudflare Workers | AWS Lambda@Edge | CF Workers cheaper cho lightweight |
| Request logging | Cloudflare Workers → S3/R2 | Direct to S3 | Dual-write để tránh mất log |

**Quyết định:** Giữ Workers cho lightweight routing + Durable Objects cho realtime coordination (per-user command session, per-computer live state, approvals, mobile sync). Compute nặng (auth logic, billing calculation, long-running jobs) chuyển xuống container layer.

### Layer 3: Control Plane — 3 Mặt Phẳng (Container-based)

**Plane A: Identity & Entitlement**
| Chức năng | Provider | Lý do |
|-----------|----------|-------|
| Auth Service | AWS ECS / Hetzner | Fastify/Node cần stateful session |
| Billing Webhooks | AWS Lambda | Event-driven, auto-scale |
| Entitlement Gate | PostgreSQL + Redis | Quyền hạn, plans, limits |
| Payment | Stripe/PayOS | Webhook verify |

**Plane B: Computer Control**
| Chức năng | Provider | Lý do |
|-----------|----------|-------|
| Computer Orchestrator | AWS ECS / Hetzner | Instance lifecycle, command routing |
| Approval Gate | PostgreSQL + Durable Objects | Realtime approval, state sync |
| State Sync | Redis + Durable Objects | Hot state + realtime coordination |
| Audit | PostgreSQL + S3 | Append-only, immutable |

**Plane C: Work Execution (Sandbox Runtime)**
| Chức năng | Provider | Lý do |
|-----------|----------|-------|
| Code Sandbox | Firecracker / gVisor / Docker seccomp | Cô lập, không đụng production DB |
| Browser Sandbox | Puppeteer/Playwright trong container | Scraping, automation |
| File Sandbox | ClamAV + quarantine | Scan trước xử lý |
| Agent Runtime | OpenAI Agents SDK trong container | Tool calling, planning |
| Workflow Runtime | Temporal / self-hosted worker | State machine, retry |
| Self-Upgrade Runtime | Isolated container | Patch, rollback |

**Ràng buộc:** Plane C không được đụng trực tiếp production DB của Plane A và B. Mọi tương tác qua queue hoặc API.

**Quyết định:** Không dùng Workers cho business logic nặng. Container ở AWS hoặc Hetzner cho control plane. Sandbox runtime tách biệt.

### Layer 4: Database (Primary + Replica)

| Chức năng | Primary | Backup / Read Replica | Lý do |
|-----------|---------|---------------------|-------|
| User data | PostgreSQL (AWS RDS) | PostgreSQL (GCP Cloud SQL hoặc self-hosted) | D1/KV không dùng làm source of truth cho user data. Chỉ dùng cho config nhẹ, edge cache, feature flags |
| Sessions / Temp | Redis (ElastiCache) | Redis (Cloud Memorystore) | D1 quá chậm cho session high-frequency |
| Cache | Redis | Cloudflare KV | KV cho global config, Redis cho real-time |
| Audit logs | PostgreSQL + S3 | ClickHouse (self-hosted) | Append-only lớn, cần time-series query |
| Config / Feature flags | Cloudflare KV | PostgreSQL fallback | KV phù hợp, nhưng cần backup |

**Quyết định:** D1 chỉ dùng cho lightweight config, không dùng cho user data chính. PostgreSQL RDS là primary database.

### Layer 5: Storage (Dual-write)

| Chức năng | Primary | Backup | Lý do |
|-----------|---------|--------|-------|
| Object storage | AWS S3 | Cloudflare R2 | S3 là standard, R2 cheaper cho egress |
| Backups | S3 + R2 | GCP Cloud Storage | 3-copy rule: S3 + R2 + GCP |
| Static assets | Cloudflare Pages | AWS S3 + CloudFront | Pages tiện, S3 dự phòng |

**Quyết định:** Dual-write S3 + R2. S3 primary cho AWS core ở giai đoạn đầu. R2 dùng cho edge delivery, backup copy, egress optimization. Về sau primary store có thể theo region hoặc enterprise contract.

### Layer 6: AI / LLM Provider (Multi-provider)

| Provider | Use case | Fallback |
|----------|----------|----------|
| OpenAI GPT-4o | Primary general reasoning | Anthropic Claude |
| Anthropic Claude | Long context, safety-critical | OpenAI |
| AWS Bedrock | Enterprise / compliance | Self-hosted |
| Self-hosted (Hetzner GPU) | Sensitive data / cost control | Bedrock |

**Quyết định:** Không phụ thuộc 1 AI provider. Circuit breaker pattern: nếu OpenAI timeout → fallback Anthropic → fallback Bedrock.

---

## 4. SO SÁNH CHI PHÍ: 3 KỊCH BẢN

### Kịch bản A: All-Cloudflare (Current Path)

| Thành phần | Chi phí/tháng (ước tính tại 1000 users) |
|-----------|----------------------------------------|
| Workers (3 workers, 10M req) | $5 |
| D1 (1GB, 10M rows read) | $0 (free tier) |
| KV (1GB) | $0.50 |
| R2 (50GB) | $1.50 |
| Pages (3 sites) | $0 |
| Email (Workers + Resend) | $20 |
| AI (OpenAI) | $200 |
| **Tổng** | **~$227/tháng** |

**Rủi ro:** Lock-in, D1 beta pricing có thể tăng, không có regional compute.

### Kịch bản B: Hybrid Cloudflare Edge + AWS Core (Đề xuất)

| Thành phần | Provider | Chi phí/tháng |
|-----------|----------|---------------|
| DNS + CDN + WAF | Cloudflare Pro | $20 |
| Workers (edge routing) | Cloudflare | $5 |
| API Containers (ECS Fargate) | AWS | $50 |
| PostgreSQL (RDS t3.micro hoặc tương đương) | AWS | $15 | Kiểm tra điều kiện free tier thực tế của account |
| Redis (ElastiCache) | AWS | $15 |
| S3 (50GB + backup) | AWS | $2 |
| Lambda (webhooks, jobs) | AWS | $10 |
| AI (OpenAI + Anthropic) | Multi-provider | $250 |
| Email (SES) | AWS | $5 |
| **Tổng** | **~$372/tháng** |

**Rủi ro thấp hơn:** Không lock-in, regional compute, managed DB, auto-scaling.

### Kịch bản C: Multi-cloud Full + Self-hosted (Future-proof)

| Thành phần | Provider | Chi phí/tháng |
|-----------|----------|---------------|
| DNS + CDN | Cloudflare Pro | $20 |
| Compute | Hetzner Cloud (3 VMs) | $30 |
| Database | PostgreSQL self-hosted | $0 (trên Hetzner) |
| Cache | Redis self-hosted | $0 (trên Hetzner) |
| Object Storage | S3 + R2 + GCP | $5 |
| AI | OpenAI + self-hosted GPU | $200 + $50 |
| Monitoring | Grafana Cloud | $0 |
| **Tổng** | **~$305/tháng** |

**Rủi ro thấp nhất:** Không phụ thuộc AWS, full control. Nhưng cần DevOps time nhiều hơn.

### Khuyến nghị chi phí theo giai đoạn

| Giai đoạn | Kịch bản | Chi phí/tháng | Lý do |
|-----------|----------|---------------|-------|
| 0-3 tháng (dev + beta) | **B nhưng thu nhỏ** | ~$100-150 | Cloudflare Workers + RDS free tier, chưa cần ECS |
| 3-12 tháng (growth) | **B đầy đủ** | ~$300-400 | Scale ECS, Redis, S3 |
| 12+ tháng (enterprise) | **C cho compute, B cho managed DB** | ~$400-600 | Hetzner cho compute, RDS cho DB |

---

## 5. BẢO MẬT PHÂN LỚP (DEFENSE IN DEPTH)

### Layer 0: DNS / Edge

| Control | Implementation |
|---------|---------------|
| DDoS mitigation | Cloudflare Magic Transit + rate limit |
| DNSSEC | Enabled trên Cloudflare |
| CNAME flattening | Tránh DNS hijack |
| Bot management | Cloudflare Bot Fight Mode |

### Layer 1: Network

| Control | Implementation |
|---------|---------------|
| TLS 1.3 only | Enforce qua Cloudflare + ALB |
| mTLS internal | Container-to-container trong VPC |
| Private subnets | RDS, Redis không public IP |
| Security groups | Chỉ allow từ API container |

### Layer 2: Application

| Control | Implementation |
|---------|---------------|
| Zero Trust auth | Magic link + JWT + refresh token |
| Input validation | Zod schema mọi endpoint |
| SQL injection | Parameterized queries (pg) |
| XSS / CSRF | Helmet.js, CSP headers |
| Rate limiting | Redis token bucket per user/IP |
| Secret management | AWS Secrets Manager (không hardcode) |

### Layer 3: Data

| Control | Implementation |
|---------|---------------|
| Encryption at rest | RDS encryption AES-256, S3 SSE |
| Encryption in transit | TLS 1.3 mọi connection |
| Per-tenant encryption | AWS KMS với key rotation |
| PII handling | Hash email, không log password |
| Backup encryption | Backup được encrypt trước khi lưu |

### Layer 4: AI / LLM Security

| Control | Implementation |
|---------|---------------|
| Prompt injection guard | Input filter + output validation |
| PII redaction | Trước khi gửi tới AI provider |
| Token limit | Max tokens per request |
| Cost ceiling | Hard limit $/user/day |
| No sensitive data to public LLM | Self-hosted cho sensitive data |

### Layer 5: Audit & Compliance

| Control | Implementation |
|---------|---------------|
| Immutable audit log | Append-only, hash chain |
| Log retention | 7 năm cho financial, 1 năm cho operational |
| Access review | Quarterly admin review |
| Penetration test | 6 tháng/lần (external) |
| Incident response | Playbook + on-call rotation |

---

## 5.5. PER-USER AI COMPUTER INSTANCE ARCHITECTURE

### Core entities

| Entity | Mô tả | Nơi lưu |
|--------|-------|---------|
| computer_templates | Định nghĩa cấu hình máy (tier, resources, apps) | PostgreSQL |
| computer_instances | Instance đang chạy của user | PostgreSQL |
| computer_state | Trạng thái runtime hiện tại | Redis + Durable Objects |
| computer_memory_profiles | Memory và preference | PostgreSQL |
| computer_runtime_bindings | Kết nối tới worker/agent | PostgreSQL |
| computer_result_store | Kết quả đầu ra | S3 + PostgreSQL metadata |
| computer_approval_policy | Quy tắc phê duyệt | PostgreSQL |
| computer_cost_policy | Giới hạn chi phí | PostgreSQL + Redis |

### Instance lifecycle

```
Template → Provision → Running → Sleep → Wake → Terminate
              │           │         │       │         │
              ▼           ▼         ▼       ▼         ▼
         Durable    Sandbox    State   State  Archive
         Object     Runtime    Sync    Sync
```

### Economics per instance type

| Instance type | Mô tả | Chi phí/tháng ước tính |
|--------------|-------|------------------------|
| Inactive | Không chạy, chỉ storage | ~$0 |
| Warm | Ready, ít tác vụ | ~$5-10 |
| Active (Personal) | Check-in, flow, agent | ~$15-30 |
| Creator/Business | Nhiều agent, browser, code | ~$50-100 |
| Enterprise | Isolated, compliance, GPU | ~$200-500 |

---

## 5.6. MOBILE REALTIME CONTROL ARCHITECTURE

Mobile là remote control chính. Phải có realtime coordination.

### Channels

| Channel | Công nghệ | Mục đích |
|---------|-----------|----------|
| Push events | Durable Objects + WebSocket | Realtime state update |
| Run status | Durable Objects subscription | Theo dõi command run |
| Approval prompts | Mobile push + Durable Objects | Phê duyệt từ xa |
| Resumable commands | Redis + Durable Objects | Tiếp tục command sau reconnect |
| Background tasks | Queue + push | Thông báo task hoàn thành |
| Attachment upload | S3 presigned URL + WebSocket | Upload từ phone |
| Command handoff | Durable Objects | Chuyển command desktop ↔ phone |

### WebSocket hibernation

- Durable Objects hỗ trợ WebSocket hibernation — object sleep khi không có connection, wake khi có event
- Phù hợp cho millions of per-user objects
- SQLite-backed storage GA

---

## 6. DATA RESIDENCY & REGIONAL STRATEGY

| Region | Primary compute | Primary DB | AI Provider | Data Residency |
|--------|----------------|------------|-------------|---------------|
| Vietnam (VN) | Singapore AWS | Singapore RDS | OpenAI (US) | User data ở SG, AI call đi US |
| US | US-East-1 | US-East-1 RDS | OpenAI (US) | Full US |
| EU | eu-west-1 | eu-west-1 RDS | Azure OpenAI (EU) | GDPR compliant |
| Singapore / APAC | ap-southeast-1 | ap-southeast-1 RDS | AWS Bedrock (SG) | Full APAC |

**Quyết định:** Bắt đầu với Singapore (gần VN nhất, latency ~30-50ms). Khi có user EU, mở region EU.

---

## 7. DISASTER RECOVERY & BACKUP

### Backup Strategy

| Data | Frequency | Retention | Primary Store | Secondary Store |
|------|-----------|-----------|---------------|-----------------|
| PostgreSQL | Daily snapshot + WAL | 30 days | RDS snapshot | S3 |
| Redis | Hourly RDB | 7 days | ElastiCache backup | S3 |
| S3 objects | Cross-region replication | Forever | S3 (US-East) | R2 (Global) |
| Workers config | Per deploy | All versions | Git | S3 |

### DR RPO / RTO

| Scenario | RPO | RTO | Action |
|----------|-----|-----|--------|
| Single container crash | 0 | 2 min | Auto-restart ECS task |
| DB instance failure | 5 min | 15 min | Failover to RDS Multi-AZ |
| Region failure (SG) | 15 min | 1 hour | Route to US-East-1, restore from backup |
| Cloudflare outage | 0 (static) | 10 min | Switch CNAME to AWS CloudFront |
| AI provider outage | 0 | Instant | Circuit breaker → fallback provider |

---

## 8. MIGRATION PATH TỪ HIỆN TẠI

### Hiện tại (State 0)
- Cloudflare Workers: chưa có
- Database: better-sqlite3 local (Computer repo)
- Storage: local / GitHub Pages
- AI: simulated (không gọi real API)
- Auth: in-memory stub

### Giai đoạn 1: Foundation (Tháng 1)

**Mục tiêu:** Cloudflare edge + AWS core hoạt động.

- [ ] Tạo AWS account (hoặc dùng account hiện có)
- [ ] Tạo RDS PostgreSQL (t3.micro, Singapore) — Kiểm tra điều kiện free tier thực tế của account trước khi chốt chi phí
- [ ] Tạo ElastiCache Redis (cache.t3.micro)
- [ ] Tạo S3 bucket (standard + versioning)
- [ ] Deploy Cloudflare Workers (api-gateway) — chỉ routing + auth pre-check
- [ ] Deploy Fastify/Node container trên ECS Fargate (hoặc Hetzner nếu tiết kiệm)
- [ ] Connect container tới RDS + Redis
- [ ] D1: Không dùng cho user data. Chỉ dùng KV cho config global.

### Giai đoạn 2: Scale Edge (Tháng 2-3)

- [ ] Workers thêm caching, rate limiting với Redis backend
- [ ] S3 cross-region replication bật
- [ ] RDS read replica nếu query nặng
- [ ] Lambda@Edge dự phòng cho Workers

### Giai đoạn 3: Multi-provider AI (Tháng 3-4)

- [ ] Circuit breaker: OpenAI → Anthropic → Bedrock
- [ ] Self-hosted Ollama trên Hetzner (cho sensitive data)
- [ ] Cost governor hoạt động cross-provider

### Giai đoạn 4: Self-hosted Compute (Tháng 6-12)

- [ ] Chuyển ECS Fargate → Hetzner Cloud (nếu cost > $200/tháng)
- [ ] Giữ RDS cho database (managed quan trọng hơn tiết kiệm)
- [ ] Monitoring: Grafana Cloud + Cloudflare Analytics + AWS CloudWatch

---

## 9. GIẢM THIỂU RỦI RO CHÍNH

| Rủi ro | Giảm thiểu | Chi phí thêm |
|--------|-----------|-------------|
| Cloudflare outage | Lambda@Edge + S3 failover | ~$10/tháng |
| AI provider outage | Multi-provider + circuit breaker | ~$50/tháng (dự phòng) |
| Database corruption | RDS Multi-AZ + daily snapshot | ~$15/tháng |
| Data breach | Encryption + private subnet + audit | ~$0 (cấu hình) |
| Cost shock | Governor + hard limit + alert | ~$0 (code) |
| Vendor lock-in | Containerize + PostgreSQL standard | ~$0 (kiến trúc) |

---

## 10. KHUYẾN NGHỊ TỐI ƯU CUỐI CÙNG

### Nguyên tắc vàng

1. **Cloudflare = Edge + Coordination.** DNS, CDN, WAF, lightweight routing, Durable Objects cho per-user/per-computer realtime state. Không đặt business logic nặng, database chính, hoặc AI compute ở Cloudflare.
2. **PostgreSQL là source of truth.** Không dùng D1 cho relational data phức tạp.
3. **Container cho compute.** Fastify/Node chạy trên ECS hoặc Hetzner, không phải Workers.
4. **Multi-provider AI.** Luôn có fallback provider.
5. **Dual-write storage.** S3 + R2 để tránh mất dữ liệu.
6. **Redis cho session/cache.** Không dùng D1/KV cho high-frequency read/write.

### Kiến trúc tối thiểu khởi động (Month 1)

```
User → Cloudflare DNS → Cloudflare Workers (routing only)
                          ↓
                    AWS ALB → ECS Fargate (Fastify/Node)
                          ↓
                    RDS PostgreSQL (Singapore)
                    ElastiCache Redis
                    S3 (storage)
                    SES (email)
```

**Chi phí tháng 1:** ~$50-80 (t3.micro RDS free tier, Fargate spot, S3 minimal).

### Kiến trúc mục tiêu (Month 6)

```
User → Cloudflare DNS + CDN
       ↓
  Cloudflare Workers (auth pre-check, rate limit, cache)
       ↓
  AWS ALB (multi-AZ)
       ↓
  ECS Fargate (auto-scaling)  OR  Hetzner Cloud (3 VMs)
       ↓
  RDS PostgreSQL (Multi-AZ)  +  Redis Cluster  +  S3 + R2 dual
       ↓
  OpenAI (primary) → Anthropic (fallback) → Bedrock (enterprise)
```

**Chi phí tháng 6:** ~$200-400 tùy traffic.

---

## 11. CHECKLIST QUYẾT ĐỊNH TRƯỚC KHI DEV

- [ ] **Chọn AWS region:** Singapore (ap-southeast-1) cho APAC / VN user
- [ ] **Tạo AWS account + IAM user với least privilege**
- [ ] **Tạo RDS PostgreSQL** (t3.micro, Singapore) — Kiểm tra điều kiện free tier thực tế của account
- [ ] **Tạo ElastiCache Redis** (cache.t3.micro)
- [ ] **Tạo S3 bucket** (standard, versioning, encryption)
- [ ] **Tạo ECS cluster + Fargate task definition**
- [ ] **Giữ Cloudflare:** DNS, CDN, Workers lightweight
- [ ] **Không tạo D1** cho user data (chỉ dùng KV cho config nếu cần)
- [ ] **Setup AWS Secrets Manager** cho API keys
- [ ] **Config Terraform / Pulumi** (hoặc AWS CDK) để infrastructure-as-code

---

## 12. TÓM TẮT GỢI Ý

| Câu hỏi | Câu trả lời |
|---------|------------|
| Dùng Cloudflare không? | **Có, cho edge + coordination** (DNS, CDN, WAF, Durable Objects realtime, lightweight routing) |
| Dùng D1/KV không? | **Không làm source of truth cho user data** — chỉ dùng cho config nhẹ, edge cache, feature flags, system registries |
| Database chính? | **PostgreSQL (RDS)** — portable, standard, managed |
| Cache? | **Redis (ElastiCache)** — không phải D1/KV |
| Compute? | **ECS Fargate hoặc Hetzner Cloud** cho control plane. Sandbox runtime tách biệt cho code/browser/file/agent execution |
| Storage? | **S3 + R2 dual-write** |
| AI? | **OpenAI + Anthropic + circuit breaker** |
| Email? | **AWS SES hoặc Resend** — SES cheaper cho volume lớn |
| Cost tháng 1? | **~$50-80** (AWS free tier + Cloudflare Pro) |
| Cost tháng 6? | **~$200-400** (tùy traffic) |

---

*End of Infrastructure Optimization & Security Plan*
