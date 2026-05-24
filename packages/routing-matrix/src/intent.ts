/**
 * Intent schema — defines all supported user intents and their classification.
 *
 * Every user command resolves to one primary intent.
 * Intents are used by the lane router to determine which lane handles the request.
 */

export type IntentId =
  // Research & Analysis
  | "research" | "analyze" | "summarize" | "translate" | "fact-check"
  // Content & Creative
  | "write" | "rewrite" | "create-image" | "create-video" | "brainstorm"
  // Code & Technical
  | "code" | "review-code" | "debug" | "explain-code" | "refactor"
  // Business & Operations
  | "plan" | "report" | "analyze-data" | "forecast" | "meeting-notes"
  // Sales & CRM
  | "prospect" | "outreach" | "pipeline-review"
  // Finance
  | "reconcile" | "categorize-expense" | "generate-invoice" | "audit-log"
  // Media & Design
  | "design" | "edit-media" | "layout" | "brand-review"
  // General
  | "search" | "organize" | "configure" | "automate" | "help";

export type IntentCategory =
  | "research" | "content" | "code" | "business" | "sales"
  | "finance" | "media" | "general";

export interface IntentDef {
  id: IntentId;
  category: IntentCategory;
  label: { vi: string; en: string };
  description: { vi: string; en: string };
  defaultLane: string;
  requiresTools: string[];
}

