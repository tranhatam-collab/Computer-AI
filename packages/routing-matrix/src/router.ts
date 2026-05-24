/**
 * Router engine — resolves intent → lane → model → tools → overload.
 *
 * Main entry point for the AI routing matrix.
 */

import type { ProductId } from "@iai/product-registry";
import { getEntitlements } from "@iai/product-registry";
import { intents, detectIntent } from "./intent.js";
import type { IntentId } from "./intent.js";
import { getLane } from "./lane.js";
import type { LaneId } from "./lane.js";
import { getModelClass } from "./models.js";
import type { ModelClass } from "./models.js";
import { getToolsByTier } from "./tool-permission.js";
import type { ToolId } from "./tool-permission.js";
import { checkQuota, checkRateLimit } from "./overload.js";
import type { QuotaState, QuotaLimits, OverloadResult } from "./overload.js";

export interface RouteRequest {
  text: string;
  productId: ProductId;
  quotaState: QuotaState;
  quotaLimits: QuotaLimits;
  sessionKey: string;
}

export interface RouteResponse {
  intent: IntentId | null;
  lane: LaneId;
  model: ModelClass;
  tools: ToolId[];
  overload: OverloadResult;
  confidence: number;
}

export function route(req: RouteRequest): RouteResponse {
  // 1. Detect intent
  const detected = detectIntent(req.text);
  const intentId = detected?.intent.id || null;
  const confidence = detected?.confidence || 0.3;
  const intentDef = detected?.intent || intents[0];

  // 2. Resolve lane (from intent or fallback to basic)
  const laneId = (intentDef.defaultLane || "basic") as LaneId;
  const lane = getLane(laneId);

  // 3. Select model class (prefer lane default, fallback to fast)
  const modelId = (lane.defaultModel || "fast") as ModelClass;

  // 4. Check product entitlements
  const entitlements = getEntitlements(req.productId);
  const productTier = getProductTier(req.productId);

  // 5. Resolve allowed tools
  const allTools = getToolsByTier(productTier);
  const tools = allTools.filter((t) => {
    // Only include tools that the intent requires
    return intentDef.requiresTools.length === 0 || intentDef.requiresTools.includes(t.id);
  });

  // 6. Check overload
  const overload = checkQuota(req.productId, req.quotaState, req.quotaLimits);
  const rateLimit = checkRateLimit(req.sessionKey, 60);

  return {
    intent: intentId,
    lane: laneId,
    model: modelId,
    tools: tools.map((t) => t.id),
    overload: overload.allowed ? rateLimit : overload,
    confidence,
  };
}

function getProductTier(id: ProductId): string {
  const tierMap: Record<string, string> = {
    free: "mass", learn: "mass", personal: "mass", creator: "mass",
    work: "professional", office: "professional", sales: "professional", business: "professional",
    finance: "enterprise", media: "enterprise", studio: "enterprise",
    enterprise: "dedicated",
  };
  return tierMap[id] || "mass";
}
