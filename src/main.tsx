// StrictMode removed: double-mount in dev causes WebGL context loss on Canvas
import { createRoot } from "react-dom/client";

// THREE.Clock deprecation warning comes from r3f internals — unfixable without upstream change
const _warn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
  _warn(...args);
};
import { LocaleProvider } from "./contexts/LocaleContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { LiteModeProvider } from "./contexts/LiteModeContext.tsx";
import { Navbar, Footer } from "./components/molecules";
import Home from "./pages/Home/index.tsx";
import "./index.scss";

const pathToLang: Record<string, string> = {
  "/es.html": "es",
  "/pt.html": "pt",
  "/en.html": "en",
};
const lang = pathToLang[window.location.pathname];
if (lang) {
  const url = new URL(window.location.href);
  url.pathname = "/";
  url.searchParams.set("lang", lang);
  window.location.replace(url.pathname + url.search + url.hash);
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <LiteModeProvider>
      <LocaleProvider>
        <Navbar />
        <Home />
        <Footer />
      </LocaleProvider>
    </LiteModeProvider>
  </ThemeProvider>,
);
