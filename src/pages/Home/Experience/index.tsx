import type { ReactElement } from "react";
import {
  AvalancheIcon,
  MonadIcon,
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  SassIcon,
  SolanaIcon,
  TypeScriptIcon,
} from "../../../icons";
import { useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";

interface Technology {
  icon: ReactElement;
  name: string;
}

interface Project {
  name: string;
  link: string;
  image: string;
  description: string;
  technologies: Technology[];
}

interface ExperienceEntry {
  company: string;
  role: string;
  dates: string;
  projects: Project[];
}

export default function Experience() {
  const { t } = useLocale();

  const EXPERIENCE: ExperienceEntry[] = [
    {
      company: t.experience.xlabsCompany,
      role: t.experience.xlabsRole,
      dates: t.experience.xlabsDate,
      projects: [
        {
          name: t.experience.wormholescan,
          link: "https://wormholescan.io/",
          image: "/assets/experience-wormholescan.png",
          description: t.experience.wormholescanDesc,
          technologies: [
            { icon: <ReactIcon />, name: "React" },
            { icon: <TypeScriptIcon />, name: "TypeScript" },
            { icon: <SassIcon />, name: "Sass" },
            { icon: <AvalancheIcon />, name: "Blockchain" },
          ],
        },
        {
          name: t.experience.portal,
          link: "https://portalbridge.com/",
          image: "/assets/experience-portal.png",
          description: t.experience.portalDesc,
          technologies: [
            { icon: <ReactIcon />, name: "React" },
            { icon: <TypeScriptIcon />, name: "TypeScript" },
            { icon: <SassIcon />, name: "Sass" },
            { icon: <SolanaIcon />, name: "Blockchain" },
          ],
        },
        {
          name: t.experience.xlabsCompany,
          link: "https://xlabs.xyz/",
          image: "/assets/experience-xlabs.png",
          description: t.experience.xlabsDesc,
          technologies: [
            { icon: <NextJSIcon />, name: "Next.js" },
            { icon: <TypeScriptIcon />, name: "TypeScript" },
            { icon: <SassIcon />, name: "Sass" },
            { icon: <MonadIcon />, name: "Blockchain" },
            { icon: <MotionIcon />, name: "Motion" },
          ],
        },
      ],
    },
    {
      company: t.experience.freelanceCompany,
      role: t.experience.freelancerJobRole,
      dates: t.experience.freelancerJobDate,
      projects: [
        {
          name: t.experience.clinis,
          link: "https://clinis.vercel.app/",
          image: "/assets/experience-clinis.png",
          description: t.experience.clinisDesc,
          technologies: [
            { icon: <ReactIcon />, name: "React" },
            { icon: <TypeScriptIcon />, name: "TypeScript" },
            { icon: <SassIcon />, name: "Sass" },
            { icon: <MotionIcon />, name: "Motion" },
          ],
        },
      ],
    },
  ];

  return (
    <section className="experience">
      <div className="experience_sticky">
        <div className="experience_sticky_row">
          <div className="experience_sticky_row_left">
            <div className="experience_sticky_row_left_container">
              <h5 className="experience_sticky_row_left_container_eyebrow">{t.experience.title.toUpperCase()}</h5>
              <h2 className="experience_sticky_row_left_container_title">{t.experience.jobTitle}</h2>
              <a href="#footer" className="experience_sticky_row_left_container_btn">
                {t.contact.ctaButton}
                <img src="/group-1597882162.svg" alt="" className="experience_sticky_row_left_container_btn_arrow" />
              </a>
            </div>
          </div>

          <div className="experience_sticky_row_right">
            <div className="experience_sticky_row_right_grid">
              <div className="experience_sticky_row_right_grid_col">
                {EXPERIENCE.map((experience) => (
                  <div key={experience.company} className="experience_card">
                    <h3 className="experience_card_company" id="experience">
                      {experience.company}
                    </h3>
                    <p className="experience_card_role">{experience.role}</p>
                    <p className="experience_card_dates">{experience.dates}</p>

                    {experience.projects.map((project) => (
                      <div key={project.name} className="experience_card_project">
                        <a
                          className="experience_card_project_link"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="experience_card_project_link_image">
                            <img src={project.image} alt={project.name} />
                          </div>

                          <div className="experience_card_project_link_content">
                            <h4 className="experience_card_project_link_content_name">{project.name}</h4>
                            <p className="experience_card_project_link_content_desc">{project.description}</p>

                            <div className="experience_card_project_link_content_technologies">
                              {project.technologies.map((tech) => (
                                <div
                                  key={tech.name}
                                  className="experience_card_project_link_content_technologies_technology"
                                >
                                  {tech.icon}
                                  <span>{tech.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
