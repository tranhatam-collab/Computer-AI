import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { generateWithFallback } from "@iai/providers";

export class EnterpriseWorker extends BaseWorker {
  name = "enterprise";
  allowedTypes = ["strategy", "compliance", "governance", "integration", "security", "audit"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# Enterprise Output (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Generated Content\n\n${task.input.substring(0, 100)}...\n\n---\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
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
        `Enterprise worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an AI enterprise consultant. Provide strategic, compliant, and risk-aware guidance.";
    const typePrompts: Record<string, string> = {
      strategy: `${basePrompt} Develop a business strategy with objectives, initiatives, KPIs, and risk mitigations.`,
      compliance: `${basePrompt} Draft a compliance checklist or gap assessment with regulations, controls, and evidence requirements.`,
      governance: `${basePrompt} Outline governance structures, decision rights, escalation paths, and accountability frameworks.`,
      integration: `${basePrompt} Create a system integration plan with APIs, data mapping, testing phases, and rollback procedures.`,
      security: `${basePrompt} Summarize security posture, threat model, controls, and incident response recommendations.`,
      audit: `${basePrompt} Prepare an audit scope and checklist with sample questions, evidence samples, and risk ratings.`,
    };
    return typePrompts[taskType] || basePrompt;
  }
}
