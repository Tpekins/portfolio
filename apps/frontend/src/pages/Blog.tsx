import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogPosts, type BlogPost } from "../services/api";
import { useTranslation } from "@repo/ui";
import { Helmet } from "react-helmet-async";

function getPlatformLabel(url: string | null): string {
  if (!url) return "";
  if (url.includes("medium.com")) return "Medium";
  if (url.includes("dev.to")) return "Dev.to";
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("hashnode.com")) return "Hashnode";
  if (url.includes("substack.com")) return "Substack";
  try {
    const host = new URL(url).hostname.replace("www.", "");
    return host.charAt(0).toUpperCase() + host.slice(1);
  } catch {
    return "";
  }
}

const categoryConfig: Record<string, { textClass: string; borderClass: string }> = {
  Tech: {
    textClass: "text-blue-600",
    borderClass: "border-blue-300",
  },
  Software: {
    textClass: "text-violet-600",
    borderClass: "border-violet-300",
  },
  Life: {
    textClass: "text-amber-600",
    borderClass: "border-amber-300",
  },
  Community: {
    textClass: "text-emerald-600",
    borderClass: "border-emerald-300",
  },
};

function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] ?? categoryConfig["Tech"];
  return (
    <span
      className={`inline-flex items-center text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${config.borderClass} ${config.textClass}`}
    >
      {category}
    </span>
  );
}

function wrapPost(post: BlogPost) {
  const card = <PostCard post={post} />;
  if (post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noreferrer" key={post.id}>
        {card}
      </a>
    );
  }
  return (
    <Link to={`/blog/${post.slug}`} key={post.id}>
      {card}
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const { t, locale } = useTranslation();
  const config = categoryConfig[post.category] ?? categoryConfig["Tech"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative py-10 md:py-12 border-b border-[#eeeeee] hover:bg-[#2e7d32]/5 transition-colors duration-700 cursor-pointer"
    >
      <div className="px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 lg:gap-12 items-start">
          {/* Left: Date + Category stacked vertically */}
          <div className="md:col-span-2 flex flex-row md:flex-col gap-2 items-center md:items-start">
            <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${config.textClass}`}>
              {formatDate(post.publishedAt, locale)}
            </div>
            <CategoryBadge category={post.category} />
          </div>

          {/* Middle: Content */}
          <div className="md:col-span-8 w-full">
            <h3 className="section-title !text-xl md:!text-2xl group-hover:opacity-80 transition-opacity duration-500">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="mt-3 text-[#333333] text-sm font-medium leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
            {post.externalUrl && (
                <a
                href={post.externalUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#2e7d32] hover:opacity-80 transition-opacity"
              >
                {t("blog.readOn")} {getPlatformLabel(post.externalUrl)}{" "}
                <ExternalLink size={10} />
              </a>
            )}
          </div>

          {/* Right: Arrow */}
          <div className="md:col-span-2 flex justify-end items-center">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white shadow-xl shadow-[#2e7d32]/10 flex items-center justify-center text-[#2e7d32] group-hover:bg-[#2e7d32] group-hover:text-white transition-all duration-500 group-hover:scale-110">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2e7d32]/0 via-[#2e7d32]/5 to-[#2e7d32]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </motion.div>
  );
}

function formatDate(dateStr: string | null, locale: string): string {
  if (!dateStr) return "-";
  return new Date(dateStr)
    .toLocaleDateString(locale, {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getBlogPosts()
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    const progress = max > 0 ? el.scrollTop / max : 0;
    setScrollProgress(progress);
    setIsScrolling(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 1200);
  };

  const categories = ["All", "Tech", "Software", "Life", "Community"];
  const categoryLabels: Record<string, string> = {
    All: t("blog.all"),
    Tech: t("blog.tech"),
    Software: t("blog.software"),
    Life: t("blog.life"),
    Community: t("blog.community"),
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt?.toLowerCase() ?? "").includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const barVisible = isHovered && isScrolling;

  return (
    <div className="flex flex-col bg-white">
      <Helmet>
        <title>My Blog - Tiani Pekins</title>
        <meta name="description" content="Articles on software engineering, tech, community building, and life in Cameroon's Silicon Mountain. Including insights from my research experience." />
        <link rel="canonical" href="https://tianipekins.com/blog" />
        <meta property="og:title" content="My Blog - Tiani Pekins" />
        <meta property="og:description" content="Articles on software engineering, tech, community building, and life in Cameroon's Silicon Mountain. Including insights from my research experience." />
        <meta property="og:url" content="https://tianipekins.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tianipekins.com/og-image.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Blog - Tiani Pekins" />
        <meta name="twitter:description" content="Articles on software engineering, tech, community building, and life in Cameroon's Silicon Mountain. Including insights from my research experience." />
        <meta name="twitter:image" content="https://tianipekins.com/og-image.svg" />
      </Helmet>

      {/* Blog Hero */}
      <section className="pt-32 md:pt-48 pb-8 md:pb-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 md:gap-8 mb-10 md:mb-16 pb-6 md:pb-8 border-b border-[#eeeeee]">
            <div className="space-y-2 md:space-y-3 max-w-3xl text-center md:text-left">
              <span className="section-label">{t("blog.journal")}</span>
              <h1 className="heading-hero">{t("blog.theBlog")}</h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[#333333] font-medium max-w-xs">
                {t("blog.insights")}
              </p>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2 md:gap-3 pt-2 md:pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 py-2 md:px-8 md:py-4 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-[#2e7d32] text-white border-[#2e7d32]"
                    : "bg-white text-[#333333] border-[#eeeeee] hover:border-[#2e7d32] hover:text-[#2e7d32]"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
            <div className="w-full md:w-auto md:flex-grow md:max-w-xs mt-0 relative">
              <input
                type="text"
                placeholder={t("blog.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#eeeeee] rounded-full py-2 md:py-4 px-8 md:px-12 focus:outline-none focus:border-[#2e7d32] text-xs md:text-sm font-medium"
              />
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#333333] opacity-40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="pb-24 md:pb-48 px-6">
        <div
          className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left vertical progress bar - hidden on mobile */}
          <div
            className="relative flex-shrink-0 w-[3px] rounded-full overflow-hidden hidden md:block"
            style={{
              height: "640px",
              backgroundColor: barVisible ? "#eeeeee" : "transparent",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full bg-[#2e7d32] rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
                opacity: barVisible ? 1 : 0,
                transition: barVisible
                  ? "height 0.15s ease, opacity 0.2s ease"
                  : "height 0.15s ease, opacity 0.6s ease",
              }}
            />
          </div>

          {/* Scrollable articles - stack on mobile, scroll on desktop */}
          <div
            ref={listRef}
            onScroll={handleListScroll}
            className="flex-grow overflow-y-auto scrollbar-hide"
            style={{ height: "auto" }}
          >
            {loading ? (
              <div className="py-32 text-center text-[#333333] font-medium">
                {t("blog.loading")}
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => wrapPost(post))
            ) : (
              <div className="py-32 text-center text-[#333333] font-medium">
                {t("blog.noPosts")}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
