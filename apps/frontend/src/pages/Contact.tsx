import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      form.current?.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#8ecc91]">
      <div className="flex-grow pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Main Heading */}
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-4xl md:text-[50px] font-display font-black text-[#1c1c1c] tracking-tight leading-tight">
              <span className="relative inline-block">
                Reach out
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-white -z-10"></span>
              </span>{" "}
              <br />
              if you need help or just <br />
              want to say hello
            </h1>
            <p className="text-xs md:text-sm font-medium text-[#1c1c1c] opacity-70">
              Let's start a conversation that sparks innovation.
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-4xl mx-auto mb-24">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white px-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] outline-none h-10 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white px-2">
                    Surname
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] outline-none h-10 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white px-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder=""
                    required
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] outline-none h-10 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white px-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder=""
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] outline-none h-10 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white px-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] outline-none h-10 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white px-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder=""
                  required
                  className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] resize-none outline-none shadow-sm"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="w-full bg-[#1c1c1c] text-white py-4 rounded-md font-bold text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "success"
                      ? "Message Sent"
                      : "Send a message"}
                </button>
              </div>
            </form>
          </div>

          {/* Profile Card */}
          <div className="w-full max-w-lg flex flex-col md:flex-row items-center md:items-start gap-8 mt-10">
            <div className="w-48 h-56 shrink-0 bg-[#e0e0e0] overflow-hidden grayscale">
              <img
                src="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                alt="Tiani Pekins"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 pt-4 md:pt-10">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-display font-medium text-[#1c1c1c]">
                  Tiani Pekins
                </h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1c1c1c]/60 italic font-mono">
                  Software Engineer
                </p>
              </div>
              <p className="text-[11px] leading-relaxed text-[#1c1c1c] font-medium opacity-80 max-w-sm text-center md:text-left">
                Passionate software engineer dedicated to transforming complex
                challenges into innovative, user-friendly solutions and inspiring
                others through mentorship.
              </p>
              <p className="text-[11px] font-black text-[#1c1c1c] text-center md:text-left pt-2">
                tiani@localhands.africa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-[#7eb686] pt-16 pb-12 px-6 md:px-12 bg-[#8ecc91]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left - Scroll to top button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-12 h-12 border-2 border-[#1c1c1c] rounded-lg flex items-center justify-center hover:bg-[#1c1c1c] hover:text-white transition-all group shadow-sm bg-white"
              aria-label="Back to top"
            >
              <ChevronUp size={24} />
            </motion.button>

            {/* Center - Copyright */}
            <div className="text-center space-y-3">
              <p className="text-sm font-medium text-[#1c1c1c]">
                © 2026 | All rights reserved | Made with ❤️ by Tiani Pekins.
              </p>
            </div>

            {/* Right - Social Links */}
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c1c1c] hover:text-[#2e7d32] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c1c1c] hover:text-[#2e7d32] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c1c1c] hover:text-[#2e7d32] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c1c1c] hover:text-[#2e7d32] transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
