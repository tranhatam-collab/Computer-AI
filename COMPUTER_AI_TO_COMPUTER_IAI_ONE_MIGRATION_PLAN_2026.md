# COMPUTER AI → COMPUTER.IAI.ONE — MIGRATION PLAN

**Date:** 2026-05-24  
**Context:** This plan describes how to evolve the current `Computer-AI` monorepo (frontend shell + types) into the full `computer.iai.one` production system per founder's locked vision.

---

## 1. CURRENT STATE vs TARGET

| Dimension | Current (Computer-AI) | Target (computer.iai.one) |
|-----------|----------------------|---------------------------|
| Web | Static catalog homepage | Product shell system with shell routing |
| Mobile | Expo starter with shell selector | Mobile Command Center (real API, push, entitlements) |
| Contracts | Type-only | Runtime SDKs with validation |
| AI | None | Intent → Lane → Model → Tool routing matrix |
| Workflow | None | Command → Run → Verify → Deliver loop |
| Runtime | None | Worker classes per product tier |
| Products | 5 static items | 12 registered products with entitlements |
| Security | None | Auth + RBAC + Audit + Approval flows |
| Infrastructure | GitHub Pages only | API server + DB + Queue + File storage |

---

## 2. PHASED MIGRATION ROADMAP

### Phase 0 — Freeze & Document (THIS WEEK)

**Goal:** Lock current state, create documentation for team.

| Task | Deliverable |
|------|-------------|
| Repo tree audit | ✅ `COMPUTER_AI_REPO_TREE_AUDIT_2026.md` |
| Gaps analysis | ✅ `COMPUTER_AI_EXISTING_FILES_AND_GAPS_2026.md` |
| Migration plan | ✅ This document |
| Execution board | → `COMPUTER_AI_PHASED_REBUILD_EXECUTION_BOARD_2026.md` |

---

### Phase 1 — Product Catalog System (WEEK 1–2)

**Goal:** Convert static web app into product shell system.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 1.1 Create product registry | `packages/product-registry/src/index.ts` | None |
| 1.2 Define 12 product shells | `packages/product-registry/src/products.ts` | 1.1 |
| 1.3 Add entitlement schema | `packages/product-registry/src/entitlement.ts` | 1.2 |
| 1.4 Build shell router | `apps/web/src/lib/shell-router.ts` | 1.2 |
| 1.5 Update ProductGrid | `apps/web/src/components/ProductGrid.tsx` | 1.4 |
| 1.6 Build product detail page | `apps/web/src/pages/product/[id].tsx` | 1.4 |
| 1.7 Build compare page (data-driven) | `apps/web/src/pages/compare.tsx` | 1.2 |
| 1.8 Add pricing + CTA logic | `apps/web/src/lib/pricing.ts` | 1.2 |

**Acceptance:** 5 product pages → 12 product pages. Compare page renders from registry, not hardcoded.

---

### Phase 2 — AI Routing Matrix (WEEK 2–4)

**Goal:** Build the intent→lane→model→tool routing system.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 2.1 Define intent schema | `packages/routing-matrix/src/intent.ts` | None |
| 2.2 Define lane schema | `packages/routing-matrix/src/lane.ts` | 2.1 |
| 2.3 Define model class mapping | `packages/routing-matrix/src/models.ts` | 2.2 |
| 2.4 Define tool permission matrix | `packages/routing-matrix/src/tool-permission.ts` | 2.2 |
| 2.5 Define overload protection | `packages/routing-matrix/src/overload.ts` | 2.3 |
| 2.6 Router engine | `packages/routing-matrix/src/router.ts` | 2.1–2.5 |
| 2.7 Fallback chain | `packages/routing-matrix/src/fallback.ts` | 2.6 |
| 2.8 Connect to API layer | `apps/control-api/src/routes/command.ts` | 2.6 |

**Acceptance:** A command with intent → returns lane + model + tool set. Overload protection rejects beyond quota.

---

### Phase 3 — Workflow / Result Loop (WEEK 3–5)

**Goal:** Build the command lifecycle.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 3.1 Define run state machine | `packages/workflow-engine/src/states.ts` | None |
| 3.2 Build run controller | `packages/workflow-engine/src/run.ts` | 3.1 |
| 3.3 Build verification layer | `packages/workflow-engine/src/verify.ts` | 3.2 |
| 3.4 Build output packager | `packages/workflow-engine/src/output-pack.ts` | 3.2 |
| 3.5 Build replay system | `packages/workflow-engine/src/replay.ts` | 3.2 |
| 3.6 Confidence scoring | `packages/workflow-engine/src/score.ts` | 3.3 |

