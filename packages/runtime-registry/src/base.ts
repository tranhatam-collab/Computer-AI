export interface WorkerTask {
  id: string;
  type: string;
  input: string;
  options?: Record<string, unknown>;
}

export interface WorkerResult {
  success: boolean;
  output: string;
  format: string;
  metadata: {
    durationMs: number;
    tokenCount?: number;
    sourceCount?: number;
    errorCount?: number;
  };
  artifacts?: { name: string; content: string; mimeType: string }[];
}

export abstract class BaseWorker {
  abstract name: string;
  abstract allowedTypes: string[];

  async execute(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();
    if (!this.allowedTypes.includes(task.type)) {
      return { success: false, output: `Unsupported task type: ${task.type}`, format: "text", metadata: { durationMs: Date.now() - start } };
    }
    return this.run(task);
  }

  protected abstract run(task: WorkerTask): Promise<WorkerResult>;

  protected result(output: string, format: string, metadata: Partial<WorkerResult["metadata"]> = {}): WorkerResult {
    return { success: true, output, format, metadata: { durationMs: 0, ...metadata } };
  }

  protected error(message: string, metadata: Partial<WorkerResult["metadata"]> = {}): WorkerResult {
    return { success: false, output: message, format: "text", metadata: { durationMs: 0, ...metadata } };
  }
}
