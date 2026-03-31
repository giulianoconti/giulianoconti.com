import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import IconsPage from "./pages/Icons";

function App() {
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
