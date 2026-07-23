import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "./i18n";
import { MediumIcon, DevToIcon, OrcidIcon } from "./icons";

const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "FR", label: "Français" },
  { code: "KO", label: "한국어" },
];

function UKFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 30" width="18" height="9">
      <rect width="60" height="30" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );
}

function FRFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" width="18" height="12">
      <rect width="20" height="40" fill="#002395"/>
      <rect x="20" width="20" height="40" fill="#fff"/>
      <rect x="40" width="20" height="40" fill="#ED2939"/>
    </svg>
  );
}

function KOFlag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" width="18" height="12">
      <rect width="60" height="40" fill="#fff"/>
      <circle cx="30" cy="20" r="8" fill="#C60C30"/>
      <path d="M30,12 A8,8 0 0,1 30,28 A4,4 0 0,1 30,20 A4,4 0 0,0 30,12" fill="#003478"/>
      <g stroke="#000" strokeWidth="1.5">
        <line x1="30" y1="4" x2="30" y2="10"/>
        <line x1="30" y1="30" x2="30" y2="36"/>
        <line x1="10" y1="20" x2="16" y2="20"/>
        <line x1="44" y1="20" x2="50" y2="20"/>
      </g>
    </svg>
  );
}

const FLAGS: Record<string, React.FC<{ className?: string }>> = {
  EN: UKFlag,
  FR: FRFlag,
  KO: KOFlag,
};

