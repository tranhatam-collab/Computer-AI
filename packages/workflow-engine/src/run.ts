/**
 * Run controller — creates and manages runs through their lifecycle.
 */

import { transition, canTransition, isTerminal } from "./states.js";
import type { RunState, RunEvent } from "./states.js";
import type { RouteRequest, RouteResponse } from "@iai/routing-matrix";

export interface Run {
  id: string;
  state: RunState;
  productId: string;
  text: string;
  routeResponse?: RouteResponse;
  output?: RunOutput;
  error?: string;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  retryCount: number;
}

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

const runs = new Map<string, Run>();

let nextId = 1;

export function createRun(productId: string, text: string): Run {
  const id = `run_${Date.now()}_${nextId++}`;
  const run: Run = {
    id,
    state: "created",
    productId,
    text,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    retryCount: 0,
  };
  runs.set(id, run);
  return run;
}

export function getRun(id: string): Run | undefined {
  return runs.get(id);
}

export function listRuns(productId?: string): Run[] {
  const all = Array.from(runs.values());
  if (productId) return all.filter((r) => r.productId === productId);
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export function updateRun(id: string, event: RunEvent, data?: Partial<Run>): Run {
  const run = runs.get(id);
  if (!run) throw new Error(`Run not found: ${id}`);

  const nextState = transition(run.state, event);
  const updated: Run = {
    ...run,
    ...data,
    state: nextState,
    updatedAt: Date.now(),
  };

  if (isTerminal(nextState)) {
    updated.completedAt = Date.now();
  }

  runs.set(id, updated);
  return updated;
}

export function deleteRun(id: string): void {
  runs.delete(id);
}

export function assignRoute(id: string, route: RouteResponse): Run {
  return updateRun(id, "route", { routeResponse: route });
}

export function setOutput(id: string, output: RunOutput): Run {
  return updateRun(id, "complete", { output });
}

export function setError(id: string, error: string): Run {
  return updateRun(id, "fail", { error });
}

export function retryRun(id: string): Run {
  const run = runs.get(id);
  if (!run) throw new Error(`Run not found: ${id}`);
  return updateRun(id, "retry", { retryCount: run.retryCount + 1 });
}
