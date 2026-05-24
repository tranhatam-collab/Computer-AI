import type { NavLink } from "@iai/contracts";

interface HeaderProps {
  brand: string;
  links: NavLink[];
  locale: "vi" | "en";
  onToggleLocale: () => void;
}

export function Header({ brand, links, locale, onToggleLocale }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#home">{brand}</a>
        <nav className="nav">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <button className="locale-btn" onClick={onToggleLocale}>
          {locale === "vi" ? "EN" : "VI"}
        </button>
      </div>
    </header>
  );
}
