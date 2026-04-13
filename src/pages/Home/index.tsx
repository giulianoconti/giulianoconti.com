import { useEffect } from "react";
import Lenis from "lenis";
import Scene from "./Scene";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Contact from "./Contact";
import "./styles.scss";

export default function Home() {
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
      <Scene />

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
