/**
 * Fallback chain — provides fallback when primary lane/model/tools are unavailable.
 */

import type { LaneId } from "./lane.js";
import { getLane, getAllLanes } from "./lane.js";
import type { ModelClass } from "./models.js";
import { getModelClass } from "./models.js";
import type { ToolId } from "./tool-permission.js";
import { getToolsByTier } from "./tool-permission.js";

export interface FallbackResult {
  lane: LaneId;
  model: ModelClass;
  tools: ToolId[];
  reason: string;
}

export function fallbackLane(primaryLane: LaneId): LaneId {
  const fallbackChain: Record<LaneId, LaneId> = {
    basic: "basic",
    research: "content",
    content: "research",
    code: "content",
    business: "research",
    finance: "business",
    sales: "business",
    media: "content",
    data: "code",
  };
  return fallbackChain[primaryLane] || "basic";
}

export function fallbackModel(primaryModel: ModelClass, allowedModels: string[]): ModelClass {
  const fallbackOrder: ModelClass[] = ["fast", "balanced", "analytic", "deep", "code", "creative"];
  const primaryIdx = fallbackOrder.indexOf(primaryModel);
  if (primaryIdx === -1) return "fast";

  // Check if primary is allowed
  if (allowedModels.includes(primaryModel)) return primaryModel;

  // Find first allowed fallback
  for (let i = primaryIdx - 1; i >= 0; i--) {
    if (allowedModels.includes(fallbackOrder[i])) return fallbackOrder[i];
  }
  return "fast";
}

export function fallbackTools(requiredTools: ToolId[], availableTools: ToolId[]): { tools: ToolId[]; missing: ToolId[] } {
  const missing = requiredTools.filter((t) => !availableTools.includes(t));
  const tools = requiredTools.filter((t) => availableTools.includes(t));
  return { tools, missing };
}

export function resolveWithFallback(
  primaryLane: LaneId,
  primaryModel: ModelClass,
  requiredTools: ToolId[],
  productTier: string
): FallbackResult {
  // 1. Try primary lane
  const lane = getLane(primaryLane);
  const model = fallbackModel(primaryModel, lane.allowedModels);
  const availableTools = getToolsByTier(productTier).map((t) => t.id);
  const { tools } = fallbackTools(requiredTools, availableTools);

  if (tools.length > 0) {
    return { lane: primaryLane, model, tools, reason: "Used primary lane with fallback model" };
  }

  // 2. Try fallback lane
  const fbLane = fallbackLane(primaryLane);
  const fbLaneDef = getLane(fbLane);
  const fbModel = fallbackModel(primaryModel, fbLaneDef.allowedModels);
  const fbTools = getToolsByTier(productTier).map((t) => t.id);
  const { tools: fbResolved } = fallbackTools(requiredTools, fbTools);

  if (fbResolved.length > 0) {
    return { lane: fbLane, model: fbModel, tools: fbResolved, reason: `Fell back to ${fbLane} lane` };
  }

  // 3. Last resort: basic lane with no tools
  return {
    lane: "basic",
    model: "fast",
    tools: [],
    reason: "All lanes failed — returning empty result",
  };
}
