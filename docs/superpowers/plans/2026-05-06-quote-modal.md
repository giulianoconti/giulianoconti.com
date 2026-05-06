# Quote Modal & Feature Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fixed-plan calculator in `#precios` with a feature-by-feature price builder — two entry points (guided quiz + direct table), modal with live pricing, first-visit auto-open.

**Architecture:** `QuoteModal.tsx` is a self-contained component that renders inside `.lp` (inherits CSS vars). Landing manages `quoteOpen` + `quoteMode` state and the first-visit localStorage gate. The `#precios` section is reduced to a header + two entry-point cards.

**Tech Stack:** React 18, TypeScript, SCSS (existing `--accent`, `--card`, `--border` CSS vars), Vite.

**Spec:** `docs/superpowers/specs/2026-05-06-quote-modal-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/pages/Landing/QuoteModal.tsx` | All quiz + feature table logic and JSX |
| Create | `src/pages/Landing/quote-modal.scss` | Modal styles (overlay, quiz, table, price bar) |
| Modify | `src/pages/Landing/index.tsx` | Remove calc state/JSX, add entry cards + modal |
| Modify | `src/pages/Landing/landing.scss` | Remove ~500 lines of calc styles, add entry card styles |

---

## Task 1: Create QuoteModal.tsx

**Files:**
- Create: `src/pages/Landing/QuoteModal.tsx`

- [ ] **Step 1.1: Create the file with all data, types, and utilities**

