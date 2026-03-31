import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { useLocale } from "../../../contexts/LocaleContext.tsx";
import {
  BlenderIcon,
  CssIcon,
  FirebaseIcon,
  GithubIcon,
  MongodbIcon,
  ReactIcon,
  TailwindIcon,
  ThreejsIcon,
  WorldIcon,
} from "../../../icons";
import { PROJECTS_DATA } from "../../../utils/constants.ts";
import type { IconProps } from "../../../utils/interfaces";
import "./styles.scss";

interface IconComponent {
  (props: IconProps): ReactElement;
}

function Projects() {
  const { t } = useLocale();
  const iconMap: Record<string, IconComponent> = {
    blender: BlenderIcon,
    css: CssIcon,
    firebase: FirebaseIcon,
    mongodb: MongodbIcon,
    react: ReactIcon,
    tailwind: TailwindIcon,
    threejs: ThreejsIcon,
  };
  const nameMap = {
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
  const descMap = {
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
    <section className="projects" id="projects">
      <motion.h2
        className="projects_title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {t.projects.title}
      </motion.h2>
      <motion.div
        className="projects_container"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
      >
        {PROJECTS_DATA.map((p) => (
          <div key={p.key} className={`projects_tooltip ${p.bottom ? "projects_tooltip_bottom" : ""}`}>
            <a className="projects_tooltip_text" href={p.url} target="_blank" rel="noopener noreferrer">
              {nameMap[p.key]}
            </a>
            <div className="projects_tooltip_container">
              <div className="projects_tooltip_container_arrow"></div>
              <div className="projects_tooltip_container_content">
                <div className="projects_tooltip_container_content_image">
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <img src={p.img} loading="lazy" alt={nameMap[p.key]} />
                  </a>
                </div>
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
      </motion.div>
    </section>
  );
}

export default Projects;
