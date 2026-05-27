# P9.0 Deploy Preflight Report

> **Status:** PREFLIGHT — chưa deploy production  
> **Date:** 2026-05-27  
> **Target:** API = Render, Web = Cloudflare Pages  

---

## 1. Deploy Target Confirmation

| Component | Target | Config File | Status |
|-----------|--------|-------------|--------|
| API | Render (Docker) | `render.yaml` | ✅ Config tồn tại |
| Web | Cloudflare Pages | Chưa có wrangler.toml | ⚠️ Cần xác nhận project |
| API Domain | `api.computer.iai.one` | `render.yaml:30` | ✅ Đã định nghĩa |
| Web Domain | `computer.iai.one` | `render.yaml:32` (CORS) | ✅ Đã định nghĩa |

**Note:** Web app (Vite/React) chưa có `wrangler.toml` hoặc Pages config. Cần tạo hoặc xác nhận Cloudflare Pages project name.

---

## 2. Dockerfile Analysis

**File:** `apps/api/Dockerfile`

| Check | Status | Note |
|-------|--------|------|
| Multi-stage build | ✅ | `base` + `production` |
| Node version | ✅ | `node:20-alpine` |
| pnpm version | ✅ | `pnpm@9` |
| PORT | ⚠️ | Hardcoded `PORT=10000` (`.env` có `API_PORT=3001` — không được dùng) |
| Start command | ⚠️ | `tsx src/index.ts` — cần devDependencies trong production |
| Health check | ✅ | `/api/health` via HTTP GET |
| Build artifacts | ❌ | Production stage copy `src/` không copy `dist/` |

**Blocker Dockerfile:**
- CMD dùng `tsx src/index.ts` thay vì `node dist/index.js`
- Production stage không copy `dist/` từ base stage
- Cần fix để production chỉ cần runtime dependencies

---

## 3. Render.yaml Analysis

**File:** `render.yaml`

| Check | Status | Note |
|-------|--------|------|
| Service name | ✅ | `computer-api` |
| Runtime | ✅ | `docker` |
| Health path | ✅ | `/api/health` |
| Env vars (plain) | ✅ | NODE_ENV, PAY_IAI_ONE_BASE_URL, etc. |
| Env vars (secrets) | ⚠️ | DATABASE_URL, REDIS_URL, PAY keys — cần set manual trong Render dashboard |
| PORT env | ❌ | Không khai báo PORT=10000 trong render.yaml |

---

## 4. Env Audit (Redacted)

### 4.1 Env vars có trong `.env` (local)

| Var | Trong `.env` | Được dùng | Note |
|-----|-------------|-----------|------|
| DATABASE_URL | ✅ | ✅ | Local PostgreSQL |
| REDIS_URL | ✅ | ✅ | Local Redis |
| JWT_SECRET | ✅ | ❌ | **Không được dùng** — auth-sdk dùng DB sessions |
| GOOGLE_CLIENT_ID | ✅ (placeholder) | ✅ | OAuth — cần production value |
| GOOGLE_CLIENT_SECRET | ✅ (placeholder) | ✅ | OAuth — cần production value |
| GOOGLE_REDIRECT_URI | ✅ (localhost) | ✅ | Cần đổi thành production URL |
| KMS_KEY_ID | ✅ (placeholder) | ⚠️ | Kiểm tra xem có dùng không |
| AWS_REGION | ✅ | ⚠️ | Kiểm tra xem có dùng không |
| API_PORT | ✅ (3001) | ❌ | Code dùng `PORT`, không phải `API_PORT` |
| NODE_ENV | ✅ (development) | ✅ | Production sẽ override |
| LOG_LEVEL | ✅ | ✅ | |

### 4.2 Env vars được dùng trong code nhưng KHÔNG có trong `.env`

| Var | Được dùng ở | Critical | Note |
|-----|-------------|----------|------|
| OPENAI_API_KEY | `observability.ts`, providers | ⚠️ Medium | Deep health check, AI provider |
| ANTHROPIC_API_KEY | `observability.ts`, providers | ⚠️ Medium | Deep health check, AI provider |
| SERP_API_KEY | `observability.ts`, browser | ⚠️ Medium | Browser search fallback |
| BRAVE_SEARCH_API_KEY | browser provider | ⚠️ Medium | Browser search primary |
| MS_CLIENT_ID | `observability.ts`, OAuth | ⚠️ Medium | Microsoft OAuth |
| MS_CLIENT_SECRET | OAuth | ⚠️ Medium | Không hiển thị trong grep — cần verify |
| MS_REDIRECT_URI | OAuth | ⚠️ Medium | Cần production URL |
| JWT_SIGNING_SECRET | `apps/api/src/index.ts` | ❓ | Có trong code nhưng auth-sdk dùng DB sessions |
| CONTROL_API_BASE_URL | `apps/api/src/index.ts` | ✅ High | CORS/API base URL |
| ENABLE_RUNTIME_MOCK | runtime-registry workers | ⚠️ Medium | Cần `false` hoặc unset ở production |
| VITE_COMPUTER_PUBLIC_BASE_URL | Web app | ✅ High | Web build cần biết API URL |
| PORT | `apps/api/src/index.ts` | ✅ High | Render sẽ inject PORT |
| SENDGRID_API_KEY | email provider | ⚠️ Medium | Cần cho email sending |
| FROM_EMAIL | email provider | ⚠️ Medium | Cần cho email sending |

