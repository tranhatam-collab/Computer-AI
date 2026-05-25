# COMPUTER.IAI.ONE — AUTOMATIC DEV EXECUTION PLAN 2026

**Generated:** 2026-05-25 00:09 GMT+7  
**Source:** docs/computer/ (9 documents)  
**Total tasks:** 62 (9 done, 53 remaining)  
**Estimated total dev time:** ~80–100 hours  

---

## EXECUTION RULES

1. **Dependency-first** — no task starts before its dependencies
2. **Build → verify → commit** — every task is followed by build + commit
3. **One task at a time** — no parallel work to avoid context switches
4. **Report after each task** — file changed, reason, next step
5. **Only work in Computer.iai.one** — absolutely no other directories

---

## PHASE 1 — PRODUCT CATALOG SYSTEM (8 tasks, ~20h)

### Task 1.1 — Create @iai/product-registry package

| Field | Value |
|-------|-------|
| **Description** | New package with product definitions, shell schemas |
| **Files to create** | `packages/product-registry/package.json`, `packages/product-registry/src/index.ts`, `packages/product-registry/src/products.ts`, `packages/product-registry/src/shell.ts`, `packages/product-registry/src/entitlement.ts`, `packages/product-registry/src/pricing.ts` |
| **Estimated time** | 3h |
| **Dependencies** | None |
| **Verification** | `pnpm exec tsc --noEmit` passes |
| **Acceptance** | 12 product IDs, 5 shells, pricing table, entitlement matrix |

### Task 1.2 — Connect web to product registry

| Field | Value |
|-------|-------|
| **Description** | Replace static `lib/products.ts` with `@iai/product-registry` import |
| **Files to modify** | `apps/web/package.json` (add workspace dep), `apps/web/src/lib/products.ts` (replace), `apps/web/src/data/vi.ts` (extend), `apps/web/src/data/en.ts` (extend) |
| **Estimated time** | 2h |
| **Dependencies** | 1.1 |
| **Verification** | Build passes, all 12 products visible |

### Task 1.3 — Shell router

| Field | Value |
|-------|-------|
| **Description** | Route to product-specific shell pages |
| **Files to create** | `apps/web/src/lib/shell-router.ts`, `apps/web/src/pages/product/[id].tsx` |
| **Files to modify** | `apps/web/src/App.tsx` (add routing) |
| **Estimated time** | 3h |
| **Dependencies** | 1.2 |
| **Verification** | `/product/creator` → renders Creator shell |

### Task 1.4 — Update ProductGrid

| Field | Value |
|-------|-------|
| **Description** | Render from registry, add shell routing links |
| **Files to modify** | `apps/web/src/components/ProductGrid.tsx` |
| **Estimated time** | 1h |
| **Dependencies** | 1.3 |
| **Verification** | 12 product cards, each links to shell page |

### Task 1.5 — Data-driven CompareStrip

| Field | Value |
|-------|-------|
| **Description** | Replace hardcoded CompareStrip with registry-driven comparison |
| **Files to modify** | `apps/web/src/components/CompareStrip.tsx` |
| **Estimated time** | 2h |
| **Dependencies** | 1.2 |
| **Verification** | Compare renders all 12 products, bilingual |

### Task 1.6 — Product detail pages

| Field | Value |
|-------|-------|
| **Description** | Full product detail for each of 12 shells |
| **Files to create** | `apps/web/src/pages/product/index.tsx`, `apps/web/src/styles/pages/product.css` |
| **Estimated time** | 4h |
| **Dependencies** | 1.3 |
| **Verification** | 12 detail pages, each with correct content + CTA |

### Task 1.7 — Pricing + CTA logic

