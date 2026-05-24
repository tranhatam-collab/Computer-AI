import type { ProductId, LaneId, RuntimeClass, EntitlementKey } from "./types.js";

export interface ProductShell {
  id: ProductId;
  lanes: LaneId[];
  quota: { runsPerDay: number; outputCredits: number; storageMb: number };
  approval: { required: boolean; escalatesTo?: "human" | "auto" };
  runtime: RuntimeClass[];
  pricing: { monthly: number | null; annual: number | null; currency: "VND" | "USD" };
}

const shells: Record<ProductId, ProductShell> = {
  free:        { id: "free",      lanes: ["basic"],     quota: { runsPerDay: 10,  outputCredits: 5,    storageMb: 50   }, approval: { required: false },                 runtime: ["browser", "content"],  pricing: { monthly: 0,     annual: 0,     currency: "USD" } },
  learn:       { id: "learn",     lanes: ["basic", "research"], quota: { runsPerDay: 20,  outputCredits: 10,   storageMb: 100  }, approval: { required: false },                 runtime: ["browser", "research", "content"], pricing: { monthly: 0,     annual: 0,     currency: "USD" } },
  personal:    { id: "personal",  lanes: ["research", "content", "business"], quota: { runsPerDay: 50,  outputCredits: 25,   storageMb: 500  }, approval: { required: false },                 runtime: ["browser", "research", "content", "business"], pricing: { monthly: 9,     annual: 90,    currency: "USD" } },
  creator:     { id: "creator",   lanes: ["research", "content", "media"],  quota: { runsPerDay: 100, outputCredits: 50,   storageMb: 1000 }, approval: { required: false },                 runtime: ["browser", "research", "content", "business"], pricing: { monthly: 19,    annual: 190,   currency: "USD" } },
  work:        { id: "work",      lanes: ["research", "content", "business"], quota: { runsPerDay: 100, outputCredits: 50,   storageMb: 1000 }, approval: { required: true, escalatesTo: "auto" }, runtime: ["browser", "research", "content", "business"], pricing: { monthly: 29,    annual: 290,   currency: "USD" } },
  office:      { id: "office",    lanes: ["research", "content", "business", "data"], quota: { runsPerDay: 200, outputCredits: 100,  storageMb: 2000 }, approval: { required: true, escalatesTo: "auto" }, runtime: ["browser", "research", "content", "business"], pricing: { monthly: 49,    annual: 490,   currency: "USD" } },
  sales:       { id: "sales",     lanes: ["research", "business", "sales"],  quota: { runsPerDay: 200, outputCredits: 100,  storageMb: 2000 }, approval: { required: true, escalatesTo: "auto" }, runtime: ["browser", "research", "business"], pricing: { monthly: 49,    annual: 490,   currency: "USD" } },
  business:    { id: "business",  lanes: ["research", "content", "business", "data"], quota: { runsPerDay: 300, outputCredits: 150,  storageMb: 5000 }, approval: { required: true, escalatesTo: "auto" }, runtime: ["browser", "research", "content", "business"], pricing: { monthly: 79,    annual: 790,   currency: "USD" } },
  finance:     { id: "finance",   lanes: ["business", "finance", "data"],    quota: { runsPerDay: 500, outputCredits: 250,  storageMb: 10000 }, approval: { required: true, escalatesTo: "human" }, runtime: ["browser", "research", "business"], pricing: { monthly: 149,   annual: 1490,  currency: "USD" } },
  media:       { id: "media",     lanes: ["research", "content", "media", "data"], quota: { runsPerDay: 500, outputCredits: 250,  storageMb: 20000 }, approval: { required: true, escalatesTo: "auto" }, runtime: ["browser", "research", "content", "business"], pricing: { monthly: 149,   annual: 1490,  currency: "USD" } },
  studio:      { id: "studio",    lanes: ["research", "content", "media", "code", "data"], quota: { runsPerDay: 1000, outputCredits: 500,  storageMb: 50000 }, approval: { required: true, escalatesTo: "auto" }, runtime: ["browser", "research", "content", "code", "business"], pricing: { monthly: 249,   annual: 2490,  currency: "USD" } },
  enterprise:  { id: "enterprise", lanes: ["research", "content", "media", "code", "business", "finance", "sales", "data"], quota: { runsPerDay: 5000, outputCredits: 2500, storageMb: 200000 }, approval: { required: true, escalatesTo: "human" }, runtime: ["browser", "research", "content", "code", "business"], pricing: { monthly: null,  annual: null,  currency: "USD" } },
};

export function getShell(id: ProductId): ProductShell {
  return shells[id];
}

export function getAllShells(): ProductShell[] {
  return Object.values(shells);
}
