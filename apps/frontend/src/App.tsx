import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Footer } from "@repo/ui";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Feed from "./pages/Feed";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [footerOpacity, setFooterOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportBottom = window.scrollY + window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const distanceFromBottom = docHeight - viewportBottom;
      const revealZone = 600;

      const progress = Math.max(
        0,
        Math.min(1, 1 - distanceFromBottom / revealZone)
      );
      setFooterOpacity(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative bg-white">
        <Navbar />
        <main className="site-wrapper flex-grow" style={{ pointerEvents: footerOpacity > 0.95 ? "none" : "auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <div
          className="fixed bottom-0 left-0 right-0 z-10"
          style={{ opacity: footerOpacity, pointerEvents: footerOpacity === 0 ? "none" : "auto", transition: "opacity 0.3s ease-in-out" }}
        >
          <div className="pointer-events-auto">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}