```tsx
// src/pages/Landing/QuoteModal.tsx
import { useState, useEffect, useCallback } from "react";
import "./quote-modal.scss";

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

const ARS_RATE = 1400;

const FEATURES: Feature[] = [
  { id: "deploy",     label: "Deploy en Vercel",        desc: "Hosting automático + CDN global",                price: 0,   group: "base",     locked: true },
  { id: "ssl",        label: "SSL / HTTPS gratis",       desc: "Certificado de seguridad incluido",              price: 0,   group: "base",     locked: true },
  { id: "responsive", label: "Diseño responsive",        desc: "Se adapta a móvil, tablet y escritorio",         price: 0,   group: "base",     locked: true },
  { id: "whatsapp",   label: "Botón WhatsApp flotante",  desc: "Acceso directo desde cualquier página",          price: 0,   group: "base",     locked: true },
  { id: "contact",    label: "Formulario de contacto",   desc: "Email o WhatsApp al enviar",                     price: 0,   group: "base",     locked: true },
  { id: "p1",         label: "1 página (landing)",       desc: "Una sola página de presentación",                price: 150, group: "paginas",  radio: "pages" },
  { id: "p4",         label: "Hasta 4 páginas",          desc: "Inicio, servicios, contacto, etc.",              price: 220, group: "paginas",  radio: "pages" },
  { id: "p10",        label: "Hasta 10 páginas",         desc: "Sitio completo con múltiples secciones",         price: 350, group: "paginas",  radio: "pages" },
  { id: "cms",        label: "CMS editable",             desc: "Modificá texto e imágenes sin código",           price: 80,  group: "contenido" },
  { id: "blog",       label: "Blog / Noticias",          desc: "Posts editables vía CMS",                        price: 80,  group: "contenido" },
  { id: "seo",        label: "SEO + Google Analytics",   desc: "Optimización + tracking de visitas",             price: 60,  group: "contenido" },
  { id: "auth",       label: "Login / Usuarios",         desc: "Registro, inicio de sesión, sesiones",           price: 200, group: "backend",  triggers: ["db"] },
  { id: "admin",      label: "Panel admin protegido",    desc: "Gestión de contenido o datos desde panel",       price: 150, group: "backend",  triggers: ["auth", "db"] },
  { id: "db",         label: "Base de datos (Supabase)", desc: "Almacenamiento de datos en tiempo real",         price: 100, group: "backend" },
  { id: "roles",      label: "Roles y permisos",         desc: "Admin, editor, usuario — control de acceso",     price: 80,  group: "backend" },
  { id: "maps",       label: "Google Maps integrado",    desc: "Mapa interactivo con tu ubicación",              price: 30,  group: "extras" },
  { id: "multilang",  label: "Multi-idioma (ES + EN)",   desc: "Soporte para dos o más idiomas",                 price: 150, group: "extras" },
  { id: "animations", label: "Animaciones premium",      desc: "Scroll effects y micro-interacciones",           price: 60,  group: "extras" },
  { id: "gdpr",       label: "Banner GDPR / Cookies",    desc: "Cumplimiento de privacidad legal",               price: 40,  group: "extras" },
];

const GROUP_LABELS: Record<string, string> = {
  base:      "Siempre incluido",
  paginas:   "Páginas del sitio · elegí una",
  contenido: "Contenido y marketing",
  backend:   "Backend / Usuarios",
  extras:    "Extras opcionales",
};

const QUIZ_STEPS: QuizStep[] = [
  {
    title: "¿Cuántas páginas necesitás?",
    sub: "Elegí la opción que mejor describe tu proyecto",
    key: "pages",
    options: [
      { value: "p1",  icon: "📄", label: "1 página",      desc: "Solo necesito una landing page" },
      { value: "p4",  icon: "📋", label: "2–4 páginas",   desc: "Varias secciones para mi negocio" },
      { value: "p10", icon: "🗂️", label: "5–10 páginas",  desc: "Sitio completo con múltiples secciones" },
    ],
  },
  {
    title: "¿Tus clientes necesitan iniciar sesión?",
    sub: "Esto define si hay backend de usuarios",
    key: "auth",
    options: [
      { value: "no",  icon: "🌐", label: "No, es público",      desc: "Solo info, contacto o catálogo" },
      { value: "yes", icon: "🔐", label: "Sí, necesito login",  desc: "Registro, perfil, panel propio" },
    ],
  },
  {
    title: "¿Cuándo lo necesitás?",
    sub: "El timeline afecta el precio de setup",
    key: "timeline",
    options: [
      { value: "normal",  icon: "📅", label: "Sin apuro",    desc: "Entrega estándar según el proyecto" },
      { value: "express", icon: "⚡", label: "Express +40%", desc: "Prioridad absoluta hasta entregarlo" },
    ],
  },
  {
    title: "¿Cómo preferís la infraestructura?",
    sub: "Define si pagás mensual o una sola vez",
    key: "infra",
    options: [
      { value: "monthly", icon: "🛠️", label: "Giuliano lo gestiona", desc: "Setup + mensualidad. Cero dolores de cabeza" },
      { value: "onetime", icon: "🔑", label: "Mis propias cuentas",   desc: "Pago único. El código queda 100% tuyo" },
    ],
  },
];

const WA_BASE = "https://wa.me/5493624223320?text=";

// ── Pricing utilities ────────────────────────────────────────────────────────

function calcSetup(checked: Set<string>, model: Model, timeline: Timeline): number {
  let total = 0;
  for (const f of FEATURES) {
    if (f.locked || checked.has(f.id)) total += f.price;
  }
  if (model === "onetime") total = Math.round(total * 1.2);
  if (timeline === "express") total = Math.round(total * 1.4);
  return total;
}

function calcMonthly(checked: Set<string>, model: Model): number {
  if (model !== "monthly") return 0;
  let fee = 20;
  if (checked.has("cms") || checked.has("blog")) fee += 10;
  if (checked.has("auth")) fee += 20;
  return fee;
}

function fmt(n: number, currency: Currency): string {
  if (currency === "ars") return "$" + Math.round(n * ARS_RATE).toLocaleString("es-AR");
  return "$" + n.toLocaleString("en-US");
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
  }
  return checked;
}
```

- [ ] **Step 1.2: Add icon sub-components and the main component**

Append to the same file:

