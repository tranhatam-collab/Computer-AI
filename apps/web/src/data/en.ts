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

const t = buildProductCopy("en");

export default {
  "site": {
    "brand": "IAI Computer",
    "title": "Do not build your own AI computer. Choose the right one and start working.",
    "description": "computer.iai.one is a catalog of prebuilt AI computers by package.",
    "language": "en"
  },
  "nav": [
    { "label": "Home", "href": "#home" },
    { "label": "Products", "href": "#products" },
    { "label": "Compare", "href": "#compare" },
    { "label": "Sales", "href": "/lanes/sales" },
    { "label": "Finance", "href": "/lanes/finance" },
    { "label": "Enterprise", "href": "/lanes/enterprise" },
    { "label": "FAQ", "href": "#faq" }
  ],
  "hero": {
    "eyebrow": "Prebuilt AI computers by package",
    "title": "Do not build your own AI computer. Choose the right one and start working.",
    "subtitle": "From personal and creative work to business, sales, finance, and studio operations.",
    "primaryCta": "See launch products",
    "secondaryCta": "See how it works"
  },
  "products": {
    "title": "Launch products",
    "gridTitle": "12 AI computer products"
  },
  "compare": {
    "title": "Quick compare",
    "subtitle": "Clear enough to choose the right package."
  },
  productCopy: t,
  "howItWorks": {
    "title": "How it works",
    "items": [
      "Choose the AI Computer that fits your job",
      "Sign in to the product shell you purchased",
      "Command, track, approve, and receive outputs",
      "Upgrade only when you need more lanes, quota, or control"
    ]
  },
  "trust": {
    "title": "Why this model is better",
    "items": [
      "Users do not need to assemble runtimes or workflows",
      "Each package has clear UI, entitlements, and limits",
      "Approvals, quotas, and audit are easier to govern",
      "Mobile becomes a control center instead of a mini desktop"
    ]
  },
  "faq": {
    "title": "Frequently asked questions",
    "items": [
      { "q": "Is this a tool for building custom AI computers?", "a": "No. It is a system of prebuilt AI computers sold as distinct packages." },
      { "q": "Will I see the entire system?", "a": "No. You only see the product shell attached to your purchased package." },
      { "q": "What is the mobile app for?", "a": "The mobile app is a Mobile Command Center for command, monitoring, approval, and results." }
    ]
  }
};
