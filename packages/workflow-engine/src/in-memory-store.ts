import type { RunRecord, RunStore } from "./store.js";

export function createInMemoryRunStore(): RunStore {
  const runs = new Map<string, RunRecord>();

  return {
    create(data) {
      const record: RunRecord = {
        id: data.id,
        state: "created",
        productId: data.productId,
        text: data.text,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        retryCount: 0,
      };
      runs.set(data.id, record);
      return record;
    },

    get(id) {
      return runs.get(id);
    },

    list(productId) {
      const all = Array.from(runs.values());
      if (productId) return all.filter((r) => r.productId === productId);
      return all.sort((a, b) => b.createdAt - a.createdAt);
    },

    update(id, changes) {
      const existing = runs.get(id);
      if (!existing) throw new Error(`Run not found: ${id}`);
      const updated = { ...existing, ...changes, updatedAt: Date.now() };
      runs.set(id, updated);
      return updated;
    },

    delete(id) {
      runs.delete(id);
    },
  };
}
