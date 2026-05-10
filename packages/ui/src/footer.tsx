import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronUp,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 h-[550px] bg-white border-t border-border-subtle pt-24 pb-12 px-6 w-full overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-center md:text-left">
          {/* Logo Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-2">
            <span className="text-5xl md:text-6xl font-script text-primary tracking-tight">
              Tiani Pekins
            </span>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-text-secondary">
              {`< SOFTWARE ENGINEER />`}
            </span>
          </div>

          {/* Bio Section */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl font-display font-black text-text-primary">
              Hi there,
            </h2>
            <div className="space-y-4 text-body text-base font-medium text-text-secondary">
              <p>
                I'm a full-stack software engineer with experience in mobile and
                web development, product management, system design, and UI/UX
                design. I am also a founder of a tech community called Ongea
                Tech where I mentor aspiring developers in data structures and
                algorithms as well as software development.
              </p>
            </div>
          </div>

          {/* Shortcuts Section */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-display font-black text-text-primary mb-6">
              Shortcuts:
            </h2>
            <div className="flex flex-col gap-3 items-center md:items-start text-left">
              <Link
                to="/contact"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Contact
              </Link>
              <Link
                to="/"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Home
              </Link>
              <Link
                to="/projects"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Projects
              </Link>
              <Link
                to="/about"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> About
              </Link>
              <Link
                to="/blog"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 flex flex-col items-center space-y-6">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 border-2 border-text-primary rounded-lg flex items-center justify-center hover:bg-text-primary hover:text-white transition-all group shadow-sm bg-white"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </button>

          <div className="text-center space-y-4">
            <p className="text-sm font-medium text-text-secondary">
              © 2025 | All rights reserved | Made with ❤️ by Tiani Pekins.
            </p>

            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
