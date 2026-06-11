import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { getBlogPosts, type BlogPost } from "../services/api";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative py-16 md:py-20 border-b border-border-subtle hover:bg-primary/5 transition-colors duration-700 cursor-pointer"
    >
      <div className="grid md:grid-cols-12 gap-12 items-center relative z-10 px-6">
        <div className="md:col-span-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary italic opacity-60">
          {formatDate(post.publishedAt)}
        </div>
        <div className="md:col-span-1 text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-40">
          {post.category}
        </div>
        <div className="md:col-span-7">
          <h3 className="section-title !text-2xl md:!text-3xl lg:!text-4xl group-hover:text-primary transition-colors duration-500">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-4 text-body text-sm font-medium line-clamp-2">
              {post.excerpt}
            </p>
          )}
          {post.externalUrl && (
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary opacity-40 hover:opacity-100 transition-opacity"
            >
              Read on {getPlatformLabel(post.externalUrl)}{" "}
              <ExternalLink size={10} />
            </a>
          )}
        </div>
        <div className="md:col-span-2 flex justify-end">
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </motion.div>
  );
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

export default function Blog() {
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

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt?.toLowerCase() ?? "").includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show bar only when hovering AND scrolling
  const barVisible = isHovered && isScrolling;

  return (
    <div className="flex flex-col">
      {/* Blog Hero */}
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 pb-8 border-b border-border-subtle">
            <div className="space-y-3 max-w-3xl">
              <span className="section-label">The Journal</span>
              <h1 className="heading-hero">The Blog</h1>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-body font-medium max-w-xs">
                Insights and engineering thoughts.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-text-secondary border-border-subtle hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="flex-grow md:max-w-xs ml-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-border-subtle rounded-full py-4 px-12 focus:outline-none focus:border-primary text-sm font-medium"
              />
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary opacity-40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="pb-48 px-6">
        <div
          className="max-w-7xl mx-auto flex gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left vertical progress bar — only on hover + scroll */}
          <div
            className="relative flex-shrink-0 w-[3px] rounded-full overflow-hidden"
            style={{
              height: "960px",
              backgroundColor: barVisible ? "#eeeeee" : "transparent",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full bg-primary rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
                opacity: barVisible ? 1 : 0,
                transition: barVisible
                  ? "height 0.15s ease, opacity 0.2s ease"
                  : "height 0.15s ease, opacity 0.6s ease",
              }}
            />
          </div>

          {/* Scrollable articles — 4 visible at a time */}
          <div
            ref={listRef}
            onScroll={handleListScroll}
            className="flex-grow overflow-y-auto scrollbar-hide"
            style={{ height: "1400px" }}
          >
            {loading ? (
              <div className="py-32 text-center text-text-secondary font-medium opacity-50">
                Loading posts...
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => wrapPost(post))
            ) : (
              <div className="py-32 text-center text-text-secondary font-medium opacity-50">
                No posts found.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
