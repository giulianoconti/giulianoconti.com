import { useState } from "react";
import { useLocale } from "../../../contexts/LocaleContext";
import { PlusMinusIcon } from "../../../icons";
import { FAQS } from "../../../utils/faqsData";
import "./styles.scss";

export default function FAQ() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = FAQS[locale === "pt" ? "es" : locale];

  return (
    <section className="faq" id="faq">
      <div className="faq_inner">
        <div className="faq_header">
          <h5 className="faq_header_eyebrow">{t.faq.label.toUpperCase()}</h5>
          <div className="faq_header_rule" />
        </div>

        <div className="faq_content">
          <h2 className="faq_content_title">
            {t.faq.h2pre} <em>{t.faq.h2em}</em>
          </h2>

          <div className="faq_list">
            {faqs.map(({ q, a }, i) => (
              <button
                className={`faq_btn${open === i ? " faq_btn--open" : ""}`}
                key={q}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="faq_btn_question">
                  <span className="faq_btn_question_text">{q}</span>
                  <span className="faq_btn_question_icon">
                    <PlusMinusIcon open={open === i} />
                  </span>
                </div>

                <div className="faq_btn_answer">
                  <div className="faq_btn_answer_inner">
                    <p>{a}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