### 4.3 Env vars trong `render.yaml` nhưng chưa set

| Var | Trong render.yaml | sync | Status |
|-----|-------------------|------|--------|
| DATABASE_URL | ✅ | false | ❌ Chưa set — BLOCKER |
| REDIS_URL | ✅ | false | ⚠️ Optional nhưng health check sẽ fail |
| PAY_IAI_ONE_SITE_KEY | ✅ | false | ❌ Chưa set — BLOCKER cho payment |
| PAY_IAI_ONE_WEBHOOK_SECRET | ✅ | false | ❌ Chưa set — BLOCKER cho payment |

---

## 5. Web Preflight (Cloudflare Pages)

| Check | Status | Note |
|-------|--------|------|
| Build command | ✅ | `vite build` (đã có trong package.json) |
| Output dir | ✅ | `apps/web/dist/` |
| Pages config | ❌ | Chưa có `wrangler.toml` hoặc `_routes.json` |
| Env var build | ⚠️ | `VITE_COMPUTER_PUBLIC_BASE_URL` cần set khi build |
| SPA fallback | ⚠️ | Cần `_redirects` hoặc `_routes.json` cho client-side routing |

**Web build artifacts:**
- `apps/web/dist/index.html` — SPA entry
- `apps/web/dist/assets/` — JS/CSS bundles
- Cần `git restore apps/web/dist/index.html` sau mỗi build local

---

## 6. Smoke Test Plan (Dry Run)

Sau khi deploy, chạy smoke tests sau:

### 6.1 Health endpoints
```bash
curl https://api.computer.iai.one/api/health
curl https://api.computer.iai.one/api/health/deep
curl https://api.computer.iai.one/api/metrics
```

### 6.2 Auth flow
```bash
# Register / login (cần DB kết nối)
curl -X POST https://api.computer.iai.one/api/auth/register
# Verify session
curl -H "Authorization: Bearer <token>" https://api.computer.iai.one/api/auth/me
```

### 6.3 Browser automation
```bash
curl -H "Authorization: Bearer <token>" \
  "https://api.computer.iai.one/api/browser/fetch?url=https://example.com"
```

### 6.4 Migration status
```bash
# Check trong /api/health/deep response
# migrations.count > 0 là OK
```

### 6.5 Payment (chỉ khi PAY keys hợp lệ)
```bash
# Kiểm tra checkout URL generation
# Không chạy real payment trong smoke test
```

---

## 7. Blockers Summary

| # | Blocker | Severity | Action Required |
|---|---------|----------|-----------------|
| 1 | **DATABASE_URL chưa set** | 🔴 Critical | Set trong Render dashboard hoặc env production |
| 2 | **Dockerfile production stage không copy dist/** | 🔴 Critical | Fix Dockerfile: copy `dist/` và chạy `node dist/index.js` |
| 3 | **Dockerfile CMD dùng tsx** | 🔴 Critical | Đổi thành `node dist/index.js` để bỏ devDependencies trong production |
| 4 | **JWT_SECRET không được dùng** | 🟡 Medium | Xoá hoặc đổi thành JWT_SIGNING_SECRET nếu cần |
| 5 | **GOOGLE_REDIRECT_URI = localhost** | 🟡 Medium | Đổi thành `https://api.computer.iai.one/api/auth/google/callback` |
| 6 | **MS OAuth config thiếu** | 🟡 Medium | Bổ sung MS_CLIENT_ID, MS_CLIENT_SECRET, MS_REDIRECT_URI |
| 7 | **Web chưa có Pages config** | 🟡 Medium | Tạo wrangler.toml hoặc config Pages project |
| 8 | **billing-sdk PostgreSQL TODO** | 🟡 Medium | Xem `packages/billing-sdk/src/index.ts` — còn TODO |
| 9 | **API_PORT vs PORT mismatch** | 🟢 Low | `.env` dùng API_PORT=3001, code dùng PORT — không ảnh hưởng nếu Render inject PORT |
| 10 | **ENABLE_RUNTIME_MOCK** | 🟢 Low | Đảm bảo unset hoặc `false` ở production |

---

## 8. Recommended Fix Order

```
P9.1: Fix Dockerfile (copy dist, node dist/index.js)
P9.2: Set DATABASE_URL trong Render dashboard
P9.3: Set payment secrets (PAY_IAI_ONE_SITE_KEY, PAY_IAI_ONE_WEBHOOK_SECRET)
P9.4: Set AI provider keys (OPENAI_API_KEY, ANTHROPIC_API_KEY)
P9.5: Set browser search key (BRAVE_SEARCH_API_KEY)
P9.6: Fix OAuth redirect URIs
P9.7: Create Cloudflare Pages project + config
P9.8: Deploy API → smoke test
P9.9: Deploy Web → verify CORS
```

---

## 9. Production Readiness Gate

```text
P1_P3=PASS
P4=PASS
P5=PASS_HARDENED
P6=PASS_CLOSED
P7=PASS_WITH_PROD_LIMITATIONS
P8=PASS
P9.0=PASS_PREFLIGHT_WITH_BLOCKERS

BLOCKERS_REMAINING=3 (Dockerfile fix, DATABASE_URL, Payment keys)
PRODUCTION_READY=NO
NEXT=P9.1_DOCKERFILE_FIX
```
