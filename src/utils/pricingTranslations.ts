import type { Feature, QuizStep } from "./pricingData";
import { FEATURES, QUIZ_STEP_ICONS } from "./pricingData";

type PricingLang = "en" | "es";

export const PRICING_T: Record<PricingLang, Record<string, string>> = {
  es: {
    qm_title: "Tu cotización",
    qm_sub: "Activá lo que necesitás · precio en tiempo real",
    qm_back: "Atrás",
    qm_step_of: "de",
    qm_tab_monthly: "Mensual",
    qm_tab_badge: "Más elegido",
    qm_tab_onetime: "Pago único",
    qm_note_monthly:
      "Todo incluido: hosting, seguridad, soporte y actualizaciones. Sin setup inicial. Si en el futuro querés migrar a tus propias cuentas: < 1 año pagando → precio de pago único completo; ≥ 1 año → 50% de ese valor.",
    qm_note_onetime:
      "Pago único. El código es 100% tuyo, pero hosting, soporte y cambios futuros corren por tu cuenta.",
    qm_total_label: "Total estimado",
    qm_total_label_monthly: "Mensualidad estimada",
    qm_no_monthly: "Sin cargo mensual",
    qm_monthly_from: "+ desde",
    qm_monthly_per: "/mes",
    qm_cta: "Consultar →",
    qm_tier_badge: "Popular",
    qm_tier_basic_label: "Básico",
    qm_tier_standard_label: "Estándar",
    qm_tier_premium_label: "Premium",
    qm_tier_basic_note: "Mantengo tu web funcionando. Me encargo de hosting, dominio y Supabase si lo necesita. Sin horas de cambios incluidas.",
    qm_tier_standard_note: "Todo el Básico + hasta 8 horas de cambios y mejoras por mes.",
    qm_tier_premium_note: "Todo el Estándar + hasta 24 horas de trabajo por mes. Soporte prioritario.",
    wa_greeting: "Hola Giuliano!",
    wa_name_line: "Mi nombre es [Tu Nombre].",
    wa_intro: "Armé esta cotización en la calculadora:",
    wa_setup_label: "💰 Setup:",
    wa_monthly_label: "📅 Mensualidad:",
    wa_no_monthly: "📅 Sin cargo mensual",
    wa_features_label: "📋 Features seleccionadas:",
    wa_model_label: "Modelo:",
    wa_plan_label: "Plan:",
    wa_model_monthly: "Mensual",
    wa_model_onetime: "Pago único",
    wa_timeline_express: "Timeline: Express (+40%)",
    wa_timeline_normal: "Timeline: Sin apuro",
    wa_closing: "Quedo a la espera. ¡Gracias!",
    group_base: "Siempre incluido",
    group_paginas: "Páginas del sitio · elegí una",
    group_backend: "Backend / Usuarios",
    group_extras: "Extras opcionales",
  },
  en: {
    qm_title: "Your estimate",
    qm_sub: "Enable what you need · real-time pricing",
    qm_back: "Back",
    qm_step_of: "of",
    qm_tab_monthly: "Monthly",
    qm_tab_badge: "Most chosen",
    qm_tab_onetime: "One-time",
    qm_note_monthly:
      "Everything included: hosting, security, support and updates. No setup fee. If you later want to migrate to your own accounts: < 1 year paying → full one-time price; ≥ 1 year → 50% of that.",
    qm_note_onetime:
      "One-time payment. The code is 100% yours, but hosting, support and future changes are your responsibility.",
    qm_total_label: "Estimated total",
    qm_total_label_monthly: "Estimated monthly",
    qm_no_monthly: "No monthly fee",
    qm_monthly_from: "+ from",
    qm_monthly_per: "/mo",
    qm_cta: "Get in touch →",
    qm_tier_badge: "Popular",
    qm_tier_basic_label: "Basic",
    qm_tier_standard_label: "Standard",
    qm_tier_premium_label: "Premium",
    qm_tier_basic_note: "I keep your site running. I cover hosting, domain and Supabase if needed. No change hours included.",
    qm_tier_standard_note: "Everything in Basic + up to 8 hours of changes and improvements per month.",
    qm_tier_premium_note: "Everything in Standard + up to 24 hours of work per month. Priority support.",
    wa_greeting: "Hi Giuliano!",
    wa_name_line: "My name is [Your Name].",
    wa_intro: "I built this quote in the calculator:",
    wa_setup_label: "💰 Setup:",
    wa_monthly_label: "📅 Monthly fee:",
    wa_no_monthly: "📅 No monthly fee",
    wa_features_label: "📋 Selected features:",
    wa_model_label: "Model:",
    wa_plan_label: "Plan:",
    wa_model_monthly: "Monthly",
    wa_model_onetime: "One-time",
    wa_timeline_express: "Timeline: Express (+40%)",
    wa_timeline_normal: "Timeline: No rush",
    wa_closing: "Looking forward to hearing from you. Thank you!",
    group_base: "Always included",
    group_paginas: "Site pages · choose one",
    group_backend: "Backend / Users",
    group_extras: "Optional extras",
  },
};

