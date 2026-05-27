import { BaseWorker, type WorkerTask, type WorkerResult } from "../base.js";
import { generateWithFallback } from "@iai/providers";

export class NlpWorker extends BaseWorker {
  name = "nlp";
  allowedTypes = ["sentiment", "entities", "summarize", "keywords", "classify"];

  async run(task: WorkerTask): Promise<WorkerResult> {
    const start = Date.now();

    if (process.env.ENABLE_RUNTIME_MOCK === "true") {
      return this.result(
        `# NLP Output (Simulated)\n\n**Task:** ${task.id}\n**Type:** ${task.type}\n\n## Result\n\n${this.mockOutput(task.type, task.input)}\n\n---\n*ENABLE_RUNTIME_MOCK=true — using mock output*`,
        "json",
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
        "json",
        {
          durationMs: Date.now() - start,
          tokenCount: fallbackResult.cost.inputTokens + fallbackResult.cost.outputTokens,
        }
      );
    } catch (error) {
      return this.error(
        `NLP worker error: ${error instanceof Error ? error.message : String(error)}`,
        { durationMs: Date.now() - start }
      );
    }
  }

  private buildSystemPrompt(taskType: string): string {
    const basePrompt = "You are an NLP engine. Respond with valid JSON only.";
    const typePrompts: Record<string, string> = {
      sentiment: `${basePrompt} Analyze sentiment. Return JSON: { "sentiment": "positive|negative|neutral|mixed", "confidence": 0-1, "aspects": [{"aspect": "string", "sentiment": "string", "confidence": number}] }.`,
      entities: `${basePrompt} Extract named entities. Return JSON: { "entities": [{"text": "string", "type": "person|org|location|date|product|money|email|url|other", "start": number, "end": number}] }.`,
      summarize: `${basePrompt} Summarize the text. Return JSON: { "summary": "string", "bullet_points": ["string"], "key_takeaways": ["string"] }.`,
      keywords: `${basePrompt} Extract keywords. Return JSON: { "keywords": [{"term": "string", "relevance": 0-1, "frequency": number}], "topics": ["string"] }.`,
      classify: `${basePrompt} Classify the text. Return JSON: { "category": "string", "confidence": 0-1, "categories": [{"label": "string", "score": number}], "reasoning": "string" }.`,
    };
    return typePrompts[taskType] || basePrompt;
  }

  private mockOutput(type: string, input: string): string {
    const short = input.substring(0, 50);
    const outputs: Record<string, string> = {
      sentiment: `{ "sentiment": "positive", "confidence": 0.92, "aspects": [{"aspect": "service", "sentiment": "positive", "confidence": 0.95}] }`,
      entities: `{ "entities": [{"text": "Example Corp", "type": "org", "start": 0, "end": 12}] }`,
      summarize: `{ "summary": "Summary of: ${short}...", "bullet_points": ["Point 1", "Point 2"], "key_takeaways": ["Key 1", "Key 2"] }`,
      keywords: `{ "keywords": [{"term": "AI", "relevance": 0.95, "frequency": 3}], "topics": ["technology", "automation"] }`,
      classify: `{ "category": "technology", "confidence": 0.88, "categories": [{"label": "technology", "score": 0.88}], "reasoning": "Contains tech terms" }`,
    };
    return outputs[type] || `{}`;
  }
}
