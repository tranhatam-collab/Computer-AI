# IAI.ONE ECOSYSTEM — BÁO CÁO AUDIT & KẾ HOẠCH TỔNG THỂ THỐNG NHẤT

**Ngày audit:** 2026-05-26
**Auditor:** Senior System Architect (20+ năm)
**Phạm vi:** Toàn bộ hệ sinh thái *.iai.one và các domain liên kết
**Policy tuân thủ:** Không báo cáo "100/100 hoặc production-ready" cho đến khi đạt đủ điều kiện kiểm chứng thực tế

---

## 1. PHÁN QUYẾT TỔNG THỂ

Sau khi đọc toàn bộ tài liệu kế hoạch và kiểm tra code runtime thực tế, tôi đưa ra phán quyết:

**Hệ sinh thái iai.one có tầm nhìn rõ ràng, tài liệu phong phú, nhưng execution bị phân mảnh nghiêm trọng.**

Cụ thể:
- **Tổng số spec documents:** 200+ file MD across 5 workspaces
- **Tổng số domain/subdomain được định nghĩa:** 30+
- **Số domain có production runtime thực sự:** 0
- **Số domain có real user > 10:** 0
- **Số workspace có CI/CD verified:** 0

**Điểm trung bình hệ sinh thái hiện tại: ~28/100** (vision 8/10, docs 7/10, code 2/10, infra 2/10, integration 1/10)

---

## 2. BẢN ĐỒ HỆ SINH THÁI

### Tier 1: Core iai.one

| Domain | Định vị | Trạng thái Runtime | Chủ sở hữu Spec |
|--------|---------|-------------------|----------------|
| `computer.iai.one` | AI Computer Catalog | Fastify local, web build pass, no real AI | Computer.iai.one |
| `home.iai.one` | Entry / Onboarding | CF Pages static, partial | aiaccountingloop.com |
| `app.iai.one` | Core Life OS | Next.js partial | aiaccountingloop.com |
| `flow.iai.one` | Execution Engine | CF Pages, api.flow broken | aiaccountingloop.com |
| `api.iai.one` | Control Plane | Workers partial | aiaccountingloop.com |
| `docs.iai.one` | Dev Onboarding | Live | aiaccountingloop.com |
| `lifecode.iai.one` | Personalization | Live | aiaccountingloop.com |
| `noos.iai.one` | Dashboard | Partial | aiaccountingloop.com |
| `cios.iai.one` | Control | Partial | aiaccountingloop.com |

### Tier 2: Strategic Satellites

| Domain | Định vị | Trạng thái Runtime | Chủ sở hữu Spec |
|--------|---------|-------------------|----------------|
| `vetuonglai.com` | Future-life Platform | Static pages, workers minimal | vetuonglai-system |
| `edu.vetuonglai.com` | Giáo dục công nghệ | Chưa có app | vetuonglai-system |
| `life.vetuonglai.com` | Đời sống nền tảng | Chưa có app | vetuonglai-system |
| `finance.vetuonglai.com` | Tài chính căn bản | Chưa có app | vetuonglai-system |
| `vc.vetuonglai.com` | Xác minh độc lập | Verify flow partial | vetuonglai-system |
| `invest.vetuonglai.com` | Đầu tư tỉnh táo | Chưa có app | vetuonglai-system |
| `green.vetuonglai.com` | Hành động xanh | Chưa có app | vetuonglai-system |
| `community.vetuonglai.com` | Đồng hành | Chưa có app | vetuonglai-system |
| `aiaccountingloop.com` | AI Accounting OS | Site frontend, workers empty | aiaccountingloop.com |
| `tranhatam.com` | Brand Root cá nhân | 5+ variants, không có canonical | tranhatam.com |
| `muonnoi.org` | Community + Work | Infrastructure ready, scattered | muonnoi.org |
| `ai.muonnoi.org` | AI Agent demo | Partial | muonnoi.org |
| `app.muonnoi.org` | Member app | Partial | muonnoi.org |
| `cuocsong.muonnoi.org` | Life subdomain | Static | muonnoi.org |
| `docs.muonnoi.org` | Docs platform | Partial | muonnoi.org |
| `nguoiviet.muonnoi.org` | Cộng đồng người Việt | Partial | muonnoi.org |
| `lamviec.muonnoi.org` | Work platform | Chưa có app | muonnoi.org |

