import { Link, useLocation } from "react-router-dom";
import {
  Github,
  Linkedin,
  Facebook,
  FileText,
  Menu,
  X,
  ArrowRight,
  Twitter,
  Instagram,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-border-subtle/50">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        <Link to="/" className="group">
          <div className="text-4xl font-display font-black text-text-primary tracking-tighter leading-none mb-1">
            Tiani Pekins
          </div>
          <div className="text-[11px] font-black uppercase tracking-[0.3em] text-text-secondary group-hover:text-primary transition-colors">
            Software Engineer <span className="text-primary italic">/</span>
          </div>
        </Link>

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

        {/* Mobile menu button */}
        <button
          className="md:hidden w-12 h-12 flex items-center justify-center bg-white border border-border-subtle rounded-lg text-text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-auto left-0 w-full bg-white border-b border-border-subtle shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold py-4 border-b border-border-subtle last:border-0 ${location.pathname === link.path ? "text-primary" : "text-text-primary"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
