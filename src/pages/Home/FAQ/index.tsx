import { useState } from "react";
import { useLocale } from "../../../contexts/LocaleContext";
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
              <div key={i} className="faq_item">
                <button className="faq_item_btn" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq_item_q">{q}</span>
                  <span className={`faq_item_icon${open === i ? " faq_item_icon--open" : ""}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      {open !== i && <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
                    </svg>
                  </span>
                </button>
                <div className={`faq_item_answer${open === i ? " faq_item_answer--open" : ""}`}>
                  <div className="faq_item_answer_inner">
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
