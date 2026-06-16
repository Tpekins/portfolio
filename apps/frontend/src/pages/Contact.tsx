import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { useTranslation } from "@repo/ui";

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
          <div className="w-full max-w-4xl mx-auto mb-24">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-white px-2">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    name="from_name"
                    required
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1a1a1c] outline-none shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-white px-2">
                    {t("contact.surname")}
                  </label>
                  <input
                    type="text"
                    name="from_surname"
                    required
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1a1a1c] outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-white px-2">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    name="reply_to"
                    required
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1a1a1c] outline-none shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-white px-2">
                    {t("contact.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1a1a1c] outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-white px-2">
                  {t("contact.subject")}
                </label>
                <input
                  type="text"
                  name="subject"
                  className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1a1a1c] outline-none shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-white px-2">
                  {t("contact.message")}
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1a1a1c] resize-none outline-none shadow-sm"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="w-full bg-[#1c1c1c] text-white py-4 rounded-md font-bold text-sm hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {status === "sending"
                    ? t("contact.sending")
                    : status === "success"
                      ? t("contact.success")
                      : status === "error"
                      ? t("contact.error")
                      : t("contact.send")}
                </button>
              </div>
            </form>
          </div>

          {/* Profile Card */}
          <div className="w-full max-w-lg flex flex-col md:flex-row items-center md:items-start gap-8 mt-10">
          <div className="w-59 h-69 shrink-0 overflow-hidden rounded-lg">
              <img
                src="/Tiani.jpg"
                alt="Tiani Pekins"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 pt-4 md:pt-10">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-3xl font-display font-medium text-[#1a1a1c]">
                  Tiani Pekins
                </h2>
                <p className="text-[13px] font-bold uppercase tracking-widest text-[#1a1a1c] opacity-60 italic font-mono">
                  {t("contact.role")}
                </p>
              </div>
              <p className="text-[14px] leading-relaxed text-[#1a1a1c] font-medium max-w-sm text-center md:text-left">
                {t("contact.bio")}
              </p>
              <a 
                href="mailto:tiani@tianipekins.com"
                className="text-lg font-black text-[#1a1a1c] text-center md:text-left pt-2 hover:underline block"
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
