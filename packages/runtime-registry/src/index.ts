export type { WorkerTask, WorkerResult } from "./base.js";
export { BaseWorker } from "./base.js";
export { BrowserWorker } from "./workers/browser.js";
export { CodeWorker } from "./workers/code.js";
export { ResearchWorker } from "./workers/research.js";
export { ContentWorker } from "./workers/content.js";
import { OfficeWorker } from "./workers/office.js";
export { checkConcurrency, acquireSlot, releaseSlot, getTimeoutMs } from "./policy.js";

const registry = {
  browser: new BrowserWorker(),
  code: new CodeWorker(),
  research: new ResearchWorker(),
  content: new ContentWorker(),
  office: new OfficeWorker(),
};

export function getWorker(name: string) {
  return (registry as Record<string, typeof registry.browser>)[name] || null;
}

export function getWorkerNames(): string[] {
  return Object.keys(registry);
}

export function getAllWorkers() {
  return Object.values(registry);
}
