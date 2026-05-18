import { useState, useEffect, useCallback } from "react";
import { BackIcon, CheckIcon, CloseIcon } from "./icons";
import { CLOSE_MS, ARS_RATE, MULTIPLIER_ONETIME, MULTIPLIER_EXPRESS, WA_MSG } from "./constants";
import type { Feature } from "./constants";
import { useLang, useT } from "./lang";
import { getFeatures, getQuizSteps, getFeatureGroups, getGroupLabels } from "./translations";
import "./QuoteModal.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

type Model = "monthly" | "onetime";
type Timeline = "normal" | "express";
type Currency = "usd" | "ars";

type QuizAnswers = Partial<Record<string, string>>;

// ── Messaging ────────────────────────────────────────────────────────────────

function buildWaMessage(
  checked: Set<string>,
  model: Model,
  timeline: Timeline,
  currency: Currency,
  t: (key: string) => string,
  features: Feature[],
): string {
  const setup = calcSetup(checked, model, timeline, features);
  const monthly = calcMonthly(checked, model);
  const selectedLabels = features.filter((f) => !f.locked && checked.has(f.id)).map((f) => `• ${f.label}`);
  return [
    t("wa_greeting"),
    t("wa_name_line"),
    "",
    t("wa_intro"),
    "",
    `${t("wa_setup_label")} ${fmt(setup, currency)}`,
    monthly > 0 ? `${t("wa_monthly_label")} ${fmt(monthly, currency)}/mes` : t("wa_no_monthly"),
    "",
    t("wa_features_label"),
    ...selectedLabels,
    "",
    `${t("wa_model_label")} ${model === "monthly" ? t("wa_model_monthly") : t("wa_model_onetime")}`,
    timeline === "express" ? t("wa_timeline_express") : t("wa_timeline_normal"),
    "",
    t("wa_closing"),
  ].join("\n");
}

// ── Pricing utilities ────────────────────────────────────────────────────────

function calcSetup(checked: Set<string>, model: Model, timeline: Timeline, features: Feature[]): number {
  let total = 0;
  for (const f of features) {
    if (f.locked || checked.has(f.id)) total += f.price;
  }
  if (model === "onetime") total = Math.round(total * MULTIPLIER_ONETIME);
  if (timeline === "express") total = Math.round(total * MULTIPLIER_EXPRESS);
  return total;
}

function calcMonthly(checked: Set<string>, model: Model): number {
  if (model !== "monthly") return 0;
  let fee = 20;
  if (checked.has("cms")) fee += 10;
  if (checked.has("auth")) fee += 20;
  return fee;
}

function fmt(n: number, currency: Currency): string {
  if (currency === "ars") return "$" + Math.round(n * ARS_RATE).toLocaleString("es-AR");
  return "$" + n.toLocaleString("en-US");
}

function fmtFeature(price: number, currency: Currency, model: Model, timeline: Timeline): string {
  let adjusted = model === "onetime" ? Math.round(price * MULTIPLIER_ONETIME) : price;
  if (timeline === "express") adjusted = Math.round(adjusted * MULTIPLIER_EXPRESS);
  return "+" + fmt(adjusted, currency);
}

function buildCheckedFromQuiz(answers: QuizAnswers): Set<string> {
  const checked = new Set<string>();
  const { pages, auth, cms } = answers;
  if (pages) checked.add(pages);
  if (pages === "p4" || pages === "p10") checked.add("seo");
  if (pages === "p1") checked.add("seo");
  if (auth === "yes") {
    checked.add("auth");
    checked.add("db");
    checked.add("roles");
  }
  if (cms === "yes" || auth === "yes") {
    checked.add("cms");
    checked.add("db");
  }
  return checked;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  mode: "quiz" | "table";
  onClose: () => void;
}

