/**
 * Tool permission matrix — maps tools to product entitlement levels.
 *
 * Tools are gated by product capabilities. Higher-tier products unlock more tools.
 */

export type ToolId =
  | "search" | "browse" | "read" | "write" | "execute"
  | "transform" | "store" | "notify" | "approve" | "schedule";

export interface ToolDef {
  id: ToolId;
  label: { vi: string; en: string };
  description: { vi: string; en: string };
  minTier: "mass" | "professional" | "enterprise" | "dedicated";
  risk: "low" | "medium" | "high";
}

export const tools: ToolDef[] = [
  { id: "search",   label: { vi: "Tìm kiếm", en: "Search" },   description: { vi: "Tìm kiếm thông tin trên web", en: "Search the web" },         minTier: "mass",        risk: "low" },
  { id: "browse",   label: { vi: "Duyệt web", en: "Browse" },  description: { vi: "Truy cập và đọc nội dung trang web", en: "Visit and read web pages" }, minTier: "mass",   risk: "low" },
  { id: "read",     label: { vi: "Đọc tài liệu", en: "Read" }, description: { vi: "Đọc và phân tích tài liệu", en: "Read and analyze documents" }, minTier: "mass",        risk: "low" },
  { id: "write",    label: { vi: "Viết", en: "Write" },        description: { vi: "Tạo và chỉnh sửa nội dung", en: "Create and edit content" },   minTier: "mass",        risk: "low" },
  { id: "execute",  label: { vi: "Thực thi", en: "Execute" },  description: { vi: "Chạy code hoặc script", en: "Run code or scripts" },           minTier: "professional", risk: "high" },
  { id: "transform", label: { vi: "Biến đổi", en: "Transform" }, description: { vi: "Biến đổi dữ liệu giữa các định dạng", en: "Transform data between formats" }, minTier: "mass", risk: "low" },
  { id: "store",    label: { vi: "Lưu trữ", en: "Store" },     description: { vi: "Lưu trữ file và kết quả", en: "Store files and results" },      minTier: "mass",        risk: "low" },
  { id: "notify",   label: { vi: "Thông báo", en: "Notify" },  description: { vi: "Gửi thông báo cho người dùng", en: "Send notifications" },      minTier: "professional", risk: "low" },
  { id: "approve",  label: { vi: "Phê duyệt", en: "Approve" }, description: { vi: "Phê duyệt hành động nguy hiểm", en: "Approve risky actions" },  minTier: "enterprise",  risk: "medium" },
  { id: "schedule", label: { vi: "Lên lịch", en: "Schedule" }, description: { vi: "Lên lịch chạy tác vụ định kỳ", en: "Schedule recurring tasks" },  minTier: "professional", risk: "low" },
];

export function getTool(id: ToolId): ToolDef | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolsByTier(tier: string): ToolDef[] {
  const tierOrder = ["mass", "professional", "enterprise", "dedicated"];
  const minIndex = tierOrder.indexOf(tier);
  if (minIndex === -1) return [];
  return tools.filter((t) => tierOrder.indexOf(t.minTier) <= minIndex);
}
