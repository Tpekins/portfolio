import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Facebook, Menu, X, Twitter, Instagram, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
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
                className={`nav-link ${isActive ? 'active' : ''}`}
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
                  className={`text-xl font-bold py-4 border-b border-border-subtle last:border-0 ${location.pathname === link.path ? 'text-primary' : 'text-text-primary'}`}
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

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 h-[550px] bg-white border-t border-border-subtle pt-24 pb-12 px-6 w-full overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start text-center md:text-left">
          {/* Logo Section */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-2">
            <span className="text-5xl md:text-6xl font-script text-primary tracking-tight">Tiani Pekins</span>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] text-text-secondary">
              {`< SOFTWARE ENGINEER />`}
            </span>
          </div>

          {/* Bio Section */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="text-2xl font-display font-black text-text-primary">Hi there,</h2>
            <div className="space-y-4 text-body text-base font-medium text-text-secondary">
              <p>
              I am a full-stack software engineer experienced in mobile and web development, UI/UX, system design, and product management. Deeply rooted in the Silicon Mountain tech community, I am also the founder of LocalHands. We are a non-profit platform designed to empower Africa’s informal economy, providing everyday workers with digital visibility to finally bridge the trust gap
              </p>
            </div>
          </div>

          {/* Shortcuts Section */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-display font-black text-text-primary mb-6">Shortcuts:</h2>
            <div className="flex flex-col gap-3 items-center md:items-start text-left">
              <Link to="/contact" className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3">
                <span className="text-primary font-black">−</span> Contact
              </Link>
              <Link to="/" className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3">
                <span className="text-primary font-black">−</span> Home
              </Link>
              <Link to="/projects" className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3">
                <span className="text-primary font-black">−</span> Projects
              </Link>
              <Link to="/about" className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3">
                <span className="text-primary font-black">−</span> About
              </Link>
              <Link to="/blog" className="text-base font-bold text-text-primary hover:text-primary transition-colors flex items-center gap-3">
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
              © 2026 | All rights reserved | Made with ❤️ by Tiani Pekins.
            </p>
            
            <div className="flex justify-center gap-6">
              <a href="#" className="text-text-primary hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-text-primary hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" className="text-text-primary hover:text-primary transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="text-text-primary hover:text-primary transition-colors"><Instagram size={18} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
