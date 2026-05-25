# IAI.ONE CORE DOMAIN AUDIT & DEV PLAN

**Scope:** iai.one | flow.iai.one | dash.iai.one | api.iai.one
**Date:** 2026-05-26
**Policy:** Không báo production-ready cho đến khi verified.

---

## 1. PHÁN QUYẾT TỔNG THỂ

Hệ iai.one core có **tầm nhìn rõ** (VitaNet = Life + Flow + Agent + Proof) nhưng **4 domain trung tâm đều chưa chạy thật**.

| Domain | Định vị | Trạng thái thực tế | Điểm |
|--------|---------|-------------------|------|
| `iai.one` | Root hub / Charter | Wix hoặc redirect, không có canonical app | 2/10 |
| `flow.iai.one` | Execution engine | Folder trống, CF Pages chưa build | 1/10 |
| `dash.iai.one` (noos) | Life Dashboard | Component `LifeDashboard.tsx` tồn tại nhưng chưa deploy | 3/10 |
| `api.iai.one` | Control plane / API Gateway | Không có worker implementation | 1/10 |
| `api.flow.iai.one` | Flow runtime API | **BROKEN** — cần fix ngay | 0/10 |

**Điểm trung bình core domain: ~1.5/10**

---

## 2. AUDIT CHI TIẾT TỪNG DOMAIN

### 2.1 iai.one (Root Hub)

**Theo spec:** Charter layer — philosophical entry, onboarding, ecosystem routing.

**Thực tế:**
- `aiaccountingloop.com` có `site/` là frontend chính (AI Accounting Loop) — **không phải iai.one root**
- `computer.iai.one` repo có web catalog (Vite/React) — **đây là product catalog, không phải root hub**
- `home.iai.one/` folder trong `aiaccountingloop.com` workspace — **trống**
- Không có app nào đang phục vụ `iai.one` root với đúng nghĩa onboarding + routing

**Vấn đề:**
- Root domain không có canonical application
- Wix cũ (theo spec) cần thay thế
- User mới không có điểm vào thống nhất

### 2.2 flow.iai.one (Execution Engine)

**Theo spec:** Core execution engine — workflow, node system, automation.

**Thực tế:**
- `flow.iai.one/` folder trong workspace — **trống (0 items)**
- `flow.iai.one.clean/` và `.clean.latest/` — cũng trống
- `computer.iai.one` repo có `packages/workflow-engine/` — **chạy local, in-memory/SQLite**, chưa deploy
- `IAI_DEV_WEEK_1_EXECUTION_CHECKLIST.md` xác nhận: `api.flow.iai.one` **BROKEN**
- Không có flow runtime nào chạy trên edge

**Vấn đề:**
- Execution engine là core value nhưng không có deployment
- API flow broken = không có runtime path từ UI → execution
- Workflow engine ở Computer repo chưa kết nối external

### 2.3 dash.iai.one / noos.iai.one (Life Dashboard)

**Theo spec:** Life Dashboard — check-in, metrics, action items, 12-week trend.

**Thực tế:**
- `noos.iai.one/` folder — **trống**
- `LifeDashboard.tsx` tồn tại ở root `aiaccountingloop.com/` — **component React hoàn chỉnh**
- Dashboard có: 4 metric cards (clarity, stability, value, legacy), line chart, risk signal, action list
- Chưa có backend API cung cấp data
- Chưa có check-in flow submit → API
- Chưa deploy lên domain

**Vấn đề:**
- UI đẹp nhưng là static component, chưa có data flow
- Không có check-in API để lưu trạng thái
- Không có user identity binding

### 2.4 api.iai.one (Control Plane / API Gateway)

**Theo spec:** API Gateway — auth, routing, rate limit, service discovery.

**Thực tế:**
- Không có worker hoặc service nào cho `api.iai.one`
- `aiaccountingloop.com/workers/` có 10 directories — **hầu hết trống**, chỉ `audit-binder-consumer/` có code
- `computer.iai.one` repo có `apps/api/` (Fastify/Node) — **chạy local port 3001**, không phải production API
- `OMCODE_API_GATEWAY_SPEC.md` có spec nhưng chưa implementation
- `api.flow.iai.one` — **broken**

**Vấn đề:**
- Không có unified API gateway
- Fastify local không thể serve production traffic cho multi-domain
- Không có auth middleware trên edge
- Không có rate limiting, caching, observability

---

## 3. TÀI NGUYÊN HIỆN CÓ & THIẾU

### Có sẵn (có thể dùng ngay)

