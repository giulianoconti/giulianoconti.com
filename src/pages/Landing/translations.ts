import type { Lang } from "./lang";
import { FEATURES, QUIZ_STEPS } from "./constants";
import type { Feature, QuizStep } from "./constants";

// ── UI string translations ────────────────────────────────────────────────────

export const T: Record<Lang, Record<string, string>> = {
  es: {
    // Nav
    nav_services: "Servicios",
    nav_pricing: "Precios",
    nav_faq: "FAQ",
    nav_contact: "Contacto",
    nav_hire: "Contrátame →",
    nav_aria_theme: "Cambiar tema",
    nav_aria_lang: "Cambiar idioma",
    nav_aria_menu: "Menú",

    // Hero
    hero_tag: "Disponible para nuevos proyectos",
    hero_sub:
      "Soy Giuliano Conti, developer full-stack. Construyo sitios web y aplicaciones para negocios que quieren crecer online — rápidos, modernos y sin vueltas técnicas.",
    stat_1_label: "Años de experiencia",
    stat_2_label: "Proyectos entregados",
    stat_3_label: "Trabajo actual",

    // Projects section
    section_projects_label: "Proyectos",
    section_projects_h2_pre: "Lo que",
    section_projects_h2_em: "construí",
    section_projects_p: "Algunos productos en producción.",

    // Process section
    section_process_label: "Proceso",
    section_process_h2_pre: "Cómo",
    section_process_h2_em: "trabajamos",

    // Pricing section
    section_pricing_label: "Precios",
    section_pricing_h2_pre: "Armá tu web,",
    section_pricing_h2_em: "feature por feature",
    section_pricing_p:
      "Pagás exactamente por lo que necesitás. Sin paquetes fijos. Precios en USD o ARS. Sin costos ocultos.",
    pricing_pdf: "Términos y modelos de colaboración",
    pricing_quiz_badge: "Recomendado",
    pricing_quiz_title: "Hacé el quiz",
    pricing_quiz_desc: "5 preguntas rápidas. Pre-configuramos la tabla según tu proyecto.",
    pricing_quiz_b1: "¿Cuántas páginas necesitás?",
    pricing_quiz_b2: "¿Tus clientes necesitan iniciar sesión?",
    pricing_quiz_b3: "¿Necesitás panel admin o CMS?",
    pricing_quiz_b4: "¿Cuándo lo necesitás?",
    pricing_quiz_b5: "¿Cómo querés la infra?",
    pricing_quiz_cta: "Empezar quiz →",
    pricing_table_title: "Armar directo",
    pricing_table_desc: "Sabés lo que querés. Activá features vos mismo y ves el precio al instante.",
    pricing_table_cta: "Ver tabla →",

    // FAQ section
    section_faq_label: "FAQ",
    section_faq_h2_pre: "Preguntas",
    section_faq_h2_em: "frecuentes",

    // CTA / Contact section
    section_cta_label: "Contacto",
    section_cta_h2_line1: "¿Tenés un proyecto",
    section_cta_h2_line2_pre: "en",
    section_cta_h2_em: "mente",
    section_cta_h2_line2_post: "?",
    section_cta_p: "Escribime y hablamos. Respondo en menos de 24 horas.",

    // WA floating messages
    wa_contact: "Hola Giuliano! Me interesa contratarte para un proyecto. ¿Podemos hablar?",
    wa_hire: "Hola Giuliano! Quiero contratar tus servicios de desarrollo web.",

    // QuoteModal UI
    qm_title: "Tu cotización",
    qm_sub: "Activá lo que necesitás · precio en tiempo real",
    qm_back: "Atrás",
    qm_step_of: "de",
    qm_tab_monthly: "Mensual",
    qm_tab_badge: "Más elegido",
    qm_tab_onetime: "Pago único",
    qm_note_monthly:
      "Nos encargamos de todo: hosting, actualizaciones, seguridad y soporte continuo. Tu web siempre funcionando sin que tengas que preocuparte por nada.",
    qm_note_onetime:
      "Pago único con recargo del 40%. El código es 100% tuyo, pero hosting, soporte y cambios futuros corren por tu cuenta.",
    qm_total_label: "Total estimado",
    qm_no_monthly: "Sin cargo mensual",
    qm_monthly_from: "+ desde",
    qm_monthly_per: "/mes",
    qm_cta: "Consultar →",

    // WA message template
    wa_greeting: "Hola Giuliano!",
    wa_name_line: "Mi nombre es [Tu Nombre].",
    wa_intro: "Armé esta cotización en la calculadora:",
    wa_setup_label: "💰 Setup:",
    wa_monthly_label: "📅 Mensualidad:",
    wa_no_monthly: "📅 Sin cargo mensual",
    wa_features_label: "📋 Features seleccionadas:",
    wa_model_label: "Modelo:",
    wa_model_monthly: "Mensual",
    wa_model_onetime: "Pago único",
    wa_timeline_express: "Timeline: Express (+40%)",
    wa_timeline_normal: "Timeline: Sin apuro",
    wa_closing: "Quedo a la espera. ¡Gracias!",

    // Group labels
    group_base: "Siempre incluido",
    group_paginas: "Páginas del sitio · elegí una",
    group_backend: "Backend / Usuarios",
    group_extras: "Extras opcionales",
  },

  en: {
    // Nav
    nav_services: "Services",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_hire: "Hire me →",
    nav_aria_theme: "Toggle theme",
    nav_aria_lang: "Toggle language",
    nav_aria_menu: "Menu",

    // Hero
    hero_tag: "Available for new projects",
    hero_sub:
      "I'm Giuliano Conti, full-stack developer. I build websites and web applications for businesses that want to grow online — fast, modern, and without the technical headaches.",
    stat_1_label: "Years of experience",
    stat_2_label: "Projects delivered",
    stat_3_label: "Current work",

    // Projects section
    section_projects_label: "Projects",
    section_projects_h2_pre: "What I",
    section_projects_h2_em: "built",
    section_projects_p: "Some products in production.",

    // Process section
    section_process_label: "Process",
    section_process_h2_pre: "How we",
    section_process_h2_em: "work",

    // Pricing section
    section_pricing_label: "Pricing",
    section_pricing_h2_pre: "Build your website,",
    section_pricing_h2_em: "feature by feature",
    section_pricing_p: "You pay exactly for what you need. No fixed packages. Prices in USD or ARS. No hidden costs.",
    pricing_pdf: "Collaboration terms and models",
    pricing_quiz_badge: "Recommended",
    pricing_quiz_title: "Take the quiz",
    pricing_quiz_desc: "5 quick questions. We pre-configure the table based on your project.",
    pricing_quiz_b1: "How many pages do you need?",
    pricing_quiz_b2: "Do your clients need to log in?",
    pricing_quiz_b3: "Do you need an admin panel or CMS?",
    pricing_quiz_b4: "When do you need it?",
    pricing_quiz_b5: "How do you prefer the infrastructure?",
    pricing_quiz_cta: "Start quiz →",
    pricing_table_title: "Build directly",
    pricing_table_desc: "You know what you want. Enable features yourself and see the price instantly.",
    pricing_table_cta: "View table →",

    // FAQ section
    section_faq_label: "FAQ",
    section_faq_h2_pre: "Frequently asked",
    section_faq_h2_em: "questions",

    // CTA / Contact section
    section_cta_label: "Contact",
    section_cta_h2_line1: "Got a project",
    section_cta_h2_line2_pre: "in",
    section_cta_h2_em: "mind",
    section_cta_h2_line2_post: "?",
    section_cta_p: "Send me a message. I respond within 24 hours.",

    // WA floating messages
    wa_contact: "Hi Giuliano! I'm interested in hiring you for a project. Can we talk?",
    wa_hire: "Hi Giuliano! I want to hire your web development services.",

    // QuoteModal UI
    qm_title: "Your estimate",
    qm_sub: "Enable what you need · real-time pricing",
    qm_back: "Back",
    qm_step_of: "of",
    qm_tab_monthly: "Monthly",
    qm_tab_badge: "Most chosen",
    qm_tab_onetime: "One-time",
    qm_note_monthly:
      "We handle everything: hosting, updates, security and continuous support. Your website always running without you having to worry about anything.",
    qm_note_onetime:
      "One-time payment with a 40% surcharge. The code is 100% yours, but hosting, support and future changes are your responsibility.",
    qm_total_label: "Estimated total",
    qm_no_monthly: "No monthly fee",
    qm_monthly_from: "+ from",
    qm_monthly_per: "/mo",
    qm_cta: "Get in touch →",

    // WA message template
    wa_greeting: "Hi Giuliano!",
    wa_name_line: "My name is [Your Name].",
    wa_intro: "I built this quote in the calculator:",
    wa_setup_label: "💰 Setup:",
    wa_monthly_label: "📅 Monthly fee:",
    wa_no_monthly: "📅 No monthly fee",
    wa_features_label: "📋 Selected features:",
    wa_model_label: "Model:",
    wa_model_monthly: "Monthly",
    wa_model_onetime: "One-time",
    wa_timeline_express: "Timeline: Express (+40%)",
    wa_timeline_normal: "Timeline: No rush",
    wa_closing: "Looking forward to hearing from you. Thank you!",

    // Group labels
    group_base: "Always included",
    group_paginas: "Site pages · choose one",
    group_backend: "Backend / Users",
    group_extras: "Optional extras",
  },
};

