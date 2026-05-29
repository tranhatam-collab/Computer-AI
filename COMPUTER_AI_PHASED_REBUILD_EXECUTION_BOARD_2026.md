# COMPUTER AI — PHASED REBUILD EXECUTION BOARD 2026

**Date:** 2026-05-24  
**Note:** This is a live tracking board. Tasks are marked as they are completed, in progress, or pending.

---

## PHASE 0 — FREEZE & DOCUMENT (WEEK 0)

| # | Task | Status | File | Owner |
|---|------|--------|------|-------|
| 0.1 | Repo tree audit | ✅ DONE | `_AUDIT_01_REPO_TREE_2026.md` | Audit |
| 0.2 | Existing files & gaps | ✅ DONE | `_AUDIT_02_FILES_AND_GAPS_2026.md` | Audit |
| 0.3 | Migration plan | ✅ DONE | `_AUDIT_03_MIGRATION_PLAN_2026.md` | Audit |
| 0.4 | Execution board | ✅ DONE | `_AUDIT_04_EXECUTION_BOARD_2026.md` | Audit |
| 0.5 | Clean empty dirs | ✅ DONE | `content/`, `logs/` | Dev |
| 0.6 | Write `.env.template` | ✅ DONE | `.env.template` | Dev |

**Phase 0 acceptance:** 4 audit documents published. Repo state frozen for team.

---

## PHASE 1 — PRODUCT CATALOG SYSTEM (WEEK 1–2)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 1.1 | Create product registry package | ✅ DONE | `packages/product-registry/src/index.ts` | — |
| 1.2 | Define 12 product shells | ✅ DONE | `packages/product-registry/src/products.ts` | 1.1 |
| 1.3 | Add entitlement schema | ✅ DONE | `packages/product-registry/src/entitlement.ts` | 1.2 |
| 1.4 | Build shell router | ✅ DONE | `apps/web/src/lib/shell-router.ts` | 1.2 |
| 1.5 | Update ProductGrid | ✅ DONE | `apps/web/src/components/ProductGrid.tsx` | 1.4 |
| 1.6 | Build product detail page | ✅ DONE | `apps/web/src/pages/ProductPage.tsx` | 1.4 |
| 1.7 | Build data-driven compare page | ✅ DONE | `apps/web/src/pages/ComparePage.tsx` | 1.2 |
| 1.8 | Add pricing + CTA logic | ✅ DONE | `apps/web/src/lib/pricing.ts` | 1.2 |

**Phase 1 acceptance:** 12 products in registry. Compare page renders from data. Product detail pages route correctly.

---

## PHASE 2 — AI ROUTING MATRIX (WEEK 2–4)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 2.1 | Define intent schema | ✅ DONE | `packages/routing-matrix/src/intent.ts` | — |
| 2.2 | Define lane schema | ✅ DONE | `packages/routing-matrix/src/lane.ts` | 2.1 |
| 2.3 | Define model class mapping | ✅ DONE | `packages/routing-matrix/src/models.ts` | 2.2 |
| 2.4 | Define tool permission matrix | ✅ DONE | `packages/routing-matrix/src/tool-permission.ts` | 2.2 |
| 2.5 | Define overload protection | ✅ DONE | `packages/routing-matrix/src/overload.ts` | 2.3 |
| 2.6 | Router engine | ✅ DONE | `packages/routing-matrix/src/router.ts` | 2.1–2.5 |
| 2.7 | Fallback chain | ✅ DONE | `packages/routing-matrix/src/fallback.ts` | 2.6 |
| 2.8 | Connect to API layer | ✅ DONE | `apps/api/src/index.ts` | 2.6 |

**Phase 2 acceptance:** Command with intent → lane + model + tool. Overload protection works.

---

## PHASE 3 — WORKFLOW / RESULT LOOP (WEEK 3–5)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 3.1 | Define run state machine | ✅ DONE | `packages/workflow-engine/src/states.ts` | — |
| 3.2 | Build run controller | ✅ DONE | `packages/workflow-engine/src/run.ts` | 3.1 |
| 3.3 | Build verification layer | ✅ DONE | `packages/workflow-engine/src/verify.ts` | 3.2 |
| 3.4 | Build output packager | ✅ DONE | `packages/workflow-engine/src/output-pack.ts` | 3.2 |
| 3.5 | Build replay system | ✅ DONE | `packages/workflow-engine/src/replay.ts` | 3.2 |
| 3.6 | Confidence scoring | ✅ DONE | `packages/workflow-engine/src/score.ts` | 3.3 |

