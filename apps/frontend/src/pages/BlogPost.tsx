import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getBlogPost, type BlogPost } from "../services/api";
import { useTranslation } from "@repo/ui";
import { Helmet } from "react-helmet-async";

export default function BlogPostPage() {
  const { t, locale } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBlogPost(slug)
      .then(setPost)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow pt-48 pb-32 px-6">
          <div className="max-w-3xl mx-auto text-center text-[#333333] font-medium">
            {t("blogPost.loading")}
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow pt-48 pb-32 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-[#333333] font-medium">
              {t("blogPost.notFound")}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#2e7d32] font-bold hover:underline"
            >
              <ArrowLeft size={18} /> {t("blogPost.backToBlog")}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>{post.title} - Tiani Pekins</title>
        <meta name="description" content={post.excerpt || `Read ${post.title} by Tiani Pekins.`} />
        <link rel="canonical" href={`https://tianipekins.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} - Tiani Pekins`} />
        <meta property="og:description" content={post.excerpt || `Read ${post.title} by Tiani Pekins.`} />
        <meta property="og:url" content={`https://tianipekins.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.thumbnail || "https://tianipekins.com/og-image.svg"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - Tiani Pekins`} />
        <meta name="twitter:description" content={post.excerpt || `Read ${post.title} by Tiani Pekins.`} />
        <meta name="twitter:image" content={post.thumbnail || "https://tianipekins.com/og-image.svg"} />
      </Helmet>

      <main className="flex-grow pt-48 pb-32 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#333333] hover:text-[#2e7d32] transition-colors mb-12"
          >
            <ArrowLeft size={16} /> {t("blogPost.backToBlog")}
          </Link>

          <header className="space-y-6 mb-16">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <span className="text-[#2e7d32]">{post.category}</span>
              <span className="text-[#333333]">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(locale, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "-"}
              </span>
            </div>
            <h1 className="heading-hero !text-3xl md:!text-4xl lg:!text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-[#333333] text-lg font-medium">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-3 text-sm font-medium text-[#333333]">
              <span>{t("blogPost.by")} {post.author.name}</span>
              {post.tags.length > 0 && (
                <>
                  <span className="text-[#333333]">·</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider bg-[#fafafa] text-[#1a1a1c] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </header>

          {post.externalUrl ? (
            <div className="space-y-8">
              <div className="bg-[#fafafa] border border-[#eeeeee] rounded-2xl p-8 text-center space-y-4">
                <p className="text-[#333333] font-medium">
                  {t("blogPost.external")}
                </p>
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2e7d32] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  {t("blogPost.readFull")} <ExternalLink size={18} />
                </a>
              </div>
              {(post.content ?? "").split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="text-[#333333] mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {(post.content ?? "").split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="text-[#333333] mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
