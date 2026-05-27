import { useState, useEffect } from "react";
import { useLocale } from "../../../contexts/LocaleContext";
import QuoteModal from "./QuoteModal";
import { SparklesIcon, SlidersHorizontalIcon } from "../../../icons";
import "./styles.scss";

export default function Pricing() {
  const { t } = useLocale();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<"quiz" | "table">("quiz");

  const openQuote = (m: "quiz" | "table") => {
    setQuoteMode(m);
    setQuoteOpen(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("pricing-visited")) {
      localStorage.setItem("pricing-visited", "1");
      openQuote("quiz");
    }
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(quoteOpen ? "lenis:lock" : "lenis:unlock"));
  }, [quoteOpen]);

  return (
    <section className="pricing" id="precios">
      <div className="pricing_inner">
        <div className="pricing_header">
          <h5 className="pricing_header_eyebrow">{t.pricing.label.toUpperCase()}</h5>
          <div className="pricing_header_rule" />
        </div>

        <div className="pricing_content">
          <h2 className="pricing_content_title">
            {t.pricing.h2pre} <em>{t.pricing.h2em}</em>
          </h2>
          <p className="pricing_content_desc">{t.pricing.p}</p>

          <div className="pricing_content_pdfs">
            <a
              href="/docs/modelos-colaboracion-terminos.html"
              target="_blank"
              rel="noopener noreferrer"
              className="pricing_content_pdfs_link"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t.pricing.pdfLabel}
            </a>
          </div>

          <div className="pricing_content_entries">
            <button type="button" className="pricing_entry pricing_entry--primary" onClick={() => openQuote("quiz")}>
              <div className="pricing_entry_icon">
                <SparklesIcon />
              </div>
              <div className="pricing_entry_body">
                <span className="pricing_entry_badge">{t.pricing.quizBadge}</span>
                <h3 className="pricing_entry_title">{t.pricing.quizTitle}</h3>
                <p className="pricing_entry_desc">{t.pricing.quizDesc}</p>
              </div>
              <span className="pricing_entry_cta">{t.pricing.quizCta}</span>
            </button>

            <button type="button" className="pricing_entry" onClick={() => openQuote("table")}>
              <div className="pricing_entry_icon">
                <SlidersHorizontalIcon />
              </div>
              <div className="pricing_entry_body">
                <h3 className="pricing_entry_title">{t.pricing.tableTitle}</h3>
                <p className="pricing_entry_desc">{t.pricing.tableDesc}</p>
              </div>
              <span className="pricing_entry_cta">{t.pricing.tableCta}</span>
            </button>
          </div>
        </div>
      </div>

      {quoteOpen && <QuoteModal mode={quoteMode} onClose={() => setQuoteOpen(false)} />}
    </section>
  );
}
