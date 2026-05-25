export type LaneId = "low_cost_fast" | "premium_reasoning" | "code_specialist" | "research_grounded" | "document_long_context" | "creative_generation" | "business_operator" | "enterprise_controlled";
export interface RoutingLane { id: LaneId; label: string; allowedPlans: string[]; defaultModelClass: string; maxAgents: number; }
export const routingLanes: RoutingLane[] = [
  { id: "low_cost_fast", label: "Low cost fast lane", allowedPlans: ["free", "starter", "pro", "builder", "business", "enterprise"], defaultModelClass: "fast-chat", maxAgents: 1 },
  { id: "premium_reasoning", label: "Premium reasoning lane", allowedPlans: ["pro", "builder", "business", "enterprise"], defaultModelClass: "reasoning", maxAgents: 3 },
  { id: "code_specialist", label: "Code specialist lane", allowedPlans: ["builder", "business", "enterprise"], defaultModelClass: "code", maxAgents: 4 },
  { id: "research_grounded", label: "Grounded research lane", allowedPlans: ["pro", "builder", "business", "enterprise"], defaultModelClass: "research", maxAgents: 3 },
  { id: "enterprise_controlled", label: "Enterprise controlled lane", allowedPlans: ["enterprise"], defaultModelClass: "policy-bound", maxAgents: 8 }
];
