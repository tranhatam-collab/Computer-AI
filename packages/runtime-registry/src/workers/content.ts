import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";

export class ContentWorker extends BaseWorker {
  name = "content";
  allowedTypes = ["write", "rewrite", "brainstorm", "create", "edit"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    return this.result(
      `# Content Output\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Generated Content\n\n${task.input.substring(0, 100)}...\n\n---\n*Word count: ${task.input.split(/\s+/).length} (simulated)*\n*Use real content runtime for production*`,
      "markdown",
      { durationMs: 250 }
    );
  }
}
