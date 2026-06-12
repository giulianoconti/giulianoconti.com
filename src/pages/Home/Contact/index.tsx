import { useLocale } from "../../../contexts/LocaleContext";
import { GithubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "../../../icons";
import { SOCIAL_GITHUB_URL, SOCIAL_LINKEDIN_URL, SOCIAL_MAIL, WA_MSG } from "../../../utils/constants";
import "./styles.scss";

export default function Contact() {
  const { t } = useLocale();

  return (
    <section className="contact" id="contact">
      <div className="contact_inner">
        <p className="contact_eyebrow">{t.contact.ctaButton.toUpperCase()}</p>

        <h2 className="contact_headline">
          {t.contact.headline} <em>{t.contact.headline_2}</em>
        </h2>

        <div className="contact_actions">
          <a href={`mailto:${SOCIAL_MAIL}`} className="contact_action contact_action--email">
            <MailIcon />
            {t.contact.emailLabel}
          </a>
          <a
            href={WA_MSG(t.contact.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="contact_action contact_action--wa"
          >
            <WhatsAppIcon />
            {t.contact.waLabel}
          </a>
        </div>

        <div className="contact_social">
          <a
            href={SOCIAL_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="contact_social_link"
          >
            <LinkedInIcon />
          </a>
          <a
            href={SOCIAL_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="contact_social_link"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