export default function QuoteModal({ mode, onClose }: Props) {
  const { lang } = useLang();
  const t = useT();

  const features = getFeatures(lang);
  const quizSteps = getQuizSteps(lang);
  const featureGroups = getFeatureGroups(lang);
  const groupLabels = getGroupLabels(lang);

  const [view, setView] = useState<"quiz" | "table">(mode);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [checked, setChecked] = useState<Set<string>>(() => (mode === "table" ? new Set(["p1"]) : new Set()));
  const [model, setModel] = useState<Model>("monthly");
  const [timeline, setTimeline] = useState<Timeline>("normal");
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem("lp-currency");
    if (saved === "ars" || saved === "usd") return saved as Currency;
    return Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith("America/Argentina") ? "ars" : "usd";
  });
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose(), CLOSE_MS);
  }, [onClose]);

  const resetToQuiz = useCallback(() => {
    setAnswers({});
    setTimeline("normal");
    setModel("monthly");
    setStep(0);
    setView("quiz");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const toggleCurrency = () => {
    const next: Currency = currency === "usd" ? "ars" : "usd";
    setCurrency(next);
    localStorage.setItem("lp-currency", next);
  };

  const toggleFeature = (id: string, radio?: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (radio) {
        features.filter((f) => f.radio === radio).forEach((f) => next.delete(f.id));
        next.add(id);
      } else if (next.has(id)) {
        const requiredBy = features.some((f) => f.id !== id && next.has(f.id) && !!f.triggers?.includes(id));
        if (!requiredBy) next.delete(id);
      } else {
        next.add(id);
        features.find((f) => f.id === id)?.triggers?.forEach((tr) => next.add(tr));
      }
      return next;
    });
  };

  const selectAnswer = (key: string, value: string, stepIdx: number) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (stepIdx < quizSteps.length - 1) {
      setTimeout(() => setStep(stepIdx + 1), 180);
    } else {
      setModel(newAnswers.infra === "onetime" ? "onetime" : "monthly");
      setTimeline(newAnswers.timeline === "express" ? "express" : "normal");
      setChecked(buildCheckedFromQuiz(newAnswers));
      setTimeout(() => setView("table"), 180);
    }
  };

  const setup = calcSetup(checked, model, timeline, features);
  const monthly = calcMonthly(checked, model);

  return (
    <div
      className={`qm__overlay${closing ? " qm__overlay--out" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={`qm${closing ? " qm--out" : ""}`}>
        {/* ── Header ── */}
        <div className="qm__header">
          {(view === "table" || step > 0) && (
            <button className="qm__back" onClick={view === "table" ? resetToQuiz : () => setStep((s) => s - 1)}>
              <BackIcon height={14} width={14} /> {t("qm_back")}
            </button>
          )}
          <button className="qm__close" onClick={handleClose} aria-label="Cerrar">
            <CloseIcon height={14} width={14} />
          </button>
        </div>

        {/* ── Quiz view ── */}
        {view === "quiz" && (
          <div className="qm__quiz">
            <div className="qm__progress">
              <div className="qm__progress__fill" style={{ width: `${((step + 1) / quizSteps.length) * 100}%` }} />
            </div>
            <div className="qm__progress__label">
              {step + 1} {t("qm_step_of")} {quizSteps.length}
            </div>

            <h2 className="qm__title">{quizSteps[step].title}</h2>
            <p className="qm__sub">{quizSteps[step].sub}</p>

            <div className="qm__options">
              {quizSteps[step].options.map((opt) => (
                <button
                  key={opt.value}
                  className={`qm__option${answers[quizSteps[step].key] === opt.value ? " qm__option--selected" : ""}`}
                  onClick={() => selectAnswer(quizSteps[step].key, opt.value, step)}
                >
                  <div className="qm__option__icon">
                    <opt.icon height={20} width={20} />
                  </div>
                  <div className="qm__option__body">
                    <span className="qm__option__label">{opt.label}</span>
                    <span className="qm__option__desc">{opt.desc}</span>
                  </div>
                  <div className="qm__option__radio" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Table view ── */}
        {view === "table" && (
          <div className="qm__table-view">
            <div className="qm__table-header">
              <h2 className="qm__title qm__title--sm">{t("qm_title")}</h2>
              <p className="qm__sub">{t("qm_sub")}</p>
            </div>

            <div className="qm__model-tabs">
              <button
                className={`qm__model-tab${model === "monthly" ? " qm__model-tab--active" : ""}`}
                onClick={() => setModel("monthly")}
                aria-pressed={model === "monthly"}
              >
                {t("qm_tab_monthly")}
                <span className="qm__model-tab__badge">{t("qm_tab_badge")}</span>
              </button>
              <button
                className={`qm__model-tab${model === "onetime" ? " qm__model-tab--active" : ""}`}
                onClick={() => setModel("onetime")}
                aria-pressed={model === "onetime"}
              >
                {t("qm_tab_onetime")}
              </button>
            </div>

            <p className="qm__model-note">
              {model === "monthly" ? t("qm_note_monthly") : t("qm_note_onetime")}
            </p>

            <div className="qm__features">
              {featureGroups.map(([group, groupFeatures]) => (
                <div key={group} className="qm__group">
                  <div className="qm__group__label">{groupLabels[group] ?? group}</div>
                  {(groupFeatures as Feature[]).map((f) => {
                    const isChecked = !!f.locked || checked.has(f.id);
                    const isRequired =
                      !f.locked &&
                      checked.has(f.id) &&
                      features.some((o) => o.id !== f.id && checked.has(o.id) && !!o.triggers?.includes(f.id));
                    return (
                      <button
                        key={f.id}
                        className={`qm__row${isChecked ? " qm__row--checked" : ""}${f.locked ? " qm__row--locked" : ""}${isRequired ? " qm__row--required" : ""}`}
                        onClick={() => !f.locked && toggleFeature(f.id, f.radio)}
                        disabled={!!f.locked}
                      >
                        <div className="qm__row__check">{isChecked && <CheckIcon height={10} width={10} />}</div>
                        <div className="qm__row__info">
                          <span className="qm__row__label">{f.label}</span>
                          <span className="qm__row__desc">{f.desc}</span>
                        </div>
                        <span className="qm__row__price">
                          {f.price === 0 ? "inc." : fmtFeature(f.price, currency, model, timeline)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="qm__price-bar">
              <div className="qm__price-bar__left">
                <span className="qm__price-bar__label">{t("qm_total_label")}</span>
                <div className="qm__price-bar__amount">
                  <strong>{fmt(setup, currency)}</strong>
                  <button className="qm__price-bar__currency" onClick={toggleCurrency} aria-label="Cambiar moneda">
                    {currency.toUpperCase()}
                  </button>
                </div>
                <span className="qm__price-bar__monthly">
                  {monthly > 0 ? `${t("qm_monthly_from")} ${fmt(monthly, currency)}${t("qm_monthly_per")}` : t("qm_no_monthly")}
                </span>
              </div>
              <a
                className="qm__price-bar__cta"
                href={WA_MSG(buildWaMessage(checked, model, timeline, currency, t, features))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
              >
                {t("qm_cta")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
