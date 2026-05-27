import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { getAIProvider, generateWithFallback } from "@iai/providers";

export class ContentWorker extends BaseWorker {
  name = "content";
  allowedTypes = ["write", "rewrite", "brainstorm", "create", "edit"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# Content Output (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Generated Content\n\n${task.input.substring(0, 100)}...\n\n---\n*Word count: ${task.input.split(/\s+/).length} (simulated)*\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
        "markdown",
        { durationMs: Date.now() - start }
      );
    }

    try {
      const systemPrompt = this.buildSystemPrompt(task.type);
      const fallbackResult = await generateWithFallback({
        model: "claude-sonnet-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: task.input },
        ],
        maxTokens: 4096,
      });

      return this.result(
        fallbackResult.response.content,
        "markdown",
        {
          durationMs: Date.now() - start,
          tokenCount: fallbackResult.cost.inputTokens + fallbackResult.cost.outputTokens,
        }
      );
    } catch (error) {
      return this.error(
        `Content worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI content assistant. Create high-quality, engaging content.";
    const typePrompts: Record<string, string> = {
      write: `${basePrompt} Write original content based on the given topic or requirements.`,
      rewrite: `${basePrompt} Rewrite the given content to improve clarity, tone, or style.`,
      brainstorm: `${basePrompt} Brainstorm creative ideas based on the given prompt.`,
      create: `${basePrompt} Create new content from scratch based on the instructions.`,
      edit: `${basePrompt} Edit the given content for grammar, style, or clarity.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
