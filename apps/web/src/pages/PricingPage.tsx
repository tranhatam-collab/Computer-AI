import { useMemo } from "react";
import { products, getPricing } from "@iai/product-registry";

interface PricingPageProps {
  locale?: "vi" | "en";
}

const tierOrder = { mass: 0, professional: 1, enterprise: 2, dedicated: 3 };

export function PricingPage({ locale = "vi" }: PricingPageProps) {
  const sorted = useMemo(
    () => [...products].sort((a, b) => (tierOrder[a.tier] || 0) - (tierOrder[b.tier] || 0) || a.order - b.order),
    []
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>{locale === "vi" ? "Bảng giá" : "Pricing"}</h2>
          <p>{locale === "vi" ? "Chọn gói phù hợp với nhu cầu." : "Choose the right package for your needs."}</p>
        </div>
        <div className="pricing-grid">
          {sorted.map((p) => {
            const price = getPricing(p.id);
            const isFree = price.monthly === 0;
            const isContact = price.monthly === null;
            return (
              <div key={p.id} className="pricing-card">
                <div className="product-tier">{p.tier}</div>
                <h3>{p.name}</h3>
                <div className="pricing-amount">
                  {isFree ? (
                    <span className="price-free">{locale === "vi" ? "Miễn phí" : "Free"}</span>
                  ) : isContact ? (
                    <span className="price-contact">{locale === "vi" ? "Liên hệ" : "Contact sales"}</span>
                  ) : (
                    <>
                      <span className="price-value">
                        {locale === "vi"
                          ? `${(price.monthlyVnd! / 1000).toLocaleString("vi-VN")}đ`
                          : `$${price.monthly}`}
                      </span>
                      <span className="price-period">/{locale === "vi" ? "tháng" : "mo"}</span>
                    </>
                  )}
                </div>
                {!isFree && !isContact && (
                  <div className="price-annual">
                    {locale === "vi"
                      ? `${(price.annualVnd! / 1000).toLocaleString("vi-VN")}đ/năm`
                      : `$${price.annual}/year`}
                    <span className="price-save">
                      {locale === "vi"
                        ? ` (tiết kiệm ${Math.round((1 - price.annual! / (price.monthly! * 12)) * 100)}%)`
                        : ` (save ${Math.round((1 - price.annual! / (price.monthly! * 12)) * 100)}%)`}
                    </span>
                  </div>
                )}
                <ul className="pricing-features">
                  {p.highlights.slice(0, 5).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
