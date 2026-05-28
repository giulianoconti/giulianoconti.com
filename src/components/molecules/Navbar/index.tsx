import { useState, useEffect } from "react";
import { Locale, useLocale } from "../../../contexts/LocaleContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLiteMode } from "../../../contexts/LiteModeContext";
import { trackLanguageChange } from "../../../utils/analytics";
import "./styles.scss";

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { liteMode, toggleLiteMode } = useLiteMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const setLang = (lang: Locale) => () => {
    setLocale(lang);
    trackLanguageChange(lang);
    setMenuOpen(false);
  };

  const navLinks = [
    { href: "#experience", label: t.nav.experience },
    { href: "#proceso", label: t.nav.services },
    { href: "#precios", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <nav className="nav">
      <div className="nav_inner">
        <a href="#home" className="nav_inner_logo">
          <img alt="Logo" className="nav_inner_logo_img" src={theme === "light" ? "/assets/favicon_light.svg" : "/assets/favicon_dark.svg"} height={32} width={32} />
        </a>

        <ul className="nav_inner_links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav_right">
          {/* <button
            className="nav_theme"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            {theme === "dark" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button> */}

          <div className="nav_lang">
            <button aria-current={locale === "es" ? "true" : undefined} className={`nav_lang_link ${locale === "es" ? "nav_lang_current" : ""}`} onClick={setLang("es")} type="button">
              ES
            </button>
            <button aria-current={locale === "en" ? "true" : undefined} className={`nav_lang_link ${locale === "en" ? "nav_lang_current" : ""}`} onClick={setLang("en")} type="button">
              EN
            </button>
            <button aria-current={locale === "pt" ? "true" : undefined} className={`nav_lang_link ${locale === "pt" ? "nav_lang_current" : ""}`} onClick={setLang("pt")} type="button">
              PT
            </button>
          </div>

          <button className={`nav_lite${liteMode ? " nav_lite--active" : ""}`} onClick={toggleLiteMode} aria-label={liteMode ? "Disable lite mode" : "Enable lite mode"} aria-pressed={liteMode} type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav_mobile">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}

          <div className="nav_mobile_lang">
            {(["en", "es", "pt"] as Locale[]).map((l) => (
              <button key={l} className={`nav_lang_link ${locale === l ? "nav_lang_current" : ""}`} onClick={setLang(l)} type="button">
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
