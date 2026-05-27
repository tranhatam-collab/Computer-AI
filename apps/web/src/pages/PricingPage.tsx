import { useMemo, useState } from "react";
import { products, getPricing } from "@iai/product-registry";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface PricingPageProps {
  locale?: "vi" | "en";
  userId?: string;
}

const tierOrder = { mass: 0, professional: 1, enterprise: 2, dedicated: 3 };

async function apiCheckoutSession(productId: string, cycle: "monthly" | "annual", locale?: "vi" | "en") {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/api/checkout/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ productId, cycle, locale }),
  });
  const json = await res.json();
  if (!json.success) {
    if (json.code === "PAYMENT_NOT_CONFIGURED") {
      throw new Error(locale === "vi" ? "Thanh toán chưa được cấu hình." : "Payment is not configured yet.");
    }
    if (json.code === "UNAUTHORIZED") {
      throw new Error(locale === "vi" ? "Vui lòng đăng nhập trước." : "Please sign in first.");
    }
    throw new Error(json.error || "Checkout failed");
  }
  return json.data;
}

export function PricingPage({ locale = "vi", userId }: PricingPageProps) {
  const [checkingOut, setCheckingOut] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...products].sort((a, b) => (tierOrder[a.tier] || 0) - (tierOrder[b.tier] || 0) || a.order - b.order),
    []
  );

  const handleSubscribe = async (productId: string) => {
    if (!userId) return alert(locale === "vi" ? "Vui lòng đăng nhập trước." : "Please sign in first.");
    setCheckingOut(productId);
    try {
      const data = await apiCheckoutSession(productId, "monthly", locale);
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error(locale === "vi" ? "Không nhận được link thanh toán." : "No checkout URL received.");
      }
    } catch (err: any) {
      alert(err.message);
      setCheckingOut(null);
    }
  };

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
                {isFree ? (
                  <button className="btn btn-secondary" disabled>{locale === "vi" ? "Đã bao gồm" : "Included"}</button>
                ) : isContact ? (
                  <button className="btn btn-secondary">{locale === "vi" ? "Liên hệ" : "Contact"}</button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSubscribe(p.id)}
                    disabled={checkingOut === p.id}
                  >
                    {checkingOut === p.id
                      ? "..."
                      : (locale === "vi" ? "Thanh toán" : "Pay now")}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
