import type { ComponentType } from "react";
import { FileIcon, LayoutIcon, LayersIcon, GlobeIcon, LockIcon, ClockIcon, ZapIcon, WrenchIcon, KeyIcon } from "./icons";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Feature {
  id: string;
  label: string;
  desc: string;
  price: number;
  group: string;
  locked?: boolean;
  radio?: string;
  triggers?: string[];
}

export interface QuizStep {
  title: string;
  sub: string;
  key: string;
  options: {
    value: string;
    icon: ComponentType<{ className?: string; height?: number; width?: number }>;
    label: string;
    desc: string;
  }[];
}

// ── Contact ───────────────────────────────────────────────────────────────────

export const PHONE = "5493624043228";
export const MAIL = "tech@giulianoconti.com";
export const LINKEDIN = "https://www.linkedin.com/in/giulianoconti";
export const GITHUB = "https://github.com/giulianoconti";
export const WA_MSG = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
export const CONTACT_MSG = "Hola Giuliano! Me interesa contratarte para un proyecto. ¿Podemos hablar?";
export const HIRE_MSG = "Hola Giuliano! Quiero contratar tus servicios de desarrollo web.";

// ── Landing data ──────────────────────────────────────────────────────────────

// prettier-ignore
export const PROJECTS = [
  { image: "/assets/project-wormholescan.webp", title: "Wormhole Scan", desc: "Explorer multi-chain para el protocolo Wormhole. Miles de transacciones en tiempo real.",  url: "https://wormholescan.io/",  tags: ["React", "TypeScript", "Web3", "API"], role: "Frontend completo" },
  { image: "/assets/project-portal.webp",       title: "Portal Bridge", desc: "Bridge cross-chain de activos digitales. UI de alto tráfico con múltiples wallets.",       url: "https://portalbridge.com/", tags: ["React", "Web3", "Wallets"],           role: "Testing y fixes"   },
  { image: "/assets/project-xlabs.webp",        title: "xLabs",         desc: "Sitio institucional del equipo detrás de Wormhole. Diseño limpio y animaciones.",          url: "https://xlabs.xyz/",        tags: ["React", "TypeScript", "Animaciones"], role: "Frontend completo" },
];

// prettier-ignore
export const PROCESS = [
  { n: "01", title: "Hablamos",   desc: "Me contás el proyecto, qué necesitás y en qué plazo. Sin rodeos." },
  { n: "02", title: "Propongo",   desc: "Te mando un presupuesto detallado con alcance, tiempo de entrega y precio." },
  { n: "03", title: "Desarrollo", desc: "Trabajo en sprints y te muestro avances. Podés dar feedback en cada etapa." },
  { n: "04", title: "Lanzamos",   desc: "Deploy en producción, te entrego accesos y documentación. Queda todo funcionando." },
];