**Phase 3 acceptance:** Command → Run → Verify → Package. Replay at any state.

---

## PHASE 4 — RUNTIME / AI COMPUTER LAYER (WEEK 4–6)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 4.1 | Define runtime registry | ✅ DONE | `packages/runtime-registry/src/index.ts` | P1 |
| 4.2 | Browser worker class | ✅ DONE | `packages/runtime-registry/src/workers/browser.ts` | 3.2 |
| 4.3 | Code worker class | ✅ DONE | `packages/runtime-registry/src/workers/code.ts` | 3.2 |
| 4.4 | Research worker class | ✅ DONE | `packages/runtime-registry/src/workers/research.ts` | 3.2 |
| 4.5 | Content worker class | ✅ DONE | `packages/runtime-registry/src/workers/content.ts` | 3.2 |
| 4.6 | Runtime policy engine | ✅ DONE | `packages/runtime-registry/src/policy.ts` | 4.1 |

**Phase 4 acceptance:** "Creator Computer" run → Content Worker. "Research" run → Research Worker.

---

## PHASE 5 — MOBILE COMMAND CENTER (WEEK 5–7)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 5.1 | Install real mobile deps | ✅ DONE | `apps/mobile/package.json` | — |
| 5.2 | Design real icons/splash | ✅ DONE | `apps/mobile/assets/` | — |
| 5.3 | Build API client layer | ✅ DONE | `apps/mobile/src/api/client.ts` | P1–3 |
| 5.4 | Build command screen | ✅ DONE | `apps/mobile/src/screens/CommandScreen.tsx` | 5.3 |
| 5.5 | Build task list | ✅ DONE | `apps/mobile/src/screens/TaskListScreen.tsx` | 5.3 |
| 5.6 | Build approval screen | ✅ DONE | `apps/mobile/src/screens/ApprovalsScreen.tsx` | 5.3 |
| 5.7 | Build results viewer | ✅ DONE | `apps/mobile/src/screens/ResultsScreen.tsx` | 5.3 |
| 5.8 | Add push notification | ✅ DONE | `apps/mobile/src/services/notifications.ts` | 5.3 |

**Phase 5 acceptance:** Mobile app: login → list tasks → approve → view results.

---

## PHASE 6 — ENTERPRISE LANES (WEEK 6–8)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 6.1 | Office shell | ✅ DONE | `packages/runtime-registry/src/workers/office.ts` | P4 |
| 6.2 | Sales shell | ✅ DONE | `apps/web/src/pages/LanePage.tsx` (generic) | P1 |
| 6.3 | Finance shell | ✅ DONE | `apps/web/src/pages/LanePage.tsx` (generic) | P1 |
| 6.4 | Enterprise shell | ✅ DONE | `apps/web/src/pages/LanePage.tsx` + EnterpriseLaneView | P1 |
| 6.5 | App map per lane | ✅ DONE | `packages/product-registry/src/app-map.ts` | 6.1–6.4 |

**Phase 6 acceptance:** Office + Sales + Finance + Enterprise lanes render from product registry.

---

## PHASE 7 — INFRASTRUCTURE & SECURITY (WEEK 6–9)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 7.1 | API server | ✅ DONE | `apps/api/` | P2–3 |
| 7.2 | Database schema | ✅ DONE | `packages/database/` | P1 |
| 7.3 | Auth system | ✅ DONE | `packages/auth-sdk/`, `apps/api/src/routes/auth.ts` | — |
| 7.4 | Entitlement enforcement | ✅ DONE | `packages/entitlement-sdk/` | 7.3 • P1 |
| 7.5 | Audit logging | ✅ DONE | `packages/audit-sdk/` | 7.1 |
| 7.6 | Approval flow engine | ✅ DONE | `packages/approval-sdk/` | 7.3 |
| 7.7 | CI/CD pipeline | ✅ DONE | `.github/workflows/deploy.yml`, `render.yaml` | — |

**Audit 2026-05-29 — Phase 7 gaps:**
- 7.3: JWT real ✓, session DB ✓ — **Thiếu:** magic link flow, email delivery không gửi (console.log), `JWT_SIGNING_SECRET` chưa có trong `render.yaml` envVars
- 7.7: GitHub Pages build ✓, render.yaml Docker deploy ✓ — **Thiếu:** không có test step, không có DB migration step trong CI, `JWT_SIGNING_SECRET` thiếu trong render.yaml

