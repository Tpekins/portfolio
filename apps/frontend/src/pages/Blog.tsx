import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search, ExternalLink } from "lucide-react";

const POSTS = [
  {
    title: "Engineering Trust in the African Gig Economy: A Data-Driven Approach to Service Exchange Platforms",
    category: "Software",
    readTime: "8 min read",
    url: "https://medium.com/@TianiPekinsEbika/engineering-trust-in-the-african-gig-economy-a-data-driven-approach-to-service-exchange-platforms-0b27b40ad9a2",
  },
  {
    title: "Architecting Digital Trust: A Relational Deep Dive into the LocalHands Prisma Schema",
    category: "Tech",
    readTime: "5 min read",
    url: "https://dev.to/tianipekinsebika/architecting-digital-trust-a-relational-deep-dive-into-the-localhands-prisma-schema-12dk",
  },
  {
    title: "Why I Built LocalHands: The Problem Behind the Platform",
    category: "Software",
    readTime: "12 min read",
    url: "https://medium.com/@TianiPekinsEbika/why-i-built-localhands-the-problem-behind-the-platform-9f3c4ed0a00a",
  },
];

const CATEGORIES = ["All", "Software", "Tech", "Life", "Programming"];

// Detect platform name from any URL — add new platforms here as needed
function getPlatformLabel(url: string): string {
  if (url.includes("medium.com")) return "Medium";
  if (url.includes("dev.to")) return "Dev.to";
  if (url.includes("quora.com")) return "Quora";
  if (url.includes("reddit.com")) return "Reddit";
  if (url.includes("ssrn.com")) return "SSRN";
  if (url.includes("hashnode.com")) return "Hashnode";
  if (url.includes("substack.com")) return "Substack";
  const host = new URL(url).hostname.replace("www.", "");
  return host.charAt(0).toUpperCase() + host.slice(1);
}

// Races a fetch against a 3s timeout — never hangs forever
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);
}

type PostMeta = {
  date: string;
  platform: string;
};

// Fallback dates keyed by URL slug — shown if API times out or fails
const FALLBACK_DATES: Record<string, string> = {
  "0b27b40ad9a2": "2025",
  "12dk": "MAY 2025",
  "9f3c4ed0a00a": "MAR 10, 2026",
};

function getFallbackDate(url: string): string {
  for (const [slug, date] of Object.entries(FALLBACK_DATES)) {
    if (url.includes(slug)) return date;
  }
  return "—";
}

async function fetchPostMeta(url: string): Promise<PostMeta> {
  const platform = getPlatformLabel(url);

  if (url.includes("dev.to")) {
    try {
      const match = url.match(/dev\.to\/([^/]+)\/([^/]+)/);
      if (!match) throw new Error("no match");
      const res = await withTimeout(
        fetch(`https://dev.to/api/articles/${match[1]}/${match[2]}`),
        3000
      );
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      const date = data.published_at
        ? new Date(data.published_at)
            .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            .toUpperCase()
        : getFallbackDate(url);
      return { date, platform };
    } catch {
      return { date: getFallbackDate(url), platform };
    }
  }

  if (url.includes("medium.com")) {
    try {
      const match = url.match(/medium\.com\/@([^/]+)/);
      if (!match) throw new Error("no match");
      const username = match[1];
      const slug = url.split("/").pop() ?? "";
      const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
      const res = await withTimeout(fetch(rssUrl), 3000);
      const data = await res.json();
      const item = data.items?.find((i: { link: string }) => i.link.includes(slug));
      const date = item?.pubDate
        ? new Date(item.pubDate)
            .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
            .toUpperCase()
        : getFallbackDate(url);
      return { date, platform };
    } catch {
      return { date: getFallbackDate(url), platform };
    }
  }

  // Any other platform — just show fallback date, platform label still works
  return { date: getFallbackDate(url), platform };
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [postMeta, setPostMeta] = useState<PostMeta[]>(
    POSTS.map((p) => ({ date: "Loading...", platform: getPlatformLabel(p.url) }))
  );

  useEffect(() => {
    Promise.all(POSTS.map((post) => fetchPostMeta(post.url))).then(setPostMeta);
  }, []);

  const filteredPosts = POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
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

      {/* Post List */}
      <section className="pb-48 px-6">
        <div className="max-w-7xl mx-auto space-y-px">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => {
              const realIndex = POSTS.indexOf(post);
              const meta = postMeta[realIndex];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative py-16 md:py-20 border-b border-border-subtle hover:bg-primary/5 transition-colors duration-700 cursor-pointer"
                  onClick={() => window.open(post.url, "_blank")}
                >
                  <div className="grid md:grid-cols-12 gap-12 items-center relative z-10 px-6">
                    <div className="md:col-span-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary italic opacity-60">
                      {meta.date}
                    </div>
                    <div className="md:col-span-1 text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-40">
                      {post.category}
                    </div>
                    <div className="md:col-span-7">
                      <h3 className="section-title !text-2xl md:!text-3xl lg:!text-4xl group-hover:text-primary transition-colors duration-500">
                        {post.title}
                      </h3>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary opacity-40 hover:opacity-100 transition-opacity"
                      >
                        Read on {meta.platform} <ExternalLink size={10} />
                      </a>
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
            })
          ) : (
            <div className="py-32 text-center text-text-secondary font-medium opacity-50">
              No posts found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