---

## 3. AUDIT TỪNG WORKSPACE

### 3.1 Computer.iai.one

**Repo:** `git@github.com:tranhatam-collab/Computer-AI.git`
**Định vị khóa:** Hệ Máy Tính AI Cá Nhân Tự Nâng Cấp Có Kiểm Chứng
**Runtime:** Node/Fastify (port 3001), Vite/React web, Expo mobile

| Layer | Trạng thái (2026-05-29) | Đánh giá | Ghi chú |
|-------|-----------|----------|---------|
| Web Catalog | Build pass, 12 products, i18n VI/EN, lanes Sales/Finance/Enterprise | 8/10 | GitHub Pages deploy, shell routing qua LanePage generic |
| Mobile (Expo) | Multi-screen: Command/Tasks/Approvals/Results, API client | 6/10 | Token không persist qua restart, chưa có EAS build |
| Mobile Mirror (Web) | `/mobile` route, iOS/Android frame, full flow cloned | 7/10 | Gọi API thật, toggle iOS/Android, dark theme |
| API (Fastify) | PostgreSQL, routes: auth/products/command/runs/approvals/checkout | 6/10 | Postgres real, auth JWT ok nhưng thiếu magic link |
| Product Registry | 12 products, shells, entitlements, pricing, app-map per lane | 8/10 | Source of truth tốt |
| AI Routing | Intent→Lane→Model, provider factory | 7/10 | Real nếu có API key, Mock nếu không |
| Workflow Engine | State machine, verify, score, PostgreSQL-backed | 6/10 | Chạy được end-to-end |
| Runtime Workers | 5 workers, check ENABLE_RUNTIME_MOCK | 6/10 | Conditional real AI |
| Auth SDK | JWT real, session DB, không có magic link | 5/10 | `JWT_SIGNING_SECRET` thiếu trong render.yaml |
| Entitlement SDK | Gate logic exists, check subscription | 6/10 | Subscription not persisted → gate luôn fail sau restart |
| Audit SDK | Logs to DB | 6/10 | PostgreSQL-backed |
| Approval SDK | Flow exists, DB | 6/10 | Đang hoạt động |
| Billing SDK | Invoice DB ✓, `createSubscription` in-memory, email console.log | 4/10 | 2 bug production-blocking |
| Payment Providers | Stripe real HTTP ✓, PayOS real HTTP ✓, webhook verify stub | 5/10 | PayOS verifyWebhook không verify HMAC |
| Database | PostgreSQL, 5 migration files, advisory lock, migrate.ts | 7/10 | Không phải D1 nhưng real DB |
| CI/CD | GitHub Actions build ✓, render.yaml Docker deploy ✓ | 5/10 | Thiếu test step, migration step |

**Tổng điểm: ~50/100** *(cập nhật từ 35/100, audit 2026-05-29)*

### 3.2 vetuonglai-system

**Repo:** vetuonglai-system
**Định vị khóa:** Future-life platform — học đúng, sống đúng, làm đúng, xác minh được

| Thành phần | Trạng thái | Ghi chú |
|-----------|-----------|---------|
| Spec documents | 80+ file MD | Rất chi tiết, đọc mất nhiều ngày |
| Root hub (`vetuonglai.com`) | Static HTML partial | Có homepage basic |
| EDU subdomain | Không có app | Chỉ có spec |
| Life subdomain | Không có app | Chỉ có spec |
| Finance subdomain | Không có app | Chỉ có spec |
| VC subdomain | Verify flow partial | Worker đơn giản |
| Invest/Green/Community | Không có app | Chỉ có spec |
| Data model | Documented | Chưa có schema DDL |
| API surface | Documented | Chưa có implementation |
| Auth | Magic-link spec | Chưa có code |
| Workers | 2 generic workers | Chưa có domain-specific workers |
| Content system | 50+ story files JSON | Static content, chưa có CMS |

**Tổng điểm: ~20/100** (tài liệu 9/10, code 1/10)

**Vấn đề chí mạng:** Team đã viết spec cho 12 tuần nhưng không có codebase để execute. Spec không tự chạy được.

