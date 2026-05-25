export interface ContentWorkerInput { prompt: string; context?: Record<string, unknown>; }
export interface ContentWorkerOutput { ok: boolean; worker: "content"; result: string; }
export async function runContentWorker(input: ContentWorkerInput): Promise<ContentWorkerOutput> { return { ok: true, worker: "content", result: input.prompt }; }
