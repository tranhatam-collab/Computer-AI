import type { RunState, RunEvent } from "./states.js";

export interface RunRecord {
  id: string;
  state: RunState;
  productId: string;
  text: string;
  routeResponse?: unknown;
  output?: unknown;
  error?: string;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  retryCount: number;
}

export interface RunStore {
  create(data: {
    id: string;
    productId: string;
    text: string;
  }): RunRecord;
  get(id: string): RunRecord | undefined;
  list(productId?: string): RunRecord[];
  update(id: string, changes: Partial<RunRecord>): RunRecord;
  delete(id: string): void;
}
