import { useMemo, useState } from "react";
import vi from "./data/vi";
import en from "./data/en";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { ProductGrid } from "./components/ProductGrid";
import { CompareStrip } from "./components/CompareStrip";
import { Footer } from "./components/Footer";
import { products } from "./lib/products";

type Locale = "vi" | "en";

export default function App() {
  const [locale, setLocale] = useState<Locale>("vi");
  const content = useMemo(() => (locale === "vi" ? vi : en), [locale]);

  return (
    <div className="app-shell">
      <Header
        brand={content.site.brand}
        links={content.nav}
        locale={locale}
        onToggleLocale={() => setLocale((prev) => (prev === "vi" ? "en" : "vi"))}
      />
      <Hero
        locale={locale}
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
      />
      <Section id="products" title={content.products.title}>
        <ProductGrid
          title={content.products.gridTitle}
          items={products}
          locale={locale}
          productCopy={content.productCopy}
        />
      </Section>
      <Section
        id="compare"
        title={content.compare.title}
        subtitle={content.compare.subtitle}
      >
        <CompareStrip locale={locale} />
      </Section>
      <Section id="how" title={content.howItWorks.title}>
        <div className="simple-grid">
          {content.howItWorks.items.map((item) => (
            <article className="simple-card" key={item}><p>{item}</p></article>
          ))}
        </div>
      </Section>
      <Section id="trust" title={content.trust.title}>
        <div className="simple-grid">
          {content.trust.items.map((item) => (
            <article className="simple-card" key={item}><p>{item}</p></article>
          ))}
        </div>
      </Section>
      <Section id="faq" title={content.faq.title}>
        <div className="faq-list">
          {content.faq.items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <Footer locale={locale} />
    </div>
  );
}
