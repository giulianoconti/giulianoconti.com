import type { Feature } from "./pricingData.js";
import { FEATURES } from "./pricingData.js";

type PricingLang = "en" | "es" | "pt";

export const PRICING_T: Record<PricingLang, Record<string, string>> = {
  es: {
    qm_title: "Tu cotización",
    qm_sub: "Activá lo que necesitás · precio en tiempo real",
    qm_back: "Atrás",
    qm_close: "Cerrar",
    qm_currency_toggle: "Cambiar moneda",
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
    qm_tier_basic_note:
      "Mantenimiento. Hosting, Supabase y dominio incluidos. Sin horas de cambios.",
    qm_tier_standard_note: "Todo el Básico + hasta 8 horas de cambios y mejoras por mes.",
    qm_tier_premium_note:
      "Todo el Estándar + hasta 24 horas de trabajo por mes. Soporte prioritario.",
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
    qm_close: "Close",
    qm_currency_toggle: "Toggle currency",
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
    qm_tier_basic_note: "Maintenance. Hosting, Supabase and domain included. No change hours.",
    qm_tier_standard_note:
      "Everything in Basic + up to 8 hours of changes and improvements per month.",
    qm_tier_premium_note:
      "Everything in Standard + up to 24 hours of work per month. Priority support.",
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
    wa_closing: "Looking forward to hearing from you. Thank you!",
    group_base: "Always included",
    group_paginas: "Site pages · choose one",
    group_backend: "Backend / Users",
    group_extras: "Optional extras",
  },
  pt: {
    qm_title: "Sua cotação",
    qm_sub: "Ative o que precisar · preço em tempo real",
    qm_back: "Voltar",
    qm_close: "Fechar",
    qm_currency_toggle: "Alternar moeda",
    qm_step_of: "de",
    qm_tab_monthly: "Mensal",
    qm_tab_badge: "Mais escolhido",
    qm_tab_onetime: "Pagamento único",
    qm_note_monthly:
      "Tudo incluído: hospedagem, segurança, suporte e atualizações. Sem taxa de setup. Se quiser migrar para suas próprias contas: < 1 ano pagando → preço único completo; ≥ 1 ano → 50% desse valor.",
    qm_note_onetime:
      "Pagamento único. O código é 100% seu, mas hospedagem, suporte e mudanças futuras são por sua conta.",
    qm_total_label: "Total estimado",
    qm_total_label_monthly: "Mensalidade estimada",
    qm_no_monthly: "Sem cobrança mensal",
    qm_monthly_from: "+ a partir de",
    qm_monthly_per: "/mês",
    qm_cta: "Consultar →",
    qm_tier_badge: "Popular",
    qm_tier_basic_label: "Básico",
    qm_tier_standard_label: "Padrão",
    qm_tier_premium_label: "Premium",
    qm_tier_basic_note:
      "Manutenção. Hospedagem, Supabase e domínio incluídos. Sem horas de alterações.",
    qm_tier_standard_note: "Tudo do Básico + até 8 horas de alterações e melhorias por mês.",
    qm_tier_premium_note: "Tudo do Padrão + até 24 horas de trabalho por mês. Suporte prioritário.",
    wa_greeting: "Olá Giuliano!",
    wa_name_line: "Meu nome é [Seu Nome].",
    wa_intro: "Montei esta cotação na calculadora:",
    wa_setup_label: "💰 Setup:",
    wa_monthly_label: "📅 Mensalidade:",
    wa_no_monthly: "📅 Sem cobrança mensal",
    wa_features_label: "📋 Funcionalidades selecionadas:",
    wa_model_label: "Modelo:",
    wa_plan_label: "Plano:",
    wa_model_monthly: "Mensal",
    wa_model_onetime: "Pagamento único",
    wa_closing: "Aguardo seu contato. Obrigado!",
    group_base: "Sempre incluído",
    group_paginas: "Páginas do site · escolha uma",
    group_backend: "Backend / Usuários",
    group_extras: "Extras opcionais",
  },
};