export function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio-lang") || "EN";
    }
    return "EN";
  });
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.feed"), path: "/feed" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowLanguageMenu(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    setShowLanguageMenu(false);
  }, [location.pathname]);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    localStorage.setItem("portfolio-lang", code);
    window.dispatchEvent(new CustomEvent("portfolio-lang-change", { detail: code }));
    setShowLanguageMenu(false);
    setIsOpen(false);
  };

  return ( 
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-[#eeeeee]/50 px-1">
      <div className="w-full px-6 xl:px-12 h-28 flex items-center justify-between">
        <Link to="/" className="group">
          <div className="text-4xl font-display font-black text-[#1a1a1c] group-hover:text-[#2e7d32] transition-all tracking-tight leading-none mb-1 group-hover:scale-105 duration-500 group-hover:opacity-80 origin-left">
            Tiani Pekins
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1c]/70 group-hover:text-[#2e7d32] transition-all group-hover:scale-105 duration-500 group-hover:opacity-80 origin-left px-2">
            Software Engineer /
          </div>
        </Link>

        {/* Right side: nav links + divider + hamburger */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          {/* Vertical divider */}
          <div className="hidden md:block h-6 w-[2px] shrink-0 bg-[#1a1a1a] rounded-full" />
          {/* Hamburger menu button - visible on all screen sizes */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="w-12 h-12 flex items-center justify-center bg-white border border-[#eeeeee] rounded-lg text-[#1a1a1c] hover:bg-[#2e7d32] hover:text-white hover:border-[#2e7d32] transition-all duration-300"
              onClick={() => {
                if (isOpen) {
                  setShowLanguageMenu(false);
                }
                setIsOpen((prev) => !prev);
              }}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              aria-haspopup="menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Dropdown - Language selector only */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="hidden md:block absolute top-full right-0 mt-2 w-[160px] bg-white border border-[#eeeeee] rounded-xl shadow-2xl overflow-hidden z-50"
                  role="menu"
                >
                  <div className="p-1.5">
                    <div className="flex flex-col gap-0.5">
                      {LANGUAGES.map((lang) => {
                        const FlagIcon = FLAGS[lang.code];
                        return (
                          <button
                            key={lang.code}
                            className={`group flex items-center justify-between w-full px-3 py-2 text-xs font-bold border-b border-[#eeeeee] last:border-b-0 hover:bg-[#2e7d32] hover:text-white transition-all duration-300 ${
                              selectedLanguage === lang.code
                                ? "bg-[#f1f8f1] text-[#2e7d32]"
                                : "text-[#1a1a1c]"
                            }`}
                            onClick={() => handleLanguageSelect(lang.code)}
                            role="menuitem"
                          >
                            <div className="flex items-center gap-1.5">
                              {FlagIcon && <FlagIcon />}
                              <span className="text-[10px] font-black group-hover:text-white transition-colors duration-300">
                                {lang.code}
                              </span>
                            </div>
                            {selectedLanguage === lang.code && (
                              <span className="text-[8px] font-bold text-[#2e7d32] group-hover:text-white">
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>

    {/* Mobile Slide-in Menu */}
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay - no click handler, menu only closes via X button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black/40"
          />

          {/* Slide-in panel from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed top-0 right-0 z-50 h-full w-[80%] max-w-[340px] bg-white shadow-2xl flex flex-col"
          >
            {/* Close button - plain X, no hover effect */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLanguageMenu(false);
                }}
                className="w-12 h-12 flex items-center justify-center text-[#1a1a1c]"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8">
              <AnimatePresence>
                {showLanguageMenu ? (
                  <motion.div
                    key="language-menu"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Back button */}
                    <button
                      onClick={() => setShowLanguageMenu(false)}
                      className="flex items-center gap-2 text-sm font-bold text-[#1a1a1c] hover:text-[#2e7d32] transition-colors mb-8"
                    >
                      <ChevronLeft size={16} />
                      <span>Back</span>
                    </button>

                    {/* Language options */}
                    <div className="flex flex-col">
                      {LANGUAGES.map((lang, index) => {
                        const FlagIcon = FLAGS[lang.code];
                        return (
                          <div key={lang.code}>
                            <button
                              className={`group flex items-center justify-between w-full py-4 text-sm font-bold transition-all duration-300 ${
                                selectedLanguage === lang.code
                                  ? "bg-[#2e7d32] text-white"
                                  : "text-[#1a1a1c] hover:bg-[#f1f8f1] hover:text-[#2e7d32]"
                              }`}
                              onClick={() => handleLanguageSelect(lang.code)}
                            >
                              <div className="flex items-center justify-center gap-3 w-full">
                                {FlagIcon && <FlagIcon />}
                                <span>{lang.label}</span>
                              </div>
                            </button>
                            {index < LANGUAGES.length - 1 && (
                              <div className="border-t border-[#e0e0e0] mx-4" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="main-menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                  >
                    {/* Navigation Links */}
                    <div className="flex flex-col">
                      {navLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        return (
                          <div key={link.path}>
                            <Link
                              to={link.path}
                              onClick={() => {
                                setIsOpen(false);
                                setShowLanguageMenu(false);
                              }}
                              className={`flex items-center justify-center w-full py-4 text-base font-bold transition-all duration-300 ${
                                isActive
                                  ? "bg-[#2e7d32] text-white"
                                  : "text-[#1a1a1c] hover:bg-[#f1f8f1] hover:text-[#2e7d32]"
                              }`}
                            >
                              {link.name}
                            </Link>
                            {index < navLinks.length - 1 && (
                              <div className="border-t border-[#e0e0e0] mx-4" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-[#e0e0e0] mx-4 my-6" />

                    {/* Language selector */}
                    <button
                      onClick={() => setShowLanguageMenu(true)}
                      className="flex items-center justify-center w-full py-4 text-base font-bold text-[#1a1a1c] hover:bg-[#f1f8f1] hover:text-[#2e7d32] transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <Globe size={18} />
                        <span>Language</span>
                        <ChevronRight size={18} className="text-[#333333]" />
                      </div>
                    </button>

                    {/* Divider */}
                    <div className="border-t border-[#e0e0e0] mx-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social media icons at bottom */}
            <div className="px-6 py-6">
              <div className="flex justify-center gap-5">
                <a href="https://github.com/Tpekins" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/tiani-pekins-ebika/" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://medium.com/@TianiPekinsEbika" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors">
                  <MediumIcon size={20} />
                </a>
                <a href="https://dev.to/tianipekinsebika" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors">
                  <DevToIcon size={20} />
                </a>
                <a href="https://orcid.org/0009-0007-2550-3797" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors">
                  <OrcidIcon size={20} />
                </a>
                <a href="https://x.com/TianiPekins" target="_blank" rel="noreferrer" className="text-[#1a1a1c] hover:text-[#2e7d32] transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
