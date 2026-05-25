export interface OverloadPolicy { planId: string; maxConcurrentRuns: number; maxDailyRuns: number; maxEstimatedUsdPerDay: number; }
export const overloadPolicies: OverloadPolicy[] = [
  { planId: "free", maxConcurrentRuns: 1, maxDailyRuns: 20, maxEstimatedUsdPerDay: 0.25 },
  { planId: "starter", maxConcurrentRuns: 2, maxDailyRuns: 100, maxEstimatedUsdPerDay: 2 },
  { planId: "pro", maxConcurrentRuns: 4, maxDailyRuns: 250, maxEstimatedUsdPerDay: 10 },
  { planId: "builder", maxConcurrentRuns: 6, maxDailyRuns: 300, maxEstimatedUsdPerDay: 30 },
  { planId: "business", maxConcurrentRuns: 12, maxDailyRuns: 800, maxEstimatedUsdPerDay: 100 },
  { planId: "enterprise", maxConcurrentRuns: 50, maxDailyRuns: 5000, maxEstimatedUsdPerDay: 1000 }
];
