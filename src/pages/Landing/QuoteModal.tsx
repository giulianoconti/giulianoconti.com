import { useState, useEffect, useCallback } from "react";
import { BackIcon, CheckIcon, CloseIcon } from "./icons";
import "./QuoteModal.scss";

// ── Types ─────────────────────────────────────────────────────────────────────

type Model = "monthly" | "onetime";
type Timeline = "normal" | "express";
type Currency = "usd" | "ars";

interface Feature {
  id: string;
  label: string;
  desc: string;
  price: number;
  group: string;
  locked?: boolean;
  radio?: string;
  triggers?: string[];
}

interface QuizStep {
  title: string;
  sub: string;
  key: string;
  options: { value: string; icon: string; label: string; desc: string }[];
}

type QuizAnswers = Partial<Record<string, string>>;

// ── Constants ────────────────────────────────────────────────────────────────

const CLOSE_MS = 220;
const ARS_RATE = 1400;

const FEATURES: Feature[] = [
  {
    id: "deploy",
    label: "Deploy en Vercel",
    desc: "Hosting automático + CDN global",
    price: 0,
    group: "base",
    locked: true,
  },
  {
    id: "ssl",
    label: "SSL / HTTPS gratis",
    desc: "Certificado de seguridad incluido",
    price: 0,
    group: "base",
    locked: true,
  },
  {
    id: "responsive",
    label: "Diseño responsive",
    desc: "Se adapta a móvil, tablet y escritorio",
    price: 0,
    group: "base",
    locked: true,
  },
  {
    id: "whatsapp",
    label: "Botón WhatsApp flotante",
    desc: "Acceso directo desde cualquier página",
    price: 0,
    group: "base",
    locked: true,
  },
  {
    id: "contact",
    label: "Formulario de contacto",
    desc: "Email o WhatsApp al enviar",
    price: 0,
    group: "base",
    locked: true,
  },
  {
    id: "p1",
    label: "1 página (landing)",
    desc: "Una sola página de presentación",
    price: 150,
    group: "paginas",
    radio: "pages",
  },
  {
    id: "p4",
    label: "Hasta 4 páginas",
    desc: "Inicio, servicios, contacto, etc.",
    price: 220,
    group: "paginas",
    radio: "pages",
  },
  {
    id: "p10",
    label: "Hasta 10 páginas",
    desc: "Sitio completo con múltiples secciones",
    price: 350,
    group: "paginas",
    radio: "pages",
  },
  { id: "cms", label: "CMS editable", desc: "Modificá texto e imágenes sin código", price: 80, group: "contenido" },
  { id: "blog", label: "Blog / Noticias", desc: "Posts editables vía CMS", price: 80, group: "contenido" },
  {
    id: "seo",
    label: "SEO + Google Analytics",
    desc: "Optimización + tracking de visitas",
    price: 60,
    group: "contenido",
  },
  {
    id: "auth",
    label: "Login / Usuarios",
    desc: "Registro, inicio de sesión, sesiones",
    price: 200,
    group: "backend",
    triggers: ["db"],
  },
  {
    id: "admin",
    label: "Panel admin protegido",
    desc: "Gestión de contenido o datos desde panel",
    price: 150,
    group: "backend",
    triggers: ["auth", "db"],
  },
  {
    id: "db",
    label: "Base de datos (Supabase)",
    desc: "Almacenamiento de datos en tiempo real",
    price: 100,
    group: "backend",
  },
  {
    id: "roles",
    label: "Roles y permisos",
    desc: "Admin, editor, usuario — control de acceso",
    price: 80,
    group: "backend",
    triggers: ["auth", "db"],
  },
  { id: "maps", label: "Google Maps integrado", desc: "Mapa interactivo con tu ubicación", price: 30, group: "extras" },
  {
    id: "multilang",
    label: "Multi-idioma (ES + EN)",
    desc: "Soporte para dos o más idiomas",
    price: 150,
    group: "extras",
  },
  {
    id: "animations",
    label: "Animaciones premium",
    desc: "Scroll effects y micro-interacciones",
    price: 60,
    group: "extras",
  },
  { id: "gdpr", label: "Banner GDPR / Cookies", desc: "Cumplimiento de privacidad legal", price: 40, group: "extras" },
];

const GROUP_LABELS: Record<string, string> = {
  base: "Siempre incluido",
  paginas: "Páginas del sitio · elegí una",
  contenido: "Contenido y marketing",
  backend: "Backend / Usuarios",
  extras: "Extras opcionales",
};

