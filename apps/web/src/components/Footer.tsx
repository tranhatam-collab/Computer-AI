interface FooterProps { locale?: "vi" | "en"; }

const content = {
  vi: { tagline: "Catalog các AI computers dựng sẵn theo gói.", links: [{ label: "Sản phẩm", href: "#products" }, { label: "So sánh", href: "#compare" }, { label: "Tin cậy", href: "#trust" }, { label: "FAQ", href: "#faq" }] },
  en: { tagline: "A catalog of prebuilt AI computers by package.", links: [{ label: "Products", href: "#products" }, { label: "Compare", href: "#compare" }, { label: "Trust", href: "#trust" }, { label: "FAQ", href: "#faq" }] }
} as const;

export function Footer({ locale = "vi" }: FooterProps) {
  const t = content[locale];
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><strong>computer.iai.one</strong><p>{t.tagline}</p></div>
        <div className="footer-links">{t.links.map((link) => (<a key={link.href} href={link.href}>{link.label}</a>))}</div>
      </div>
    </footer>
  );
}
