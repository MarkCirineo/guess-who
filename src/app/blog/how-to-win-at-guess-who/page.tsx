import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorByline from "@/components/AuthorByline";
import AuthorBio from "@/components/AuthorBio";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How to Win at Guess Who: A Complete Strategy Guide — Guess Who Online",
  description:
    "Master the art of winning Guess Who with our in-depth strategy guide. Learn the binary search approach, opening theory, and when to make your final guess.",
  path: "/blog/how-to-win-at-guess-who",
  ogType: "article",
});

export default function HowToWinArticle() {
  return (
    <>
      <Header />
      <main className="content-page">
        <JsonLd
          data={[
            articleJsonLd({
              title: "How to Win at Guess Who: A Complete Strategy Guide",
              description:
                "Master the art of winning Guess Who with our in-depth strategy guide. Learn the binary search approach, opening theory, and when to make your final guess.",
              path: "/blog/how-to-win-at-guess-who",
              published: "2026-07-13",
              updated: "2026-07-30",
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: "How to Win", path: "/blog/how-to-win-at-guess-who" },
            ]),
          ]}
        />
        <div
          className="content-card glass animate-slide-in"
          style={{ padding: "2.5rem" }}
        >
          <Link
            href="/blog"
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
            ← Back to Blog
          </Link>

          <h1>How to Win at Guess Who: A Complete Strategy Guide</h1>
          <AuthorByline
            published="2026-07-13"
            updated="2026-07-30"
            readTime="7 min read"
          />

          <section className="content-section">
            <h2>What the Numbers on This Board Tell Us</h2>
            <p>
              Underneath the faces, Guess Who is a search problem, and the
              strategy that falls out of that is not the intuitive one. The
              questions that feel exciting to ask are usually the questions
              that cost you the game. Winning play is boring by design:
              half-the-board questions, every turn, until there is nothing left
              to halve. &quot;Is your character bald?&quot; feels thrilling on
              the 8.3% of games where it hits, and quietly hands the game away
              the other 91.7% of the time.
            </p>
            <p>
              The mechanism is simple. Every yes/no question splits the 24
              characters into two groups, and the answer throws one group away.
              Whoever shrinks their candidate pool to one character first wins.
              That&apos;s the whole game. What follows is how to do that
              shrinking as fast as the math allows — with the actual numbers
              from this board, counted trait by trait off the roster itself.
            </p>
          </section>

          <section className="content-section">
            <h2>The Binary Search Approach: Halving Is Everything</h2>
            <p>
              The core idea comes from{" "}
              <a
                href="https://en.wikipedia.org/wiki/Binary_search"
                target="_blank"
                rel="noopener"
              >
                binary search
              </a>
              , the computer science technique for finding a target by cutting
              the search space in half at every step. Twenty questions can
              distinguish over a million possibilities that way. With 24
              characters, perfect halving finds any character in log₂(24) ≈ 4.6
              questions — call it five. That&apos;s the ceiling. No strategy
              beats it, and it sits further from casual play than it looks.
            </p>
            <figure className="article-figure">
              <img
                src="/blog/elimination-funnel.svg"
                alt="Funnel diagram showing 24 characters narrowing to 12, then 6, then 3, then 1 or 2 remaining as four half-splitting questions are asked"
                width={760}
                height={400}
                loading="lazy"
              />
              <figcaption>
                The ideal game: each question halves whatever&apos;s left, so 24
                candidates collapse to a guess in four to five questions.
              </figcaption>
            </figure>
            <p>
              Here&apos;s the way we actually evaluate a question, and it&apos;s
              worth internalizing. If a question matches <em>k</em> of the 24
              characters, a &quot;yes&quot; leaves you with <em>k</em> and a
              &quot;no&quot; leaves you with 24 − <em>k</em>. Weight each
              outcome by how likely it is and you get the{" "}
              <strong>expected number of survivors</strong>: (k² + (24 − k)²) /
              24. Run a few splits through that formula and the story tells
              itself:
            </p>
            <ul>
              <li>
                A perfect <strong>12/12</strong> question leaves 12.0 characters
                on average.
              </li>
              <li>
                An <strong>8/16</strong> question (glasses, hats) leaves 13.3.
              </li>
              <li>
                A <strong>2/22</strong> question (bald, white hair, bowtie)
                leaves 20.3.
              </li>
            </ul>
            <p>
              Read that last number again. The lottery-ticket question barely
              moves you. Lopsided questions don&apos;t just risk a bad outcome —
              on average they <em>are</em> a bad outcome, and the formula
              punishes them brutally. Everything else in this guide is that one
              idea applied to three phases of the game.
            </p>
          </section>

          <section className="content-section">
            <h2>Opening Theory: The Perfect First Question Is Baked In</h2>
            <p>
              The roster is split evenly: 12 feminine-presenting characters, 12
              masculine-presenting. That single fact makes the
              gender-presentation question mathematically unbeatable as a first
              move on this board — it leaves exactly 12 candidates no matter
              which answer comes back. A flawless opener exists here for any
              player who goes looking for one.
            </p>
            <p>
              From there, the strong follow-ups are the traits that stay close
              to half. &quot;Is your character smiling?&quot; splits 14/10,
              which expects 12.3 survivors — nearly as good. &quot;Are they
              wearing any accessory?&quot; (earrings, a necklace, a scarf, a
              bowtie, or a headband) splits 15/9 for an expected 12.75. And
              here&apos;s the sleeper that&apos;s easiest to skip past: brown
              eyes. Eleven of the 24 characters have them, an 11/13 split that
              expects about 12.1 — the second-best opener on the board. We
              rendered every
              portrait at 1024×1024 partly so details like eye color would
              actually be legible. Take advantage. You can study all 24 faces on
              the <Link href="/characters">characters page</Link> between games.
            </p>
            <p>
              Glasses and hats each split 8/16. These are gambler&apos;s
              openers: a &quot;yes&quot; is fantastic, dropping you to 8
              instantly, but you&apos;ll hear &quot;no&quot; two times out of
              three and limp to 16. Playable, not optimal. The genuine traps are
              the rare traits — bald (2), white hair (2), bowtie (2). Save
              those for the endgame, where they belong. We&apos;ve ranked every
              question on this board from best to worst split in{" "}
              <Link href="/blog/best-questions-to-ask-in-guess-who">
                a separate article
              </Link>{" "}
              if you want the full table.
            </p>
          </section>

          <section className="content-section">
            <h2>The Mid-Game: Recount Against What&apos;s Left</h2>
            <p>
              This is the easiest mistake to make and one of the most expensive
              available: evaluating questions against the original 24 instead
              of against your <em>remaining pool</em>. Split ratios aren&apos;t
              fixed properties of a question. They&apos;re relationships between
              a question and whoever&apos;s still standing, and they change
              every turn.
            </p>
            <p>
              Brown hair is the clearest example. On the full board it&apos;s a
              weak 6/18 — an expected 15 survivors, one of the worst openers
              available. But suppose your first two questions got you down to
              six characters and three of them happen to have brown hair. The
              exact same words are now a perfect 50/50 split. Facial hair works
              the same way: 7/17 makes it a mediocre opener (expected 14.1),
              yet three turns in it&apos;s often the cleanest cut you have. So
              the mid-game rule is simple: before every question,{" "}
              <strong>recount the split against your current candidates</strong>
              , not the printed board.
            </p>
            <p>
              The other mid-game skill is knowing the overlaps, because
              overlaps create redundant questions — and a redundant question is
              a wasted turn. A few worth memorizing on our board:
            </p>
            <div className="portrait-grid">
              <div className="portrait">
                <img
                  src="/characters/marco.png"
                  alt="Marco"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Marco</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/fiona.png"
                  alt="Fiona"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Fiona</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/rosa.png"
                  alt="Rosa"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Rosa</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/oscar.png"
                  alt="Oscar"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Oscar</span>
              </div>
            </div>
            <p>
              Marco is the only character who wears both glasses and a hat — so
              if glasses already came back &quot;yes,&quot; asking about hats
              can only ever confirm or eliminate one guy. Fiona and Rosa each
              wear two accessories (earrings and a necklace), which makes
              &quot;earrings?&quot; and &quot;necklace?&quot; partially
              redundant against certain pools. Oscar packs three distinctive
              traits into one face: bald, bearded, and wearing a necklace.
              And since all seven characters with facial hair are
              masculine-presenting, asking about beards after a
              &quot;feminine&quot; answer eliminates exactly nobody. It is a
              completely wasted turn, and an easy one to walk into.
            </p>
          </section>

          <section className="content-section">
            <h2>The Endgame: When to Stop Asking and Guess</h2>
            <p>
              Down to a handful of candidates, Guess Who stops being a puzzle
              and becomes a race, and the right move depends on expected value.
              With <em>n</em> candidates, guessing now wins 1/n of the time.
              Asking one more good question and guessing next turn wins almost
              always — but it costs a turn, and your opponent moves in between.
            </p>
            <p>
              The interesting case is exactly two candidates. Guess now and
              it&apos;s a coin flip: 50%. Ask your splitting question instead
              and you&apos;ll (usually) close it out next turn with certainty.
              If your opponent is still wandering around with eight candidates,
              take the safe route — the extra turn costs you nothing. But if
              they&apos;re about to guess correctly,{" "}
              <strong>a 50% gamble beats a certain loss</strong>. That
              comparison — 50% now versus 0% after they win — is the entire
              decision, and it&apos;s an easy one to get backwards under
              pressure.
            </p>
            <p>
              The failure mode worth naming here isn&apos;t a bad opener or
              sloppy tracking. It&apos;s{" "}
              <strong>hoarding certainty</strong>. Picture it: a player grinds
              beautifully down to two candidates, then freezes and asks a
              confirming question — sometimes two — because guessing feels like
              gambling and asking feels like diligence. Meanwhile the opponent,
              sitting at three candidates and knowing they&apos;re behind,
              takes the 33% shot and wins. The certainty the careful player was
              protecting never got spent. In a race, unused certainty is worth
              nothing.
            </p>
            <p>
              How do you know whether your opponent is close? You don&apos;t
              need to guess — you answered every question they asked. You know
              exactly what they learned and when, which means you can
              reconstruct their candidate pool in your head, sometimes to the
              exact number. It&apos;s the kind of bookkeeping that&apos;s easy
              to let slide mid-game. Don&apos;t. It&apos;s the difference
              between gambling at the right moment and gambling blind. The
              quick reference: at one candidate, guess, obviously. At two, read
              the race. At three, ask one more question unless
              this is genuinely your last turn alive. At four or more, never
              guess — 25% is a losing bet dressed up as a bold one.
            </p>
          </section>

          <section
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>The Cheat Sheet</h2>
            <p>Everything above, compressed to three lines:</p>
            <ul>
              <li>
                <strong>Opener:</strong> ask the 12/12 gender-presentation
                question — or brown eyes (11/13) if you want to be
                unpredictable. Never open with a trait fewer than 8 characters
                share.
              </li>
              <li>
                <strong>Mid-game:</strong> before every question, recount the
                split against your <em>remaining</em> candidates, not the
                original 24. A weak opener is often a perfect fourth question.
              </li>
              <li>
                <strong>Endgame:</strong> at two candidates, guess if the race
                is close — 50% beats a certain loss — and only confirm down to
                one when you know you&apos;re ahead. Never guess at four or
                more.
              </li>
            </ul>
            <p>
              Play all of that perfectly and you&apos;ll land right around the
              five-question mark, which is where the math runs out — everything
              past it is reading the person on the other side of the board.
            </p>
          </section>

          <AuthorBio />
        </div>
        <Footer />
      </main>
    </>
  );
}
