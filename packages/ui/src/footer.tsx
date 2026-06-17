import {
  Github,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronUp,
} from "lucide-react";
import { useTranslation } from "./i18n";

export function Footer() {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 min-h-[520px] bg-white border-t border-[#eeeeee] pt-12 pb-20 px-6 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-center md:text-left">
          {/* Logo Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-4">
            <span className="text-5xl md:text-6xl font-script text-[#2e7d32] tracking-tight">
              Tiani Pekins
            </span>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-[#333333]">
              {`< SOFTWARE ENGINEER />`}
            </span>
          </div>

          {/* Bio Section */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-2xl font-display font-black text-[#1a1a1c]">
              {t("footer.hi")}
            </h2>
            <div className="space-y-4 text-[#333333] text-base font-medium">
              <p>
                {t("footer.bio")}
              </p>
            </div>
          </div>

          {/* Shortcuts Section */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-2xl font-display font-black text-[#1a1a1c] mb-6">
              {t("footer.shortcuts")}
            </h2>
            <div className="flex flex-col gap-3 items-center md:items-start text-left">
              <a
                href="/"
                className="text-base font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.home")}
              </a>
              <a
                href="/projects"
                className="text-base font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.projects")}
              </a>
              <a
                href="/about"
                className="text-base font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.about")}
              </a>
              <a
                href="/blog"
                className="text-base font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.blog")}
              </a>
              <a
                href="/feed"
                className="text-base font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.feed")}
              </a>
              <a
                href="/contact"
                className="text-base font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.contact")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center space-y-10">
          <button
            onClick={scrollToTop}
            className="w-12 h-12 border-2 border-[#1a1a1c] rounded-lg flex items-center justify-center hover:bg-[#1a1a1c] hover:text-white transition-all group shadow-sm bg-white"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </button>

          <div className="text-center space-y-2 flex flex-col items-center">
            <p className="text-sm font-medium text-[#333333]">
              {t("footer.copyright")}
            </p>

            <div className="flex justify-center gap-6 height- drop-shadow-hover">
              <a href="https://github.com/Tpekins" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Github size={18} /></a>
              <a href="https://www.facebook.com/TianiPekins/" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Facebook size={18} /></a>
              <a href="https://x.com/TianiPekins" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Twitter size={18} /></a>
              <a href="https://www.linkedin.com/in/tiani-pekins-ebika/" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Linkedin size={18} /></a>
              <a href="https://www.instagram.com/tianperkins/" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
