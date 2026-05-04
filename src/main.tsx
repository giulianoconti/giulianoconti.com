// StrictMode removed: double-mount in dev causes WebGL context loss on Canvas
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocaleProvider } from "./contexts/LocaleContext.tsx";
import { Navbar, Footer } from "./components/molecules";
import Landing from "./pages/Landing";
import "./index.scss";

const Portfolio = lazy(() => import("./pages/Portfolio"));

const pathToLang: Record<string, string> = {
  "/es.html": "es",
  "/pt.html": "pt",
  "/en.html": "en",
};
const lang = pathToLang[window.location.pathname];
if (lang) {
  const url = new URL(window.location.href);
  url.pathname = "/portfolio";
  url.searchParams.set("lang", lang);
  window.location.replace(url.pathname + url.search + url.hash);
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/portfolio"
        element={
          <Suspense fallback={null}>
            <LocaleProvider>
              <Navbar />
              <Portfolio />
              <Footer />
            </LocaleProvider>
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>,
);
