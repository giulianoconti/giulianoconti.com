import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = "en" | "es" | "pt";

type Translations = {
  nav: {
    services: string;
    pricing: string;
    faq: string;
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
    availableTag: string;
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
  };
  process: {
    label: string;
    h2pre: string;
    h2em: string;
    p: string;
  };
  pricing: {
    label: string;
    h2pre: string;
    h2em: string;
    p: string;
    pdfLabel: string;
    quizBadge: string;
    quizTitle: string;
    quizDesc: string;
    quizCta: string;
    tableTitle: string;
    tableDesc: string;
    tableCta: string;
  };
  faq: {
    label: string;
    h2pre: string;
    h2em: string;
  };
  contact: {
    headline: string;
    headline_2: string;
    ctaButton: string;
    emailLabel: string;
    waLabel: string;
    waMsg: string;
  };
  projects: {
    title: string;
    blackjack: string;
    blackjackDesc: string;
    sokoban: string;
    sokobanDesc: string;
    copicti: string;
    copictiDesc: string;
    portfolio3d: string;
    portfolio3dDesc: string;
    createResume: string;
    createResumeDesc: string;
    removeBg: string;
    removeBgDesc: string;
    giulianNews: string;
    giulianNewsDesc: string;
    pokemonFinder: string;
    pokemonFinderDesc: string;
    weatherTI: string;
    weatherTIDesc: string;
  };
};

