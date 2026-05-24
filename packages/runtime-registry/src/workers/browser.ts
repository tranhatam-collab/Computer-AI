import { BaseWorker, type WorkerTask } from "../base.js";

export class BrowserWorker extends BaseWorker {
  name = "browser";
  allowedTypes = ["search", "browse", "fetch", "scrape"];

  async run(task: WorkerTask): Promise<ReturnType<BaseWorker["execute"]>> {
    const results = [
      `[Browser Worker] Task: ${task.id}`,
      `Type: ${task.type}`,
      `Input: ${task.input.substring(0, 200)}`,
      `Status: Simulated run — use real browser runtime for production`,
    ];
    return this.result(results.join("\n"), "markdown", { durationMs: 150 });
  }
}