export const intents: IntentDef[] = [
  // ── Research & Analysis ──
  { id: "research",    category: "research", label: { vi: "Nghiên cứu", en: "Research" },       description: { vi: "Tìm kiếm và tổng hợp thông tin từ nhiều nguồn", en: "Search and synthesize information from multiple sources" },       defaultLane: "research", requiresTools: ["search", "browse"] },
  { id: "analyze",     category: "research", label: { vi: "Phân tích", en: "Analyze" },         description: { vi: "Phân tích dữ liệu hoặc tài liệu", en: "Analyze data or documents" },                                                       defaultLane: "research", requiresTools: ["read", "transform"] },
  { id: "summarize",   category: "research", label: { vi: "Tóm tắt", en: "Summarize" },         description: { vi: "Tóm tắt nội dung dài thành ngắn gọn", en: "Summarize long content" },                                                          defaultLane: "research", requiresTools: ["read"] },
  { id: "translate",   category: "research", label: { vi: "Dịch thuật", en: "Translate" },      description: { vi: "Dịch văn bản giữa các ngôn ngữ", en: "Translate text between languages" },                                                   defaultLane: "research", requiresTools: ["read", "write"] },
  { id: "fact-check",  category: "research", label: { vi: "Kiểm tra sự thật", en: "Fact check" }, description: { vi: "Xác minh thông tin từ nhiều nguồn", en: "Verify information across sources" },                                          defaultLane: "research", requiresTools: ["search", "browse", "read"] },

  // ── Content & Creative ──
  { id: "write",       category: "content", label: { vi: "Viết", en: "Write" },                 description: { vi: "Viết nội dung mới theo yêu cầu", en: "Write new content on request" },                                                      defaultLane: "content", requiresTools: ["write"] },
  { id: "rewrite",     category: "content", label: { vi: "Viết lại", en: "Rewrite" },           description: { vi: "Viết lại nội dung với giọng văn hoặc mục đích khác", en: "Rewrite content with different tone or purpose" },               defaultLane: "content", requiresTools: ["read", "write"] },
  { id: "brainstorm",  category: "content", label: { vi: "Động não", en: "Brainstorm" },        description: { vi: "Tạo ý tưởng và đề xuất sáng tạo", en: "Generate ideas and creative suggestions" },                                           defaultLane: "content", requiresTools: ["write"] },

  // ── Code & Technical ──
  { id: "code",         category: "code", label: { vi: "Lập trình", en: "Code" },                description: { vi: "Viết code theo yêu cầu", en: "Write code on request" },                                                                     defaultLane: "code", requiresTools: ["execute", "write"] },
  { id: "review-code",  category: "code", label: { vi: "Review code", en: "Review code" },       description: { vi: "Xem xét và đánh giá chất lượng code", en: "Review and assess code quality" },                                                 defaultLane: "code", requiresTools: ["read", "write"] },
  { id: "debug",        category: "code", label: { vi: "Gỡ lỗi", en: "Debug" },                 description: { vi: "Phân tích và sửa lỗi code", en: "Analyze and fix code issues" },                                                               defaultLane: "code", requiresTools: ["execute", "read"] },
  { id: "refactor",     category: "code", label: { vi: "Tái cấu trúc", en: "Refactor" },         description: { vi: "Cải thiện cấu trúc code mà không thay đổi hành vi", en: "Improve code structure without changing behavior" },               defaultLane: "code", requiresTools: ["read", "execute", "write"] },

  // ── Business & Operations ──
  { id: "plan",         category: "business", label: { vi: "Lập kế hoạch", en: "Plan" },          description: { vi: "Xây dựng kế hoạch, lộ trình hoặc timeline", en: "Build plans, roadmaps, or timelines" },                                      defaultLane: "business", requiresTools: ["write", "organize"] },
  { id: "report",       category: "business", label: { vi: "Báo cáo", en: "Report" },             description: { vi: "Tạo báo cáo từ dữ liệu có sẵn", en: "Generate reports from available data" },                                                defaultLane: "business", requiresTools: ["read", "write", "transform"] },
  { id: "meeting-notes", category: "business", label: { vi: "Ghi chú họp", en: "Meeting notes" }, description: { vi: "Tóm tắt và tổ chức ghi chú cuộc họp", en: "Summarize and organize meeting notes" },                                          defaultLane: "business", requiresTools: ["write", "organize"] },

  // ── General ──
  { id: "search",      category: "general", label: { vi: "Tìm kiếm", en: "Search" },             description: { vi: "Tìm kiếm thông tin cơ bản", en: "Basic information search" },                                                               defaultLane: "research", requiresTools: ["search"] },
  { id: "organize",    category: "general", label: { vi: "Sắp xếp", en: "Organize" },            description: { vi: "Sắp xếp và phân loại thông tin", en: "Organize and categorize information" },                                             defaultLane: "business", requiresTools: ["transform", "store"] },
  { id: "help",        category: "general", label: { vi: "Trợ giúp", en: "Help" },              description: { vi: "Hướng dẫn sử dụng hệ thống", en: "Guide to using the system" },                                                             defaultLane: "basic",   requiresTools: [] },
];

export function getIntent(id: IntentId): IntentDef | undefined {
  return intents.find((i) => i.id === id);
}

export function getIntentsByCategory(category: IntentCategory): IntentDef[] {
  return intents.filter((i) => i.category === category);
}

export function detectIntent(text: string): { intent: IntentDef; confidence: number } | null {
  const lower = text.toLowerCase();
  for (const intent of intents) {
    const keywords: Record<string, string[]> = {
      research: ["research", "find", "search", "look up", "tìm", "nghiên cứu", "tra cứu"],
      analyze: ["analyze", "analysis", "phân tích", "đánh giá"],
      summarize: ["summarize", "summary", "tóm tắt", "summary"],
      translate: ["translate", "dịch", "dịch thuật"],
      write: ["write", "viết", "soạn", "draft", "content"],
      code: ["code", "program", "script", "function", "lập trình", "code"],
      plan: ["plan", "kế hoạch", "roadmap", "lộ trình"],
      report: ["report", "báo cáo", "report"],
      search: ["search", "find", "google", "tìm"],
      help: ["help", "hướng dẫn", "guide", "how to", "what is"],
    };
    const words = keywords[intent.id] || [];
    for (const word of words) {
      if (lower.includes(word)) {
        return { intent, confidence: 0.7 };
      }
    }
  }
  return null;
}
