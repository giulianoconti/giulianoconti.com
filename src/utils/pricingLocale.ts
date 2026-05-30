import { useLocale } from "../contexts/LocaleContext";
import { PRICING_T } from "./pricingTranslations";

type PricingLang = "en" | "es" | "pt";

export function usePricingLang(): PricingLang {
  const { locale } = useLocale();
  return locale;
}

export function usePricingT(): (key: string) => string {
  const lang = usePricingLang();
  return (key: string) => PRICING_T[lang][key] ?? key;
}
