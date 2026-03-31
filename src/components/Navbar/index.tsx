import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, type Locale } from "../../contexts/LocaleContext.tsx";
import { MenuIcon } from "../../icons";
import { ASSET_FAVICON_LIGHT } from "../../utils/constants.ts";
import "./styles.scss";

const SECTION_IDS = ["home", "experience", "projects", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const { locale, setLocale, t } = useLocale();
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 64], ["5rem", "3.5rem"]);
  const backdropFilter = useTransform(navHeight, (height) => (height !== "5rem" ? "blur(80px)" : "none"));

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("navbar_menu_open");
    } else {
      document.body.classList.remove("navbar_menu_open");
    }
  }, [menuOpen]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter((section): section is HTMLElement =>
      Boolean(section),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;

        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const nextId = visibleEntries[0]?.target.id as SectionId | undefined;
        if (nextId && SECTION_IDS.includes(nextId)) {
          setActiveSection(nextId);
        }
      },
      {
        // section is considered active when it crosses viewport middle band
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const syncFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (SECTION_IDS.includes(hashId as SectionId)) {
        setActiveSection(hashId as SectionId);
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const setLang = (lang: Locale) => () => setLocale(lang);
  const handleNavigate = (sectionId: SectionId) => () => {
    setActiveSection(sectionId);
    closeMenu();
  };

  return (
    <motion.nav className="navbar" style={{ height: navHeight, backdropFilter: backdropFilter }}>
      <div className="navbar_container">
        <a aria-current="page" className="navbar_logo" href="#home" aria-label="home" onClick={handleNavigate("home")}>
          <img src={ASSET_FAVICON_LIGHT} loading="lazy" alt="" className="navbar_logo_img" />
        </a>

        <div className="navbar_lang">
          <button
            type="button"
            className={locale === "en" ? "navbar_lang_current" : "navbar_lang_link"}
            onClick={setLang("en")}
            aria-current={locale === "en" ? "true" : undefined}
          >
            EN
          </button>
          <button
            type="button"
            className={locale === "es" ? "navbar_lang_current" : "navbar_lang_link"}
            onClick={setLang("es")}
            aria-current={locale === "es" ? "true" : undefined}
          >
            ES
          </button>
          <button
            type="button"
            className={locale === "pt" ? "navbar_lang_current" : "navbar_lang_link"}
            onClick={setLang("pt")}
            aria-current={locale === "pt" ? "true" : undefined}
          >
            PT
          </button>
        </div>

        <button
          type="button"
          className="navbar_menu_button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <MenuIcon />
        </button>

        <div className="navbar_menu">
          <a
            className={`navbar_menu_link${activeSection === "home" ? " navbar_menu_link_active" : ""}`}
            href="#home"
            onClick={handleNavigate("home")}
          >
            {t.nav.home}
          </a>
          <a
            className={`navbar_menu_link${activeSection === "experience" ? " navbar_menu_link_active" : ""}`}
            href="#experience"
            onClick={handleNavigate("experience")}
          >
            {t.nav.experience}
          </a>
          <a
            className={`navbar_menu_link${activeSection === "contact" ? " navbar_menu_link_active" : ""}`}
            href="#contact"
            onClick={handleNavigate("contact")}
          >
            {t.nav.contact}
          </a>
          <a
            className={`navbar_menu_link${activeSection === "projects" ? " navbar_menu_link_active" : ""}`}
            href="#projects"
            onClick={handleNavigate("projects")}
          >
            {t.nav.projects}
          </a>
        </div>

        <div
          role="button"
          tabIndex={0}
          className="navbar_mask"
          aria-hidden="true"
          onClick={closeMenu}
          onKeyDown={(e) => e.key === "Enter" && closeMenu()}
        />
      </div>
    </motion.nav>
  );
}

export default Navbar;
