import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect, useState, useRef, type ReactNode } from "react";
import {
  CheckCircle2,
  Layers,
  Lightbulb,
  Code2,
  Users,
  ExternalLink,
} from "lucide-react";
import { getBlogPosts, type BlogPost } from "../services/api";
import { useTranslation } from "@repo/ui";
import { Helmet } from "react-helmet-async";

type PostStats = {
  comments: number | null;
  reactions: number | null;
  source: "devto" | "medium" | "none";
};

async function fetchPostStats(url: string): Promise<PostStats> {
  if (!url) return { comments: null, reactions: null, source: "none" };

  if (url.includes("dev.to")) {
    try {
      const match = url.match(/dev\.to\/([^/]+)\/([^/]+)/);
      if (!match) return { comments: null, reactions: null, source: "devto" };
      const res = await fetch(
        `https://dev.to/api/articles/${match[1]}/${match[2]}`,
      );
      if (!res.ok) return { comments: null, reactions: null, source: "devto" };
      const data = await res.json();
      return {
        comments: data.comments_count ?? null,
        reactions: data.public_reactions_count ?? null,
        source: "devto",
      };
    } catch {
      return { comments: null, reactions: null, source: "devto" };
    }
  }

  if (url.includes("medium.com")) {
    return { comments: null, reactions: null, source: "medium" };
  }

  return { comments: null, reactions: null, source: "none" };
}

