import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LocalGame from "@/components/LocalGame";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guess Who Pass & Play — Two Players, One Device",
  description:
    "Play Guess Who on a single phone, tablet, or computer. Local Pass & Play mode handles the hand-off between turns so neither player sees the other's board. Free, no sign-up.",
  path: "/local",
});

export default function LocalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Pass & Play", path: "/local" },
        ])}
      />
      <LocalGame />

      {/* Crawlable editorial content below the game */}
      <section className="content-page" style={{ minHeight: "auto" }}>
        <div
          className="content-card glass"
          style={{ padding: "2.5rem", marginTop: "1rem" }}
        >
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            What is Pass &amp; Play?
          </h2>
          <div className="content-section">
            <p>
              Pass &amp; Play is Guess Who for two people sharing one device
              — a phone on a road trip, a tablet on the couch, a laptop in a
              waiting room. Both players use the same screen and simply hand
              the device back and forth between turns.
            </p>
            <p>
              The obvious problem with sharing a screen in a secret-keeping
              game is peeking. The game solves it with a hand-off screen:
              when you end your turn, the board is hidden behind a
              &quot;pass the device to your opponent&quot; prompt, and
              nothing is revealed until the next player taps to continue.
              Each player only ever sees their own board and their own secret
              character.
            </p>
            <div className="portrait-grid">
              {["diana", "ivan", "rosa", "will"].map((id) => (
                <div className="portrait" key={id}>
                  <img
                    src={`/characters/${id}.png`}
                    alt={`${id.charAt(0).toUpperCase() + id.slice(1)}, one of the 24 characters you might be assigned in Pass & Play`}
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.8rem", color: "hsl(230, 10%, 50%)" }}>
              Four of the <Link href="/characters">24 characters</Link> — one
              of them might end up as your secret.
            </p>
          </div>

          <div className="content-section">
            <h2>How a Local Game Works</h2>
            <ol style={{ marginTop: "0.5rem" }}>
              <li>Enter names for Player 1 and Player 2 above.</li>
              <li>
                Each player is secretly assigned one of the{" "}
                <Link href="/characters">24 characters</Link> — the game
                shows it to you privately during your turn.
              </li>
              <li>
                On your turn, ask your opponent a yes-or-no question out
                loud, then tap characters to cross them off your board based
                on the answer.
              </li>
              <li>
                Tap <strong>End Turn</strong>, hand over the device, and the
                pass screen keeps your board private.
              </li>
              <li>
                Think you know their character? Make your final guess — right
                and you win, wrong and you lose. The{" "}
                <Link href="/how-to-play">full rules</Link> apply just like
                the online mode.
              </li>
            </ol>
          </div>

          <div className="content-section">
            <h2>Tips for Playing on One Device</h2>
            <ul style={{ marginTop: "0.5rem" }}>
              <li>
                <strong>Sit across from each other, not side by side</strong>{" "}
                — it makes the hand-off feel like the real board game and
                removes the temptation to glance.
              </li>
              <li>
                <strong>Say your question before passing</strong> — the game
                tracks your eliminations, but questions and answers happen
                out loud, so agree on the answer before the device changes
                hands.
              </li>
              <li>
                <strong>Once the page has loaded, the whole game runs on
                your device</strong> — perfect for flights and dead zones.
              </li>
              <li>
                <strong>Playing with a younger kid?</strong> Let them ask two
                questions per turn as a handicap — more ideas in the{" "}
                <Link href="/blog/guess-who-variations-and-house-rules">
                  house rules article
                </Link>
                .
              </li>
            </ul>
          </div>

          <div
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>Rather Play from Different Places?</h2>
            <p>
              If you each have your own device,{" "}
              <Link href="/">online multiplayer</Link>{" "}
              gives you your own
              private board and a built-in question system — create a room,
              share the 6-letter code, and you&apos;re playing in seconds. No
              accounts either way.
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}
