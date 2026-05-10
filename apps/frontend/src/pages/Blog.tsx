import { motion } from "motion/react";
import { ArrowRight, Search } from "lucide-react";

export default function Blog() {
  const categories = ["All", "Software", "Tech", "Life", "Programming"];
  const posts = [
    {
      title: "Building for the Next Billion Users: A Cameroonian Perspective",
      date: "MAY 26, 2026",
      category: "Software",
      readTime: "8 min read",
    },
    {
      title: "The Power of Local Ecosystems in Tech Adoption",
      date: "APR 15, 2026",
      category: "Tech",
      readTime: "5 min read",
    },
    {
      title: "Scaling LocalHands: Lessons from the Ground Up",
      date: "MAR 10, 2026",
      category: "Software",
      readTime: "12 min read",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Blog Hero */}
      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header-like Section Title */}
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
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-full border transition-all ${i === 0 ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-border-subtle hover:border-primary hover:text-primary"}`}
              >
                {cat}
              </button>
            ))}
            <div className="flex-grow md:max-w-xs ml-auto relative">
              <input
                type="text"
                placeholder="Search articles..."
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
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative py-16 md:py-20 border-b border-border-subtle hover:bg-primary/5 transition-colors duration-700 cursor-pointer"
            >
              <div className="grid md:grid-cols-12 gap-12 items-center relative z-10 px-6">
                <div className="md:col-span-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary italic opacity-60">
                  {post.date}
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

              {/* Background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