### 3.3 aiaccountingloop.com

**Repo:** aiaccountingloop.com
**Định vị khóa:** Autonomous Accounting Operating System

| Thành phần | Trạng thái | Ghi chú |
|-----------|-----------|---------|
| Site frontend | HTML/CSS/JS functional | Có nhiều trang: pricing, product, trust, legal |
| Workers | 10 directories, hầu hết trống | Chỉ audit-binder-consumer có code |
| Desktop app | Tauri + React | Chưa hoàn thiện, chưa sign |
| D1 migrations | 3 SQL files | Schema cơ bản tồn tại |
| API contract | Documented | Chưa có implementation đầy đủ |
| Multi-country | Vision rõ | Chưa có country pack nào hoàn chỉnh |
| E-invoice QR | Worker stub | Chưa connect real gateway |

**Tổng điểm: ~25/100**

### 3.4 tranhatam.com

**Repo:** tranhatam.com
**Định vị khóa:** Brand root — Đọc. Hiểu. Làm. Tạo giá trị thật.

| Thành phần | Trạng thái | Ghi chú |
|-----------|-----------|---------|
| WEB-TRANHATAM.COM | Nhiều bản variant | .clean, .repair, BACKUP, FRESH, QUARANTINE |
| Public web | Có vấn đề brand/IA | "Flatform" wording, duplicated bilingual headings |
| Content audit | Tồn tại (2026-05-20) | Chưa áp dụng xong |
| Books system | 50+ sách trong kế hoạch | Chưa có publishing pipeline |
| Workers API | Đang dev | `workers/api/src/index.ts` đang mở |

**Tổng điểm: ~30/100**

**Vấn đề chí mạng:** Không có canonical repo. 5+ biến thể cùng tồn tại, team không biết bản nào là source of truth.

### 3.5 muonnoi.org

**Repo:** muonnoi.org
**Định vị khóa:** Community platform with AI — muốn nói, làm việc, cuộc sống

| Thành phần | Trạng thái | Ghi chú |
|-----------|-----------|---------|
| Subdomains | 6+ đang hoạt động | ai, app, cuocsong, docs, nguoiviet, lamviec |
| ai.muonnoi.org | Partial | Next.js app, agent demos |
| app.muonnoi.org | Partial | Next.js, member app skeleton |
| Mobile APIs | Documented | Chưa có real implementation |
| Docs platform | Partial | Static HTML |
| Infrastructure | DNS + CF Pages ready | Có wrangler config |

**Tổng điểm: ~30/100**

---

## 4. VẤN ĐỀ XUYÊN SUỐT (CROSS-CUTTING ISSUES)

### Issue #1: Spec-to-Code Ratio Quá Cao
- **Dấu hiệu:** 200+ MD files, ~15 packages/apps có code thực, hầu hết là scaffold
- **Hậu quả:** Team đọc không xuể, context switching liên tục, không ai nhớ hết
- **Ngưỡng nguy hiểm:** Khi spec > 10x lines of code, execution bị tê liệt

### Issue #2: Không Có Unified Identity
- Mỗi workspace có auth riêng: magic-link (vetuonglai), JWT stub (computer), Tauri auth (desktop)
- User phải đăng ký lại trên mỗi domain
- Không có shared session, shared profile, shared subscription

### Issue #3: Không Có Shared Data Layer
- Computer: better-sqlite3 local
- Accounting: D1 migrations nhưng chưa kết nối production
- Về Tương Lai: JSON static files
- Muốn Nói: Chưa rõ schema
- Không có foreign key, không có cross-domain data integrity

### Issue #4: Runtime Architecture Không Thống Nhất
- Computer: Node/Fastify (local dev)
- Accounting: Cloudflare Workers (production intent)
- Về Tương Lai: Static HTML + generic workers
- Muốn Nói: Next.js + CF Pages
- **Quyết định bị delay:** Workers vs Node cho API layer

### Issue #5: Subdomain Sprawl Không Kiểm Soát
- 30+ domain/subdomain được định nghĩa
- < 10 có app code thực sự
- > 20 chỉ có landing page hoặc spec
- Mỗi subdomain cần SSL, DNS, CI/CD, monitoring → chi phí ẩn

