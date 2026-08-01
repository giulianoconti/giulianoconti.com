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
  chat: {
    label: string;
    h2pre: string;
    h2em: string;
    p: string;
    placeholder: string;
    send: string;
    greeting: string;
    rateLimited: string;
    networkError: string;
    waFallback: string;
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
      bio: "I'm Giuliano Conti, software engineer. I build websites and web applications for businesses that want to grow online — fast, modern, and without the technical headaches.",
      availableTag: "On a project · Available in ~1 month",
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
        "Co-developed the user interface for WormholeScan, a cross-chain explorer used to view millions of transactions, charts, and analytics.",
      portal: "Portal",
      portalDesc:
        "Built the interface that uses Wormhole to transfer tokens between blockchains, making transactions, testing and fixing errors.",
      xlabsDesc:
        "Developed the xLabs website for staking (e.g. SOL), collaborating on functional and interface improvements.",
      xlabsCompany: "xLabs",
      xlabsRole: "Frontend Engineer",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Software Engineer",
      freelancerJobDate: "2026 - Present",
      clinis: "Clinis",
      clinisDesc:
        "Created a website to show the catalog of vehicles for sale, generating more visibility and sales.",
    },
    chat: {
      label: "Chat",
      h2pre: "Tell me what",
      h2em: "you need",
      p: "Describe your project and I'll give you a rough price. Anything else, we can keep talking on WhatsApp.",
      placeholder: "E.g: I need a landing page with a WhatsApp button...",
      send: "Send",
      greeting:
        "Hi! Tell me what page you need — how many sections, login, admin panel, etc. — and I'll give you a rough estimate.",
      rateLimited: "You've sent a lot of messages in a row. Wait a bit or message me directly on WhatsApp.",
      networkError: "Something went wrong. Try again or message me directly on WhatsApp.",
      waFallback: "Chat on WhatsApp",
    },
    contact: {
      headline: "Got a project",
      headline_2: "in mind?",
      ctaButton: "Get in Touch",
      emailLabel: "giuliconti1@gmail.com",
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
      bio: "Soy Giuliano Conti, software engineer. Construyo sitios web y aplicaciones para negocios que quieren crecer online — rápidos, modernos y sin vueltas técnicas.",
      availableTag: "Proyecto en curso · Disponible en ~1 mes",
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
      wormholescanDesc:
        "Co-desarrollé la interfaz de usuario para WormholeScan, un explorador utilizado para ver millones de transacciones, gráficas y análisis.",
      portal: "Portal",
      portalDesc:
        "Construí la interfaz que utiliza Wormhole para transferir tokens entre blockchains, haciendo transacciones, testeando y fixeando errores.",
      xlabsDesc:
        "Desarrollé la web de xLabs para staking (ej. SOL), colaborando en mejorar funcionalidades y la interfaz.",
      xlabsCompany: "xLabs",
      xlabsRole: "Ingeniero Frontend",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Ingeniero de Software",
      freelancerJobDate: "2026 - Presente",
      clinis: "Clinis",
      clinisDesc:
        "Creé un sitio web para mostrar el catálogo de vehículos a la venta, generando mayor visibilidad y ventas.",
    },
    chat: {
      label: "Chat",
      h2pre: "Contame qué",
      h2em: "necesitás",
      p: "Describí tu proyecto y te tiro un precio aproximado. Cualquier otra duda, seguimos por WhatsApp.",
      placeholder: "Ej: necesito una landing con botón de WhatsApp...",
      send: "Enviar",
      greeting:
        "Hola! Contame qué página necesitás — cuántas secciones, si lleva login, panel de admin, etc. — y te doy un precio aproximado.",
      rateLimited: "Mandaste muchos mensajes seguidos. Esperá un toque o escribime directo por WhatsApp.",
      networkError: "Uy, algo falló. Probá de nuevo o escribime directo por WhatsApp.",
      waFallback: "Hablar por WhatsApp",
    },
    contact: {
      headline: "¿Tenés un proyecto",
      headline_2: "en mente?",
      ctaButton: "Escribime",
      emailLabel: "giuliconti1@gmail.com",
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
      bio: "Sou Giuliano Conti, software engineer. Construo sites e aplicações web para negócios que querem crescer online — rápidos, modernos e sem dores de cabeça técnicas.",
      availableTag: "Projeto em andamento · Disponível em ~1 mês",
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
      wormholescanDesc:
        "Desenvolvi a interface de usuário para WormholeScan, um explorador utilizado para ver milhões de transações, gráficas e análises.",
      portal: "Portal",
      portalDesc:
        "Desenvolvi a interface que utiliza Wormhole para transferir tokens entre blockchains, fazendo transações, testando e corrigindo erros.",
      xlabsDesc:
        "Desenvolvi o site xLabs para staking (ex. SOL), colaborando em melhorias funcionais e de interface.",
      xlabsCompany: "xLabs",
      xlabsRole: "Engenheiro Frontend",
      xlabsDate: "2023 - 2026",
      freelanceCompany: "Freelance",
      freelancerJobRole: "Engenheiro de Software",
      freelancerJobDate: "2026 - Presente",
      clinis: "Clinis",
      clinisDesc:
        "Criei um site para mostrar o catálogo de veículos à venda, gerando maior visibilidade e vendas.",
    },
    chat: {
      label: "Chat",
      h2pre: "Me conta o que",
      h2em: "você precisa",
      p: "Descreva seu projeto e te dou um preço aproximado. Qualquer outra dúvida, seguimos pelo WhatsApp.",
      placeholder: "Ex: preciso de uma landing com botão de WhatsApp...",
      send: "Enviar",
      greeting:
        "Oi! Me conta que página você precisa — quantas seções, login, painel admin, etc. — e te dou um preço aproximado.",
      rateLimited: "Você mandou muitas mensagens seguidas. Espera um pouco ou fala direto comigo no WhatsApp.",
      networkError: "Algo deu errado. Tenta de novo ou fala direto comigo no WhatsApp.",
      waFallback: "Falar no WhatsApp",
    },
    contact: {
      headline: "Tem um projeto",
      headline_2: "em mente?",
      ctaButton: "Entre em contato",
      emailLabel: "giuliconti1@gmail.com",
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
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context hook is used with LocaleProvider
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
