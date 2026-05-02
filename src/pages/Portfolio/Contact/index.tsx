import { SOCIAL_LINKEDIN_URL } from "../../../utils/constants";
import { useLocale } from "../../../contexts/LocaleContext";
import { trackContactClick } from "../../../utils/analytics";
import "./styles.scss";

export default function Contact() {
  const { t, locale } = useLocale();

  return (
    <section className="contact">
      <div className="contact_cta">
        <div className="contact_cta_center">
          <h4 className="contact_cta_center_headline">
            {t.contact.headline}
            <br />
            {t.contact.headline_2}
          </h4>
          <a
            className="contact_cta_center_btn"
            href={SOCIAL_LINKEDIN_URL}
            id="contact"
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => trackContactClick(locale)}
          >
            {t.contact.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
