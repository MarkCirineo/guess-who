import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorByline from "@/components/AuthorByline";
import AuthorBio from "@/components/AuthorBio";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { SHIP_DATE } from "@/lib/blog";

export const metadata: Metadata = pageMetadata({
  title: "The Math of the Perfect Question in Guess Who — Guess Who Online",
  description:
    "An information-theory look at Guess Who: why the best question splits the board in half, how to measure a question in bits, and what the theoretical minimum number of questions actually is.",
  path: "/blog/math-of-the-perfect-question",
  ogType: "article",
});

export default function MathArticle() {
  return (
    <>
      <Header />
      <main className="content-page">
        <JsonLd
          data={[
            articleJsonLd({
              title: "The Math of the Perfect Question in Guess Who",
              description:
                "An information-theory look at Guess Who: why the best question splits the board in half, how to measure a question in bits, and what the theoretical minimum number of questions actually is.",
              path: "/blog/math-of-the-perfect-question",
              published: SHIP_DATE,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              {
                name: "Math of the Perfect Question",
                path: "/blog/math-of-the-perfect-question",
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

          <h1>The Math of the Perfect Question in Guess Who</h1>
          <AuthorByline published={SHIP_DATE} readTime="9 min read" />

          <section className="content-section">
            <h2>Underneath the Faces, a Number</h2>
            <p>
              We&rsquo;ve already sorted every question on this board into tiers
              by how well it splits the 24 characters — that&rsquo;s{" "}
              <Link
                href="/blog/best-questions-to-ask-in-guess-who"
                style={{ color: "hsl(220, 83%, 68%)" }}
              >
                the practical version
              </Link>
              , and it&rsquo;s the one to read if you just want to win tonight.
              This article is the floor underneath it: where those rankings come
              from, why &ldquo;split the board in half&rdquo; is the correct
              instinct rather than folk wisdom, and what the actual mathematical
              floor on a game of Guess Who is.
            </p>
            <p>
              All of it rests on one idea from Claude Shannon&rsquo;s 1948 work
              on communication: information can be measured, it has a unit, and
              the unit is the <strong>bit</strong>. A question is not vaguely
              &ldquo;good&rdquo; or &ldquo;bad.&rdquo; It has a price tag,
              denominated in bits, and you can compute it before you open your
              mouth.
            </p>
          </section>

          <section className="content-section">
            <h2>One Bit Is One Perfect Question</h2>
            <p>
              A bit is the information you get from a yes/no question whose two
              answers are exactly equally likely. A fair coin flip is one bit. A
              question you already know the answer to is zero bits — the answer
              tells you nothing you didn&rsquo;t have.
            </p>
            <p>
              The formula for a two-outcome question is short enough to do in
              your head with practice. If a fraction <em>p</em>{" "}
              of the remaining
              characters say yes and <em>q</em>{" "}
              = 1 − <em>p</em> say no, the
              question yields
            </p>
            <p style={{ textAlign: "center", fontSize: "1.05rem" }}>
              <strong>H = −p·log₂(p) − q·log₂(q)</strong>
            </p>
            <p>
              Work it for the perfect opener. On our board, 12 characters
              present feminine and 12 present masculine, so p = q = 0.5. Since
              log₂(0.5) = −1, the whole thing collapses to H = 0.5 + 0.5 ={" "}
              <strong>1.000 bit</strong>. That question pays a full bit no
              matter which answer comes back, which is the only question on a
              full board that does.
            </p>
            <p>
              Now work it for glasses, which 8 of the 24 wear. Here p = 8/24 =
              1/3 and q = 2/3. log₂(1/3) = −1.585 and log₂(2/3) = −0.585, so H =
              (1/3)(1.585) + (2/3)(0.585) = 0.528 + 0.390 ={" "}
              <strong>0.918 bits</strong>. Worth noticing: the bit count is
              gentler on glasses than our tier list is. A question that misses
              half by a third of the board still collects 92% of what a perfect
              one would.
            </p>
            <p>
              Then work the bowtie, worn by exactly two characters — Ethan and
              Marco. p = 2/24 = 1/12 and q = 11/12. log₂(1/12) = −3.585 and
              log₂(11/12) = −0.126, giving H = (1/12)(3.585) + (11/12)(0.126) =
              0.299 + 0.115 = <strong>0.414 bits</strong>. You spent a turn and
              bought less than half of what the gender question hands you for
              free.
            </p>
            <figure className="article-figure">
              <img
                src="/blog/question-bits-curve.svg"
                alt="Line chart of Shannon entropy versus split size for the 24-character board, peaking at 1.000 bit for a 12 and 12 split and falling to 0.414 bits at a 2 and 22 split"
                width={760}
                height={460}
                loading="lazy"
              />
              <figcaption>
                Every possible split of a 24-character board, priced in bits.
                The curve is nearly flat across the middle and falls off a cliff
                at the edges.
              </figcaption>
            </figure>
            <p>
              That shape is the practical lesson of the whole article. The top
              of the curve is almost flat: brown eyes (11/13) pays 0.995 bits,
              smiling (14/10) pays 0.980, short hair (10/14) also pays 0.980,
              and any-accessories (15/9) pays 0.954. Agonizing over which of
              those to ask is worth, at most, five hundredths of a bit. The
              edges are where the money is lost — 6/18 drops to 0.811, 4/20 to
              0.650, and 2/22 to 0.414. Being roughly right is nearly free;
              being lopsided is expensive.
            </p>
            <p>
              One thing worth pausing on: why is there a logarithm in there at
              all, when what you care about is faces getting flipped face-down?
              Because uncertainty multiplies while questions add. Two independent
              yes/no questions produce four possible answer combinations, three
              produce eight, four produce sixteen. Counting outcomes means
              multiplying every turn, and taking log₂ converts that
              multiplication into addition — which is why a question that
              quarters your candidate pool is worth exactly twice one that halves
              it, rather than four times as much. That conversion is the whole
              reason the bit is a useful unit instead of a piece of notation. It
              turns a shrinking board into a running total.
            </p>
          </section>

          <section className="content-section">
            <h2>Twenty-Four Characters Cost 4.585 Bits</h2>
            <p>
              Before you ask anything, the secret character is one of 24 equally
              likely possibilities. The uncertainty in that situation is
              log₂(24) ≈ <strong>4.585 bits</strong>. That&rsquo;s the price of
              the secret. Every question you ask is a payment toward it, and the
              game ends when you&rsquo;ve paid in full.
            </p>
            <p>
              Since no yes/no question can pay more than 1 bit on average, and
              you can&rsquo;t ask 0.585 of a question, the worst case can&rsquo;t
              be better than <strong>five questions</strong>. That number gets
              quoted a lot, including by us. What gets quoted less is the more
              useful version: with a perfect decision tree over 24 equally likely
              answers, 8 of the characters get pinned down in 4 questions and the
              other 16 need 5, for an average of (8×4 + 16×5) / 24 ={" "}
              <strong>4.667 questions</strong>.
            </p>
            <p>
              That&rsquo;s the theoretical ideal, and it assumes you can ask{" "}
              <em>any</em>{" "}
              yes/no question — including &ldquo;is it one of these
              twelve specific people?&rdquo;, which no real player would ask.
              The real board doesn&rsquo;t need that luxury. An exhaustive search
              over every decision tree buildable from the 22 questions in the
              game&rsquo;s own suggestion list finds a best tree that identifies
              any character in 5 questions worst-case, 4.667 on average — the
              information-theoretic optimum, matched exactly, using nothing but
              questions a player would say out loud. That falls out of having
              nine trait categories that overlap in enough different ways: at
              every level of the tree, some trait still cuts the surviving pool
              close enough to half.
            </p>
          </section>

          <section className="content-section">
            <h2>A Four-Question Line That Really Exists</h2>
            <p>
              Here is one of the eight characters you can catch in four
              questions. Every step is checkable against the{" "}
              <Link href="/characters" style={{ color: "hsl(220, 83%, 68%)" }}>
                character gallery
              </Link>
              .
            </p>
            <p>
              <strong>&ldquo;Do they look masculine?&rdquo; Yes.</strong>{" "}
              12
              left, 1 bit paid.{" "}
              <strong>&ldquo;Do they have brown eyes?&rdquo; Yes.</strong>{" "}
              Of
              those 12, exactly 6 do — Alex, Carlos, George, Marco, Oscar, and
              Umar. Another full bit.
            </p>
            <div className="portrait-grid">
              <div className="portrait">
                <img
                  src="/characters/alex.png"
                  alt="Alex"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Alex</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/carlos.png"
                  alt="Carlos"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Carlos</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/george.png"
                  alt="George"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>George</span>
              </div>
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
                  src="/characters/oscar.png"
                  alt="Oscar"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Oscar</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/umar.png"
                  alt="Umar"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Umar</span>
              </div>
            </div>
            <p>
              <strong>&ldquo;Do they wear glasses?&rdquo; Yes.</strong>{" "}
              Alex,
              George, and Marco do; Carlos, Oscar, and Umar don&rsquo;t. A third
              consecutive perfect split, and you&rsquo;re at three candidates.{" "}
              <strong>&ldquo;Do they have facial hair?&rdquo; Yes.</strong>{" "}
              Only
              George. Four questions, done.
            </p>
            <p>
              Add up what you actually collected: 1 + 1 + 1 + log₂(3) = 3 +
              1.585 = <strong>4.585 bits</strong>, which is precisely
              log₂(24). The books balance to the decimal, and the fourth question
              is the interesting one. Its <em>expected</em>{" "}
              value was 0.918 bits,
              same as any 1-in-3 split. But the answer you got was the unlikely
              one, and an unlikely answer carries more information: the bits a
              specific answer delivers are log₂(pool before ÷ pool after), so
              going from 3 candidates to 1 paid 1.585 bits. Entropy is the
              average over both answers. It is not what you get.
            </p>
          </section>

          <section className="content-section">
            <h2>Two Rulers, One Measurement</h2>
            <p>
              Our{" "}
              <Link
                href="/blog/how-to-win-at-guess-who"
                style={{ color: "hsl(220, 83%, 68%)" }}
              >
                strategy guide
              </Link>{" "}
              scores questions a different way: expected characters remaining,
              (k² + (24 − k)²) / 24. A 12/12 question leaves 12.0 on average, an
              8/16 leaves 13.3, a 2/22 leaves 20.3. Both measures depend only on
              how far k sits from 12, so for ranking a single question they never
              disagree. Same three questions, same order, whether you say
              1.000 / 0.918 / 0.414 bits or 12.0 / 13.3 / 20.3 survivors.
            </p>
            <p>
              The difference is what happens when you chain them.
              Expected-survivors doesn&rsquo;t compose — you can&rsquo;t add 12.0
              and 13.3 and get anything meaningful. Bits do. They add, they
              subtract, and that makes them a budget you can track mid-game.
              You owe 4.585. After the gender question and the brown-eyes
              follow-up you&rsquo;ve paid 2, leaving 2.585, so at best you have
              three questions to go.
            </p>
            <p>
              The version of this we actually use at the table is even simpler:
              the minimum number of questions still ahead of you is log₂ of
              however many candidates are standing, rounded up. Six left is 2.585
              bits, so three questions. Three left is 1.585 bits, so two
              questions — meaning when you&rsquo;re down to three, no question in
              the game finishes you this turn, and hunting for a clever one is a
              waste of thought. Take the 1-versus-2 split and move on. Two left
              is exactly 1 bit: one question, or a coin flip if you&rsquo;d
              rather race.
            </p>
          </section>

          <section className="content-section">
            <h2>Where Half-Splitting Stops Being Right</h2>
            <p>
              Everything above optimizes for one thing: identifying the character
              in as few questions as possible. That&rsquo;s the correct goal if
              you&rsquo;re playing solitaire against the board. Guess Who is a
              race, and a race has a different objective function — maximize the
              probability that you finish first, which is not the same as
              minimizing your own expected question count.
            </p>
            <p>
              Look again at the bowtie. Its entropy is 0.414 bits, but that
              number is an average over two wildly different outcomes. A
              &ldquo;yes&rdquo; takes you from 24 candidates to 2 in one move —
              log₂(12) = 3.585 bits, more than three quarters of the entire game,
              bought with a single question. A &ldquo;no&rdquo; takes you from 24
              to 22 and pays 0.126 bits, which is nearly nothing. One time in
              twelve it&rsquo;s the best question ever asked; eleven times in
              twelve it&rsquo;s a wasted turn. The gender question, by contrast,
              pays exactly 1.000 bit with zero variance. Same expected-value
              machinery, completely different risk profiles.
            </p>
            <p>
              When you&rsquo;re ahead, you want the variance-free question. When
              you&rsquo;re behind, you need the tail. If your opponent is down to
              three candidates and you still have twelve, a safe 1-bit question
              means you lose on schedule; the lopsided gamble is the only branch
              of the future where you win. Mathematician Mihai Nica formalized
              exactly this in{" "}
              <a
                href="https://arxiv.org/abs/1509.03327"
                target="_blank"
                rel="noopener"
              >
                &ldquo;Optimal Strategy in Guess Who?: Beyond Binary
                Search&rdquo;
              </a>
              , showing that the greedy half-splitting strategy is not optimal
              for the two-player game, and that the trailing player should
              deliberately take on variance.
            </p>
            <p>
              So the bowtie isn&rsquo;t a bad question. It&rsquo;s a bad question
              when you&rsquo;re winning and a correct one when you&rsquo;re
              losing, and knowing which situation you&rsquo;re in is worth more
              than the entropy table.
            </p>
          </section>

          <section
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>The Floor Is Easy. The Search Is Not.</h2>
            <p>
              The theory in this article takes about ten minutes to learn. The
              number is 4.585 bits, the answer is five questions, and the rule is
              aim for half. None of that is hard, and none of it is where games
              are actually won. Five is the floor, and the floor is hard to stand
              on: it demands that every single question land near a half-split,
              and most of the questions that come naturally to hand — hats, red
              hair, bowties — are nowhere close. A game played on instinct runs
              well past five.
            </p>
            <p>
              The hard part is that every split ratio you just memorized is a
              property of the <em>full</em>{" "}
              board, and it expires the instant you
              get your first answer. Facial hair is a mediocre 7/17 opener worth
              0.871 bits — but once you know the character presents masculine, it
              splits those 12 as 7/5 and pays 0.980. Gray-or-white hair is 4/20
              and 0.650 bits on the full board, and among the 12 masculine
              characters it collapses to 1/11 and 0.414, because George is the
              only one. One answer made the first question a tenth of a bit
              better and the second one nearly a quarter of a bit worse.
            </p>
            <p>
              Which means the real skill isn&rsquo;t knowing that a half-split is
              optimal. It&rsquo;s looking at nine faces still standing, in a game
              where you can&rsquo;t see your opponent&rsquo;s board and
              can&rsquo;t pause to run arithmetic, and spotting the trait that
              four or five of them happen to share. That&rsquo;s a perception and
              bookkeeping problem, not a math problem, and it stays hard long
              after the math has gone easy. Information theory sets the price of
              the secret. Finding something worth buying with your next question,
              at six candidates left, with someone across the table doing the
              same, is the part the theory hands back to you.
            </p>
          </section>

          <AuthorBio />
        </div>
        <Footer />
      </main>
    </>
  );
}
