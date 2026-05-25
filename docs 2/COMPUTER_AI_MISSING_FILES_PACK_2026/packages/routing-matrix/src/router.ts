import type { ClassifiedIntent, IntentInput } from "./intent";
import type { LaneId } from "./lane";
export interface RouteDecision { laneId: LaneId; modelClass: string; agents: string[]; approvalRequired: boolean; }
export function classifyIntent(input: IntentInput): ClassifiedIntent {
  const text = input.text.toLowerCase();
  if (text.includes("code") || text.includes("repo") || text.includes("github")) return { intent: "coding", risk: "medium", requiresCitations: false, requiresApproval: false };
  if (text.includes("research") || text.includes("source") || text.includes("citation")) return { intent: "research", risk: "medium", requiresCitations: true, requiresApproval: false };
  if (text.includes("delete") || text.includes("payment") || text.includes("send email")) return { intent: "operations", risk: "high", requiresCitations: false, requiresApproval: true };
  return { intent: "chat", risk: "low", requiresCitations: false, requiresApproval: false };
}
export function routeIntent(input: IntentInput): RouteDecision {
  const classified = classifyIntent(input);
  if (classified.intent === "coding") return { laneId: "code_specialist", modelClass: "code", agents: ["coder", "reviewer"], approvalRequired: classified.requiresApproval };
  if (classified.intent === "research") return { laneId: "research_grounded", modelClass: "research", agents: ["researcher", "verifier"], approvalRequired: classified.requiresApproval };
  if (classified.risk === "high") return { laneId: "enterprise_controlled", modelClass: "policy-bound", agents: ["planner", "policy", "reviewer"], approvalRequired: true };
  return { laneId: "low_cost_fast", modelClass: "fast-chat", agents: ["router"], approvalRequired: false };
}
