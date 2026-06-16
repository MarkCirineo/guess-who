import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Guess Who Online",
  description:
    "Guess Who Online is a free, browser-based multiplayer version of the classic board game. No accounts, no downloads — just create a room and play.",
};

export default function About() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        className="glass animate-slide-in"
        style={{
          padding: "2.5rem",
          maxWidth: "680px",
          width: "100%",
          marginTop: "2rem",
        }}
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

        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            marginBottom: "0.75rem",
          }}
        >
          About Guess Who Online
        </h1>
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

        <Section title="How It Works">
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
        </Section>

        <Section title="Features">
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
              anywhere
            </li>
            <li>
              <strong>No sign-up required</strong> — just pick a name and go
            </li>
            <li>
              <strong>Two game modes</strong> — board-only for voice chat
              players, or built-in turn-based Q&amp;A
            </li>
            <li>
              <strong>Local pass &amp; play</strong> — share a single device
              with a friend
            </li>
            <li>
              <strong>24 unique characters</strong> — each with their own look
              and traits
            </li>
            <li>
              <strong>Instant rematch</strong> — jump right back in after a game
            </li>
          </ul>
        </Section>

        <Section title="Why This Exists" last>
          <p>
            Built as a passion project for fans of the original board game.
            Sometimes you just want to play a quick round of Guess Who with a
            friend without digging through a closet for the physical game — this
            is that.
          </p>
        </Section>
      </div>

      <p
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          color: "hsl(230, 10%, 35%)",
          fontSize: "0.8rem",
        }}
      >
        <Link
          href="/"
          style={{ color: "hsl(230, 10%, 45%)", textDecoration: "none" }}
        >
          Guess Who Online
        </Link>
      </p>
    </main>
  );
}

function Section({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      style={{
        marginBottom: last ? 0 : "1.75rem",
        paddingBottom: last ? 0 : "1.75rem",
        borderBottom: last ? "none" : "1px solid hsl(230, 15%, 20%)",
      }}
    >
      <h2
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "hsl(230, 10%, 65%)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </section>
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
