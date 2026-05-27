import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type LiteModeContextValue = {
  liteMode: boolean;
  toggleLiteMode: () => void;
};

const LiteModeContext = createContext<LiteModeContextValue>({
  liteMode: false,
  toggleLiteMode: () => {},
});

export function LiteModeProvider({ children }: { children: ReactNode }) {
  const [liteMode, setLiteMode] = useState<boolean>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("liteMode") === "true" : false;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-lite", liteMode ? "true" : "false");
    localStorage.setItem("liteMode", String(liteMode));
  }, [liteMode]);

  const toggleLiteMode = useCallback(() => setLiteMode((v) => !v), []);

  return (
    <LiteModeContext.Provider value={{ liteMode, toggleLiteMode }}>
      {children}
    </LiteModeContext.Provider>
  );
}

export function useLiteMode() {
  return useContext(LiteModeContext);
}