| Field | Value |
|-------|-------|
| **Description** | Dynamic pricing display, locale-based CTA |
| **Files to create** | `apps/web/src/lib/pricing.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 1.2 |
| **Verification** | Prices display in VND/VI or USD/EN |

### Task 1.8 — Empty dirs cleanup

| Field | Value |
|-------|-------|
| **Description** | Remove empty `content/`, `logs/` |
| **Estimated time** | 0.5h |
| **Dependencies** | None |
| **Verification** | `git status` shows removed dirs |

**Phase 1 acceptance:** 12 products in registry. Web renders from registry. Detail pages route correctly. Compare is data-driven.

---

## PHASE 2 — AI ROUTING MATRIX (8 tasks, ~16h)

### Task 2.1 — Intent schema

| Field | Value |
|-------|-------|
| **Description** | Define 15+ intents (research, write, code, analyze, summarize, translate, plan, report, create, design, calculate, search, organize, automate, configure) |
| **Files to create** | `packages/routing-matrix/src/intent.ts`, `packages/routing-matrix/package.json`, `packages/routing-matrix/src/index.ts` |
| **Estimated time** | 2h |
| **Dependencies** | None |
| **Verification** | `tsc --noEmit` passes |

### Task 2.2 — Lane schema

| Field | Value |
|-------|-------|
| **Description** | Map intents to lanes (research, content, code, business, finance, sales, media, data, admin) |
| **Files to create** | `packages/routing-matrix/src/lane.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 2.1 |
| **Verification** | Every intent maps to at least one lane |

### Task 2.3 — Model class mapping

| Field | Value |
|-------|-------|
| **Description** | Map lanes → model classes (fast, balanced, deep, code, creative, analytic) |
| **Files to create** | `packages/routing-matrix/src/models.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 2.2 |
| **Verification** | Each lane has default + fallback model class |

### Task 2.4 — Tool permission matrix

| Field | Value |
|-------|-------|
| **Description** | Map tools (search, browse, read, write, execute, transform, store, notify, approve) to product entitlements |
| **Files to create** | `packages/routing-matrix/src/tool-permission.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 2.2 |
| **Verification** | Free product has subset of Enterprise tools |

### Task 2.5 — Overload protection

| Field | Value |
|-------|-------|
| **Description** | Per-product rate limits, quota enforcer, cost control |
| **Files to create** | `packages/routing-matrix/src/overload.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 2.3 |
| **Verification** | Overload rejects beyond quota |

### Task 2.6 — Router engine

| Field | Value |
|-------|-------|
| **Description** | Main router: intent → resolve lane → select model → check tools → apply overload |
| **Files to create** | `packages/routing-matrix/src/router.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 2.1–2.5 |
| **Verification** | Full routing returns lane + model + tools |

### Task 2.7 — Fallback chain

| Field | Value |
|-------|-------|
| **Description** | Lane fallback, model fallback, tool fallback |
| **Files to create** | `packages/routing-matrix/src/fallback.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 2.6 |
| **Verification** | Fallback works when primary is overloaded/missing |

### Task 2.8 — API route stub

| Field | Value |
|-------|-------|
| **Description** | Simple POST /api/command → router → response |
| **Files to create** | `apps/api/package.json`, `apps/api/src/index.ts`, `apps/api/src/routes/command.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 2.6, P1 |
| **Verification** | `curl -X POST ...` returns routing result |

**Phase 2 acceptance:** Command with intent → returns lane + model + tool. Overload rejects beyond quota.

---

## PHASE 3 — WORKFLOW ENGINE (6 tasks, ~14h)

### Task 3.1 — Run state machine

| Field | Value |
|-------|-------|
| **Description** | States: created → queued → running → verifying → completed / failed / rejected |
| **Files to create** | `packages/workflow-engine/src/states.ts`, `packages/workflow-engine/package.json` |
| **Estimated time** | 2h |
| **Dependencies** | None |
| **Verification** | State transitions are valid |

### Task 3.2 — Run controller

| Field | Value |
|-------|-------|
| **Description** | createRun, transition, getRun, listRuns |
| **Files to create** | `packages/workflow-engine/src/run.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 3.1 |
| **Verification** | Can create run, transition, query |

### Task 3.3 — Verification layer

| Field | Value |
|-------|-------|
| **Description** | Auto-verify (format check, content check) + manual review gates |
| **Files to create** | `packages/workflow-engine/src/verify.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 3.2 |
| **Verification** | Runs auto-verify, surfaces manual-review items |

### Task 3.4 — Output packager

| Field | Value |
|-------|-------|
| **Description** | Package run output into structured artifacts |
| **Files to create** | `packages/workflow-engine/src/output-pack.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 3.2 |
| **Verification** | Output is packaged with metadata + content |

### Task 3.5 — Replay system

| Field | Value |
|-------|-------|
| **Description** | Re-run with same context, compare outputs |
| **Files to create** | `packages/workflow-engine/src/replay.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 3.2 |
| **Verification** | Replay produces comparable output |

### Task 3.6 — Confidence scoring