**Acceptance:** Command → Run → Auto-verify → Package output. Can replay at any state.

---

### Phase 4 — Runtime / AI Computer Layer (WEEK 4–6)

**Goal:** Register worker classes per product.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 4.1 Define runtime registry | `packages/runtime-registry/src/index.ts` | Phase 1 products |
| 4.2 Browser worker class | `packages/runtime-registry/src/workers/browser.ts` | 3.2 |
| 4.3 Code worker class | `packages/runtime-registry/src/workers/code.ts` | 3.2 |
| 4.4 Research worker class | `packages/runtime-registry/src/workers/research.ts` | 3.2 |
| 4.5 Content worker class | `packages/runtime-registry/src/workers/content.ts` | 3.2 |
| 4.6 Runtime policy engine | `packages/runtime-registry/src/policy.ts` | 4.1 |

**Acceptance:** A "Creator Computer" run → dispatches to Content Worker. A "Research" run → dispatches to Research Worker.

---

### Phase 5 — Mobile Command Center (WEEK 5–7)

**Goal:** Turn Expo starter into real mobile command center.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 5.1 Install real mobile deps | `apps/mobile/package.json` | None |
| 5.2 Design real icons/splash | `apps/mobile/assets/` | None |
| 5.3 Build API client layer | `apps/mobile/src/api/` | Phase 1–3 |
| 5.4 Build real command screen | `apps/mobile/src/screens/Command.tsx` | 5.3 |
| 5.5 Build task list | `apps/mobile/src/screens/Tasks.tsx` | 5.3 |
| 5.6 Build approval screen | `apps/mobile/src/screens/Approval.tsx` | 5.3 |
| 5.7 Build results viewer | `apps/mobile/src/screens/Results.tsx` | 5.3 |
| 5.8 Add push notification | `apps/mobile/src/services/notifications.ts` | 5.3 |

**Acceptance:** Mobile app can login, list tasks, approve items, view results. Real API backend.

---

### Phase 6 — Enterprise Lanes (WEEK 6–8)

**Goal:** Add office/enterprise product shells.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 6.1 Office shell | `packages/runtime-registry/src/workers/office.ts` | Phase 4 |
| 6.2 Sales shell | `apps/web/src/pages/sales/` | Phase 1 |
| 6.3 Finance shell | `apps/web/src/pages/finance/` | Phase 1 |
| 6.4 Enterprise shell | `apps/web/src/pages/enterprise/` | Phase 1 |
| 6.5 App map per lane | `packages/product-registry/src/app-map.ts` | 6.1–6.4 |

---

### Phase 7 — Infrastructure & Security (WEEK 6–9)

**Goal:** Production-grade backend.

| Task | Files affected | Dependencies |
|------|---------------|--------------|
| 7.1 API server | `apps/control-api/` | Phase 2–3 |
| 7.2 Database schema | `packages/database/` | Phase 1 |
| 7.3 Auth system | `packages/auth-sdk/` | None |
| 7.4 Entitlement enforcement | `packages/entitlement-sdk/` | 7.3 • Phase 1 |
| 7.5 Audit logging | `packages/audit-sdk/` | 7.1 |
| 7.6 Approval flow engine | `packages/approval-sdk/` | 7.3 |
| 7.7 CI/CD pipeline | `.github/workflows/deploy.yml` | None |

---

### Phase 8 — Monetization (WEEK 8–10)

| Task | Dependencies |
|------|--------------|
| 8.1 Pricing page | Phase 1 |
| 8.2 Subscription/billing integration | 7.2 |
| 8.3 Payment gateway | 7.2 |
| 8.4 Invoice/email system | 7.2 |
| 8.5 Usage metering | Phase 4 |

---

## 3. CURRENT GAPS CLOSURE ORDER

From highest to lowest priority:

```
Priority 1: Product Registry (Phase 1)
  → Unlocks: shell routing, compare pages, pricing

Priority 2: AI Routing Matrix (Phase 2)
  → Unlocks: lane-based command routing, product differentiation

Priority 3: Workflow Engine (Phase 3)
  → Unlocks: run lifecycle, verification, output packaging

Priority 4: Runtime Workers (Phase 4)
  → Unlocks: actual AI task execution per product

Priority 5: API + Auth (Phase 7)
  → Unlocks: real backend, user management, security

Priority 6: Mobile (Phase 5)
  → Unlocks: mobile command center

Priority 7: Enterprise Lanes (Phase 6)
  → Unlocks: office/enterprise products
```

---

*End of audit #3 — Migration Plan*
