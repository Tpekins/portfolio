import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Footer } from "@repo/ui";
import { HelmetProvider } from "react-helmet-async";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [footerOpacity, setFooterOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isMobile]);

  return (
    <HelmetProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative bg-white">
        <Navbar />
        <main className="site-wrapper flex-grow" style={{ pointerEvents: footerOpacity > 0.95 ? "none" : "auto" }}>
          <Outlet />
        </main>
        {isMobile ? (
          <div className="relative z-10">
            <Footer />
          </div>
        ) : (
          <div
            className="fixed bottom-0 left-0 right-0 z-10"
            style={{ opacity: footerOpacity, pointerEvents: footerOpacity === 0 ? "none" : "auto", transition: "opacity 0.1s ease-in-out" }}
          >
            <div className="pointer-events-auto">
              <Footer />
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}
