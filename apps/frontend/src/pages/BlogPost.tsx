import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getBlogPost, type BlogPost } from "../services/api";

export default function BlogPostPage() {
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
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-48 pb-32 px-6">
          <div className="max-w-3xl mx-auto text-center text-text-secondary font-medium opacity-50">
            Loading post...
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow pt-48 pb-32 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="text-text-secondary font-medium opacity-50">
              Post not found.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              <ArrowLeft size={18} /> Back to blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-48 pb-32 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={16} /> Back to blog
          </Link>

          <header className="space-y-6 mb-16">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <span className="text-primary">{post.category}</span>
              <span className="text-text-secondary opacity-40">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
            <h1 className="heading-hero !text-3xl md:!text-4xl lg:!text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-body text-lg font-medium">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-3 text-sm font-medium text-text-secondary">
              <span>By {post.author.name}</span>
              {post.tags.length > 0 && (
                <>
                  <span className="opacity-30">·</span>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider bg-bg-secondary px-3 py-1 rounded-full"
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
              <div className="bg-bg-secondary border border-border-subtle rounded-2xl p-8 text-center space-y-4">
                <p className="text-body font-medium">
                  This article is published on an external platform.
                </p>
                <a
                  href={post.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  Read full article <ExternalLink size={18} />
                </a>
              </div>
              {(post.content ?? "").split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="text-body mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {(post.content ?? "").split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="text-body mb-6 leading-relaxed">
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
