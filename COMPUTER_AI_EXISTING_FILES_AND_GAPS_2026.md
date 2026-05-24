# COMPUTER AI — EXISTING FILES & GAPS 2026

**Date:** 2026-05-24  
**Based on:** Full repo tree audit (file #1)

---

## 1. WHAT EXISTS (VERIFIED)

### 1.1 Foundation Layer — ✅ EXISTS

| Component | Files | Status |
|-----------|-------|--------|
| Monorepo workspace | `pnpm-workspace.yaml`, `package.json` | ✅ |
| Git + remote | `.git/`, `origin → Computer-AI.git` | ✅ |
| Build tooling | Vite 5.4 + pnpm 9.15 | ✅ |
| Deploy pipeline | gh-pages branch, GitHub Pages | ✅ |
| TypeScript | Web + Mobile + Contracts | ✅ |

### 1.2 Web Frontend — ✅ EXISTS

| Component | Evidence | Status |
|-----------|----------|--------|
| Homepage | `apps/web/index.html` + `src/App.tsx` | ✅ |
| 5 products | `src/lib/products.ts` (Free, Personal, Creator, Business, Studio) | ✅ |
| Bilingual (VI/EN) | `src/data/vi.ts`, `src/data/en.ts` | ✅ |
| SEO meta | OG, Twitter, canonical, sitemap, robots | ✅ |
| Dark theme | `styles.css` — custom properties, responsive | ✅ |
| Locale toggle | All 6 components pass `locale` prop | ✅ |

### 1.3 Mobile Shell — ✅ EXISTS (STARTER)

| Component | Evidence | Status |
|-----------|----------|--------|
| Expo app | `apps/mobile/App.tsx`, `app.json` | ✅ |
| Bilingual (VI/EN) | `src/data/vi.ts`, `src/data/en.ts` | ✅ |
| Product shells | `src/products.ts` (5 shells) | ✅ |
| TypeScript | `tsconfig.json` — passes `tsc --noEmit` | ✅ |

### 1.4 Contracts — ✅ EXISTS (BASIC)

| Component | Evidence | Status |
|-----------|----------|--------|
| Product types | `src/product.ts` — ProductId, ProductCard | ✅ |
| Content types | `src/content.ts` — NavLink, HeroContent | ✅ |
| Output types | `src/output.ts` — VerificationState, OutputArtifact | ✅ |
| Barrel export | `src/index.ts` | ✅ |
| Connected to web | `apps/web/package.json` → `@iai/contracts: workspace:*` | ✅ |

---

## 2. WHAT IS PLACEHOLDER (NEEDS REPLACEMENT)

| Component | File | Problem | Priority |
|-----------|------|---------|----------|
| Mobile icons | `assets/*.png` | 1×1 pixel placeholder | Medium |
| Sitemap | `public/sitemap.xml` | Only 4 hash URLs, no real pages | Low |
| Project description | `package.json` | Version 0.1.0, minimal description | Low |

---

## 3. WHAT IS EMPTY (UNUSED)

| Path | Current content | Action |
|------|----------------|--------|
| `content/` | empty | Remove or populate |
| `logs/` | empty | Remove or use |
| `scripts/` | empty | Remove or populate |
| `tools/` | empty | Remove or populate |

---

## 4. WHAT IS MISSING (GAPS)

### 4.1 GAP A — Product Catalog System

**What's needed vs what exists:**

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Product registry | 12 products | 5 products in static array | ❌ Missing 7 |
| Shell routing | Route to product-specific shell | Single web app shell | ❌ |
| Compare matrix | Structured comparison data | Static CompareStrip | ❌ |
| Pricing data | Per-product pricing | None | ❌ |
| Entitlements | Per-product capabilities | None | ❌ |
| Onboarding flow | Multi-step per product | None | ❌ |

### 4.2 GAP B — AI Routing Matrix

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Intent → lane mapping | 10+ intents | None | ❌ |
| Lane routing engine | Per-lane dispatch | None | ❌ |
| Model class selection | Per-task class mapping | None | ❌ |
| Tool permission matrix | Tool access per product | None | ❌ |
| Overload protection | Cost/quota control | None | ❌ |
| Fallback chain | Model/lane fallback | None | ❌ |

### 4.3 GAP C — Workflow / Result Loop

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Command → run flow | End-to-end | None | ❌ |
| Run state machine | pending→running→verifying→delivered | None | ❌ |
| Verification layer | Auto + manual verification | None | ❌ |
| Replay | Re-run with same context | None | ❌ |
| Confidence scoring | Numerical quality score | None | ❌ |
| Output packaging | Structured output artifacts | `OutputArtifact` type only | ❌ |

### 4.4 GAP D — Runtime / AI Computer Layer

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Runtime registry | Per-product runtimes | None | ❌ |
| Browser worker | AI agent runtime | None | ❌ |
| Code worker | Code execution runtime | None | ❌ |
| Research worker | Web research runtime | None | ❌ |
| Content worker | Content generation runtime | None | ❌ |
| Runtime policy | Quota, isolation, lifecycle | None | ❌ |

### 4.5 GAP E — Office / Enterprise Lanes

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Office shell | Document + spreadsheet + presentation | None | ❌ |
| Enterprise shell | Team runs, governance, audit | None | ❌ |
| Finance shell | Receipts, reconciliation, reporting | None | ❌ |
| Sales shell | Leads, outreach, pipeline | None | ❌ |
| App map per lane | 100+ app map | None | ❌ |

### 4.6 GAP F — Security / Governance

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Authentication | Login / SSO / OAuth | None | ❌ |
| Authorization | Role-based access | None | ❌ |
| Entitlement enforcement | Gate by purchase | None | ❌ |
| Approval state machine | Multi-step approval flows | None | ❌ |
| Audit logging | Immutable event log | None | ❌ |
| Risky action policy | Escalate dangerous commands | None | ❌ |

### 4.7 GAP G — Mobile (Real)

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| Device build | iOS + Android binary | None | ❌ |
| API connectivity | Real API calls | None | ❌ |
| Entitlement sync | Sync with backend | None | ❌ |
| Push notifications | Real-time updates | None | ❌ |
| Offline mode | Cached shells | None | ❌ |

### 4.8 GAP H — Infrastructure

| Feature | Needed | Exists | Delta |
|---------|--------|--------|-------|
| API server | REST/GraphQL backend | None | ❌ |
| Database | User, product, run, entitlement tables | None | ❌ |
| File storage | Media, output, artifact storage | None | ❌ |
| Queue system | Async task processing | None | ❌ |
| Monitoring | Logs, metrics, alerts | None | ❌ |
| CI/CD | Automated deploy + test | Manual gh-pages push only | ❌ |

---

## 5. WHAT TO KEEP VS REMOVE VS REWRITE

### Keep (proven working)

| File | Reason |
|------|--------|
| `apps/web/` entire | ✅ Working frontend, correct deploy |
| `packages/contracts/` | ✅ Type foundation, extendable |
| `pnpm-workspace.yaml` | ✅ Correct workspace structure |
| `package.json` (root) | ✅ Correct monorepo scripts |

### Rewrite / Extend

| File | Action |
|------|--------|
| `apps/web/src/data/vi.ts` | Extend with product registry, shell data |
| `apps/web/src/data/en.ts` | Extend in parallel |
| `apps/web/src/lib/products.ts` | Replace with product registry import |
| `apps/web/src/components/ProductGrid.tsx` | Add shell routing links |
| `apps/web/src/components/CompareStrip.tsx` | Make data-driven from registry |

### Remove (placeholder / empty)

| Path | Action |
|------|--------|
| `content/` | Remove (empty) |
| `logs/` | Remove (empty) |
| `scripts/` | Keep empty for future |
| `tools/` | Keep empty for future |

### New files needed (priority order)

| Layer | New files |
|-------|-----------|
| Product | `packages/product-registry/`, `apps/web/src/data/products.json` |
| AI Routing | `packages/routing-matrix/` — types, maps, resolvers |
| Workflow | `packages/workflow-engine/` — graph, states, runner |
| Runtime | `packages/runtime-registry/` — worker stubs |
| API | `apps/control-api/` — basic REST layer |
| Security | `packages/auth-sdk/`, `packages/entitlement-sdk/` |

---

## 6. SUMMARY

| Layer | Current | Target | Gap % |
|-------|---------|--------|-------|
| Foundation | ✅ Monorepo + Git + Deploy | ✅ Same | 0% |
| Frontend (Web) | ✅ 5-product catalog + bilingual | ✅ Full catalog | 20% |
| Mobile | ⚠️ Starter shell | 📱 Real command center | 85% |
| Contracts | ✅ Types only | 📋 Runtime SDKs | 70% |
| Product System | ❌ Static data | 🔧 Registry + Shell + Pricing | 95% |
| AI Routing | ❌ None | 🤖 Matrix + Engine | 100% |
| Workflow/Result | ❌ None | 🔄 Run loop + Verify | 100% |
| Runtime/Workers | ❌ None | ⚡ Worker classes | 100% |
| Security | ❌ None | 🛡️ Auth + Audit + Policy | 100% |
| Infrastructure | ❌ None | ☁️ API + DB + Queue | 100% |

**Overall readiness:** ~25% toward `computer.iai.one` production system.

---

*End of audit #2 — Existing Files & Gaps*
