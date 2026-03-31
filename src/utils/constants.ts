import type { Locale } from "../contexts/LocaleContext.tsx";

export const SOCIAL_LINKEDIN_URL = "https://www.linkedin.com/in/giulianoconti";
export const SOCIAL_GITHUB_URL = "https://github.com/giulianoconti";
export const SOCIAL_INSTAGRAM_URL = "https://www.instagram.com/giulianocontii";

export const ASSET_FAVICON_LIGHT = "/assets/favicon_light.png";
export const ASSET_WAVE_BLUR = "/assets/wave-blur.webp";
export const ASSET_WAVE_PROFILE = "/assets/wave-profile.jpg";
export const ASSET_CONTACT_CAT = "/assets/contact-cat.webp";
export const ASSET_CONTACT_ROCKET = "/assets/contact-rocket.webp";

export const XLABS_WEBSITE_URL = "https://xlabs.xyz";
export const XLABS_GITHUB_URL = "https://github.com/XLabs/xlabs-website";
export const WORMHOLESCAN_WEBSITE_URL = "https://wormholescan.io";
export const WORMHOLESCAN_GITHUB_URL = "https://github.com/XLabs/wormscan-ui";
export const PORTAL_WEBSITE_URL = "https://portalbridge.com";
export const PORTAL_GITHUB_URL = "https://github.com/wormhole-foundation/wormhole-connect";
export const CLINIS_WEBSITE_URL = "https://clinis.vercel.app/";
export const CLINIS_GITHUB_URL = "https://github.com/giulianoconti/clinis";

export const EXPERIENCE_WORMHOLESCAN_ASSET = "/assets/experience-wormholescan.png";
export const EXPERIENCE_PORTAL_ASSET = "/assets/experience-portal.png";
export const EXPERIENCE_XLABS_ASSET = "/assets/experience-xlabs.png";
export const EXPERIENCE_CLINIS_ASSET = "/assets/experience-clinis.png";

export const PROJECT_BLACKJACK_URL = "https://g2-devlights-bootcamp.vercel.app/juego";
export const PROJECT_BLACKJACK_GITHUB_URL = "https://github.com/giulianoconti/tp-final-devlights";
export const PROJECT_BLACKJACK_ASSET = "/assets/my-projects-blackjack.webp";

export const PROJECT_SOKOBAN_URL = "https://sokoban-giulianoconti.vercel.app/";
export const PROJECT_SOKOBAN_GITHUB_URL = "https://github.com/giulianoconti/sokoban-reactjs";
export const PROJECT_SOKOBAN_ASSET = "/assets/my-projects-sokoban.webp";

export const PROJECT_COPICTI_URL = "https://copicti.vercel.app/";
export const PROJECT_COPICTI_GITHUB_URL = "https://github.com/giulianoconti/copicti";
export const PROJECT_COPICTI_ASSET = "/assets/my-projects-copicti.webp";

export const PROJECT_PORTFOLIO3D_URL = "https://portfolio-3d-giulianoconti.vercel.app/";
export const PROJECT_PORTFOLIO3D_GITHUB_URL = "https://github.com/giulianoconti/portfolio-3d";
export const PROJECT_PORTFOLIO3D_ASSET = "/assets/my-projects-portfolio3d.webp";

export const PROJECT_CREATE_RESUME_URL = "https://create-cv-s.vercel.app/";
export const PROJECT_CREATE_RESUME_GITHUB_URL = "https://github.com/JoaGal/Create-CV";
export const PROJECT_CREATE_RESUME_ASSET = "/assets/my-projects-createResume.webp";

export const PROJECT_REMOVE_BG_URL = "https://remoback.vercel.app/";
export const PROJECT_REMOVE_BG_GITHUB_URL = "https://github.com/giulianoconti/remoback";
export const PROJECT_REMOVE_BG_ASSET = "/assets/my-projects-removeBg.webp";

export const PROJECT_GIULIAN_NEWS_URL = "https://github.com/giulianoconti/tp-info-react-2022/";
export const PROJECT_GIULIAN_NEWS_GITHUB_URL = "https://github.com/giulianoconti/tp-info-react-2022";
export const PROJECT_GIULIAN_NEWS_ASSET = "/assets/my-projects-news.webp";

export const PROJECT_POKEMON_FINDER_URL = "https://giulianoconti.github.io/devlights-homework-2/";
export const PROJECT_POKEMON_FINDER_GITHUB_URL = "https://github.com/giulianoconti/devlights-homework-2";
export const PROJECT_POKEMON_FINDER_ASSET = "/assets/my-projects-pokemon.webp";

export const PROJECT_WEATHER_TI_URL = "https://weather-ti.vercel.app/";
export const PROJECT_WEATHER_TI_GITHUB_URL = "https://github.com/giulianoconti/WeatherTI";
export const PROJECT_WEATHER_TI_ASSET = "/assets/my-projects-weather.webp";

export const PROJECTS_DATA = [
  {
    key: "blackjack",
    url: PROJECT_BLACKJACK_URL,
    img: PROJECT_BLACKJACK_ASSET,
    icons: ["react", "firebase", "tailwind"],
    github: PROJECT_BLACKJACK_GITHUB_URL,
    bottom: false,
  },
  {
    key: "sokoban",
    url: PROJECT_SOKOBAN_URL,
    img: PROJECT_SOKOBAN_ASSET,
    icons: ["react", "css"],
    github: PROJECT_SOKOBAN_GITHUB_URL,
    bottom: false,
  },
  {
    key: "copicti",
    url: PROJECT_COPICTI_URL,
    img: PROJECT_COPICTI_ASSET,
    icons: ["react", "firebase", "mongodb", "css"],
    github: PROJECT_COPICTI_GITHUB_URL,
    bottom: false,
  },
  {
    key: "portfolio3d",
    url: PROJECT_PORTFOLIO3D_URL,
    img: PROJECT_PORTFOLIO3D_ASSET,
    icons: ["react", "css", "blender", "threejs"],
    github: PROJECT_PORTFOLIO3D_GITHUB_URL,
    bottom: false,
  },
  {
    key: "createResume",
    url: PROJECT_CREATE_RESUME_URL,
    img: PROJECT_CREATE_RESUME_ASSET,
    icons: ["react", "css"],
    github: PROJECT_CREATE_RESUME_GITHUB_URL,
    bottom: false,
  },
  {
    key: "removeBg",
    url: PROJECT_REMOVE_BG_URL,
    img: PROJECT_REMOVE_BG_ASSET,
    icons: ["react", "css"],
    github: PROJECT_REMOVE_BG_GITHUB_URL,
    bottom: false,
  },
  {
    key: "giulianNews",
    url: PROJECT_GIULIAN_NEWS_URL,
    img: PROJECT_GIULIAN_NEWS_ASSET,
    icons: ["react", "tailwind"],
    github: PROJECT_GIULIAN_NEWS_GITHUB_URL,
    bottom: true,
  },
  {
    key: "pokemonFinder",
    url: PROJECT_POKEMON_FINDER_URL,
    img: PROJECT_POKEMON_FINDER_ASSET,
    icons: ["react", "css"],
    github: PROJECT_POKEMON_FINDER_GITHUB_URL,
    bottom: true,
  },
  {
    key: "weatherTI",
    url: PROJECT_WEATHER_TI_URL,
    img: PROJECT_WEATHER_TI_ASSET,
    icons: ["react", "tailwind"],
    github: PROJECT_WEATHER_TI_GITHUB_URL,
    bottom: true,
  },
] as const;

export function getCvAssetByLocale(locale: Locale) {
  return `/assets/Giuliano_Conti_CV-${locale}.pdf`;
}