| Field | Value |
|-------|-------|
| **Description** | Score from 0–100 based on verification results |
| **Files to create** | `packages/workflow-engine/src/score.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 3.3 |
| **Verification** | Every output has confidence_score |

**Phase 3 acceptance:** Full command → run → verify → output → score cycle.

---

## PHASE 4 — RUNTIME WORKERS (6 tasks, ~14h)

### Task 4.1 — Runtime registry

| Field | Value |
|-------|-------|
| **Description** | Register worker classes per product |
| **Files to create** | `packages/runtime-registry/package.json`, `packages/runtime-registry/src/index.ts` |
| **Estimated time** | 2h |
| **Dependencies** | P1 (product registry) |
| **Verification** | Each product maps to allowed worker classes |

### Task 4.2 — Browser worker

| Field | Value |
|-------|-------|
| **Description** | Web search, page visit, content extraction |
| **Files to create** | `packages/runtime-registry/src/workers/browser.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 3.2 |
| **Verification** | Worker accepts task → returns result |

### Task 4.3 — Code worker

| Field | Value |
|-------|-------|
| **Description** | Code generation, review, debugging |
| **Files to create** | `packages/runtime-registry/src/workers/code.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 3.2 |
| **Verification** | Worker generates valid code output |

### Task 4.4 — Research worker

| Field | Value |
|-------|-------|
| **Description** | Multi-source research, synthesis, citation |
| **Files to create** | `packages/runtime-registry/src/workers/research.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 3.2 |
| **Verification** | Research output includes sources + summary |

### Task 4.5 — Content worker

| Field | Value |
|-------|-------|
| **Description** | Article writing, rewriting, formatting |
| **Files to create** | `packages/runtime-registry/src/workers/content.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 3.2 |
| **Verification** | Content worker produces structured document |

### Task 4.6 — Runtime policy engine

| Field | Value |
|-------|-------|
| **Description** | Quota enforcement, concurrency limits, timeout |
| **Files to create** | `packages/runtime-registry/src/policy.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 4.1 |
| **Verification** | Policy blocks when limits exceeded |

**Phase 4 acceptance:** Product dispatches to correct worker. Workers return structured outputs.

---

## PHASE 5 — MOBILE COMMAND CENTER (8 tasks, ~16h)

### Task 5.1 — Real mobile deps

| Field | Value |
|-------|-------|
| **Description** | Add expo-router, react-navigation, secure-store |
| **Files to modify** | `apps/mobile/package.json`, `apps/mobile/app.json` |
| **Estimated time** | 1h |
| **Dependencies** | None |
| **Verification** | `npx expo start` works |

### Task 5.2 — Icon/splash design

| Field | Value |
|-------|-------|
| **Description** | Generate proper 1024×1024 icon, 1284×2778 splash |
| **Files to modify** | `apps/mobile/assets/` (replace placeholders) |
| **Estimated time** | 1h |
| **Dependencies** | None |
| **Verification** | `file *.png` shows correct dimensions |

### Task 5.3 — API client layer

| Field | Value |
|-------|-------|
| **Description** | HTTP client for command API, auth, entitlement |
| **Files to create** | `apps/mobile/src/api/client.ts`, `apps/mobile/src/api/endpoints.ts` |
| **Estimated time** | 2h |
| **Dependencies** | P1–3 |
| **Verification** | Client can call local API |

### Task 5.4 — Command screen

| Field | Value |
|-------|-------|
| **Description** | Input command, select product, send to API |
| **Files to create** | `apps/mobile/src/screens/Command.tsx` |
| **Files to modify** | `apps/mobile/App.tsx` (add navigation) |
| **Estimated time** | 2h |
| **Dependencies** | 5.3 |
| **Verification** | Can type command and submit |

### Task 5.5 — Tasks screen

| Field | Value |
|-------|-------|
| **Description** | List active runs, tap to view detail |
| **Files to create** | `apps/mobile/src/screens/Tasks.tsx` |
| **Estimated time** | 2h |
| **Dependencies** | 5.3 |
| **Verification** | Shows run list with status |

### Task 5.6 — Approval screen

| Field | Value |
|-------|-------|
| **Description** | Approve/reject pending items |
| **Files to create** | `apps/mobile/src/screens/Approvals.tsx` |
| **Estimated time** | 2h |
| **Dependencies** | 5.3 |
| **Verification** | Can approve and reject |

### Task 5.7 — Results screen

