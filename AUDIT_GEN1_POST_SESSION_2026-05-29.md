# AUDIT GEN 1 — Computer.iai.one
**Ngày:** 2026-05-29  
**Session vừa xong:** Rate limit tier + Quota enforcement + AI status + test pass  
**Mục tiêu:** Tìm gap còn lại trước khi upgrade mạnh Gen 2

---

## ✅ ĐÃ FIX (xác nhận trong code)

| # | Item | File chứng minh | Đánh giá |
|---|------|-----------------|----------|
| 1 | Rate limit theo tier (`free→enterprise`) | `@/apps/api/src/index.ts:67-88` | Dynamic, dựa `req.user.tier` |
| 2 | Quota enforcement trên `/api/command` | `@/apps/api/src/index.ts:265-271` | Block khi `runsLeft <= 0`, trả `QUOTA_EXCEEDED` |
| 3 | AI provider status endpoint | `@/apps/api/src/index.ts:587-611` | Expose primary/fallback health + email/payment config |
| 4 | Subscription persist DB | `@/packages/database/src/models/subscriptions.ts:11-28` | `pgCreateSubscription` với `ON CONFLICT UPDATE` |
| 5 | PayOS webhook verify HMAC | `@/packages/providers/src/payos-provider.ts:55-64` | `crypto.createHmac + timingSafeEqual` |
| 6 | Email wiring thật | `@/packages/billing-sdk/src/index.ts:111-122` | Gọi `getEmailProvider().send()`, không còn `console.log` |
| 7 | `JWT_SIGNING_SECRET` trong `render.yaml` | `@/render.yaml:33-34` | `sync: false` (secret cần set trong Render dashboard) |

---

## 🔴 GAP CÒN LẠI — PHÂN LOẠI THEO MỨC ĐỘ

### P0 — BLOCKER (phải fix trước khi Gen 2 public)

| # | Gap | Mô tả | File chứng | Hậu quả |
|---|-----|-------|-----------|---------|
| **P0-1** | **Usage tracking IN-MEMORY** | `usage-sdk` dùng `Map<string, UsageRecord[]>`, mất dữ liệu khi restart | `@/packages/usage-sdk/src/index.ts:14` | User dùng hết quota, restart server → quota reset → user free dùng vô hạn |
| **P0-2** | **Cost tracking chưa wired** | Single provider path trả `costCents: 0`. `cost-tracker.ts` tồn tại nhưng không ai gọi | `@/packages/providers/src/factory.ts:60` | Không biết chi phí thật mỗi run. Không có cost guard. Revenue leak |
| **P0-3** | **Quota hardcoded trong command route** | `runsPerDay: 100`, `outputCredits: 50` fix cứng, không lấy từ plan user | `@/apps/api/src/index.ts:279-280` | User Pro và Free cùng quota. Entitlement gate không hoạt động |
| **P0-4** | **Approval routes dùng hardcoded `"user_1"`** | `getPendingApprovals("user_1")`, `approve(id, "user_1")` | `@/apps/api/src/index.ts:325,329,335` | Security bug: user A có thể approve request của user B |

### P1 — HIGH (nên fix trong 48h)

| # | Gap | Mô tả | File chứng | Hậu quả |
|---|-----|-------|-----------|---------|
| **P1-1** | **CI/CD không có test step** | `.github/workflows/ci.yml` chỉ `typecheck + build + migrate`, không `pnpm test` | `@/.github/workflows/ci.yml:21-28` | Bug merge vào main mà không bị bắt |
| **P1-2** | **AI fallback silent** | Nếu không có `OPENAI_API_KEY` hoặc `ANTHROPIC_API_KEY`, auto fallback `MockAIProvider` | `@/packages/providers/src/factory.ts:22-23` | Production chạy mock AI mà không báo động, user nhận output giả |
| **P1-3** | **Magic link chưa có** | Auth chỉ JWT password-based, không có magic link | `@/apps/api/src/routes/auth.ts` (assumed) | Không đúng architecture audit yêu cầu. UX kém |
| **P1-4** | **Cross-domain auth chưa có** | Session không share giữa `computer.iai.one` và `maytinhai.org` | N/A | User phải đăng nhập lại mỗi domain |