function ArrowDivider({
  fullWidth = false,
  arrowWidth = 60,
  arrowHeight = 80,
  arrowStrokeWidth = 1.5,
}: {
  fullWidth?: boolean;
  arrowWidth?: number;
  arrowHeight?: number;
  arrowStrokeWidth?: number;
}) {
  return (
    <div className="w-full py-10 md:py-20 flex justify-center items-center overflow-hidden">
      <div
        className={
          fullWidth
            ? "w-full flex items-center"
            : "w-full max-w-7xl px-6 flex items-center"
        }
      >
        <div
          className={
            fullWidth
              ? "flex-grow h-[2px] bg-[#1a1a1c] opacity-20"
              : "flex-grow h-px bg-[#1a1a1c] opacity-10"
          }
        ></div>
        <div className="relative flex-shrink-0 mx-6">
          <svg
            width={arrowWidth}
            height={arrowHeight}
            viewBox="0 0 60 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#1a1a1c] opacity-70"
          >
            <path
              d="M20 5 C 20 20, 45 25, 45 45 C 45 60, 20 60, 20 45 C 20 25, 55 35, 55 65"
              stroke="currentColor"
              strokeWidth={arrowStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 60 L 55 65 L 58 58"
              stroke="currentColor"
              strokeWidth={arrowStrokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={
            fullWidth
              ? "flex-grow h-[2px] bg-[#1a1a1c] opacity-20"
              : "flex-grow h-px bg-[#1a1a1c] opacity-10"
          }
        ></div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t, locale } = useTranslation();
  const [previewPosts, setPreviewPosts] = useState<BlogPost[]>([]);
  const [postStats, setPostStats] = useState<PostStats[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -370, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 370, behavior: "smooth" });
  };

  useEffect(() => {
    getBlogPosts({ limit: 10 })
      .then((res) => {
        setPreviewPosts(res.data);
        return Promise.all(
          res.data.map((post) => fetchPostStats(post.externalUrl ?? "")),
        );
      })
      .then(setPostStats)
      .catch(() => {
        setPreviewPosts([]);
        setPostStats([]);
      });
  }, []);

  const summarySections = [
    {
      title: t("home.softwareDev"),
      icon: <Code2 size={40} className="text-indigo-500" />,
      cardClass: "bg-indigo-50 border-indigo-100",
      bullets: [t("home.softwareDev1"), t("home.softwareDev2")],
    },
    {
      title: t("home.communityTech"),
      icon: <Users size={40} className="text-emerald-500" />,
      cardClass: "bg-emerald-50 border-emerald-100",
      bullets: [t("home.communityTech1"), t("home.communityTech2")],
    },
    {
      title: t("home.productStrategy"),
      icon: <Layers size={40} className="text-amber-500" />,
      cardClass: "bg-amber-50 border-amber-100",
      bullets: [t("home.productStrategy1"), t("home.productStrategy2")],
    },
  ];

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Tiani Pekins - Software Engineer</title>
        <meta name="description" content="I'm a Software Engineer and Researcher focusing on distributed architectures, database optimization, and HCI in resource-constrained environments." />
        <link rel="canonical" href="https://tianipekins.com" />
        <meta property="og:title" content="Tiani Pekins - Software Engineer" />
        <meta property="og:description" content="I'm a Software Engineer and Researcher focusing on distributed architectures, database optimization, and HCI in resource-constrained environments." />
        <meta property="og:url" content="https://tianipekins.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tianipekins.com/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tiani Pekins - Software Engineer" />
        <meta name="twitter:description" content="I'm a Software Engineer and Researcher focusing on distributed architectures, database optimization, and HCI in resource-constrained environments." />
        <meta name="twitter:image" content="https://tianipekins.com/og-image.svg" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-8 md:pb-12 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 md:space-y-12"
          >
            <div className="space-y-6">
              <h1 className="heading-hero text-[#1a1a1c] max-w-2xl">
                {t("home.heroTitle")}
              </h1>
              <p className="text-sm md:text-base text-[#333333] font-bold max-w-lg pt-4">
                {t("home.heroSubtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto text-center px-8 py-4 md:px-12 md:py-5 bg-[#1a1a1c] text-white hover:bg-[#2e7d32] rounded-xl font-bold text-base md:text-xl transition-all duration-500 shadow-xl"
              >
                {t("home.letsTalk")}
              </Link>

              <a
                href="/cv.pdf"
                download="Tiani_Pekins_CV.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-4 md:py-5 border-2 border-[#1a1a1c] text-[#1a1a1c] hover:bg-[#1a1a1c] hover:text-white rounded-xl font-bold text-base md:text-xl transition-all duration-500"
              >
                {t("home.downloadCV")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative flex items-center justify-center h-full"
          >
            <div className="relative w-full aspect-square max-w-[600px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#fafafa] rounded-full opacity-50"></div>

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
                    size={60}
                    className="text-amber-400 fill-amber-400/20 group-hover:fill-amber-400 transition-colors duration-500 md:size-100"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-amber-400 blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity"></div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0], rotate: [12, 8, 12] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="text-[10rem] md:text-[18rem] lg:text-[22rem] font-black text-white drop-shadow-[0_20px_50px_rgba(46,125,50,0.3)] select-none italic relative">
                  <span className="bg-gradient-to-br from-indigo-400 via-[#2e7d32]/40 to-teal-400 bg-clip-text text-transparent">{`</>`}</span>
                  <div className="absolute -inset-4 bg-white/20 blur-3xl -z-10 rounded-full opacity-50"></div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-15, 15, -15], x: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[10%] right-[5%] z-20 space-y-[-20px] md:space-y-[-40px]"
              >
                <div className="w-20 h-20 md:w-32 md:h-32 bg-amber-200 border-2 border-white rounded-2xl rotate-[30deg] shadow-xl relative z-30"></div>
                <div className="w-20 h-20 md:w-32 md:h-32 bg-rose-200 border-2 border-white rounded-2xl rotate-[30deg] shadow-xl relative z-20 translate-x-4"></div>
                <div className="w-20 h-20 md:w-32 md:h-32 bg-teal-200 border-2 border-white rounded-2xl rotate-[30deg] shadow-xl relative z-10"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary Section */}
      <section className="py-12 md:py-25 px-6 bg-white/60 backdrop-blur-md border-t border-[#eeeeee]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <span className="section-label">{t("home.quickSummary")}</span>
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-display font-black tracking-tight mt-4 leading-tight">
              {t("home.summaryTitle")}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {summarySections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-8"
              >
                <div className="flex flex-col items-center gap-4 md:gap-6">
                  <div
                    className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl border flex items-center justify-center shadow-inner ${section.cardClass}`}
                  >
                    {section.icon}
                  </div>
                  <h3 className="heading-card !text-center">{section.title}</h3>
                </div>
                <ul className="space-y-3 md:space-y-4">
                  {section.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-[#333333] text-xs md:text-sm leading-relaxed font-medium"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#2e7d32] shrink-0 mt-1"
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
      <section className="py-12 md:py-25 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="bg-[#2e7d32] text-white py-10 px-6 md:px-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-green-900/10"
          >
            <h3 className="text-base md:text-lg lg:text-xl font-display font-bold tracking-tight leading-tight text-center md:text-left">
              {t("home.ctaTitle")}
            </h3>
            <Link
              to="/contact"
              className="px-8 py-3 bg-black text-white hover:bg-white hover:text-black border-2 border-black rounded-xl font-bold text-sm transition-all duration-300 shadow-xl whitespace-nowrap shrink-0"
            >
              {t("home.letsTalk")}
            </Link>
          </motion.div>
        </div>
      </section>

      <ArrowDivider
        fullWidth
        arrowWidth={90}
        arrowHeight={120}
        arrowStrokeWidth={3}
      />

      {/* Projects Preview Section Header */}
      <section className="pt-6 pb-8 md:pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-8 pb-6 md:pb-8 border-b border-[#eeeeee]/50"
        >
          <div className="space-y-3 max-w-3xl">
            <span className="section-label">{t("home.selectedWork")}</span>
            <h2 className="section-title !text-2xl md:!text-3xl lg:!text-4xl">{t("home.myProjects")}</h2>
          </div>
          <Link to="/projects" className="nav-link !text-medium py-3">
            {t("home.viewAllProjects")}
          </Link>
        </motion.div>
      </section>

      {/* Single Featured Project - LocalHands */}
      <section className="pb-12 md:pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid md:grid-cols-2 gap-8 md:gap-16 items-center group"
          >
            <div className="bg-[#fafafa] border border-[#eeeeee] rounded-2xl md:rounded-[3rem] overflow-hidden aspect-[3/2] md:aspect-square relative flex items-center justify-center p-4 md:p-16 shadow-inner group-hover:scale-[1.01] transition-transform duration-1000">
              <img
                src="/logo.png"
                alt="LocalHands logo"
                className="w-full h-full object-contain group-hover:rotate-3 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2e7d32]/5 to-transparent"></div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h3 className="section-title !text-3xl md:!text-4xl !font-normal group-hover:text-[#2e7d32] transition-colors">
                {t("projects.name")}
              </h3>
              <p className="section-label">{t("home.localhandsLabel")}</p>
              <p className="text-sm md:text-base text-[#333333] font-light">
                {t("home.localhandsDesc")}
              </p>
              <Link
                to="/projects"
                className="btn-outline !px-6 !py-3 md:!px-8 md:!py-4 !text-sm md:!text-base"
              >
                {t("home.learnMore")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ArrowDivider />

      {/* Blog Preview Section */}
      <section className="py-12 md:py-24 px-6 md:px-12 bg-[#fafafa]/30 border-t border-[#eeeeee]/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8 mb-8 md:mb-16 pb-6 md:pb-8 border-b border-[#eeeeee]/50"
          >
            <div className="space-y-3 max-w-4xl">
              <span className="section-label">{t("home.myThoughts")}</span>
              <h2 className="text-2xl md:text-2xl lg:text-[28px] font-display font-black tracking-tight mt-2 leading-tight">
                {t("home.insightsTitle")}
              </h2>
            </div>
            <Link
              to="/blog"
              className="nav-link !text-lg  py-3 whitespace-nowrap"
            >
              {t("home.readAllPosts")}
            </Link>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            {previewPosts.length > 3 && (
              <>
                <button
                  onClick={scrollLeft}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-[#eeeeee] rounded-full shadow-md flex items-center justify-center hover:bg-[#fafafa] transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-[#eeeeee] rounded-full shadow-md flex items-center justify-center hover:bg-[#fafafa] transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <div
              ref={scrollRef}
              className="flex gap-4 md:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            >
              {previewPosts.length > 0 ? (
                previewPosts.map((post, i) => {
                  const Wrapper = post.externalUrl
                    ? ({ children }: { children: ReactNode }) => (
                        <a
                          href={post.externalUrl!}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {children}
                        </a>
                      )
                    : ({ children }: { children: ReactNode }) => (
                        <Link to={`/blog/${post.slug}`}>{children}</Link>
                      );
                  return (
                    <Wrapper key={post.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white border border-[#eeeeee] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer flex-shrink-0 w-[260px] md:w-[350px] snap-start"
                      >
                        {/* Thumbnail */}
                        <div className="aspect-video bg-[#fafafa] overflow-hidden">
                          {post.thumbnail ? (
                            <img
                              src={post.thumbnail}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full animate-pulse opacity-40 bg-[#fafafa]" />
                          )}
                        </div>

                        <div className="p-4 md:p-8 space-y-3 md:space-y-6">
                          <span className="text-[9px] md:text-[10px] font-black italic text-[#2e7d32] uppercase opacity-60">
                            {post.publishedAt
                              ? new Date(post.publishedAt)
                                  .toLocaleDateString(locale, {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                  })
                                  .toUpperCase()
                              : "-"}
                          </span>
                          <h4 className="text-base md:text-2xl font-bold leading-tight group-hover:text-[#2e7d32] transition-colors line-clamp-3">
                            {post.title}
                          </h4>
                          <div className="flex items-center justify-between pt-4 border-t border-[#eeeeee]">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-40">
                              <CheckCircle2 size={14} /> {post.author.name}
                            </div>

                            {/* Dev.to auto stats */}
                            {postStats[i]?.source === "devto" && (
                              <div className="flex gap-4 text-[10px] font-bold opacity-60">
                                <span>
                                  {postStats[i].reactions !== null
                                    ? `${postStats[i].reactions} ${t("home.react")}`
                                    : "-"}
                                </span>
                                <span>
                                  {postStats[i].comments !== null
                                    ? `${postStats[i].comments} ${t("home.comm")}`
                                    : "-"}
                                </span>
                              </div>
                            )}

                            {/* Medium read link */}
                            {postStats[i]?.source === "medium" &&
                              post.externalUrl && (
                                <a
                                  href={post.externalUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#2e7d32] opacity-70 hover:opacity-100 transition-opacity"
                                >
                                  {t("home.readOnMedium")}{" "}
                                  <ExternalLink size={10} />
                                </a>
                              )}

                            {/* LinkedIn likes + read link */}
                            {(!postStats[i] ||
                              postStats[i]?.source === "none") &&
                              post.externalUrl?.includes("linkedin.com") && (
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-bold opacity-60">
                                    {post.likes ?? 5} REACT
                                  </span>
                                  <span className="text-[10px] font-bold opacity-60">
                                    {post.likes ?? 1} COMM
                                  </span>
                                  <a
                                    href={post.externalUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#2e7d32] opacity-70 hover:opacity-100 transition-opacity"
                                  ></a>
                                </div>
                              )}

                            {/* Fallback category */}
                            {(!postStats[i] ||
                              postStats[i]?.source === "none") &&
                              !post.externalUrl?.includes("linkedin.com") && (
                                <span className="text-[10px] font-bold opacity-40">
                                  {post.category}
                                </span>
                              )}
                          </div>
                        </div>
                      </motion.div>
                    </Wrapper>
                  );
                })
              ) : (
                <div className="w-full text-center py-16 text-[#333333] font-medium opacity-50">
                  {t("home.noPosts")}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
