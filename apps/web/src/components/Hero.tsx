interface HeroProps {
  locale?: "vi" | "en";
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

const heroCard = {
  vi: { label: "Trọng tâm P1", items: ["Catalog các AI computers dựng sẵn", "Web-first purchase, mobile-first command", "5 gói mở bán đầu", "Shell theo sản phẩm, không phải một dashboard chung"] },
  en: { label: "P1 launch focus", items: ["Prebuilt AI computer catalog", "Web-first purchase, mobile-first command", "5 initial launch packages", "Shell per product, not a shared dashboard"] }
} as const;

export function Hero({ locale = "vi", ...props }: HeroProps) {
  const card = heroCard[locale];
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">{props.eyebrow}</div>
          <h1>{props.title}</h1>
          <p className="hero-subtitle">{props.subtitle}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#products">{props.primaryCta}</a>
            <a className="btn btn-secondary" href="#how">{props.secondaryCta}</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-label">{card.label}</div>
          <ul>{card.items.map((item) => (<li key={item}>{item}</li>))}</ul>
        </div>
      </div>
    </section>
  );
}
