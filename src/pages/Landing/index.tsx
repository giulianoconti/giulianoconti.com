import { useState, useEffect } from "react";
import "./landing.scss";

const MAIL = "tech@giulianoconti.com";
const LINKEDIN = "https://www.linkedin.com/in/giulianoconti";
const GITHUB = "https://github.com/giulianoconti";
const WA_MSG = (msg: string) => `https://wa.me/5493624223320?text=${encodeURIComponent(msg)}`;
// const WA_MSG = (msg: string) => `https://wa.me/5493624043228?text=${encodeURIComponent(msg)}`;
const CONTACT_MSG = "Hola Giuliano! Me interesa contratarte para un proyecto. ¿Podemos hablar?";
const HIRE_MSG = "Hola Giuliano! Quiero contratar tus servicios de desarrollo web.";

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  // {
  //   image: "/assets/project-clinis.png",
  //   title: "Clinis",
  //   desc: "Plataforma de gestión para clínicas. Panel admin, turnos, pacientes y facturación.",
  //   url: "https://clinis.com.ar/",
  //   tags: ["Next.js", "Supabase", "Auth", "Admin"],
  //   role: "Web completa",
  // },
  {
    image: "/assets/project-wormholescan.png",
    title: "Wormhole Scan",
    desc: "Explorer multi-chain para el protocolo Wormhole. Miles de transacciones en tiempo real.",
    url: "https://wormholescan.io/",
    tags: ["React", "TypeScript", "Web3", "API"],
    role: "Frontend completo",
  },
  {
    image: "/assets/project-portal.png",
    title: "Portal Bridge",
    desc: "Bridge cross-chain de activos digitales. UI de alto tráfico con múltiples wallets.",
    url: "https://portalbridge.com/",
    tags: ["React", "Web3", "Wallets"],
    role: "Testing y fixes",
  },
  {
    image: "/assets/project-xlabs.png",
    title: "xLabs",
    desc: "Sitio institucional del equipo detrás de Wormhole. Diseño limpio y animaciones.",
    url: "https://xlabs.xyz/",
    tags: ["React", "TypeScript", "Animaciones"],
    role: "Frontend completo",
  },
];

const PROCESS = [
  { n: "01", title: "Hablamos", desc: "Me contás el proyecto, qué necesitás y en qué plazo. Sin rodeos." },
  { n: "02", title: "Propongo", desc: "Te mando un presupuesto detallado con alcance, tiempo de entrega y precio." },
  { n: "03", title: "Desarrollo", desc: "Trabajo en sprints y te muestro avances. Podés dar feedback en cada etapa." },
  {
    n: "04",
    title: "Lanzamos",
    desc: "Deploy en producción, te entrego accesos y documentación. Queda todo funcionando.",
  },
];

type PricingPlan = {
  name: string;
  desc: string;
  price: string;
  unit: string;
  note: string;
  badge?: string;
  features: string[];
  btnLabel: string;
  btnPrimary: boolean;
  mailSubject: string;
  disabled?: boolean;
};

const PRICING_AGENCIA: PricingPlan[] = [
  {
    name: "Starter",
    desc: "Template premium en mi infraestructura. La forma más rápida y económica de estar online.",
    price: "$30",
    unit: "USD/mes",
    note: "Setup inicial incluido",
    features: [
      "Template premium personalizada con tu marca",
      "Personalización de colores, tipografía y contenido",
      "Responsive mobile y desktop",
      "SEO básico on-page",
      "Hosting en Vercel + dominio conectado",
      "Hasta 1 cambio de contenido/mes",
    ],
    btnLabel: "Consultar →",
    btnPrimary: false,
    mailSubject: "Plan Starter Managed",
  },
  {
    name: "Pro",
    desc: "Landing page 100% custom en mi infraestructura. El cliente solo necesita comprar su dominio.",
    price: "$50",
    unit: "USD/mes",
    note: "Setup inicial incluido",
    features: [
      "Diseño 100% custom desde cero",
      "Responsive + animaciones y microinteracciones",
      "SEO on-page completo + Google Analytics",
      "Formulario de contacto",
      "Hosting en Vercel + dominio conectado",
      "Hasta 2 cambios de contenido/mes",
    ],
    btnLabel: "Consultar →",
    btnPrimary: false,
    mailSubject: "Plan Pro Managed",
  },
  {
    name: "Business",
    desc: "App web completa en mi infraestructura. Sin preocupaciones técnicas.",
    price: "$200",
    unit: "USD/mes",
    note: "Setup desde $800 USD",
    badge: "Más solicitado",
    features: [
      "Next.js App Router + TypeScript",
      "Base de datos Supabase",
      "Autenticación con Supabase Auth",
      "Dashboard o panel de administración",
      "API routes integradas",
      "SEO técnico + Google Analytics",
      "Hosting en Vercel + hasta 5 cambios/mes",
    ],
    btnLabel: "Contrátame →",
    btnPrimary: true,
    mailSubject: "Plan Business Managed",
  },
  {
    name: "Commerce",
    desc: "Business + registro de usuarios y pagos online integrados.",
    price: "$400",
    unit: "USD/mes",
    note: "Setup desde $1.500 USD",
    badge: "Próximamente",
    features: [
      "Todo del plan Business",
      "Registro y login de usuarios",
      "Pagos online integrados",
      "Panel de gestión de órdenes",
      "Notificaciones automáticas",
    ],
    btnLabel: "Consultar →",
    btnPrimary: false,
    mailSubject: "Plan Commerce Managed",
    disabled: true,
  },
];