| Asset | Vị trí | Trạng thái |
|-------|--------|------------|
| Product Registry | `computer.iai.one/packages/product-registry/` | Data + types OK |
| AI Routing Matrix | `computer.iai.one/packages/routing-matrix/` | Intent→Lane simulated |
| Workflow Engine | `computer.iai.one/packages/workflow-engine/` | State machine OK, local only |
| Auth SDK scaffold | `computer.iai.one/packages/auth-sdk/` | In-memory stub |
| LifeDashboard UI | `aiaccountingloop.com/LifeDashboard.tsx` | React component hoàn chỉnh |
| D1 Schema (accounting) | `aiaccountingloop.com/migrations/` | Có thể adapt |
| CF Account + Workers | `wrangler.toml` | Production bindings sẵn sàng |

### Thiếu hoàn toàn

| Thành phần | Tác động |
|-----------|---------|
| api.iai.one Worker | Không có control plane |
| api.flow.iai.one Worker | Flow runtime broken |
| home.iai.one app | Không có entry point |
| dash.iai.one deployment | Dashboard chưa deploy |
| Real auth service (magic link / OAuth) | Không có user identity |
| D1 schema cho Life/Flow/Dash data | Không có database cho core domain |
| Check-in API endpoint | Không lưu được check-in |
| Flow execution edge worker | Workflow không chạy trên edge |

---

## 4. KẾ HOẠCH DEV 6 TUẦN — CORE DOMAIN ONLY

### Nguyên tắc
- Chỉ dev 4 domain trên. Không đụng vetuonglai, muonnoi, tranhatam, accounting.
- Code trước, spec sau (ngược lại với 6 tháng qua).
- Deploy mỗi tuần ít nhất 1 domain lên preview.

---

### TUẦN 1: API FOUNDATION — api.iai.one + api.flow.iai.one

**Mục tiêu:** Control plane chạy được, flow API fix xong.

**Day 1-2: api.iai.one Worker**
- [ ] Tạo `workers/api-gateway/` trong `computer.iai.one` hoặc `aiaccountingloop.com`
- [ ] Deploy Cloudflare Worker với routes:
  - `POST /v1/auth/magic-link` — gửi email login (dùng Resend)
  - `POST /v1/auth/verify` — verify token, trả JWT
  - `GET /v1/me` — trả user profile
  - `POST /v1/checkin` — nhận check-in data, trả action items
  - `POST /v1/flow/run` — trigger flow execution
  - `GET /v1/flow/runs/:id` — lấy run status
  - `GET /health` — readiness probe
- [ ] D1 binding: `IAI_CORE_DB` với schema users, sessions, checkins, flows, runs
- [ ] Structured error: `{ code, message, requestId }`

**Day 3-4: api.flow.iai.one FIX**
- [ ] Tạo `workers/flow-runtime/` — Worker chạy flow execution
- [ ] Đọc flow definition từ D1 hoặc KV
- [ ] Chạy state transition: queued → running → success/fail
- [ ] Persist run log vào D1
- [ ] Connect từ `api.iai.one` → `api.flow.iai.one` qua internal fetch

**Day 5-7: Auth + Smoke Test**
- [ ] Magic link thật (Resend API key qua Cloudflare Secrets)
- [ ] End-to-end test: register → login → checkin → flow run → result
- [ ] Deploy lên preview domain

**Acceptance Tuần 1:**
- `curl https://api.iai.one/v1/health` trả `{"status":"ok"}`
- User nhận magic link thật trong email
- `POST /v1/flow/run` tạo run record trong D1 với state transitions

---

### TUẦN 2: DASH.IAI.ONE — Life Dashboard Live

**Mục tiêu:** Dashboard deploy lên domain, connect real API.

**Day 1-2: Next.js App scaffold**
- [ ] Tạo `apps/dash/` (Next.js) hoặc deploy `LifeDashboard.tsx` qua CF Pages
- [ ] Route `/` → Dashboard với real data fetch từ `api.iai.one/v1/me` và `/v1/checkin`
- [ ] Route `/checkin` → Weekly check-in form

**Day 3-4: Check-in Flow End-to-End**
- [ ] UI: Form check-in 4 dimensions (clarity, stability, value, legacy) + open text
- [ ] Submit → `POST /v1/checkin`
- [ ] API: Lưu check-in, tính risk level, generate action items
- [ ] Response: Trả về action items + updated metrics

**Day 5-7: Trend & History**
- [ ] API: `GET /v1/checkin/history` — trả 12-week trend data
- [ ] Dashboard: Render line chart với real data
- [ ] Deploy `dash.iai.one` lên CF Pages

