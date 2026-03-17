import { useState, useEffect } from "react";
import { useLocale, type Locale } from "./contexts/LocaleContext.tsx";
import { MenuIcon, HomeIcon, BriefcaseIcon, FolderIcon, MailIcon, LinkedInIcon, GithubIcon, InstagramIcon, WorldIcon } from "./icons";
import XlabsLogoIcon from "./icons/XlabsLogoIcon/index.tsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("nav-menu-open");
    } else {
      document.body.classList.remove("nav-menu-open");
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const setLang = (lang: Locale) => () => setLocale(lang);

  return (
    <div className="app">
      <div className="app-container">
        <nav className="nav">
          <div className="nav-container">
            <a aria-current="page" className="nav-logo" href="#home" aria-label="home">
              <img src="/assets/favicon_light.png" loading="lazy" alt="" className="nav-logo-img" />
            </a>

            <div className="nav-lang">
              <button
                type="button"
                className={locale === "en" ? "nav-lang-current" : "nav-lang-link"}
                onClick={setLang("en")}
                aria-current={locale === "en" ? "true" : undefined}
              >
                EN
              </button>
              <button
                type="button"
                className={locale === "es" ? "nav-lang-current" : "nav-lang-link"}
                onClick={setLang("es")}
                aria-current={locale === "es" ? "true" : undefined}
              >
                ES
              </button>
              <button
                type="button"
                className={locale === "pt" ? "nav-lang-current" : "nav-lang-link"}
                onClick={setLang("pt")}
                aria-current={locale === "pt" ? "true" : undefined}
              >
                PT
              </button>
            </div>

            <button
              type="button"
              className="nav-container-button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <MenuIcon />
            </button>

            <div className="nav-container-menu">
              <a className="nav-container-menu-link" href="#home" onClick={closeMenu}>
                <HomeIcon size={24} />
                <p>{t.nav.home}</p>
              </a>
              <a className="nav-container-menu-link" href="#experience" onClick={closeMenu}>
                <BriefcaseIcon size={24} />
                <p>{t.nav.experience}</p>
              </a>
              <a className="nav-container-menu-link" href="#projects" onClick={closeMenu}>
                <FolderIcon size={24} />
                <p>{t.nav.projects}</p>
              </a>
              <a className="nav-container-menu-link" href="#contact" onClick={closeMenu}>
                <MailIcon size={24} />
                <p>{t.nav.contact}</p>
              </a>
            </div>

            <div
              role="button"
              tabIndex={0}
              className="mask"
              aria-hidden="true"
              onClick={closeMenu}
              onKeyDown={(e) => e.key === "Enter" && closeMenu()}
            />
          </div>
        </nav>

        <section className="home" id="home">
          <div className="home-container">
            <div className="home-container-subheader">{t.home.subheader}</div>
            <h1 className="home-container-title">{t.home.title}</h1>
            <p className="home-container-text">{t.home.bio}</p>
            <p className="home-container-skills">{t.home.skills}</p>
            <div className="home-container-social">
              <a className="green-button" href={`/assets/Giuliano_Conti_CV-${locale}.pdf`} target="_blank" rel="noopener noreferrer">
                {t.home.resume}
              </a>
              <a href="https://www.linkedin.com/in/giulianoconti" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
                <LinkedInIcon size={24} />
              </a>
              <a href="https://github.com/giulianoconti" target="_blank" aria-label="Github" rel="noopener noreferrer">
                <GithubIcon size={24} />
              </a>
              <a href="https://www.instagram.com/giulianocontii" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
                <InstagramIcon size={24} />
              </a>
            </div>
          </div>

          <div className="waves">
            <img className="waves-blurs" src="/assets/wave-blur.webp" alt="blur background" />
            <img className="waves-sky-wave" src="/assets/wave-sky-color.svg" alt="wave sky" />
            <img className="waves-blue-wave" src="/assets/wave-blue-color.svg" alt="wave blue" />
            <img className="waves-purple-wave" src="/assets/wave-purple-color.svg" alt="wave purple" />
            <img className="waves-profile" src="/assets/wave-profile.jpg" alt="profile picture" />
          </div>
        </section>

        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <MoreProjectsSection />
        <FooterSection />
      </div>
    </div>
  );
}

