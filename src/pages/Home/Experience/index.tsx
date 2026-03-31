import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { motion } from "framer-motion";
import {
  CLINIS_GITHUB_URL,
  CLINIS_WEBSITE_URL,
  EXPERIENCE_CLINIS_ASSET,
  EXPERIENCE_PORTAL_ASSET,
  EXPERIENCE_WORMHOLESCAN_ASSET,
  EXPERIENCE_XLABS_ASSET,
  PORTAL_GITHUB_URL,
  PORTAL_WEBSITE_URL,
  WORMHOLESCAN_GITHUB_URL,
  WORMHOLESCAN_WEBSITE_URL,
  XLABS_GITHUB_URL,
  XLABS_WEBSITE_URL,
} from "../../../utils/constants.ts";
import {
  GithubIcon,
  WorldIcon,
  ReactIcon,
  SassIcon,
  NextJSIcon,
  SolanaIcon,
  MonadIcon,
  TypeScriptIcon,
  MotionIcon,
  XlabsLogoIcon,
} from "../../../icons";
import IconLink from "../../../components/IconLink";
import AvalancheIcon from "../../../icons/AvalancheIcon/index.tsx";
import "./styles.scss";

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Experience() {
  const { t } = useLocale();

  return (
    <section className="experience" id="experience">
      <motion.h2
        className="experience_title"
        initial="hidden"
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        variants={revealUp}
        viewport={{ once: true, amount: 0.15 }}
        whileInView="visible"
      >
        {t.experience.title}
      </motion.h2>

      <motion.div
        className="experience_group"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={revealUp}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.06 }}
      >
        <div className="experience_group_header">
          <a
            className="experience_group_header_logo"
            href={XLABS_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Website"
          >
            <XlabsLogoIcon height={48} width={48} />
          </a>
          <span className="experience_group_header_period">{t.experience.date}</span>
        </div>

        <div className="experience_group_content">
          <div className="experience_group_content_project">
            <a href={WORMHOLESCAN_WEBSITE_URL} target="_blank" rel="noopener noreferrer" title="Website">
              <img
                className="experience_group_content_project_image"
                src={EXPERIENCE_WORMHOLESCAN_ASSET}
                loading="lazy"
                alt="wormholescan"
              />
            </a>
            <div className="experience_group_content_project_info">
              <div className="experience_group_content_project_info_title">
                <h3 className="experience_group_content_project_info_title_text">{t.experience.wormholescan}</h3>
                <IconLink href={WORMHOLESCAN_GITHUB_URL} ariaLabel="Github" title="Github">
                  <GithubIcon />
                </IconLink>
                <IconLink href={WORMHOLESCAN_WEBSITE_URL} ariaLabel="Website" title="Website">
                  <WorldIcon />
                </IconLink>
              </div>
              <p className="experience_group_content_project_info_description">{t.experience.wormholescanDesc}</p>
              <div className="experience_group_content_project_info_tools">
                <span>
                  <ReactIcon aria-label="ReactJS" height={20} width={20} />
                  ReactJS
                </span>
                <span>
                  <TypeScriptIcon aria-label="TypeScript" height={20} width={20} />
                  TypeScript
                </span>
                <span>
                  <SassIcon aria-label="Sass" height={20} width={20} /> Sass
                </span>
                <span>
                  <AvalancheIcon aria-label="Avalanche" height={20} width={20} />
                  Blockchain
                </span>
              </div>
            </div>
          </div>

          <motion.div
            className="experience_group_content_project"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          >
            <div className="experience_group_content_project_info">
              <div className="experience_group_content_project_info_title">
                <h3 className="experience_group_content_project_info_title_text">{t.experience.portal}</h3>
                <IconLink href={PORTAL_GITHUB_URL} ariaLabel="Github" title="Github">
                  <GithubIcon />
                </IconLink>
                <IconLink href={PORTAL_WEBSITE_URL} ariaLabel="Website" title="Website">
                  <WorldIcon />
                </IconLink>
              </div>
              <p className="experience_group_content_project_info_description">{t.experience.portalDesc}</p>
              <div className="experience_group_content_project_info_tools">
                <span>
                  <ReactIcon aria-label="ReactJS" height={20} width={20} />
                  ReactJS
                </span>
                <span>
                  <TypeScriptIcon aria-label="TypeScript" height={20} width={20} />
                  TypeScript
                </span>
                <span>
                  <SassIcon aria-label="Sass" height={20} width={20} /> Sass
                </span>
                <span>
                  <SolanaIcon aria-label="Solana" height={20} width={20} />
                  Blockchain
                </span>
              </div>
            </div>
            <a href={PORTAL_WEBSITE_URL} target="_blank" rel="noopener noreferrer" title="Website">
              <img
                className="experience_group_content_project_image"
                src={EXPERIENCE_PORTAL_ASSET}
                loading="lazy"
                alt="portalbridge"
              />
            </a>
          </motion.div>

          <motion.div
            className="experience_group_content_project"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <a href={XLABS_WEBSITE_URL} target="_blank" rel="noopener noreferrer" title="Website">
              <img
                className="experience_group_content_project_image"
                src={EXPERIENCE_XLABS_ASSET}
                loading="lazy"
                alt="xlabs"
              />
            </a>
            <div className="experience_group_content_project_info">
              <div className="experience_group_content_project_info_title">
                <h3 className="experience_group_content_project_info_title_text">xLabs</h3>
                <IconLink href={XLABS_GITHUB_URL} ariaLabel="Github" title="Github">
                  <GithubIcon />
                </IconLink>
                <IconLink href={XLABS_WEBSITE_URL} ariaLabel="Website" title="Website">
                  <WorldIcon />
                </IconLink>
              </div>
              <p className="experience_group_content_project_info_description">{t.experience.xlabsDesc}</p>
              <div className="experience_group_content_project_info_tools experience_group_content_project_info_tools_stacked">
                <span>
                  <NextJSIcon aria-label="NextJS" height={20} width={20} /> NextJS
                </span>
                <span>
                  <TypeScriptIcon aria-label="TypeScript" height={20} width={20} />
                  TypeScript
                </span>
                <span>
                  <SassIcon aria-label="Sass" height={20} width={20} /> Sass
                </span>
                <span>
                  <MonadIcon aria-label="Monad" height={20} width={20} />
                  Blockchain
                </span>
                <span>
                  <MotionIcon aria-label="Motion" height={20} width={20} /> Motion
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="experience_group"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={revealUp}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
      >
        <div className="experience_group_header">
          <a
            className="experience_group_header_logo"
            href="https://giulianoconti.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Website"
          >
            <img src="/assets/favicon_light.png" loading="lazy" alt="giulianoconti" height={48} width={48} />
          </a>
          <span className="experience_group_header_period">{t.experience.freelancerDate}</span>
        </div>

        <div className="experience_group_content">
          <div className="experience_group_content_project">
            <a href={CLINIS_WEBSITE_URL} target="_blank" rel="noopener noreferrer" title="Website">
              <img
                className="experience_group_content_project_image"
                src={EXPERIENCE_CLINIS_ASSET}
                loading="lazy"
                alt="clinis"
              />
            </a>
            <div className="experience_group_content_project_info">
              <div className="experience_group_content_project_info_title">
                <h3 className="experience_group_content_project_info_title_text">Clinis</h3>
                <IconLink href={CLINIS_GITHUB_URL} ariaLabel="Github" title="Github">
                  <GithubIcon />
                </IconLink>
                <IconLink href={CLINIS_WEBSITE_URL} ariaLabel="Website" title="Website">
                  <WorldIcon />
                </IconLink>
              </div>
              <p className="experience_group_content_project_info_description">{t.experience.freelancerDesc}</p>
              <div className="experience_group_content_project_info_tools">
                <span>
                  <ReactIcon aria-label="ReactJS" height={20} width={20} />
                  ReactJS
                </span>
                <span>
                  <TypeScriptIcon aria-label="TypeScript" height={20} width={20} />
                  TypeScript
                </span>
                <span>
                  <SassIcon aria-label="Sass" height={20} width={20} /> Sass
                </span>
                <span>
                  <MotionIcon aria-label="Motion" height={20} width={20} /> Motion
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Experience;
