import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeActions from "@/components/HomeActions";
import JsonLd from "@/components/JsonLd";
import { blogPosts, SHIP_DATE } from "@/lib/blog";
import { characters } from "@/lib/characters";
import { pageMetadata, websiteJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guess Who Online — Play the Classic Board Game Free with Friends",
  description:
    "Play Guess Who online free with friends. Real-time multiplayer with room codes, 24 original characters, and no downloads or sign-ups. Create a room and start guessing in seconds.",
  path: "/",
});

const HOMEPAGE_FAQS = [
  {
    question: "Is Guess Who Online really free?",
    answer:
      "Yes — completely free, with no hidden fees, premium tiers, or in-app purchases. Pick a name, create a room, and play.",
  },
  {
    question: "Do I need to create an account or download anything?",
    answer:
      "No. The game runs entirely in your web browser on phones, tablets, and desktops. There are no accounts, no email sign-ups, and no app downloads.",
  },
  {
    question: "How do I play with a friend who lives far away?",
    answer:
      "Click Create Game, enter your name, and you'll get a 6-letter room code. Send that code to your friend — they enter it under Join Game and connect instantly to your room.",
  },
  {
    question: "Can we play on one device?",
    answer:
      "Yes. Local Pass & Play mode lets two players share a single phone or tablet. The game shows a hand-off screen between turns so neither player sees the other's board.",
  },
  {
    question: "How many players can join a game?",
    answer:
      "Guess Who is a head-to-head deduction game, so each room supports exactly two players — the same as the original board game.",
  },
  {
    question: "Is this the official Hasbro game?",
    answer:
      "No. This is an independent fan project with original character artwork. Guess Who is a trademark of Hasbro, Inc., and this site is not affiliated with, endorsed by, or sponsored by Hasbro.",
  },
];

// A sample of the roster for the homepage gallery (full set on /characters).
const GALLERY_IDS = [
  "bella", "carlos", "diana", "george", "hannah", "ivan",
  "luna", "marco", "nina", "oscar", "penny", "xena",
];

