import type { ComputerProductId } from "./products";
export interface AppMapEntry { productId: ComputerProductId; route: string; sharedCore: string[]; initialStatus: "shell" | "preview" | "locked"; }
export const appMap: AppMapEntry[] = [
  { productId: "free", route: "/computer/free", sharedCore: ["aiagent"], initialStatus: "shell" },
  { productId: "personal", route: "/computer/personal", sharedCore: ["aiagent", "trust"], initialStatus: "preview" },
  { productId: "developer", route: "/computer/developer", sharedCore: ["aiagent", "flow", "developer"], initialStatus: "preview" },
  { productId: "business", route: "/computer/business", sharedCore: ["aiagent", "flow", "pay", "trust"], initialStatus: "preview" },
  { productId: "enterprise", route: "/computer/enterprise", sharedCore: ["aiagent", "flow", "dash", "trust"], initialStatus: "locked" }
];
