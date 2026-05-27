# P9 Render Deploy Runbook

> **For:** Manual steps in Render dashboard  
> **Prereq:** P9.1 Dockerfile fix pushed to `main` (commit `83ef217`)  
> **Date:** 2026-05-28

---

## P9.2 — Set Environment Variables in Render

Dashboard: `https://dashboard.render.com/web/services/computer-api` (hoặc tạo mới từ `render.yaml`)

### Required — Service will fail without these

| Key | Source | Example / Note |
|-----|--------|----------------|
| `DATABASE_URL` | PostgreSQL provider | `postgresql://user:pass@host:5432/computer_iai_one` |
| `PAY_IAI_ONE_SITE_KEY` | pay.iai.one admin | Site key từ payment gateway |
| `PAY_IAI_ONE_WEBHOOK_SECRET` | pay.iai.one admin | Webhook signing secret |

### Strongly Recommended — Feature degraded without these

| Key | Source | Example / Note |
|-----|--------|----------------|
| `REDIS_URL` | Redis provider (Upstash/Redis Cloud) | `redis://default:pass@host:6379` |
| `OPENAI_API_KEY` | OpenAI dashboard | `sk-...` — deep health check + AI provider |
| `ANTHROPIC_API_KEY` | Anthropic console | `sk-ant-...` — deep health check + AI fallback |
| `BRAVE_SEARCH_API_KEY` | Brave Search API | — browser search primary |
| `SERP_API_KEY` | SerpAPI | — browser search fallback |

### OAuth — Required if dùng Google/MS calendar connect

| Key | Value for production |
|-----|----------------------|
| `GOOGLE_CLIENT_ID` | Production Google Cloud app |
| `GOOGLE_CLIENT_SECRET` | Production secret |
| `GOOGLE_REDIRECT_URI` | `https://api.computer.iai.one/api/auth/google/callback` |
| `MS_CLIENT_ID` | Production Azure app |
| `MS_CLIENT_SECRET` | Production secret |
| `MS_REDIRECT_URI` | `https://api.computer.iai.one/api/auth/microsoft/callback` |

### Optional — Defaults work without

| Key | Default in code | Set if |
|-----|-----------------|--------|
| `JWT_SIGNING_SECRET` | Không dùng (DB sessions) | Bỏ qua trừ khi chuyển JWT |
| `ENABLE_RUNTIME_MOCK` | — | Đảm bảo `unset` hoặc `false` |
| `LOG_LEVEL` | `debug` (dev), `info` (prod) | — |
| `CONTROL_API_ALLOWED_ORIGINS` | `https://computer.iai.one` | Đã hardcode fallback |
| `COMPUTER_API_PUBLIC_URL` | `https://api.computer.iai.one` | Đã hardcode fallback |

---

## P9.3 — Verify Render Service Config

### From `render.yaml` (auto-import nếu tạo từ blueprint)

```yaml
services:
  - type: web
    name: computer-api
    runtime: docker
    plan: free        # <- upgrade nếu cần
    region: oregon
    branch: main
    autoDeploy: true  # <- deploy tự động mỗi push main
    dockerfilePath: ./apps/api/Dockerfile
    dockerContext: .
    healthCheckPath: /api/health
```

### Manual check after tạo service

- [ ] **Build & Deploy log:** Không lỗi ở stage `builder` hoặc `production`
- [ ] **Health check:** Status = `Healthy` (không phải `Degraded`)
- [ ] **Environment:** Tất cả keys ở P9.2 đã xuất hiện trong tab Environment
- [ ] **PORT:** Render inject `PORT` env — Dockerfile dùng `PORT=10000` fallback, nhưng Render ghi đè

---

## P9.4 — First Deploy Trigger

**Cách 1:** Auto-deploy (nếu `autoDeploy: true`)
- Push `main` → Render tự động build

**Cách 2:** Manual deploy
- Render dashboard → Service → Manual Deploy → Deploy latest commit

**Expected deploy flow:**

