export type RuntimeWorkerId = "browser" | "code" | "research" | "content" | "office";
export interface RuntimeWorkerDefinition { id: RuntimeWorkerId; label: string; permissionLevel: "read_only" | "generate_only" | "external_write"; enabled: boolean; }
export const runtimeWorkers: RuntimeWorkerDefinition[] = [
  { id: "browser", label: "Browser Worker", permissionLevel: "read_only", enabled: false },
  { id: "code", label: "Code Worker", permissionLevel: "generate_only", enabled: true },
  { id: "research", label: "Research Worker", permissionLevel: "read_only", enabled: true },
  { id: "content", label: "Content Worker", permissionLevel: "generate_only", enabled: true },
  { id: "office", label: "Office Worker", permissionLevel: "generate_only", enabled: false }
];
