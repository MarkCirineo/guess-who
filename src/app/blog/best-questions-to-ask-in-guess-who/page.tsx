import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorByline from "@/components/AuthorByline";
import AuthorBio from "@/components/AuthorBio";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Best Questions to Ask in Guess Who (Ranked by Effectiveness) — Guess Who Online",
  description:
    "Discover the most effective questions to ask in Guess Who, ranked by how well they split the board. Includes probability analysis of our 24 characters.",
  path: "/blog/best-questions-to-ask-in-guess-who",
  ogType: "article",
});

export default function BestQuestionsArticle() {
  return (
    <>
      <Header />
      <main className="content-page">
        <JsonLd
          data={[
            articleJsonLd({
              title:
                "Best Questions to Ask in Guess Who (Ranked by Effectiveness)",
              description:
                "Discover the most effective questions to ask in Guess Who, ranked by how well they split the board. Includes probability analysis of our 24 characters.",
              path: "/blog/best-questions-to-ask-in-guess-who",
              published: "2026-07-13",
              updated: "2026-07-30",
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              {
                name: "Best Questions",
                path: "/blog/best-questions-to-ask-in-guess-who",
              },
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

          <h1>Best Questions to Ask in Guess Who (Ranked by Effectiveness)</h1>
          <AuthorByline
            published="2026-07-13"
            updated="2026-07-30"
            readTime="6 min read"
          />

          <section className="content-section">
            <h2>The Only Move You Get</h2>
            <p>
              We designed the 24 characters on this board, which means we also
              decided, on purpose, which questions would be great and which
              would be traps. So instead of vague advice about &ldquo;asking
              smart questions,&rdquo; we can show you the actual numbers behind
              every question in the game.
            </p>
            <p>
              Here&rsquo;s the core idea. Every question divides the board into
              a yes-group and a no-group. Whichever answer comes back, you keep
              one group and flip the other face-down. A question that splits 24
              characters 12 and 12 guarantees you eliminate half the board. A
              question that splits 2 and 22 will, most games, eliminate almost
              nothing. Your question is the only move you get each turn —
              spending it on a lopsided split is how games get lost.
            </p>
            <figure className="article-figure">
              <img
                src="/blog/question-split-chart.svg"
                alt="Horizontal bar chart comparing how eight opening questions split the 24 Guess Who characters into yes and no groups, ranging from a perfect 12 and 12 split for gender presentation down to a 2 and 22 split for the bowtie question"
                width={760}
                height={480}
                loading="lazy"
              />
              <figcaption>
                Every split in this chart comes straight from the game&rsquo;s
                own character data — the counts are the ones the board is built
                from.
              </figcaption>
            </figure>
          </section>

          <section className="content-section">
            <h2>How We Scored Every Question</h2>
            <p>
              For each question we calculated the <em>expected number of
              characters remaining</em> after you ask it. If a trait covers k of
              the 24 characters, that number is (k² + (24−k)²) / 24 — you
              weight each outcome by how likely it is. A perfect 12/12 split
              leaves you with exactly 12.0 candidates on average. A 2/22 split
              leaves 20.3. That gap is the entire difference between a sharp
              opener and a wasted turn.
            </p>
            <p>
              For context: since each ideal question halves the board, a
              flawless game needs about log₂(24) ≈ 4.6 questions. Every tier
              below is ranked by that expected-remaining number. Lower is
              better.
            </p>
          </section>

          <section className="content-section">
            <h2>S-Tier: The Openers (12.0–12.75 Expected Remaining)</h2>
            <p>
              <strong>&ldquo;Do they look feminine?&rdquo; — 12/12, expected
              12.0.</strong> We split the cast exactly 12 feminine and 12
              masculine when we designed the board, so this is the one question
              in the game with no bad answer. Mathematically you can&rsquo;t
              beat it as an opener.
            </p>
            <p>
              <strong>&ldquo;Are they smiling?&rdquo; — 14/10, expected
              12.3.</strong> We think this is the most underrated question in
              the game. It sounds too soft, like you&rsquo;re asking about mood
              instead of features. But 14 smiling versus 10 not is the
              second-best split on the board, and it cuts across gender, hair,
              and accessories, so it stays useful no matter what you asked
              first. If smiling isn&rsquo;t your style, &ldquo;Is their hair
              short?&rdquo; lands on the same 12.3 by a different route — 10
              short against 14 medium, long, or bald.
            </p>
            <p>
              <strong>&ldquo;Are they wearing any accessories?&rdquo; — 15/9,
              expected 12.75.</strong> In our trait system, accessories means
              earrings, necklaces, scarves, bowties, and headbands — not
              glasses or hats, which are their own categories. Fifteen
              characters wear at least one. It&rsquo;s the widest net in the
              game, and a &ldquo;no&rdquo; here is quietly excellent: you drop
              straight to 9 candidates.
            </p>
          </section>

          <section className="content-section">
            <h2>A-Tier: Strong, With Caveats (13.3–14.1)</h2>
            <p>
              <strong>Glasses and hats — each 8/16, expected 13.3.</strong>{" "}
              Here&rsquo;s our favorite trap on the board: these two are the
              easiest traits to overvalue. Glasses and hats are the most
              visually obvious features in the game, so asking about them{" "}
              <em>feels</em> incisive. But only 8 of 24 characters wear
              glasses, and only 8 wear hats. Two-thirds of the time the answer
              is &ldquo;no&rdquo; and you&rsquo;ve trimmed just a third of the
              board. Smiling, meanwhile, scores better at 12.3 and feels like
              it tells you less. Feeling informative and being informative are
              different things.
            </p>
            <p>
              One character makes this trap vivid: Marco wears glasses, a hat,{" "}
              <em>and</em> a bowtie. He&rsquo;s the only character with both
              glasses and a hat, so if you burn two questions on those traits
              and hear &ldquo;yes&rdquo; twice, you&rsquo;ve found Marco — in
              the same number of turns a 12/12 opener would have spent cutting
              the board to 6.
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
            </div>
            <p>
              Marco, Fiona, and Rosa are the board&rsquo;s trait-stackers.
              Fiona and Rosa each wear two accessories, which is exactly why
              narrow accessory questions (more on those below) pay off so
              rarely — the accessories cluster on a few characters instead of
              spreading out.
            </p>
            <p>
              <strong>&ldquo;Do they have facial hair?&rdquo; — 7/17, expected
              14.1.</strong> Weak as an opener, but keep reading — this
              question has a second life in the next section.{" "}
              <strong>&ldquo;Do they have blue eyes?&rdquo;</strong> sits at
              the same 7/17. And an honest asterisk:{" "}
              <strong>&ldquo;Do they have brown eyes?&rdquo;</strong> splits
              11/13, which works out to about 12.1 — on paper, better than
              smiling. We rank it A-tier anyway because eye color is the
              hardest trait to read at tile size — the eyes take up a sliver of
              each portrait, while glasses, hats, and hair fill it. That makes
              a wrong answer about eyes uniquely costly: it can leave you
              confidently eliminating the actual secret character. The math
              assumes the answers are right, and on eyes they&rsquo;re the
              easiest to get wrong.
            </p>
          </section>

          <section className="content-section">
            <h2>B-Tier: Mid-Game Tools (15.0–17.3)</h2>
            <p>
              <strong>&ldquo;Is their hair black?&rdquo; and &ldquo;Is their
              hair brown?&rdquo; — each 6/18, expected 15.0.</strong> Same
              story for <strong>green eyes</strong>, also 6/18. As openers
              these are mediocre, but hair color shines once the board is
              small, because the 24 characters spread across six colors —
              black, brown, blonde, red, gray, and white — and a
              &ldquo;yes&rdquo; drops you into a tiny group instantly.
            </p>
            <p>
              <strong>Blonde or red hair — each 4/20, roughly 17.3.</strong>{" "}
              You&rsquo;re gambling on a 1-in-6 &ldquo;yes.&rdquo; When it
              hits, it&rsquo;s spectacular. Five times out of six, it
              doesn&rsquo;t.
            </p>
          </section>

          <section className="content-section">
            <h2>C-Tier: The Turn-Wasters (18.8+)</h2>
            <p>
              <strong>&ldquo;Do they wear a scarf?&rdquo; — 3/21, about
              18.8.</strong> Three scarves on the whole board. <strong>
              &ldquo;Do they wear a bowtie?&rdquo; — 2/22, expected
              20.3.</strong> The answer is &ldquo;no&rdquo; 92% of the time,
              and that &ldquo;no&rdquo; eliminates two characters. Headbands,
              gray hair, white hair, and bald all sit at the same 2/22.
            </p>
            <p>
              We want to be clear that these traits aren&rsquo;t design
              mistakes. Uneven traits are what give question choice any weight:
              if every trait split the board evenly, every question would be
              worth the same and the game would have no skill in it. The bowtie
              is there to be the wrong answer. Late game, though, these flip:
              when you&rsquo;re down to three candidates and one has white hair,
              that&rsquo;s a clean, safe split.
            </p>
          </section>

          <section className="content-section">
            <h2>Tiers Aren&rsquo;t Fixed — They Drift as the Board Shrinks</h2>
            <p>
              Every number above assumes a full board of 24. The moment you get
              your first answer, recompute. Our favorite example: all 7
              facial-hair characters present masculine. As an opener, facial
              hair is a shrug at 14.1. But if you&rsquo;ve already learned the
              character looks masculine, the same question now splits the
              remaining 12 characters 7 to 5 — nearly perfect. A middling
              question became an elite one because the board changed underneath
              it.
            </p>
            <p>
              One more wrinkle for the truly competitive: pure halving is
              optimal when you&rsquo;re playing alone against the board, but
              Guess Who is a race. Mathematician Mihai Nica{" "}
              <a
                href="https://arxiv.org/abs/1509.03327"
                target="_blank"
                rel="noopener"
              >
                proved
              </a>{" "}
              that when you&rsquo;re behind, the right play is to gamble on
              lopsided questions and hope for the lucky &ldquo;yes,&rdquo;
              because a safe split just loses slower. So if your opponent is
              two questions ahead, that 4/20 red-hair question stops being
              B-tier desperation and becomes correct strategy.
            </p>
          </section>

          <section
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>The Five-Question Challenge</h2>
            <p>
              Since log₂(24) is about 4.6, a player asking near-perfect
              questions finds the secret character in five questions on
              average. A game that runs eight or ten questions instead is a
              game where turns went to lopsided splits. So here&rsquo;s our
              challenge: next game, count your questions. Write the number
              down. Then look back at which questions bought
              you the least — we&rsquo;d bet money at least one was glasses or
              a hat.
            </p>
            <p>
              If you want an edge before you start counting, spend two minutes
              with the{" "}
              <Link href="/characters" style={{ color: "hsl(220, 83%, 68%)" }}>
                full character gallery
              </Link>{" "}
              and try to spot the splits yourself — which traits cover half the
              board, and which cover two faces. That&rsquo;s not cheating.
              That&rsquo;s scouting. Five questions. See how close you can get.
            </p>
          </section>

          <AuthorBio />
        </div>
        <Footer />
      </main>
    </>
  );
}
