import { useState, useEffect, useCallback } from "react";
import { BackIcon, CheckIcon, CloseIcon } from "./icons";
import { CLOSE_MS, ARS_RATE, MULTIPLIER_ONETIME, MULTIPLIER_EXPRESS, FEATURES, GROUP_LABELS, QUIZ_STEPS, FEATURE_GROUPS, isArgentina, WA_MSG } from "./constants";
import type { Feature } from "./constants";
import "./QuoteModal.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

type Model = "monthly" | "onetime";
type Timeline = "normal" | "express";
type Currency = "usd" | "ars";

type QuizAnswers = Partial<Record<string, string>>;

// ── Messaging ────────────────────────────────────────────────────────────────

function buildWaMessage(checked: Set<string>, model: Model, timeline: Timeline, currency: Currency): string {
  const setup = calcSetup(checked, model, timeline);
  const monthly = calcMonthly(checked, model);
  const selectedLabels = FEATURES.filter((f) => !f.locked && checked.has(f.id)).map((f) => `• ${f.label}`);
  return [
    "Hola Giuliano!",
    "Mi nombre es [Tu Nombre].",
    "",
    "Armé esta cotización en la calculadora:",
    "",
    `💰 Setup: ${fmt(setup, currency)}`,
    monthly > 0 ? `📅 Mensualidad: ${fmt(monthly, currency)}/mes` : "📅 Sin cargo mensual",
    "",
    "📋 Features seleccionadas:",
    ...selectedLabels,
    "",
    `Modelo: ${model === "monthly" ? "Mensual" : "Pago único"}`,
    timeline === "express" ? "Timeline: Express (+40%)" : "Timeline: Sin apuro",
    "",
    "Quedo a la espera. ¡Gracias!",
  ].join("\n");
}

// ── Pricing utilities ────────────────────────────────────────────────────────

function calcSetup(checked: Set<string>, model: Model, timeline: Timeline): number {
  let total = 0;
  for (const f of FEATURES) {
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
  const [view, setView] = useState<"quiz" | "table">(mode);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [checked, setChecked] = useState<Set<string>>(() => (mode === "table" ? new Set(["p1"]) : new Set()));
  const [model, setModel] = useState<Model>("monthly");
  const [timeline, setTimeline] = useState<Timeline>("normal");
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem("lp-currency");
    if (saved === "ars" || saved === "usd") return saved as Currency;
    return isArgentina() ? "ars" : "usd";
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
        FEATURES.filter((f) => f.radio === radio).forEach((f) => next.delete(f.id));
        next.add(id);
      } else if (next.has(id)) {
        const requiredBy = FEATURES.some((f) => f.id !== id && next.has(f.id) && !!f.triggers?.includes(id));
        if (!requiredBy) next.delete(id);
      } else {
        next.add(id);
        FEATURES.find((f) => f.id === id)?.triggers?.forEach((t) => next.add(t));
      }
      return next;
    });
  };

  const selectAnswer = (key: string, value: string, stepIdx: number) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (stepIdx < QUIZ_STEPS.length - 1) {
      setTimeout(() => setStep(stepIdx + 1), 180);
    } else {
      setModel(newAnswers.infra === "onetime" ? "onetime" : "monthly");
      setTimeline(newAnswers.timeline === "express" ? "express" : "normal");
      setChecked(buildCheckedFromQuiz(newAnswers));
      setTimeout(() => setView("table"), 180);
    }
  };

  const setup = calcSetup(checked, model, timeline);
  const monthly = calcMonthly(checked, model);

  return (
    <div className={`qm__overlay${closing ? " qm__overlay--out" : ""}`} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={`qm${closing ? " qm--out" : ""}`}>
        {/* ── Header ── */}
        <div className="qm__header">
          {(view === "table" || step > 0) && (
            <button className="qm__back" onClick={view === "table" ? resetToQuiz : () => setStep((s) => s - 1)}>
              <BackIcon height={14} width={14} /> Atrás
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
              <div className="qm__progress__fill" style={{ width: `${((step + 1) / QUIZ_STEPS.length) * 100}%` }} />
            </div>
            <div className="qm__progress__label">
              {step + 1} de {QUIZ_STEPS.length}
            </div>

            <h2 className="qm__title">{QUIZ_STEPS[step].title}</h2>
            <p className="qm__sub">{QUIZ_STEPS[step].sub}</p>

            <div className="qm__options">
              {QUIZ_STEPS[step].options.map((opt) => (
                <button key={opt.value} className={`qm__option${answers[QUIZ_STEPS[step].key] === opt.value ? " qm__option--selected" : ""}`} onClick={() => selectAnswer(QUIZ_STEPS[step].key, opt.value, step)}>
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
              <h2 className="qm__title qm__title--sm">Tu cotización</h2>
              <p className="qm__sub">Activá lo que necesitás · precio en tiempo real</p>
            </div>

            <div className="qm__model-tabs">
              <button className={`qm__model-tab${model === "monthly" ? " qm__model-tab--active" : ""}`} onClick={() => setModel("monthly")} aria-pressed={model === "monthly"}>
                Mensual
                <span className="qm__model-tab__badge">Más elegido</span>
              </button>
              <button className={`qm__model-tab${model === "onetime" ? " qm__model-tab--active" : ""}`} onClick={() => setModel("onetime")} aria-pressed={model === "onetime"}>
                Pago único
              </button>
            </div>

            <p className="qm__model-note">
              {model === "monthly"
                ? "Nos encargamos de todo: hosting, actualizaciones, seguridad y soporte continuo. Tu web siempre funcionando sin que tengas que preocuparte por nada."
                : "Pago único con recargo del 40%. El código es 100% tuyo, pero hosting, soporte y cambios futuros corren por tu cuenta."}
            </p>

            <div className="qm__features">
              {FEATURE_GROUPS.map(([group, features]) => (
                <div key={group} className="qm__group">
                  <div className="qm__group__label">{GROUP_LABELS[group] ?? group}</div>
                  {(features as Feature[]).map((f) => {
                    const isChecked = !!f.locked || checked.has(f.id);
                    const isRequired = !f.locked && checked.has(f.id) && FEATURES.some((o) => o.id !== f.id && checked.has(o.id) && !!o.triggers?.includes(f.id));
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
                        <span className="qm__row__price">{f.price === 0 ? "inc." : fmtFeature(f.price, currency, model, timeline)}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="qm__price-bar">
              <div className="qm__price-bar__left">
                <span className="qm__price-bar__label">Total estimado</span>
                <div className="qm__price-bar__amount">
                  <strong>{fmt(setup, currency)}</strong>
                  <button className="qm__price-bar__currency" onClick={toggleCurrency} aria-label="Cambiar moneda">
                    {currency.toUpperCase()}
                  </button>
                </div>
                <span className="qm__price-bar__monthly">{monthly > 0 ? `+ desde ${fmt(monthly, currency)}/mes` : "Sin cargo mensual"}</span>
              </div>
              <a className="qm__price-bar__cta" href={WA_MSG(buildWaMessage(checked, model, timeline, currency))} target="_blank" rel="noopener noreferrer" onClick={handleClose}>
                Consultar →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
