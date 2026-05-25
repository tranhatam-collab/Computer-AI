export interface ResearchWorkerInput { prompt: string; context?: Record<string, unknown>; }
export interface ResearchWorkerOutput { ok: boolean; worker: "research"; result: string; }
export async function runResearchWorker(input: ResearchWorkerInput): Promise<ResearchWorkerOutput> { return { ok: true, worker: "research", result: input.prompt }; }
