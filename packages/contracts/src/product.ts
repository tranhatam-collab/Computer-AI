export type ProductId = "free" | "learn" | "personal" | "creator" | "work" | "office" | "sales" | "business" | "finance" | "media" | "studio" | "enterprise";

export interface ProductCard {
  id: ProductId;
  name: string;
  tagline?: string;
  audience?: string[];
  highlights: string[];
  cta?: string;
  tier: "mass" | "professional" | "enterprise";
}
