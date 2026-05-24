import type { ProductId, EntitlementKey } from "./types.js";
import { getShell } from "./shell.js";

export function getEntitlements(productId: ProductId): EntitlementKey[] {
  const shell = getShell(productId);
  const entitlements: EntitlementKey[] = [];

  // Each lane unlocks specific entitlements
  const laneEntitlements: Record<string, EntitlementKey[]> = {
    basic: ["run:create"],
    research: ["run:create"],
    content: ["run:create", "run:parallel"],
    code: ["run:create", "run:parallel", "output:replay"],
    business: ["run:create", "run:parallel", "run:schedule", "output:export"],
    finance: ["run:create", "run:parallel", "run:schedule", "output:export", "output:packaging"],
    media: ["run:create", "run:parallel", "run:schedule", "output:export", "output:packaging"],
    sales: ["run:create", "run:parallel", "output:export"],
    data: ["run:create", "run:parallel", "run:schedule", "output:export", "storage:backup"],
  };

  for (const lane of shell.lanes) {
    const laneEnts = laneEntitlements[lane];
    if (laneEnts) {
      for (const ent of laneEnts) {
        if (!entitlements.includes(ent)) entitlements.push(ent);
      }
    }
  }

  // Tier-based storage
  const storageEntitlements: Record<string, EntitlementKey[]> = {
    mass: ["storage:files"],
    professional: ["storage:files", "storage:media"],
    enterprise: ["storage:files", "storage:media", "storage:backup"],
    dedicated: ["storage:files", "storage:media", "storage:backup"],
  };

  const { pricing } = shell;
  if (pricing.monthly !== null) {
    const storageEnts = storageEntitlements[shell.id === "enterprise" ? "dedicated" : "mass"];
    for (const ent of storageEnts) {
      if (!entitlements.includes(ent)) entitlements.push(ent);
    }
  }

  // Governance tiers
  if (shell.approval.required && shell.approval.escalatesTo === "auto") {
    entitlements.push("governance:auto-approve");
  }
  if (shell.approval.escalatesTo === "human") {
    entitlements.push("governance:audit");
  }
  if (shell.id === "enterprise" || shell.id === "studio") {
    entitlements.push("governance:custom-policy");
  }

  return entitlements;
}
