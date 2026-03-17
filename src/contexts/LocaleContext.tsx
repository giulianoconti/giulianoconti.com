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
    dateShort: string;
    dateLong: string;
    wormholescanBefore: string;
    wormholescanAfter: string;
    portalBefore: string;
    portalAfter: string;
    xlabsBefore: string;
    xlabsAfter: string;
    stakeExample: string;
  };
  projects: {
    title: string;
    blackjack: string;
    blackjackDesc: string;
    sokoban: string;
    sokobanDesc: string;
    copicti: string;
    copictiDesc: string;
  };
  contact: {
    title: string;
    text: string;
    button: string;
    message: string;
  };
  moreProjects: {
    title: string;
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
      bio: "I started in 2021 with HTML, CSS, and JavaScript. I created small projects with Arduino using C++. By 2022, I mainly focused on frontend development utilizing React.",
      skills: "React · TypeScript · HTML · CSS · Web3",
      resume: "Resume",
    },
    experience: {
      title: "Experience",
      jobTitle: "Frontend Engineer",
      dateShort: "2023 - Current",
      dateLong: "July 2023 - Current",
      wormholescanBefore: "Co-developed the frontend of ",
      wormholescanAfter: ", an explorer for viewing transactions and analytics across the Wormhole network.",
      portalBefore: "Contributed to ",
      portalAfter: ", a bridge that makes it easy for users to transfer tokens between blockchains.",
      xlabsBefore: "Contributed to the ",
      xlabsAfter: ", where they can stake tokens, for example ",
      stakeExample: "SOL",
    },
    projects: {
      title: "Personal Projects",
      blackjack: "Blackjack",
      blackjackDesc:
        "Card game where the objective is to defeat the bank. You must have a hand that scores higher than the banker's hand, without going over 21.",
      sokoban: "Sokoban",
      sokobanDesc: "It is a puzzle video game where the player pushes boxes in a warehouse, trying to get them to the storage locations.",
      copicti: "Copicti",
      copictiDesc: "Page where you can add to the cart prefabricated paintings or designed by your own account.",
    },
    contact: {
      title: "Contact",
      text: "If you want to chat about opportunities or anything else, get in touch.",
      button: "Contact Me",
      message: "Hello, how are you?",
    },
    moreProjects: {
      title: "More Projects",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Learning and creating a 3D portfolio with threejs.",
      createResume: "Create Resume",
      createResumeDesc: "Create your Resume completing a form with this application.",
      removeBg: "Remove BG",
      removeBgDesc: "App where you can remove one or more colors from an image.",
      giulianNews: "Giulian News",
      giulianNewsDesc: "Website to keep you informed.",
      pokemonFinder: "Pokemon Finder",
      pokemonFinderDesc: "Website where you have to register to be able to search for pokemons.",
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
      bio: "Empecé en 2021 con HTML, CSS y JavaScript. Creé pequeños proyectos con Arduino usando C++. En 2022 me enfoqué principalmente en el desarrollo frontend con React.",
      skills: "React · TypeScript · HTML · CSS · Web3",
      resume: "Currículum",
    },
    experience: {
      title: "Experiencia",
      jobTitle: "Ingeniero Frontend",
      dateShort: "2023 - Actualidad",
      dateLong: "Julio 2023 - Actualidad",
      wormholescanBefore: "Co-desarrollé el frontend de ",
      wormholescanAfter: ", un explorador para ver transacciones y análisis en la red Wormhole.",
      portalBefore: "Contribuí a ",
      portalAfter: ", un puente que facilita la transferencia de tokens entre blockchains.",
      xlabsBefore: "Contribuí al ",
      xlabsAfter: ", donde pueden stakear tokens, por ejemplo ",
      stakeExample: "SOL",
    },
    projects: {
      title: "Proyectos personales",
      blackjack: "Blackjack",
      blackjackDesc: "Juego de cartas cuyo objetivo es vencer a la banca. Debes tener una mano que sume más que la del crupier, sin pasarte de 21.",
      sokoban: "Sokoban",
      sokobanDesc: "Videojuego de puzles donde el jugador empuja cajas en un almacén hasta llevarlas a los puntos de almacenaje.",
      copicti: "Copicti",
      copictiDesc: "Página donde puedes añadir al carrito cuadros prefabricados o diseñados por tu propia cuenta.",
    },
    contact: {
      title: "Contacto",
      text: "Si quieres hablar de oportunidades o lo que sea, escríbeme. Acá estoy.",
      button: "Contáctame",
      message: "¡Hola! ¿Cómo estás?",
    },
    moreProjects: {
      title: "Más proyectos",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Aprendiendo y creando un portfolio 3D con Three.js.",
      createResume: "Create Resume",
      createResumeDesc: "Crea tu currículum completando un formulario con esta aplicación.",
      removeBg: "Remove BG",
      removeBgDesc: "App para eliminar uno o más colores de una imagen.",
      giulianNews: "Giulian News",
      giulianNewsDesc: "Sitio para mantenerte informado.",
      pokemonFinder: "Pokemon Finder",
      pokemonFinderDesc: "Sitio donde debes registrarte para buscar pokemons.",
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
      bio: "Comecei em 2021 com HTML, CSS e JavaScript. Criei pequenos projetos com Arduino em C++. Em 2022 foquei principalmente no desenvolvimento frontend com React.",
      skills: "React · TypeScript · HTML · CSS · Web3",
      resume: "Currículo",
    },
    experience: {
      title: "Experiência",
      jobTitle: "Engenheiro Frontend",
      dateShort: "2023 - Atual",
      dateLong: "Julho 2023 - Atual",
      wormholescanBefore: "Co-desenvolvi o frontend do ",
      wormholescanAfter: ", um explorador para ver transações e análises na rede Wormhole.",
      portalBefore: "Contribuí para o ",
      portalAfter: ", uma ponte que facilita a transferência de tokens entre blockchains.",
      xlabsBefore: "Contribuí para o ",
      xlabsAfter: ", onde podem stakear tokens, por exemplo ",
      stakeExample: "SOL",
    },
    projects: {
      title: "Projetos pessoais",
      blackjack: "Blackjack",
      blackjackDesc: "Jogo de cartas em que o objetivo é vencer o banco. Você precisa de uma mão que some mais que a do crupiê, sem passar de 21.",
      sokoban: "Sokoban",
      sokobanDesc: "Videogame de quebra-cabeça em que o jogador empurra caixas em um armazém até os pontos de armazenagem.",
      copicti: "Copicti",
      copictiDesc: "Página onde você pode adicionar ao carrinho quadros prontos ou desenhados pela sua conta.",
    },
    contact: {
      title: "Contato",
      text: "Se quiser falar de oportunidades ou o que for, me chama. Tô por aqui.",
      button: "Fale comigo",
      message: "Olá! Como vai?",
    },
    moreProjects: {
      title: "Mais projetos",
      portfolio3d: "Portfolio 3D",
      portfolio3dDesc: "Aprendendo e criando um portfólio 3D com Three.js.",
      createResume: "Create Resume",
      createResumeDesc: "Crie seu currículo preenchendo um formulário com esta aplicação.",
      removeBg: "Remove BG",
      removeBgDesc: "App para remover uma ou mais cores de uma imagem.",
      giulianNews: "Giulian News",
      giulianNewsDesc: "Site para manter você informado.",
      pokemonFinder: "Pokemon Finder",
      pokemonFinderDesc: "Site em que é preciso se registrar para buscar pokemons.",
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
const VALID_LOCALES: Locale[] = ["en", "es", "pt"];

function getLocaleFromUrl(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = new URLSearchParams(window.location.search).get(LOCALE_PARAM)?.toLowerCase();
  return VALID_LOCALES.includes(lang as Locale) ? (lang as Locale) : "en";
}

function setLocaleInUrl(locale: Locale) {
  const url = new URL(window.location.href);
  url.searchParams.set(LOCALE_PARAM, locale);
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
    if (!new URLSearchParams(window.location.search).has(LOCALE_PARAM)) {
      setLocaleInUrl(getLocaleFromUrl());
    }
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