const ARS_RATE = 1400;

const FAQS = [
  {
    q: "¿Cuál es la diferencia entre Mensual y Pago Único?",
    a: "En el plan Mensual, manejo toda la infraestructura en mis cuentas (Vercel, GitHub, etc.). Vos solo comprás tu dominio y pagás una mensualidad. Cero dolores de cabeza técnicos. En el Pago Único, te entrego el proyecto completo en tus propias cuentas. Sos dueño absoluto del código y la infra.",
  },
  {
    q: "¿Qué pasa si quiero salir del plan Mensual?",
    a: "Sin problema. Si ya cumpliste 6 meses, te migro todo a tus propias cuentas sin costo adicional. Antes de los 6 meses se aplica un cargo de migración según el plan.",
  },
  {
    q: "¿Trabajás con clientes de otros países?",
    a: "Sí. Trabajo 100% remoto desde Resistencia, Argentina. Tengo experiencia colaborando con equipos de EEUU, Europa y América Latina.",
  },
  {
    q: "¿Cómo se hace el pago?",
    a: "Acepto pagos en USD (por el momento solo crypto USDT/USDC) y en ARS. Generalmente pido 50% adelantado y 50% al entregar.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Una landing page bien hecha: 5-7 días. Una web completa: 2-4 semanas. Una app React/Next.js: desde 4 semanas según complejidad.",
  },
  {
    q: "¿Puedo pedirte cambios después de la entrega?",
    a: "Sí. Incluyo rondas de revisión en cada plan. En el Mensual los cambios de contenido están incluidos cada mes. En el Pago Único puedo presupuestarlos o armamos un retainer.",
  },
  {
    q: "¿Hacés mantenimiento y hosting?",
    a: "En el plan Mensual sí, está incluido. En el Pago Único te ayudo con el deploy inicial y para mantenimiento continuo podemos acordar un retainer mensual.",
  },
];

const MARQUEE_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "GitHub",
  "Google Analytics",
  "Sass",
  "REST APIs",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "GitHub",
  "Google Analytics",
  "Sass",
  "REST APIs",
];

// ── Pricing Calculator ───────────────────────────────────────────────────────

const CALC_TIMES: Record<string, { normal: string; express: string }> = {
  landing: { normal: "3–5 días", express: "1–2 días" },
  app: { normal: "1–2 semanas", express: "4–7 días" },
  "app-auth": { normal: "2–3 semanas", express: "1–2 semanas" },
  "app-payments": { normal: "3–4 semanas", express: "2–3 semanas" },
};

const CALC_BUILD: Record<string, number> = {
  landing: 300,
  app: 700,
  "app-auth": 1100,
  "app-payments": 1400,
};

const CALC_ONE_TIME: Record<string, number> = {
  landing: 400,
  app: 800,
  "app-auth": 1200,
  "app-payments": 1500,
};

const CALC_MONTHLY: Record<string, Record<string, number>> = {
  landing: { hosting: 20, basic: 40, full: 80 },
  app: { hosting: 30, basic: 80, full: 150 },
  "app-auth": { hosting: 40, basic: 100, full: 200 },
  "app-payments": { hosting: 50, basic: 120, full: 250 },
};

type CalcState = { project: string; infra: string; passwords: string; maintenance: string; timeline: string };
const CALC_INIT: CalcState = { project: "", infra: "", passwords: "", maintenance: "", timeline: "" };

