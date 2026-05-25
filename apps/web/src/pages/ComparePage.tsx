import { useMemo } from "react";
import { products, getPricing, getShell } from "@iai/product-registry";

interface ComparePageProps {
  locale?: "vi" | "en";
}

const tierOrder = { mass: 0, professional: 1, enterprise: 2, dedicated: 3 };
const quotaKeys = ["runsPerDay", "outputCredits", "storageMb"] as const;

export function ComparePage({ locale = "vi" }: ComparePageProps) {
  const sorted = useMemo(
    () => [...products].sort((a, b) => (tierOrder[a.tier] || 0) - (tierOrder[b.tier] || 0) || a.order - b.order),
    []
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>{locale === "vi" ? "So sánh sản phẩm" : "Compare Products"}</h2>
          <p>{locale === "vi" ? "Chọn sản phẩm phù hợp với nhu cầu." : "Choose the right product for your needs."}</p>
        </div>
        <div className="compare-table-wrapper">
          <table className="compare-table">
            <thead>
              <tr>
                <th className="compare-th">{locale === "vi" ? "Tính năng" : "Feature"}</th>
                {sorted.map((p) => (
                  <th key={p.id} className="compare-th center">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="compare-td muted">{locale === "vi" ? "Giá tháng" : "Monthly"}</td>
                {sorted.map((p) => {
                  const price = getPricing(p.id);
                  return (
                    <td key={p.id} className="compare-td center">
                      {price.monthly === 0
                        ? (locale === "vi" ? "Miễn phí" : "Free")
                        : price.monthly === null
                          ? (locale === "vi" ? "Liên hệ" : "Contact")
                          : locale === "vi"
                            ? `${(price.monthlyVnd! / 1000).toLocaleString("vi-VN")}đ`
                            : `$${price.monthly}`}
                    </td>
                  );
                })}
              </tr>
              {quotaKeys.map((feat) => (
                <tr key={feat}>
                  <td className="compare-td muted">{feat}</td>
                  {sorted.map((p) => {
                    const shell = getShell(p.id);
                    const value = (shell.quota as any)[feat];
                    return (
                      <td key={p.id} className="compare-td center">
                        {value === -1 ? "∞" : value ?? "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
