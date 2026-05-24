export type ProductId =
  | "free" | "learn" | "personal" | "creator"
  | "work" | "office" | "sales" | "business"
  | "finance" | "media" | "studio" | "enterprise";

export type Tier = "mass" | "professional" | "enterprise" | "dedicated";

export type LaneId =
  | "basic" | "research" | "content" | "code" | "business"
  | "finance" | "media" | "sales" | "data";

export type RuntimeClass = "browser" | "code" | "research" | "content" | "business";

export type EntitlementKey =
  | "run:create" | "run:parallel" | "run:schedule"
  | "output:export" | "output:packaging" | "output:replay"
  | "lane:basic" | "lane:research" | "lane:content" | "lane:code"
  | "lane:business" | "lane:finance" | "lane:sales" | "lane:media" | "lane:data"
  | "storage:files" | "storage:media" | "storage:backup"
  | "governance:auto-approve" | "governance:audit" | "governance:custom-policy";
