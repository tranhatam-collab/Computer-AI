/**
 * Lane schema — defines lanes that can handle user intents.
 *
 * Each lane corresponds to a type of work capability.
 * Products unlock specific lanes via their shell definitions.
 */

export type LaneId =
  | "basic" | "research" | "content" | "code" | "business"
  | "finance" | "sales" | "media" | "data";

export interface LaneDef {
  id: LaneId;
  label: { vi: string; en: string };
  description: { vi: string; en: string };
  runtimeClass: string;
  allowedModels: string[];
  defaultModel: string;
}

const lanes: Record<LaneId, LaneDef> = {
  basic: {
    id: "basic",
    label: { vi: "Cơ bản", en: "Basic" },
    description: { vi: "Xử lý các tác vụ đơn giản, không cần runtime đặc biệt", en: "Handle simple tasks without special runtime" },
    runtimeClass: "browser",
    allowedModels: ["fast"],
    defaultModel: "fast",
  },
  research: {
    id: "research",
    label: { vi: "Nghiên cứu", en: "Research" },
    description: { vi: "Tìm kiếm, thu thập và tổng hợp thông tin", en: "Search, collect, and synthesize information" },
    runtimeClass: "research",
    allowedModels: ["fast", "balanced", "deep"],
    defaultModel: "balanced",
  },
  content: {
    id: "content",
    label: { vi: "Nội dung", en: "Content" },
    description: { vi: "Viết, biên tập và sản xuất nội dung", en: "Write, edit, and produce content" },
    runtimeClass: "content",
    allowedModels: ["fast", "balanced", "creative"],
    defaultModel: "balanced",
  },
  code: {
    id: "code",
    label: { vi: "Lập trình", en: "Code" },
    description: { vi: "Viết, review và debug code", en: "Write, review, and debug code" },
    runtimeClass: "code",
    allowedModels: ["fast", "balanced", "code"],
    defaultModel: "code",
  },
  business: {
    id: "business",
    label: { vi: "Kinh doanh", en: "Business" },
    description: { vi: "Báo cáo, kế hoạch, proposal và phân tích kinh doanh", en: "Reports, plans, proposals, business analysis" },
    runtimeClass: "business",
    allowedModels: ["fast", "balanced", "analytic"],
    defaultModel: "balanced",
  },
  finance: {
    id: "finance",
    label: { vi: "Tài chính", en: "Finance" },
    description: { vi: "Kế toán, đối chiếu, báo cáo tài chính", en: "Accounting, reconciliation, financial reporting" },
    runtimeClass: "business",
    allowedModels: ["balanced", "analytic", "deep"],
    defaultModel: "analytic",
  },
  sales: {
    id: "sales",
    label: { vi: "Bán hàng", en: "Sales" },
    description: { vi: "Tìm kiếm khách hàng, outreach, quản lý pipeline", en: "Lead gen, outreach, pipeline management" },
    runtimeClass: "business",
    allowedModels: ["fast", "balanced"],
    defaultModel: "fast",
  },
  media: {
    id: "media",
    label: { vi: "Truyền thông", en: "Media" },
    description: { vi: "Thiết kế, chỉnh sửa media, xuất bản", en: "Design, media editing, publishing" },
    runtimeClass: "content",
    allowedModels: ["creative", "balanced"],
    defaultModel: "creative",
  },
  data: {
    id: "data",
    label: { vi: "Dữ liệu", en: "Data" },
    description: { vi: "Xử lý, phân tích và trực quan hóa dữ liệu", en: "Data processing, analysis, and visualization" },
    runtimeClass: "code",
    allowedModels: ["analytic", "deep"],
    defaultModel: "analytic",
  },
};

export function getLane(id: LaneId): LaneDef {
  return lanes[id];
}

export function getAllLanes(): LaneDef[] {
  return Object.values(lanes);
}
