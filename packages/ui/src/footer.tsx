import {
  Github,
  Twitter,
  Linkedin,
  ChevronUp,
} from "lucide-react";
import { MediumIcon, DevToIcon, OrcidIcon } from "./icons";
import { useTranslation } from "./i18n";

export function Footer() {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative md:fixed md:bottom-0 md:left-0 md:right-0 z-20 bg-white border-t border-[#eeeeee] pt-24 pb-12 px-6 w-full flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-center md:text-left">
          {/* Logo Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-0">
            <span className="text-5xl md:text-6xl font-script text-[#2e7d32] tracking-tight pt-20">
              Tiani Pekins
            </span>
            <span className="text-[16px] font-mono font-medium tracking-[0.2em] text-[#2e7d32] px-6">
                {`       <SOFTWARE ENGINEER/>`}
            </span>
          </div>

          {/* Bio Section */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl font-display font-text-[#1a1a1c]">
              {t("footer.hi")}
            </h2>
            <div className="space-y-4 text-[#333333] text-base font-small">
              <p>
                {t("footer.bio")}
              </p>
            </div>
          </div>

          {/* Shortcuts Section */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="text-2xl font-display font- text-[#1a1a1c] mb-6 px-8">
              {t("footer.shortcuts")}
            </h2>
            <div className="flex flex-col gap-3 items-center md:items-start text-left">
              <a
                href="/"
                className="text-base font- text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3 px-8"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.home")}
              </a>
              <a
                href="/projects"
                className="text-base font- text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3 px-8"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.projects")}
              </a>
              <a
                href="/about"
                className="text-base font- text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3 px-8"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.about")}
              </a>
              <a
                href="/blog"
                className="text-base font- text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3 px-8"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.blog")}
              </a>
              <a
                href="/feed"
                className="text-base font- text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3 px-8"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.feed")}
              </a>
              <a
                href="/contact"
                className="text-base font- text-[#1a1a1c] hover:text-[#2e7d32] transition-colors flex items-center gap-3 px-8"
              >
                <span className="text-[#2e7d32] font-black">−</span> {t("nav.contact")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center space-y-10">
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
              <a href="https://www.linkedin.com/in/tiani-pekins-ebika/" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Linkedin size={18} /></a>
              <a href="https://medium.com/@TianiPekinsEbika" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><MediumIcon size={18} /></a>
              <a href="https://dev.to/tianipekinsebika" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><DevToIcon size={18} /></a>
              <a href="https://orcid.org/0009-0007-2550-3797" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><OrcidIcon size={18} /></a>
              <a href="https://x.com/TianiPekins" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
