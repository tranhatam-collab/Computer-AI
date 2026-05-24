import { BaseWorker, type WorkerTask } from "../base.js";

export class ResearchWorker extends BaseWorker {
  name = "research";
  allowedTypes = ["research", "analyze", "summarize", "fact-check", "translate"];

  async run(task: WorkerTask): Promise<ReturnType<BaseWorker["execute"]>> {
    return this.result(
      `# Research Result\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Summary\n${task.input.substring(0, 100)}...\n\n## Sources\n- Simulated source 1\n- Simulated source 2\n\n*Use real research runtime for production*`,
      "markdown",
      { durationMs: 300, sourceCount: 2 }
    );
  }
}
