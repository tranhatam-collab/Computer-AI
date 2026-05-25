import { useMemo } from "react";
import type { ProductDef } from "@iai/product-registry";
import { products } from "@iai/product-registry";

interface ProductPageProps {
  productId: string;
  locale?: "vi" | "en";
  onBack?: () => void;
  backHref?: string;
  pricingHref?: string;
  onNavigate?: (href: string) => void;
}

export function ProductPage({ productId, locale = "vi", onBack, backHref = "/", pricingHref = "/pricing", onNavigate }: ProductPageProps) {
  const product: ProductDef | undefined = useMemo(
    () => products.find((p) => p.id === productId),
    [productId]
  );

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <h2>Product not found</h2>
          <p>{locale === "vi" ? "Product không tồn tại" : "Product not found"}</p>
          <a href={backHref} onClick={(e) => { e.preventDefault(); onBack?.(); }} className="btn btn-primary">{locale === "vi" ? "Về trang chủ" : "Back to home"}</a>
        </div>
      </section>
    );
  }

  const t = {
    tagline: product.tagline[locale],
    description: product.description[locale],
    audience: product.audience[locale],
    cta: product.cta[locale],
  };

  return (
    <section className="section product-detail">
      <div className="container">
        <a href={backHref} onClick={(e) => { e.preventDefault(); onBack?.(); }} className="back-link">← Back to catalog</a>
        <div className="product-detail-header">
          <div>
            <span className="product-tier">{product.tier}</span>
            <h1>{product.name}</h1>
            <p className="hero-subtitle">{t.tagline}</p>
            <p>{t.description}</p>
          </div>
          <div className="product-detail-cta">
            <a
              href={pricingHref}
              onClick={(e) => {
                if (!onNavigate) return;
                e.preventDefault();
                onNavigate(pricingHref);
              }}
              className="btn btn-primary"
            >
              {t.cta}
            </a>
          </div>
        </div>

        <div className="section">
          <h2>{locale === "vi" ? "Đối tượng" : "Audience"}</h2>
          <div className="chip-row">
            {t.audience.map((a) => (<span key={a} className="chip">{a}</span>))}
          </div>
        </div>

        <div className="section">
          <h2>{locale === "vi" ? "Tính năng" : "Highlights"}</h2>
          <ul className="feature-list">
            {product.highlights.map((h) => (<li key={h}>{h}</li>))}
          </ul>
        </div>

        <div className="section">
          <h2>{locale === "vi" ? "Khả năng" : "Capabilities"}</h2>
          <ul className="feature-list">
            {product.capabilities.map((c) => (<li key={c}>{c}</li>))}
          </ul>
        </div>
      </div>
    </section>
  );
}
