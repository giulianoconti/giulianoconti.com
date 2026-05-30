import { useLocale } from "../../../contexts/LocaleContext";
import { GithubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "../../../icons";
import { SOCIAL_GITHUB_URL, SOCIAL_LINKEDIN_URL, SOCIAL_MAIL, WA_MSG } from "../../../utils/constants";
import "./styles.scss";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="hero" id="home">
      <div className="hero_main">
        <div className="hero_main_center">
          <div className="hero_main_center_available">
            <span className="hero_main_center_available_dot" />
            {t.home.availableTag}
          </div>

          <h1 className="hero_main_center_headline">{t.home.title}</h1>
          <h2 className="hero_main_center_subhead">{t.home.subheader}</h2>

          <div className="hero_main_center_stats">
            {(
              [
                ["+3", t.home.statYearsLabel],
                ["+5", t.home.statProjectsLabel],
                ["Freelance", t.home.statCurrentLabel],
              ] as [string, string][]
            ).map(([v, l]) => (
              <div className="hero_main_center_stats_item" key={l}>
                <p className="hero_main_center_stats_item_val">{v}</p>
                <p className="hero_main_center_stats_item_label">{l}</p>
              </div>
            ))}
          </div>

          <div className="hero_main_center_social">
            <a className="hero_main_center_social_link" href={`mailto:${SOCIAL_MAIL}`} aria-label="Email" data-tooltip="Email">
              <MailIcon />
            </a>
            <a className="hero_main_center_social_link" href={WA_MSG(t.contact.waMsg)} rel="noopener noreferrer" target="_blank" aria-label="WhatsApp" data-tooltip="WhatsApp">
              <WhatsAppIcon colorless />
            </a>
            <a className="hero_main_center_social_link" href={SOCIAL_LINKEDIN_URL} rel="noopener noreferrer" target="_blank" aria-label="LinkedIn" data-tooltip="LinkedIn">
              <LinkedInIcon />
            </a>
            <a className="hero_main_center_social_link" href={SOCIAL_GITHUB_URL} rel="noopener noreferrer" target="_blank" aria-label="GitHub" data-tooltip="GitHub">
              <GithubIcon />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
