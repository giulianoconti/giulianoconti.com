import type { ReactElement } from "react";
import { useLocale } from "../../../contexts/LocaleContext.tsx";
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
import CopyEmailButton from "../../atoms/CopyEmailButton/index.tsx";
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
  const { t } = useLocale();

  const nameMap: Record<string, string> = {
    blackjack: t.projects.blackjack,
    sokoban: t.projects.sokoban,
    copicti: t.projects.copicti,
    portfolio3d: t.projects.portfolio3d,
    createResume: t.projects.createResume,
    removeBg: t.projects.removeBg,
    giulianNews: t.projects.giulianNews,
    pokemonFinder: t.projects.pokemonFinder,
    weatherTI: t.projects.weatherTI,
  };

  const descMap: Record<string, string> = {
    blackjack: t.projects.blackjackDesc,
    sokoban: t.projects.sokobanDesc,
    copicti: t.projects.copictiDesc,
    portfolio3d: t.projects.portfolio3dDesc,
    createResume: t.projects.createResumeDesc,
    removeBg: t.projects.removeBgDesc,
    giulianNews: t.projects.giulianNewsDesc,
    pokemonFinder: t.projects.pokemonFinderDesc,
    weatherTI: t.projects.weatherTIDesc,
  };

  return (
    <footer className="footer" id="footer">
      <div className="footer_col">
        <a href="#home" className="footer_col_logo">
          <img alt="Logo" className="footer_col_logo_img" height={48} src="/assets/favicon_light.png" width={48} />
        </a>
      </div>

      <div className="footer_grid">
        <div className="projects">
          <h4 className="footer_grid_projects_title">{t.projects.title}</h4>

          {PROJECTS_DATA.map((p) => (
            <div className="projects_tooltip" key={p.key}>
              <a className="projects_tooltip_text" href={p.url} target="_blank" rel="noopener noreferrer">
                <div className="projects_tooltip_text_arrow" />
                {nameMap[p.key]}
              </a>
              <div className="projects_tooltip_container">
                <div className="projects_tooltip_container_content">
                  <a
                    className="projects_tooltip_container_content_image"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={p.img} loading="lazy" alt={nameMap[p.key]} />
                  </a>

                  <div className="projects_tooltip_container_content_info">
                    <div>
                      {p.icons.map((i) => {
                        const IconComponent = iconMap[i];
                        return (
                          <IconComponent
                            key={i}
                            className="projects_tooltip_container_content_info_icon"
                            aria-label={i}
                          />
                        );
                      })}
                    </div>
                    <h3 className="projects_tooltip_container_content_info_title">{nameMap[p.key]}</h3>
                    <p className="projects_tooltip_container_content_info_description">{descMap[p.key]}</p>
                    <div className="projects_tooltip_container_content_info_links">
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

      <div className="footer_col">
        <h4 className="footer_col_title">{t.footer.social}</h4>

        <a
          className="hero_main_center_actions_link"
          href={SOCIAL_LINKEDIN_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <LinkedInIcon />
        </a>

        <a className="hero_main_center_actions_link" href={SOCIAL_GITHUB_URL} rel="noopener noreferrer" target="_blank">
          <GithubIcon />
        </a>

        <a
          className="hero_main_center_actions_link"
          href={SOCIAL_INSTAGRAM_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          <InstagramIcon />
        </a>

        <a className="footer_link" href={`mailto:${SOCIAL_MAIL}`} target="_blank" rel="noopener noreferrer">
          {SOCIAL_MAIL}
        </a>
      </div>
    </footer>
  );
}
