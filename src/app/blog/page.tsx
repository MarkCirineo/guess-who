import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostsNewestFirst } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Guess Who Online",
  description:
    "Strategy guides, probability analysis, and history — articles about Guess Who and online board games, written by the team behind Guess Who Online.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main className="content-page">
        <div
          className="content-card glass animate-slide-in"
          style={{ padding: "2.5rem" }}
        >
          <h1>Blog</h1>
          <p
            style={{
              color: "hsl(230, 10%, 65%)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "0.75rem",
            }}
          >
            Articles about Guess Who and online board games, written by the
            team that builds this site. Because we built the game and designed
            its 24 characters, the strategy pieces here are based on the
            actual character data, not guesswork: real trait distributions,
            real split percentages, and lessons from watching hundreds of
            games get played every day. Our{" "}
            <Link
              href="/editorial-policy"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              editorial policy
            </Link>{" "}
            explains how we source and check all of it.
          </p>
          <p
            style={{
              color: "hsl(230, 10%, 55%)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Start with the{" "}
            <Link
              href="/blog/best-questions-to-ask-in-guess-who"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              question rankings
            </Link>{" "}
            if you want to win more, or the{" "}
            <Link
              href="/blog/math-of-the-perfect-question"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              information-theory breakdown
            </Link>{" "}
            if you want to know why those questions work.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {getPostsNewestFirst().map((post) => (
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
                      flexWrap: "wrap",
                    }}
                  >
                    <time
                      dateTime={post.date}
                      style={{
                        fontSize: "0.75rem",
                        color: "hsl(230, 10%, 45%)",
                      }}
                    >
                      {formatDate(post.date)}
                    </time>
                    {post.updated && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "hsl(230, 10%, 45%)",
                        }}
                      >
                        · updated {formatDate(post.updated)}
                      </span>
                    )}
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
    </>
  );
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
