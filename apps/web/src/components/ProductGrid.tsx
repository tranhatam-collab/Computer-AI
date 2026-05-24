import type { ProductDef } from "../lib/products";

interface ProductGridProps {
  title: string;
  items: ProductDef[];
  locale?: "vi" | "en";
  productCopy: Record<string, { tagline: string; audience: string[]; cta: string }>;
}

const tierLabel: Record<string, { vi: string; en: string }> = {
  mass: { vi: "Phổ thông", en: "Mass" },
  professional: { vi: "Chuyên nghiệp", en: "Professional" },
  enterprise: { vi: "Doanh nghiệp", en: "Enterprise" },
  dedicated: { vi: "Tận tâm", en: "Dedicated" }
};

export function ProductGrid({ title, items, locale = "vi", productCopy }: ProductGridProps) {
  return (
    <div className="product-block">
      <h3>{title}</h3>
      <div className="product-grid">
        {items.map((item) => {
          const copy = productCopy[item.id] || { tagline: "", audience: [], cta: "" };
          return (
            <article key={item.id} className="product-card">
              <div className="product-tier">{tierLabel[item.tier]?.[locale] || item.tier}</div>
              <h4>{item.name}</h4>
              <p>{copy.tagline}</p>
              <div className="chip-row">
                {copy.audience.map((aud) => (<span key={aud} className="chip">{aud}</span>))}
              </div>
              <ul>{item.highlights.map((point) => (<li key={point}>{point}</li>))}</ul>
              <a href={item.shellRoute} className="card-link">{copy.cta}</a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
