import { Locale, useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";

export default function Navbar() {
  const { locale, setLocale, t } = useLocale();

  const setLang = (lang: Locale) => () => setLocale(lang);

  return (
    <nav className="nav">
      <div className="nav_inner">
        <a href="#home" className="nav_inner_logo">
          <img alt="Logo" className="nav_inner_logo_img" height={48} src="/assets/favicon_light.png" width={48} />
        </a>

        <ul className="nav_inner_links">
          <li>
            <a href="#about">{t.nav.about}</a>
          </li>
          <li>
            <a href="#experience">{t.nav.experience}</a>
          </li>
          <li>
            <a href="#contact">{t.nav.contact}</a>
          </li>
        </ul>

        <div className="nav_lang">
          <button
            aria-current={locale === "en" ? "true" : undefined}
            className={`nav_lang_link ${locale === "en" ? "nav_lang_current" : ""}`}
            onClick={setLang("en")}
            type="button"
          >
            EN
          </button>
          <button
            aria-current={locale === "es" ? "true" : undefined}
            className={`nav_lang_link ${locale === "es" ? "nav_lang_current" : ""}`}
            onClick={setLang("es")}
            type="button"
          >
            ES
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
      </div>
    </nav>
  );
}
