import type { RunState } from "./states";
export interface ComputerRun { id: string; productId: string; userId: string; workspaceId?: string; state: RunState; input: string; createdAt: string; updatedAt: string; }
export function createRun(input: Omit<ComputerRun, "id" | "state" | "createdAt" | "updatedAt">): ComputerRun { const now = new Date().toISOString(); return { ...input, id: `run_${crypto.randomUUID()}`, state: "created", createdAt: now, updatedAt: now }; }
export function transitionRun(run: ComputerRun, nextState: RunState): ComputerRun { return { ...run, state: nextState, updatedAt: new Date().toISOString() }; }
