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
| 0.5 | Clean empty dirs | 🔲 PENDING | `content/`, `logs/` | Dev |
| 0.6 | Write `.env.template` | 🔲 PENDING | `.env.template` | Dev |

**Phase 0 acceptance:** 4 audit documents published. Repo state frozen for team.

---

## PHASE 1 — PRODUCT CATALOG SYSTEM (WEEK 1–2)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 1.1 | Create product registry package | 🔲 PENDING | `packages/product-registry/src/index.ts` | — |
| 1.2 | Define 12 product shells | 🔲 PENDING | `packages/product-registry/src/products.ts` | 1.1 |
| 1.3 | Add entitlement schema | 🔲 PENDING | `packages/product-registry/src/entitlement.ts` | 1.2 |
| 1.4 | Build shell router | 🔲 PENDING | `apps/web/src/lib/shell-router.ts` | 1.2 |
| 1.5 | Update ProductGrid | 🔲 PENDING | `apps/web/src/components/ProductGrid.tsx` | 1.4 |
| 1.6 | Build product detail page | 🔲 PENDING | `apps/web/src/pages/product/[id].tsx` | 1.4 |
| 1.7 | Build data-driven compare page | 🔲 PENDING | `apps/web/src/pages/compare.tsx` | 1.2 |
| 1.8 | Add pricing + CTA logic | 🔲 PENDING | `apps/web/src/lib/pricing.ts` | 1.2 |

**Phase 1 acceptance:** 12 products in registry. Compare page renders from data. Product detail pages route correctly.

---

## PHASE 2 — AI ROUTING MATRIX (WEEK 2–4)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 2.1 | Define intent schema | 🔲 PENDING | `packages/routing-matrix/src/intent.ts` | — |
| 2.2 | Define lane schema | 🔲 PENDING | `packages/routing-matrix/src/lane.ts` | 2.1 |
| 2.3 | Define model class mapping | 🔲 PENDING | `packages/routing-matrix/src/models.ts` | 2.2 |
| 2.4 | Define tool permission matrix | 🔲 PENDING | `packages/routing-matrix/src/tool-permission.ts` | 2.2 |
| 2.5 | Define overload protection | 🔲 PENDING | `packages/routing-matrix/src/overload.ts` | 2.3 |
| 2.6 | Router engine | 🔲 PENDING | `packages/routing-matrix/src/router.ts` | 2.1–2.5 |
| 2.7 | Fallback chain | 🔲 PENDING | `packages/routing-matrix/src/fallback.ts` | 2.6 |
| 2.8 | Connect to API layer | 🔲 PENDING | `apps/control-api/src/routes/command.ts` | 2.6 |

**Phase 2 acceptance:** Command with intent → lane + model + tool. Overload protection works.

---

## PHASE 3 — WORKFLOW / RESULT LOOP (WEEK 3–5)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 3.1 | Define run state machine | 🔲 PENDING | `packages/workflow-engine/src/states.ts` | — |
| 3.2 | Build run controller | 🔲 PENDING | `packages/workflow-engine/src/run.ts` | 3.1 |
| 3.3 | Build verification layer | 🔲 PENDING | `packages/workflow-engine/src/verify.ts` | 3.2 |
| 3.4 | Build output packager | 🔲 PENDING | `packages/workflow-engine/src/output-pack.ts` | 3.2 |
| 3.5 | Build replay system | 🔲 PENDING | `packages/workflow-engine/src/replay.ts` | 3.2 |
| 3.6 | Confidence scoring | 🔲 PENDING | `packages/workflow-engine/src/score.ts` | 3.3 |

**Phase 3 acceptance:** Command → Run → Verify → Package. Replay at any state.

---

