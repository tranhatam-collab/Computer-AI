/**
 * Verification layer — auto-verifies outputs and flags for manual review.
 */

import type { RunOutput } from "./run.js";

export type VerificationResult = "passed" | "failed" | "needs-review";

export interface VerificationReport {
  result: VerificationResult;
  checks: VerificationCheck[];
  confidence: number;
}

interface VerificationCheck {
  name: string;
  passed: boolean;
  details?: string;
}

export function verifyOutput(output: RunOutput, productId: string, tier: string): VerificationReport {
  const checks: VerificationCheck[] = [];

  // 1. Content length check
  checks.push({
    name: "content-length",
    passed: output.body.length >= 10,
    details: `Content length: ${output.body.length} chars (min 10)`,
  });

  // 2. Format check
  const validFormats = ["markdown", "html", "json", "text", "code", "csv"];
  checks.push({
    name: "format-valid",
    passed: validFormats.includes(output.format),
    details: `Format: ${output.format} (valid: ${validFormats.join(", ")})`,
  });

  // 3. Confidence threshold
  checks.push({
    name: "confidence-threshold",
    passed: output.confidence >= 0.3,
    details: `Confidence: ${output.confidence} (threshold: 0.3)`,
  });

  // 4. Artifact presence (if expected)
  if (["studio", "media", "enterprise"].includes(productId)) {
    checks.push({
      name: "artifact-count",
      passed: output.artifacts.length > 0,
      details: `Artifacts: ${output.artifacts.length}`,
    });
  }

  const passed = checks.filter((c) => c.passed).length;
  const total = checks.length;
  const confidence = passed / total;
  const allPassed = passed === total;
  const needsReview = !allPassed && confidence >= 0.5;

  return {
    result: allPassed ? "passed" : needsReview ? "needs-review" : "failed",
    checks,
    confidence,
  };
}

export function autoVerifyThreshold(productId: string, tier: string): number {
  const thresholds: Record<string, number> = {
    mass: 0.5,
    professional: 0.75,
    enterprise: 0.9,
    dedicated: 0.95,
  };
  return thresholds[tier] || 0.6;
}

export function shouldManualReview(report: VerificationReport, tier: string): boolean {
  const threshold = autoVerifyThreshold("", tier);
  return report.confidence < threshold || report.result === "needs-review";
}
