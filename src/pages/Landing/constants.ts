import type { ComponentType } from "react";
import { FileIcon, LayoutIcon, LayersIcon, GlobeIcon, LockIcon, ClockIcon, ZapIcon, WrenchIcon, KeyIcon, PenToolIcon, MonitorIcon } from "./icons";

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

// ── Landing data ──────────────────────────────────────────────────────────────

// 1920x1280 1560x998
// prettier-ignore
export const PROJECTS = [
  { image: "/assets/project-clinis.webp",       title: "Clinis",        desc: "", url: "https://www.clinis.com.ar/",              tags: ["React", "Next.js", "TypeScript", "Supabase"], role: "Web completa"      },
  { image: "/assets/project-wormholescan.webp", title: "Wormhole Scan", desc: "", url: "https://wormholescan.io/",                tags: ["React", "TypeScript", "Web3", "API"],         role: "Frontend completo" },
  { image: "/assets/project-portal.webp",       title: "Portal Bridge", desc: "", url: "https://portalbridge.com/",               tags: ["React", "Web3", "Wallets"],                   role: "Testing y fixes"   },
  { image: "/assets/project-xlabs.webp",        title: "xLabs",         desc: "", url: "https://xlabs.github.io/xlabs-website/",  tags: ["React", "TypeScript", "Animaciones"],         role: "Frontend completo" },
];

// prettier-ignore
export const PROCESS = [
  { n: "01", title: "Hablamos",   desc: ""  },
  { n: "02", title: "Propongo",   desc: ""  },
  { n: "03", title: "Desarrollo", desc: ""  },
  { n: "04", title: "Lanzamos",   desc: ""  },
];


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
  { id: "bookings",   label: "Sistema de turnos",        desc: "Reservas online con calendario y gestión",            price: 200, group: "extras",  triggers: ["db", "auth"] },
  { id: "seo",        label: "SEO + Google Analytics",   desc: "Optimización + tracking de visitas + GDPR",           price: 80,  group: "extras"                             },
  { id: "maps",       label: "Google Maps integrado",    desc: "Mapa interactivo con tu ubicación",                   price: 30,  group: "extras"                             },
  { id: "mercadopago",label: "Pagos con MercadoPago",    desc: "Checkout integrado — requiere cuenta MP tuya",        price: 120, group: "extras"                             },
  { id: "multilang",  label: "Multi-idioma (ES + EN)",   desc: "Soporte para dos o más idiomas",                      price: 150, group: "extras"                             },
  { id: "animations", label: "Animaciones premium",      desc: "Scroll effects y micro-interacciones",                price: 80,  group: "extras"                             },
];


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
      { value: "yes", icon: LockIcon,  label: "Sí, necesito login", desc: "Mis usuarios se registran y tienen perfil" },
    ],
  },
  {
    title: "¿Necesitás panel admin o CMS?",
    sub: "Para publicar contenido y gestionar tu web",
    key: "cms",
    options: [
      { value: "no",  icon: MonitorIcon,  label: "No, contenido fijo",     desc: "El contenido no cambia frecuentemente" },
      { value: "yes", icon: PenToolIcon,  label: "Sí, quiero panel admin", desc: "Necesito publicar contenido o administrar datos" },
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
      { value: "monthly", icon: WrenchIcon, label: "Giuliano lo gestiona", desc: "Setup + mensualidad. Hosting, soporte y updates incluidos" },
      { value: "onetime", icon: KeyIcon,    label: "Mis propias cuentas",  desc: "Pago único +40%. Hosting, soporte y cambios corren por tu cuenta" },
    ],
  },
];

