import { useLocale } from "../../../contexts/LocaleContext";
import "./styles.scss";

export default function About() {
  const { t } = useLocale();

  return (
    <section className="about">
      <div className="about_inner">
        <div className="about_inner_header">
          <h5 className="about_inner_header_eyebrow" id="about">
            {t.home.aboutTitle.toUpperCase()}
          </h5>
          <div className="about_inner_header_rule" />
        </div>

        <p className="about_inner_text">{t.home.bio}</p>
      </div>
    </section>
  );
}
