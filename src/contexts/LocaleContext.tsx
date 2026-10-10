import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = "en" | "es" | "pt";

type Translations = {
  nav: {
    chat: string;
    experience: string;
    tooltipLight: string;
    tooltipDark: string;
    tooltipLiteOn: string;
    tooltipLiteOff: string;
  };
  home: {
    subheader: string;
    title: string;
    bio: string;
    availableNow: string;
    availableSoon: (months: number) => string;
    statYearsLabel: string;
    statProjectsLabel: string;
    statCurrentLabel: string;
    ctaEmail: string;
    ctaWa: string;
  };
  experience: {
    title: string;
    jobTitle: string;
    wormholescan: string;
    wormholescanDesc: string;
    portal: string;
    portalDesc: string;
    xlabsDesc: string;
    xlabsCompany: string;
    xlabsRole: string;
    xlabsDate: string;
    freelanceCompany: string;
    freelancerJobRole: string;
    freelancerJobDate: string;
    clinis: string;
    clinisDesc: string;
    landings: string;
    landingsDesc: string;
    landingGiane: string;
    landingMati: string;
    protelab: string;
    protelabDesc: string;
    gleniCompany: string;
    gleniRole: string;
    gleniDate: string;
    mercat: string;
    mercatDesc: string;
    uwigo: string;
    uwigoDesc: string;
  };
  chat: {
    label: string;
    h2pre: string;
    h2em: string;
    p1: string;
    p2: string;
    placeholder: string;
    send: string;
    greeting: string;
    rateLimited: string;
    networkError: string;
    waFallback: string;
  };
  contact: {
    waMsg: string;
  };
};

