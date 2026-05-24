import { products } from "@iai/product-registry";
import type { ProductDef } from "@iai/product-registry";

const TIER_ORDER: Record<string, number> = { mass: 0, professional: 1, enterprise: 2, dedicated: 3 };
const MAX_COMPARE = 6;

interface CompareStripProps {
  locale?: "vi" | "en";
  showAll?: boolean;
}

const tierLabel: Record<string, string> = {
  mass: "Mass",
  professional: "Pro",
  enterprise: "Enterprise",
  dedicated: "Dedicated"
};

export function CompareStrip({ locale = "vi", showAll = false }: CompareStripProps) {
  const items: ProductDef[] = products
    .sort((a, b) => (TIER_ORDER[a.tier] || 0) - (TIER_ORDER[b.tier] || 0) || a.order - b.order);

  const display = showAll ? items : items.slice(0, MAX_COMPARE);

  return (
    <div className="compare-strip">
      {display.map((p) => (
        <div key={p.id} className="compare-item">
          <strong style={{ fontSize: 15 }}>{p.name}</strong>
          <span className="compare-tier-badge">{tierLabel[p.tier] || p.tier}</span>
          <span>{p.tagline[locale]}</span>
        </div>
      ))}
    </div>
  );
}
