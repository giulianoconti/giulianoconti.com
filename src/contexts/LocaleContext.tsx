import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = "en" | "es" | "pt";

type Translations = {
  nav: { home: string; experience: string; projects: string; contact: string };
  home: {
    subheader: string;
    title: string;
    bio: string;
    skills: string;
    resume: string;
  };
  experience: {
    title: string;
    jobTitle: string;
    date: string;
    wormholescan: string;
    wormholescanDesc: string;
    portal: string;
    portalDesc: string;
    xlabsDesc: string;
    freelancerRole: string;
    freelancerDate: string;
    freelancerDesc: string;
  };
  contact: {
    title: string;
    text: string;
    button: string;
    message: string;
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
  footer: { name: string };
};

const translations: Record<Locale, Translations> = {
  en: {
    nav: { home: "Home", experience: "Experience", projects: "Projects", contact: "Contact" },
    home: {
      subheader: "Frontend Engineer",
      title: "Giuliano Conti",
      bio: "+3 years of experience mainly working with React, Next.js and blockchain technologies.",
      skills: "React · TypeScript · HTML · CSS · Web3",
      resume: "Resume",
    },
    experience: {
      title: "Experience",
      jobTitle: "Frontend Engineer",
      date: "2023 - Current",
      wormholescan: "WormholeScan",
      wormholescanDesc:
        "Co-developed the user interface for WormholeScan, a cross-chain explorer used to view millions of transactions, charts, and analytics.",
      portal: "Portal",
      portalDesc:
        "Built the interface that uses Wormhole to transfer tokens between blockchains, making transactions, testing and fixing errors.",
      xlabsDesc:
        "Developed functionality for the xLabs website for staking (e.g. SOL), collaborating on functional and interface improvements.",
      freelancerRole: "Freelancer",
      freelancerDate: "2022 - Current",
      freelancerDesc:
        "Created a website to show the catalog of vehicles for sale, generating more visibility and sales.",
    },
    contact: {
      title: "Contact",
      text: "If you want to chat about opportunities or anything else, get in touch.",
      button: "Contact Me",
      message: "Hello, how are you?",
    },
    projects: {
      title: "Projects",
      blackjack: "Blackjack",
      blackjackDesc: "Card game, you must get a higher score than the bank, without going over 21.",
      copicti: "Copicti",
      copictiDesc: "Website to buy prefabricated paintings or paintings designed by yourself.",
      createResume: "Create Resume",
      createResumeDesc: "Create your Resume completing a form with this application.",
      giulianNews: "Giulian News",
      giulianNewsDesc: "Website to keep you informed.",
      pokemonFinder: "Pokemon Finder",
      pokemonFinderDesc: "Website where you have to register to be able to search for pokemons.",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Learning and creating a 3D portfolio with threejs.",
      removeBg: "Remove BG",
      removeBgDesc: "App where you can remove one or more colors from an image.",
      sokoban: "Sokoban",
      sokobanDesc: "Puzzle where the player pushes boxes to the storage points.",
      weatherTI: "WeatherTI",
      weatherTIDesc: "Page to keep you informed about current and future weather.",
    },
    footer: { name: "Giuliano Conti" },
  },
  es: {
    nav: { home: "Inicio", experience: "Experiencia", projects: "Proyectos", contact: "Contacto" },
    home: {
      subheader: "Ingeniero Frontend",
      title: "Giuliano Conti",
      bio: "+3 años de experiencia trabajando principalmente con React, Next.js y tecnologías blockchain.",
      skills: "React · TypeScript · HTML · CSS · Web3",
      resume: "Currículum",
    },
    experience: {
      title: "Experiencia",
      jobTitle: "Ingeniero Frontend",
      date: "2023 - Actualidad",
      wormholescan: "WormholeScan",
      wormholescanDesc:
        "Co-desarrollé la interfaz de usuario para WormholeScan, un explorador utilizado para ver millones de transacciones, gráficas y análisis.",
      portal: "Portal",
      portalDesc:
        "Construí la interfaz que utiliza Wormhole para transferir tokens entre blockchains, haciendo transacciones, testeando y fixeando errores.",
      xlabsDesc:
        "Desarrollé funcionalidades de la web de xLabs para staking (ej. SOL), colaborando en mejorar funcionalidades y la interfaz.",
      freelancerRole: "Freelancer",
      freelancerDate: "2022 - Actualidad",
      freelancerDesc:
        "Cree una web para mostrar el catálogo de vehículos a la venta, generando mayor visibilidad y ventas.",
    },
    contact: {
      title: "Contacto",
      text: "Si quieres hablar de oportunidades o lo que sea, escríbeme. Acá estoy.",
      button: "Contáctame",
      message: "¡Hola! ¿Cómo estás?",
    },
    projects: {
      title: "Proyectos",
      blackjack: "Blackjack",
      blackjackDesc: "Juego de cartas, debes obtener una puntuación mayor que la banca, sin pasarte de 21.",
      copicti: "Copicti",
      copictiDesc: "Web para comprar cuadros prefabricados o diseñados por tu propia cuenta.",
      createResume: "Create Resume",
      createResumeDesc: "Crea tu currículum completando un formulario con esta aplicación.",
      giulianNews: "Giulian News",
      giulianNewsDesc: "Sitio para mantenerte informado.",
      pokemonFinder: "Pokemon Finder",
      pokemonFinderDesc: "Sitio donde debes registrarte para buscar pokemons.",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Aprendiendo y creando un portfolio 3D con Three.js.",
      removeBg: "Remove BG",
      removeBgDesc: "App para eliminar uno o más colores de una imagen.",
      sokoban: "Sokoban",
      sokobanDesc: "Puzzle donde el jugador empuja cajas hasta llevarlas a los puntos de almacenaje.",
      weatherTI: "WeatherTI",
      weatherTIDesc: "Página para informarte del tiempo actual y pronósticos.",
    },
    footer: { name: "Giuliano Conti" },
  },
  pt: {
    nav: { home: "Início", experience: "Experiência", projects: "Projetos", contact: "Contato" },
    home: {
      subheader: "Engenheiro Frontend",
      title: "Giuliano Conti",
      bio: "+3 anos de experiência trabalhando principalmente com React, Next.js e tecnologias blockchain.",
      skills: "React · TypeScript · HTML · CSS · Web3",
      resume: "Currículo",
    },
    experience: {
      title: "Experiência",
      jobTitle: "Engenheiro Frontend",
      date: "2023 - Atual",
      wormholescan: "WormholeScan",
      wormholescanDesc:
        "Desenvolvi a interface de usuário para WormholeScan, um explorador utilizado para ver milhões de transações, gráficas e análises.",
      portal: "Portal",
      portalDesc:
        "Desenvolvi a interface que utiliza Wormhole para transferir tokens entre blockchains, fazendo transações, testando e corrigindo erros.",
      xlabsDesc:
        "Desenvolvi funcionalidades para o site xLabs para staking (ex. SOL), colaborando em melhorias funcionais e de interface.",
      freelancerRole: "Freelancer",
      freelancerDate: "2022 - Atual",
      freelancerDesc: "Criei um site para mostrar o catálogo de veículos a venda, gerando maior visibilidade e vendas.",
    },
    contact: {
      title: "Contato",
      text: "Se quiser falar de oportunidades ou o que for, me chama. Tô por aqui.",
      button: "Fale comigo",
      message: "Olá! Como vai?",
    },
    projects: {
      title: "Projetos",
      blackjack: "Blackjack",
      blackjackDesc: "Jogo de cartas, obter uma pontuação maior que a banca, sem ultrapassar 21.",
      copicti: "Copicti",
      copictiDesc: "Site para comprar pinturas pré-fabricadas ou pinturas criadas por você.",
      createResume: "Create Resume",
      createResumeDesc: "Crie seu currículo preenchendo um formulário com esta aplicação.",
      giulianNews: "Giulian News",
      giulianNewsDesc: "Site para manter você informado.",
      pokemonFinder: "Pokemon Finder",
      pokemonFinderDesc: "Site em que é preciso se registrar para buscar pokemons.",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Aprendendo e criando um portfólio 3D com Three.js.",
      removeBg: "Remove BG",
      removeBgDesc: "App para remover uma ou mais cores de uma imagem.",
      sokoban: "Sokoban",
      sokobanDesc: "Quebra-cabeça onde o jogador empurra caixas até os pontos de armazenamento.",
      weatherTI: "WeatherTI",
      weatherTIDesc: "Página para informar o tempo atual e previsões.",
    },
    footer: { name: "Giuliano Conti" },
  },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LOCALE_PARAM = "lang";
const DEFAULT_LOCALE: Locale = "en";
const VALID_LOCALES: Locale[] = ["en", "es", "pt"];

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
