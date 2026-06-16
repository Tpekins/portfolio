import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "./i18n";

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-[#eeeeee]/50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        <Link to="/" className="group">
          <div className="text-4xl font-display font-black text-[#1a1a1c] tracking-tighter leading-none mb-1">
            Tiani Pekins
          </div>
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#333333] group-hover:text-[#2e7d32] transition-colors">
            Software Engineer <span className="text-[#2e7d32] italic">/</span>
          </div>
        </Link>

        {/* Right side: nav links + divider + hamburger */}
        <div className="flex items-center gap-3">
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
          {/* Hamburger menu button */}
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

            {/* Dropdown panel */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-[160px] bg-white border border-[#eeeeee] rounded-xl shadow-2xl overflow-hidden z-50"
                  role="menu"
                >
                  <AnimatePresence mode="wait">
                    {showLanguageMenu ? (
                      <motion.div
                        key="language-menu"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.15 }}
                        className="p-1.5"
                      >
                        <div className="flex flex-col gap-0.5">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              className={`group flex items-center justify-between w-full px-3 py-1.5 text-xs font-bold border-b border-[#eeeeee] last:border-b-0 hover:bg-[#2e7d32] hover:text-white transition-all duration-300 ${
                                selectedLanguage === lang.code
                                  ? "bg-[#f1f8f1] text-[#2e7d32]"
                                  : "text-[#1a1a1c]"
                              }`}
                              onClick={() => handleLanguageSelect(lang.code)}
                              role="menuitem"
                            >
                              <div className="flex items-center gap-1.5">
                                {(() => {
                                  const FlagIcon = FLAGS[lang.code];
                                  return FlagIcon ? <FlagIcon /> : null;
                                })()}
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
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="main-menu"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.15 }}
                        className="p-1.5"
                      >
                        <div className="flex flex-col gap-0.5">
                          <button
                            className="flex items-center justify-between w-full px-2 py-2 text-sm font-bold text-[#1a1a1c] hover:bg-[#f5f5f5] hover:text-[#2e7d32] rounded-lg transition-all duration-300"
                            onClick={() => setShowLanguageMenu(true)}
                            role="menuitem"
                          >
                            <div className="flex items-center gap-1.5">
                              <Globe size={14} />
                              <span>Language</span>
                            </div>
                            <ChevronRight size={14} className="text-[#333333] group-hover:text-[#2e7d32]" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
}
