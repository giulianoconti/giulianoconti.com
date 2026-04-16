import { useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import { useLocale } from "../../contexts/LocaleContext";
import { trackSectionView } from "../../utils/analytics";
const Scene = lazy(() => import("./Scene"));
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";
import "./styles.scss";

export default function Home() {
  const { locale } = useLocale();

  useEffect(() => {
    const sections = ["about", "experience", "contact"];
    const observed = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && !observed.has(id)) {
            observed.add(id);
            trackSectionView(id, locale);
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    const page = document.getElementById("page");
    const onMove = (e: MouseEvent) => {
      page?.style.setProperty("--cx", `${e.clientX}px`);
      page?.style.setProperty("--cy", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf: number;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <div className="home_overlay home_overlay_grain1">
        <img src="/assets/overlay.webp" alt="" />
      </div>
      <div className="home_overlay home_overlay_grain2">
        <img src="/assets/overlay2.webp" alt="" />
      </div>

      <div id="page" className="home_page">
        <Hero />
        <About />
        <Experience />
        <Contact />
      </div>
    </>
  );
}
