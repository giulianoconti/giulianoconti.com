import type { Locale } from "../contexts/LocaleContext.tsx";

export const SOCIAL_LINKEDIN_URL = "https://www.linkedin.com/in/giulianoconti";
export const SOCIAL_GITHUB_URL = "https://github.com/giulianoconti";
export const SOCIAL_MAIL = "giuliconti1@gmail.com";
const PHONE = "5493624223320";
export const WA_MSG = (msg: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

export const XLABS_WEBSITE_URL = "https://xlabs.github.io/xlabs-website";
export const WORMHOLESCAN_WEBSITE_URL = "https://wormholescan.io";
export const PORTAL_WEBSITE_URL = "https://portalbridge.com";
export const CLINIS_WEBSITE_URL = "https://clinis.com.ar";
export const MATI_WEBSITE_URL = "https://estudiojuridicorrg.com.ar";
export const GIANE_WEBSITE_URL = "https://kinegiane.com.ar";
export const MERCAT_WEBSITE_URL = "https://mercat.cl";
export const UWIGO_WEBSITE_URL = "https://app.uwigo.com";

export const EXPERIENCE_WORMHOLESCAN_ASSET = "/assets/experience-wormholescan.webp";
export const EXPERIENCE_PORTAL_ASSET = "/assets/experience-portal.webp";
export const EXPERIENCE_XLABS_ASSET = "/assets/experience-xlabs.webp";
export const EXPERIENCE_CLINIS_ASSET = "/assets/experience-clinis.webp";
export const EXPERIENCE_MATI_ASSET = "/assets/experience-mati.webp";
export const EXPERIENCE_GIANE_ASSET = "/assets/experience-giane.webp";
export const EXPERIENCE_MERCAT_ASSET = "/assets/experience-cc-mercat.webp";
export const EXPERIENCE_UWIGO_ASSET = "/assets/experience-uwigo.webp";

export function getCvAssetByLocale(locale: Locale) {
  return `/assets/Giuliano_Conti_Frontend_Engineer_CV_${locale.toUpperCase()}.pdf`;
}
