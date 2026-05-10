import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Footer } from "@repo/ui";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      setIsFooterVisible(nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative bg-white">
        <Navbar />
        <main className="site-wrapper flex-grow mb-[550px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <div className={`sticky-footer ${isFooterVisible ? "visible" : ""}`}>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
