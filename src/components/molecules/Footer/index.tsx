import type { ReactElement } from "react";
import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { trackProjectClick, trackSocialClick } from "../../../utils/analytics.ts";
import {
  BlenderIcon,
  CssIcon,
  FirebaseIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MongodbIcon,
  ReactIcon,
  TailwindIcon,
  ThreejsIcon,
  WorldIcon,
} from "../../../icons/index.ts";
import {
  PROJECTS_DATA,
  SOCIAL_GITHUB_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_MAIL,
} from "../../../utils/constants.ts";
import type { IconProps } from "../../../utils/interfaces.ts";
import "./styles.scss";

interface IconComponent {
  (props: IconProps): ReactElement;
}

const iconMap: Record<string, IconComponent> = {
  blender: BlenderIcon,
  css: CssIcon,
  firebase: FirebaseIcon,
  mongodb: MongodbIcon,
  react: ReactIcon,
  tailwind: TailwindIcon,
  threejs: ThreejsIcon,
};

export default function Footer() {
  const { t, locale } = useLocale();

  const projectMap: Record<string, { name: string; desc: string }> = {
    blackjack: { name: t.projects.blackjack, desc: t.projects.blackjackDesc },
    sokoban: { name: t.projects.sokoban, desc: t.projects.sokobanDesc },
    copicti: { name: t.projects.copicti, desc: t.projects.copictiDesc },
    portfolio3d: { name: t.projects.portfolio3d, desc: t.projects.portfolio3dDesc },
    createResume: { name: t.projects.createResume, desc: t.projects.createResumeDesc },
    removeBg: { name: t.projects.removeBg, desc: t.projects.removeBgDesc },
    giulianNews: { name: t.projects.giulianNews, desc: t.projects.giulianNewsDesc },
    pokemonFinder: { name: t.projects.pokemonFinder, desc: t.projects.pokemonFinderDesc },
    weatherTI: { name: t.projects.weatherTI, desc: t.projects.weatherTIDesc },
  };

  return (
    <footer className="footer" id="footer">
      <a href="#home" className="footer_logo">
        <img alt="Logo" className="footer_logo_img" height={48} src="/assets/favicon_dark.svg" width={48} />
      </a>

      <div className="footer_grid">
        <div className="footer_grid_projects">
          <h4 className="footer_grid_projects_title">{t.projects.title}</h4>

          {PROJECTS_DATA.map((p) => (
            <div className="footer_grid_projects_tooltip" key={p.key}>
              <a
                className="footer_grid_projects_tooltip_text"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectClick(p.key, locale)}
              >
                <div className="footer_grid_projects_tooltip_text_arrow" />
                {projectMap[p.key].name}
              </a>
              <div className="footer_grid_projects_tooltip_container">
                <div className="footer_grid_projects_tooltip_container_content">
                  <a
                    className="footer_grid_projects_tooltip_container_content_image"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={p.img} loading="lazy" alt={projectMap[p.key].name} />
                  </a>

                  <div className="footer_grid_projects_tooltip_container_content_info">
                    <div>
                      {p.icons.map((i) => {
                        const IconComponent = iconMap[i];
                        return (
                          <IconComponent
                            key={i}
                            className="footer_grid_projects_tooltip_container_content_info_icon"
                            aria-label={i}
                          />
                        );
                      })}
                    </div>
                    <h3 className="footer_grid_projects_tooltip_container_content_info_title">
                      {projectMap[p.key].name}
                    </h3>
                    <p className="footer_grid_projects_tooltip_container_content_info_description">
                      {projectMap[p.key].desc}
                    </p>
                    <div className="footer_grid_projects_tooltip_container_content_info_links">
                      <a href={p.github} target="_blank" rel="noopener noreferrer" title="Github">
                        <GithubIcon />
                      </a>
                      <a href={p.url} target="_blank" rel="noopener noreferrer" title="Website">
                        <WorldIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer_bottom">
        <a className="footer_bottom_mail" href={`mailto:${SOCIAL_MAIL}`} target="_blank" rel="noopener noreferrer">
          {SOCIAL_MAIL}
        </a>

        <a
          className="footer_bottom_link"
          href={SOCIAL_LINKEDIN_URL}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => trackSocialClick("linkedin", "footer")}
        >
          <LinkedInIcon />
        </a>

        <a
          className="footer_bottom_link"
          href={SOCIAL_GITHUB_URL}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => trackSocialClick("github", "footer")}
        >
          <GithubIcon />
        </a>

        <a
          className="footer_bottom_link"
          href={SOCIAL_INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => trackSocialClick("instagram", "footer")}
        >
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
}