const FEATURE_LABELS: Record<PricingLang, Record<string, { label: string; desc: string }>> = {
  es: {
    deploy: { label: "Hosting + CDN global", desc: "Deploy automático en Vercel" },
    ssl: { label: "SSL / HTTPS gratis", desc: "Certificado de seguridad incluido" },
    responsive: { label: "Diseño responsive", desc: "Se adapta a móvil, tablet y escritorio" },
    whatsapp: { label: "Botón WhatsApp flotante", desc: "Acceso directo desde cualquier página" },
    p1: { label: "1 página (landing)", desc: "Una sola página de presentación" },
    p4: { label: "Hasta 4 páginas", desc: "Inicio, servicios, contacto, etc." },
    p10: { label: "Hasta 10 páginas", desc: "Sitio completo con múltiples secciones" },
    auth: { label: "Login / Usuarios", desc: "Registro, inicio de sesión, sesiones" },
    cms: { label: "Panel admin + CMS", desc: "Editá contenido e imágenes desde panel /admin" },
    db: { label: "Base de datos", desc: "Almacenamiento de datos en tiempo real - PostgreSQL" },
    roles: { label: "Roles y permisos", desc: "Admin, editor, usuario: control de acceso" },
    bookings: { label: "Sistema de turnos", desc: "Reservas online con calendario y gestión" },
    seo: { label: "SEO + Google Analytics", desc: "Optimización + tracking de visitas + GDPR" },
    multilang: { label: "Multi-idioma (ES + EN)", desc: "Soporte para dos o más idiomas" },
    animations: { label: "Animaciones premium", desc: "Scroll effects y micro-interacciones" },
  },
  en: {
    deploy: { label: "Hosting + CDN", desc: "Automatic deploy on Vercel" },
    ssl: { label: "SSL / HTTPS", desc: "Free security certificate included" },
    responsive: { label: "Responsive design", desc: "Adapts to mobile, tablet and desktop" },
    whatsapp: { label: "WhatsApp button", desc: "Direct access from any page" },
    p1: { label: "1 page (landing)", desc: "A single presentation page" },
    p4: { label: "Up to 4 pages", desc: "Home, services, contact, etc." },
    p10: { label: "Up to 10 pages", desc: "Complete site with multiple sections" },
    auth: { label: "Login / Users", desc: "Registration, sign in, sessions" },
    cms: { label: "Admin panel + CMS", desc: "Edit content and images from the /admin panel" },
    db: { label: "Database", desc: "Real-time data storage - PostgreSQL" },
    roles: { label: "Roles & permissions", desc: "Admin, editor, user: access control" },
    bookings: { label: "Booking system", desc: "Online reservations with calendar and management" },
    seo: { label: "SEO + Google Analytics", desc: "Optimization + visit tracking + GDPR" },
    multilang: { label: "Multi-language (ES + EN)", desc: "Support for two or more languages" },
    animations: { label: "Premium animations", desc: "Scroll effects and micro-interactions" },
  },
  pt: {
    deploy: { label: "Hospedagem + CDN global", desc: "Deploy automático na Vercel" },
    ssl: { label: "SSL / HTTPS grátis", desc: "Certificado de segurança incluído" },
    responsive: { label: "Design responsivo", desc: "Adapta para celular, tablet e desktop" },
    whatsapp: { label: "Botão WhatsApp flutuante", desc: "Acesso direto de qualquer página" },
    p1: { label: "1 página (landing)", desc: "Uma única página de apresentação" },
    p4: { label: "Até 4 páginas", desc: "Início, serviços, contato, etc." },
    p10: { label: "Até 10 páginas", desc: "Site completo com múltiplas seções" },
    auth: { label: "Login / Usuários", desc: "Cadastro, login, sessões" },
    cms: { label: "Painel admin + CMS", desc: "Edite conteúdo e imagens pelo painel /admin" },
    db: { label: "Banco de dados", desc: "Armazenamento em tempo real - PostgreSQL" },
    roles: { label: "Papéis e permissões", desc: "Admin, editor, usuário: controle de acesso" },
    bookings: { label: "Sistema de agendamentos", desc: "Reservas online com calendário e gestão" },
    seo: { label: "SEO + Google Analytics", desc: "Otimização + rastreamento de visitas + GDPR" },
    multilang: { label: "Multi-idioma (ES + EN)", desc: "Suporte para dois ou mais idiomas" },
    animations: { label: "Animações premium", desc: "Efeitos de scroll e micro-interações" },
  },
};

export function getFeatures(lang: PricingLang): Feature[] {
  return FEATURES.map(f => ({ ...f, ...FEATURE_LABELS[lang][f.id] }));
}

export function getGroupLabels(lang: PricingLang): Record<string, string> {
  return {
    base: PRICING_T[lang].group_base,
    paginas: PRICING_T[lang].group_paginas,
    backend: PRICING_T[lang].group_backend,
    extras: PRICING_T[lang].group_extras,
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

