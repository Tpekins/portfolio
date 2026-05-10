import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Lightbulb,
  Code2,
  Users,
} from "lucide-react";

function ArrowDivider() {
  return (
    <div className="w-full py-20 flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-7xl px-6 flex items-center">
        <div className="flex-grow h-px bg-text-primary opacity-10"></div>
        <div className="relative flex-shrink-0 mx-6">
          <svg
            width="60"
            height="80"
            viewBox="0 0 60 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-primary opacity-70"
          >
            <path
              d="M20 5 C 20 20, 45 25, 45 45 C 45 60, 20 60, 20 45 C 20 25, 55 35, 55 65"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 60 L 55 65 L 58 58"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-grow h-px bg-text-primary opacity-10"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const summarySections = [
    {
      title: "Software Development",
      icon: <Code2 size={40} className="text-primary/20" />,
      bullets: [
        "Architecting web and mobile applications using modern frameworks.",
        "Building robust solutions that connect and empower communities.",
      ],
    },
    {
      title: "Community & Tech",
      icon: <Users size={40} className="text-primary/20" />,
      bullets: [
        "Contributing to local tech ecosystems and guiding aspiring developers.",
        "Mentoring on tech stacks and community-led innovation.",
      ],
    },
    {
      title: "Product Strategy",
      icon: <Layers size={40} className="text-primary/20" />,
      bullets: [
        "Driving projects from concept to deployment with a focus on user impact.",
        "Collaborating with cross-functional teams to manage full product lifecycles.",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h1 className="heading-hero text-text-primary max-w-2xl">
                Building <br />
                tomorrow <br />
                <span className="text-primary underline decoration-primary/20 decoration-4 underline-offset-4">
                  today
                </span>
                , One line <br />
                at a time
              </h1>
              <p className="text-body font-bold max-w-lg opacity-80 pt-4">
                Because great software doesn't write itself... yet.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-text-primary text-white hover:bg-primary rounded-xl font-bold text-xl transition-all duration-500 shadow-xl"
            >
              Let's Talk
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative flex items-center justify-center h-full"
          >
            {/* Visual elements precisely as in image */}
            <div className="relative w-full aspect-square max-w-[600px]">
              {/* Background Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-bg-secondary rounded-full opacity-50"></div>

              {/* Lightbulb */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[10%] left-[10%] z-20 group"
              >
                <div className="relative">
                  <Lightbulb
                    size={100}
                    className="text-amber-400 fill-amber-400/20 group-hover:fill-amber-400 transition-colors duration-500"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-amber-400 blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>
                </div>
              </motion.div>

              {/* 3D Code Symbol */}
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [12, 8, 12] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="text-[18rem] md:text-[22rem] font-black text-white drop-shadow-[0_20px_50px_rgba(46,125,50,0.3)] select-none italic relative">
                  <span className="bg-gradient-to-br from-indigo-400 via-primary/40 to-teal-400 bg-clip-text text-transparent">{`</>`}</span>
                  <div className="absolute -inset-4 bg-white/20 blur-3xl -z-10 rounded-full opacity-50"></div>
                </div>
              </motion.div>

              {/* Stacked Layers */}
              <motion.div
                animate={{ y: [-15, 15, -15], x: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[10%] right-[5%] z-20 space-y-[-40px]"
              >
                <div className="w-32 h-32 bg-amber-200 border-2 border-white rounded-2xl rotate-[30deg] shadow-xl relative z-30"></div>
                <div className="w-32 h-32 bg-rose-200 border-2 border-white rounded-2xl rotate-[30deg] shadow-xl relative z-20 translate-x-4"></div>
                <div className="w-32 h-32 bg-teal-200 border-2 border-white rounded-2xl rotate-[30deg] shadow-xl relative z-10"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary Section */}
      <section className="py-20 px-6 bg-white/60 backdrop-blur-md border-y border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="section-label">Quick Summary</span>
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-display font-black tracking-tight mt-4 leading-tight">
              Crafting Digital Solutions From Concept to Deployment
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {summarySections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-8"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl bg-bg-secondary border border-border-subtle flex items-center justify-center shadow-inner">
                    {section.icon}
                  </div>
                  <h3 className="heading-card text-center">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-body text-sm leading-relaxed font-medium"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-1"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="bg-[#2e7d32] text-white py-5 px-6 md:px-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-green-900/10"
          >
            <h3 className="text-lg md:text-xl font-display font-black tracking-tight leading-tight text-center md:text-left">
              Start your own project with me today
            </h3>
            <Link
              to="/contact"
              className="px-8 py-2.5 bg-black text-white hover:opacity-90 rounded-xl font-bold text-sm transition-all duration-300 shadow-xl whitespace-nowrap shrink-0"
            >
              Let's Talk
            </Link>
          </motion.div>
        </div>
      </section>

      <ArrowDivider />

      {/* Projects Preview Section Header */}
      <section className="pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 pb-8 border-b border-border-subtle"
        >
          <div className="space-y-3 max-w-3xl">
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">My Projects</h2>
          </div>
          <Link to="/projects" className="nav-link !text-lg py-3">
            View all projects
          </Link>
        </motion.div>
      </section>

      {/* Single Featured Project Example - LocalHands */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-16 items-center group"
          >
            <div className="bg-bg-secondary border border-border-subtle rounded-[3rem] overflow-hidden aspect-square relative flex items-center justify-center p-16 shadow-inner group-hover:scale-[1.01] transition-transform duration-1000">
              <div className="text-[10rem] md:text-[12rem] font-display font-black text-primary tracking-tighter uppercase select-none group-hover:rotate-3 transition-transform duration-1000">
                LH
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
            </div>
            <div className="space-y-6">
              <h3 className="section-title !text-4xl md:!text-5xl group-hover:text-primary transition-colors">
                LocalHands
              </h3>
              <p className="section-label">{`AI-Powered Content Creation Platform`}</p>
              <p className="text-body font-light">
                LocalHands is an innovative platform that leverages skilled
                hands to generate reliable services, quality work, and
                audio-visual solutions effectively.
              </p>
              <Link
                to="/projects"
                className="btn-outline !px-10 !py-4 !text-base"
              >
                Learn more
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ArrowDivider />

      {/* Blog Preview Section */}
      <section className="py-24 px-6 md:px-12 bg-bg-secondary/30 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 pb-8 border-b border-border-subtle/50"
          >
            <div className="space-y-3 max-w-4xl">
              <span className="section-label">My Thoughts</span>
              <h2 className="text-2xl md:text-2xl lg:text-[28px] font-display font-black tracking-tight mt-2 leading-tight">
                Insights & Ideas:{" "}
                <span className="text-text-secondary underline decoration-primary/10 decoration-2 underline-offset-4">
                  My Thoughts on Tech, Design, and Innovation
                </span>
              </h2>
            </div>
            <Link
              to="/blog"
              className="nav-link !text-lg py-3 whitespace-nowrap"
            >
              Read all posts
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title:
                  "How I Got Into Microsoft through the Microsoft LEAP Apprenticeship Program — Nairobi Cohort 1",
                date: "May 10, 2026",
                author: "Tiani",
              },
              {
                title: "Preparing For The Software Engineering Interview",
                date: "January 20, 2023",
                author: "Tiani",
              },
              {
                title:
                  "Where To Start When Learning How To Code — My Perspective",
                date: "October 12, 2021",
                author: "Tiani",
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-not-allowed"
              >
                <div className="aspect-video bg-bg-secondary animate-pulse opacity-40"></div>
                <div className="p-8 space-y-6">
                  <span className="text-[10px] font-black italic text-primary uppercase opacity-60">
                    {post.date}
                  </span>
                  <h4 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-3">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle opacity-40">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase">
                      <CheckCircle2 size={14} /> {post.author}
                    </div>
                    <div className="flex gap-4 text-[10px] font-bold">
                      <span>0 VIEWS</span>
                      <span>0 COMM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