// ── Feature label translations ────────────────────────────────────────────────

const FEATURE_LABELS: Record<Lang, Record<string, { label: string; desc: string }>> = {
  es: {
    deploy:      { label: "Hosting + CDN global",      desc: "Deploy automático en Vercel" },
    ssl:         { label: "SSL / HTTPS gratis",        desc: "Certificado de seguridad incluido" },
    responsive:  { label: "Diseño responsive",         desc: "Se adapta a móvil, tablet y escritorio" },
    whatsapp:    { label: "Botón WhatsApp flotante",   desc: "Acceso directo desde cualquier página" },
    contact:     { label: "Formulario de contacto",    desc: "Email o WhatsApp al enviar" },
    p1:          { label: "1 página (landing)",        desc: "Una sola página de presentación" },
    p4:          { label: "Hasta 4 páginas",           desc: "Inicio, servicios, contacto, etc." },
    p10:         { label: "Hasta 10 páginas",          desc: "Sitio completo con múltiples secciones" },
    auth:        { label: "Login / Usuarios",          desc: "Registro, inicio de sesión, sesiones" },
    cms:         { label: "Panel admin + CMS",         desc: "Editá contenido e imágenes desde panel /admin" },
    db:          { label: "Base de datos",             desc: "Almacenamiento de datos en tiempo real - PostgreSQL" },
    roles:       { label: "Roles y permisos",          desc: "Admin, editor, usuario — control de acceso" },
    bookings:    { label: "Sistema de turnos",         desc: "Reservas online con calendario y gestión" },
    seo:         { label: "SEO + Google Analytics",    desc: "Optimización + tracking de visitas + GDPR" },
    maps:        { label: "Google Maps integrado",     desc: "Mapa interactivo con tu ubicación" },
    mercadopago: { label: "Pagos con MercadoPago",     desc: "Checkout integrado — requiere cuenta MP tuya" },
    multilang:   { label: "Multi-idioma (ES + EN)",    desc: "Soporte para dos o más idiomas" },
    animations:  { label: "Animaciones premium",       desc: "Scroll effects y micro-interacciones" },
  },
  en: {
    deploy:      { label: "Hosting + CDN",             desc: "Automatic deploy on Vercel" },
    ssl:         { label: "SSL / HTTPS",               desc: "Free security certificate included" },
    responsive:  { label: "Responsive design",         desc: "Adapts to mobile, tablet and desktop" },
    whatsapp:    { label: "WhatsApp button",           desc: "Direct access from any page" },
    contact:     { label: "Contact form",              desc: "Email or WhatsApp on submit" },
    p1:          { label: "1 page (landing)",          desc: "A single presentation page" },
    p4:          { label: "Up to 4 pages",             desc: "Home, services, contact, etc." },
    p10:         { label: "Up to 10 pages",            desc: "Complete site with multiple sections" },
    auth:        { label: "Login / Users",             desc: "Registration, sign in, sessions" },
    cms:         { label: "Admin panel + CMS",         desc: "Edit content and images from the /admin panel" },
    db:          { label: "Database",                  desc: "Real-time data storage - PostgreSQL" },
    roles:       { label: "Roles & permissions",       desc: "Admin, editor, user — access control" },
    bookings:    { label: "Booking system",            desc: "Online reservations with calendar and management" },
    seo:         { label: "SEO + Google Analytics",    desc: "Optimization + visit tracking + GDPR" },
    maps:        { label: "Google Maps",               desc: "Interactive map with your location" },
    mercadopago: { label: "MercadoPago payments",      desc: "Integrated checkout — requires your MP account" },
    multilang:   { label: "Multi-language (ES + EN)",  desc: "Support for two or more languages" },
    animations:  { label: "Premium animations",        desc: "Scroll effects and micro-interactions" },
  },
};