const QUIZ_STEPS: QuizStep[] = [
  {
    title: "¿Cuántas páginas necesitás?",
    sub: "Elegí la opción que mejor describe tu proyecto",
    key: "pages",
    options: [
      { value: "p1", icon: "📄", label: "1 página", desc: "Solo necesito una landing page" },
      { value: "p4", icon: "📋", label: "2–4 páginas", desc: "Varias secciones para mi negocio" },
      { value: "p10", icon: "🗂️", label: "5–10 páginas", desc: "Sitio completo con múltiples secciones" },
    ],
  },
  {
    title: "¿Tus clientes necesitan iniciar sesión?",
    sub: "Esto define si hay backend de usuarios",
    key: "auth",
    options: [
      { value: "no", icon: "🌐", label: "No, es público", desc: "Solo info, contacto o catálogo" },
      { value: "yes", icon: "🔐", label: "Sí, necesito login", desc: "Registro, perfil, panel propio" },
    ],
  },
  {
    title: "¿Cuándo lo necesitás?",
    sub: "El timeline afecta el precio de setup",
    key: "timeline",
    options: [
      { value: "normal", icon: "📅", label: "Sin apuro", desc: "Entrega estándar" },
      { value: "express", icon: "⚡", label: "Express +40%", desc: "Prioridad absoluta hasta entregarlo" },
    ],
  },
  {
    title: "¿Cómo preferís la infraestructura?",
    sub: "Define si pagás mensual o una sola vez",
    key: "infra",
    options: [
      {
        value: "monthly",
        icon: "🛠️",
        label: "Giuliano lo gestiona",
        desc: "Setup + mensualidad. Cero dolores de cabeza",
      },
      {
        value: "onetime",
        icon: "🔑",
        label: "Mis propias cuentas",
        desc: "Pago único +40%. El código queda 100% tuyo",
      },
    ],
  },
];

const WA_BASE = "https://wa.me/5493624223320?text=";
const MULTIPLIER_ONETIME = 1.4;
const MULTIPLIER_EXPRESS = 1.4;

const FEATURE_GROUPS = Object.entries(
  FEATURES.reduce<Record<string, Feature[]>>((acc, f) => {
    (acc[f.group] ??= []).push(f);
    return acc;
  }, {}),
);

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
  if (checked.has("cms") || checked.has("blog")) fee += 10;
  if (checked.has("auth")) fee += 20;
  return fee;
}

const AR_TZ = new Set([
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Salta",
  "America/Argentina/Jujuy",
  "America/Argentina/Tucuman",
  "America/Argentina/Catamarca",
  "America/Argentina/La_Rioja",
  "America/Argentina/San_Juan",
  "America/Argentina/Mendoza",
  "America/Argentina/San_Luis",
  "America/Argentina/Rio_Gallegos",
  "America/Argentina/Ushuaia",
  "America/Buenos_Aires",
  "America/Cordoba",
  "America/Rosario",
  "America/Catamarca",
  "America/Jujuy",
  "America/Mendoza",
]);

function isArgentina(): boolean {
  return AR_TZ.has(Intl.DateTimeFormat().resolvedOptions().timeZone);
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
  const { pages, auth } = answers;
  if (pages) checked.add(pages);
  if (pages === "p4" || pages === "p10") {
    checked.add("cms");
    checked.add("seo");
  }
  if (pages === "p1") checked.add("seo");
  if (auth === "yes") {
    checked.add("auth");
    checked.add("db");
    checked.add("admin");
    checked.add("roles");
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
    <div
      className={`qm__overlay${closing ? " qm__overlay--out" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
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
                <button
                  key={opt.value}
                  className={`qm__option${answers[QUIZ_STEPS[step].key] === opt.value ? " qm__option--selected" : ""}`}
                  onClick={() => selectAnswer(QUIZ_STEPS[step].key, opt.value, step)}
                >
                  <div className="qm__option__icon">{opt.icon}</div>
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
              <button
                className={`qm__model-tab${model === "monthly" ? " qm__model-tab--active" : ""}`}
                onClick={() => setModel("monthly")}
                aria-pressed={model === "monthly"}
              >
                Mensual
                <span className="qm__model-tab__badge">Más elegido</span>
              </button>
              <button
                className={`qm__model-tab${model === "onetime" ? " qm__model-tab--active" : ""}`}
                onClick={() => setModel("onetime")}
                aria-pressed={model === "onetime"}
              >
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
                  {features.map((f) => {
                    const isChecked = !!f.locked || checked.has(f.id);
                    const isRequired =
                      !f.locked &&
                      checked.has(f.id) &&
                      FEATURES.some((o) => o.id !== f.id && checked.has(o.id) && !!o.triggers?.includes(f.id));
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
                <span className="qm__price-bar__label">Total estimado</span>
                <div className="qm__price-bar__amount">
                  <strong>{fmt(setup, currency)}</strong>
                  <button className="qm__price-bar__currency" onClick={toggleCurrency} aria-label="Cambiar moneda">
                    {currency.toUpperCase()}
                  </button>
                </div>
                <span className="qm__price-bar__monthly">
                  {monthly > 0 ? `+ desde ${fmt(monthly, currency)}/mes` : "Sin cargo mensual"}
                </span>
              </div>
              <a
                className="qm__price-bar__cta"
                href={`${WA_BASE}${encodeURIComponent(buildWaMessage(checked, model, timeline, currency))}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
              >
                Consultar →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