### Issue #6: Không Có Real External Integration
- AI Provider: Interface exists, no API key configured
- Payment: Stripe/PayOS stub, no real wiring
- Email: console.log fallback
- Storage: Local/R2 stub
- Push Notifications: Not configured

### Issue #7: Duplicate/Divergent File Variants
- `tranhatam.com` có 5+ repo variants (.clean, .repair, BACKUP, FRESH, QUARANTINE)
- `aiaccountingloop.com` có file v2, v3, backup versions
- `muonnoi.org` có corrupt backups
- **Hậu quả:** Không biên version control thực sự, mất dấu source of truth

### Issue #8: Không Có Production Readiness Gates
- Không có security audit
- Không có backup/restore test
- Không có incident response playbook đã test
- Không có real user monitoring
- Không có cost guard (AI bill shock risk)

---

## 5. KẾ HOẠCH TỔNG THỂ THỐNG NHẤT

### 5.1 Nguyên tắc thiết kế lại (Design Principles)

1. **One User, One Identity** — Dùng chung auth layer qua `api.iai.one`
2. **One Data Layer** — Cloudflare D1 làm source of truth cho user/profile/subscription/audit
3. **Workers-First Edge Runtime** — Chuẩn hóa Cloudflare Workers cho API + compute
4. **Domain Isolation, Shared Core** — Mỗi subdomain có UI riêng, dùng chung auth/billing/audit
5. **Real Before Perfect** — Có user thật trước, mở rộng subdomain sau
6. **Spec Freeze, Code Sprint** — 30 ngày không viết spec mới, chỉ code
7. **Canonical Source of Truth** — Mỗi workspace chỉ giữ 1 repo active, archive còn lại

### 5.2 Kiến trúc mục tiêu thống nhất

