# COMPUTER.IAI.ONE — EXECUTION BOARD 2026

**Version:** 2026.05.24  
**Status:** Live tracking  

---

## PHASE 0 — DOCUMENTATION COMPLETE

| # | Task | Status | File |
|---|------|--------|------|
| 0.1 | Repo tree audit | ✅ | docs/computer/COMPUTER_AI_REPO_TREE_AUDIT_2026.md |
| 0.2 | Files & gaps analysis | ✅ | docs/computer/COMPUTER_AI_EXISTING_FILES_AND_GAPS_2026.md |
| 0.3 | Migration plan | ✅ | docs/computer/COMPUTER_AI_TO_COMPUTER_IAI_ONE_MIGRATION_PLAN_2026.md |
| 0.4 | Execution board (v1) | ✅ | docs/computer/COMPUTER_AI_PHASED_REBUILD_EXECUTION_BOARD_2026.md |
| 0.5 | Master spec | ✅ | docs/computer/COMPUTER_IAI_ONE_MASTER_SPEC_2026.md |
| 0.6 | Product catalog schema | ✅ | docs/computer/COMPUTER_IAI_ONE_PRODUCT_CATALOG_SCHEMA_2026.md |
| 0.7 | Shared core integration map | ✅ | docs/computer/COMPUTER_IAI_ONE_SHARED_CORE_INTEGRATION_MAP_2026.md |
| 0.8 | Commercial plan | ✅ | docs/computer/COMPUTER_IAI_ONE_COMMERCIAL_PLAN_2026.md |
| 0.9 | Execution board (v2) | ✅ | This file |

---

## PHASE 1 — PRODUCT CATALOG SYSTEM

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 1.1 | Create @iai/product-registry | 🔲 | Dev | — |
| 1.2 | Define 12 product shells | 🔲 | Dev | 1.1 |
| 1.3 | Entitlement schema | 🔲 | Dev | 1.2 |
| 1.4 | Shell router (web) | 🔲 | Dev | 1.2 |
| 1.5 | Update ProductGrid | 🔲 | Dev | 1.4 |
| 1.6 | Product detail pages | 🔲 | Dev | 1.4 |
| 1.7 | Data-driven compare | 🔲 | Dev | 1.2 |
| 1.8 | Pricing + CTA logic | 🔲 | Dev | 1.2 |

**Acceptance:** 12 products in registry. Web renders from registry. Detail pages work.

---

## PHASE 2 — AI ROUTING MATRIX

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 2.1 | Intent schema | 🔲 | Team | — |
| 2.2 | Lane schema | 🔲 | Team | 2.1 |
| 2.3 | Model class mapping | 🔲 | Team | 2.2 |
| 2.4 | Tool permission matrix | 🔲 | Team | 2.2 |
| 2.5 | Overload protection | 🔲 | Team | 2.3 |
| 2.6 | Router engine | 🔲 | Team | 2.1–5 |
| 2.7 | Fallback chain | 🔲 | Team | 2.6 |
| 2.8 | API route | 🔲 | Team | 2.6 |

**Acceptance:** Command returns lane + model + tool. Overload rejects beyond quota.

---

## PHASE 3 — WORKFLOW ENGINE

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 3.1 | Run state machine | 🔲 | Team | — |
| 3.2 | Run controller | 🔲 | Team | 3.1 |
| 3.3 | Verification layer | 🔲 | Team | 3.2 |
| 3.4 | Output packager | 🔲 | Team | 3.2 |
| 3.5 | Replay system | 🔲 | Team | 3.2 |
| 3.6 | Confidence scoring | 🔲 | Team | 3.3 |

**Acceptance:** Full command → run → verify → output cycle.

---

## PHASE 4 — RUNTIME WORKERS

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 4.1 | @iai/runtime-registry | 🔲 | Team | P1 |
| 4.2 | Browser worker | 🔲 | Team | 3.2 |
| 4.3 | Code worker | 🔲 | Team | 3.2 |
| 4.4 | Research worker | 🔲 | Team | 3.2 |
| 4.5 | Content worker | 🔲 | Team | 3.2 |
| 4.6 | Runtime policy engine | 🔲 | Team | 4.1 |

---

## PHASE 5 — MOBILE

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 5.1 | Real mobile deps | 🔲 | Team | — |
| 5.2 | Icon/splash design | 🔲 | Design | — |
| 5.3 | API client | 🔲 | Team | P1–3 |
| 5.4 | Command screen | 🔲 | Team | 5.3 |
| 5.5 | Tasks screen | 🔲 | Team | 5.3 |
| 5.6 | Approval screen | 🔲 | Team | 5.3 |
| 5.7 | Results screen | 🔲 | Team | 5.3 |
| 5.8 | Push notification | 🔲 | Team | 5.3 |

---

## PHASE 6 — ENTERPRISE

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 6.1 | Office shell | 🔲 | Team | P4 |
| 6.2 | Sales shell | 🔲 | Team | P1 |
| 6.3 | Finance shell | 🔲 | Team | P1 |
| 6.4 | Enterprise shell | 🔲 | Team | P1 |
| 6.5 | App map | 🔲 | Team | 6.1–4 |

---

## PHASE 7 — INFRASTRUCTURE

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 7.1 | API server | 🔲 | Team | P2–3 |
| 7.2 | Database schema | 🔲 | Team | P1 |
| 7.3 | Auth system | 🔲 | Team | — |
| 7.4 | Entitlement enforcement | 🔲 | Team | 7.3 |
| 7.5 | Audit logging | 🔲 | Team | 7.1 |
| 7.6 | Approval engine | 🔲 | Team | 7.3 |
| 7.7 | CI/CD pipeline | 🔲 | Team | — |

---

## PHASE 8 — MONETIZATION

| # | Task | Status | Owner | Deps |
|---|------|--------|-------|------|
| 8.1 | Pricing page | 🔲 | Dev | P1 |
| 8.2 | Subscription/billing | 🔲 | Dev | 7.2 |
| 8.3 | Payment gateway | 🔲 | Dev | 7.2 |
| 8.4 | Invoice/email | 🔲 | Dev | 7.2 |
| 8.5 | Usage metering | 🔲 | Dev | P4 |

---

## QUICK REFERENCE

| Phase | Target | Total Tasks | Done |
|-------|-------|:-----------:|:----:|
| 0 — Documentation | Week 0 | 9 | 9 |
| 1 — Product Catalog | Week 1–2 | 8 | 0 |
| 2 — AI Routing | Week 2–4 | 8 | 0 |
| 3 — Workflow Engine | Week 3–5 | 6 | 0 |
| 4 — Runtime Workers | Week 4–6 | 6 | 0 |
| 5 — Mobile | Week 5–7 | 8 | 0 |
| 6 — Enterprise | Week 6–8 | 5 | 0 |
| 7 — Infrastructure | Week 6–9 | 7 | 0 |
| 8 — Monetization | Week 8–10 | 5 | 0 |
| **Total** | | **62** | **9** |

---

*End of Execution Board v2*
