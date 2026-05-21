import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("sending");

    // Replace these strings with your actual credentials when you have them
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
      // Reset status back to idle after 5 seconds so they can send another message if needed
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
                    name="from_name" // ADDED NAME
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
                    name="from_surname" // ADDED NAME
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
                    name="reply_to" // ADDED NAME (Commonly used for the user's email)
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
                    name="phone_number" // ADDED NAME
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
                  name="subject" // ADDED NAME
                  className="w-full bg-white border-none py-4 px-4 rounded-md focus:ring-0 transition-all font-medium text-base text-[#1c1c1c] outline-none h-10 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-white px-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message" // ADDED NAME
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
                      ? "Message Sent!"
                      : status === "error"
                      ? "Error! Try Again"
                      : "Send a message"}
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
                <h2 className="text-3xl font-display font-medium text-[#1c1c1c]">
                  Tiani Pekins
                </h2>
                <p className="text-[13px] font-bold uppercase tracking-widest text-[#1c1c1c]/60 italic font-mono">
                  Software Engineer
                </p>
              </div>
              <p className="text-[14px] leading-relaxed text-[#1c1c1c] font-medium opacity-80 max-w-sm text-center md:text-left">
                Passionate software engineer dedicated to transforming complex
                challenges into innovative, user-friendly solutions and inspiring
                others through mentorship.
              </p>
              <a 
                href="mailto:tiani@localhands.africa"
                className="text-lg font-black text-[#1c1c1c] text-center md:text-left pt-2 hover:underline block"
              >
                tiani@localhands.africa
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}