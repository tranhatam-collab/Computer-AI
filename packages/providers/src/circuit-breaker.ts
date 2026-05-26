import type { AIProvider, AIRequest, AIResponse } from "./index.js";
import { estimateCost, type CostEstimate } from "./cost-tracker.js";

export type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface CircuitConfig {
  failureThreshold: number;
  successThreshold: number;
  timeoutMs: number;
  resetTimeoutMs: number;
}

class CircuitBreaker {
  state: CircuitState = "CLOSED";
  failures = 0;
  successes = 0;
  lastFailureTime: number | null = null;
  private config: CircuitConfig;

  constructor(config: Partial<CircuitConfig> = {}) {
    this.config = {
      failureThreshold: config.failureThreshold || 3,
      successThreshold: config.successThreshold || 2,
      timeoutMs: config.timeoutMs || 10000,
      resetTimeoutMs: config.resetTimeoutMs || 30000,
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "OPEN") {
      if (
        this.lastFailureTime &&
        Date.now() - this.lastFailureTime >= this.config.resetTimeoutMs
      ) {
        this.state = "HALF_OPEN";
        this.failures = 0;
        this.successes = 0;
      } else {
        throw new CircuitOpenError("Circuit breaker is OPEN for this provider");
      }
    }

    try {
      const result = await this.raceWithTimeout(fn());
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private raceWithTimeout<T>(promise: Promise<T>): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Provider timeout after ${this.config.timeoutMs}ms`)),
          this.config.timeoutMs
        )
      ),
    ]);
  }

  private onSuccess(): void {
    if (this.state === "HALF_OPEN") {
      this.successes++;
      if (this.successes >= this.config.successThreshold) {
        this.state = "CLOSED";
        this.failures = 0;
        this.successes = 0;
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === "HALF_OPEN" || this.failures >= this.config.failureThreshold) {
      this.state = "OPEN";
    }
  }
}

class CircuitOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CircuitOpenError";
  }
}

export interface FallbackResult {
  response: AIResponse;
  cost: CostEstimate;
  provider: string;
  attempts: { provider: string; error: string }[];
}

export class AIFallbackProvider {
  private primary: AIProvider;
  private fallback: AIProvider;
  private primaryCircuit: CircuitBreaker;
  private fallbackCircuit: CircuitBreaker;

  constructor(primary: AIProvider, fallback: AIProvider) {
    this.primary = primary;
    this.fallback = fallback;
    this.primaryCircuit = new CircuitBreaker({ timeoutMs: 10000, resetTimeoutMs: 30000 });
    this.fallbackCircuit = new CircuitBreaker({ timeoutMs: 15000, resetTimeoutMs: 60000 });
  }

  async generate(req: AIRequest): Promise<FallbackResult> {
    const attempts: { provider: string; error: string }[] = [];

    // Try primary
    try {
      const response = await this.primaryCircuit.execute(() => this.primary.generate(req));
      const cost = estimateCost(
        this.primary.kind,
        req.model,
        response.usage.inputTokens,
        response.usage.outputTokens
      );
      return { response, cost, provider: this.primary.kind, attempts };
    } catch (err) {
      attempts.push({
        provider: this.primary.kind,
        error: err instanceof Error ? err.message : String(err),
      });
    }

    // Try fallback
    try {
      // Map model if needed (e.g., gpt-4o -> claude-3-5-sonnet)
      const fallbackReq = this.mapModelForFallback(req);
      const response = await this.fallbackCircuit.execute(() => this.fallback.generate(fallbackReq));
      const cost = estimateCost(
        this.fallback.kind,
        fallbackReq.model,
        response.usage.inputTokens,
        response.usage.outputTokens
      );
      return { response, cost, provider: this.fallback.kind, attempts };
    } catch (err) {
      attempts.push({
        provider: this.fallback.kind,
        error: err instanceof Error ? err.message : String(err),
      });
    }

    // All failed
    throw new Error(
      `All AI providers failed. Attempts: ${attempts.map((a) => `${a.provider}: ${a.error}`).join("; ")}`
    );
  }

  getHealth(): { primary: CircuitState; fallback: CircuitState } {
    return {
      primary: this.primaryCircuit.state,
      fallback: this.fallbackCircuit.state,
    };
  }

  private mapModelForFallback(req: AIRequest): AIRequest {
    // Simple model mapping: OpenAI -> Anthropic equivalents
    const modelMap: Record<string, string> = {
      "gpt-4o": "claude-3-5-sonnet-20241022",
      "gpt-4o-mini": "claude-3-haiku",
      "gpt-4-turbo": "claude-3-opus",
    };

    const fallbackModel = modelMap[req.model] || "claude-3-5-sonnet-20241022";
    return { ...req, model: fallbackModel };
  }
}
