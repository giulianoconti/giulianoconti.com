import type { ReactElement } from "react";
import {
  AvalancheIcon,
  CssIcon,
  DjangoIcon,
  ExternalLinkIcon,
  HtmlIcon,
  JavaScriptIcon,
  MonadIcon,
  MotionIcon,
  NextJSIcon,
  ReactIcon,
  SassIcon,
  SolanaIcon,
  SupabaseIcon,
  TailwindIcon,
  TypeScriptIcon,
  ZapIcon,
} from "../../../icons";
import { useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";
import {
  CLINIS_WEBSITE_URL,
  EXPERIENCE_CLINIS_ASSET,
  EXPERIENCE_GIANE_ASSET,
  EXPERIENCE_MATI_ASSET,
  EXPERIENCE_MERCAT_ASSET,
  EXPERIENCE_PORTAL_ASSET,
  EXPERIENCE_UWIGO_ASSET,
  EXPERIENCE_WORMHOLESCAN_ASSET,
  EXPERIENCE_XLABS_ASSET,
  GIANE_WEBSITE_URL,
  MATI_WEBSITE_URL,
  MERCAT_WEBSITE_URL,
  PORTAL_WEBSITE_URL,
  UWIGO_WEBSITE_URL,
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

interface ProjectGroupItem {
  name: string;
  tag: string;
  link: string;
  image: string;
}

interface ProjectGroup {
  name: string;
  description: string;
  technologies: Technology[];
  items: ProjectGroupItem[];
}

type ExperienceEntry = Project | CompanyEntry | ProjectGroup;

export default function Experience() {
  const { t } = useLocale();

  const EXPERIENCE: ExperienceEntry[] = [
    {
      company: t.experience.gleniCompany,
      role: t.experience.gleniRole,
      dates: t.experience.gleniDate,
    },
    {
      name: t.experience.uwigo,
      link: UWIGO_WEBSITE_URL,
      image: EXPERIENCE_UWIGO_ASSET,
      description: t.experience.uwigoDesc,
      technologies: [
        { icon: <NextJSIcon />, name: "Next.js" },
        { icon: <TypeScriptIcon />, name: "TypeScript" },
        { icon: <TailwindIcon />, name: "Tailwind" },
        { icon: <DjangoIcon />, name: "Django" },
      ],
    },
    {
      name: t.experience.mercat,
      link: MERCAT_WEBSITE_URL,
      image: EXPERIENCE_MERCAT_ASSET,
      description: t.experience.mercatDesc,
      technologies: [
        { icon: <ReactIcon />, name: "React" },
        { icon: <TypeScriptIcon />, name: "TypeScript" },
        { icon: <SassIcon />, name: "Sass" },
        { icon: <ZapIcon />, name: "Vite" },
      ],
    },
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
      name: t.experience.landings,
      description: t.experience.landingsDesc,
      technologies: [
        { icon: <HtmlIcon />, name: "HTML" },
        { icon: <CssIcon />, name: "CSS" },
        { icon: <JavaScriptIcon />, name: "JavaScript" },
      ],
      items: [
        {
          name: "Gianella Conti",
          tag: t.experience.landingGiane,
          link: GIANE_WEBSITE_URL,
          image: EXPERIENCE_GIANE_ASSET,
        },
        {
          name: "R&RG",
          tag: t.experience.landingMati,
          link: MATI_WEBSITE_URL,
          image: EXPERIENCE_MATI_ASSET,
        },
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

  // Position of each project within its company block (resets at every
  // company entry), so the image/info alternation always starts with the
  // image on the left right below each company header.
  const reversed = EXPERIENCE.map((entry, i) => {
    if ("company" in entry) return false;
    let position = 0;
    for (let j = i - 1; j >= 0 && !("company" in EXPERIENCE[j]); j--) position++;
    return position % 2 === 1;
  });

  return (
    <section className="experience" id="experience">
      <div className="experience_sticky">
        <div className="experience_sticky_row">
          <div className="experience_sticky_row_left">
            <div className="experience_sticky_row_left_container">
              <p className="experience_sticky_row_left_container_eyebrow">{t.experience.title.toUpperCase()}</p>
              <h2 className="experience_sticky_row_left_container_title">{t.experience.jobTitle}</h2>
              <p className="experience_sticky_row_left_container_bio">{t.home.bio}</p>
            </div>
          </div>
          <div className="experience_sticky_row_right_wrap">
            <div className="experience_sticky_row_right">
              {EXPERIENCE.map((experience, i) =>
                "company" in experience ? (
                  <div className="experience_sticky_row_right_info" key={experience.company}>
                    <h3 className="experience_sticky_row_right_info_company">{experience.company}</h3>
                    <p className="experience_sticky_row_right_info_role">{experience.role}</p>
                    <p className="experience_sticky_row_right_info_dates">{experience.dates}</p>
                  </div>
                ) : "items" in experience ? (
                  <div
                    className={`experience_sticky_row_right_card experience_sticky_row_right_card--group${reversed[i] ? " experience_sticky_row_right_card--reverse" : ""}`}
                    key={experience.name}
                  >
                    <div className="experience_sticky_row_right_card_link">
                      <div className="experience_sticky_row_right_card_link_group">
                        {experience.items.map(item => (
                          <a
                            className="experience_sticky_row_right_card_link_group_item"
                            href={item.link}
                            key={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <div className="experience_sticky_row_right_card_link_image">
                              <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                            </div>
                            <div className="experience_sticky_row_right_card_link_group_item_meta">
                              <span className="experience_sticky_row_right_card_link_group_item_meta_name">
                                {item.name}
                                <ExternalLinkIcon />
                              </span>
                              <span className="experience_sticky_row_right_card_link_group_item_meta_tag">
                                {item.tag}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>

                      <div className="experience_sticky_row_right_card_link_content">
                        <h4 className="experience_sticky_row_right_card_link_content_name">{experience.name}</h4>
                        <p className="experience_sticky_row_right_card_link_content_desc">{experience.description}</p>

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
                    </div>
                  </div>
                ) : (
                  <div
                    className={`experience_sticky_row_right_card${reversed[i] ? " experience_sticky_row_right_card--reverse" : ""}`}
                    key={experience.link}
                  >
                    <a
                      className="experience_sticky_row_right_card_link"
                      href={experience.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="experience_sticky_row_right_card_link_image">
                        <img src={experience.image} alt={experience.name} loading="lazy" decoding="async" />
                      </div>

                      <div className="experience_sticky_row_right_card_link_content">
                        <h4 className="experience_sticky_row_right_card_link_content_name">{experience.name}</h4>
                        <p className="experience_sticky_row_right_card_link_content_desc">{experience.description}</p>

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
            <div className="experience_sticky_row_right_fade" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
