export interface CodeWorkerInput { prompt: string; context?: Record<string, unknown>; }
export interface CodeWorkerOutput { ok: boolean; worker: "code"; result: string; }
export async function runCodeWorker(input: CodeWorkerInput): Promise<CodeWorkerOutput> { return { ok: true, worker: "code", result: input.prompt }; }
