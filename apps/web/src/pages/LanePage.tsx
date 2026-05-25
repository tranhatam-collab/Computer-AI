import { useMemo } from "react";
import { getProductsByLane, getAppMapByLane, getPricing } from "@iai/product-registry";
import type { LaneId } from "@iai/product-registry";

interface LanePageProps {
  lane: LaneId;
  locale?: "vi" | "en";
}

export function LanePage({ lane, locale = "vi" }: LanePageProps) {
  const entry = useMemo(() => getAppMapByLane(lane), [lane]);
  const items = useMemo(() => getProductsByLane(lane), [lane]);

  if (!entry) {
    return (
      <section className="section">
        <div className="container">
          <h2>{locale === "vi" ? "Không tìm thấy lane" : "Lane not found"}</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>{locale === "vi" ? entry.label.vi : entry.label.en}</h2>
          <p>
            {locale === "vi"
              ? `Các sản phẩm trong lane ${entry.label.vi}.`
              : `Products in the ${entry.label.en} lane.`}
          </p>
        </div>
        <div className="enterprise-lanes">
          {items.map((p) => {
            const price = getPricing(p.id);
            return (
              <div key={p.id} className="enterprise-card">
                <div className="enterprise-card-header">
                  <h3>{p.name}</h3>
                  <p>
                    {price.monthly === 0
                      ? (locale === "vi" ? "Miễn phí" : "Free")
                      : price.monthly === null
                        ? (locale === "vi" ? "Liên hệ" : "Contact")
                        : locale === "vi"
                          ? `${(price.monthlyVnd! / 1000).toLocaleString("vi-VN")}đ/tháng`
                          : `$${price.monthly}/mo`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