export const FAQS = [
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

// prettier-ignore
export const MARQUEE_ITEMS = ["React","Next.js","TypeScript","Node.js","Tailwind CSS","Supabase","Vercel","GitHub","Google Analytics","Sass","REST APIs","React","Next.js","TypeScript","Node.js","Tailwind CSS","Supabase","Vercel","GitHub","Google Analytics","Sass","REST APIs"];

export const CODE_TOKENS: { text: string; cls?: string }[] = [
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

// ── Quote modal ───────────────────────────────────────────────────────────────

export const CLOSE_MS = 220;
export const ARS_RATE = 1400;
export const MULTIPLIER_ONETIME = 1.4;
export const MULTIPLIER_EXPRESS = 1.4;

// prettier-ignore
export const FEATURES: Feature[] = [
  { id: "deploy",     label: "Hosting + CDN global",     desc: "Deploy automático en Vercel",                         price: 0,   group: "base",    locked: true              },
  { id: "ssl",        label: "SSL / HTTPS gratis",       desc: "Certificado de seguridad incluido",                   price: 0,   group: "base",    locked: true              },
  { id: "responsive", label: "Diseño responsive",        desc: "Se adapta a móvil, tablet y escritorio",              price: 0,   group: "base",    locked: true              },
  { id: "whatsapp",   label: "Botón WhatsApp flotante",  desc: "Acceso directo desde cualquier página",               price: 0,   group: "base",    locked: true              },
  { id: "contact",    label: "Formulario de contacto",   desc: "Email o WhatsApp al enviar",                          price: 0,   group: "base",    locked: true              },
  { id: "p1",         label: "1 página (landing)",       desc: "Una sola página de presentación",                     price: 200, group: "paginas", radio: "pages"            },
  { id: "p4",         label: "Hasta 4 páginas",          desc: "Inicio, servicios, contacto, etc.",                   price: 290, group: "paginas", radio: "pages"            },
  { id: "p10",        label: "Hasta 10 páginas",         desc: "Sitio completo con múltiples secciones",              price: 420, group: "paginas", radio: "pages"            },
  { id: "auth",       label: "Login / Usuarios",         desc: "Registro, inicio de sesión, sesiones",                price: 200, group: "backend", triggers: ["db"]          },
  { id: "cms",        label: "Panel admin + CMS",        desc: "Editá contenido e imágenes desde panel /admin",       price: 180, group: "backend", triggers: ["db"]          },
  { id: "db",         label: "Base de datos",            desc: "Almacenamiento de datos en tiempo real - PostgreSQL", price: 100, group: "backend"                            },
  { id: "roles",      label: "Roles y permisos",         desc: "Admin, editor, usuario — control de acceso",          price: 80,  group: "backend", triggers: ["auth", "db"]  },
  { id: "seo",        label: "SEO + Google Analytics",   desc: "Optimización + tracking de visitas + GDPR",           price: 80,  group: "extras"                             },
  { id: "maps",       label: "Google Maps integrado",    desc: "Mapa interactivo con tu ubicación",                   price: 30,  group: "extras"                             },
  { id: "mercadopago",label: "Pagos con MercadoPago",    desc: "Checkout integrado — requiere cuenta MP tuya",        price: 120, group: "extras"                             },
  { id: "multilang",  label: "Multi-idioma (ES + EN)",   desc: "Soporte para dos o más idiomas",                      price: 150, group: "extras"                             },
  { id: "animations", label: "Animaciones premium",      desc: "Scroll effects y micro-interacciones",                price: 80,  group: "extras"                             },
];

export const GROUP_LABELS: Record<string, string> = {
  base: "Siempre incluido",
  paginas: "Páginas del sitio · elegí una",
  backend: "Backend / Usuarios",
  extras: "Extras opcionales",
};

// prettier-ignore
export const QUIZ_STEPS: QuizStep[] = [
  {
    title: "¿Cuántas páginas necesitás?",
    sub: "Elegí la opción que mejor describe tu proyecto",
    key: "pages",
    options: [
      { value: "p1",  icon: FileIcon,   label: "1 página",     desc: "Solo necesito una landing page" },
      { value: "p4",  icon: LayoutIcon, label: "2–4 páginas",  desc: "Varias secciones para mi negocio" },
      { value: "p10", icon: LayersIcon, label: "5–10 páginas", desc: "Sitio completo con múltiples secciones" },
    ],
  },
  {
    title: "¿Tus clientes necesitan iniciar sesión?",
    sub: "Esto define si hay backend de usuarios",
    key: "auth",
    options: [
      { value: "no",  icon: GlobeIcon, label: "No, es público",     desc: "Solo info, contacto o catálogo" },
      { value: "yes", icon: LockIcon,  label: "Sí, necesito login", desc: "Registro, perfil, panel propio" },
    ],
  },
  {
    title: "¿Cuándo lo necesitás?",
    sub: "El timeline afecta el precio de setup",
    key: "timeline",
    options: [
      { value: "normal",  icon: ClockIcon, label: "Sin apuro",    desc: "Entrega estándar" },
      { value: "express", icon: ZapIcon,   label: "Express +40%", desc: "Prioridad absoluta hasta entregarlo" },
    ],
  },
  {
    title: "¿Cómo preferís la infraestructura?",
    sub: "Define si pagás mensual o una sola vez",
    key: "infra",
    options: [
      { value: "monthly", icon: WrenchIcon, label: "Giuliano lo gestiona", desc: "Setup + mensualidad. Cero dolores de cabeza" },
      { value: "onetime", icon: KeyIcon,    label: "Mis propias cuentas",  desc: "Pago único +40%. El código queda 100% tuyo" },
    ],
  },
];

export const FEATURE_GROUPS = Object.entries(
  FEATURES.reduce<Record<string, Feature[]>>((acc, f) => {
    (acc[f.group] ??= []).push(f);
    return acc;
  }, {}),
);

export const AR_TZ = new Set([
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

export function isArgentina(): boolean {
  return AR_TZ.has(Intl.DateTimeFormat().resolvedOptions().timeZone);
}