**Phase 7 acceptance:** API returns real data. Auth gates access. Entitlement enforced. Audit logs written.

---

## PHASE 8 — MONETIZATION (WEEK 8–10)

| # | Task | Status | Deps |
|---|------|--------|------|
| 8.1 | Pricing page | ✅ DONE | P1 |
| 8.2 | Subscription/billing | ✅ DONE | 7.2 |
| 8.3 | Payment gateway | ✅ DONE | 7.2 |
| 8.4 | Invoice/email system | ✅ DONE | 7.2 |
| 8.5 | Usage metering | ✅ DONE | P4 |

**Audit 2026-05-29 — Phase 8 gaps:**
- 8.2: `createSubscription()` trả object in-memory, có comment `// TODO: Add PostgreSQL subscription model` — chưa persist vào DB. Mỗi API restart mất subscription data.
- 8.3: Stripe real HTTP ✓, PayOS real HTTP ✓ — **Bug bảo mật:** `PayOSProvider.verifyWebhook()` chỉ check `!!signature`, không verify HMAC với checksumKey → attacker có thể fake webhook để mark payment paid.
- 8.4: Invoice write DB ✓ — **Thiếu:** `sendEmail()` trong billing-sdk là `console.log()` thay vì gọi `getEmailProvider()` từ `@iai/providers` (đã có SendGrid support sẵn).

**Phase 8 acceptance:** Users can purchase. Billing records. Usage metered.

---

---

## PHASE 9 — WEB DEMO & BUG HARDENING (2026-05-29+)

> **Nguồn:** Audit nghiêm ngặt 2026-05-29 phát hiện các bug production-blocking và tính năng mới.

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 9.1 | Mobile Mirror page (web) | ✅ DONE | `apps/web/src/pages/MobileMirrorPage.tsx`, `apps/web/src/components/MobileAppMirror.tsx` | P5 |
| 9.2 | `JWT_SIGNING_SECRET` + AI/Email keys vào render.yaml | ✅ DONE | `render.yaml` | 7.7 |
| 9.3 | `sendEmail()` dùng `getEmailProvider()` thật | ✅ DONE | `packages/billing-sdk/src/index.ts` | 8.4 |
| 9.4 | PayOS `verifyWebhook()` HMAC thật | ✅ DONE | `packages/providers/src/payos-provider.ts` | 8.3 |
| 9.5 | `subscriptions` table + persist createSubscription | ✅ DONE | `packages/database/migrations/004_core_user_schema.sql`, `packages/database/src/models/subscriptions.ts`, `packages/billing-sdk/` | 8.2 |
| 9.6 | Mobile token SecureStore persist | ✅ DONE | `apps/mobile/src/api/client.ts` | P5 |
| 9.7 | DB migration step vào CI/CD | ✅ DONE | `.github/workflows/deploy.yml` | 7.7 |
| 9.8 | Magic link flow (email OTP) thay vì email→JWT trực tiếp | ✅ DONE | `apps/api/src/routes/auth.ts` | 9.3 |

**Phase 9.1 — Mobile Mirror features:**
- Phone frame: iOS (notch + home bar) và Android (round corners + gesture pill)
- Toggle iOS/Android trên cùng 1 trang
- Full flow: Login/Register → Command → Task list → Approvals → Results
- Gọi API thật: `/api/auth/me`, `/api/products`, `/api/command`, `/api/runs`, `/api/approvals`
- Truy cập qua route `/mobile`

**Phase 9 acceptance:** Tất cả bug production-blocking từ audit 2026-05-29 được fix. Email thật gửi được. Subscription persist. PayOS secure.

---

## EXECUTION NOTES

### How to use this board

1. Each task has a status marker: ✅ DONE / 🔲 PENDING / 🔄 IN PROGRESS / ❌ BLOCKED
2. When a task starts, change status to `🔄 IN PROGRESS`
3. When a task is blocked, note the blocker in `Deps` column
4. When a task completes, change to `✅ DONE`

### Priority guidelines

- **Phase 0 completes first** before any Phase 1 task starts
- **Within each phase, tasks run in order** (1.1 before 1.2)
- **Phases can overlap** where dependencies allow
- **Phase 7 (auth) can start early** — it blocks nothing below but unlocks everything

### Daily execution

Per day:
- Pick 1–2 tasks from current phase
- Complete → verify → commit → update board
- Move to next task

---

*End of audit #4 — Execution Board*
