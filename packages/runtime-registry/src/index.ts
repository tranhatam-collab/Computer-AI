import { BaseWorker } from "./base.js";
import { BrowserWorker } from "./workers/browser.js";
import { CodeWorker } from "./workers/code.js";
import { ResearchWorker } from "./workers/research.js";
import { ContentWorker } from "./workers/content.js";
import { OfficeWorker } from "./workers/office.js";
import { SalesWorker } from "./workers/sales.js";
import { FinanceWorker } from "./workers/finance.js";
import { EnterpriseWorker } from "./workers/enterprise.js";
import { NlpWorker } from "./workers/nlp.js";
import type { LaneId, RuntimeClass } from "@iai/product-registry";

export type { WorkerTask, WorkerResult } from "./base.js";
export { BaseWorker };
export { BrowserWorker };
export { CodeWorker };
export { ResearchWorker };
export { ContentWorker };
export { OfficeWorker };
export { SalesWorker };
export { FinanceWorker };
export { EnterpriseWorker };
export { NlpWorker };
export { checkConcurrency, acquireSlot, releaseSlot, getTimeoutMs } from "./policy.js";

const ENABLE_RUNTIME_MOCK = process.env.ENABLE_RUNTIME_MOCK === "true";

const browser = new BrowserWorker();
const code = new CodeWorker();
const research = new ResearchWorker();
const content = new ContentWorker();
const office = new OfficeWorker();
const sales = new SalesWorker();
const finance = new FinanceWorker();
const enterprise = new EnterpriseWorker();
const nlp = new NlpWorker();

export interface RuntimeMetadata {
  id: RuntimeClass | "office" | "sales" | "finance" | "enterprise" | "nlp";
  label: string;
  laneIds: LaneId[];
  capabilities: string[];
  limits: {
    maxConcurrentRuns: number;
    timeoutMs: number;
  };
  simulated: boolean;
}

export interface RuntimeEntry {
  metadata: RuntimeMetadata;
  worker: BaseWorker;
}

const registry = {
  browser: {
    metadata: {
      id: "browser",
      label: "Browser runtime",
      laneIds: ["basic"],
      capabilities: browser.allowedTypes,
      limits: { maxConcurrentRuns: 4, timeoutMs: 30000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: browser,
  },
  code: {
    metadata: {
      id: "code",
      label: "Code runtime",
      laneIds: ["code", "data"],
      capabilities: code.allowedTypes,
      limits: { maxConcurrentRuns: 2, timeoutMs: 120000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: code,
  },
  research: {
    metadata: {
      id: "research",
      label: "Research runtime",
      laneIds: ["research"],
      capabilities: research.allowedTypes,
      limits: { maxConcurrentRuns: 3, timeoutMs: 90000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: research,
  },
  content: {
    metadata: {
      id: "content",
      label: "Content runtime",
      laneIds: ["content", "media"],
      capabilities: content.allowedTypes,
      limits: { maxConcurrentRuns: 4, timeoutMs: 60000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: content,
  },
  office: {
    metadata: {
      id: "office",
      label: "Office runtime",
      laneIds: ["business"],
      capabilities: office.allowedTypes,
      limits: { maxConcurrentRuns: 2, timeoutMs: 90000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: office,
  },
  sales: {
    metadata: {
      id: "sales",
      label: "Sales runtime",
      laneIds: ["sales"],
      capabilities: sales.allowedTypes,
      limits: { maxConcurrentRuns: 2, timeoutMs: 90000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: sales,
  },
  finance: {
    metadata: {
      id: "finance",
      label: "Finance runtime",
      laneIds: ["finance"],
      capabilities: finance.allowedTypes,
      limits: { maxConcurrentRuns: 2, timeoutMs: 90000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: finance,
  },
  enterprise: {
    metadata: {
      id: "enterprise",
      label: "Enterprise runtime",
      laneIds: ["enterprise"],
      capabilities: enterprise.allowedTypes,
      limits: { maxConcurrentRuns: 1, timeoutMs: 120000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: enterprise,
  },
  nlp: {
    metadata: {
      id: "nlp",
      label: "NLP runtime",
      laneIds: ["research", "content"],
      capabilities: nlp.allowedTypes,
      limits: { maxConcurrentRuns: 3, timeoutMs: 60000 },
      simulated: ENABLE_RUNTIME_MOCK,
    },
    worker: nlp,
  },
} satisfies Record<string, RuntimeEntry>;

export function getRuntimeEntry(name: string): RuntimeEntry | null {
  const entry = (registry as Record<string, RuntimeEntry>)[name];
  return entry || null;
}

export function getWorker(name: string): BaseWorker | null {
  return getRuntimeEntry(name)?.worker || null;
}

export function getWorkerNames(): string[] {
  return Object.keys(registry);
}

export function getAllWorkers(): BaseWorker[] {
  return Object.values(registry).map((entry) => entry.worker);
}

export function getRuntimeMetadata(): RuntimeMetadata[] {
  return Object.values(registry).map((entry) => entry.metadata);
}

export function getWorkerCapabilities(name: string): string[] {
  return getRuntimeEntry(name)?.metadata.capabilities || [];
}