```
Step 1/15 : FROM node:20-alpine AS deps
Step 2/15 : RUN corepack enable && corepack prepare pnpm@9 --activate
Step 3/15 : WORKDIR /app
... (deps stage cached) ...
Step 10/15 : RUN pnpm --filter ./apps/api build:production
  > esbuild bundle -> apps/api/dist/index.js
Step 14/15 : COPY --from=builder /app/apps/api/dist ./apps/api/dist
Step 15/15 : CMD ["node", "apps/api/dist/index.js"]
```

**Deploy fail nếu:**
- `DATABASE_URL` thiếu → crash ở startup
- `esbuild` lỗi → `build:production` fail → builder stage exit non-zero
- `better-sqlite3` compile fail → deps stage exit non-zero (nhưng đã externalize)

---

## P9.5 — Smoke Test Checklist

Chạy sau khi deploy thành công và health check = Healthy.

### 5.1 Basic connectivity

```bash
ENDPOINT=https://api.computer.iai.one

curl -s "$ENDPOINT/api/health" | jq .
# Expected: {"status":"ok"}

curl -s "$ENDPOINT/api/health/deep" | jq .
# Expected: database=true, redis=(true|false), migrations.count>0

curl -s "$ENDPOINT/api/metrics" | head -20
# Expected: prometheus text format
```

### 5.2 Auth flow

```bash
# Register test user
curl -s -X POST "$ENDPOINT/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@test.com","name":"Smoke Test","locale":"en"}' | jq .

# Login (magic link / OTP — tùy auth flow)
curl -s -X POST "$ENDPOINT/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@test.com"}' | jq .

# Verify /me (nếu có token)
# curl -s "$ENDPOINT/api/auth/me" -H "Authorization: Bearer $TOKEN" | jq .
```

### 5.3 Browser automation (requires auth)

```bash
curl -s "$ENDPOINT/api/browser/fetch?url=https://example.com" \
  -H "Authorization: Bearer $TOKEN" | jq '. | length > 0'
```

### 5.4 Migration check

```bash
curl -s "$ENDPOINT/api/health/deep" | jq '.migrations'
# Expected: { "count": 2, "latest": "002_ai_browser_schema.sql" }
```

### 5.5 Observability verification

```bash
# Request log — check Render log stream có structured JSON
curl -s "$ENDPOINT/api/health" -H "X-Request-ID: smoke-$(date +%s)"
# Log should contain: {"level":"info","message":"request completed",...}

# Audit failure visibility
curl -s "$ENDPOINT/api/health/deep" | jq '.auditLogger'
# Expected: {"status":"ok"} hoặc warning nếu DB chưa có audit_logs table
```

---

## Rollback Plan

| Scenario | Action |
|----------|--------|
| Deploy fail (build error) | Fix code → push `main` → auto-deploy |
| Deploy success but crash | Render dashboard → Manual Deploy → Previous successful commit |
| Database migration lỗi | Chạy rollback script hoặc sửa migration rồi redeploy |
| Env var sai | Dashboard → Edit Environment → Save → Auto restart |

---

## Post-Smoke: Web (Cloudflare Pages)

Sau khi API smoke pass:

1. Tạo Cloudflare Pages project mới
2. Connect Git repo → branch `main`
3. Build command: `cd apps/web && pnpm build`
4. Build output: `apps/web/dist`
5. Environment variable build:
   - `VITE_COMPUTER_PUBLIC_BASE_URL=https://api.computer.iai.one`
6. Add SPA fallback: `_redirects` file trong `apps/web/public/`
   ```
   /* /index.html 200
   ```
7. Deploy → verify `computer.iai.one` load SPA → API CORS OK

---

## Status Gate

```text
P9.1 = PASS (Dockerfile fixed, pushed)
P9.2 = PENDING (Render env vars — manual dashboard)
P9.3 = PENDING (Payment secrets — manual dashboard)
P9.4 = PENDING (First deploy trigger)
P9.5 = PENDING (Smoke test after deploy)

PRODUCTION_READY = NO
BLOCKERS = DATABASE_URL, PAY keys (3)
```
