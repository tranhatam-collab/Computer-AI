# COMPUTER.IAI.ONE — PRODUCT CATALOG SCHEMA 2026

**Version:** 2026.05.24  
**Status:** Draft  

---

## 1. PRODUCT ID REGISTRY

12 canonical product IDs:

```
free | learn | personal | creator | work | office
sales | business | finance | media | studio | enterprise
```

---

## 2. PRODUCT TYPE DEFINITION (TypeScript)

```typescript
type ProductId =
  | "free" | "learn" | "personal" | "creator"
  | "work" | "office" | "sales" | "business"
  | "finance" | "media" | "studio" | "enterprise";

type Tier = "mass" | "professional" | "enterprise" | "dedicated";

interface ProductDef {
  id: ProductId;
  name: string;
  tier: Tier;
  tagline: { vi: string; en: string };
  description: { vi: string; en: string };
  audience: { vi: string[]; en: string[] };
  highlights: string[];          // feature names (locale-neutral)
  capabilities: string[];        // capability keys for entitlement
  cta: { vi: string; en: string };
  shellRoute: string;            // route within app
  order: number;                 // display order
}
```

---

## 3. PRODUCT SHELL DEFINITION

```typescript
interface ProductShell {
  id: ProductId;
  lanes: LaneId[];               // which lanes this product unlocks
  quota: {                        // per-cycle limits
    runsPerDay: number;
    outputCredits: number;
    storageMb: number;
  };
  approval: {                     // governance
    required: boolean;
    escalatesTo?: "human" | "auto";
  };
  runtime: RuntimeClass[];        // allowed worker types
  pricing: {
    monthly: number | null;       // null = contact sales
    annual: number | null;
    currency: "VND" | "USD";
  };
}
```

---

## 4. ENTITLEMENT SCHEMA

```typescript
type EntitlementKey =
  // Run entitlements
  | "run:create" | "run:parallel" | "run:schedule"
  // Output entitlements
  | "output:export" | "output:packaging" | "output:replay"
  // Lane entitlements
  | "lane:content" | "lane:research" | "lane:code"
  | "lane:business" | "lane:finance" | "lane:sales"
  // Storage entitlements
  | "storage:files" | "storage:media" | "storage:backup"
  // Governance entitlements
  | "governance:auto-approve" | "governance:audit"
  | "governance:custom-policy";

interface EntitlementMap {
  product: ProductId;
  entitlements: EntitlementKey[];
}
```

---

## 5. INITIAL 5 PRODUCTS (P1)

As implemented in current repo:

| Product | Tier | Highlights | Shell Route |
|---------|------|-----------|-------------|
| Free | mass | Command lite, Task lite, Content lite, Research lite | /free |
| Personal | mass | Content, Research, Report, Personal task | /personal |
| Creator | mass | Content Studio, Calendar, Landing, Script, Brand Voice | /creator |
| Business | professional | Proposal, Memo, Report, SOP, Planning, Meeting | /business |
| Studio | professional | Content, Media, Design, Publishing, Batch | /studio |

---

## 6. EXPANDED 12 PRODUCTS (TARGET)

| Product | Tier | Primary Lane |
|---------|------|-------------|
| Free | mass | Onboarding |
| Learn | mass | Education |
| Personal | mass | Individual work |
| Creator | mass | Content |
| Work | professional | Office |
| Office | professional | Document |
| Sales | professional | CRM |
| Business | professional | Operations |
| Finance | enterprise | Accounting |
| Media | enterprise | Publishing |
| Studio | enterprise | Creative |
| Enterprise | dedicated | Full |

---

## 7. PRICING MODEL (TEMPLATE)

```json
{
  "free":  { "monthly": 0,     "annual": 0,     "currency": "USD" },
  "personal": { "monthly": 9,  "annual": 90,    "currency": "USD" },
  "creator": { "monthly": 19,  "annual": 190,   "currency": "USD" },
  "business": { "monthly": 49, "annual": 490,   "currency": "USD" },
  "studio": { "monthly": 79,   "annual": 790,   "currency": "USD" }
}
```

---

*End of Product Catalog Schema*
