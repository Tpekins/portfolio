import {
  Github,
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
    <footer className="fixed bottom-0 left-0 right-0 z-20 h-[550px] bg-white border-t border-border-subtle pt-12 pb-24 px-6 w-full overflow-hidden flex flex-col items-center">
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
                I'm Tiani a full-stack engineer and founder building at the
                intersection of tech and community. Based in Silicon Mountain
                and grounded in its spirit, I developed LocalHands to give
                Africa's artisans and labourers the digital visibility they
                deserve. Fueled by ambition, I write code, think in systems, and
                believe Africa's builders are just getting started
              </p>
            </div>
          </div>

          {/* Shortcuts Section */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-display font-black text-text-primary mb-6">
              Shortcuts:
            </h2>
            <div className="flex flex-col gap-3 items-center md:items-start text-left">
              <a
                href="/"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Home
              </a>
              <a
                href="/projects"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Projects
              </a>
              <a
                href="/about"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> About
              </a>
              <a
                href="/blog"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Blog
              </a>
              <a
                href="/feed"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Feed
              </a>
              <a
                href="/contact"
                className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3"
              >
                <span className="text-primary font-black">−</span> Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center space-y-6">
          <button
            onClick={scrollToTop}
            className="w-12 h-5 border-2 border-text-primary rounded-lg flex items-center justify-center hover:bg-text-primary hover:text-white transition-all group shadow-sm bg-white"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </button>

          <div className="text-center space-y-4 h-">
            <p className="text-sm font-medium text-text-secondary">
              © 2026 | All rights reserved | Made with ❤️ by Tiani Pekins.
            </p>

            <div className="flex justify-center gap-6">
              <a href="https://github.com/Tpekins" target="_blank" rel="noreferrer" className="text-text-primary hover:text-primary transition-colors"><Github size={18} /></a>
              <a href="https://www.facebook.com/TianiPekins/" target="_blank" rel="noreferrer" className="text-text-primary hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="https://x.com/TianiPekins" target="_blank" rel="noreferrer" className="text-text-primary hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="https://www.linkedin.com/in/tiani-pekins-ebika/" target="_blank" rel="noreferrer" className="text-text-primary hover:text-primary transition-colors"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/tianperkins/" target="_blank" rel="noreferrer" className="text-text-primary hover:text-primary transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}