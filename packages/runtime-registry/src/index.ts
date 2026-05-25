import { BaseWorker } from "./base.js";
import { BrowserWorker } from "./workers/browser.js";
import { CodeWorker } from "./workers/code.js";
import { ResearchWorker } from "./workers/research.js";
import { ContentWorker } from "./workers/content.js";
import { OfficeWorker } from "./workers/office.js";

export type { WorkerTask, WorkerResult } from "./base.js";
export { BaseWorker };
export { BrowserWorker };
export { CodeWorker };
export { ResearchWorker };
export { ContentWorker };
export { OfficeWorker };
export { checkConcurrency, acquireSlot, releaseSlot, getTimeoutMs } from "./policy.js";

const browser = new BrowserWorker();
const code = new CodeWorker();
const research = new ResearchWorker();
const content = new ContentWorker();
const office = new OfficeWorker();

const registry = { browser, code, research, content, office };

export function getWorker(name: string): BaseWorker | null {
  const entry = (registry as Record<string, BaseWorker>)[name];
  return entry || null;
}

export function getWorkerNames(): string[] {
  return Object.keys(registry);
}

export function getAllWorkers(): BaseWorker[] {
  return Object.values(registry);
}
