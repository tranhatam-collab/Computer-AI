import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { generateWithFallback } from "@iai/providers";

export class OfficeWorker extends BaseWorker {
  name = "office";
  allowedTypes = ["document", "spreadsheet", "presentation", "email", "memo", "sop"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# Office Output (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Generated Content\n\n${task.input.substring(0, 100)}...\n\n---\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
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
        `Office worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI office assistant. Produce professional, well-structured documents.";
    const typePrompts: Record<string, string> = {
      document: `${basePrompt} Draft a clear, professional document with headings, sections, and actionable conclusions.`,
      spreadsheet: `${basePrompt} Generate structured tabular data with columns, formulas, and cell-level explanations.`,
      presentation: `${basePrompt} Create presentation outlines with slide titles, key bullet points, and speaker notes.`,
      email: `${basePrompt} Write a concise, courteous, and effective business email with a clear subject and call to action.`,
      memo: `${basePrompt} Compose an internal memo with context, decision, and next steps.`,
      sop: `${basePrompt} Write a standard operating procedure with numbered steps, responsible roles, and compliance notes.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