const FEATURE_LABELS: Record<PricingLang, Record<string, { label: string; desc: string }>> = {
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

const QUIZ_STEP_TEXT: Record<PricingLang, { title: string; sub: string; options: { label: string; desc: string }[] }[]> = {
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
        { label: "No, contenido fijo",     desc: "El contenido no cambia frecuentemente" },
        { label: "Sí, quiero panel admin", desc: "Necesito publicar contenido o administrar datos" },
      ],
    },
    {
      title: "¿Cuándo lo necesitás?",
      sub: "El timeline afecta el precio solo en pago único",
      options: [
        { label: "Sin apuro",    desc: "Entrega estándar" },
        { label: "Express +40%", desc: "Prioridad absoluta hasta entregarlo" },
      ],
    },
    {
      title: "¿Cómo preferís la infraestructura?",
      sub: "Define si pagás mensual o una sola vez",
      options: [
        { label: "Giuliano lo gestiona", desc: "Solo mensualidad. Hosting, soporte y updates incluidos. Sin setup inicial" },
        { label: "Mis propias cuentas",  desc: "Pago único. Hosting, soporte y cambios corren por tu cuenta" },
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
        { label: "No, fixed content",          desc: "Content doesn't change frequently" },
        { label: "Yes, I want an admin panel", desc: "I need to publish content or manage data" },
      ],
    },
    {
      title: "When do you need it?",
      sub: "Timeline only affects one-time payment price",
      options: [
        { label: "No rush",       desc: "Standard delivery" },
        { label: "Express +40%",  desc: "Absolute priority until delivered" },
      ],
    },
    {
      title: "How do you prefer the infrastructure?",
      sub: "Defines whether you pay monthly or once",
      options: [
        { label: "Giuliano manages it", desc: "Monthly fee only. Hosting, support and updates included. No setup fee" },
        { label: "My own accounts",     desc: "One-time payment. Hosting, support and changes are your responsibility" },
      ],
    },
  ],
};

export function getFeatures(lang: PricingLang): Feature[] {
  return FEATURES.map((f) => ({ ...f, ...FEATURE_LABELS[lang][f.id] }));
}

export function getGroupLabels(lang: PricingLang): Record<string, string> {
  return {
    base:     PRICING_T[lang].group_base,
    paginas:  PRICING_T[lang].group_paginas,
    backend:  PRICING_T[lang].group_backend,
    extras:   PRICING_T[lang].group_extras,
  };
}

export function getFeatureGroups(lang: PricingLang): [string, Feature[]][] {
  const features = getFeatures(lang);
  return Object.entries(
    features.reduce<Record<string, Feature[]>>((acc, f) => {
      (acc[f.group] ??= []).push(f);
      return acc;
    }, {}),
  );
}

export function getQuizSteps(lang: PricingLang): QuizStep[] {
  const iconSets = QUIZ_STEP_ICONS;
  return QUIZ_STEP_TEXT[lang].map((step, i) => ({
    key: ["pages", "auth", "cms", "timeline", "infra"][i],
    title: step.title,
    sub: step.sub,
    options: step.options.map((opt, j) => ({
      value: [
        ["p1", "p4", "p10"],
        ["no", "yes"],
        ["no", "yes"],
        ["normal", "express"],
        ["monthly", "onetime"],
      ][i][j],
      icon: iconSets[i][j] as QuizStep["options"][number]["icon"],
      label: opt.label,
      desc: opt.desc,
    })),
  }));
}