| Field | Value |
|-------|-------|
| **Description** | View completed outputs, share, export |
| **Files to create** | `apps/mobile/src/screens/Results.tsx` |
| **Estimated time** | 2h |
| **Dependencies** | 5.3 |
| **Verification** | Renders output artifacts |

### Task 5.8 — Push notification

| Field | Value |
|-------|-------|
| **Description** | Expo push notifications for run completion |
| **Files to create** | `apps/mobile/src/services/notifications.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 5.3 |
| **Verification** | Device receives notification |

**Phase 5 acceptance:** Mobile app: login → list → command → approve → view results.

---

## PHASE 6 — ENTERPRISE LANES (5 tasks, ~10h)

### Task 6.1 — Office shell

| Field | Value |
|-------|-------|
| **Description** | Document gen, spreadsheet, presentation automation |
| **Files to create** | `packages/runtime-registry/src/workers/office.ts` |
| **Estimated time** | 2h |
| **Dependencies** | P4 |
| **Verification** | Office worker → produces structured documents |

### Task 6.2 — Sales shell

| Field | Value |
|-------|-------|
| **Description** | Lead gen, outreach, pipeline management |
| **Files to create** | `apps/web/src/pages/sales/` |
| **Estimated time** | 2h |
| **Dependencies** | P1 |
| **Verification** | Sales shell renders with correct product info |

### Task 6.3 — Finance shell

| Field | Value |
|-------|-------|
| **Description** | Receipt processing, reconciliation, reporting |
| **Files to create** | `apps/web/src/pages/finance/` |
| **Estimated time** | 2h |
| **Dependencies** | P1 |
| **Verification** | Finance shell renders correct capabilities |

### Task 6.4 — Enterprise shell

| Field | Value |
|-------|-------|
| **Description** | Governance, team management, audit view |
| **Files to create** | `apps/web/src/pages/enterprise/` |
| **Estimated time** | 2h |
| **Dependencies** | P1 |
| **Verification** | Enterprise shell renders with governance UI |

### Task 6.5 — App map per lane

| Field | Value |
|-------|-------|
| **Description** | Catalog of 100+ apps organized by lane and product |
| **Files to create** | `packages/product-registry/src/app-map.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 6.1–6.4 |
| **Verification** | Each lane has app list |

**Phase 6 acceptance:** 4 enterprise shells render. App map cataloged.

---

## PHASE 7 — INFRASTRUCTURE (7 tasks, ~16h)

### Task 7.1 — API server

| Field | Value |
|-------|-------|
| **Description** | Express/Fastify server with routes for command, run, product, auth |
| **Files to create** | `apps/api/package.json`, `apps/api/src/index.ts`, `apps/api/src/routes/*.ts` |
| **Estimated time** | 4h |
| **Dependencies** | P2–3 |
| **Verification** | Server starts, endpoints respond |

### Task 7.2 — Database schema

| Field | Value |
|-------|-------|
| **Description** | SQLite/Postgres schema: users, products, runs, outputs, approvals |
| **Files to create** | `packages/database/`, `packages/database/src/schema.ts`, `packages/database/src/migrations/` |
| **Estimated time** | 3h |
| **Dependencies** | P1 |
| **Verification** | Migrations run, tables created |

### Task 7.3 — Auth system

| Field | Value |
|-------|-------|
| **Description** | Email + magic link, session management, JWT |
| **Files to create** | `packages/auth-sdk/`, `packages/auth-sdk/src/index.ts` |
| **Estimated time** | 3h |
| **Dependencies** | None |
| **Verification** | Can register, login, get session |

### Task 7.4 — Entitlement enforcement

| Field | Value |
|-------|-------|
| **Description** | Gate API endpoints by product entitlement |
| **Files to create** | `packages/entitlement-sdk/`, `packages/entitlement-sdk/src/gate.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 7.3, P1 |
| **Verification** | Free user blocked from enterprise endpoints |

### Task 7.5 — Audit logging

| Field | Value |
|-------|-------|
| **Description** | Immutable event log for all state-changing actions |
| **Files to create** | `packages/audit-sdk/`, `packages/audit-sdk/src/index.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 7.1 |
| **Verification** | Audit events stored and queryable |

### Task 7.6 — Approval flow engine