## PHASE 4 — RUNTIME / AI COMPUTER LAYER (WEEK 4–6)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 4.1 | Define runtime registry | 🔲 PENDING | `packages/runtime-registry/src/index.ts` | P1 |
| 4.2 | Browser worker class | 🔲 PENDING | `packages/runtime-registry/src/workers/browser.ts` | 3.2 |
| 4.3 | Code worker class | 🔲 PENDING | `packages/runtime-registry/src/workers/code.ts` | 3.2 |
| 4.4 | Research worker class | 🔲 PENDING | `packages/runtime-registry/src/workers/research.ts` | 3.2 |
| 4.5 | Content worker class | 🔲 PENDING | `packages/runtime-registry/src/workers/content.ts` | 3.2 |
| 4.6 | Runtime policy engine | 🔲 PENDING | `packages/runtime-registry/src/policy.ts` | 4.1 |

**Phase 4 acceptance:** "Creator Computer" run → Content Worker. "Research" run → Research Worker.

---

## PHASE 5 — MOBILE COMMAND CENTER (WEEK 5–7)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 5.1 | Install real mobile deps | 🔲 PENDING | `apps/mobile/package.json` | — |
| 5.2 | Design real icons/splash | 🔲 PENDING | `apps/mobile/assets/` | — |
| 5.3 | Build API client layer | 🔲 PENDING | `apps/mobile/src/api/` | P1–3 |
| 5.4 | Build command screen | 🔲 PENDING | `apps/mobile/src/screens/Command.tsx` | 5.3 |
| 5.5 | Build task list | 🔲 PENDING | `apps/mobile/src/screens/Tasks.tsx` | 5.3 |
| 5.6 | Build approval screen | 🔲 PENDING | `apps/mobile/src/screens/Approval.tsx` | 5.3 |
| 5.7 | Build results viewer | 🔲 PENDING | `apps/mobile/src/screens/Results.tsx` | 5.3 |
| 5.8 | Add push notification | 🔲 PENDING | `apps/mobile/src/services/notifications.ts` | 5.3 |

**Phase 5 acceptance:** Mobile app: login → list tasks → approve → view results.

---

## PHASE 6 — ENTERPRISE LANES (WEEK 6–8)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 6.1 | Office shell | 🔲 PENDING | `packages/runtime-registry/src/workers/office.ts` | P4 |
| 6.2 | Sales shell | 🔲 PENDING | `apps/web/src/pages/sales/` | P1 |
| 6.3 | Finance shell | 🔲 PENDING | `apps/web/src/pages/finance/` | P1 |
| 6.4 | Enterprise shell | 🔲 PENDING | `apps/web/src/pages/enterprise/` | P1 |
| 6.5 | App map per lane | 🔲 PENDING | `packages/product-registry/src/app-map.ts` | 6.1–6.4 |

**Phase 6 acceptance:** Office + Sales + Finance + Enterprise lanes render from product registry.

---

## PHASE 7 — INFRASTRUCTURE & SECURITY (WEEK 6–9)

| # | Task | Status | File | Deps |
|---|------|--------|------|------|
| 7.1 | API server | 🔲 PENDING | `apps/control-api/` | P2–3 |
| 7.2 | Database schema | 🔲 PENDING | `packages/database/` | P1 |
| 7.3 | Auth system | 🔲 PENDING | `packages/auth-sdk/` | — |
| 7.4 | Entitlement enforcement | 🔲 PENDING | `packages/entitlement-sdk/` | 7.3 • P1 |
| 7.5 | Audit logging | 🔲 PENDING | `packages/audit-sdk/` | 7.1 |
| 7.6 | Approval flow engine | 🔲 PENDING | `packages/approval-sdk/` | 7.3 |
| 7.7 | CI/CD pipeline | 🔲 PENDING | `.github/workflows/deploy.yml` | — |

**Phase 7 acceptance:** API returns real data. Auth gates access. Entitlement enforced. Audit logs written.

---

## PHASE 8 — MONETIZATION (WEEK 8–10)

| # | Task | Status | Deps |
|---|------|--------|------|
| 8.1 | Pricing page | 🔲 PENDING | P1 |
| 8.2 | Subscription/billing | 🔲 PENDING | 7.2 |
| 8.3 | Payment gateway | 🔲 PENDING | 7.2 |
| 8.4 | Invoice/email system | 🔲 PENDING | 7.2 |
| 8.5 | Usage metering | 🔲 PENDING | P4 |

**Phase 8 acceptance:** Users can purchase. Billing records. Usage metered.

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
