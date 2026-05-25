import { useEffect, useMemo, useState } from "react";
import vi from "./data/vi";
import en from "./data/en";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { ProductGrid } from "./components/ProductGrid";
import { CompareStrip } from "./components/CompareStrip";
import { Footer } from "./components/Footer";
import { products } from "./lib/products";
import { ProductPage } from "./pages/ProductPage";
import { PricingPage } from "./pages/PricingPage";
import { LoginPage } from "./pages/LoginPage";
import type { ProductId } from "@iai/product-registry";

type Locale = "vi" | "en";
type View = { type: "home" } | { type: "product"; id: ProductId } | { type: "pricing" } | { type: "login" };

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function toAppPath(pathname: string): string {
  if (basePath && pathname.startsWith(basePath)) {
    return pathname.slice(basePath.length) || "/";
  }
  return pathname || "/";
}

function toHref(path: string): string {
  if (path.startsWith("#")) return path;
  if (!basePath) return path;
  return `${basePath}${path === "/" ? "" : path}`;
}

function viewFromPath(pathname: string): View {
  const path = toAppPath(pathname);
  if (path === "/pricing") return { type: "pricing" };
  if (path === "/login") return { type: "login" };
  const productMatch = path.match(/^\/products\/([^/]+)$/);
  if (productMatch) return { type: "product", id: productMatch[1] as ProductId };
  return { type: "home" };
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("vi");
  const [view, setView] = useState<View>(() => viewFromPath(window.location.pathname));
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const content = useMemo(() => (locale === "vi" ? vi : en), [locale]);

  useEffect(() => {
    const onPopState = () => setView(viewFromPath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith("#")) {
      document.querySelector(path)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.history.pushState({}, "", toHref(path));
    setView(viewFromPath(window.location.pathname));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (view.type === "product") {
    return (
      <div className="app-shell">
        <Header
          brand={content.site.brand}
          links={[{ label: locale === "vi" ? "Trang chủ" : "Home", href: toHref("/") }, { label: locale === "vi" ? "Bảng giá" : "Pricing", href: toHref("/pricing") }]}
          locale={locale}
          onToggleLocale={() => setLocale((prev) => (prev === "vi" ? "en" : "vi"))}
          homeHref={toHref("/")}
          onNavigate={(href) => navigate(toAppPath(href))}
        />
        <ProductPage
          productId={view.id}
          locale={locale}
          backHref={toHref("/")}
          pricingHref={toHref("/pricing")}
          onBack={() => navigate("/")}
          onNavigate={(href) => navigate(toAppPath(href))}
        />
        <Footer locale={locale} />
      </div>
    );
  }

  if (view.type === "pricing") {
    return (
      <div className="app-shell">
        <Header
          brand={content.site.brand}
          links={[{ label: locale === "vi" ? "Trang chủ" : "Home", href: toHref("/") }]}
          locale={locale}
          onToggleLocale={() => setLocale((prev) => (prev === "vi" ? "en" : "vi"))}
          homeHref={toHref("/")}
          onNavigate={(href) => navigate(toAppPath(href))}
        />
        <PricingPage locale={locale} userId={user?.id} />
        <Footer locale={locale} />
      </div>
    );
  }

  if (view.type === "login") {
    return (
      <div className="app-shell">
        <Header
          brand={content.site.brand}
          links={[{ label: locale === "vi" ? "Trang chủ" : "Home", href: toHref("/") }]}
          locale={locale}
          onToggleLocale={() => setLocale((prev) => (prev === "vi" ? "en" : "vi"))}
        />
        <LoginPage locale={locale} onLogin={(u) => { setUser(u); navigate("/"); }} />
        <Footer locale={locale} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Header
        brand={content.site.brand}
        links={[...content.nav, { label: locale === "vi" ? "Bảng giá" : "Pricing", href: toHref("/pricing") }]}
        locale={locale}
        onToggleLocale={() => setLocale((prev) => (prev === "vi" ? "en" : "vi"))}
        homeHref={toHref("/")}
        onNavigate={(href) => navigate(toAppPath(href))}
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
          productHref={(id) => toHref(`/products/${id}`)}
          onSelectProduct={(id) => navigate(`/products/${id}`)}
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