export function getFeatures(lang: Lang): Feature[] {
  return FEATURES.map((f) => ({ ...f, ...FEATURE_LABELS[lang][f.id] }));
}

export function getGroupLabels(lang: Lang): Record<string, string> {
  return {
    base:     T[lang].group_base,
    paginas:  T[lang].group_paginas,
    backend:  T[lang].group_backend,
    extras:   T[lang].group_extras,
  };
}

export function getFeatureGroups(lang: Lang): [string, Feature[]][] {
  const features = getFeatures(lang);
  return Object.entries(
    features.reduce<Record<string, Feature[]>>((acc, f) => {
      (acc[f.group] ??= []).push(f);
      return acc;
    }, {}),
  );
}

// ── Quiz step text translations ───────────────────────────────────────────────

interface StepText {
  title: string;
  sub: string;
  options: { label: string; desc: string }[];
}

// prettier-ignore
const QUIZ_STEP_TEXT: Record<Lang, StepText[]> = {
  es: [
    {
      title: "¿Cuántas páginas necesitás?",
      sub: "Elegí la opción que mejor describe tu proyecto",
      options: [
        { label: "1 página",     desc: "Solo necesito una landing page" },
        { label: "2–4 páginas",  desc: "Varias secciones para mi negocio" },
        { label: "5–10 páginas", desc: "Sitio completo con múltiples secciones" },
      ],
    },
    {
      title: "¿Tus clientes necesitan iniciar sesión?",
      sub: "Esto define si hay backend de usuarios",
      options: [
        { label: "No, es público",     desc: "Solo info, contacto o catálogo" },
        { label: "Sí, necesito login", desc: "Mis usuarios se registran y tienen perfil" },
      ],
    },
    {
      title: "¿Necesitás panel admin o CMS?",
      sub: "Para publicar contenido y gestionar tu web",
      options: [
        { label: "Sí, quiero panel admin", desc: "Necesito publicar contenido o administrar datos" },
        { label: "No, contenido fijo",     desc: "El contenido no cambia frecuentemente" },
      ],
    },
    {
      title: "¿Cuándo lo necesitás?",
      sub: "El timeline afecta el precio de setup",
      options: [
        { label: "Sin apuro",    desc: "Entrega estándar" },
        { label: "Express +40%", desc: "Prioridad absoluta hasta entregarlo" },
      ],
    },
    {
      title: "¿Cómo preferís la infraestructura?",
      sub: "Define si pagás mensual o una sola vez",
      options: [
        { label: "Giuliano lo gestiona", desc: "Setup + mensualidad. Hosting, soporte y updates incluidos" },
        { label: "Mis propias cuentas",  desc: "Pago único +40%. Hosting, soporte y cambios corren por tu cuenta" },
      ],
    },
  ],
  en: [
    {
      title: "How many pages do you need?",
      sub: "Choose the option that best describes your project",
      options: [
        { label: "1 page",       desc: "Just a landing page" },
        { label: "2–4 pages",    desc: "Multiple sections for my business" },
        { label: "5–10 pages",   desc: "Complete site with multiple sections" },
      ],
    },
    {
      title: "Do your clients need to log in?",
      sub: "This defines whether you need a user backend",
      options: [
        { label: "No, it's public",    desc: "Just info, contact or catalog" },
        { label: "Yes, I need login",  desc: "My users register and have a profile" },
      ],
    },
    {
      title: "Do you need an admin panel or CMS?",
      sub: "To publish content and manage your website",
      options: [
        { label: "Yes, I want an admin panel", desc: "I need to publish content or manage data" },
        { label: "No, fixed content",          desc: "Content doesn't change frequently" },
      ],
    },
    {
      title: "When do you need it?",
      sub: "Timeline affects the setup price",
      options: [
        { label: "No rush",       desc: "Standard delivery" },
        { label: "Express +40%",  desc: "Absolute priority until delivered" },
      ],
    },
    {
      title: "How do you prefer the infrastructure?",
      sub: "Defines whether you pay monthly or once",
      options: [
        { label: "Giuliano manages it", desc: "Setup + monthly fee. Hosting, support and updates included" },
        { label: "My own accounts",     desc: "One-time +40%. Hosting, support and changes are your responsibility" },
      ],
    },
  ],
};

