import { createContext, useContext, useState, type ReactNode } from "react";
import { T } from "./translations";

export type Lang = "es" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({ lang: "es", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lp-lang");
    return saved === "en" ? "en" : "es";
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lp-lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

export function useT() {
  const { lang } = useContext(Ctx);
  return (key: string): string => T[lang][key] ?? key;
}