const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      services: "SERVICES",
      pricing: "PRICING",
      faq: "FAQ",
      experience: "EXPERIENCE",
      tooltipLight: "Light mode",
      tooltipDark: "Dark mode",
      tooltipLiteOn: "Enable lite mode",
      tooltipLiteOff: "Disable lite mode",
    },
    home: {
      subheader: "Software Engineer",
      title: "Giuliano Conti",
      bio: "I'm Giuliano Conti, software engineer. I build websites and web applications for businesses that want to grow online — fast, modern, and without the technical headaches.",
      availableTag: "On a project · Available in ~1 month",
      statYearsLabel: "Years of experience",
      statProjectsLabel: "Projects delivered",
      statCurrentLabel: "Current work",
      ctaEmail: "tech@giulianoconti.com",
      ctaWa: "WhatsApp",
    },
    experience: {
      title: "Experience",
      jobTitle: "Software Engineer",
      wormholescan: "WormholeScan",
      wormholescanDesc: "Co-developed the user interface for WormholeScan, a cross-chain explorer used to view millions of transactions, charts, and analytics.",
      portal: "Portal",
      portalDesc: "Built the interface that uses Wormhole to transfer tokens between blockchains, making transactions, testing and fixing errors.",
      xlabsDesc: "Developed the xLabs website for staking (e.g. SOL), collaborating on functional and interface improvements.",
      xlabsCompany: "xLabs",
      xlabsRole: "Frontend Engineer",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Software Engineer",
      freelancerJobDate: "2026 - Present",
      clinis: "Clinis",
      clinisDesc: "Created a website to show the catalog of vehicles for sale, generating more visibility and sales.",
    },
    process: {
      label: "Process",
      h2pre: "How we",
      h2em: "work",
      p: "Four steps, no bureaucracy.",
    },
    pricing: {
      label: "Pricing",
      h2pre: "Build your website,",
      h2em: "feature by feature",
      p: "You pay exactly for what you need. No fixed packages. Prices in USD or ARS. No hidden costs.",
      pdfLabel: "Collaboration terms and models",
      quizBadge: "Recommended",
      quizTitle: "Take the quiz",
      quizDesc: "5 quick questions. We pre-configure the table based on your project.",
      quizCta: "Start quiz →",
      tableTitle: "Build directly",
      tableDesc: "You know what you want. Enable features yourself and see the price instantly.",
      tableCta: "View table →",
    },
    faq: {
      label: "FAQ",
      h2pre: "Frequently asked",
      h2em: "questions",
    },
    contact: {
      headline: "Got a project",
      headline_2: "in mind?",
      ctaButton: "Get in Touch",
      emailLabel: "tech@giulianoconti.com",
      waLabel: "WhatsApp",
      waMsg: "Hi Giuliano! I'm interested in hiring you for a project. Can we talk?",
    },
    projects: {
      title: "Projects",
      blackjack: "Blackjack",
      blackjackDesc: "Web card game built with React and Firebase.",
      sokoban: "Sokoban",
      sokobanDesc: "Classic puzzle game built in React.",
      copicti: "Copicti",
      copictiDesc: "Social app to share and discover content.",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "3D portfolio experience built with Three.js.",
      createResume: "Create Resume",
      createResumeDesc: "Online CV builder — generate and download your resume.",
      removeBg: "RemoBG",
      removeBgDesc: "AI-powered background remover for images.",
      giulianNews: "News App",
      giulianNewsDesc: "News aggregator built with React.",
      pokemonFinder: "Pokémon Finder",
      pokemonFinderDesc: "Search and explore Pokémon using the PokéAPI.",
      weatherTI: "Weather TI",
      weatherTIDesc: "Real-time weather forecast app.",
    },
  },
  es: {
    nav: {
      services: "SERVICIOS",
      pricing: "PRECIOS",
      faq: "FAQ",
      experience: "EXPERIENCIA",
      tooltipLight: "Modo claro",
      tooltipDark: "Modo oscuro",
      tooltipLiteOn: "Activar modo lite",
      tooltipLiteOff: "Desactivar modo lite",
    },
    home: {
      subheader: "Software Engineer",
      title: "Giuliano Conti",
      bio: "Soy Giuliano Conti, software engineer. Construyo sitios web y aplicaciones para negocios que quieren crecer online — rápidos, modernos y sin vueltas técnicas.",
      availableTag: "Proyecto en curso · Disponible en ~1 mes",
      statYearsLabel: "Años de experiencia",
      statProjectsLabel: "Proyectos entregados",
      statCurrentLabel: "Trabajo actual",
      ctaEmail: "tech@giulianoconti.com",
      ctaWa: "WhatsApp",
    },
    experience: {
      title: "Experiencia",
      jobTitle: "Software Engineer",
      wormholescan: "WormholeScan",
      wormholescanDesc: "Co-desarrollé la interfaz de usuario para WormholeScan, un explorador utilizado para ver millones de transacciones, gráficas y análisis.",
      portal: "Portal",
      portalDesc: "Construí la interfaz que utiliza Wormhole para transferir tokens entre blockchains, haciendo transacciones, testeando y fixeando errores.",
      xlabsDesc: "Desarrollé la web de xLabs para staking (ej. SOL), colaborando en mejorar funcionalidades y la interfaz.",
      xlabsCompany: "xLabs",
      xlabsRole: "Ingeniero Frontend",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Software Engineer",
      freelancerJobDate: "2026 - Presente",
      clinis: "Clinis",
      clinisDesc: "Creé un sitio web para mostrar el catálogo de vehículos a la venta, generando mayor visibilidad y ventas.",
    },
    process: {
      label: "Proceso",
      h2pre: "Cómo",
      h2em: "trabajamos",
      p: "Cuatro pasos, sin burocracia.",
    },
    pricing: {
      label: "Precios",
      h2pre: "Armá tu web,",
      h2em: "feature por feature",
      p: "Pagás exactamente por lo que necesitás. Sin paquetes fijos. Precios en USD o ARS. Sin costos ocultos.",
      pdfLabel: "Términos y modelos de colaboración",
      quizBadge: "Recomendado",
      quizTitle: "Hacé el quiz",
      quizDesc: "5 preguntas rápidas. Pre-configuramos la tabla según tu proyecto.",
      quizCta: "Empezar quiz →",
      tableTitle: "Armar directo",
      tableDesc: "Sabés lo que querés. Activá features vos mismo y ves el precio al instante.",
      tableCta: "Ver tabla →",
    },
    faq: {
      label: "FAQ",
      h2pre: "Preguntas",
      h2em: "frecuentes",
    },
    contact: {
      headline: "¿Tenés un proyecto",
      headline_2: "en mente?",
      ctaButton: "Escribime",
      emailLabel: "tech@giulianoconti.com",
      waLabel: "WhatsApp",
      waMsg: "Hola Giuliano! Me interesa contratarte para un proyecto. ¿Podemos hablar?",
    },
    projects: {
      title: "Proyectos",
      blackjack: "Blackjack",
      blackjackDesc: "Juego de cartas web construido con React y Firebase.",
      sokoban: "Sokoban",
      sokobanDesc: "Juego de puzzle clásico construido en React.",
      copicti: "Copicti",
      copictiDesc: "App social para compartir y descubrir contenido.",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Portfolio 3D interactivo construido con Three.js.",
      createResume: "Create Resume",
      createResumeDesc: "Creador de CV online — generá y descargá tu currículum.",
      removeBg: "RemoBG",
      removeBgDesc: "Herramienta con IA para remover el fondo de imágenes.",
      giulianNews: "News App",
      giulianNewsDesc: "Agregador de noticias construido con React.",
      pokemonFinder: "Pokémon Finder",
      pokemonFinderDesc: "Buscá y explorá Pokémon usando la PokéAPI.",
      weatherTI: "Weather TI",
      weatherTIDesc: "App de pronóstico del tiempo en tiempo real.",
    },
  },
  pt: {
    nav: {
      services: "SERVIÇOS",
      pricing: "PREÇOS",
      faq: "FAQ",
      experience: "EXPERIÊNCIA",
      tooltipLight: "Modo claro",
      tooltipDark: "Modo escuro",
      tooltipLiteOn: "Ativar modo lite",
      tooltipLiteOff: "Desativar modo lite",
    },
    home: {
      subheader: "Software Engineer",
      title: "Giuliano Conti",
      bio: "Sou Giuliano Conti, software engineer. Construo sites e aplicações web para negócios que querem crescer online — rápidos, modernos e sem dores de cabeça técnicas.",
      availableTag: "Projeto em andamento · Disponível em ~1 mês",
      statYearsLabel: "Anos de experiência",
      statProjectsLabel: "Projetos entregues",
      statCurrentLabel: "Trabalho atual",
      ctaEmail: "tech@giulianoconti.com",
      ctaWa: "WhatsApp",
    },
    experience: {
      title: "Experiência",
      jobTitle: "Software Engineer",
      wormholescan: "WormholeScan",
      wormholescanDesc: "Desenvolvi a interface de usuário para WormholeScan, um explorador utilizado para ver milhões de transações, gráficas e análises.",
      portal: "Portal",
      portalDesc: "Desenvolvi a interface que utiliza Wormhole para transferir tokens entre blockchains, fazendo transações, testando e corrigindo erros.",
      xlabsDesc: "Desenvolvi o site xLabs para staking (ex. SOL), colaborando em melhorias funcionais e de interface.",
      xlabsCompany: "xLabs",
      xlabsRole: "Engenheiro Frontend",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Software Engineer",
      freelancerJobDate: "2026 - Presente",
      clinis: "Clinis",
      clinisDesc: "Criei um site para mostrar o catálogo de veículos à venda, gerando maior visibilidade e vendas.",
    },
    process: {
      label: "Processo",
      h2pre: "Como",
      h2em: "trabalhamos",
      p: "Quatro etapas, sem burocracia.",
    },
    pricing: {
      label: "Preços",
      h2pre: "Monte seu site,",
      h2em: "feature por feature",
      p: "Você paga exatamente pelo que precisa. Sem pacotes fixos. Preços em USD ou ARS. Sem custos ocultos.",
      pdfLabel: "Termos e modelos de colaboração",
      quizBadge: "Recomendado",
      quizTitle: "Faça o quiz",
      quizDesc: "5 perguntas rápidas. Pré-configuramos a tabela de acordo com seu projeto.",
      quizCta: "Iniciar quiz →",
      tableTitle: "Montar direto",
      tableDesc: "Você sabe o que quer. Ative features você mesmo e veja o preço na hora.",
      tableCta: "Ver tabela →",
    },
    faq: {
      label: "FAQ",
      h2pre: "Perguntas",
      h2em: "frequentes",
    },
    contact: {
      headline: "Tem um projeto",
      headline_2: "em mente?",
      ctaButton: "Entre em contato",
      emailLabel: "tech@giulianoconti.com",
      waLabel: "WhatsApp",
      waMsg: "Olá Giuliano! Tenho interesse em contratar você para um projeto. Podemos conversar?",
    },
    projects: {
      title: "Projetos",
      blackjack: "Blackjack",
      blackjackDesc: "Jogo de cartas web construído com React e Firebase.",
      sokoban: "Sokoban",
      sokobanDesc: "Jogo de puzzle clássico construído em React.",
      copicti: "Copicti",
      copictiDesc: "App social para compartilhar e descobrir conteúdo.",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Portfólio 3D interativo construído com Three.js.",
      createResume: "Create Resume",
      createResumeDesc: "Criador de CV online — gere e baixe seu currículo.",
      removeBg: "RemoBG",
      removeBgDesc: "Ferramenta com IA para remover o fundo de imagens.",
      giulianNews: "News App",
      giulianNewsDesc: "Agregador de notícias construído com React.",
      pokemonFinder: "Pokémon Finder",
      pokemonFinderDesc: "Busque e explore Pokémon usando a PokéAPI.",
      weatherTI: "Weather TI",
      weatherTIDesc: "App de previsão do tempo em tempo real.",
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