const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      chat: "CHAT",
      experience: "EXPERIENCE",
      tooltipLight: "Light mode",
      tooltipDark: "Dark mode",
      tooltipLiteOn: "Enable lite mode",
      tooltipLiteOff: "Disable lite mode",
    },
    home: {
      subheader: "Software Engineer",
      title: "Giuliano Conti",
      bio: "I'm Giuliano Conti, software engineer. I build websites and web applications for businesses that want to grow online, fast, modern, and without the technical headaches.",
      availableNow: "Available",
      availableSoon: months => `On a project · Available in ~${months} ${months === 1 ? "month" : "months"}`,
      statYearsLabel: "Years of experience",
      statProjectsLabel: "Projects delivered",
      statCurrentLabel: "Current work",
      ctaEmail: "giuliconti1@gmail.com",
      ctaWa: "WhatsApp",
    },
    experience: {
      title: "Experience",
      jobTitle: "Software Engineer",
      wormholescan: "WormholeScan",
      wormholescanDesc:
        "Co-built WormholeScan's UI, a cross-chain explorer for millions of transactions and analytics.",
      portal: "Portal Bridge",
      portalDesc: "Improved the reliability of Portal Bridge by testing cross-chain transactions and fixing bugs.",
      xlabsDesc:
        "Built the xLabs website for staking (e.g. SOL), collaborating on improving its features and interface.",
      xlabsCompany: "xLabs",
      xlabsRole: "Frontend Engineer",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Software Engineer",
      freelancerJobDate: "2026 - Present",
      clinis: "Clinis",
      clinisDesc:
        "Built a catalog website for used and new vehicles for sale, boosting the dealer's visibility and sales.",
      landings: "Landings",
      landingsDesc:
        "Static sites for local professionals: instant loading, local SEO and bookings straight via WhatsApp.",
      landingGiane: "Physiotherapy",
      landingMati: "Law firm",
      protelab: "ProteLab",
      protelabDesc: "Built ProteLab's online store for sports supplements, with Mercado Pago checkout and an admin panel.",
      gleniCompany: "Gleni",
      gleniRole: "Software Engineer",
      gleniDate: "2026 - Present",
      mercat: "Mercat - Command Center",
      mercatDesc: "Migrated Mercat's admin panel to TypeScript, adding role-based permissions and 7.5x faster deploys.",
      uwigo: "UWIGO",
      uwigoDesc: "Modernizing UWIGO, a Chilean accounting ERP: Django REST API and a new Next.js frontend.",
    },
    chat: {
      label: "Chat",
      h2pre: "Tell me what",
      h2em: "you need",
      p1: "Describe your project and I'll give you a rough price.",
      p2: "Anything else, we can keep talking on WhatsApp.",
      placeholder: "Describe your project...",
      send: "Send",
      greeting:
        "Hi! Tell me what page you need, how many sections, login, admin panel, etc., and I'll give you a rough estimate.",
      rateLimited: "You've sent a lot of messages in a row. Wait a bit or message me directly on WhatsApp.",
      networkError: "Something went wrong. Try again or message me directly on WhatsApp.",
      waFallback: "Chat on WhatsApp",
    },
    contact: {
      waMsg: "Hi Giuliano! I'm interested in hiring you for a project. Can we talk?",
    },
  },
  es: {
    nav: {
      chat: "CHAT",
      experience: "EXPERIENCIA",
      tooltipLight: "Modo claro",
      tooltipDark: "Modo oscuro",
      tooltipLiteOn: "Activar modo lite",
      tooltipLiteOff: "Desactivar modo lite",
    },
    home: {
      subheader: "Ingeniero de Software",
      title: "Giuliano Conti",
      bio: "Soy Giuliano Conti, software engineer. Construyo sitios web y aplicaciones para negocios que quieren crecer online, rápidos, modernos y sin vueltas técnicas.",
      availableNow: "Disponible",
      availableSoon: months => `Proyecto en curso · Disponible en ~${months} ${months === 1 ? "mes" : "meses"}`,
      statYearsLabel: "Años de experiencia",
      statProjectsLabel: "Proyectos entregados",
      statCurrentLabel: "Trabajo actual",
      ctaEmail: "giuliconti1@gmail.com",
      ctaWa: "WhatsApp",
    },
    experience: {
      title: "Experiencia",
      jobTitle: "Ingeniero de Software",
      wormholescan: "WormholeScan",
      wormholescanDesc: "Co-desarrollé la UI del explorador WormholeScan: millones de transacciones y métricas.",
      portal: "Portal Bridge",
      portalDesc: "Mejoré la confiabilidad de Portal Bridge testeando transacciones cross-chain y corrigiendo errores.",
      xlabsDesc: "Desarrollé la web de staking de xLabs (ej. SOL), mejorando sus funcionalidades y su interfaz.",
      xlabsCompany: "xLabs",
      xlabsRole: "Ingeniero Frontend",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Ingeniero de Software",
      freelancerJobDate: "2026 - Presente",
      clinis: "Clinis",
      clinisDesc: "Creé un catálogo web de vehículos usados y 0km a la venta, generando mayor visibilidad y ventas.",
      landings: "Landings",
      landingsDesc: "Sitios estáticos para profesionales locales: carga instantánea, SEO local y turnos por WhatsApp.",
      landingGiane: "Kinesiología",
      landingMati: "Estudio jurídico",
      protelab: "ProteLab",
      protelabDesc: "Creé la tienda online de suplementos de ProteLab, con pagos por Mercado Pago y panel de admin.",
      gleniCompany: "Gleni",
      gleniRole: "Ingeniero de Software",
      gleniDate: "2026 - Presente",
      mercat: "Mercat - Command Center",
      mercatDesc: "Migré el panel admin de Mercat a TypeScript, con permisos por rol y deploys 7,5x más rápidos.",
      uwigo: "UWIGO",
      uwigoDesc: "Modernizo UWIGO, un ERP contable chileno: backend Django a API REST y nuevo front en Next.js.",
    },
    chat: {
      label: "Chat",
      h2pre: "Contame qué",
      h2em: "necesitás",
      p1: "Describí tu proyecto y te tiro un precio aproximado.",
      p2: "Cualquier otra duda, seguimos por WhatsApp.",
      placeholder: "Describí tu proyecto...",
      send: "Enviar",
      greeting:
        "Hola! Contame qué página necesitás, cuántas secciones, si lleva login, panel de admin, etc., y te doy un precio aproximado.",
      rateLimited: "Mandaste muchos mensajes seguidos. Esperá un toque o escribime directo por WhatsApp.",
      networkError: "Uy, algo falló. Probá de nuevo o escribime directo por WhatsApp.",
      waFallback: "Hablar por WhatsApp",
    },
    contact: {
      waMsg: "Hola Giuliano! Me interesa contratarte para un proyecto. ¿Podemos hablar?",
    },
  },
  pt: {
    nav: {
      chat: "CHAT",
      experience: "EXPERIÊNCIA",
      tooltipLight: "Modo claro",
      tooltipDark: "Modo escuro",
      tooltipLiteOn: "Ativar modo lite",
      tooltipLiteOff: "Desativar modo lite",
    },
    home: {
      subheader: "Engenheiro de Software",
      title: "Giuliano Conti",
      bio: "Sou Giuliano Conti, software engineer. Construo sites e aplicações web para negócios que querem crescer online, rápidos, modernos e sem dores de cabeça técnicas.",
      availableNow: "Disponível",
      availableSoon: months => `Projeto em andamento · Disponível em ~${months} ${months === 1 ? "mês" : "meses"}`,
      statYearsLabel: "Anos de experiência",
      statProjectsLabel: "Projetos entregues",
      statCurrentLabel: "Trabalho atual",
      ctaEmail: "giuliconti1@gmail.com",
      ctaWa: "WhatsApp",
    },
    experience: {
      title: "Experiência",
      jobTitle: "Engenheiro de Software",
      wormholescan: "WormholeScan",
      wormholescanDesc: "Co-desenvolvi a UI do WormholeScan, explorador de milhões de transações e análises.",
      portal: "Portal Bridge",
      portalDesc: "Melhorei a confiabilidade do Portal Bridge testando transações cross-chain e corrigindo erros.",
      xlabsDesc: "Desenvolvi o site de staking da xLabs (ex. SOL), melhorando suas funcionalidades e a interface.",
      xlabsCompany: "xLabs",
      xlabsRole: "Engenheiro Frontend",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Engenheiro de Software",
      freelancerJobDate: "2026 - Presente",
      clinis: "Clinis",
      clinisDesc: "Criei um catálogo web de veículos usados e 0km à venda, gerando maior visibilidade e vendas.",
      landings: "Landings",
      landingsDesc: "Sites estáticos para profissionais: carga instantânea, SEO local e agendamentos por WhatsApp.",
      landingGiane: "Fisioterapia",
      landingMati: "Escritório de advocacia",
      protelab: "ProteLab",
      protelabDesc: "Criei a loja online de suplementos da ProteLab, com pagamentos via Mercado Pago e painel admin.",
      gleniCompany: "Gleni",
      gleniRole: "Engenheiro de Software",
      gleniDate: "2026 - Presente",
      mercat: "Mercat - Command Center",
      mercatDesc: "Migrei o painel admin da Mercat para TypeScript, com permissões e deploys 7,5x mais rápidos.",
      uwigo: "UWIGO",
      uwigoDesc: "Modernizo o UWIGO, um ERP contábil chileno: backend Django em API REST e novo front em Next.js.",
    },
    chat: {
      label: "Chat",
      h2pre: "Me conta o que",
      h2em: "você precisa",
      p1: "Descreva seu projeto e te dou um preço aproximado.",
      p2: "Qualquer outra dúvida, seguimos pelo WhatsApp.",
      placeholder: "Descreva seu projeto...",
      send: "Enviar",
      greeting:
        "Oi! Me conta que página você precisa, quantas seções, login, painel admin, etc., e te dou um preço aproximado.",
      rateLimited: "Você mandou muitas mensagens seguidas. Espera um pouco ou fala direto comigo no WhatsApp.",
      networkError: "Algo deu errado. Tenta de novo ou fala direto comigo no WhatsApp.",
      waFallback: "Falar no WhatsApp",
    },
    contact: {
      waMsg: "Olá Giuliano! Tenho interesse em contratar você para um projeto. Podemos conversar?",
    },
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LOCALE_PARAM = "lang";
const DEFAULT_LOCALE: Locale = "es";
const VALID_LOCALES: Locale[] = ["es", "en", "pt"];

function getLocaleFromUrl(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const lang = new URLSearchParams(window.location.search).get(LOCALE_PARAM)?.toLowerCase();
  return VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : DEFAULT_LOCALE;
}

function setLocaleInUrl(locale: Locale) {
  const url = new URL(window.location.href);
  if (locale === DEFAULT_LOCALE) {
    url.searchParams.delete(LOCALE_PARAM);
  } else {
    url.searchParams.set(LOCALE_PARAM, locale);
  }
  window.history.replaceState({}, "", url.pathname + url.search + url.hash);
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocaleFromUrl);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setLocaleInUrl(next);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const rawLang = url.searchParams.get(LOCALE_PARAM);
    if (!rawLang) return;

    const normalizedLang = rawLang.toLowerCase();
    if (!VALID_LOCALES.includes(normalizedLang as Locale) || normalizedLang === DEFAULT_LOCALE) {
      url.searchParams.delete(LOCALE_PARAM);
    } else if (rawLang !== normalizedLang) {
      url.searchParams.set(LOCALE_PARAM, normalizedLang);
    } else {
      return;
    }

    window.history.replaceState({}, "", url.pathname + url.search + url.hash);
  }, []);

  const t = translations[locale];
  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- context hook is used with LocaleProvider
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