function calcResult(c: CalcState): { setup: number; monthly: number } | null {
  if (!c.project || !c.infra) return null;
  if (c.infra === "mine") {
    if (!c.maintenance || !c.timeline) return null;
    const base = c.timeline === "express" ? Math.round(CALC_BUILD[c.project] * 1.4) : CALC_BUILD[c.project];
    return { setup: base, monthly: CALC_MONTHLY[c.project]?.[c.maintenance] ?? 0 };
  } else {
    if (!c.passwords || !c.timeline) return null;
    let setup = CALC_ONE_TIME[c.project] ?? 0;
    if (c.passwords === "no") setup = Math.round(setup * 1.2);
    if (c.timeline === "express") setup = Math.round(setup * 1.4);
    return { setup, monthly: 0 };
  }
}

function fmtPrice(n: number, currency: "usd" | "ars"): string {
  if (currency === "ars") return "$" + (n * ARS_RATE).toLocaleString("es-AR");
  return "$" + n.toLocaleString("en-US");
}

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

// ── Icons ─────────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      className="lp__cmp-check"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg
      className="lp__cmp-cross"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [calc, setCalc] = useState<CalcState>(CALC_INIT);

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
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("lp-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("lp-theme", next);
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".lp__reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("lp__reveal--visible");
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const navLinks = [
    { href: "#servicios", label: "Servicios" },
    { href: "#precios", label: "Precios" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <div className={`lp${theme === "light" ? " lp--light" : ""}`}>
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className={`lp__nav ${scrolled ? "lp__nav--scrolled" : ""}`}>
        <div className="lp__nav__inner">
          <a href="/" className="lp__nav__logo">
            <img alt="Logo" className="nav_inner_logo_img" src="/assets/favicon_dark.svg" height={32} width={32} />
            giulianoconti.com
          </a>

          <ul className="lp__nav__links">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="lp__nav__right">
            <button className="lp__nav__theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <button
            className={`lp__nav__hamburger ${menuOpen ? "lp__nav__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="lp__nav__mobile lp__nav__mobile--open">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <a href={`mailto:${MAIL}`} className="lp__nav__mobile__cta" onClick={() => setMenuOpen(false)}>
              Contrátame →
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="lp__hero" id="inicio">
        <div className="lp__hero__grid" />
        <div className="lp__hero__glow lp__hero__glow--1" />
        <div className="lp__hero__glow lp__hero__glow--2" />

        <div className="lp__hero__inner">
          {/* Left */}
          <div>
            <div className="lp__hero__tag">
              <span className="lp__hero__tag__dot" />
              Disponible para nuevos proyectos
            </div>

            <h1 className="lp__hero__h1">
              Software
              <br />
              <em>Engineer</em>
              <br />
              Freelance
            </h1>

            <p className="lp__hero__sub">
              Soy Giuliano Conti, developer full-stack. Construyo sitios web y aplicaciones para negocios que quieren
              crecer online — rápidos, modernos y sin vueltas técnicas.
            </p>

            <div className="lp__hero__actions">
              <a className="lp__hero__actions__primary" href={`mailto:${MAIL}`}>
                {MAIL}
              </a>

              <a
                className="lp__hero__actions__secondary"
                href={WA_MSG(CONTACT_MSG)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>

            <div className="lp__hero__stats">
              {[
                ["+3", "Años de experiencia"],
                ["+5", "Proyectos entregados"],
                ["xLabs", "Trabajo actual"],
              ].map(([v, l]) => (
                <div className="lp__hero__stats__item" key={l}>
                  <p>{v}</p>
                  <p>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – code card */}
          <div className="lp__hero__card">
            <div className="lp__hero__card__header">
              <span className="lp__hero__card__header__label">giuliano.config.ts</span>
            </div>
            <div className="lp__hero__card__code">
              <div>
                <span className="kw">const</span> <span className="fn">engineer</span> = {"{"}
              </div>
              <div className="pl">
                <span className="str">name</span>: <span className="mt">"Giuliano Conti"</span>,
              </div>
              <div className="pl">
                <span className="str">role</span>: <span className="mt">"Full-Stack Developer"</span>,
              </div>
              <div className="pl">
                <span className="str">location</span>: <span className="mt">"Resistencia, AR 🇦🇷"</span>,
              </div>
              <div className="pl">
                <span className="str">stack</span>: [
              </div>
              <div className="pl2">
                <span className="mt">"React"</span>, <span className="mt">"Next.js"</span>,
              </div>
              <div className="pl2">
                <span className="mt">"TypeScript"</span>, <span className="mt">"Node.js"</span>,
              </div>
              <div className="pl2">
                <span className="mt">"Web3"</span>, <span className="mt">"Supabase"</span>,
              </div>
              <div className="pl">],</div>
              <div className="pl">
                <span className="str">available</span>: <span className="kw">true</span>,
              </div>
              <div className="pl">
                <span className="str">currency</span>: [<span className="mt">"USD"</span>,{" "}
                <span className="mt">"ARS"</span>],
              </div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────── */}
      <div className="lp__marquee">
        <div className="lp__marquee__track">
          <div className="lp__marquee__group">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={item + i}>{item}</span>
            ))}
          </div>
          <div className="lp__marquee__group" aria-hidden>
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={item + i}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="lp__section" id="servicios">
        <div className="lp__container">
          <div className="lp__section-header lp__reveal">
            <span className="lp__section-header__label">Proyectos</span>
            <h2>
              Lo que <em>construí</em>
            </h2>
            <p>Algunos productos en producción.</p>
          </div>
          <div className="lp__projects-grid-wrap">
            <div className="lp__projects-grid">
              {PROJECTS.map((p, i) => (
                <a
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lp__project-card lp__reveal"
                  style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
                >
                  <img className="lp__project-card__img" src={p.image} aria-label={p.title} />
                  <div className="lp__project-card__body">
                    <div className="lp__project-card__top">
                      <h3>{p.title}</h3>
                      <span className="lp__project-card__role">{p.role}</span>
                    </div>
                    <p>{p.desc}</p>
                    <div className="lp__project-card__tags">
                      {p.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso ──────────────────────────────────── */}
      <section className="lp__section" id="proceso" style={{ paddingTop: 0 }}>
        <div className="lp__container">
          <div className="lp__section-header lp__reveal">
            <span className="lp__section-header__label">Proceso</span>
            <h2>
              Cómo <em>trabajamos</em>
            </h2>
          </div>
          <div className="lp__process-grid">
            {PROCESS.map((p, i) => (
              <div
                key={p.n}
                className="lp__process-step lp__reveal"
                style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
              >
                <div className="lp__process-step__n">{p.n}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

          {/* PDF link */}
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

          {/* Calculator */}
          <div className="lp__calc lp__reveal">
            {/* <div className="lp__calc lp__reveal__container"> */}
            <div className="lp__calc__steps">
              {/* Progress bar */}
              {(() => {
                const step3done = calc.infra === "mine" ? !!calc.maintenance : !!calc.passwords;
                const done = [!!calc.project, !!calc.infra, step3done, !!calc.timeline].filter(Boolean).length;
                return (
                  <div className="lp__calc__progress">
                    <div className="lp__calc__progress__labels">
                      <span>Paso {Math.min(done + 1, 4)} de 4</span>
                      <span>
                        {done === 4 ? "¡Listo! Revisá el precio →" : "Completá todos los pasos para ver el precio"}
                      </span>
                    </div>
                    <div className="lp__calc__progress__bar">
                      <div className="lp__calc__progress__bar__fill" style={{ width: `${(done / 4) * 100}%` }} />
                    </div>
                  </div>
                );
              })()}

              {/* Step 1 */}
              <div className="lp__calc__step">
                <div className="lp__calc__step__header">
                  <span className="lp__calc__step__num">01</span>
                  <span className="lp__calc__step__title">¿Qué necesitás construir?</span>
                </div>
                <div className="lp__calc__options">
                  {(
                    [
                      {
                        value: "landing",
                        label: "Landing page",
                        sub: "Una sola página. Presentación de negocio, portfolio o servicio.",
                        tags: ["GitHub", "Vercel"],
                      },
                      {
                        value: "app",
                        label: "App web",
                        sub: "Sitio multi-página con blog, catálogo o contenido editable vía CMS.",
                        tags: ["GitHub", "Vercel", "CMS", "Analytics"],
                      },
                      {
                        value: "app-auth",
                        label: "App con login",
                        sub: "Multi-página + acceso protegido. Panel admin, roles o registro de usuarios.",
                        tags: ["GitHub", "Vercel", "CMS", "Supabase", "Auth", "Analytics"],
                      },
                      {
                        value: "app-payments",
                        label: "App con pagos (Próximamente)",
                        sub: "Todo lo anterior más pagos integrados. E-commerce, suscripciones o checkout.",
                        tags: ["GitHub", "Vercel", "CMS", "Supabase", "Auth", "Pagos", "Analytics"],
                      },
                    ] as const
                  ).map((o, i) => (
                    <button
                      key={o.value}
                      className={`lp__calc__option${calc.project === o.value ? " lp__calc__option--active" : ""}${i === 0 && !calc.project ? " lp__calc__option--hint" : ""}`}
                      onClick={() => setCalc((c) => ({ ...c, project: o.value }))}
                      disabled={o.value === "app-payments"}
                    >
                      <span>{o.label}</span>
                      <small>{o.sub}</small>
                      <div className="lp__calc__option__tags">
                        {o.tags.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 */}
              <div className={`lp__calc__step${!calc.project ? " lp__calc__step--locked" : ""}`}>
                <div className="lp__calc__step__header">
                  <span className="lp__calc__step__num">02</span>
                  <span className="lp__calc__step__title">¿Dónde va la infraestructura?</span>
                </div>
                <div className="lp__calc__options">
                  <button
                    className={`lp__calc__option${calc.infra === "mine" ? " lp__calc__option--active" : ""}${!calc.infra && calc.project ? " lp__calc__option--hint" : ""}`}
                    onClick={() =>
                      setCalc((c) => ({ ...c, infra: "mine", passwords: "", maintenance: "", timeline: "" }))
                    }
                  >
                    <span>Giuliano lo gestiona — Mensual</span>
                    <small>
                      Manejo toda la infra en mis cuentas. Vos solo comprás el dominio. Cualquier problema técnico lo
                      resuelvo yo.
                    </small>
                    <Tooltip text="Hosting, base de datos, deploys y mantenimiento van por mi cuenta. Cero preocupaciones técnicas de tu lado." />
                  </button>
                  <button
                    className={`lp__calc__option${calc.infra === "theirs" ? " lp__calc__option--active" : ""}`}
                    onClick={() => setCalc((c) => ({ ...c, infra: "theirs", maintenance: "", timeline: "" }))}
                  >
                    <span>Tus cuentas — Pago Único</span>
                    <small>
                      El código y toda la infra quedan 100% a tu nombre. Una vez entregado, vos administrás todo.
                    </small>
                    <Tooltip text="Creamos las cuentas a tu nombre. Al finalizar sos responsable de la infraestructura. Sin mensualidad." />
                  </button>
                </div>
              </div>

              {/* Step 3 — passwords or maintenance depending on infra */}
              <div className={`lp__calc__step${!calc.infra ? " lp__calc__step--locked" : ""}`}>
                {calc.infra && calc.infra !== "mine" ? (
                  <>
                    <div className="lp__calc__step__header">
                      <span className="lp__calc__step__num">03</span>
                      <span className="lp__calc__step__title">¿Compartís las contraseñas temporalmente?</span>
                    </div>
                    <div className="lp__calc__options">
                      <button
                        className={`lp__calc__option${calc.passwords === "yes" ? " lp__calc__option--active" : ""}${!calc.passwords && calc.infra ? " lp__calc__option--hint" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, passwords: "yes" }))}
                      >
                        <span>Sí, sin problema</span>
                        <small>
                          Creás una contraseña temporal para GitHub (ej. "Web123456") durante el desarrollo. Al
                          entregar, la cambiás y listo.
                        </small>
                      </button>
                      <button
                        className={`lp__calc__option${calc.passwords === "no" ? " lp__calc__option--active" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, passwords: "no" }))}
                      >
                        <span>Sin contraseñas +20%</span>
                        <small>Configuramos en vivo por videollamada sin compartir credenciales.</small>
                        <Tooltip text="Acordamos una videollamada donde vos mismo ingresás las credenciales mientras yo guío el proceso. El recargo del 20% cubre el tiempo adicional requerido." />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lp__calc__step__header">
                      <span className="lp__calc__step__num">03</span>
                      <span className="lp__calc__step__title">¿Qué nivel de mantenimiento necesitás?</span>
                    </div>
                    <div className="lp__calc__options">
                      <button
                        className={`lp__calc__option${calc.maintenance === "hosting" ? " lp__calc__option--active" : ""}${!calc.maintenance && calc.infra ? " lp__calc__option--hint" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, maintenance: "hosting" }))}
                      >
                        <span>Solo hosting</span>
                        <small>La página funciona y está online. Sin cambios.</small>
                        <Tooltip text="Me encargo de que el sitio esté activo y funcionando. No incluye cambios de contenido técnico adicional." />
                      </button>
                      <button
                        className={`lp__calc__option${calc.maintenance === "basic" ? " lp__calc__option--active" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, maintenance: "basic" }))}
                      >
                        <span>Básico</span>
                        <small>Hosting + hasta 2 cambios de contenido por mes.</small>
                        <Tooltip text="Incluye hosting, monitoreo y hasta 2 cambios de texto, imágenes o secciones por mes." />
                      </button>
                      <button
                        className={`lp__calc__option${calc.maintenance === "full" ? " lp__calc__option--active" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, maintenance: "full" }))}
                      >
                        <span>Completo</span>
                        <small>Hosting + soporte técnico activo + cambios ilimitados.</small>
                        <Tooltip text="Soporte técnico, actualizaciones de dependencias y cambios ilimitados incluidos. Requiere que yo tenga acceso continuo a la infraestructura." />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Step 4 — timeline */}
              {(() => {
                const step3done = calc.infra === "mine" ? !!calc.maintenance : !!calc.passwords;
                return (
                  <div className={`lp__calc__step${!step3done ? " lp__calc__step--locked" : ""}`}>
                    <div className="lp__calc__step__header">
                      <span className="lp__calc__step__num">04</span>
                      <span className="lp__calc__step__title">¿Cuándo lo necesitás?</span>
                    </div>
                    <div className="lp__calc__options">
                      <button
                        className={`lp__calc__option${calc.timeline === "normal" ? " lp__calc__option--active" : ""}${!calc.timeline && step3done ? " lp__calc__option--hint" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, timeline: "normal" }))}
                      >
                        <span>Sin apuro</span>
                        <small>{CALC_TIMES[calc.project]?.normal || CALC_TIMES.landing.normal}</small>
                      </button>
                      <button
                        className={`lp__calc__option${calc.timeline === "express" ? " lp__calc__option--active" : ""}`}
                        onClick={() => setCalc((c) => ({ ...c, timeline: "express" }))}
                      >
                        <span>Express +40%</span>
                        <small>{CALC_TIMES[calc.project]?.express || CALC_TIMES.landing.express}</small>
                        <Tooltip text="Priorizo tu proyecto por encima de otros trabajos. El recargo del 40% aplica sobre el costo de setup." />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Summary */}
            <div className="lp__calc__summary">
              <div className="lp__calc__summary__label">Precio estimado</div>
              {(() => {
                const toggleCurrency = () => {
                  const next = currency === "usd" ? "ars" : "usd";
                  setCurrency(next);
                  localStorage.setItem("lp-currency", next);
                };
                const r = calcResult(calc);
                if (!r)
                  return (
                    <div className="lp__calc__summary__empty">
                      <p>Completá las opciones para ver el precio estimado al instante.</p>
                    </div>
                  );
                return (
                  <div className="lp__calc__summary__content">
                    <div className="lp__calc__summary__row">
                      <span>Setup inicial</span>
                      <strong>
                        {fmtPrice(r.setup, currency)}{" "}
                        <em className="lp__calc__summary__currency" onClick={toggleCurrency}>
                          {currency.toUpperCase()}
                        </em>
                      </strong>
                    </div>
                    <div className="lp__calc__summary__row">
                      <span>Mensualidad</span>
                      <strong>
                        {r.monthly > 0 ? (
                          <>
                            {fmtPrice(r.monthly, currency)}{" "}
                            <em className="lp__calc__summary__currency" onClick={toggleCurrency}>
                              {currency.toUpperCase()}/mes
                            </em>
                          </>
                        ) : (
                          "Sin cargo mensual"
                        )}
                      </strong>
                    </div>

                    <a
                      className="lp__calc__summary__btn"
                      href={WA_MSG(
                        [
                          "Qué tal Giuliano!",
                          "Mi nombre es [Tu Nombre].",
                          "",
                          "Me gustaría consultar sobre un proyecto. Estos son los datos que me devolvió la calculadora:",
                          "",
                          `💰 Precio estimado: ${fmtPrice(r.setup, currency)} setup + ${
                            r.monthly > 0 ? `${fmtPrice(r.monthly, currency)} mensual` : "sin cargo mensual"
                          }`,
                          "",
                          "📋 Detalles:",
                          `• Proyecto: ${calc.project}`,
                          `• Infra: ${calc.infra}`,
                          `• Mantenimiento: ${calc.maintenance || "No definido"}`,
                          `• Timeline: ${calc.timeline || "No definido"}`,
                          "",
                          "Quedo atento para avanzar o afinar detalles.",
                          "¡Gracias!",
                        ].join("\n"),
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consultar este plan →
                    </a>

                    <p className="lp__calc__summary__note">
                      Precio estimado · El presupuesto final se confirma en la primer consulta sin compromiso.
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Comparison tables */}
          <div className="lp__pricing-comparison">
            <button className="lp__pricing-comparison__toggle" onClick={() => setComparisonOpen((o) => !o)}>
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                style={{ transform: comparisonOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              {comparisonOpen ? "Ocultar comparación" : "Ver comparación detallada"}
            </button>

            <div
              className="lp__pricing-comparison__body"
              style={{ maxHeight: comparisonOpen ? "4000px" : "0px", opacity: comparisonOpen ? 1 : 0 }}
            >
              {/* Table 1 — Model comparison */}
              <div className="lp__pricing-comparison__section-title">¿Mensual o Pago Único?</div>
              <div className="lp__pricing-comparison__scroll">
                <table className="lp__pricing-comparison__table">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="featured">
                        Mensual <span className="lp__cmp-recommended">recomendado</span>
                      </th>
                      <th>Pago Único</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="section-header">
                      <td colSpan={3}>Comodidad</td>
                    </tr>
                    <tr>
                      <td>Setup inicial</td>
                      <td className="featured">
                        <Check /> Ninguno — yo me encargo de todo
                      </td>
                      <td>15–120 min crear y/o configurar cuentas</td>
                    </tr>
                    <tr>
                      <td>Gestión técnica continua</td>
                      <td className="featured">
                        <Check /> Incluida en la mensualidad
                      </td>
                      <td>A cargo del cliente</td>
                    </tr>
                    <tr>
                      <td>Hosting y mantenimiento</td>
                      <td className="featured">
                        <Check /> Gestionado por el desarrollador
                      </td>
                      <td>El cliente lo administra</td>
                    </tr>
                    <tr>
                      <td>Actualizaciones de contenido</td>
                      <td className="featured">
                        <Check /> Incluidas según plan
                      </td>
                      <td>Se presupuestan aparte</td>
                    </tr>

                    <tr className="section-header">
                      <td colSpan={3}>Propiedad y control</td>
                    </tr>
                    <tr>
                      <td>Propiedad del código</td>
                      <td className="featured">Licencia de uso activa</td>
                      <td>
                        <Check /> Transferencia total al pagar
                      </td>
                    </tr>
                    <tr>
                      <td>Infraestructura</td>
                      <td className="featured">Cuentas del desarrollador</td>
                      <td>
                        <Check /> Tus propias cuentas
                      </td>
                    </tr>
                    <tr>
                      <td>Rescisión</td>
                      <td className="featured">30 días de aviso · migración gratis desde el mes 6</td>
                      <td>No aplica</td>
                    </tr>

                    <tr className="section-header">
                      <td colSpan={3}>Costos</td>
                    </tr>
                    <tr>
                      <td>Estructura de pago</td>
                      <td className="featured">
                        <Check /> Setup + cuota mensual fija
                      </td>
                      <td>50% adelantado · 50% al entregar</td>
                    </tr>
                    <tr>
                      <td>Costo total a largo plazo</td>
                      <td className="featured">Previsible mes a mes</td>
                      <td>Mayor inicial, cero mensual</td>
                    </tr>
                    <tr>
                      <td>Sin compartir contraseñas</td>
                      <td className="featured">No aplica</td>
                      <td>+20% por videollamada guiada</td>
                    </tr>

                    <tr className="section-header">
                      <td colSpan={3}>Soporte</td>
                    </tr>
                    <tr>
                      <td>Soporte técnico posterior</td>
                      <td className="featured">
                        <Check /> Incluido mientras dure el contrato
                      </td>
                      <td>14 días post-entrega</td>
                    </tr>
                    <tr>
                      <td>Ideal para</td>
                      <td className="featured">No técnicos · negocios en crecimiento</td>
                      <td>Devs · empresas con equipo técnico</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Table 2 — Project type comparison */}
              <div className="lp__pricing-comparison__section-title" style={{ marginTop: 32 }}>
                ¿Qué incluye cada tipo de proyecto?
              </div>
              <div className="lp__pricing-comparison__scroll">
                <table className="lp__pricing-comparison__table lp__pricing-comparison__table--4col">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Landing page</th>
                      <th>App web</th>
                      <th className="featured">
                        App con login <span className="lp__cmp-recommended">Más popular</span>
                      </th>
                      <th className="disabled-col">App con pagos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="section-header">
                      <td colSpan={5}>Estructura</td>
                    </tr>
                    <tr>
                      <td>Rutas / páginas</td>
                      <td>1</td>
                      <td>Hasta 4</td>
                      <td className="featured">Hasta 10</td>
                      <td className="disabled-col">Hasta 20</td>
                    </tr>
                    <tr>
                      <td>Contenido editable (CMS)</td>
                      <td>—</td>
                      <td>
                        <Check />
                      </td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr>
                      <td>SEO + Analytics</td>
                      <td>—</td>
                      <td>
                        <Check />
                      </td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr className="section-header">
                      <td colSpan={5}>Backend</td>
                    </tr>
                    <tr>
                      <td>Base de datos (Supabase)</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr>
                      <td>API routes</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr className="section-header">
                      <td colSpan={5}>Acceso y usuarios</td>
                    </tr>
                    <tr>
                      <td>Autenticación</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr>
                      <td>Panel admin protegido</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr>
                      <td>Roles y permisos</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">
                        <Check />
                      </td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr className="section-header">
                      <td colSpan={5}>Pagos</td>
                    </tr>
                    <tr>
                      <td>Pagos integrados</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">—</td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr>
                      <td>Webhooks de pago</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">—</td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr>
                      <td>Gestión de órdenes</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="featured">—</td>
                      <td className="disabled-col">
                        <Check />
                      </td>
                    </tr>
                    <tr className="section-header">
                      <td colSpan={5}>Tiempos estimados</td>
                    </tr>
                    <tr>
                      <td>Entrega normal</td>
                      <td>3–5 días</td>
                      <td>1–2 semanas</td>
                      <td className="featured">2–3 semanas</td>
                      <td className="disabled-col">3–4 semanas</td>
                    </tr>
                    <tr>
                      <td>Entrega express (+40%)</td>
                      <td>1–2 días</td>
                      <td>4–7 días</td>
                      <td className="featured">1–2 semanas</td>
                      <td className="disabled-col">2–3 semanas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="lp__pricing-note">¿Proyecto personalizado? Escribime y hacemos un presupuesto a medida.</p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="lp__section" id="faq" style={{ paddingTop: 0 }}>
        <div className="lp__container">
          <div className="lp__section-header lp__reveal" style={{ textAlign: "center" }}>
            <span className="lp__section-header__label">FAQ</span>
            <h2>
              Preguntas <em>frecuentes</em>
            </h2>
          </div>
          <div className="lp__faq">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="lp__faq__item lp__reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
                <button className="lp__faq__btn" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  <span className="lp__faq__btn__q">{q}</span>
                  <span className={`lp__faq__btn__icon ${faqOpen === i ? "lp__faq__btn__icon--open" : ""}`}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                      <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      {faqOpen !== i && (
                        <line
                          x1="1"
                          y1="5"
                          x2="9"
                          y2="5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </span>
                </button>
                <div className={`lp__faq__answer ${faqOpen === i ? "lp__faq__answer--open" : ""}`}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ────────────────────────────── */}
      <section className="lp__cta" id="contacto">
        <div className="lp__cta__bg" />
        <div className="lp__cta__inner">
          <div className="lp__reveal">
            <div className="lp__cta__label">Contacto</div>
            <h2>
              ¿Tenés un proyecto
              <br />
              en <em>mente</em>?
            </h2>
            <p>Escribime y hablamos. Respondo en menos de 24 horas.</p>
            <div className="lp__cta__links">
              <a href={`mailto:${MAIL}`}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                {MAIL}
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={WA_MSG(CONTACT_MSG)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="lp__footer">
        <div className="lp__footer__inner">
          <div className="lp__footer__left">
            © {new Date().getFullYear()} Giuliano Conti · Resistencia, Chaco, Argentina
          </div>
          <div className="lp__footer__links">
            <a href="/portfolio">Portfolio</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={`mailto:${MAIL}`}>{MAIL}</a>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp floating ────────────────────────── */}
      <a
        href={WA_MSG(HIRE_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        className="lp__wa"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
