import { BaseWorker, type WorkerTask } from "../base.js";

export class CodeWorker extends BaseWorker {
  name = "code";
  allowedTypes = ["generate", "review", "debug", "refactor", "explain"];

  async run(task: WorkerTask): Promise<ReturnType<BaseWorker["execute"]>> {
    return this.result(
      `[Code Worker] Task: ${task.id}\nType: ${task.type}\nInput: ${task.input.substring(0, 200)}\n\n// Simulated code output — use real code runtime for production\nconsole.log("Hello from CodeWorker");`,
      "code",
      { durationMs: 200 }
    );
  }
}
