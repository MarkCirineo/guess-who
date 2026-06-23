import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Guess Who Online",
  description:
    "Guess Who Online is a free, browser-based multiplayer version of the classic board game. No accounts, no downloads — just create a room and play.",
};

export default function About() {
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

        <h1>About Guess Who Online</h1>
        <p
          style={{
            color: "hsl(230, 10%, 65%)",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          A free, browser-based take on the classic board game you grew up with.
          No apps to install, no accounts to create — just open a room, share
          the code with a friend, and start guessing.
        </p>

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
              <strong>Local pass &amp; play</strong> — no internet? No problem.
              Share a single device with a friend and take turns, with a
              transition screen so neither player sees the other&apos;s board.
            </li>
            <li>
              <strong>24 unique characters</strong> — each with their own
              distinct look, hair color, eye color, accessories, and traits.
              The character set is carefully designed so that every question
              is meaningful and can help narrow down the board.
            </li>
            <li>
              <strong>Instant rematch</strong> — finished a game? Hit rematch
              and jump right back in without leaving the room. Characters are
              reshuffled each round for a fresh experience.
            </li>
          </ul>
        </section>

        <section className="content-section">
          <h2>Why This Exists</h2>
          <p>
            Built as a passion project for fans of the original board game.
            Sometimes you just want to play a quick round of Guess Who with a
            friend without digging through a closet for the physical game — this
            is that.
          </p>
          <p>
            The idea came from wanting a simple way to play with friends who
            live far away. Most online board game sites require accounts,
            downloads, or are loaded with ads that make the experience
            frustrating. This project aims to be the opposite: open a link,
            share a code, and play. That&apos;s it.
          </p>
          <p>
            The game is completely free to play. It&apos;s supported by
            non-intrusive advertising through Google AdSense, and uses
            privacy-focused analytics to understand general usage patterns
            without tracking individual users.
          </p>
        </section>

        <section className="content-section">
          <h2>Frequently Asked Questions</h2>

          <h3 style={{ marginTop: "0.5rem" }}>Is Guess Who Online free?</h3>
          <p>
            Yes, 100% free. No hidden fees, no premium tiers, no in-app
            purchases. Just play.
          </p>

          <h3 style={{ marginTop: "1rem" }}>Do I need to download anything?</h3>
          <p>
            Nope. The game runs entirely in your web browser. It works on
            phones, tablets, and desktop computers — any device with a modern
            browser.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            Is this affiliated with Hasbro?
          </h3>
          <p>
            No. This is an independent fan project. Guess Who is a trademark of
            Hasbro, Inc. This site is not affiliated with, endorsed by, or
            sponsored by Hasbro.
          </p>

          <h3 style={{ marginTop: "1rem" }}>How can I get in touch?</h3>
          <p>
            Visit the{" "}
            <Link href="/contact">contact page</Link> to send us feedback,
            report bugs, or suggest features.
          </p>
        </section>
      </div>

      <Footer />
    </main>
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