| Field | Value |
|-------|-------|
| **Description** | Multi-step approval: submit → assignee → approve/reject → escalate |
| **Files to create** | `packages/approval-sdk/`, `packages/approval-sdk/src/flow.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 7.3 |
| **Verification** | Can create, approve, reject, escalate flow |

### Task 7.7 — CI/CD pipeline

| Field | Value |
|-------|-------|
| **Description** | GitHub Actions: test, build, deploy to GitHub Pages |
| **Files to create** | `.github/workflows/deploy.yml` |
| **Estimated time** | 1h |
| **Dependencies** | None |
| **Verification** | Push to main triggers deploy |

**Phase 7 acceptance:** API returns real data. Auth gates access. Entitlement enforced. Audit logs written.

---

## PHASE 8 — MONETIZATION (5 tasks, ~10h)

### Task 8.1 — Pricing page

| Field | Value |
|-------|-------|
| **Description** | Public pricing page with plan comparison |
| **Files to create** | `apps/web/src/pages/pricing.tsx`, `apps/web/src/styles/pages/pricing.css` |
| **Estimated time** | 2h |
| **Dependencies** | P1 |
| **Verification** | Pricing page renders with correct amounts |

### Task 8.2 — Subscription/billing

| Field | Value |
|-------|-------|
| **Description** | Stripe integration: create subscription, manage billing |
| **Files to create** | `packages/billing-sdk/`, `packages/billing-sdk/src/index.ts` |
| **Estimated time** | 3h |
| **Dependencies** | 7.2 |
| **Verification** | Can create subscription, get invoice |

### Task 8.3 — Payment gateway

| Field | Value |
|-------|-------|
| **Description** | Stripe checkout integration (global) + PayOS (Vietnam) |
| **Files to modify** | `apps/web/src/pages/checkout.tsx` |
| **Estimated time** | 3h |
| **Dependencies** | 7.2 |
| **Verification** | End-to-end payment flow works |

### Task 8.4 — Invoice/email

| Field | Value |
|-------|-------|
| **Description** | Post-purchase invoice generation, email delivery |
| **Files to create** | `packages/invoice-sdk/`, `packages/invoice-sdk/src/index.ts` |
| **Estimated time** | 2h |
| **Dependencies** | 7.2 |
| **Verification** | Invoice generated and emailed |

### Task 8.5 — Usage metering

| Field | Value |
|-------|-------|
| **Description** | Track runs, output credits, storage per user per cycle |
| **Files to create** | `packages/usage-sdk/`, `packages/usage-sdk/src/meter.ts` |
| **Estimated time** | 2h |
| **Dependencies** | P4 |
| **Verification** | Usage tracked, quota enforced |

**Phase 8 acceptance:** Users can purchase. Billing records generated. Usage metered.

---

## SUMMARY: ALL 53 REMAINING TASKS

| Phase | Tasks | Total Hours | Est. Days |
|-------|:-----:|:-----------:|:---------:|
| 1 — Product Catalog | 8 | 17.5h | 2.5 |
| 2 — AI Routing | 8 | 18h | 2.5 |
| 3 — Workflow Engine | 6 | 14h | 2 |
| 4 — Runtime Workers | 6 | 15h | 2 |
| 5 — Mobile | 8 | 14h | 2 |
| 6 — Enterprise | 5 | 10h | 1.5 |
| 7 — Infrastructure | 7 | 17h | 2.5 |
| 8 — Monetization | 5 | 12h | 1.5 |
| **Total** | **53** | **117.5h** | **~15 days** |

---

## EXECUTION ORDER (AUTOMATIC)

The system will process tasks in this exact order, one at a time:

1. **Phase 0** → (already complete) skip to Phase 1
2. **1.1** → **1.2** → **1.3** → **1.4** → **1.5** → **1.6** → **1.7** → **1.8**
3. **2.1** → **2.2** → **2.3** → **2.4** → **2.5** → **2.6** → **2.7** → **2.8**
4. **3.1** → **3.2** → **3.3** → **3.4** → **3.5** → **3.6**
5. **4.1** → **4.2** → **4.3** → **4.4** → **4.5** → **4.6**
6. **5.1** → **5.2** → **5.3** → **5.4** → **5.5** → **5.6** → **5.7** → **5.8**
7. **6.1** → **6.2** → **6.3** → **6.4** → **6.5**
8. **7.1** → **7.2** → **7.3** → **7.4** → **7.5** → **7.6** → **7.7**
9. **8.1** → **8.2** → **8.3** → **8.4** → **8.5**

**Stop condition:** All 53 tasks complete and verified.

---

*End of Automatic Dev Execution Plan*
