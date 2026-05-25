export interface BrowserWorkerInput { prompt: string; context?: Record<string, unknown>; }
export interface BrowserWorkerOutput { ok: boolean; worker: "browser"; result: string; }
export async function runBrowserWorker(input: BrowserWorkerInput): Promise<BrowserWorkerOutput> { return { ok: true, worker: "browser", result: input.prompt }; }
