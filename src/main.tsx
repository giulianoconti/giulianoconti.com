import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LocaleProvider } from "./contexts/LocaleContext.tsx";
import App from "./App.tsx";
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
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
