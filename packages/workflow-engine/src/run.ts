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

export function createRun(productId: string, text: string): RunRecord {
  const id = `run_${Date.now()}_${nextId++}`;
  return getStore().create({ id, productId, text });
}

export function getRun(id: string): RunRecord | undefined {
  return getStore().get(id);
}

export function listRuns(productId?: string): RunRecord[] {
  return getStore().list(productId);
}

export function updateRun(id: string, event: RunEvent, data?: Partial<RunRecord>): RunRecord {
  const run = getStore().get(id);
  if (!run) throw new Error(`Run not found: ${id}`);

  const nextState = transition(run.state, event);
  const changes: Partial<RunRecord> = { ...data, state: nextState };

  if (isTerminal(nextState)) {
    changes.completedAt = Date.now();
  }

  return getStore().update(id, changes);
}

export function deleteRun(id: string): void {
  getStore().delete(id);
}

export function assignRoute(id: string, route: RouteResponse): RunRecord {
  return updateRun(id, "route", { routeResponse: route });
}

export function setOutput(id: string, output: RunOutput): RunRecord {
  return updateRun(id, "complete", { output });
}

export function setError(id: string, error: string): RunRecord {
  return updateRun(id, "fail", { error });
}

export function retryRun(id: string): RunRecord {
  const run = getStore().get(id);
  if (!run) throw new Error(`Run not found: ${id}`);
  return updateRun(id, "retry", { retryCount: run.retryCount + 1 });
}
