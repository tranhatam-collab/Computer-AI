/**
 * Model class mapping — defines model classes and their capabilities.
 */

export type ModelClass = "fast" | "balanced" | "deep" | "code" | "creative" | "analytic";

export interface ModelClassDef {
  id: ModelClass;
  label: { vi: string; en: string };
  description: { vi: string; en: string };
  capabilities: string[];
  costMultiplier: number; // Cost relative to "fast" baseline
  maxTokens: number;
  suitableFor: string[];
}

const modelClasses: Record<ModelClass, ModelClassDef> = {
  fast: {
    id: "fast",
    label: { vi: "Nhanh", en: "Fast" },
    description: { vi: "Phản hồi nhanh, phù hợp tác vụ đơn giản", en: "Fast responses, suitable for simple tasks" },
    capabilities: ["text-generation", "summarization", "translation"],
    costMultiplier: 1,
    maxTokens: 4096,
    suitableFor: ["search", "translate", "summarize", "help"],
  },
  balanced: {
    id: "balanced",
    label: { vi: "Cân bằng", en: "Balanced" },
    description: { vi: "Cân bằng giữa tốc độ và chất lượng", en: "Balance between speed and quality" },
    capabilities: ["text-generation", "reasoning", "analysis", "translation", "code"],
    costMultiplier: 2,
    maxTokens: 8192,
    suitableFor: ["write", "analyze", "plan", "meeting-notes"],
  },
  deep: {
    id: "deep",
    label: { vi: "Sâu", en: "Deep" },
    description: { vi: "Suy luận sâu, phù hợp phân tích phức tạp", en: "Deep reasoning, suitable for complex analysis" },
    capabilities: ["text-generation", "reasoning", "analysis", "research", "planning"],
    costMultiplier: 4,
    maxTokens: 32768,
    suitableFor: ["research", "analyze", "fact-check", "audit-log"],
  },
  code: {
    id: "code",
    label: { vi: "Code", en: "Code" },
    description: { vi: "Tối ưu cho lập trình và kỹ thuật", en: "Optimized for programming and technical work" },
    capabilities: ["code-generation", "code-review", "debugging", "explanation"],
    costMultiplier: 2,
    maxTokens: 16384,
    suitableFor: ["code", "review-code", "debug", "refactor", "explain-code"],
  },
  creative: {
    id: "creative",
    label: { vi: "Sáng tạo", en: "Creative" },
    description: { vi: "Tối ưu cho nội dung sáng tạo và truyền thông", en: "Optimized for creative and media content" },
    capabilities: ["text-generation", "creative-writing", "brainstorming", "content-planning"],
    costMultiplier: 2,
    maxTokens: 16384,
    suitableFor: ["write", "brainstorm", "design", "brand-review"],
  },
  analytic: {
    id: "analytic",
    label: { vi: "Phân tích", en: "Analytic" },
    description: { vi: "Tối ưu cho phân tích dữ liệu và tài chính", en: "Optimized for data analysis and finance" },
    capabilities: ["analysis", "reasoning", "data-processing", "forecasting"],
    costMultiplier: 3,
    maxTokens: 16384,
    suitableFor: ["analyze-data", "forecast", "reconcile", "categorize-expense"],
  },
};

export function getModelClass(id: ModelClass): ModelClassDef {
  return modelClasses[id];
}

export function getAllModelClasses(): ModelClassDef[] {
  return Object.values(modelClasses);
}
