import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Editorial Policy — Guess Who Online",
  description:
    "How we research, write, and correct the content on Guess Who Online: where our game statistics come from, how our strategy math is verified, and how we keep advertising separate from editorial.",
  path: "/editorial-policy",
});

export default function EditorialPolicy() {
  return (
    <>
      <Header />
      <main className="content-page">
        <div
          className="content-card glass animate-slide-in"
          style={{ padding: "2.5rem" }}
        >
          <h1>Editorial Policy</h1>
          <p
            style={{
              color: "hsl(230, 10%, 65%)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "2rem",
            }}
          >
            Everything published on Guess Who Online is written by the
            PlayGuessWho Team — we build and run the game ourselves. This
            page explains where our numbers come from, how we check them, and
            what we do when we get something wrong.
          </p>

          <section className="content-section">
            <h2>Our Commitment to Accuracy</h2>
            <p>
              Most Guess Who strategy advice online is written by people
              guessing at a board they don&apos;t have data for. Ours
              isn&apos;t. We built this game, which means every statistic we
              publish — how many characters wear glasses, which questions
              split the board evenly, how many questions a perfect game takes
              — is computed from the actual character set the game runs on,
              not estimated from a photograph of a retail box.
            </p>
            <p>
              When we make a claim about strategy, we show the arithmetic
              behind it so you can check our work. When we describe how the
              game behaves, we&apos;re describing code we wrote.
            </p>
          </section>

          <section className="content-section">
            <h2>Our Editorial Process</h2>
            <ol style={{ marginTop: "0.5rem" }}>
              <li>
                <strong>We only write what we can verify.</strong>{" "}
                Strategy
                and probability claims are derived directly from the
                game&apos;s character data — the same data published in full
                on our <Link href="/characters">characters page</Link>, so
                anyone can reproduce our numbers.
              </li>
              <li>
                <strong>Math is computed, not estimated.</strong>{" "}
                Split
                ratios, expected-remaining-character counts, and information
                values are calculated from the roster rather than
                approximated. Where a formula is used, we state it in the
                article.
              </li>
              <li>
                <strong>Strategy advice is reasoning, and we label it as
                such.</strong>{" "}
                Practical advice about how to play is worked out from the
                board data and the rules of the game — what a given question
                does to the roster, and what that leaves you to work with.
                Where something is our opinion or preference, we say so, and
                we don&apos;t present untested advice as field experience.
              </li>
              <li>
                <strong>Historical and third-party facts are sourced.</strong>{" "}
                Anything we didn&apos;t observe ourselves — the origins of the
                original board game, details about other websites we
                recommend — is checked against a reputable published source
                and linked so you can read it yourself.
              </li>
            </ol>
          </section>

          <section className="content-section">
            <h2>Sources We Use</h2>
            <p>
              Our own game data is the primary source for anything about
              strategy, characters, or probability. For everything else we
              rely on:
            </p>
            <ul style={{ marginTop: "0.5rem" }}>
              <li>
                Established reference works and reputable news outlets for the
                history of the original board game.
              </li>
              <li>
                Published academic work for game-theory claims — for example,
                our strategy articles cite peer-reviewable analysis of optimal
                play rather than asserting it.
              </li>
              <li>
                Official documentation for technical claims about the web
                platform and the libraries this site is built on.
              </li>
              <li>
                First-hand use of any third-party site we recommend — we only
                link to sites we&apos;ve opened and played ourselves. If one
                goes paywalled or stops working, tell us and we&apos;ll
                update the article.
              </li>
            </ul>
            <p>
              We link to our sources inline rather than listing them at the
              end, so you can follow any specific claim back to where it came
              from.
            </p>
          </section>

          <section className="content-section">
            <h2>Corrections</h2>
            <p>
              If we publish something wrong, we fix it and say so. Articles
              that have been substantially revised carry an &quot;Updated&quot;
              date next to the byline, and the{" "}
              <Link href="/blog">blog index</Link>{" "}
              shows both the original
              publication date and the revision date. We don&apos;t quietly
              rewrite a page and pretend it always said the new thing.
            </p>
            <p>
              Found an error? Tell us through the{" "}
              <Link href="/contact">contact page</Link>. We&apos;d genuinely
              rather hear it from you than leave it up.
            </p>
          </section>

          <section className="content-section">
            <h2>Independence &amp; Advertising</h2>
            <p>
              Guess Who Online is free to play and is supported by
              advertising and by players who choose to tip us. Advertising
              revenue has no influence on what we publish: we don&apos;t
              accept payment for coverage, we don&apos;t write articles at an
              advertiser&apos;s request, and no advertiser sees our content
              before it goes live.
            </p>
            <p>
              When we recommend something we have a stake in, we say so in
              the article itself. Several games mentioned in our roundups are
              our own — those are disclosed on the page where they appear,
              not buried here. Details of what data advertising partners
              collect are in our{" "}
              <Link href="/privacy">privacy policy</Link>.
            </p>
          </section>

          <section
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>Scope &amp; Disclaimer</h2>
            <p>
              This site covers one game and the ideas around it: how to play
              it, how to play it well, where it came from, and how we built
              it. We build games, not academic papers. Where we get into
              information theory or history, we link to people who study it
              properly, so you can go deeper than we can take you.
            </p>
            <p>
              Guess Who is a trademark of Hasbro, Inc. This site is an
              independent fan project with original artwork and is not
              affiliated with, endorsed by, or sponsored by Hasbro. Read more{" "}
              <Link href="/about">about the project</Link>.
            </p>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
