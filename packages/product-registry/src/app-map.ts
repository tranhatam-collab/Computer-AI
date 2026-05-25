import type { LaneId, ProductId } from "./types.js";
import { products } from "./products.js";

export interface AppMapEntry {
  lane: LaneId;
  productIds: ProductId[];
  label: { vi: string; en: string };
}

const appMap: AppMapEntry[] = [
  {
    lane: "basic",
    productIds: ["free", "learn", "personal"],
    label: { vi: "Cơ bản", en: "Basic" },
  },
  {
    lane: "research",
    productIds: ["learn", "personal", "creator"],
    label: { vi: "Nghiên cứu", en: "Research" },
  },
  {
    lane: "content",
    productIds: ["personal", "creator", "media", "studio"],
    label: { vi: "Nội dung", en: "Content" },
  },
  {
    lane: "code",
    productIds: ["personal", "work", "creator"],
    label: { vi: "Lập trình", en: "Code" },
  },
  {
    lane: "business",
    productIds: ["work", "office", "business"],
    label: { vi: "Văn phòng", en: "Office" },
  },
  {
    lane: "sales",
    productIds: ["sales", "business", "enterprise"],
    label: { vi: "Bán hàng", en: "Sales" },
  },
  {
    lane: "finance",
    productIds: ["finance", "business", "enterprise"],
    label: { vi: "Tài chính", en: "Finance" },
  },
  {
    lane: "enterprise",
    productIds: ["enterprise", "studio"],
    label: { vi: "Doanh nghiệp", en: "Enterprise" },
  },
  {
    lane: "media",
    productIds: ["media", "studio", "creator"],
    label: { vi: "Truyền thông", en: "Media" },
  },
  {
    lane: "data",
    productIds: ["work", "finance", "enterprise"],
    label: { vi: "Dữ liệu", en: "Data" },
  },
];

export function getAppMap(): AppMapEntry[] {
  return appMap;
}

export function getAppMapByLane(lane: LaneId): AppMapEntry | undefined {
  return appMap.find((e) => e.lane === lane);
}

export function getProductsByLane(lane: LaneId): { id: ProductId; name: string }[] {
  const entry = getAppMapByLane(lane);
  if (!entry) return [];
  return products
    .filter((p) => entry.productIds.includes(p.id))
    .map((p) => ({ id: p.id, name: p.name }));
}
