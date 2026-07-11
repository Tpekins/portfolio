import { motion } from "motion/react";
import { Linkedin, HelpingHand } from "lucide-react";
import { useTranslation } from "@repo/ui";
import { Helmet } from "react-helmet-async";

export default function About() {
  const { t } = useTranslation();
  const experiences = [
    {
      role: t("about.role"),
      subtitle: t("about.subtitle"),
      period: t("about.period"),
      desc: t("about.expDesc"),
      logoText: "M",
      logoBg: "bg-[#00274c]",
      quote: t("about.quote"),
    },
  ];

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>About Tiani Pekins Ebika | Software Engineer & Founder</title>
        <meta name="description" content="Learn about Tiani Pekins Ebika — Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea. Based in Cameroon, Silicon Mountain." />
        <meta name="keywords" content="Tiani Pekins Ebika, about, software engineer, University of Buea, LocalHands Africa, Cameroon, full-stack developer" />
        <link rel="canonical" href="https://tianipekins.com/about" />
        <meta property="og:title" content="About Tiani Pekins Ebika | Software Engineer & Founder" />
        <meta property="og:description" content="Learn about Tiani Pekins Ebika — Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea." />
        <meta property="og:url" content="https://tianipekins.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://tianipekins.com/Tiani.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Tiani Pekins Ebika | Software Engineer & Founder" />
        <meta name="twitter:description" content="Learn about Tiani Pekins Ebika — Full-stack Software Engineer, Founder of LocalHands.Africa." />
        <meta name="twitter:image" content="https://tianipekins.com/Tiani.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Tiani Pekins Ebika",
            "url": "https://tianipekins.com/about",
            "jobTitle": "Software Engineer",
            "description": "Full-stack Software Engineer, Founder of LocalHands.Africa, and MS Software Engineering student at University of Buea.",
            "image": "https://tianipekins.com/Tiani.jpg",
            "sameAs": [
              "https://github.com/Tpekins",
              "https://www.linkedin.com/in/tiani-pekins-ebika/",
              "https://x.com/TianiPekins",
              "https://medium.com/@TianiPekinsEbika",
              "https://dev.to/tianipekinsebika"
            ],
            "alumniOf": {
              "@type": "CollegeOrUniversity",
              "name": "University of Buea"
            },
            "worksFor": {
              "@type": "Organization",
              "name": "LocalHands.Africa"
            }
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-[50px] font-display font-black tracking-tight leading-tight text-[#1a1a1c]"
          >
            {t("about.heroTitle")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-5xl aspect-[16/10] bg-white rounded-2xl border border-[#eeeeee] overflow-hidden relative shadow-sm flex items-center justify-center p-0"
          >
            {/* Complex Illustration Mockup to match the image */}
            <div className="relative w-full h-full flex items-center justify-center bg-white overflow-hidden">
              <div className="absolute inset-0 bg-white"></div>
              <div className="relative z-10 w-full h-full">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/000/180/409/non_2x/software-engineers-vector.png"
                  alt="Software Engineering Illustration"
                  className="w-full h-full object-cover opacity-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Simplified geometric illustration of the image content */}
                  <div className="w-[80%] h-[80%] relative">
                    {/* Desk and Computer mockup */}
                    <div className="absolute bottom-[10%] left-[10%] w-[80%] h-[10%] bg-[#8b5e3c] rounded-lg shadow-md"></div>
                    <div className="absolute bottom-[20%] left-[30%] w-[40%] h-[40%] bg-[#1c1c1c] rounded-lg border-4 border-[#333] shadow-2xl flex items-center justify-center">
                      <div className="w-[90%] h-[85%] bg-blue-500/10 rounded flex flex-col p-4 space-y-2">
                        <div className="w-1/2 h-2 bg-blue-400/40 rounded"></div>
                        <div className="w-3/4 h-2 bg-blue-400/40 rounded"></div>
                        <div className="w-2/3 h-2 bg-pink-400/40 rounded"></div>
                        <div className="w-1/2 h-2 bg-blue-400/40 rounded"></div>
                      </div>
                    </div>
                    {/* Person mockup */}
                    <div className="absolute bottom-[20%] right-[20%] w-[25%] h-[60%] bg-pink-200 rounded-t-full shadow-lg"></div>
                    {/* Floating elements */}
                    <div className="absolute top-[10%] left-[20%] w-16 h-16 bg-blue-100 rounded-lg shadow-lg flex items-center justify-center rotate-12 text-blue-500 font-bold opacity-80">
                      {"</>"}
                    </div>
                    <div className="absolute top-[5%] right-[30%] w-20 h-20 bg-yellow-100 rounded-lg shadow-lg flex items-center justify-center -rotate-6 text-yellow-600 font-bold opacity-80">
                      C++
                    </div>
                    <div className="absolute top-[30%] left-[15%] w-24 h-16 bg-white border border-slate-100 rounded-lg shadow-xl p-2 space-y-1 opacity-90">
                      <div className="w-full h-1 bg-slate-100 rounded"></div>
                      <div className="w-3/4 h-1 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Me & Stats */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <span className="section-label">{t("about.aboutMe")}</span>
              <div className="space-y-5 text-sm md:text-base font..... leading-relaxed text-[#1a1a1c]">
              <p>
                {t("about.aboutDesc1")}
              </p>
              <p>
                {t("about.aboutDesc2")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:pl-20 pt-2">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-[#6366f1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Linkedin size={32} className="text-white" fill="white" />
              </div>
              <div className="space-y-0.5">
                <p className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a1c]">
                  70+
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#333333]">
                  {t("about.connections")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-[#22c55e] rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
                <HelpingHand size={32} className="text-white" />
              </div>
              <div className="space-y-0.5">
                <p className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1a1a1c]">
                  25+
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#333333] ">
                  {t("about.peopleMentored")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24 pb-16 px-6 md:px-12 border-t border-[#eeeeee]">
        <div className="max-w-7xl mx-auto flex flex-col items-start text-left">
          <span className="section-label">{t("about.myExperience")}</span>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-[#1a1a1c] mt-8">
            {t("about.experienceTitle")}
          </h2>
        </div>
      </section>

      {/* Experience List Cards */}
      <section className="pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid lg:grid-cols-12 gap-12 items-start"
            >
              {/* Logo */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className={`w-32 h-32 rounded-lg ${exp.logoBg} flex items-center justify-center shadow-lg overflow-hidden group relative`}>
                  <img
                    src="/ub.jpg"
                    alt="University of Buea Logo"
                    className="w-full h-auto object-contain p-2 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-[#2e7d32]/0 group-hover:bg-[#2e7d32]/20 transition-colors duration-500"></div>
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-bold text-[#1a1a1c]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-[#333333]">
                    {exp.subtitle}
                  </p>
                  <p className="text-[11px] font-bold text-[#333333] opacity-40 uppercase tracking-widest pt-1">
                    {exp.period}
                  </p>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-[#1a1a1c] font....">
                  {exp.desc}
                </p>
              </div>

              {/* Quote */}
              <div className="lg:col-span-4 lg:pl-8">
                <div className="bg-[#f8f9fb] p-8 rounded-2xl relative">
                  <div className="absolute -top-4 -left-2 text-indigo-600">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="text-sm italic font-medium text-[#1a1a1c] leading-relaxed">
                    {exp.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