export function getQuizSteps(lang: Lang): QuizStep[] {
  return QUIZ_STEPS.map((step, i) => ({
    ...step,
    title: QUIZ_STEP_TEXT[lang][i].title,
    sub: QUIZ_STEP_TEXT[lang][i].sub,
    options: step.options.map((opt, j) => ({
      ...opt,
      label: QUIZ_STEP_TEXT[lang][i].options[j].label,
      desc: QUIZ_STEP_TEXT[lang][i].options[j].desc,
    })),
  }));
}

// ── Projects & Process translations ──────────────────────────────────────────

export const PROJECTS_TEXT: Record<Lang, { desc: string; role: string }[]> = {
  es: [
    { desc: "Explorer multi-chain para el protocolo Wormhole. Miles de transacciones en tiempo real.", role: "Frontend completo" },
    { desc: "Bridge cross-chain de activos digitales. UI de alto tráfico con múltiples wallets.",       role: "Testing y fixes"   },
    { desc: "Sitio institucional del equipo detrás de Wormhole. Diseño limpio y animaciones.",          role: "Frontend completo" },
  ],
  en: [
    { desc: "Multi-chain explorer for the Wormhole protocol. Thousands of transactions in real time.", role: "Full frontend" },
    { desc: "Cross-chain digital asset bridge. High-traffic UI with multiple wallets.",                role: "Testing & fixes" },
    { desc: "Institutional site for the team behind Wormhole. Clean design and animations.",           role: "Full frontend" },
  ],
};

