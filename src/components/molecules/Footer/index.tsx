import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { trackSocialClick } from "../../../utils/analytics.ts";
import { CurriculumIcon, GithubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "../../../icons";
import {
  getCvAssetByLocale,
  SOCIAL_GITHUB_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_MAIL,
  WA_MSG,
} from "../../../utils/constants.ts";
import "./styles.scss";

export default function Footer() {
  const { t, locale } = useLocale();

  return (
    <footer className="footer" id="footer">
      <div className="footer_cta">
        <div className="footer_cta_social">
          <a
            className="footer_cta_social_link"
            href={`mailto:${SOCIAL_MAIL}`}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Email"
            data-tooltip="Email"
            onClick={() => trackSocialClick("mail", "footer")}
          >
            <MailIcon />
          </a>

          <a
            className="footer_cta_social_link"
            href={WA_MSG(t.contact.waMsg)}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="WhatsApp"
            data-tooltip="WhatsApp"
            onClick={() => trackSocialClick("whatsapp", "footer")}
          >
            <WhatsAppIcon colorless />
          </a>

          <a
            href={getCvAssetByLocale(locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Curriculum"
            data-tooltip="Curriculum"
            className="footer_cta_social_link"
            onClick={() => trackSocialClick("cv", "footer")}
          >
            <CurriculumIcon />
          </a>

          <a
            href={SOCIAL_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-tooltip="LinkedIn"
            className="footer_cta_social_link"
            onClick={() => trackSocialClick("linkedin", "footer")}
          >
            <LinkedInIcon />
          </a>

          <a
            href={SOCIAL_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-tooltip="GitHub"
            className="footer_cta_social_link"
            onClick={() => trackSocialClick("github", "footer")}
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
