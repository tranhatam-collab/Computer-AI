/**
 * Run controller — uses a pluggable RunStore instead of in-memory Map.
 */

import { transition, isTerminal } from "./states.js";
import type { RunState, RunEvent } from "./states.js";
import type { RouteRequest, RouteResponse } from "@iai/routing-matrix";
import type { RunRecord, RunStore } from "./store.js";

export type { RunRecord, RunStore } from "./store.js";
export { createInMemoryRunStore } from "./in-memory-store.js";

export interface RunOutput {
  body: string;
  format: string;
  confidence: number;
  artifacts: RunArtifact[];
}

export interface RunArtifact {
  id: string;
  type: string;
  title: string;
  url?: string;
  mimeType?: string;
}

let nextId = 1;
let store: RunStore | null = null;

export function useStore(s: RunStore): void {
  store = s;
}

function getStore(): RunStore {
  if (!store) throw new Error("RunStore not set. Call useStore() first.");
  return store;
}

export async function createRun(productId: string, text: string): Promise<RunRecord> {
  const id = `run_${Date.now()}_${nextId++}`;
  return getStore().create({ id, productId, text });
}

export async function getRun(id: string): Promise<RunRecord | undefined> {
  return getStore().get(id);
}

export async function listRuns(productId?: string): Promise<RunRecord[]> {
  return getStore().list(productId);
}

export async function updateRun(id: string, event: RunEvent, data?: Partial<RunRecord>): Promise<RunRecord> {
  const run = await getStore().get(id);
  if (!run) throw new Error(`Run not found: ${id}`);

  const nextState = transition(run.state, event);
  const changes: Partial<RunRecord> = { ...data, state: nextState };

  if (isTerminal(nextState)) {
    changes.completedAt = Date.now();
  }

  return getStore().update(id, changes);
}

export async function deleteRun(id: string): Promise<void> {
  await getStore().delete(id);
}

export async function assignRoute(id: string, route: RouteResponse): Promise<RunRecord> {
  return updateRun(id, "route", { routeResponse: route });
}

export async function setOutput(id: string, output: RunOutput): Promise<RunRecord> {
  return updateRun(id, "complete", { output });
}

export async function setError(id: string, error: string): Promise<RunRecord> {
  return updateRun(id, "fail", { error });
}

export async function retryRun(id: string): Promise<RunRecord> {
  const run = await getStore().get(id);
  if (!run) throw new Error(`Run not found: ${id}`);
  return updateRun(id, "retry", { retryCount: run.retryCount + 1 });
}
