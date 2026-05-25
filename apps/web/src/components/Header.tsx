import type { NavLink } from "@iai/contracts";
import type { MouseEvent } from "react";

interface HeaderProps {
  brand: string;
  links: NavLink[];
  locale: "vi" | "en";
  onToggleLocale: () => void;
  homeHref?: string;
  onNavigate?: (href: string) => void;
}

export function Header({ brand, links, locale, onToggleLocale, homeHref = "/", onNavigate }: HeaderProps) {
  const handleNavigate = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || href.startsWith("#")) return;
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href={homeHref} onClick={handleNavigate(homeHref)}>{brand}</a>
        <nav className="nav">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavigate(link.href)}>{link.label}</a>
          ))}
        </nav>
        <button className="locale-btn" onClick={onToggleLocale}>
          {locale === "vi" ? "EN" : "VI"}
        </button>
      </div>
    </header>
  );
}
