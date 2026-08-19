import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Guess Who Online",
  description:
    "Get in touch with the PlayGuessWho Team, the developers of Guess Who Online. Send feedback, bug reports, or feature suggestions.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
    <Header />
    <main className="content-page">
      <div className="content-card glass animate-slide-in" style={{ padding: "2.5rem" }}>
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

        <h1>Get in Touch</h1>

        <p style={{ marginBottom: "1.75rem" }}>
          Guess Who Online is a small independent project — we&apos;re the
          PlayGuessWho Team, the developers, and we read every message.
          Whether you&apos;ve found a bug, have an idea for a new feature, or
          just want to say hello&nbsp;— we&apos;d love to hear from you.
        </p>

        {/* Prominent email card */}
        <div
          style={{
            background: "hsla(220, 83%, 58%, 0.08)",
            border: "1px solid hsla(220, 83%, 58%, 0.2)",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            textAlign: "center",
            marginBottom: "1.75rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "hsl(230, 10%, 55%)",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}
          >
            Email Us
          </p>
          <a
            href="mailto:contact@playguesswho.net"
            style={{
              color: "hsl(220, 83%, 68%)",
              fontSize: "1.2rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            contact@playguesswho.net
          </a>
          <p
            style={{
              fontSize: "0.8rem",
              color: "hsl(230, 10%, 50%)",
              marginTop: "0.75rem",
            }}
          >
            We typically respond within a few business days.
          </p>
        </div>

        <section className="content-section">
          <h2>Common Questions</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3>How do I report a bug?</h3>
              <p>
                Send us an email with a brief description of what happened, what
                you expected to happen, and&nbsp;— if possible&nbsp;— which
                browser you were using. Screenshots help too!
              </p>
            </div>

            <div>
              <h3>Can I suggest a feature?</h3>
              <p>
                Absolutely! We love hearing ideas from players. Drop us a line
                and let us know what you&apos;d like to see.
              </p>
            </div>

            <div>
              <h3>Is the game free?</h3>
              <p>
                Yes, completely free. No accounts, no downloads, no hidden
                costs&nbsp;— just open the site and play.
              </p>
            </div>

            <div>
              <h3>How does the game make money?</h3>
              <p>
                The site is free and always will be. It&apos;s supported by
                non-intrusive advertising and by the occasional generous
                player who buys us a coffee&nbsp;— no paywalls, no premium
                tiers.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <p>
            For privacy-related inquiries, please see our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </section>
      </div>
      <Footer />
    </main>
    </>
  );
}
