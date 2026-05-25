export interface OfficeWorkerInput { prompt: string; context?: Record<string, unknown>; }
export interface OfficeWorkerOutput { ok: boolean; worker: "office"; result: string; }
export async function runOfficeWorker(input: OfficeWorkerInput): Promise<OfficeWorkerOutput> { return { ok: true, worker: "office", result: input.prompt }; }
