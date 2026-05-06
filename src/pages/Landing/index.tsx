import { useState, useEffect } from "react";
import "./landing.scss";
import QuoteModal from "./QuoteModal";

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
    image: "/assets/project-wormholescan.webp",
    title: "Wormhole Scan",
    desc: "Explorer multi-chain para el protocolo Wormhole. Miles de transacciones en tiempo real.",
    url: "https://wormholescan.io/",
    tags: ["React", "TypeScript", "Web3", "API"],
    role: "Frontend completo",
  },
  {
    image: "/assets/project-portal.webp",
    title: "Portal Bridge",
    desc: "Bridge cross-chain de activos digitales. UI de alto tráfico con múltiples wallets.",
    url: "https://portalbridge.com/",
    tags: ["React", "Web3", "Wallets"],
    role: "Testing y fixes",
  },
  {
    image: "/assets/project-xlabs.webp",
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

const FAQS = [
  {
    q: "¿Cuál es la diferencia entre Mensual y Pago Único?",
    a: "En el modelo Mensual, manejo toda la infraestructura en mis cuentas (Vercel, GitHub, Supabase, etc). Vos solo comprás tu dominio y pagás una mensualidad. Cero dolores de cabeza técnicos. En el Pago Único, te entrego el proyecto completo en tus propias cuentas. Sos dueño absoluto del código, la infra y los accesos desde el día uno.",
  },
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Depende del tipo: landing page, 3–5 días hábiles. App web (multi-página + CMS), 1–2 semanas. App con login y panel admin, 2–3 semanas. Si necesitás prioridad, ofrezco un modo Express (+40% sobre el precio base) que reduce los tiempos a la mitad.",
  },
  {
    q: "¿Qué es el modo Express?",
    a: "Priorizo tu proyecto por encima de cualquier otro trabajo activo hasta entregarlo. El recargo del 40% aplica sobre el costo de setup o el precio total. En la primera consulta confirmamos si tengo disponibilidad para arrancarlo de inmediato.",
  },
  {
    q: "¿Qué pasa si quiero salir del plan Mensual?",
    a: "Sin problema. Si ya cumpliste 6 meses, te migro todo a tus propias cuentas (GitHub, Vercel, Supabase, etc) sin costo adicional. Antes de los 6 meses aplica un cargo de migración según el plan contratado.",
  },
  {
    q: "¿Cómo se hace el pago?",
    a: "Acepto pagos en USD (crypto USDT/USDC) y en ARS con Mercadopago o transferencia bancaria. La estructura estándar es 50% adelantado para arrancar y 50% al momento de la entrega. Para el modelo Mensual, el primer mes se abona junto con el setup.",
  },
  {
    q: "¿Puedo pedirte cambios después de la entrega?",
    a: "Sí. Cada proyecto incluye rondas de revisión antes del cierre. En el Mensual, los cambios de contenido están incluidos cada mes según el nivel de mantenimiento elegido. En el Pago Único, podemos presupuestar cambios puntuales o acordar un retainer mensual.",
  },
  {
    q: "¿Trabajás con clientes de otros países?",
    a: "Sí. Trabajo 100% remoto desde Resistencia, Argentina. Tengo experiencia colaborando con equipos de EEUU, Europa y América Latina. Coordinamos por WhatsApp, email o videollamada según tu zona horaria.",
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

// ── Hero code typewriter ─────────────────────────────────────────────────────

const CODE_TOKENS: { text: string; cls?: string }[] = [
  { text: "const", cls: "kw" },
  { text: " " },
  { text: "engineer", cls: "fn" },
  { text: " = {\n" },
  { text: "  " },
  { text: "name", cls: "str" },
  { text: ": " },
  { text: '"Giuliano Conti"', cls: "mt" },
  { text: ",\n" },
  { text: "  " },
  { text: "role", cls: "str" },
  { text: ": " },
  { text: '"Full-Stack Developer"', cls: "mt" },
  { text: ",\n" },
  { text: "  " },
  { text: "location", cls: "str" },
  { text: ": " },
  { text: '"Resistencia, AR 🇦🇷"', cls: "mt" },
  { text: ",\n" },
  { text: "  " },
  { text: "stack", cls: "str" },
  { text: ": [\n" },
  { text: "    " },
  { text: '"React"', cls: "mt" },
  { text: ", " },
  { text: '"Next.js"', cls: "mt" },
  { text: ",\n" },
  { text: "    " },
  { text: '"TypeScript"', cls: "mt" },
  { text: ", " },
  { text: '"Node.js"', cls: "mt" },
  { text: ",\n" },
  { text: "    " },
  { text: '"Web3"', cls: "mt" },
  { text: ", " },
  { text: '"Supabase"', cls: "mt" },
  { text: ",\n" },
  { text: "  ],\n" },
  { text: "  " },
  { text: "available", cls: "str" },
  { text: ": " },
  { text: "true", cls: "kw" },
  { text: ",\n" },
  { text: "  " },
  { text: "currency", cls: "str" },
  { text: ": [" },
  { text: '"USD"', cls: "mt" },
  { text: ", " },
  { text: '"ARS"', cls: "mt" },
  { text: "],\n" },
  { text: "}" },
];

const TOTAL_CHARS = CODE_TOKENS.reduce((sum, t) => sum + t.text.length, 0);

function renderCodeTokens(tokens: typeof CODE_TOKENS, typedCount: number): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let remaining = typedCount;
  let key = 0;
  for (const token of tokens) {
    if (remaining <= 0) break;
    const visible = token.text.slice(0, remaining);
    remaining -= token.text.length;
    nodes.push(
      token.cls ? (
        <span key={key++} className={token.cls}>
          {visible}
        </span>
      ) : (
        visible
      ),
    );
  }
  return nodes;
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
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteMode, setQuoteMode] = useState<"quiz" | "table">("quiz");
  const [typedCount, setTypedCount] = useState(0);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("lp-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("lp-theme", next);
      document.documentElement.style.background = next === "light" ? "#fafaf8" : "#000";
      return next;
    });
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("lp-quote-modal-seen")) {
      const timer = setTimeout(() => {
        setQuoteMode("quiz");
        setQuoteOpen(true);
      }, 600);
      return () => clearTimeout(timer);
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

  useEffect(() => {
    if (window.innerWidth < 960) {
      setTypedCount(TOTAL_CHARS);
      return;
    }
    let count = 0;
    let raf: number;
    let last = 0;
    const tick = (now: number) => {
      if (now - last >= 18) {
        last = now;
        count++;
        setTypedCount(count);
      }
      if (count < TOTAL_CHARS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
            <img
              alt="Logo"
              className="nav_inner_logo_img"
              src={theme === "light" ? "/assets/favicon_light.svg" : "/assets/favicon_dark.svg"}
              height={32}
              width={32}
            />
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
              {renderCodeTokens(CODE_TOKENS, typedCount)}
              <span className="lp__hero__card__cursor" />
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
                  <div className="lp__project-card__img__container">
                    <img className="lp__project-card__img" src={p.image} alt={p.title} loading="lazy" />
                  </div>
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
            <button type="button" className="lp__pricing-entry lp__pricing-entry--primary" onClick={() => openQuote("quiz")}>
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

            <button type="button" className="lp__pricing-entry" onClick={() => openQuote("table")}>
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

      {/* ── Quote modal ──────────────────────────────── */}
      {quoteOpen && <QuoteModal mode={quoteMode} onClose={closeQuote} />}

      {/* ── WhatsApp floating ────────────────────────── */}
      <a
        href={WA_MSG(HIRE_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        className="lp__wa"
        aria-label="Contactar por WhatsApp"
      >
        <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552">
          <defs>
            <linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
              <stop offset={0} stopColor="#57d163" />
              <stop offset={1} stopColor="#23b33a" />
            </linearGradient>
            <filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="3.531" />
            </filter>
          </defs>
          <path
            fill="#b3b3b3"
            d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
            filter="url(#a)"
          />
          <path
            fill="#fff"
            d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
          />
          <path
            fill="url(#linearGradient1780)"
            d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
          />
          <path
            fill="url(#b)"
            d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
          />
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
          />
        </svg>
      </a>
    </div>
  );
}
