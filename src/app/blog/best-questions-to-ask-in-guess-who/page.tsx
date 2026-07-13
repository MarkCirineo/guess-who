import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Questions to Ask in Guess Who (Ranked by Effectiveness) — Guess Who Online",
  description:
    "Discover the most effective questions to ask in Guess Who, ranked by how well they split the board. Includes probability analysis of all 24 characters.",
};

export default function BestQuestionsArticle() {
  return (
    <main className="content-page">
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
        <p
          style={{
            color: "hsl(230, 10%, 50%)",
            fontSize: "0.8rem",
            marginBottom: "2rem",
          }}
        >
          Published July 5, 2026 · 5 min read
        </p>

        <section className="content-section">
          <h2>Why Question Choice Matters</h2>
          <p>
            Most people approach Guess Who by asking whatever pops into their
            head. But the difference between a good question and a bad one is
            enormous. The ideal question splits your remaining characters as
            close to 50/50 as possible — this is called maximizing
            &quot;information gain.&quot; A perfect question eliminates half
            the board regardless of whether the answer is yes or no. A bad
            question might only eliminate 1 or 2 characters.
          </p>
          <p>
            We analyzed all 24 characters in our game and ranked every
            possible question by how evenly it divides the board. Here&apos;s
            what we found.
          </p>
        </section>

        <section className="content-section">
          <h2>🏆 S-Tier Questions (Eliminate ~50%)</h2>
          <p>
            These are your best opening questions. Each one splits the 24
            characters almost perfectly in half, guaranteeing you eliminate
            roughly 12 characters no matter the answer.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they look masculine?&quot; — 12/12 split
          </h3>
          <p>
            The single best opening question in the game. Our 24 characters
            are split exactly 12 masculine and 12 feminine. No matter the
            answer, you eliminate exactly half the board. This is
            mathematically perfect — you cannot do better than this.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have short hair?&quot; — 12/12 split
          </h3>
          <p>
            Another perfect 50/50 split. Twelve characters have short hair
            and twelve have medium or long hair. If you&apos;ve already asked
            about gender presentation, hair length is an excellent second
            question because it cross-cuts the gender split — both groups
            have characters with short and longer hair.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Are they smiling?&quot; — 13/11 split
          </h3>
          <p>
            Nearly perfect at 13 smiling vs 11 not smiling. This is a strong
            opener that most players overlook. It&apos;s especially powerful
            because smiling doesn&apos;t correlate strongly with other traits,
            giving you genuinely new information.
          </p>
        </section>

        <section className="content-section">
          <h2>🅰️ A-Tier Questions (Eliminate 30–40%)</h2>
          <p>
            Solid follow-up questions once you&apos;ve used your S-tier
            openers. These don&apos;t split perfectly, but they still provide
            strong information gain.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have brown eyes?&quot; — 8/16 split
          </h3>
          <p>
            Brown is the most common eye color in our character set with 8
            characters. A &quot;yes&quot; eliminates 16 characters instantly.
            A &quot;no&quot; still narrows it to 16 — not as sharp as S-tier,
            but very useful in the mid-game.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have blue eyes?&quot; — 7/17 split
          </h3>
          <p>
            Seven characters have blue eyes. Similar to brown eyes — the
            asymmetry means a &quot;yes&quot; answer is more powerful than a
            &quot;no,&quot; but it&apos;s still a strong question.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            Hair Color Questions — varies by color
          </h3>
          <p>
            Hair color is highly valuable because it has many possible values.
            Asking &quot;Do they have black hair?&quot; gives a 5/19 split.
            &quot;Brown hair?&quot; is also 5/19. &quot;Blonde?&quot; gives
            4/20. Individually these aren&apos;t S-tier, but hair color
            questions are powerful because a &quot;yes&quot; answer immediately
            puts you in a very small group.
          </p>
        </section>

        <section className="content-section">
          <h2>🅱️ B-Tier Questions (Eliminate 20–25%)</h2>
          <p>
            These are situational questions. They&apos;re fine in the mid to
            late game when you&apos;ve narrowed the board, but they&apos;re
            inefficient as openers because the split is too lopsided.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they wear glasses?&quot; — 6/18 split
          </h3>
          <p>
            Only 6 characters wear glasses. A &quot;yes&quot; is great — you
            jump to just 6 possibilities. But a &quot;no&quot; only eliminates
            6 out of 24, leaving you with 18. As a first question, this
            wastes your most valuable turn 75% of the time.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have a hat?&quot; — 5/19 split
          </h3>
          <p>
            Five characters wear hats. Same problem as glasses — the split is
            heavily skewed. Save this for when you&apos;re narrowing down a
            smaller group.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have facial hair?&quot; — 5/19 split
          </h3>
          <p>
            Only 5 characters have facial hair, and they&apos;re all
            masculine-presenting. If you already know the character looks
            masculine, this becomes more useful (5/7 split within that
            group), but as a first question it&apos;s weak.
          </p>
        </section>

        <section className="content-section">
          <h2>🅲 C-Tier Questions (Avoid Early)</h2>
          <p>
            These questions are too narrow to be useful in the early game.
            They target traits that only 1–2 characters have, so a
            &quot;no&quot; answer tells you almost nothing.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they wear a bowtie?&quot; — 2/22 split
          </h3>
          <p>
            Only 2 characters wear bowties. If the answer is &quot;no&quot;
            (which happens 92% of the time), you only eliminated 2
            characters. Terrible information efficiency.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have a scarf?&quot; — 1/23 split
          </h3>
          <p>
            The worst possible question. Only 1 character has a scarf. A
            &quot;no&quot; eliminates a single character. You might as well
            have skipped your turn.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            &quot;Do they have a bandana?&quot; — 1/23 split
          </h3>
          <p>
            Same problem as the scarf. These hyper-specific accessory
            questions should only be asked when you&apos;re down to 3–4
            characters and you need to differentiate between them.
          </p>
        </section>

        <section className="content-section">
          <h2>💡 Pro Tip: Chain Your Questions</h2>
          <p>
            The most effective strategy is to chain questions in a logical
            sequence. Start with an S-tier question to cut the board in half,
            then use A-tier questions that work well within that subgroup.
          </p>
          <p>
            For example: start with &quot;Do they look masculine?&quot; (12/12).
            If yes, follow with &quot;Do they have facial hair?&quot; — which
            is normally a B-tier question, but within just the 12 masculine
            characters it gives a 5/7 split, making it much more powerful.
          </p>
          <p>
            The key insight is that a question&apos;s tier can change depending
            on how many characters remain and how the remaining traits are
            distributed. Always think about the current state of your board,
            not the original 24.
          </p>
        </section>

        <section
          className="content-section"
          style={{ borderBottom: "none", paddingBottom: 0 }}
        >
          <h2>Ready to Test These Strategies?</h2>
          <p>
            Now that you know which questions pack the most punch, put them
            into practice.{" "}
            <Link href="/" style={{ color: "hsl(220, 83%, 68%)" }}>
              Play Guess Who Online
            </Link>{" "}
            — it&apos;s free, no sign-up required. Challenge a friend and see
            how quickly you can narrow down the board using optimal questions.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
