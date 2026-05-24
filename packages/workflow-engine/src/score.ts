/**
 * Confidence scoring — scores outputs on multiple dimensions.
 */

export interface ScoreDimensions {
  relevance: number;   // 0–1: how relevant to the original query
  accuracy: number;    // 0–1: factually correct
  completeness: number; // 0–1: covers all requested aspects
  clarity: number;     // 0–1: well-structured and readable
}

export function calculateScore(dimensions: ScoreDimensions): number {
  return (
    dimensions.relevance * 0.3 +
    dimensions.accuracy * 0.3 +
    dimensions.completeness * 0.25 +
    dimensions.clarity * 0.15
  );
}

export function scoreFromVerification(passedChecks: number, totalChecks: number): number {
  if (totalChecks === 0) return 0.5;
  return passedChecks / totalChecks;
}

export function scoreLabel(score: number): { vi: string; en: string } {
  if (score >= 0.9) return { vi: "Xuất sắc", en: "Excellent" };
  if (score >= 0.75) return { vi: "Tốt", en: "Good" };
  if (score >= 0.5) return { vi: "Trung bình", en: "Average" };
  if (score >= 0.3) return { vi: "Cần xem lại", en: "Needs review" };
  return { vi: "Không đạt", en: "Failed" };
}
