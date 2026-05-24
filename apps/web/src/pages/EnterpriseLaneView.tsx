import { useMemo } from "react";
import { products } from "@iai/product-registry";
import type { ProductDef } from "@iai/product-registry";

interface EnterpriseLaneViewProps {
  tier?: "professional" | "enterprise" | "dedicated";
  locale?: "vi" | "en";
  onSelectProduct?: (id: string) => void;
}

export function EnterpriseLaneView({ tier = "enterprise", locale = "vi", onSelectProduct }: EnterpriseLaneViewProps) {
  const filtered = useMemo(
    () => products.filter((p) => {
      if (tier === "dedicated") return p.tier === "dedicated";
      if (tier === "enterprise") return ["enterprise", "dedicated"].includes(p.tier);
      if (tier === "professional") return ["professional", "enterprise", "dedicated"].includes(p.tier);
      return true;
    }),
    [tier]
  );

  return (
    <div className="enterprise-lanes">
      {filtered.map((product) => (
        <div key={product.id} className="enterprise-card" onClick={() => onSelectProduct?.(product.id)}>
          <div className="enterprise-card-header">
            <span className="product-tier">{product.tier}</span>
            <h3>{product.name}</h3>
            <p>{product.tagline[locale]}</p>
          </div>
          <div className="enterprise-card-body">
            <h4>{locale === "vi" ? "Tính năng chính" : "Key features"}</h4>
            <ul>
              {product.highlights.map((h) => (<li key={h}>{h}</li>))}
            </ul>
            <h4>{locale === "vi" ? "Khả năng" : "Capabilities"}</h4>
            <div className="capability-chips">
              {product.capabilities.slice(0, 6).map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
