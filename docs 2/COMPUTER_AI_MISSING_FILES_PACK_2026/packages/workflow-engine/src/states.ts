export type RunState = "created" | "classified" | "planned" | "routing" | "running" | "waiting_for_approval" | "tool_executing" | "reviewing" | "evaluating" | "completed" | "failed" | "cancelled" | "blocked_by_policy";
export const terminalRunStates: RunState[] = ["completed", "failed", "cancelled", "blocked_by_policy"];
export function isTerminalRunState(state: RunState): boolean { return terminalRunStates.includes(state); }
