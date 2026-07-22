import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { useTranslation } from "@repo/ui";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  const { t } = useTranslation();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("sending");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      form.current,
      PUBLIC_KEY
    )
    .then(() => {
      setStatus("success");
      form.current?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#8ecc91]">
      <Helmet>
        <title>Contact - Tiani Pekins</title>
        <meta name="description" content="Hi there! Open to projects and collaboration. I'm a full-stack software engineer and founder of LocalHands.Africa based in Cameroon." />
        <link rel="canonical" href="https://tianipekins.com/contact" />
        <meta property="og:title" content="Contact - Tiani Pekins" />
        <meta property="og:description" content="Hi there! Open to projects and collaboration. I'm a full-stack software engineer and founder of LocalHands.Africa based in Cameroon." />
        <meta property="og:url" content="https://tianipekins.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tianipekins.com/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Tiani Pekins" />
        <meta name="twitter:description" content="Hi there! Open to projects and collaboration. I'm a full-stack software engineer and founder of LocalHands.Africa based in Cameroon." />
        <meta name="twitter:image" content="https://tianipekins.com/og-image.svg" />
      </Helmet>

      <div className="flex-grow pt-24 md:pt-40 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Main Heading */}
          <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-20">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[50px] font-display font-black text-[#1a1a1c] tracking-tight leading-tight">
              {t("contact.heroTitle")}
            </h1>
            <p className="text-[10px] md:text-xs lg:text-sm font-medium text-[#1a1a1c] opacity-70">
              {t("contact.heroSubtitle")}
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-6xl mx-auto mb-16 md:mb-24">
            <form ref={form} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder={t("contact.name")}
                  className="w-full bg-white border border-purple-500 rounded-lg px-5 py-4 text-base font-medium text-[#1a1a1c] placeholder-gray-400 outline-none shadow-sm transition-all focus:ring-2 focus:ring-purple-500/50"
                />
                <input
                  type="text"
                  name="from_surname"
                  required
                  placeholder={t("contact.surname")}
                  className="w-full bg-white border border-purple-500 rounded-lg px-5 py-4 text-base font-medium text-[#1a1a1c] placeholder-gray-400 outline-none shadow-sm transition-all focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-6">
                <input
                  type="email"
                  name="reply_to"
                  required
                  placeholder={t("contact.email")}
                  className="w-full bg-white border border-purple-500 rounded-lg px-5 py-4 text-base font-medium text-[#1a1a1c] placeholder-gray-400 outline-none shadow-sm transition-all focus:ring-2 focus:ring-purple-500/50"
                />
                <input
                  type="tel"
                  name="phone_number"
                  placeholder={t("contact.phone")}
                  className="w-full bg-white border border-purple-500 rounded-lg px-5 py-4 text-base font-medium text-[#1a1a1c] placeholder-gray-400 outline-none shadow-sm transition-all focus:ring-2 focus:ring-purple-500/50"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder={t("contact.subject")}
                className="w-full bg-white border border-purple-500 rounded-lg px-5 py-4 text-base font-medium text-[#1a1a1c] placeholder-gray-400 outline-none shadow-sm transition-all focus:ring-2 focus:ring-purple-500/50"
              />

              <textarea
                name="message"
                required
                rows={6}
                placeholder={t("contact.message")}
                className="w-full bg-white border border-purple-500 rounded-lg px-5 py-4 text-base font-medium text-[#1a1a1c] placeholder-gray-400 outline-none shadow-sm transition-all focus:ring-2 focus:ring-purple-500/50 resize-none"
              />

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full bg-[#1c1c1c] text-white py-4 md:py-5 rounded-lg font-bold text-base md:text-lg hover:bg-[#333434] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
              >
                {status === "sending"
                  ? t("contact.sending")
                  : status === "success"
                    ? t("contact.success")
                    : status === "error"
                    ? t("contact.error")
                    : t("contact.send")}
              </button>
            </form>
          </div>

          {/* Profile Card */}
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-15 px-4 md:px-35 py-8 md:py-22 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-2xl md:rounded-3xl">
            <div className="w-full h-64 md:w-85 md:h-125 shrink-0 overflow-hidden rounded-xl md:rounded-2xl relative group">
              <img
                src="/Tiani.jpg"
                alt="Tiani Pekins"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 md:gap-8">
              <div className="space-y-2 md:space-y-3 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#1a1a1c]">
                  Tiani Pekins
                </h2>
                <p className="text-base md:text-lg text-[#1a1a1c]/60 font-medium">
                  {t("contact.role")}
                </p>
              </div>
              <p className="text-base md:text-xl leading-relaxed text-[#1a1a1c] max-w-md text-center md:text-left">
                {t("contact.bio")}
              </p>
              <a
                href="mailto:tiani@tianipekins.com"
                className="text-base md:text-xl font-bold text-[#1a1a1c] hover:underline pt-1 md:pt-2 text-center md:text-left"
              >
                tiani@tianipekins.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