export const PROCESS_TEXT: Record<Lang, { title: string; desc: string }[]> = {
  es: [
    { title: "Hablamos",   desc: "Me contás el proyecto, qué necesitás y en qué plazo. Sin rodeos." },
    { title: "Propongo",   desc: "Te mando un presupuesto detallado con alcance, tiempo de entrega y precio." },
    { title: "Desarrollo", desc: "Trabajo en sprints y te muestro avances. Podés dar feedback en cada etapa." },
    { title: "Lanzamos",   desc: "Deploy en producción, te entrego accesos y documentación. Queda todo funcionando." },
  ],
  en: [
    { title: "We talk",     desc: "Tell me about the project, what you need and by when. No detours." },
    { title: "I propose",   desc: "I send a detailed quote with scope, delivery time and price." },
    { title: "Development", desc: "I work in sprints and show you progress. You can give feedback at each stage." },
    { title: "We launch",   desc: "Deploy to production, I hand over access and documentation. Everything working." },
  ],
};

// ── FAQ translations ──────────────────────────────────────────────────────────

export const FAQS_TEXT: Record<Lang, { q: string; a: string }[]> = {
  es: [
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
  ],
  en: [
    {
      q: "What's the difference between Monthly and One-time?",
      a: "In the Monthly model, I manage all infrastructure in my accounts (Vercel, GitHub, Supabase, etc). You only buy your domain and pay a monthly fee. Zero technical headaches. In the One-time payment, I deliver the complete project to your own accounts. You own the code, infrastructure and access 100% from day one.",
    },
    {
      q: "How long does a project take?",
      a: "It depends on the type: landing page, 3–5 business days. Web app (multi-page + CMS), 1–2 weeks. App with login and admin panel, 2–3 weeks. If you need priority, I offer Express mode (+40% over base price) which cuts delivery time in half.",
    },
    {
      q: "What is Express mode?",
      a: "I prioritize your project above any other active work until delivery. The 40% surcharge applies to the setup cost or total price. In the first consultation we confirm if I have availability to start immediately.",
    },
    {
      q: "What happens if I want to leave the Monthly plan?",
      a: "No problem. If you've completed 6 months, I migrate everything to your own accounts (GitHub, Vercel, Supabase, etc.) at no additional cost. Before 6 months, a migration fee applies according to the contracted plan.",
    },
    {
      q: "How is payment made?",
      a: "I accept payments in USD (crypto USDT/USDC) and in ARS with Mercadopago or bank transfer. The standard structure is 50% upfront to start and 50% at delivery. For the Monthly model, the first month is paid together with the setup.",
    },
    {
      q: "Can I request changes after delivery?",
      a: "Yes. Each project includes revision rounds before closing. In the Monthly plan, content changes are included each month according to the chosen maintenance level. In One-time, we can budget specific changes or arrange a monthly retainer.",
    },
    {
      q: "Do you work with clients from other countries?",
      a: "Yes. I work 100% remotely from Resistencia, Argentina. I have experience collaborating with teams from the US, Europe and Latin America. We coordinate via WhatsApp, email or video call depending on your timezone.",
    },
  ],
};
