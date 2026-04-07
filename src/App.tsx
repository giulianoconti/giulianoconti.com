import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import IconsPage from "./pages/Icons";

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    let raf: number;
    function onFrame(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(onFrame);
    }
    raf = requestAnimationFrame(onFrame);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  if (window.location.pathname === "/icons") {
    return <IconsPage />;
  }

  return (
    <div className="app">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