function ExperienceSection() {
  const { t } = useLocale();
  return (
    <section className="experience" id="experience">
      <h2>{t.experience.title}</h2>
      <div className="experience-container">
        <div className="experience-container-company">
          <a href="https://www.xlabs.xyz" target="_blank" rel="noopener noreferrer" aria-label="xLabs link">
            <XlabsLogoIcon />
          </a>
        </div>
        <div className="experience-container-info">
          <div className="experience-container-info-header">
            <h3 className="experience-container-info-header-title">{t.experience.jobTitle}</h3>
            <h4 className="experience-container-info-header-date">
              <span>{t.experience.dateShort}</span> <span>{t.experience.dateLong}</span>
            </h4>
            <div className="experience-container-info-header-arrow"></div>
          </div>
          <div className="experience-container-info-content">
            <div className="experience-container-info-content-text">
              {t.experience.wormholescanBefore}
              <div className="tooltip">
                <a className="tooltip-text" href="https://wormholescan.io/" target="_blank" rel="noopener noreferrer">
                  Wormholescan
                </a>
                <div className="tooltip-container">
                  <div className="tooltip-container-arrow"></div>
                  <div className="tooltip-container-content">
                    <div className="tooltip-container-content-image">
                      <a href="https://wormholescan.io/" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/experience-wormholescan.webp" loading="lazy" alt="Wormholescan" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {t.experience.wormholescanAfter}
            </div>
            <div className="experience-container-info-content-text">
              {t.experience.portalBefore}
              <div className="tooltip tooltip-bottom">
                <a className="tooltip-text" href="https://portalbridge.com/" target="_blank" rel="noopener noreferrer">
                  Portal Bridge
                </a>
                <div className="tooltip-container">
                  <div className="tooltip-container-arrow"></div>
                  <div className="tooltip-container-content">
                    <div className="tooltip-container-content-image">
                      <a href="https://portalbridge.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/experience-portalbridge.webp" loading="lazy" alt="Portal Bridge" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {t.experience.portalAfter}
            </div>
            <div className="experience-container-info-content-text">
              {t.experience.xlabsBefore}
              <div className="tooltip tooltip-bottom">
                <a className="tooltip-text" href="https://www.xlabs.xyz" target="_blank" rel="noopener noreferrer">
                  xLabs website
                </a>
                <div className="tooltip-container">
                  <div className="tooltip-container-arrow"></div>
                  <div className="tooltip-container-content">
                    <div className="tooltip-container-content-image">
                      <a href="https://www.xlabs.xyz" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/experience-xlabs.webp" loading="lazy" alt="xLabs" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {t.experience.xlabsAfter}
              <a href="https://xlabs.xyz/stake/solana/" target="_blank" rel="noopener noreferrer">
                {t.experience.stakeExample}
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const { t } = useLocale();
  return (
    <section className="projects" id="projects">
      <h2 className="h2">{t.projects.title}</h2>

      <div className="projects-container">
        <a href="https://g2-devlights-bootcamp.vercel.app/juego" target="_blank" rel="noopener noreferrer" title="Website">
          <img className="projects-container-image" src="/assets/project-blackjack.png" loading="lazy" alt="blackjack" />
        </a>
        <div className="projects-container-info">
          <div className="projects-container-info-title">
            <h3>{t.projects.blackjack}</h3>
            <a href="https://github.com/giulianoconti/tp-final-devlights" target="_blank" rel="noopener noreferrer" title="Github">
              <GithubIcon size={24} />
            </a>
            <a href="https://g2-devlights-bootcamp.vercel.app/" target="_blank" rel="noopener noreferrer" title="Website">
              <WorldIcon size={24} />
            </a>
          </div>
          <p>{t.projects.blackjackDesc}</p>
          <div className="projects-container-info-tools">
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_react.svg" loading="lazy" alt="ReactJs" /> ReactJs
            </span>
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_firebase.svg" loading="lazy" alt="" /> Firebase
            </span>
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_tailwind.svg" loading="lazy" alt="" /> Tailwind
            </span>
          </div>
        </div>
      </div>

      <div className="projects-container">
        <div className="projects-container-info">
          <div className="projects-container-info-title">
            <h3>{t.projects.sokoban}</h3>
            <a href="https://github.com/giulianoconti/sokoban-reactjs" target="_blank" rel="noopener noreferrer" title="Github">
              <GithubIcon size={24} />
            </a>
            <a href="https://sokoban-giulianoconti.vercel.app/" target="_blank" rel="noopener noreferrer" title="Website">
              <WorldIcon size={24} />
            </a>
          </div>
          <p>{t.projects.sokobanDesc}</p>
          <div className="projects-container-info-tools">
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_react.svg" loading="lazy" alt="ReactJs" /> ReactJs
            </span>
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_css.svg" loading="lazy" alt="" /> CSS
            </span>
          </div>
        </div>
        <a href="https://sokoban-giulianoconti.vercel.app/" target="_blank" rel="noopener noreferrer" title="Website">
          <img className="projects-container-image" src="/assets/project-sokoban.png" loading="lazy" alt="sokoban" />
        </a>
      </div>

      <div className="projects-container">
        <a href="https://copicti.vercel.app/" target="_blank" rel="noopener noreferrer" title="Website">
          <img className="projects-container-image" src="/assets/project-copicti.png" loading="lazy" alt="copicti" />
        </a>
        <div className="projects-container-info">
          <div className="projects-container-info-title">
            <h3>{t.projects.copicti}</h3>
            <a href="https://github.com/giulianoconti/copicti" target="_blank" rel="noopener noreferrer" title="Github">
              <GithubIcon size={24} />
            </a>
            <a href="https://copicti.vercel.app/" target="_blank" rel="noopener noreferrer" title="Website">
              <WorldIcon size={24} />
            </a>
          </div>
          <p className="projects-container-info-description">{t.projects.copictiDesc}</p>
          <div className="projects-container-info-tools projects-container-info-tools-3">
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_react.svg" loading="lazy" alt="ReactJs" /> ReactJs
            </span>
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_firebase.svg" loading="lazy" alt="Firebase" /> Firebase
            </span>
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_mongodb.svg" loading="lazy" alt="MongoDB" /> MongoDB
            </span>
            <span>
              <img className="projects-container-info-tools-icon" src="/assets/icon_css.svg" loading="lazy" alt="CSS" /> CSS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { t } = useLocale();
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>{t.contact.title}</h2>
        <p>{t.contact.text}</p>
        <a className="green-button" href="https://www.linkedin.com/in/giulianoconti/" target="_blank" rel="noopener noreferrer">
          {t.contact.button}
        </a>
      </div>
      <div className="contact-container">
        <div className="contact-container-message">
          <span className="contact-container-message-text">{t.contact.message}</span>
        </div>
        <img className="contact-container-cat" src="/assets/contact-cat.webp" loading="lazy" alt="" />
        <img className="contact-container-rocket" src="/assets/contact-rocket.webp" loading="lazy" alt="" />
        <div className="contact-container-chat">
          <div className="contact-container-chat-btns">
            <div className="contact-container-chat-btns-btn"></div>
            <div className="contact-container-chat-btns-btn"></div>
            <div className="contact-container-chat-btns-btn"></div>
          </div>
          <div className="contact-container-chat-msgs">
            <div className="contact-container-chat-msgs-msg">
              <div className="contact-container-chat-msgs-msg-text">
                <div className="contact-container-chat-msgs-msg-text-icons">😄😄</div>
                <div className="contact-container-chat-msgs-msg-text-info w-6"></div>
              </div>
              <div className="contact-container-chat-msgs-msg-pic">
                <div className="contact-container-chat-msgs-msg-pic-head"></div>
                <div className="contact-container-chat-msgs-msg-pic-body"></div>
              </div>
            </div>
            <div className="contact-container-chat-msgs-msg">
              <div className="contact-container-chat-msgs-msg-pic">
                <div className="contact-container-chat-msgs-msg-pic-head"></div>
                <div className="contact-container-chat-msgs-msg-pic-body"></div>
              </div>
              <div className="contact-container-chat-msgs-msg-text">
                <div className="contact-container-chat-msgs-msg-text-info"></div>
                <div className="contact-container-chat-msgs-msg-text-icons">🌐🪄🪄</div>
              </div>
            </div>
            <div className="contact-container-chat-msgs-msg">
              <div className="contact-container-chat-msgs-msg-text">
                <div className="contact-container-chat-msgs-msg-text-icons">✅</div>
                <div className="contact-container-chat-msgs-msg-text-info"></div>
              </div>
              <div className="contact-container-chat-msgs-msg-pic">
                <div className="contact-container-chat-msgs-msg-pic-head"></div>
                <div className="contact-container-chat-msgs-msg-pic-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MoreProjectsSection() {
  const { t } = useLocale();
  const moreProjects = [
    {
      key: "portfolio3d" as const,
      url: "https://portfolio-3d-giulianoconti.vercel.app/",
      img: "/assets/more-project-portfolio3d.webp",
      icons: ["react", "css", "blender", "threejs"],
      github: "https://github.com/giulianoconti/portfolio-3d",
      bottom: false,
    },
    {
      key: "createResume" as const,
      url: "https://create-cv-s.vercel.app/",
      img: "/assets/more-project-createResume.webp",
      icons: ["react", "css"],
      github: "https://github.com/JoaGal/Create-CV",
      bottom: false,
    },
    {
      key: "removeBg" as const,
      url: "https://remoback.vercel.app/",
      img: "/assets/more-project-removeBg.webp",
      icons: ["react", "css"],
      github: "https://github.com/giulianoconti/remoback",
      bottom: false,
    },
    {
      key: "giulianNews" as const,
      url: "https://github.com/giulianoconti/tp-info-react-2022/",
      img: "/assets/more-project-news.webp",
      icons: ["react", "tailwind"],
      github: "https://github.com/giulianoconti/tp-info-react-2022",
      bottom: true,
    },
    {
      key: "pokemonFinder" as const,
      url: "https://giulianoconti.github.io/devlights-homework-2/",
      img: "/assets/more-project-pokemon.webp",
      icons: ["react", "css"],
      github: "https://github.com/giulianoconti/devlights-homework-2",
      bottom: true,
    },
    {
      key: "weatherTI" as const,
      url: "https://weather-ti.vercel.app/",
      img: "/assets/more-project-weather.webp",
      icons: ["react", "tailwind"],
      github: "https://github.com/giulianoconti/WeatherTI",
      bottom: true,
    },
  ];
  const iconMap: Record<string, string> = {
    react: "/assets/icon_react.svg",
    css: "/assets/icon_css.svg",
    tailwind: "/assets/icon_tailwind.svg",
    blender: "/assets/icon_blender.svg",
    threejs: "/assets/icon_threejs.svg",
  };
  const nameMap = {
    portfolio3d: t.moreProjects.portfolio3d,
    createResume: t.moreProjects.createResume,
    removeBg: t.moreProjects.removeBg,
    giulianNews: t.moreProjects.giulianNews,
    pokemonFinder: t.moreProjects.pokemonFinder,
    weatherTI: t.moreProjects.weatherTI,
  };
  const descMap = {
    portfolio3d: t.moreProjects.portfolio3dDesc,
    createResume: t.moreProjects.createResumeDesc,
    removeBg: t.moreProjects.removeBgDesc,
    giulianNews: t.moreProjects.giulianNewsDesc,
    pokemonFinder: t.moreProjects.pokemonFinderDesc,
    weatherTI: t.moreProjects.weatherTIDesc,
  };
  return (
    <section className="more-projects">
      <h2>{t.moreProjects.title}</h2>
      <div className="more-projects-container">
        {moreProjects.map((p) => (
          <div key={p.key} className={`tooltip ${p.bottom ? "tooltip-bottom" : ""}`}>
            <a className="tooltip-text" href={p.url} target="_blank" rel="noopener noreferrer">
              {nameMap[p.key]}
            </a>
            <div className="tooltip-container">
              <div className="tooltip-container-arrow"></div>
              <div className="tooltip-container-content">
                <div className="tooltip-container-content-image">
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <img src={p.img} loading="lazy" alt={nameMap[p.key]} />
                  </a>
                </div>
                <div className="tooltip-container-content-info">
                  <div>
                    {p.icons.map((i) => (
                      <img key={i} className="tooltip-container-content-info-icon" src={iconMap[i]} loading="lazy" alt={i} title={i} />
                    ))}
                  </div>
                  <h3 className="tooltip-container-content-info-title">{nameMap[p.key]}</h3>
                  <p className="tooltip-container-content-info-description">{descMap[p.key]}</p>
                  <div className="tooltip-container-content-info-links">
                    <a href={p.github} target="_blank" rel="noopener noreferrer" title="Github">
                      <GithubIcon size={24} />
                    </a>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" title="Website">
                      <WorldIcon size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterSection() {
  const { t } = useLocale();
  return (
    <footer className="footer">
      <a href="https://www.linkedin.com/in/giulianoconti" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
        {t.footer.name}
      </a>
      <div className="footer-social">
        <a href="https://www.linkedin.com/in/giulianoconti" target="_blank" aria-label="LinkedIn" rel="noopener noreferrer">
          <LinkedInIcon size={24} />
        </a>
        <a href="https://github.com/giulianoconti" target="_blank" aria-label="Github" rel="noopener noreferrer">
          <GithubIcon size={24} />
        </a>
        <a href="https://www.instagram.com/giulianocontii" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
          <InstagramIcon size={24} />
        </a>
      </div>
    </footer>
  );
}

export default App;
