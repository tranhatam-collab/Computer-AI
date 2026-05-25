export interface PlanPrice { planId: string; label: string; monthlyUsd: number | null; billingMode: "free" | "self-serve" | "manual"; }
export const planPrices: PlanPrice[] = [
  { planId: "free", label: "Free", monthlyUsd: 0, billingMode: "free" },
  { planId: "starter", label: "Starter", monthlyUsd: 9, billingMode: "self-serve" },
  { planId: "pro", label: "Pro", monthlyUsd: 29, billingMode: "self-serve" },
  { planId: "builder", label: "Builder", monthlyUsd: 79, billingMode: "self-serve" },
  { planId: "business", label: "Business", monthlyUsd: 199, billingMode: "manual" },
  { planId: "enterprise", label: "Enterprise", monthlyUsd: null, billingMode: "manual" }
];