### P2 — MEDIUM (fix trong tuần tới)

| # | Gap | Mô tả | File chứng | Hậu quả |
|---|-----|-------|-----------|---------|
| **P2-1** | **SQLite + PostgreSQL dual path** | Database package vừa SQLite fallback vừa PostgreSQL. Logic rẽ nhánh `DATABASE_URL` | `@/packages/database/src/index.ts:12-24` | Divergence: dev chạy SQLite, production chạy Postgres. Schema drift risk |
| **P2-2** | **No prompt injection guard** | Command route nhận raw `text` từ user, pass trực tiếp vào AI provider | `@/apps/api/src/index.ts:276` | Prompt injection, jailbreak, data exfiltration |
| **P2-3** | **No cost guard alert** | Không có threshold alert khi AI bill vượt $X/tháng | N/A | Bill shock, mất kiểm soát chi phí |

### P3 — LOW / Gen 3

| # | Gap | Mô tả | File chứng | Hậu quả |
|---|-----|-------|-----------|---------|
| **P3-1** | **No security audit (OWASP)** | Chưa review OWASP Top 10 | N/A | Vulnerability chưa phát hiện |
| **P3-2** | **No backup/restore test** | Không test restore DB từ backup | N/A | Data loss = không recover được |
| **P3-3** | **No incident response playbook** | Không có runbook khi incident xảy ra | N/A | Downtime kéo dài khi sự cố |
| **P3-4** | **No real user monitoring** | Không có Sentry/CF Analytics | N/A | Không biết lỗi production |

---

## 🎯 KHUYẾN NGHỊ FIX TRƯỚC KHI GEN 2 UPGRADE

**Thứ tự ưu tiên thực hiện:**

### Giai đoạn 1: Stabilize (1–2 ngày)
1. **P0-1** — Chuyển `usage-sdk` từ `Map` sang PostgreSQL (`usage_records` table đã tồn tại!)
2. **P0-2** — Wire `cost-tracker.ts` vào command route, ghi `cost_estimate` vào `usage_records`
3. **P0-3** — Lấy quota từ `getShell(productId).quota` hoặc user subscription tier
4. **P0-4** — Fix approval routes dùng `(req as any).user.id` thay vì `"user_1"`

### Giai đoạn 2: Harden (2–3 ngày)
5. **P1-1** — Thêm `pnpm test` vào CI workflow
6. **P1-2** — Startup check: nếu `ENABLE_RUNTIME_MOCK=false` và không có AI key → throw, không silent fallback
7. **P1-3** — Triển khai magic link route (hoặc defer nếu JWT đủ tốt)
8. **P2-2** — Thêm prompt injection filter cơ bản (regex check `/system|ignore previous|DAN/`)

### Giai đoạn 3: Monitor (3–5 ngày)
9. **P2-3** — Cost guard: tính tổng `cost_estimate` tháng này, alert nếu > $100
10. **P3-4** — Thêm Sentry hoặc basic error logging
11. **P2-1** — Quyết định: bỏ SQLite fallback, chỉ dùng PostgreSQL

---

## 📊 TỔNG KẾT

| Tier | Số gap | Cần fix trước Gen 2? |
|------|--------|---------------------|
| P0 — Blocker | 4 | **Có, tất cả** |
| P1 — High | 4 | Nên fix ít nhất 2 (CI + AI silent) |
| P2 — Medium | 3 | Nên fix trong tuần |
| P3 — Low | 4 | Defer sau Gen 2 stable |

**Điểm hiện tại của Gen 1:** ~55/100 (tăng từ 50 sau session này)  
**Sau khi fix P0+P1:** ~70/100  
**Điều kiện báo production-ready:** 80/100 (cần thêm monitoring + backup test)

---

*Audit by: Cascade (pair-programming)*  
*Next action: Founder chọn giai đoạn fix hoặc yêu cầu implement ngay*
