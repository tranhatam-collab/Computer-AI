/**
 * Replay system — re-run with same context and compare outputs.
 */

import type { RunRecord } from "./run.js";
import { createRun, getRun } from "./run.js";

export interface ReplayResult {
  originalRunId: string;
  replayRunId: string;
  originalOutput: string;
  replayOutput: string;
  diff: string;
  matchScore: number;
}

export function createReplay(originalRunId: string): RunRecord | null {
  const original = getRun(originalRunId);
  if (!original) return null;

  const replay = createRun(original.productId, original.text);
  return replay;
}

export function compareOutputs(originalBody: string, replayBody: string): { diff: string; matchScore: number } {
  const origLines = originalBody.split("\n");
  const replayLines = replayBody.split("\n");
  const maxLen = Math.max(origLines.length, replayLines.length);

  let matchCount = 0;
  const diffLines: string[] = [];

  for (let i = 0; i < maxLen; i++) {
    if (origLines[i] === replayLines[i]) {
      matchCount++;
      diffLines.push(`  ${origLines[i] || ""}`);
    } else {
      diffLines.push(`- ${origLines[i] || ""}`);
      diffLines.push(`+ ${replayLines[i] || ""}`);
    }
  }

  return {
    diff: diffLines.join("\n"),
    matchScore: maxLen > 0 ? matchCount / maxLen : 1,
  };
}