**Acceptance Tuần 2:**
- User vào `dash.iai.one`, thấy metrics của mình
- User submit check-in, nhận action items trong < 3 giây
- Chart hiển thị trend từ D1 (không phải mock data)

---

### TUẦN 3: FLOW.IAI.ONE — Execution Engine

**Mục tiêu:** Flow builder + execution chạy thật.

**Day 1-2: Flow Builder UI**
- [ ] Tạo `apps/flow/` (Next.js hoặc Vite/React)
- [ ] Danh sách flows (lấy từ `GET /v1/flows`)
- [ ] Flow detail: xem nodes, triggers, actions

**Day 3-4: Flow Execution**
- [ ] Trigger flow từ UI → `POST /v1/flow/run`
- [ ] Polling status: `GET /v1/flow/runs/:id`
- [ ] Hiển thị output, logs, artifacts

**Day 5-7: 5 Core Flows**
- [ ] Tạo 5 flow definition trong D1:
  1. Weekly Review Flow
  2. Goal Clarity Flow
  3. Habit Reset Flow
  4. Decision Journal Flow
  5. Energy Audit Flow
- [ ] Mỗi flow có node sequence rõ ràng
- [ ] Deploy `flow.iai.one`

**Acceptance Tuần 3:**
- User chọn flow → trigger → thấy status update real-time
- 5 core flows chạy end-to-end, lưu kết quả vào D1
- Flow output hiển thị đúng trên UI

---

### TUẦN 4: IAI.ONE ROOT — Onboarding + Entry Hub

**Mục tiêu:** Root domain là điểm vào thống nhất.

**Day 1-2: Home App**
- [ ] Tạo `apps/home/` — Landing page đơn giản
- [ ] Sections: Manifesto, 4 layers (Life, Flow, Agent, Proof), CTA "Start Check-in"
- [ ] Login / Magic link entry

**Day 3-4: Cross-domain Routing**
- [ ] Sau login, redirect user theo state:
  - New user → `/onboarding`
  - No check-in this week → `dash.iai.one/checkin`
  - Active user → `dash.iai.one`
  - Flow user → `flow.iai.one`

**Day 5-7: Onboarding Flow**
- [ ] 3-step onboarding: Welcome → Life assessment → First check-in
- [ ] Lưu onboarding state vào user profile
- [ ] Deploy `home.iai.one` (hoặc `iai.one` nếu domain trỏ được)

**Acceptance Tuần 4:**
- User vào `iai.one` → thấy landing → login → được route đúng
- Onboarding hoàn thành trong < 5 phút
- User sau onboarding thấy dashboard với first check-in

---

### TUẦN 5: AGENT LAYER — AI Assist

**Mục tiêu:** AI gợi ý action, không thay thế user decision.

**Day 1-2: AI Provider Connection**
- [ ] Worker `workers/ai-orchestrator/` — gọi OpenAI/Anthropic API
- [ ] Prompt template cho: check-in analysis, action suggestion, pattern detection
- [ ] Quota guard: max tokens, max calls/user/day

**Day 3-4: Check-in Analysis**
- [ ] Sau check-in submit, trigger AI analysis worker
- [ ] AI đọc check-in data → suggest 1-3 action items
- [ ] Lưu suggestion vào D1, hiển thị trên dashboard

**Day 5-7: Pattern Detection**
- [ ] Weekly job: phân tích trend 4 tuần gần nhất
- [ ] Nếu clarity giảm 2 tuần liên tiếp → alert + suggest "Clarity Reset Flow"
- [ ] Gửi summary qua email (Resend)

**Acceptance Tuần 5:**
- Check-in submit → nhận AI suggestions trong < 5 giây
- Suggestions có ý nghĩa, không generic
- Pattern detection hoạt động (test với mock trend)

---

### TUẦN 6: PROOF LAYER + PRODUCTION GATES

**Mục tiêu:** Audit trail, trust, sẵn sàng beta users.

**Day 1-2: Proof System**
- [ ] Mỗi check-in + flow run có hash (SHA-256)
- [ ] `GET /v1/proof/:id` — verify integrity
- [ ] Audit log: ai_action, user_action, system_event

**Day 3-4: Security + Observability**
- [ ] Rate limiting: 100 req/min/IP, 1000 req/min/user
- [ ] Input validation tất cả endpoints
- [ ] Cloudflare Analytics + Error tracking (console.log → structured log)

**Day 5-7: Beta Launch Prep**
- [ ] 10 beta users test end-to-end
- [ ] Fix critical bugs
- [ ] Deploy production: `iai.one`, `dash.iai.one`, `flow.iai.one`, `api.iai.one`

