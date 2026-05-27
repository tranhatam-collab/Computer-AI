import { useMemo } from "react";

interface ThankYouPageProps {
  locale?: "vi" | "en";
  homeHref?: string;
  onNavigate?: (href: string) => void;
}

export function ThankYouPage({ locale = "vi", homeHref = "/", onNavigate }: ThankYouPageProps) {
  const orderId = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("order");
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>{locale === "vi" ? "Cảm ơn bạn!" : "Thank you!"}</h2>
          <p>
            {locale === "vi"
              ? "Chúng tôi đã ghi nhận yêu cầu thanh toán của bạn."
              : "We have received your payment request."}
          </p>
        </div>
        {orderId && (
          <div className="pricing-card" style={{ maxWidth: 520, margin: "24px auto" }}>
            <div className="product-tier">{locale === "vi" ? "Mã đơn" : "Order ID"}</div>
            <h3 style={{ fontFamily: "monospace", fontSize: 14, wordBreak: "break-all" }}>{orderId}</h3>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              {locale === "vi"
                ? "Trạng thái thanh toán sẽ được cập nhật khi pay.iai.one xác nhận giao dịch. Bạn sẽ nhận email biên lai."
                : "Payment status will update once pay.iai.one confirms the transaction. You will receive a receipt email."}
            </p>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate?.(homeHref)}
          >
            {locale === "vi" ? "Về trang chủ" : "Back to home"}
          </button>
        </div>
      </div>
    </section>
  );
}