```
┌─────────────────────────────────────────────────────────────┐
│                    IAI.ONE UNIFIED PLATFORM                  │
├─────────────────────────────────────────────────────────────┤
│  PRESENTATION LAYER                                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ computer.   │ │ vetuonglai. │ │ aiaccounting│           │
│  │ iai.one     │ │ com         │ │ loop.com    │           │
│  │ (Catalog)   │ │ (Life/Edu)  │ │ (Accounting)│           │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ tranhatam.  │ │ muonnoi.    │ │ app.iai.one │           │
│  │ com         │ │ org         │ │ (Dashboard) │           │
│  │ (Brand)     │ │ (Community) │ │             │           │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘           │
├─────────┴───────────────┴───────────────┴──────────────────┤
│  API GATEWAY — api.iai.one (Cloudflare Workers)             │
│  ├── /v1/auth       (Magic Link, Session, JWT)             │
│  ├── /v1/users     (Profile, Preferences, Journey)         │
│  ├── /v1/billing   (Stripe/PayOS, Subscriptions)            │
│  ├── /v1/products  (Registry, Entitlements)                 │
│  ├── /v1/runs      (Workflow, Routing, Verification)        │
│  ├── /v1/audit     (Logs, Evidence)                       │
│  ├── /v1/vc        (Credentials, Verify)                    │
│  └── /v1/{domain}  (Domain-specific)                       │
├─────────────────────────────────────────────────────────────┤
│  SHARED DATA LAYER (Cloudflare D1 + KV + R2)                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ users       │ │ sessions    │ │ profiles    │           │
│  │ subscriptions│ │ entitlements│ │ audit_logs  │           │
│  │ runs        │ │ outputs     │ │ approvals   │           │
│  │ vc_creds    │ │ proof_records│ │ consent    │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│  WORKER REGISTRY (Cloudflare Workers)                       │
│  ├── AI Orchestrator   (Intent → Model → Tool)              │
│  ├── Document Worker   (OCR, Extract, Classify)             │
│  ├── Browser Worker    (Search, Scrape)                     │
│  ├── Code Worker       (Generate, Review)                   │
│  ├── Content Worker    (Write, Format)                      │
│  ├── Accounting Worker (Journal, Reconcile, Report)         │
│  └── VC Worker         (Issue, Verify, Hash)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. VIỆC PHẢI LÀM NGAY — 30 NGÀY TỚI

### Blocker 1: Unified Identity & Auth (Ngày 1-7)
**Tại sao ưu tiên #1:** Không có auth = không có user = không có sản phẩm.

**Hành động cụ thể:**
- [ ] Tạo D1 database `iai-one-core` trên Cloudflare account chính *(chưa làm — đang dùng Postgres)*
- [ ] Deploy `api.iai.one` Worker với route `/v1/auth/magic-link` *(chưa làm — auth trên Render/Fastify, không phải CF Worker)*
- [x] Tích hợp email provider thật — **PARTIAL:** `getEmailProvider()` trong providers package có SendGrid, nhưng `sendEmail()` trong billing-sdk vẫn là `console.log()` — cần wiring
- [x] Tạo `@iai/auth-sdk` v2: JWT session, refresh token, logout — **DONE** (không phải magic link)
- [x] Connect `computer.iai.one` web login page tới real auth API — **DONE** (routes mounted)
- [ ] Auth session phải hoạt động cross-domain — **chưa làm**
- [ ] **BUG MỚI (2026-05-29):** Thêm `JWT_SIGNING_SECRET` vào `render.yaml` envVars — hiện thiếu

**Acceptance criteria:**
- User có thể đăng ký bằng email trên computer.iai.one *(đăng ký được, không nhận email xác nhận)*
- User nhận được magic link thật trong inbox ❌ *chưa đạt*
- User đăng nhập và giữ session qua refresh *(JWT 7 ngày — đạt, nhưng không phải magic link)*
- Đăng xuất hoạt động ✅

### Blocker 2: Real Database & Schema Lock (Ngày 3-10)
**Tại sao ưu tiên #2:** In-memory = mất dữ liệu khi restart. SQLite local không scale.

**Hành động cụ thể:**
- [x] Schema lock cho: users, sessions, invoices, runs, audit_logs — **DONE** (PostgreSQL, 5 migrations)
- [ ] D1 migration — **DIVERGED:** Đang dùng PostgreSQL thay vì D1. Quyết định: tiếp tục Postgres hay chuyển D1?
- [x] Migration system — **DONE:** `migrate.ts` với advisory lock hoạt động
- [ ] **BUG MỚI (2026-05-29):** `createSubscription()` không write DB — subscriptions mất khi restart. Cần thêm `subscriptions` table và persist
- [x] auth, audit, approval — write vào Postgres ✅
- [ ] billing `createSubscription` — vẫn in-memory ❌

**Acceptance criteria:**
- API restart không mất dữ liệu user ✅ *(users/sessions/invoices OK, subscriptions ❌)*
- Có thể query audit log từ DB ✅
- Migration chạy được trên local và production ✅ *(cần thêm step vào CI)*

### Blocker 3: Product-to-AI Alignment (Ngày 7-14)
**Tại sao ưu tiên #3:** `computer.iai.one` đã có 12 products nhưng AI là simulated. User không nhận được giá trị thực.

**Hành động cụ thể:**
- [x] Provider interface v2: OpenAI + Anthropic + circuit breaker + fallback — **DONE**
- [x] Factory: `getAIProvider()` check env vars, fallback MockAI — **DONE**
- [x] Workers (research, content, code, browser) check `ENABLE_RUNTIME_MOCK` — **DONE**
- [ ] Cấu hình API key thật trên Render — **PENDING** (keys chưa set trong Render dashboard)
- [x] End-to-end flow: Web → API → Router → Worker → Output — **DONE** *(mock mode)*
- [ ] Cost guard thật: `costCents` hardcoded = 0 trong single-provider path — **BUG (2026-05-29)**
- [ ] Quota limit nối vào real cost tracking — **chưa làm**

**Acceptance criteria:**
- User type → nhận output thật từ LLM ⚠️ *(Cần set API key trong Render)*
- Cost per run được log và giới hạn ❌ *(costCents = 0, không track)*
- Overload guard từ chối khi vượt quota ❌ *(chưa implement)*

### Blocker 4: Stop Spec Bloat — Code Sprint (Ngày 1-30)
**Tại sao ưu tiên #4:** Team đang viết spec thay vì code. Velocity = 0.

**Hành động cụ thể:**
- [ ] **FREEZE spec mới trong 30 ngày.** Không tạo file MD mới trừ bug report.
- [ ] Chuyển 70% effort từ "viết spec/review spec" sang "code + test + deploy"
- [ ] Mỗi spec hiện có phải map sang ít nhất 1 test có thể chạy được
- [ ] Archive/delete các file MD trùng lặp trong `tranhatam.com` variants
- [ ] Tạo `IAI_ONE_ACTIVE_REPOS.md` — liệt kê duy nhất các repo canonical

### Blocker 5: Domain Consolidation (Ngày 10-20)
**Tại sao ưu tiên #5:** Quá nhiều subdomain chưa có giá trị, phân tán nguồn lực.

**Hành động cụ thể:**
- [ ] **Ưu tiên 3 domain duy nhất trong 60 ngày:**
  1. `computer.iai.one` — AI Computer Catalog (monetization-ready)
  2. `vetuonglai.com` — EDU + Life (retention + community)
  3. `aiaccountingloop.com` — Accounting OS (B2B revenue)
- [ ] Tất cả subdomain khác redirect về domain chính hoặc để static teaser page
- [ ] Không mở thêm subdomain mới cho đến khi 3 domain trên có real user

### Blocker 6: Canonical Repo Cleanup (Ngày 5-10)
**Tại sao:** Không biết đâu là source of truth.

**Hành động cụ thể:**
- [ ] `tranhatam.com`: Chọn 1 repo canonical (khuyến nghị `WEB-TRANHATAM.COM_FRESH_R1`), archive/delete còn lại
- [ ] `aiaccountingloop.com`: Xóa file duplicate v2/v3, giữ bản mới nhất
- [ ] `muonnoi.org`: Xóa corrupt backups, giữ active repo
- [ ] Mỗi workspace có 1 `ARCHIVE/` folder duy nhất cho lịch sử, không để scattered

---

## 7. LỘ TRÌNH 12 TUẦN TỔNG THỂ

### Tuần 1-2: FOUNDATION LOCK
- D1 schema + auth API + magic link real
- Connect web login → real auth
- Freeze spec, bắt đầu code sprint
- Archive repo variants

### Tuần 3-4: AI RUNTIME REALITY
- Real AI provider (OpenAI/Anthropic) integration
- Research + Content workers live
- End-to-end workflow test với real output
- Quota/cost guard hoạt động

### Tuần 5-6: BILLING & MONETIZATION
- Stripe (global) + PayOS (Vietnam) integration
- Subscription gate + entitlement enforcement
- Pricing page với functional checkout
- Invoice generation + email delivery

### Tuần 7-8: CROSS-DOMAIN UNIFICATION
- Shared auth qua `api.iai.one` cho vetuonglai.com + muonnoi.org
- Unified user profile + journey stage
- Domain redirect: inactive subdomain → active domain

### Tuần 9-10: MOBILE & DEVICE
- EAS build cho computer.iai.one mobile
- Push notifications (Expo)
- Mobile command center với real API client

### Tuần 11-12: PRODUCTION GATES
- Security review (OWASP Top 10, prompt injection guard)
- Backup/restore test trên D1
- Performance test: API < 200ms, Web < 3s LCP
- Production deploy với real domain (không dùng GitHub Pages cho app)
- Real user onboarding: target 50 beta users

---

## 8. ĐIỀU KIỆN ĐƯỢC PHÉP BÁO "HOÀN THIỆN" (Release Criteria)

**Không được báo hoàn thiện hoặc production-ready cho đến khi đạt đủ:**

- [ ] **Real users:** Ít nhất 100 user hoạt động (đăng nhập ≥ 2 lần/tuần)
- [ ] **Real revenue:** Có ít nhất 10 giao dịch tiền thật qua Stripe/PayOS
- [ ] **Real AI:** Tất cả workers gọi real AI, không còn simulated output
- [ ] **Real persistence:** D1/KV/R2 production, không còn in-memory fallback
- [ ] **Backup tested:** Có thể restore D1 từ backup trong < 1 giờ
- [ ] **CI/CD passing:** Mọi push vào main pass test + build + deploy tự động
- [ ] **Security baseline:** OWASP Top 10 review, prompt injection guard, no secrets in repo
- [ ] **Monitoring:** Error tracking (Sentry), performance (CF Analytics), cost alerts
- [ ] **Incident response:** Playbook tồn tại, team đã drill ít nhất 1 lần
- [ ] **Legal compliance:** Privacy policy, terms, cookie consent hoạt động
- [ ] **Audit trail:** Mọi state-changing action có log immutable
- [ ] **Cost guard:** AI bill < $500/tháng trong giai đoạn beta, có alert 80% threshold

---

## 9. NGÂN SÁCH & TÀI NGUYÊN

| Resource | Mục đích | Ước tính/tháng | Bắt buộc? |
|----------|---------|----------------|-----------|
| Cloudflare Pro/Biz | Workers, D1, KV, R2, Pages | $20–200 | ✅ Có ngay |
| OpenAI API | AI workers | $50–500 | ✅ Sau tuần 3 |
| Anthropic API | AI workers backup | $50–300 | ⚠️ Optional |
| Stripe | Global payments | Transaction fee | ✅ Sau tuần 5 |
| PayOS | Vietnam payments | Transaction fee | ✅ Sau tuần 5 |
| Resend / SES | Email delivery | $10–50 | ✅ Có ngay |
| EAS Build | Mobile CI/CD | $30–100 | ⚠️ Tuần 9 |
| Sentry | Error tracking | $0–26 | ⚠️ Tuần 11 |
| GitHub Teams | Private repos, Actions | $4/user | ✅ Có ngay |

---

## 10. RỦI RO & GIẢM THIỂU

| Rủi ro | Xác suất | Tác động | Giảm thiểu |
|--------|---------|---------|-----------|
| AI bill shock | Trung bình | Cao | Cost guard, quota, max tokens |
| Auth bị tấn công | Thấp | Rất cao | Magic link (no passwords), rate limit, D1 WAL |
| Domain sprawl tiếp tục | Cao | Trung bình | Hard freeze subdomain mới, founder approval |
| Team burnout vì spec | Cao | Cao | 30-day spec freeze, code-first KPI |
| Data loss (in-memory) | Trung bình | Rất cao | Chuyển D1 ngay, backup daily |
| Payment fraud | Thấp | Cao | Stripe Radar, PayOS verification, webhook sig verify |
| Compliance (VN tax) | Trung bình | Cao | Country-pack cho VN, legal review trước launch |

---

## 11. KPI THEO DÕI HÀNG TUẦN

| KPI | Tuần 2 | Tuần 4 | Tuần 8 | Tuần 12 |
|-----|--------|--------|--------|---------|
| Real users (đăng nhập) | 5 | 20 | 50 | 100 |
| End-to-end runs (AI thật) | 0 | 50 | 200 | 500 |
| Code commits / tuần | 10 | 15 | 20 | 15 |
| Spec files mới | 0 | 0 | 0 | 0 |
| Test coverage | 20% | 40% | 60% | 70% |
| CI pass rate | 80% | 90% | 95% | 100% |
| API p95 latency | < 500ms | < 300ms | < 200ms | < 150ms |
| Mobile build success | N/A | N/A | 1 lần | Weekly |

---

## 12. KẾT LUẬN & KHUYẾN NGHỊ

### Kết luận
Hệ sinh thái iai.one có **tầm nhìn xuất sắc** và **tài liệu chi tiết**, nhưng execution bị tê liệt bởi:
1. Quá nhiều spec, quá ít code
2. Không có shared infrastructure (auth, data, billing)
3. Subdomain sprawl không kiểm soát
4. Không có real external integrations

### Khuyến nghị hành động trong 48 giờ tới

1. **Founder decision:** Chọn 3 domain ưu tiên duy nhất. Viết ra, thông báo team. Mọi domain khác đóng băng.
2. **Chọn canonical repo:** Mỗi workspace chọn 1 repo duy nhất, archive còn lại.
3. **Bắt đầu Blocker 1:** Tạo D1 database + deploy auth Worker. Đây là nền tảng cho mọi thứ.
4. **Thông báo team:** 30 ngày spec freeze. KPI = code commits, không phải pages written.

### Trạng thái được phép báo sau khi áp dụng

```
UNIFIED AUTH LAYER READY
REAL DATABASE PERSISTENT
AI RUNTIME CONNECTED
NOT PRODUCTION-READY UNTIL VERIFIED
```

---

---

## 13. AUDIT THỰC TẾ — 2026-05-29

**Auditor:** Code audit nghiêm ngặt — đọc source, không tin execution board  
**Phương pháp:** Đọc từng file implementation, so với acceptance criteria từng phase

### 13.1 Kết quả tổng

| Hạng mục | Claim (board) | Thực tế | Delta |
|---|---|---|---|
| Auth (magic link + email) | ✅ | 30% | JWT real, không magic link, email không gửi |
| DB persistence | ✅ | 70% | users/sessions/invoices OK, subscriptions ❌ |
| AI integration | ✅ | 60% | Conditional (cần API keys để real) |
| Payment gateway | ✅ | 65% | Stripe real, PayOS webhook stub |
| Email delivery | ✅ | 5% | console.log only |
| Mobile | ✅ | 60% | UI done, token không persist |
| CI/CD | ✅ | 50% | Build/deploy pass, no tests, no migration |
| Subscriptions | ✅ | 10% | in-memory stub, TODO comment |
| **Tổng thực tế** | ~100% | **~50/100** | |

### 13.2 Bugs production-blocking (theo thứ tự ưu tiên)

| # | Bug | File | Severity | Status |
|---|---|---|---|---|
| B1 | `JWT_SIGNING_SECRET` thiếu trong render.yaml | `render.yaml` | HIGH | ✅ FIXED |
| B2 | `sendEmail()` dùng console.log, không dùng `getEmailProvider()` | `packages/billing-sdk/src/index.ts:101` | HIGH | ✅ FIXED |
| B3 | `PayOSProvider.verifyWebhook()` không verify HMAC | `packages/providers/src/payos-provider.ts:54` | HIGH | ✅ FIXED |
| B4 | `createSubscription()` in-memory, không persist DB | `packages/billing-sdk/src/index.ts:28` | HIGH | ✅ FIXED |
| B5 | Mobile `authToken` biến module-level, mất khi app restart | `apps/mobile/src/api/client.ts:51` | MEDIUM | 🔲 PENDING |
| B6 | CI/CD không có DB migration step | `.github/workflows/deploy.yml` | MEDIUM | 🔲 PENDING |
| B7 | `costCents` hardcoded = 0 trong single-provider AI path | `packages/providers/src/factory.ts` | MEDIUM | 🔲 PENDING |

### 13.3 Tính năng mới thêm (2026-05-29)

| Feature | File | Status |
|---|---|---|
| Mobile Mirror page (web `/mobile`) | `apps/web/src/pages/MobileMirrorPage.tsx` | ✅ DONE |
| MobileAppMirror component — full flow clone | `apps/web/src/components/MobileAppMirror.tsx` | ✅ DONE |
| iOS / Android frame toggle | `apps/web/src/styles.css` | ✅ DONE |
| Route `/mobile` wired | `apps/web/src/App.tsx` | ✅ DONE |
| Sales / Finance / Enterprise nav links | `apps/web/src/data/vi.ts`, `en.ts` | ✅ DONE |
| EnterpriseLaneView | `apps/web/src/pages/EnterpriseLaneView.tsx` | ✅ DONE |
| LanePage generic router | `apps/web/src/pages/LanePage.tsx` | ✅ DONE |

### 13.4 Quyết định kiến trúc cần clarify

1. **PostgreSQL hay D1?** — Master plan ghi D1, code đang dùng PostgreSQL trên Render. Cần quyết định một trong hai để tránh diverge thêm.
2. **Magic link hay email+JWT?** — Hiện tại: `POST /auth/login` nhận email → trả JWT trực tiếp (không gửi OTP). Nếu giữ cách này, cần document rõ đây là "passwordless direct JWT" không phải magic link.
3. **Stripe hay PayOS làm primary?** — `getPaymentProvider()` ưu tiên Stripe. Nếu target Vietnam market là chính, cần flip ưu tiên.

---

*Last updated: 2026-05-29 — Audit nghiêm ngặt v2*

*End of Comprehensive Ecosystem Audit & Unified Master Plan*
