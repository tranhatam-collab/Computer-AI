import { products } from "../lib/products";

function buildProductCopy(locale: "vi" | "en") {
  const copy: Record<string, { tagline: string; audience: string[]; cta: string }> = {};
  for (const p of products) {
    copy[p.id] = {
      tagline: p.tagline[locale],
      audience: p.audience[locale],
      cta: p.cta[locale],
    };
  }
  return copy;
}

const t = buildProductCopy("vi");

export default {
  "site": {
    "brand": "IAI Computer",
    "title": "Không cần tự tạo máy tính AI. Chọn đúng gói, đăng nhập và làm việc ngay.",
    "description": "computer.iai.one là catalog AI computers dựng sẵn theo gói.",
    "language": "vi"
  },
  "nav": [
    { "label": "Trang chủ", "href": "#home" },
    { "label": "Sản phẩm", "href": "#products" },
    { "label": "So sánh", "href": "#compare" },
    { "label": "Cách hoạt động", "href": "#how" },
    { "label": "Tin cậy", "href": "#trust" },
    { "label": "FAQ", "href": "#faq" }
  ],
  "hero": {
    "eyebrow": "Catalog AI computers dựng sẵn theo gói",
    "title": "Không cần tự tạo máy tính AI. Chọn đúng gói, đăng nhập và làm việc ngay.",
    "subtitle": "Từ cá nhân, học tập và sáng tạo đến doanh nghiệp, sales, finance và studio.",
    "primaryCta": "Xem các gói mở bán đầu",
    "secondaryCta": "Xem cách hoạt động"
  },
  "products": {
    "title": "Các gói mở bán đầu",
    "gridTitle": "12 sản phẩm AI computers"
  },
  "compare": {
    "title": "So sánh nhanh",
    "subtitle": "So sánh đủ rõ để chọn đúng gói."
  },
  productCopy: t,
  "howItWorks": {
    "title": "Cách hoạt động",
    "items": [
      "Chọn đúng AI Computer theo nhu cầu của bạn",
      "Đăng nhập vào đúng product shell đã mua",
      "Ra lệnh, theo dõi, duyệt và nhận kết quả",
      "Nâng gói khi cần lane, quota hoặc governance cao hơn"
    ]
  },
  "trust": {
    "title": "Vì sao mô hình này đúng hơn",
    "items": [
      "Người dùng không phải tự lắp runtime hay workflow phức tạp",
      "Mỗi gói có UI, entitlement và giới hạn rõ ràng",
      "Approval, quota và audit dễ kiểm soát hơn",
      "Mobile trở thành trung tâm điều phối thay vì desktop thu nhỏ"
    ]
  },
  "faq": {
    "title": "Câu hỏi thường gặp",
    "items": [
      { "q": "Đây có phải công cụ tự tạo máy tính AI không?", "a": "Không. Đây là hệ các AI computers dựng sẵn theo gói." },
      { "q": "Tôi có thấy toàn bộ hệ thống không?", "a": "Không. Bạn chỉ thấy product shell đúng với gói đã mua." },
      { "q": "Mobile app dùng để làm gì?", "a": "Mobile là Mobile Command Center để ra lệnh, theo dõi, duyệt và nhận kết quả." }
    ]
  }
};
