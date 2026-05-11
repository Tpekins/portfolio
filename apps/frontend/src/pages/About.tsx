import { motion } from "motion/react";
import {
  Linkedin,
  HelpingHand,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function About() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const experiences = [
    {
      role: "University of Buea",
      subtitle: "MS Software Engineering",
      period: "Sept 2021 - to date",
      desc: "As an MS Software Engineering student, I am dedicated to deepening my technical expertise and mastering modern software architecture. My focus is on becoming an exceptional software engineer, continuously honing my skills to design, build, and deploy scalable solutions to complex challenges. Driven by a passion for technology, I am committed to using these skills to make a tangible, positive impact on my community and the tech industry.",
      logoText: "M",
      logoBg: "bg-[#00274c]",
      quote:
        "The future belongs to those who believe in the beauty of their dreams and work relentlessly to turn them into reality. — Eleanor Roosevelt",
    },
    /*
    {
      role: "Microsoft",
      subtitle: "Software Engineer",
      period: "July 2021 - Sept 2023",
      desc: "At Microsoft, within the Windows + Devices and later on in the Sustainability Team, I developed cross-platform applications using Xamarin and C# to create scalable solutions for both Android and Apple devices. I was nominated for the Diversity & Inclusion Microsoft Award and earned the Site Lead Award for the Microsoft Global Hackathon. During the hackathon, I led the development of Ndovu Network, a mentorship matching web application, showcasing my leadership and innovation.",
      logoText: "MS",
      logoBg: "bg-white border-2 border-slate-100",
      quote: "The best way to predict the future is to invent it — Alan Kay",
    },
    
    {
      role: "Microsoft LEAP",
      subtitle: "Apprenticeship",
      period: "May 2020 - Jan 2021",
      desc: "During my time in the Microsoft LEAP Apprenticeship Program, I received comprehensive training in C#, the .NET Framework, and the Microsoft Bot Framework. I contributed to the development of a legal bot that provided remote legal services, which played a key role in securing my subsequent apprenticeship at Microsoft, Redmond. Additionally, I enhanced the image onboarding process by implementing a failure reason feature, improving issue resolution efficiency. I also created a Power BI report to visualize inactive repositories, identifying over 100,000 repositories that led to significant cost savings through resource optimization.",
      logoText: "LEAP",
      logoBg: "bg-white border-2 border-slate-100",
      quote:
        "Success is the sum of small efforts, repeated day in and day out — Robert Collier",
    },
    */
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-[50px] font-display font-black tracking-tight leading-tight text-[#1c1c1c]"
          >
            I <span className="green-underline">solve problems</span> using{" "}
            <br /> software
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-5xl aspect-[16/10] bg-white rounded-2xl border border-border-subtle overflow-hidden relative shadow-sm flex items-center justify-center p-0"
          >
            {/* Complex Illustration Mockup to match the image */}
            <div className="relative w-full h-full flex items-center justify-center bg-white overflow-hidden">
              <div className="absolute inset-0 bg-white"></div>
              <div className="relative z-10 w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
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
            <span className="section-label">About Me</span>
            <div className="space-y-8 text-sm md:text-base font-medium leading-relaxed text-[#1c1c1c] opacity-80">
              <p>
                I'm a passionate{" "}
                <span className="font-bold">software engineer</span> and{" "}
                pursuing my masters in Software Engineering at the{" "}
                <span className="font-bold">University of Buea</span>.As an
                active participant in{" "}
                <span className="font-bold">Silicon Mountain</span> tech
                community. I thrive on collaborating to build scalable,
                innovative solutions that push the boundaries of technology in
                our region and beyond.
              </p>
              <p>
                I have also founded{" "}
                <span className="font-bold">LocalHands</span>, a non-profit
                service exchange platform dedicated to empowering the informal
                economy in Cameroon and across Africa. With 90% of our active
                population working informally, many face "information poverty"
                and a severe trust gap, relying on inefficient word-of-mouth or
                paper flyers to find work.{" "}
                <span className="font-bold">LocalHands</span> bridges this gap
                by providing a digital space where everyday artisans and labourers,
                from diggers
                to cocoa harvesters can digitally showcase their skills, build
                visibility, and seamlessly connect with clients.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:pl-20">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-[#6366f1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <Linkedin size={32} className="text-white" fill="white" />
              </div>
              <div className="space-y-0.5">
                <p className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1c1c1c]">
                  50+
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c] opacity-60">
                  Connections
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-[#22c55e] rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
                <HelpingHand size={32} className="text-white" />
              </div>
              <div className="space-y-0.5">
                <p className="text-4xl md:text-5xl font-display font-black tracking-tighter text-[#1c1c1c]">
                  15+
                </p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c] opacity-60">
                  People Mentored
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-24 pb-16 px-6 md:px-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto flex flex-col items-start text-left">
          <span className="section-label">My Experience</span>
          <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-[#1c1c1c] mt-8">
            These are my <span className="text-green-400">professional</span>{" "}
            experiences.
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
                <div
                  className={`w-32 h-32 rounded-lg ${exp.logoBg} flex items-center justify-center shadow-lg overflow-hidden`}
                >
                  {exp.role === "University of Michigan" ? (
                    <img
                      src="https://brand.umich.edu/assets/brand-portal/images/logos-guidelines/um-logo-vertical.png"
                      alt="UM Logo"
                      className="w-20 h-auto"
                      referrerPolicy="no-referrer"
                    />
                  ) : exp.role === "Microsoft" ? (
                    <div className="grid grid-cols-2 gap-1 w-16 h-16">
                      <div className="bg-[#f25022] w-full h-full"></div>
                      <div className="bg-[#7fba00] w-full h-full"></div>
                      <div className="bg-[#00a4ef] w-full h-full"></div>
                      <div className="bg-[#ffb900] w-full h-full"></div>
                    </div>
                  ) : (
                    <div className="rounded-full border-2 border-slate-200 p-2">
                      <img
                        src="https://leap.microsoft.com/static/version1677616656/frontend/Microsoft/leap/en_US/images/logo.png"
                        alt="LEAP Logo"
                        className="w-16 h-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-bold text-[#1c1c1c]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-text-secondary">
                    {exp.subtitle}
                  </p>
                  <p className="text-[11px] font-bold text-text-secondary opacity-40 uppercase tracking-widest pt-1">
                    {exp.period}
                  </p>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-[#1c1c1c] opacity-80 font-medium">
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
                  <p className="text-sm italic font-medium text-[#1c1c1c] opacity-80 leading-relaxed">
                    {exp.quote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

     { /* Footer Section 
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t border-border-subtle pt-16 pb-12 px-6 md:px-12 bg-white"
      >
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left - Scroll to top button 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-12 h-12 border-2 border-text-primary rounded-lg flex items-center justify-center hover:bg-text-primary hover:text-white transition-all group shadow-sm bg-white"
              aria-label="Back to top"
            >
              <ChevronUp size={24} />
            </motion.button>

           
            <div className="text-center space-y-3">
              <p className="text-sm font-medium text-text-secondary">
                © 2026 | All rights reserved | Made with ❤️ by Tiani Pekins.
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
      */}
    
    </div>
  );
}
