# COMPUTER.IAI.ONE — SHARED CORE INTEGRATION MAP 2026

**Version:** 2026.05.24  
**Status:** Draft  

---

## 1. INTEGRATION OVERVIEW

This document maps how the shared core (`packages/`) connects between web, mobile, API, and workers.

```
                    ┌────────────────────────┐
                    │    @iai/contracts       │
                    │  (types: Product, Nav,  │
                    │   Output, Verification) │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
   ┌────▼────┐          ┌───────▼───────┐        ┌─────▼─────┐
   │ Web App │          │ Mobile App   │        │ API Layer │
   │ (fetch) │          │ (fetch)      │        │ (serve)   │
   └────┬────┘          └───────┬───────┘        └─────┬─────┘
        │                       │                       │
   ┌────▼───────────────────────▼───────────────────────▼─────┐
   │              @iai/product-registry                        │
   │  (12 products, shells, entitlements, pricing)            │
   └────────────────────────┬─────────────────────────────────┘
                            │
   ┌────────────────────────▼─────────────────────────────────┐
   │              @iai/routing-matrix                           │
   │  (Intent → Lane → Model → Tool → Overload → Fallback)    │
   └────────────────────────┬─────────────────────────────────┘
                            │
   ┌────────────────────────▼─────────────────────────────────┐
   │              @iai/workflow-engine                          │
   │  (Run → Verify → Output → Replay → Score)                │
   └────────────────────────┬─────────────────────────────────┘
                            │
   ┌────────────────────────▼─────────────────────────────────┐
   │              @iai/runtime-registry                         │
   │  (Browser · Code · Research · Content · Business)        │
   └────────────────────────┬─────────────────────────────────┘
                            │
                    ┌───────▼───────┐
                    │  Workers/     │
                    │  Cloudflare   │
                    │  Workers      │
                    └───────────────┘
```

---

## 2. PACKAGE DEPENDENCY MAP

```
@iai/contracts         (no deps — pure types)
@iai/product-registry  → @iai/contracts
@iai/routing-matrix    → @iai/contracts, @iai/product-registry
@iai/workflow-engine   → @iai/contracts, @iai/routing-matrix
@iai/runtime-registry  → @iai/contracts, @iai/product-registry
```

```
apps/web   → @iai/contracts, @iai/product-registry
apps/mobile → @iai/contracts, @iai/product-registry (future)
apps/api   → @iai/contracts, @iai/product-registry,
             @iai/routing-matrix, @iai/workflow-engine,
             @iai/runtime-registry
workers/*  → @iai/contracts, @iai/runtime-registry
```

---

## 3. DATA FLOW (COMMAND LIFECYCLE)

```
User (Web/Mobile)
  │
  │  POST /api/command { intent, productId, payload }
  ▼
API Layer
  │
  ├─ 1. Auth + Entitlement Check
  │     @iai/product-registry → entitlement SDK
  │
  ├─ 2. Intent Resolution
  │     @iai/routing-matrix → lane, model, tools
  │
  ├─ 3. Run Creation
  │     @iai/workflow-engine → run ID, state machine start
  │
  ├─ 4. Worker Dispatch
  │     @iai/runtime-registry → select worker by lane
  │
  ├─ 5. Execution
  │     Worker (Browser/Code/Research/Content/...)
  │
  ├─ 6. Verification
  │     @iai/workflow-engine → auto verify, score
  │
  ├─ 7. Output Packaging
  │     @iai/workflow-engine → output artifact
  │
  └─ 8. Delivery
        User notification (web push / mobile notification)
```

---

## 4. SHARED CONTRACTS (Current)

Currently implemented in `packages/contracts/src/`:

| File | Contents | Used By |
|------|----------|---------|
| `product.ts` | ProductId (12), ProductCard | apps/web |
| `content.ts` | NavLink, HeroContent | apps/web (Header, Hero) |
| `output.ts` | VerificationState, OutputArtifact | (not yet used) |

---

## 5. INTEGRATION POINTS (Target)

### 5.1 Web → Registry

```
apps/web/src/lib/products.ts  →  @iai/product-registry
apps/web/src/data/vi.ts       →  @iai/product-registry (locale copy)
apps/web/src/data/en.ts       →  @iai/product-registry (locale copy)
```

### 5.2 Mobile → Registry

```
apps/mobile/src/products.ts   →  @iai/product-registry
apps/mobile/App.tsx            →  @iai/product-registry (shell selector)
```

### 5.3 API → All Packages

```
apps/api/src/routes/command.ts    →  @iai/routing-matrix
apps/api/src/routes/run.ts        →  @iai/workflow-engine
apps/api/src/routes/entitlement   →  @iai/product-registry
apps/api/src/routes/auth          →  @iai/auth-sdk (future)
```

---

## 6. CURRENT STATE TABLE

| Package | Status | Web | Mobile | API | Workers |
|---------|--------|-----|--------|-----|---------|
| @iai/contracts | ✅ EXISTS | ✅ linked | ❌ | ❌ | ❌ |
| @iai/product-registry | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |
| @iai/routing-matrix | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |
| @iai/workflow-engine | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |
| @iai/runtime-registry | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |
| @iai/auth-sdk | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |
| @iai/entitlement-sdk | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |
| @iai/audit-sdk | 🔲 PENDING | ❌ | ❌ | ❌ | ❌ |

---

*End of Shared Core Integration Map*
