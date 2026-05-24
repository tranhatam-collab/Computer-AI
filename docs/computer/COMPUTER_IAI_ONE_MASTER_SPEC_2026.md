# COMPUTER.IAI.ONE — MASTER SPEC 2026

**Version:** 2026.05.24  
**Author:** Audit team  
**Status:** Draft  
**Based on:** Repo audit (docs/computer/COMPUTER_AI_REPO_TREE_AUDIT_2026.md)

---

## 1. SYSTEM IDENTITY

computer.iai.one is a **catalog of prebuilt AI computers sold as packages.**

| Attribute | Value |
|-----------|-------|
| Category | AI product platform |
| Model | Catalog + Shell + Runtime |
| Audience | Individual → Enterprise |
| Pricing | Per-package, tier-based |
| Core philosophy | Người dùng không tự lắp máy tính AI. Họ chọn đúng gói và làm việc. |

---

## 2. ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────┐
│                    COMPUTER.IAI.ONE                   │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │   Web App   │  │ Mobile App  │  │  API Layer   │  │
│  │  (catalog)  │  │ (command)   │  │ (control)    │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘  │
│         │               │               │           │
│  ┌──────┴───────────────┴───────────────┴───────┐   │
│  │            Product Registry                   │   │
│  │  (12 shells × entitlements × pricing)         │   │
│  └──────────────────────┬───────────────────────┘   │
│                         │                           │
│  ┌──────────────────────┴───────────────────────┐   │
│  │              Routing Matrix                   │   │
│  │  (Intent → Lane → Model → Tool → Dispatch)   │   │
│  └──────────────────────┬───────────────────────┘   │
│                         │                           │
│  ┌──────────────────────┴───────────────────────┐   │
│  │              Workflow Engine                  │   │
│  │  (Run → Verify → Output → Replay)            │   │
│  └──────────────────────┬───────────────────────┘   │
│                         │                           │
│  ┌──────────────────────┴───────────────────────┐   │
│  │           Runtime Registry                    │   │
│  │  (Browser · Code · Research · Content · ...) │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 3. LAYER DEFINITIONS

### 3.1 Presentation Layer

| Component | Technology | Responsible |
|-----------|-----------|-------------|
| Web catalog | Vite + React + TS | apps/web |
| Mobile command | Expo + RN + TS | apps/mobile |
| Shell routing | ProductRegistry client | apps/web/src/lib |

### 3.2 Product Layer

| Component | Technology | Responsible |
|-----------|-----------|-------------|
| Product Registry | package | packages/product-registry |
| Entitlement Schema | JSON Schema | packages/product-registry |
| Pricing Tables | JSON | packages/product-registry |
| Shell Definitions | TS types | packages/product-registry |

### 3.3 AI Routing Layer

| Component | Technology | Responsible |
|-----------|-----------|-------------|
| Intent Matrix | JSON + TS | packages/routing-matrix |
| Lane Router | TS engine | packages/routing-matrix |
| Model Selector | TS engine | packages/routing-matrix |
| Tool Permission | Policy file | packages/routing-matrix |
| Overload Guard | TS engine | packages/routing-matrix |

### 3.4 Workflow Layer

| Component | Technology | Responsible |
|-----------|-----------|-------------|
| Run State Machine | TS (XState) | packages/workflow-engine |
| Verification Engine | TS | packages/workflow-engine |
| Output Packager | TS | packages/workflow-engine |
| Replay System | TS | packages/workflow-engine |
| Confidence Scorer | TS | packages/workflow-engine |

### 3.5 Runtime Layer

| Component | Technology | Responsible |
|-----------|-----------|-------------|
| Browser Worker | Cloudflare Worker | workers/ |
| Code Worker | Isolate runtime | workers/ |
| Research Worker | Browser + scrape | workers/ |
| Content Worker | LLM pipeline | workers/ |
| Business Worker | Structured output | workers/ |

---

## 4. CORE PRINCIPLES

1. **Product-first, not tool-first** — every package is a distinct computer
2. **Shell isolation** — user sees only their product shell
3. **Routing before execution** — intent decides lane before runtime
4. **Verification gates** — no unchecked output delivered
5. **Mobile is not mini-web** — mobile is command center, web is storefront
6. **Everything auditable** — every run, approval, and output logged

---

## 5. CURRENT STATE vs MASTER SPEC

| Layer | Current | Target | Action |
|-------|---------|--------|--------|
| Presentation | ✅ Web app operational | Full catalog + shell routing | Extend |
| Presentation | ⚠️ Mobile starter | Command center | Build |
| Product | ❌ None | Product Registry | Create |
| AI Routing | ❌ None | Routing Matrix | Create |
| Workflow | ❌ None | Workflow Engine | Create |
| Runtime | ❌ None | Worker Registry | Create |
| Security | ❌ None | Auth + Audit | Create |

---

*End of Master Spec*
