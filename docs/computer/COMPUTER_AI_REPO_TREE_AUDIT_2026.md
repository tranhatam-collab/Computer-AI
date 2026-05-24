# COMPUTER AI — REPO TREE AUDIT 2026

**Date:** 2026-05-24  
**Repo:** `git@github.com:tranhatam-collab/Computer-AI.git`  
**Branch:** `main`  
**Commit:** `fe5fb6f`  
**Workspace Root:** `/Users/tranhatam/Documents/Devnewproject/Computer.iai.one`

---

## 1. FULL REPO TREE

```
Computer.iai.one/
├── README.md                              # 233 B — project overview
├── package.json                           # 208 B — monorepo root (scripts: web:dev, mobile:start)
├── pnpm-workspace.yaml                    # 36 B  — apps/*, packages/*
├── .gitignore                             # 34 B  — node_modules, dist, .DS_Store
│
├── apps/
│   ├── web/                               # Vite + React 18 + TS
│   │   ├── package.json                   # 484 B — react, react-dom, @iai/contracts (workspace:*)
│   │   ├── vite.config.ts                 # 160 B — @vitejs/plugin-react, base: "/Computer-AI/"
│   │   ├── tsconfig.json                  # 381 B — target ES2020, bundler moduleResolution
│   │   ├── index.html                     # 1.4 KB — OG, Twitter, canonical, meta keywords
│   │   ├── src/
│   │   │   ├── main.tsx                   # entry → <App/>
│   │   │   ├── App.tsx                    # root component — 6 sections (hero, products, compare, how, trust, faq)
│   │   │   ├── styles.css                 # 4.8 KB — dark theme, custom properties, responsive, hover
│   │   │   ├── components/
│   │   │   │   ├── Header.tsx             # logo + nav + locale toggle (bilingual)
│   │   │   │   ├── Hero.tsx               # hero section + P1 focus card (bilingual)
│   │   │   │   ├── ProductGrid.tsx        # 2-col grid, tier labels, chips, i18n copy
│   │   │   │   ├── CompareStrip.tsx       # 5-column product comparison (bilingual)
│   │   │   │   ├── Section.tsx            # generic section wrapper
│   │   │   │   └── Footer.tsx             # brand + nav links + tagline (bilingual)
│   │   │   ├── data/
│   │   │   │   ├── vi.ts                  # Vietnamese content — site, hero, products, compare, how, trust, faq
│   │   │   │   └── en.ts                  # English content — parallel structure
│   │   │   └── lib/
│   │   │       └── products.ts            # 5 product definitions (id, name, highlights, tier)
│   │   └── public/
│   │       ├── robots.txt                 # Allow all + sitemap reference
│   │       └── sitemap.xml                # 4 URLs
│   │
│   └── mobile/                            # Expo + React Native 0.74 + TS
│       ├── package.json                   # 347 B — expo ~51, react-native 0.74, typescript
│       ├── app.json                       # 606 B — icon, splash, ios/android/web config
│       ├── tsconfig.json                  # extends expo/tsconfig.base
│       ├── babel.config.js                # babel-preset-expo
│       ├── App.tsx                        # 3.5 KB — single-screen: shell selector, locale toggle
│       ├── src/
│       │   ├── data/
│       │   │   ├── vi.ts                  # Vietnamese: appTitle, subtitle, sections
│       │   │   └── en.ts                  # English: parallel structure
│       │   └── products.ts                # 5 productShells (free, creator, sales, finance, enterprise)
│       └── assets/
│           ├── icon.png                   # placeholder (1×1, #2f6bff)
│           ├── splash.png                 # placeholder (1×1, #0b0f14)
│           ├── adaptive-icon.png          # placeholder (1×1, #2f6bff)
│           └── favicon.png                # placeholder (1×1, #2f6bff)
│
├── packages/
│   └── contracts/                         # @iai/contracts
│       ├── package.json                   # 230 B — main/types pointed to src/
│       └── src/
│           ├── index.ts                   # barrel export
│           ├── product.ts                 # ProductId (12 values), ProductCard interface
│           ├── content.ts                 # NavLink, HeroContent
│           └── output.ts                  # VerificationState, OutputArtifact
│
├── content/                               # empty (redundant — removed in earlier session, dir kept)
├── logs/                                  # empty
├── scripts/                               # empty
├── tools/                                 # empty
└── node_modules/                          # installed
```

**Total tracked files (excl. node_modules, .git):** ~40 files

---

## 2. PACKAGE INVENTORY

| Package | Version | Type | Status |
|---------|---------|------|--------|
| `computer-iai-one-monorepo` (root) | 0.1.0 | root | ✅ Workspace defined |
| `computer-iai-web` | 0.1.0 | app | ✅ Build pass, dev server OK |
| `computer-iai-mobile` | 0.1.0 | app | ✅ deps installed, TSC pass |
| `@iai/contracts` | 0.1.0 | lib | ✅ Exists, linked to web |

---

## 3. APP INVENTORY

### Web (`apps/web`)

| Aspect | Detail |
|--------|--------|
| Framework | Vite 5.4.21 + React 18.3 + TypeScript 5.9 |
| Languages | VI / EN (bilingual) |
| Sections | Hero, Products(5), Compare, HowItWorks, Trust, FAQ |
| SEO | OG, Twitter, canonical, sitemap, robots |
| Responsive | Yes (960px breakpoint) |
| CI/CD | GitHub Pages (gh-pages branch) |
| URL | `https://tranhatam-collab.github.io/Computer-AI/` |
| Build | 40 modules, ~350ms, 154 KB JS + 4 KB CSS |

### Mobile (`apps/mobile`)

| Aspect | Detail |
|--------|--------|
| Framework | Expo 51 + React Native 0.74 + TypeScript |
| Languages | VI / EN (bilingual) |
| UI | Single-screen: shell selector, locale toggle, product shell items |
| Assets | Placeholder icon/splash (need replacement) |
| TSC | Pass (exit 0) |

---

## 4. FILE CLASSIFICATION

### Core (must keep)

| File | Reason |
|------|--------|
| `apps/web/` | Primary frontend — catalog homepage |
| `apps/mobile/` | Mobile command center starter |
| `packages/contracts/` | Shared types for web + future expansion |
| `pnpm-workspace.yaml` | Workspace definition |
| `package.json` | Monorepo root scripts |
| `.gitignore` | Standard ignores |

### Placeholder / needs replacement

| File | Reason |
|------|--------|
| `apps/mobile/assets/*.png` | 1×1 placeholder — needs real 1024×1024 icon/splash |
| `apps/web/public/sitemap.xml` | 4 URLs — needs real product pages |
| `apps/web/public/robots.txt` | Basic — fine for now |

### Empty / unused

| Directory | Status |
|-----------|--------|
| `content/` | Empty — can remove |
| `logs/` | Empty — can remove |
| `scripts/` | Empty — can populate later |
| `tools/` | Empty — can populate later |

---

## 5. KEY FINDINGS

1. **Repo is a frontend-focused monorepo** — web + mobile shells with shared contracts
2. **No backend runtime** — no API, no workers, no database, no agent routing
3. **No product system** — products are static data, not a registry with entitlements
4. **No mobile app** — exists as code but not published/tested on device
5. **Contracts are type-only** — no runtime validation, no SDK, no client libraries
6. **No AI layer** — no command routing, no lane engine, no model selection
7. **No security/governance** — no authentication, no authorization, no audit

---

*End of audit #1 — Repo Tree Audit*
