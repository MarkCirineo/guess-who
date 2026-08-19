import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — Guess Who Online",
  description:
    "Guess Who Online is a free, browser-based multiplayer version of the classic board game, built and maintained by the PlayGuessWho Team as an independent project. No accounts, no downloads.",
  path: "/about",
});

const ABOUT_FAQS = [
  {
    question: "Is Guess Who Online free?",
    answer:
      "Yes, 100% free. No hidden fees, no premium tiers, no in-app purchases. Just play.",
  },
  {
    question: "Do I need to download anything?",
    answer:
      "No. The game runs entirely in your web browser. It works on phones, tablets, and desktop computers — any device with a modern browser.",
  },
  {
    question: "Is this affiliated with Hasbro?",
    answer:
      "No. This is an independent fan project. Guess Who is a trademark of Hasbro, Inc. This site is not affiliated with, endorsed by, or sponsored by Hasbro, and all character artwork is original.",
  },
  {
    question: "Who runs this site?",
    answer:
      "Guess Who Online is built and maintained by the PlayGuessWho Team, an independent project, as part of ArcadeKit — a small collection of free browser games.",
  },
];

export default function About() {
  return (
    <>
      <Header />
      <main className="content-page">
        <JsonLd data={faqJsonLd(ABOUT_FAQS)} />
        <div
          className="content-card glass animate-slide-in"
          style={{ padding: "2.5rem" }}
        >
          <h1>About Guess Who Online</h1>
          <p
            style={{
              color: "hsl(230, 10%, 65%)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            A free, browser-based take on the classic board game you grew up
            with. No apps to install, no accounts to create — just open a
            room, share the code with a friend, and start guessing.
          </p>

          <section className="content-section">
            <h2>Who We Are</h2>
            <p>
              Guess Who Online is an independent project, published under the
              PlayGuessWho Team name. Everything on this site is ours: the
              game engine, the 24 original characters, and the articles on
              the{" "}
              <Link href="/blog">blog</Link>.
            </p>
            <p>
              The project started in May 2026 with a simple problem: we
              wanted to play Guess Who with friends in different cities,
              and every option we found required an app install, an account,
              or both. So we built the version we wanted to use — open a link,
              share a six-letter code, play. The first version shipped in a
              few days; we&apos;ve been improving it ever since, from
              reconnection handling to making games survive server restarts.
            </p>
            <p>
              Today the site is played by hundreds of people every day, which
              still surprises us. It&apos;s part of{" "}
              <a href="https://arcadekit.games" target="_blank" rel="noopener">
                ArcadeKit
              </a>
              , our small collection of free browser games.
            </p>
          </section>

          <section className="content-section">
            <h2>How It Works</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <Step number="1" text="Create a game room and get a unique room code." />
              <Step number="2" text="Share the code with a friend — they join instantly." />
              <Step number="3" text="Each player is secretly assigned a character." />
              <Step number="4" text="Ask questions, eliminate characters, and make your final guess to win." />
            </div>
          </section>

          <section className="content-section">
            <h2>Features</h2>
            <ul
              style={{
                paddingLeft: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <li>
                <strong>Real-time multiplayer</strong> — play with anyone,
                anywhere in the world. Games are connected via WebSocket so
                every move happens instantly with no page reloads or delays.
              </li>
              <li>
                <strong>No sign-up required</strong> — just pick a name and go.
                We don&apos;t ask for an email, password, or any personal
                information. Your display name lives only in your browser
                session.
              </li>
              <li>
                <strong>Two game modes</strong> — use Board Only mode if
                you&apos;re on a voice call together, or the built-in turn-based
                Q&amp;A system that tracks questions and answers for you.
              </li>
              <li>
                <strong>Local pass &amp; play</strong> — share a single device
                and take turns, with a transition screen so neither player
                sees the other&apos;s board.{" "}
                <Link href="/local">Read more about Pass &amp; Play</Link>.
              </li>
              <li>
                <strong>24 original characters</strong> — each with their own
                distinct look, hair color, eye color, accessories, and traits.
                We balanced the roster so that every question is meaningful —
                the <Link href="/characters">characters page</Link> has the
                full breakdown.
              </li>
              <li>
                <strong>Instant rematch</strong> — finished a game? Hit rematch
                and jump right back in without leaving the room. Characters are
                reshuffled each round for a fresh experience.
              </li>
            </ul>
          </section>

          <section className="content-section">
            <h2>How the Site Is Supported</h2>
            <p>
              The game is completely free to play and always will be.
              It&apos;s supported by non-intrusive advertising and the
              occasional generous player who{" "}
              <a
                href="https://buymeacoffee.com/arcadekit"
                target="_blank"
                rel="noopener"
              >
                buys us a coffee
              </a>
              . We use privacy-focused analytics (no cross-site tracking, no
              personal profiles) to understand general usage patterns — the
              details are in the <Link href="/privacy">privacy policy</Link>.
            </p>
          </section>

          <section className="content-section">
            <h2>Frequently Asked Questions</h2>
            {ABOUT_FAQS.map((f, i) => (
              <div key={f.question}>
                <h3 style={{ marginTop: i === 0 ? "0.5rem" : "1rem" }}>
                  {f.question}
                </h3>
                <p>{f.answer}</p>
              </div>
            ))}
            <h3 style={{ marginTop: "1rem" }}>How can I get in touch?</h3>
            <p>
              Visit the <Link href="/contact">contact page</Link> to send us
              feedback, report bugs, or suggest features — we read every
              message.
            </p>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
      <div
        style={{
          width: "1.75rem",
          height: "1.75rem",
          borderRadius: "50%",
          background: "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
          fontWeight: 800,
          color: "white",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <p style={{ margin: 0, paddingTop: "0.15rem" }}>{text}</p>
    </div>
  );
}