```tsx
// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
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
  const [checked, setChecked] = useState<Set<string>>(() =>
    mode === "table" ? new Set(["p1"]) : new Set()
  );
  const [model, setModel] = useState<Model>("monthly");
  const [timeline, setTimeline] = useState<Timeline>("normal");
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem("lp-currency");
    if (saved === "ars" || saved === "usd") return saved as Currency;
    return Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Argentina") ? "ars" : "usd";
  });
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose(), 220);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
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
        next.delete(id);
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

  const buildWaMessage = () => {
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
      monthly > 0 ? `📅 Mensualidad: desde ${fmt(monthly, currency)}/mes` : "📅 Sin cargo mensual",
      "",
      `Modelo: ${model === "monthly" ? "Mensual" : "Pago único"}`,
      timeline === "express" ? "Timeline: Express (+40%)" : "Timeline: Sin apuro",
      "",
      "📋 Features:",
      ...selectedLabels,
      "",
      "Quedo a la espera. ¡Gracias!",
    ].join("\n");
  };

  const setup = calcSetup(checked, model, timeline);
  const monthly = calcMonthly(checked, model);

  const grouped = Object.entries(
    FEATURES.reduce<Record<string, Feature[]>>((acc, f) => {
      (acc[f.group] ??= []).push(f);
      return acc;
    }, {})
  );

  return (
    <div
      className={`qm__overlay${closing ? " qm__overlay--out" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={`qm${closing ? " qm--out" : ""}`}>

        {/* ── Header ── */}
        <div className="qm__header">
          {view === "quiz" && step > 0 && (
            <button className="qm__back" onClick={() => setStep((s) => s - 1)}>
              <BackIcon /> Atrás
            </button>
          )}
          {view === "table" && (
            <button className="qm__back" onClick={() => { setView("quiz"); setStep(QUIZ_STEPS.length - 1); }}>
              <BackIcon /> Atrás
            </button>
          )}
          <button className="qm__close" onClick={handleClose} aria-label="Cerrar">
            <CloseIcon />
          </button>
        </div>

        {/* ── Quiz view ── */}
        {view === "quiz" && (
          <div className="qm__quiz">
            <div className="qm__progress">
              <div className="qm__progress__fill" style={{ width: `${((step + 1) / QUIZ_STEPS.length) * 100}%` }} />
            </div>
            <div className="qm__progress__label">{step + 1} de {QUIZ_STEPS.length}</div>

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
              >
                Mensual (Giuliano gestiona)
              </button>
              <button
                className={`qm__model-tab${model === "onetime" ? " qm__model-tab--active" : ""}`}
                onClick={() => setModel("onetime")}
              >
                Pago único (tus cuentas)
              </button>
            </div>

            <div className="qm__features">
              {grouped.map(([group, features]) => (
                <div key={group} className="qm__group">
                  <div className="qm__group__label">{GROUP_LABELS[group] ?? group}</div>
                  {features.map((f) => {
                    const isChecked = !!f.locked || checked.has(f.id);
                    return (
                      <button
                        key={f.id}
                        className={`qm__row${isChecked ? " qm__row--checked" : ""}${f.locked ? " qm__row--locked" : ""}`}
                        onClick={() => !f.locked && toggleFeature(f.id, f.radio)}
                        disabled={!!f.locked}
                      >
                        <div className="qm__row__check">{isChecked && <CheckIcon />}</div>
                        <div className="qm__row__info">
                          <span className="qm__row__label">{f.label}</span>
                          <span className="qm__row__desc">{f.desc}</span>
                        </div>
                        <span className="qm__row__price">
                          {f.price === 0 ? "inc." : `+${fmt(f.price, currency)}`}
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
                  <button className="qm__price-bar__currency" onClick={toggleCurrency}>
                    {currency.toUpperCase()}
                  </button>
                </div>
                <span className="qm__price-bar__monthly">
                  {monthly > 0 ? `+ desde ${fmt(monthly, currency)}/mes` : "Sin cargo mensual"}
                </span>
              </div>
              <a
                className="qm__price-bar__cta"
                href={`${WA_BASE}${encodeURIComponent(buildWaMessage())}`}
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
```

- [ ] **Step 1.3: Verify TypeScript compiles**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors about `QuoteModal.tsx` (the scss import will warn until Task 2 creates it — that's fine).

- [ ] **Step 1.4: Commit**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio"
git add src/pages/Landing/QuoteModal.tsx
git commit -m "feat: add QuoteModal component with quiz and feature table"
```

---

## Task 2: Create quote-modal.scss

**Files:**
- Create: `src/pages/Landing/quote-modal.scss`

- [ ] **Step 2.1: Create the stylesheet**

```scss
// src/pages/Landing/quote-modal.scss

@keyframes qm-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes qm-slide {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

// ── Overlay ──────────────────────────────────────────────────────────────────

.qm__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: qm-fade 0.22s ease both;

  &--out { animation: qm-fade 0.2s ease both reverse; }
}

// ── Card ─────────────────────────────────────────────────────────────────────

.qm {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: qm-slide 0.22s ease both;

  &--out { animation: qm-slide 0.2s ease both reverse; }
}

// ── Header ───────────────────────────────────────────────────────────────────

.qm__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px 0;
  flex-shrink: 0;
  min-height: 42px;
}

.qm__back {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--muted);
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.15s;

  &:hover { color: var(--text); }
}

.qm__close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--muted);
  transition: background 0.15s, color 0.15s;
  margin-left: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text);
  }

  .lp--light & {
    background: rgba(0, 0, 0, 0.04);
    &:hover { background: rgba(0, 0, 0, 0.09); }
  }
}

// ── Shared typography ─────────────────────────────────────────────────────────

.qm__title {
  font-size: 26px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.15;
  text-align: center;
  margin: 0;

  &--sm { font-size: 20px; }
}

.qm__sub {
  font-size: 13px;
  color: var(--muted);
  text-align: center;
  margin: 6px 0 0;
}

// ── Quiz view ─────────────────────────────────────────────────────────────────

.qm__quiz {
  display: flex;
  flex-direction: column;
  padding: 14px 22px 22px;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

// ── Progress bar ─────────────────────────────────────────────────────────────

.qm__progress {
  height: 3px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;

  &__fill {
    height: 100%;
    background: var(--accent);
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  &__label {
    text-align: right;
    font-size: 11px;
    color: var(--muted);
    margin-top: 6px;
    margin-bottom: 18px;
  }
}

// ── Quiz options ──────────────────────────────────────────────────────────────

.qm__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
}

.qm__option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  text-align: left;
  width: 100%;
  font-family: inherit;
  color: var(--text);
  transition: border-color 0.15s, background 0.15s;

  .lp--light & { background: rgba(0, 0, 0, 0.01); }

  &:hover {
    border-color: rgba(163, 230, 53, 0.35);
    background: var(--feat-card);
  }

  &--selected {
    border-color: var(--accent);
    background: var(--feat-card);
  }

  &__icon {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;

    .lp--light & { background: rgba(0, 0, 0, 0.05); }

    .qm__option--selected & { background: var(--accent-dim); }
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
  }

  &__desc {
    font-size: 12px;
    color: var(--muted);
  }

  &__radio {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    flex-shrink: 0;
    transition: all 0.15s;
    position: relative;

    .qm__option--selected & {
      border-color: var(--accent);
      background: var(--accent);

      &::after {
        content: "";
        position: absolute;
        inset: 3px;
        background: #000;
        border-radius: 50%;
      }
    }
  }
}

// ── Table view ────────────────────────────────────────────────────────────────

.qm__table-view {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.qm__table-header {
  padding: 10px 22px 0;
  flex-shrink: 0;
}

// ── Model tabs ────────────────────────────────────────────────────────────────

.qm__model-tabs {
  display: flex;
  gap: 3px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  padding: 3px;
  margin: 12px 22px 0;
  flex-shrink: 0;

  .lp--light & { background: rgba(0, 0, 0, 0.05); }
}

.qm__model-tab {
  flex: 1;
  padding: 8px 6px;
  border-radius: 7px;
  border: none;
  background: none;
  color: var(--muted);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
  text-align: center;

  &--active {
    background: var(--text);
    color: var(--bg);
    font-weight: 600;
  }
}

// ── Feature groups & rows ─────────────────────────────────────────────────────

.qm__features {
  flex: 1;
  overflow-y: auto;
  padding: 10px 22px 4px;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
}

.qm__group {
  margin-bottom: 16px;

  &__label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: var(--muted);
    text-transform: uppercase;
    padding-bottom: 7px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 4px;
  }
}

.qm__row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.12s;
  text-align: left;

  &:hover:not(&--locked) { background: rgba(255, 255, 255, 0.03); }

  .lp--light &:hover:not(&--locked) { background: rgba(0, 0, 0, 0.03); }

  &--locked { cursor: default; opacity: 0.5; }

  &__check {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1.5px solid var(--border);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    transition: all 0.12s;

    .qm__row--checked & {
      background: var(--accent);
      border-color: var(--accent);
    }

    .qm__row--locked & {
      background: rgba(163, 230, 53, 0.18);
      border-color: rgba(163, 230, 53, 0.35);
      color: var(--accent);
    }
  }

  &__info { flex: 1; min-width: 0; }

  &__label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__desc {
    display: block;
    font-size: 11px;
    color: var(--muted);
    margin-top: 1px;
  }

  &__price {
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    flex-shrink: 0;
    white-space: nowrap;

    .qm__row--checked:not(.qm__row--locked) & { color: var(--accent-text); }
  }
}

// ── Price bar ─────────────────────────────────────────────────────────────────

.qm__price-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 22px 18px;
  border-top: 1px solid var(--border);
  background: var(--card);
  flex-shrink: 0;

  &__left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--muted);
  }

  &__amount {
    display: flex;
    align-items: baseline;
    gap: 6px;

    strong {
      font-size: 24px;
      font-weight: 700;
      color: var(--accent-text);
      line-height: 1;
    }
  }

  &__currency {
    font-size: 11px;
    color: var(--muted);
    background: none;
    border: none;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    font-family: inherit;
    padding: 0;
    transition: color 0.15s;

    &:hover { color: var(--text); }
  }

  &__monthly {
    font-size: 11px;
    color: var(--muted);
    margin-top: 1px;
  }

  &__cta {
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: 10px;
    padding: 11px 18px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    font-family: inherit;
    transition: opacity 0.15s;
    flex-shrink: 0;

    &:hover { opacity: 0.88; }
  }
}

// ── Mobile ────────────────────────────────────────────────────────────────────

@media (max-width: 600px) {
  .qm__overlay {
    align-items: flex-end;
    padding: 0;
  }

  .qm {
    max-height: 92vh;
    border-radius: 20px 20px 0 0;
  }

  .qm__title { font-size: 22px; }
  .qm__price-bar__amount strong { font-size: 20px; }

  .qm__model-tab { font-size: 10px; }
}
```

- [ ] **Step 2.2: Verify dev server shows no SCSS errors**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio" && npm run dev 2>&1 | head -20
```

Expected: server starts, no SCSS parse errors.

- [ ] **Step 2.3: Commit**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio"
git add src/pages/Landing/quote-modal.scss
git commit -m "feat: add quote-modal styles"
```

---

## Task 3: Update index.tsx — entry cards, modal state, first-visit open

**Files:**
- Modify: `src/pages/Landing/index.tsx`

- [ ] **Step 3.1: Add import at top of file**

Find the line:
```tsx
import "./landing.scss";
```
Replace with:
```tsx
import "./landing.scss";
import QuoteModal from "./QuoteModal";
```

- [ ] **Step 3.2: Add quoteOpen + quoteMode state and first-visit effect**

Find these two state lines near the top of `Landing()`:
```tsx
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [calc, setCalc] = useState<CalcState>(CALC_INIT);
```
Replace with:
```tsx
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<"quiz" | "table">("quiz");
```

- [ ] **Step 3.3: Add first-visit effect and openQuote/closeQuote helpers**

Find:
```tsx
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
```
Insert immediately before it:
```tsx
  useEffect(() => {
    if (!localStorage.getItem("lp-quote-modal-seen")) {
      setTimeout(() => {
        setQuoteMode("quiz");
        setQuoteOpen(true);
      }, 600);
    }
  }, []);

  const openQuote = (m: "quiz" | "table") => {
    setQuoteMode(m);
    setQuoteOpen(true);
  };

  const closeQuote = () => {
    setQuoteOpen(false);
    localStorage.setItem("lp-quote-modal-seen", "1");
  };

```

- [ ] **Step 3.4: Replace the entire #precios section**

Find (line ~645 to ~1261):
```tsx
      {/* ── Precios ──────────────────────────────────── */}
      <section className="lp__section" id="precios">
        <div className="lp__container">
          <div className="lp__section-header lp__reveal">
            <span className="lp__section-header__label">Precios</span>
            <h2>
              Dos modelos, <em>un solo dev</em>
            </h2>
            <p>Elegí cómo querés trabajar. Precios en USD o ARS al cambio del día. Sin costos ocultos.</p>
          </div>
```

Replace the entire section (from that opening comment all the way through the closing `</section>` at line 1261) with:

```tsx
      {/* ── Precios ──────────────────────────────────── */}
      <section className="lp__section" id="precios">
        <div className="lp__container">
          <div className="lp__section-header lp__reveal">
            <span className="lp__section-header__label">Precios</span>
            <h2>
              Armá tu web, <em>feature por feature</em>
            </h2>
            <p>Pagás exactamente por lo que necesitás. Sin paquetes fijos. Precios en USD o ARS. Sin costos ocultos.</p>
          </div>

          <div className="lp__pricing-pdfs lp__reveal">
            <a
              href="/docs/Modelos de Colaboración y Términos — Giuliano Conti.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="lp__pricing-pdfs__link"
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Términos y modelos de colaboración
            </a>
          </div>

          <div className="lp__pricing-entries lp__reveal">
            <button className="lp__pricing-entry lp__pricing-entry--primary" onClick={() => openQuote("quiz")}>
              <div className="lp__pricing-entry__icon">🧭</div>
              <div className="lp__pricing-entry__body">
                <span className="lp__pricing-entry__badge">Recomendado</span>
                <h3>Hacé el quiz</h3>
                <p>4 preguntas rápidas. Pre-configuramos la tabla según tu proyecto.</p>
                <ul>
                  <li>¿Cuántas páginas necesitás?</li>
                  <li>¿Necesitás login de usuarios?</li>
                  <li>¿Cuándo lo necesitás?</li>
                  <li>¿Cómo querés la infra?</li>
                </ul>
              </div>
              <span className="lp__pricing-entry__cta">Empezar quiz →</span>
            </button>

            <button className="lp__pricing-entry" onClick={() => openQuote("table")}>
              <div className="lp__pricing-entry__icon">⚙️</div>
              <div className="lp__pricing-entry__body">
                <h3>Armar directo</h3>
                <p>Sabés lo que querés. Activá features vos mismo y ves el precio al instante.</p>
              </div>
              <span className="lp__pricing-entry__cta">Ver tabla →</span>
            </button>
          </div>
        </div>
      </section>
```

- [ ] **Step 3.5: Add QuoteModal render just before the closing `</div>` of the outer .lp wrapper**

Find (near end of JSX, before the final `</div>`):
```tsx
      {/* ── WhatsApp floating ────────────────────────── */}
```
Insert immediately before it:
```tsx
      {/* ── Quote modal ──────────────────────────────── */}
      {quoteOpen && <QuoteModal mode={quoteMode} onClose={closeQuote} />}

```

- [ ] **Step 3.6: Verify the page renders without errors**

Run `npm run dev`, open http://localhost:5173, check:
- `#precios` section shows two entry cards
- Clicking "Hacé el quiz" opens the modal in quiz mode
- Clicking "Armar directo" opens the modal with the feature table
- Escape key closes the modal
- First visit: modal auto-opens after ~600ms (test in incognito or clear `lp-quote-modal-seen` from localStorage)

- [ ] **Step 3.7: Commit**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio"
git add src/pages/Landing/index.tsx
git commit -m "feat: replace pricing calculator with quote modal entry cards"
```

---

## Task 4: Remove unused code from index.tsx

**Files:**
- Modify: `src/pages/Landing/index.tsx`

- [ ] **Step 4.1: Remove calc constants and functions**

Find and delete the entire block from line ~199 to ~248. This is everything from:
```tsx
const CALC_TIMES: Record<string, { normal: string; express: string }> = {
```
through to (and including):
```tsx
function fmtPrice(n: number, currency: "usd" | "ars"): string {
  if (currency === "ars") return "$" + (n * ARS_RATE).toLocaleString("es-AR");
  return "$" + n.toLocaleString("en-US");
}
```

- [ ] **Step 4.2: Remove the Tooltip component**

Find and delete:
```tsx
function Tooltip({ text }: { text: string }) {
  return (
    <span className="lp__tip" onClick={(e) => e.stopPropagation()}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
      </svg>
      <span className="lp__tip__box">{text}</span>
    </span>
  );
}
```

- [ ] **Step 4.3: Remove currency state from Landing**

Find and delete this entire block (lines ~334–359):
```tsx
  const [currency, setCurrency] = useState<"usd" | "ars">(() => {
    const saved = localStorage.getItem("lp-currency");
    if (saved === "ars" || saved === "usd") return saved;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const AR_ZONES = new Set([
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
    if (AR_ZONES.has(tz)) return "ars";
    return "usd";
  });
```

- [ ] **Step 4.4: Verify TypeScript with no errors**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio" && npx tsc --noEmit 2>&1
```

Expected: zero errors. If errors appear, they indicate a reference to removed code — fix each one.

- [ ] **Step 4.5: Commit**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio"
git add src/pages/Landing/index.tsx
git commit -m "chore: remove unused calc constants, Tooltip, and currency state"
```

---

## Task 5: Update landing.scss — remove old styles, add entry card styles

**Files:**
- Modify: `src/pages/Landing/landing.scss`

- [ ] **Step 5.1: Remove the `__pricing-tabs` block**

Find and delete from:
```scss
  // ── Pricing tabs ─────────────────────────────────────
  &__pricing-tabs {
```
through the closing `}` of that block (ends around line 1146, just before `&__pricing-subtabs`).

- [ ] **Step 5.2: Remove `__pricing-subtabs`, `__pricing-card__currency`, `__pricing-hint` blocks**

Find and delete from:
```scss
  &__pricing-subtabs {
```
through to (and including):
```scss
  &__pricing-hint {
    ...
  }
```
(This runs to just before `&__pricing-pdfs` at ~line 1210. Keep `&__pricing-pdfs` — it's still used.)

- [ ] **Step 5.3: Remove the `__calc` block**

Find and delete from:
```scss
  // ── Pricing Calculator ──────────────────────────────────────
  &__calc {
```
through its final closing `}` at ~line 1565 (just before the `// ── Tooltip` comment).

- [ ] **Step 5.4: Remove the `__tip` block**

Find and delete:
```scss
  // ── Tooltip ──────────────────────────────────────────────────
  &__tip {
    ...
  }
```
(Lines ~1567–1605, before `&__pricing-comparison`.)

- [ ] **Step 5.5: Remove the `__pricing-comparison` and `__pricing-note` blocks**

Find and delete from:
```scss
  &__pricing-comparison {
```
through:
```scss
  &__pricing-note {
    text-align: center;
    font-size: 13px;
    color: var(--muted);
    margin-top: 32px;
    line-height: 1.6;
    opacity: 0.75;
  }
```

- [ ] **Step 5.6: Add entry card styles**

Find the line:
```scss
  // ── FAQ ──────────────────────────────────────────────
  &__faq {
```
Insert immediately before it:

```scss
  // ── Pricing entry cards ──────────────────────────────
  &__pricing-entries {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    max-width: 800px;
    margin-top: 40px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__pricing-entry {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    color: var(--text);
    transition: border-color 0.2s, background 0.2s;
    position: relative;

    &:hover {
      border-color: rgba(163, 230, 53, 0.3);
      background: var(--card-hover);
    }

    &--primary {
      border-color: rgba(163, 230, 53, 0.22);
      background: var(--feat-card);

      &:hover { border-color: rgba(163, 230, 53, 0.45); }
    }

    &__badge {
      display: inline-block;
      background: var(--accent-dim);
      color: var(--accent-text);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.8px;
      padding: 3px 10px;
      border-radius: 20px;
      border: 1px solid rgba(163, 230, 53, 0.2);
      margin-bottom: 4px;
    }

    &__icon {
      font-size: 22px;
      line-height: 1;
    }

    &__body {
      flex: 1;

      h3 {
        font-size: 17px;
        font-weight: 600;
        margin: 0 0 6px;
        color: var(--text);
      }

      p {
        font-size: 13px;
        color: var(--muted);
        line-height: 1.55;
        margin: 0 0 10px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;

        li {
          font-size: 12px;
          color: var(--muted);
          padding-left: 12px;
          position: relative;

          &::before {
            content: "·";
            position: absolute;
            left: 0;
            color: var(--accent-text);
          }
        }
      }
    }

    &__cta {
      font-size: 13px;
      font-weight: 500;
      color: var(--accent-text);
      margin-top: auto;
    }
  }

```

- [ ] **Step 5.7: Verify no broken styles**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio" && npm run dev 2>&1 | grep -i "error\|warn" | head -10
```

Expected: no SCSS errors. Open http://localhost:5173 and visually confirm `#precios` section looks correct with two entry cards side by side.

- [ ] **Step 5.8: Commit**

```bash
cd "/Users/giulian/Documents/My Projects/portfolio"
git add src/pages/Landing/landing.scss
git commit -m "style: remove old calc styles, add pricing entry card styles"
```

---

## Verification Checklist

After all tasks complete, verify these flows manually:

- [ ] **First visit**: Open site in incognito (or clear `lp-quote-modal-seen` from DevTools → Application → localStorage). Modal opens automatically after ~600ms in quiz mode.
- [ ] **Quiz flow**: Complete all 4 steps. Feature table opens pre-configured based on answers. Verify: pages answer → correct page tier selected; auth=yes → auth+db+admin checked.
- [ ] **Onetime vs monthly**: Switching the tab in the feature table changes the price (onetime ≈ ×1.2 more than monthly for same features).
- [ ] **Express**: Select Express in the quiz → price in feature table is ×1.4 of base.
- [ ] **Feature toggles**: Checking `admin` auto-checks `auth` and `db`. Checking `auth` auto-checks `db`.
- [ ] **Pages radio**: Only one page tier can be active at a time.
- [ ] **Currency toggle**: Clicking the USD/ARS label in the price bar switches and persists in localStorage.
- [ ] **WhatsApp CTA**: Clicking "Consultar →" opens WhatsApp with a pre-filled message listing all selected features and total price.
- [ ] **Close behavior**: X button, backdrop click, and Escape all close the modal.
- [ ] **Direct mode**: Clicking "Armar directo" from `#precios` opens table directly with `p1` pre-selected, all others unchecked.
- [ ] **Back button**: From feature table, "← Atrás" returns to quiz at step 4. In quiz, "← Atrás" goes to previous step.
- [ ] **Light theme**: Toggle light mode — modal card, options, and price bar all look correct with light vars.
- [ ] **Mobile**: Resize to 375px — modal slides up from bottom, single-column layout.
- [ ] **`#precios` hash link**: `giulianoconti.com/#precios` scrolls to the section with entry cards (not the old calculator).
- [ ] **TypeScript**: `npx tsc --noEmit` passes with zero errors.
