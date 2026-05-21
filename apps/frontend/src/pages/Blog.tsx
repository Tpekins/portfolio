import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Search } from "lucide-react";

const POSTS = [
  {
    title:
      "Engineering Trust in the African Gig Economy: A Data-Driven Approach to Service Exchange Platforms",
    category: "Software",
    readTime: "8 min read",
    url: "https://medium.com/@TianiPekinsEbika/engineering-trust-in-the-african-gig-economy-a-data-driven-approach-to-service-exchange-platforms-0b27b40ad9a2",
  },
  {
    title:
      "Architecting Digital Trust: A Relational Deep Dive into the LocalHands Prisma Schema",
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

async function fetchPublishDate(url: string): Promise<string> {
  try {
    if (url.includes("medium.com")) {
      const match = url.match(/medium\.com\/@([^/]+)/);
      if (!match) return "";
      const username = match[1];
      const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;
      const res = await fetch(rssUrl);
      const data = await res.json();
      const slug = url.split("/").pop();
      const item = data.items?.find((i: { link: string }) =>
        i.link.includes(slug ?? ""),
      );
      if (item?.pubDate) {
        return new Date(item.pubDate)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
          .toUpperCase();
      }
    } else if (url.includes("dev.to")) {
      const match = url.match(/dev\.to\/([^/]+)\/([^/]+)/);
      if (!match) return "";
      const res = await fetch(
        `https://dev.to/api/articles/${match[1]}/${match[2]}`,
      );
      const data = await res.json();
      if (data.published_at) {
        return new Date(data.published_at)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
          .toUpperCase();
      }
    }
  } catch {
    return "";
  }
  return "";
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [dates, setDates] = useState<string[]>(POSTS.map(() => "Loading..."));

  useEffect(() => {
    Promise.all(POSTS.map((post) => fetchPublishDate(post.url))).then(
      (fetchedDates) => {
        setDates(fetchedDates.map((d) => d || "—"));
      },
    );
  }, []);

  const filteredPosts = POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
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
            filteredPosts.map((post, i) => (
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
                    {dates[POSTS.indexOf(post)]}
                  </div>
                  <div className="md:col-span-1 text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary opacity-40">
                    {post.category}
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="section-title !text-2xl md:!text-3xl lg:!text-4xl group-hover:text-primary transition-colors duration-500">
                      {post.title}
                    </h3>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl shadow-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.div>
            ))
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
