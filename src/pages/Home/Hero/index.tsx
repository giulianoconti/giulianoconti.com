import { GithubIcon, InstagramIcon, LinkedInIcon } from "../../../icons";
import {
  SOCIAL_GITHUB_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_LINKEDIN_URL,
  getCvAssetByLocale,
} from "../../../utils/constants";
import { useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";

export default function Hero() {
  const { t, locale } = useLocale();

  return (
    <section className="hero" id="home">
      <div className="hero_main">
        <div className="hero_main_center">
          <h1 className="hero_main_center_headline">{t.home.title}</h1>

          <h2 className="hero_main_center_subhead">{t.home.subheader}</h2>

          <div className="hero_main_center_actions">
            <a
              className="hero_main_center_actions_btn"
              href={getCvAssetByLocale(locale)}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t.home.resume}
            </a>

            <a
              className="hero_main_center_actions_link"
              href={SOCIAL_LINKEDIN_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>

            <a
              className="hero_main_center_actions_link"
              href={SOCIAL_GITHUB_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
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
          </div>
        </div>
      </div>
    </section>
  );
}
