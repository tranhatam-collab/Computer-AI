import type { NavLink } from "@iai/contracts";
import type { MouseEvent } from "react";

interface HeaderProps {
  brand: string;
  links: NavLink[];
  locale: "vi" | "en";
  onToggleLocale: () => void;
  homeHref?: string;
  onNavigate?: (href: string) => void;
  user?: { id: string; email: string; name: string } | null;
  onLogout?: () => void;
}

export function Header({ brand, links, locale, onToggleLocale, homeHref = "/", onNavigate, user, onLogout }: HeaderProps) {
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
        <div className="header-actions">
          {user ? (
            <div className="header-user">
              <span className="user-name">{user.name || user.email}</span>
              <button className="btn btn-sm btn-ghost" onClick={onLogout}>
                {locale === "vi" ? "Thoát" : "Logout"}
              </button>
            </div>
          ) : (
            <a className="btn btn-sm btn-primary" href="/login" onClick={handleNavigate("/login")}>
              {locale === "vi" ? "Đăng nhập" : "Sign in"}
            </a>
          )}
          <button className="locale-btn" onClick={onToggleLocale}>
            {locale === "vi" ? "EN" : "VI"}
          </button>
        </div>
      </div>
    </header>
  );
}
