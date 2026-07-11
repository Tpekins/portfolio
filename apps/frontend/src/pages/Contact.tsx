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
        <title>Contact Tiani Pekins Ebika | Software Engineer</title>
        <meta name="description" content="Get in touch with Tiani Pekins Ebika — Full-stack Software Engineer and Founder of LocalHands.Africa. Available for projects, consulting, and collaboration." />
        <meta name="keywords" content="Tiani Pekins Ebika, contact, software engineer, hire, collaborate, Cameroon, Full-stack developer" />
        <link rel="canonical" href="https://tianipekins.com/contact" />
        <meta property="og:title" content="Contact Tiani Pekins Ebika | Software Engineer" />
        <meta property="og:description" content="Get in touch with Tiani Pekins Ebika — Full-stack Software Engineer and Founder of LocalHands.Africa." />
        <meta property="og:url" content="https://tianipekins.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Tiani Pekins Ebika | Software Engineer" />
        <meta name="twitter:description" content="Get in touch with Tiani Pekins Ebika — Full-stack Software Engineer and Founder of LocalHands.Africa." />
        <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
      </Helmet>

      <div className="flex-grow pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Main Heading */}
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-4xl md:text-[50px] font-display font-black text-[#1a1a1c] tracking-tight leading-tight">
              {t("contact.heroTitle")}
            </h1>
            <p className="text-xs md:text-sm font-medium text-[#1a1a1c] opacity-70">
              {t("contact.heroSubtitle")}
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-6xl mx-auto mb-24">
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
                className="w-full bg-[#1c1c1c] text-white py-5 rounded-lg font-bold text-lg hover:bg-[#333434] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
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
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-15 px-35 py-22  hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-3xl">
            <div className="w-85 h-125 shrink-0 overflow-hidden rounded-2xl relative, group">
              <img
                src="/Tiani.jpg"
                alt="Tiani Pekins"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 group-hover:opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-center gap-8">
              <div className="space-y-3">
                <h2 className="text-5xl font-display font-small... text-[#1a1a1c]">
                  Tiani Pekins
                </h2>
                <p className="text-lg text-[#1a1a1c]/60 font-medium">
                  {t("contact.role")}
                </p>
              </div>
              <p className="text-xl leading-relaxed text-[#1a1a1c] max-w-md">
                {t("contact.bio")}
              </p>
              <a
                href="mailto:tiani@tianipekins.com"
                className="text-xl font-bold text-[#1a1a1c] hover:underline pt-2"
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
