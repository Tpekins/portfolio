import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Check,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@repo/ui";

export default function Projects() {
  const { t } = useTranslation();
  const projects = [
    {
      name: t("projects.name"),
      subtitle: t("projects.subtitle"),
      category: t("projects.category"),
      description: t("projects.description"),
      responsibilities: [
        t("projects.resp1"),
        t("projects.resp2"),
        t("projects.resp3"),
        t("projects.resp4"),
      ],
      tools: [
        t("projects.tool1"),
        t("projects.tool2"),
        t("projects.tool3"),
        t("projects.tool4"),
      ],
      github: "https://github.com/Tpekins",
      live: "https://localhands.africa",
      imageText: "l.",
      isLive: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Projects Hero - Pink Banner */}
      <section className="bg-[#ffb5b5] pt-48 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center space-y-10 pt-14">
          <h1 className="heading-hero text-[#1a1a1c]">
            {t("projects.heroTitle")}
          </h1>
          <p className="text-[#333333] font-medium max-w-xl mx-auto">
            {t("projects.heroSubtitle")}
          </p>

          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#1a1a1c]/10 mt-10">
            <div className="flex items-center gap-3 ">
              <span className="text-base font-bold">{t("projects.reachOut")}</span>
              <Link
                to="/contact"
                className="text-base font-bold underline underline-offset-4 hover:text-white transition-colors"
              > 
                {t("projects.getPricing")}
              </Link>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/Tpekins" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.facebook.com/TianiPekins/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/TianiPekins" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/tiani-pekins-ebika/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
        {/* Project List */}
        <div className="space-y-40 md:space-y-60">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`grid lg:grid-cols-2 gap-20 items-start ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Content */}
              <div
                className={`space-y-12 ${i % 2 !== 0 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="space-y-4">
                  <h2 className="section-title text-[#1a1a1c]">
                    {project.name}
                  </h2>
                  <p className="text-[#333333] font-bold">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-[#333333]">
                  {project.description}
                </p>

                <div className="space-y-8">
                  {/* Responsibilities */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-[#1a1a1c]">
                      {t("projects.responsibilities")}
                    </h4>
                    <div className="space-y-0">
                      {project.responsibilities.map((item, idx) => {
                        const [bold, rest] = item.split(": ");
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-4 py-4 border-t border-[#eeeeee]/50 first:border-t-0"
                          >
                            <Check
                              className="text-green-600 mt-1 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-base text-[#333333] leading-snug">
                              <span className="font-bold text-[#1a1a1c]">
                                {bold}:
                              </span>{" "}
                              {rest}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-[#1a1a1c]">{t("projects.tools")}</h4>
                    <div className="space-y-0">
                      {project.tools.map((item, idx) => {
                        const parts = item.split(": ");
                        const bold = parts[0];
                        const rest = parts.slice(1).join(": ");
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-4 py-4 border-t border-[#eeeeee]/50 first:border-t-0"
                          >
                            <Minus
                              className="text-green-500 mt-1.5 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-base text-[#333333] leading-snug">
                              <span className="font-bold text-[#1a1a1c]">
                                {bold}:
                              </span>{" "}
                              {rest}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={project.isLive ? project.live : project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex bg-black text-white py-4 px-8 rounded-xl font-bold hover:bg-[#ffb5b5] transition-all duration-300"
                  >
                    {t("projects.goToWebsite")}
                  </a>
                </div>
              </div>

              {/* Large Indicator / Visual */}
              <div
                className={`hidden lg:flex justify-center items-center h-full sticky top-32 ${i % 2 !== 0 ? "lg:order-1" : "lg:order-2"}`}
              >
                <div className="text-[18rem] font-display font-black text-[#1d8c83] leading-none select-none tracking-tighter opacity-80">
                  {project.imageText}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