**Acceptance Tuần 6:**
- 10 beta users hoàn thành onboarding + check-in + 1 flow
- Audit log chứa đầy đủ hành trình
- Không có P0/P1 bug
- Production smoke test pass

---

## 5. D1 SCHEMA (BẮT BUỘC TUẦN 1)

```sql
-- Users & Identity
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  locale TEXT DEFAULT 'vi',
  onboarding_done INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Check-ins (Life Layer)
CREATE TABLE checkins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start TEXT NOT NULL,
  clarity INTEGER CHECK(clarity BETWEEN 0 AND 100),
  stability INTEGER CHECK(stability BETWEEN 0 AND 100),
  value INTEGER CHECK(value BETWEEN 0 AND 100),
  legacy INTEGER CHECK(legacy BETWEEN 0 AND 100),
  notes TEXT,
  risk_level TEXT CHECK(risk_level IN ('normal','moderate_risk','high_risk')),
  created_at INTEGER DEFAULT (unixepoch())
);

-- Action Items
CREATE TABLE actions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  checkin_id TEXT REFERENCES checkins(id),
  text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending','done')),
  source TEXT DEFAULT 'checkin',
  created_at INTEGER DEFAULT (unixepoch())
);

-- Flows (Flow Layer)
CREATE TABLE flows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  nodes TEXT NOT NULL, -- JSON array
  is_active INTEGER DEFAULT 1,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Flow Runs
CREATE TABLE flow_runs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  flow_id TEXT NOT NULL REFERENCES flows(id),
  state TEXT DEFAULT 'queued' CHECK(state IN ('queued','running','success','failed')),
  input TEXT,
  output TEXT,
  error TEXT,
  started_at INTEGER,
  completed_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch())
);

-- Audit / Proof
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  details TEXT,
  hash TEXT,
  timestamp INTEGER DEFAULT (unixepoch())
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_checkins_user_week ON checkins(user_id, week_start);
CREATE INDEX idx_actions_user ON actions(user_id, status);
CREATE INDEX idx_flow_runs_user ON flow_runs(user_id, state);
CREATE INDEX idx_audit_user ON audit_logs(user_id, timestamp);
```

---

## 6. WORKER STRUCTURE

```
workers/
  api-gateway/          # api.iai.one — routing, auth, rate limit
    src/
      index.ts
      routes/
        auth.ts
        checkin.ts
        flow.ts
        health.ts
    wrangler.toml

  flow-runtime/           # api.flow.iai.one — execution engine
    src/
      index.ts
      executor.ts
      store.ts
    wrangler.toml

  ai-orchestrator/        # AI analysis (Tuần 5)
    src/
      index.ts
      prompts.ts
      guard.ts
    wrangler.toml
```

---

## 7. VIỆC PHẢI LÀM NGAY (48 GIỜ)

1. **Tạo D1 database** `iai-core-prod` trên Cloudflare account chính
2. **Tạo `workers/api-gateway/`** — deploy Worker với route `/health` + D1 binding
3. **Tạo `workers/flow-runtime/`** — deploy Worker với route `/health`
4. **Verify domain routing:** `api.iai.one` và `api.flow.iai.one` trỏ đúng về Workers
5. **Thêm `LifeDashboard.tsx`** vào Next.js app trong `apps/dash/`, deploy preview

---

## 8. NGÂN SÁCH CORE 6 TUẦN

| Resource | Mục đích | Chi phí ước tính |
|----------|---------|-----------------|
| Cloudflare Workers (3 workers) | API + Flow + AI | $5/tháng |
| Cloudflare D1 | Database core | $0–5/tháng |
| Cloudflare Pages (3 sites) | Home + Dash + Flow | $0 (free tier) |
| Resend | Magic link + summary | $10–30/tháng |
| OpenAI API | AI analysis | $50–100/tháng |
| **Tổng** | | **~$70–140/tháng** |

---

## 9. KPI THEO DÕI

| Tuần | Mục tiêu | KPI chính |
|------|---------|-----------|
| 1 | API chạy | `/health` pass, magic link gửi được |
| 2 | Dashboard live | Dashboard deploy, check-in end-to-end |
| 3 | Flow chạy | 5 flows hoạt động, run record trong D1 |
| 4 | Root hub | Landing + onboarding + cross-domain routing |
| 5 | AI assist | Suggestions từ AI, pattern detection |
| 6 | Beta | 10 beta users, audit log complete |

---

*End of Core Domain Audit & 6-Week Dev Plan*