/** Formats SHIP_DATE as e.g. "August 17, 2026" for the changelog. */
function shipDateLabel(): string {
  return new Date(`${SHIP_DATE}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const UPDATES: { date: string; text: string }[] = [
  {
    date: shipDateLabel(),
    text: "Site refresh: a new characters guide, header navigation, bylines and images across the blog, and two new articles.",
  },
  {
    date: "July 13, 2026",
    text: "Launched the blog with five strategy and history articles.",
  },
  {
    date: "June 19, 2026",
    text: "Games now survive server restarts — rooms are persisted so a deploy no longer ends your match.",
  },
  {
    date: "May 2026",
    text: "Guess Who Online launched with real-time multiplayer, room codes, and 24 original characters.",
  },
];

export default function Home() {
  const galleryCharacters = GALLERY_IDS.map(
    (id) => characters.find((c) => c.id === id)!
  );

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <JsonLd data={[websiteJsonLd(), faqJsonLd(HOMEPAGE_FAQS)]} />

        {/* Hero */}
        <div
          className="animate-slide-in"
          style={{ textAlign: "center", marginBottom: "3rem", marginTop: "1rem" }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>🎭</div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              background:
                "linear-gradient(135deg, hsl(220, 83%, 68%), hsl(199, 89%, 58%), hsl(45, 93%, 58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Guess Who
            <br />
            Online
          </h1>
          <p
            style={{
              color: "hsl(230, 10%, 60%)",
              fontSize: "1.1rem",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            The classic board game, now playable with friends anywhere.
          </p>
        </div>

        {/* Interactive create/join card */}
        <HomeActions />

        {/* Content Sections — crawlable text */}
        <div
          className="animate-slide-in"
          style={{
            maxWidth: "680px",
            width: "100%",
            marginTop: "3rem",
            animationDelay: "0.2s",
          }}
        >
          {/* What is Guess Who Online */}
          <section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              What is Guess Who Online?
            </h2>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Guess Who Online is a free, browser-based version of the classic
              two-player deduction game. Each player is secretly assigned one
              of 24 original characters. Take turns asking yes-or-no questions
              — &quot;Do they wear glasses?&quot;, &quot;Do they have red
              hair?&quot; — to narrow down the board and be the first to guess
              your opponent&apos;s character. Play with friends in real time
              using a simple room code, or share one device in Pass &amp; Play
              mode. No downloads, no sign-ups, no hassle.
            </p>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0.75rem auto 0",
              }}
            >
              We built this site because we kept wanting to play Guess Who
              with friends in different cities, and every option we tried
              needed an app install or an account. This one needs neither:
              open the page, share a code, start guessing. Hundreds of games
              are now played here every day.
            </p>
          </section>

          {/* How It Works */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              How It Works
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
              }}
            >
              <StepCard emoji="🎲" title="Create a Room" desc="Click Create Game and get a unique room code to share with your friend." />
              <StepCard emoji="🔗" title="Share the Code" desc="Your friend enters the code to join instantly — no accounts needed." />
              <StepCard emoji="🎭" title="Start Guessing" desc="Ask questions, eliminate characters, and race to guess first!" />
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: "1rem",
                fontSize: "0.85rem",
              }}
            >
              <Link
                href="/how-to-play"
                style={{ color: "hsl(220, 83%, 68%)", textDecoration: "none" }}
              >
                Read the full rules &amp; strategy guide →
              </Link>
            </p>
          </section>

          {/* Meet the characters */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                textAlign: "center",
              }}
            >
              Meet the Characters
            </h2>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto 0.5rem",
                textAlign: "center",
              }}
            >
              Every game uses the same board of 24 original characters — from
              Bella and her earrings to George and his gray beard. Each one
              has a unique mix of hair color, eye color, glasses, hats,
              facial hair, and accessories, and the whole roster is balanced
              so that good questions always split the board in a meaningful
              way. Here are twelve of them:
            </p>
            <div className="portrait-grid">
              {galleryCharacters.map((c) => (
                <div className="portrait" key={c.id}>
                  <img
                    src={c.avatar}
                    alt={`${c.name}, one of the 24 original Guess Who Online characters`}
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: "0.85rem" }}>
              <Link
                href="/characters"
                style={{ color: "hsl(220, 83%, 68%)", textDecoration: "none" }}
              >
                See all 24 characters &amp; their traits →
              </Link>
            </p>
          </section>

          {/* Strategy taste */}
          <section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              There&apos;s Real Strategy Here
            </h2>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Guess Who looks like a kids&apos; game, but playing it well is a
              small exercise in information theory. The best question is the
              one that splits the remaining characters closest to
              half-and-half — on our board, &quot;Do they look feminine?&quot;
              splits the 24 characters a perfect 12–12, while &quot;Do they
              wear a bowtie?&quot; hits only 2 of 24 and usually wastes a
              turn. Play perfectly and you can find any character in about
              five questions. If you want to go deeper, we&apos;ve written up{" "}
              <Link href="/blog/best-questions-to-ask-in-guess-who" style={{ color: "hsl(220, 83%, 68%)" }}>
                a ranking of every question
              </Link>{" "}
              based on the actual character data, and{" "}
              <Link href="/blog/how-to-win-at-guess-who" style={{ color: "hsl(220, 83%, 68%)" }}>
                a full strategy guide
              </Link>
              .
            </p>
          </section>

          {/* Modes comparison */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
                textAlign: "center",
              }}
            >
              Two Ways to Play
            </h2>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto 0.75rem",
                textAlign: "center",
              }}
            >
              <strong style={{ color: "hsl(0, 0%, 85%)" }}>Online multiplayer</strong>{" "}
              is for friends in different places: each player gets their own
              private board, and you can either talk over a voice call in
              Board Only mode or use the built-in turn-based question system,
              which tracks every question and answer for you. Games
              reconnect automatically if someone&apos;s connection drops, and
              rooms survive even server restarts.
            </p>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <strong style={{ color: "hsl(0, 0%, 85%)" }}>
                <Link href="/local" style={{ color: "inherit" }}>
                  Pass &amp; Play
                </Link>
              </strong>{" "}
              is for two people sharing one device — a phone on a road trip,
              a tablet on the couch. A hand-off screen hides the board
              between turns so nobody can peek, and once the page has
              loaded, the whole game runs on your device.
            </p>
          </section>

          {/* Features */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Features
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "0.75rem",
              }}
            >
              <FeatureItem emoji="⚡" text="Real-time multiplayer — play with anyone, anywhere in the world" />
              <FeatureItem emoji="🙅" text="No sign-up required — just pick a name and start playing" />
              <FeatureItem emoji="🎮" text="Two game modes — online multiplayer or local pass & play on one device" />
              <FeatureItem emoji="👥" text="24 original characters — each with their own look and traits" />
              <FeatureItem emoji="💬" text="Built-in Q&A system — or use Board Only mode with voice chat" />
              <FeatureItem emoji="🔄" text="Instant rematch — jump right back in after every game" />
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {HOMEPAGE_FAQS.map((f) => (
                <div key={f.question}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                    {f.question}
                  </h3>
                  <p
                    style={{
                      color: "hsl(230, 10%, 60%)",
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent updates */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Recent Updates
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {UPDATES.map((u) => (
                <div
                  key={u.date + u.text}
                  style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: "hsl(230, 10%, 45%)",
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      paddingTop: "0.1rem",
                      minWidth: "6.5rem",
                    }}
                  >
                    {u.date}
                  </span>
                  <span
                    style={{
                      color: "hsl(230, 10%, 60%)",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {u.text}
                  </span>
                </div>
              ))}
            </div>
            <p
              style={{
                color: "hsl(230, 10%, 50%)",
                fontSize: "0.8rem",
                textAlign: "center",
                marginTop: "0.9rem",
                lineHeight: 1.6,
              }}
            >
              The game is actively maintained — bug reports and feature ideas
              are always welcome via the{" "}
              <Link href="/contact" style={{ color: "hsl(220, 83%, 68%)" }}>
                contact page
              </Link>
              .
            </p>
          </section>

          {/* About the team */}
          <section style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Who Made This?
            </h2>
            <p
              style={{
                color: "hsl(230, 10%, 60%)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto",
              }}
            >
              Guess Who Online is an independent project, published under
              the PlayGuessWho Team name. It grew out of those little plastic
              frames and a wish to keep playing with friends who moved away.
              The 24 original characters, the real-time multiplayer engine,
              and the site itself are all ours, and it runs as part of{" "}
              <a
                href="https://arcadekit.games"
                target="_blank"
                rel="noopener"
                style={{ color: "hsl(220, 83%, 68%)" }}
              >
                ArcadeKit
              </a>
              , a small collection of free browser games.{" "}
              <Link href="/about" style={{ color: "hsl(220, 83%, 68%)" }}>
                More about the project →
              </Link>
            </p>
          </section>

          {/* From the Blog */}
          <section style={{ marginTop: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              From the Blog
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {blogPosts.slice(0, 3).map((post) => (
                <BlogLink
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  title={post.title}
                  desc={post.description}
                />
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                marginTop: "0.75rem",
                fontSize: "0.8rem",
              }}
            >
              <Link
                href="/blog"
                style={{ color: "hsl(220, 83%, 68%)", textDecoration: "none" }}
              >
                View all articles →
              </Link>
            </p>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}

function StepCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="glass"
      style={{
        padding: "1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{emoji}</div>
      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.35rem" }}>
        {title}
      </h3>
      <p style={{ color: "hsl(230, 10%, 55%)", fontSize: "0.8rem", lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}

function FeatureItem({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.6rem",
        padding: "0.5rem 0",
      }}
    >
      <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{emoji}</span>
      <span style={{ color: "hsl(230, 10%, 60%)", fontSize: "0.85rem", lineHeight: 1.6 }}>
        {text}
      </span>
    </div>
  );
}

function BlogLink({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        background: "hsla(220, 83%, 58%, 0.04)",
        border: "1px solid hsla(220, 83%, 58%, 0.08)",
        textDecoration: "none",
        color: "inherit",
        transition: "border-color 0.2s ease, background 0.2s ease",
      }}
    >
      <span style={{ fontSize: "0.85rem", fontWeight: 600, display: "block" }}>
        {title}
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          color: "hsl(230, 10%, 50%)",
          display: "block",
          marginTop: "0.15rem",
        }}
      >
        {desc}
      </span>
    </Link>
  );
}
