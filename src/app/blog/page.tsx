import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Guess Who Online",
  description:
    "Tips, strategy guides, and articles about Guess Who and online board games. Learn how to win, discover game variations, and explore the history of the classic board game.",
};

export default function BlogIndex() {
  return (
    <main className="content-page">
      <div
        className="content-card glass animate-slide-in"
        style={{ padding: "2.5rem" }}
      >
        <Link
          href="/"
          style={{
            color: "hsl(220, 83%, 68%)",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            marginBottom: "1.5rem",
          }}
        >
          ← Back to Home
        </Link>

        <h1>Blog</h1>
        <p
          style={{
            color: "hsl(230, 10%, 65%)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          Strategy tips, game guides, and everything you need to know about
          Guess Who — from beginner fundamentals to advanced winning strategies.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                className="glass"
                style={{
                  padding: "1.5rem",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <time
                    style={{
                      fontSize: "0.75rem",
                      color: "hsl(230, 10%, 45%)",
                    }}
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: "hsl(220, 83%, 68%)",
                      background: "hsla(220, 83%, 68%, 0.1)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                    }}
                  >
                    {post.readTime}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "0.35rem",
                    lineHeight: 1.3,
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    color: "hsl(230, 10%, 55%)",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {post.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
