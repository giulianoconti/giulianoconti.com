import type { ReactElement } from "react";
import {
  AvalancheIcon,
  MonadIcon,
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  SassIcon,
  SolanaIcon,
  SupabaseIcon,
  TypeScriptIcon,
} from "../../../icons";
import { useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";
import {
  CLINIS_WEBSITE_URL,
  EXPERIENCE_CLINIS_ASSET,
  EXPERIENCE_PORTAL_ASSET,
  EXPERIENCE_WORMHOLESCAN_ASSET,
  EXPERIENCE_XLABS_ASSET,
  PORTAL_WEBSITE_URL,
  WORMHOLESCAN_WEBSITE_URL,
  XLABS_WEBSITE_URL,
} from "../../../utils/constants";

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

interface CompanyEntry {
  company: string;
  role: string;
  dates: string;
}

type ExperienceEntry = Project | CompanyEntry;

export default function Experience() {
  const { t } = useLocale();

  const EXPERIENCE: ExperienceEntry[] = [
    {
      company: t.experience.freelanceCompany,
      role: t.experience.freelancerJobRole,
      dates: t.experience.freelancerJobDate,
    },
    {
      name: t.experience.clinis,
      link: CLINIS_WEBSITE_URL,
      image: EXPERIENCE_CLINIS_ASSET,
      description: t.experience.clinisDesc,
      technologies: [
        { icon: <ReactIcon />, name: "React" },
        { icon: <TypeScriptIcon />, name: "TypeScript" },
        { icon: <SupabaseIcon />, name: "Supabase" },
        { icon: <SassIcon />, name: "Sass" },
        { icon: <MotionIcon />, name: "Motion" },
      ],
    },
    {
      company: t.experience.xlabsCompany,
      role: t.experience.xlabsRole,
      dates: t.experience.xlabsDate,
    },
    {
      name: t.experience.wormholescan,
      link: WORMHOLESCAN_WEBSITE_URL,
      image: EXPERIENCE_WORMHOLESCAN_ASSET,
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
      link: PORTAL_WEBSITE_URL,
      image: EXPERIENCE_PORTAL_ASSET,
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
      link: XLABS_WEBSITE_URL,
      image: EXPERIENCE_XLABS_ASSET,
      description: t.experience.xlabsDesc,
      technologies: [
        { icon: <NextJSIcon />, name: "Next.js" },
        { icon: <TypeScriptIcon />, name: "TypeScript" },
        { icon: <SassIcon />, name: "Sass" },
        { icon: <MonadIcon />, name: "Blockchain" },
        { icon: <MotionIcon />, name: "Motion" },
      ],
    },
  ];

  return (
    <section className="experience" id="experience">
      <div className="experience_sticky">
        <div className="experience_sticky_row">
          <div className="experience_sticky_row_left">
            <div className="experience_sticky_row_left_container">
              <h5 className="experience_sticky_row_left_container_eyebrow">
                {t.experience.title.toUpperCase()}
              </h5>
              <h2 className="experience_sticky_row_left_container_title">
                {t.experience.jobTitle}
              </h2>
              <p className="experience_sticky_row_left_container_bio">{t.home.bio}</p>
            </div>
          </div>
          <div className="experience_sticky_row_right">
            {EXPERIENCE.map(experience =>
              "company" in experience ? (
                <div className="experience_sticky_row_right_info" key={experience.company}>
                  <h3 className="experience_sticky_row_right_info_company">{experience.company}</h3>
                  <p className="experience_sticky_row_right_info_role">{experience.role}</p>
                  <p className="experience_sticky_row_right_info_dates">{experience.dates}</p>
                </div>
              ) : (
                <div className="experience_sticky_row_right_card" key={experience.link}>
                  <a
                    className="experience_sticky_row_right_card_link"
                    href={experience.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="experience_sticky_row_right_card_link_image">
                      <img src={experience.image} alt={experience.name} />
                    </div>

                    <div className="experience_sticky_row_right_card_link_content">
                      <h4 className="experience_sticky_row_right_card_link_content_name">
                        {experience.name}
                      </h4>
                      <p className="experience_sticky_row_right_card_link_content_desc">
                        {experience.description}
                      </p>

                      <div className="experience_sticky_row_right_card_link_content_technologies">
                        {experience.technologies.map(tech => (
                          <div
                            key={tech.name}
                            className="experience_sticky_row_right_card_link_content_technologies_technology"
                          >
                            {tech.icon}
                            <span>{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </a>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
