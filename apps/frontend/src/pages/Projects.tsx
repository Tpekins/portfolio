import { motion } from "motion/react";
import {
  Github,
  ExternalLink,
  Linkedin,
  Facebook,
  ArrowRight,
  Twitter,
  Check,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  const projects = [
    // {
    //   name: "DreamShorts",
    //   subtitle: "AI-Powered Content Creation Platform",
    //   category: "AI Platform · Saas",
    //   description:
    //     "DreamShorts is an innovative platform that leverages artificial intelligence to generate scripts, videos, and audio content effortlessly.",
    //   responsibilities: [
    //     "Brainstorming: Conceptualizing the platform's vision and defining its core functionalities",
    //     "Wireframing: Designing the structure and flow of user interactions",
    //     "UI/UX Design: Crafting an intuitive and visually appealing interface for a seamless user experience",
    //     "Front-End Development: Building and implementing responsive, dynamic front-end components using modern web technologies",
    //   ],
    //   tools: [
    //     "Excalidraw: Used for brainstorming ideas and creating initial wireframes",
    //     "Figma: Utilized for both wireframing and crafting high-fidelity UI/UX designs",
    //     "React & TypeScript: Developed the front-end of the platform, ensuring a dynamic and responsive experience",
    //     "Shadcn & Tailwind CSS: Implemented modern, scalable design elements to enhance usability and visual appeal",
    //   ],
    //   github: "https://github.com/Tpekins",
    //   live: "https://localhands-cm.vercel.app",
    //   imageText: "d.",
    //   isLive: true,
    // },
    {
      name: "LocalHands",
      subtitle: "Connecting Communities with Skilled Hands",
      category: "Platform · Service Marketplace",
      description:
        "LocalHands is a platform built to bridge the gap between local service providers and people who need them across Cameroon. From handymen to creatives, LocalHands makes it simple to find, book, and trust local talent.",
      responsibilities: [
        "Brainstorming: Conceptualizing the platform vision and core features",
        "UI/UX Design: Crafting an intuitive interface for service providers and clients",
        "Front-End Development: Building responsive, dynamic components",
        "Deployment: Shipping and maintaining the live product",
      ],
      tools: [
        "React: Main frontend library for component-based architecture",
        "TypeScript: Ensuring type safety and better developer experience",
        "Tailwind CSS: Utility-first CSS framework for rapid UI development",
        "Vercel: Cloud platform for static sites and Serverless Functions",
      ],
      github: "https://github.com/Tpekins",
      live: "https://localhands-cm.vercel.app",
      imageText: "l.",
      isLive: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Projects Hero - Pink Banner */}
      <section className="bg-[#ffb5b5] pt-48 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <h1 className="heading-hero text-text-primary">
            Here are my <br />
            <span className="relative inline-block">
              projects
              <span className="absolute bottom-2 left-0 w-full h-3 bg-white/60 -z-10 rounded-sm"></span>
            </span>
          </h1>
          <p className="text-body font-medium max-w-xl mx-auto">
            These are some of the projects that I have worked on.
          </p>

          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-text-primary/10 mt-10">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold">Reach out &</span>
              <Link
                to="/contact"
                className="text-base font-bold underline underline-offset-4 hover:text-white transition-colors"
              >
                Get personal pricing
              </Link>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
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
                  <h2 className="section-title text-[#1a1a1a]">
                    {project.name}
                  </h2>
                  <p className="text-body font-bold text-[#333333] opacity-90">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-body text-[#555555]">
                  {project.description}
                </p>

                <div className="space-y-8">
                  {/* Responsibilities */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-[#1a1a1a]">
                      Key Responsibilities:
                    </h4>
                    <div className="space-y-0">
                      {project.responsibilities.map((item, idx) => {
                        const [bold, rest] = item.split(": ");
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-4 py-4 border-t border-border-subtle/50 first:border-t-0"
                          >
                            <Check
                              className="text-green-600 mt-1 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-base text-[#444444] leading-snug">
                              <span className="font-bold text-[#1a1a1a]">
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
                    <h4 className="text-lg font-bold text-[#1a1a1a]">Tools:</h4>
                    <div className="space-y-0">
                      {project.tools.map((item, idx) => {
                        const parts = item.split(": ");
                        const bold = parts[0];
                        const rest = parts.slice(1).join(": ");
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-4 py-4 border-t border-border-subtle/50 first:border-t-0"
                          >
                            <Minus
                              className="text-green-500 mt-1.5 flex-shrink-0"
                              size={18}
                            />
                            <p className="text-base text-[#444444] leading-snug">
                              <span className="font-bold text-[#1a1a1a]">
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
                    className="inline-flex bg-[#1c1c1c] text-white py-4 px-8 rounded-xl font-bold hover:bg-black transition-all duration-300"
                  >
                    Go To Website
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
