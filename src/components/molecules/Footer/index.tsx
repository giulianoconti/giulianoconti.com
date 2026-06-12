import { useLocale } from "../../../contexts/LocaleContext.tsx";
import { useTheme } from "../../../contexts/ThemeContext.tsx";
import { trackSocialClick } from "../../../utils/analytics.ts";
import { GithubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "../../../icons";
import {
  SOCIAL_GITHUB_URL,
  SOCIAL_LINKEDIN_URL,
  SOCIAL_MAIL,
  WA_MSG,
} from "../../../utils/constants.ts";
import "./styles.scss";

export default function Footer() {
  const { t } = useLocale();
  const { theme } = useTheme();

  return (
    <footer className="footer" id="footer">
      <div className="footer_cta">
        <p className="footer_cta_eyebrow">{t.contact.ctaButton.toUpperCase()}</p>

        <h2 className="footer_cta_headline">
          {t.contact.headline} <em>{t.contact.headline_2}</em>
        </h2>

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
