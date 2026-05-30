import { useState, useEffect } from "react";
import { Locale, useLocale } from "../../../contexts/LocaleContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLiteMode } from "../../../contexts/LiteModeContext";
import { trackLanguageChange } from "../../../utils/analytics";
import "./styles.scss";
import { RayIcon, SunIcon, ZapIcon } from "../../../icons";

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
    { href: "#process", label: t.nav.services },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <nav className="nav">
      <div className="nav_inner">
        <a href="#home" className="nav_inner_logo">
          <img
            alt="Logo"
            className="nav_inner_logo_img"
            src={theme === "light" ? "/assets/favicon_light.svg" : "/assets/favicon_dark.svg"}
            height={32}
            width={32}
          />
        </a>

        <ul className="nav_inner_links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav_right">
          <button
            className="nav_theme nav_tooltip"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            data-tooltip={theme === "dark" ? t.nav.tooltipLight : t.nav.tooltipDark}
            type="button"
          >
            {theme === "dark" ? <SunIcon /> : <RayIcon />}
          </button>

          <div className="nav_lang">
            <button
              aria-current={locale === "es" ? "true" : undefined}
              className={`nav_lang_link ${locale === "es" ? "nav_lang_current" : ""}`}
              onClick={setLang("es")}
              type="button"
            >
              ES
            </button>
            <button
              aria-current={locale === "en" ? "true" : undefined}
              className={`nav_lang_link ${locale === "en" ? "nav_lang_current" : ""}`}
              onClick={setLang("en")}
              type="button"
            >
              EN
            </button>
            <button
              aria-current={locale === "pt" ? "true" : undefined}
              className={`nav_lang_link ${locale === "pt" ? "nav_lang_current" : ""}`}
              onClick={setLang("pt")}
              type="button"
            >
              PT
            </button>
          </div>

          <button
            className={`nav_lite nav_tooltip${liteMode ? " nav_lite--active" : ""}`}
            onClick={toggleLiteMode}
            aria-label={liteMode ? "Disable lite mode" : "Enable lite mode"}
            aria-pressed={liteMode}
            data-tooltip={liteMode ? t.nav.tooltipLiteOff : t.nav.tooltipLiteOn}
            type="button"
          >
            <ZapIcon width={16} height={16} />
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
            {(["en", "es", "pt"] as Locale[]).map(l => (
              <button
                key={l}
                className={`nav_lang_link ${locale === l ? "nav_lang_current" : ""}`}
                onClick={setLang(l)}
                type="button"
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
