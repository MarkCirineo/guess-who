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
  title: "Using Guess Who in Classrooms and with Younger Kids — Guess Who Online",
  description:
    "Guess Who quietly teaches deduction, descriptive vocabulary, and yes-or-no questioning. Practical ways teachers and parents can use it, with age-appropriate rule adjustments.",
  path: "/blog/guess-who-for-classrooms-and-families",
  ogType: "article",
});

export default function ClassroomArticle() {
  return (
    <>
      <Header />
      <main className="content-page">
        <JsonLd
          data={[
            articleJsonLd({
              title: "Using Guess Who in Classrooms and with Younger Kids",
              description:
                "Guess Who quietly teaches deduction, descriptive vocabulary, and yes-or-no questioning. Practical ways teachers and parents can use it, with age-appropriate rule adjustments.",
              path: "/blog/guess-who-for-classrooms-and-families",
              published: SHIP_DATE,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              {
                name: "Classrooms & Families",
                path: "/blog/guess-who-for-classrooms-and-families",
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

          <h1>Using Guess Who in Classrooms and with Younger Kids</h1>
          <AuthorByline published={SHIP_DATE} readTime="7 min read" />

          <section className="content-section">
            <h2>Four Skills Hiding Behind a Board of Faces</h2>
            <p>
              Guess Who looks like a game about faces. Mechanically, it&apos;s a
              game about questions. Before a player is allowed to touch the
              board, they have to notice a feature, name it, shape it into
              something answerable with one word, and then work out what that
              one word means for every face still standing. That&apos;s a stack
              of real thinking wearing a funny hat.
            </p>
            <p>
              We build and run this game, so we know the board inside out — all
              24 characters are ours, and we picked every trait on purpose.
              What we don&apos;t have is a classroom. Everything below is
              reasoned from the game&apos;s structure and its trait data, not
              from field notes — so treat it as a starting point to adapt,
              not a lesson plan. The four skills the game exercises, roughly
              in the order they get hard:
            </p>
            <p>
              Forming a yes-or-no question. Describing a face out loud with
              precise words. Eliminating candidates from an answer. And the last
              one, the one that keeps mattering long after the game is over:
              choosing a question that splits a group instead of taking a
              swing at one person.
            </p>
          </section>

          <section className="content-section">
            <h2>Skill One: Making the Question Answerable</h2>
            <p>
              Expect open questions on a young child&apos;s first turn.
              &ldquo;What color is her hair?&rdquo; is the natural thing to
              reach for. It&apos;s a good question. It&apos;s just not a legal
              one, and explaining why is the first genuine lesson in the box.
            </p>
            <p>
              An open question lets you stay vague. A yes-or-no question forces
              a commitment: to ask &ldquo;Is her hair brown?&rdquo; you have to
              already have a candidate in your head. That gap between
              &ldquo;what color&rdquo; and &ldquo;is it brown&rdquo; is the
              whole skill, and our bet is that hearing the correct shape a few
              times does more for it than any amount of explaining grammar.
            </p>
            <p>
              Two things in our game help here. First, Board Only mode: the app
              tracks each player&apos;s board and flips faces, while the
              questions happen out loud between two humans. Nothing on screen
              polices phrasing, so an adult can coach in real time. Second, the
              suggested-questions strip above the board offers up to six ready
              phrasings — &ldquo;Are they wearing a hat?&rdquo;, &ldquo;Do they
              have green eyes?&rdquo; — that a beginner can simply read aloud.
              Reading a correct question aloud is a much lower rung than
              inventing one, and it gives a beginner a model to copy until they
              can build their own — at which point you can switch the strip off.
            </p>
          </section>

          <section className="content-section">
            <h2>Skill Two: A Small, Repeatable Vocabulary Set</h2>
            <p>
              This is where the game earns its place in a language lesson. The
              entire board runs on about 22 describing words, and that&apos;s
              not an estimate — it&apos;s the trait list we built the characters
              from:
            </p>
            <p>
              Six hair colors (black, brown, blonde, red, gray, white). Four
              hair lengths (short, medium, long, bald). Three eye colors (brown,
              blue, green). Glasses, hat, facial hair. Five accessories
              (earrings, necklace, scarf, bowtie, headband). And smiling.
            </p>
            <div className="portrait-grid">
              <div className="portrait">
                <img
                  src="/characters/fiona.png"
                  alt="Fiona — long black hair, brown eyes, a hat, earrings and a necklace, not smiling"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Fiona</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/oscar.png"
                  alt="Oscar — bald, with facial hair, brown eyes and a necklace"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Oscar</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/luna.png"
                  alt="Luna — long white hair, blue eyes and earrings, smiling"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Luna</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/marco.png"
                  alt="Marco — short black hair, glasses, a hat and a bowtie, smiling"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Marco</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/tara.png"
                  alt="Tara — medium-length gray hair, green eyes, a hat and a headband"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Tara</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/ivan.png"
                  alt="Ivan — short blonde hair, blue eyes, a hat and a scarf, smiling"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Ivan</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/penny.png"
                  alt="Penny — short blonde hair, green eyes and glasses, smiling"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Penny</span>
              </div>
              <div className="portrait">
                <img
                  src="/characters/umar.png"
                  alt="Umar — short black hair, brown eyes, facial hair and a scarf, smiling"
                  width={200}
                  height={200}
                  loading="lazy"
                />
                <span>Umar</span>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem", color: "hsl(230, 10%, 55%)" }}>
              Eight of the 24. Between them they use nearly every describing
              word on the board — and Fiona alone needs six of them.
            </p>
            <p>
              A closed vocabulary set is exactly what a speaking drill wants.
              Every word is concrete, every word is visible on screen, and the
              same words come back turn after turn without anyone having to
              pretend a worksheet is fun. Count the reps: no game can end in
              much under five questions per player and most run a few more, so
              three rounds gives each learner somewhere around 15 to 24 spoken
              question forms, plus
              the same number of yes-or-no answers, plus the incidental talk when
              somebody argues about whether that&apos;s gray or white hair.
            </p>
            <p>
              One thing to know before you plan a lesson around a specific word:
              gray and white hair are two characters each, so the game&apos;s
              built-in suggestion merges them into &ldquo;Do they have gray or
              white hair?&rdquo; If you want those as separate vocabulary items,
              have students ask in their own words instead of tapping the
              suggestion. It&apos;s worth two minutes with the{" "}
              <Link href="/characters" style={{ color: "hsl(220, 83%, 68%)" }}>
                character gallery
              </Link>{" "}
              beforehand so you know which words the board will actually
              produce.
            </p>
          </section>

          <section className="content-section">
            <h2>Skill Three: A &ldquo;No&rdquo; Is Not a Failure</h2>
            <p>
              Elimination is the part that looks automatic to adults and
              isn&apos;t. A &ldquo;no&rdquo; can easily read to a young player
              as a miss — they asked, they missed, turn over. That reading is
              the thing to head off, and the reframe is the lesson: ask
              &ldquo;Are they
              smiling?&rdquo; on our board and 14 characters smile while 10
              don&apos;t, so a &ldquo;no&rdquo; is the <em>bigger</em>{" "}
              result.
              It clears 14 faces off the board in one move.
            </p>
            <p>
              Say that out loud the first few times and count the faces together
              as they flip. What you&apos;re teaching is that both answers carry
              information, which is a genuinely non-obvious idea and one that
              transfers well beyond a game. The board helps: the flipped-down
              faces are a visible memory of everything already ruled out, so a
              child who couldn&apos;t hold four facts in their head can still
              reason perfectly well by looking.
            </p>
          </section>

          <section className="content-section">
            <h2>Skill Four: Asking About Half</h2>
            <p>
              Here&apos;s the one worth building a lesson around. The tempting
              question is the one about the most eye-catching trait, and on our
              board that is often baldness. Oscar and Will are the only two bald
              characters, 2 out of 24, so the honest arithmetic is brutal: on
              average that question leaves you with about 20 faces still
              standing. Asking &ldquo;Do they look
              feminine?&rdquo; instead splits the board exactly 12 and 12, so
              whatever the answer, exactly half the faces come down.
            </p>
            <p>
              You can teach this without any special language at all. The
              suggestion bar in our game shows a live count —
              &ldquo;(24 characters remaining),&rdquo; then 12, then 7 — so
              after every answer you can ask one question: &ldquo;How many did
              that get rid of?&rdquo; The aim is to get players choosing
              questions by size instead of by interest. That is the entire
              lesson, and it needs no technical vocabulary at all.
            </p>
            <p>
              For your own benefit as the adult in the room: this is binary
              search. It&apos;s the same move as opening a dictionary in the
              middle, or the higher-or-lower guessing game with a number between
              1 and 100. Because each good question halves 24, a perfect game
              takes about 4.6 questions, and casual play tends to run far
              longer than that. The gap is made almost entirely of questions
              that barely narrow the board. Your students never need the term
              &ldquo;binary search&rdquo; to practice it, and if they meet it in
              a computing class years later, they&apos;ll already know how it
              feels.
            </p>
          </section>

          <section className="content-section">
            <h2>Adjusting the Rules by Age</h2>
            <p>
              <strong>Roughly under 7.</strong>{" "}
              Give two questions per turn.
              It halves the number of hand-offs, which is where attention
              actually leaks, and it means a slow question doesn&apos;t cost the
              whole turn. Play with both boards visible and narrate your own
              thinking out loud: &ldquo;I&apos;m going to ask about hats,
              because I count eight hats and that&apos;s a lot of faces.&rdquo;
              Losing the secrecy costs you nothing at this age; hearing an adult
              reason is the point.
            </p>
            <p>
              <strong>Roughly 7 to 10.</strong>{" "}
              Standard rules, one question per
              turn, and introduce the single house rule that matters: before you
              ask, does your question get rid of about half? Let them ask a bad
              one anyway — a wasted turn on the bowtie question (2 characters
              out of 24) teaches the idea better than a warning does.
            </p>
            <p>
              <strong>11 and up.</strong>{" "}
              Count questions out loud and set five
              as the target, since that&apos;s roughly the theoretical best.
              Then start bending the rules: our{" "}
              <Link
                href="/blog/guess-who-variations-and-house-rules"
                style={{ color: "hsl(220, 83%, 68%)" }}
              >
                variations and house rules
              </Link>{" "}
              page collects the rule tweaks we think are worth trying, and two
              of them look especially well suited to a classroom — a 10-question
              cap, which punishes exactly the habit you&apos;re trying to break,
              and 2v2 team mode, where all strategy talk has to happen out loud.
              Team mode is our pick for a language class, because the arguing{" "}
              <em>is</em>{" "}
              the exercise. Consider skipping the trait-swap
              variant with anyone under about ten; it runs on bluffing, which
              invites arguments about what was actually swapped.
            </p>
          </section>

          <section className="content-section">
            <h2>One Tablet, or Two Devices</h2>
            <p>
              <strong>One shared device:</strong>{" "}
              <Link href="/local" style={{ color: "hsl(220, 83%, 68%)" }}>
                Pass &amp; Play
              </Link>
              . Two players share one tablet or laptop, and a hand-off screen
              covers the board between turns so nobody sees the other side. This
              is the setup for a classroom with one tablet per pair, or for a
              kitchen table. The suggested-questions strip has its own on-off
              toggle here, which is a useful dial: leave it on for beginners and
              language learners, switch it off once you want students producing
              their own questions.
            </p>
            <p>
              <strong>Two devices:</strong>{" "}
              create a room from the{" "}
              <Link href="/" style={{ color: "hsl(220, 83%, 68%)" }}>
                home page
              </Link>{" "}
              and share the six-character code. Better for two tables across a
              room, for a computer lab, or for a kid playing a grandparent in
              another city. Whoever creates the room picks between two modes in
              the waiting screen: Board Only, where the app just tracks the
              board and the questions happen out loud, and With Questions, where
              they get typed and tapped inside the app. For anything
              language-related, choose Board Only — you want the words in the
              air, not in a text box.
            </p>
          </section>

          <section className="content-section">
            <h2>Fitting It Into a Class Period</h2>
            <p>
              Rounds are short. A well-played game is over in roughly five
              questions per player, which in practice is a handful of minutes; a
              first round with beginners still assembling their questions will
              take noticeably longer. So this works as a warm-up, as the five
              minutes at the end nobody planned for, or as one station in a
              rotation. Budget around twenty minutes for three rounds and a
              quick debrief.
            </p>
            <p>
              Two things to plan for. Expect noise: Board Only mode is a
              speaking activity by design, so a dozen pairs asking each other
              about hats will sound like exactly that. And rematches are
              instant, which means a pair who finish early can start another
              game rather than sit still; that&apos;s usually a feature, but
              decide in advance if it&apos;s what you want. If you need a hard
              stop, the
              question cap doubles as a timer: a 10-question game cannot run
              long.
            </p>
          </section>

          <section
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>What We Don&apos;t Know Yet</h2>
            <p>
              We should be straight with you about the limits of everything
              above: we have not run this game in a classroom, or with a group
              of children. We can tell you exactly what the board does
              mathematically, because we designed it and the data is published
              on our characters page. We cannot tell you what happens in a room
              with 28 kids in it and a bell about to ring, and we are not going
              to pretend otherwise.
            </p>
            <p>
              So if you run this with a real class or a real language group,
              we&apos;d genuinely like to hear about it through our{" "}
              <Link href="/contact" style={{ color: "hsl(220, 83%, 68%)" }}>
                contact page
              </Link>
              . The specifics are what help: the age or level, which adjustment
              you changed and what it fixed, which trait words gave your
              learners trouble, and anything that fell apart. We&apos;ve
              considered building a younger-players toggle — two questions per
              turn, larger tiles, the suggestion strip on by default — and a
              printable trait vocabulary sheet to hand out before a lesson. We
              don&apos;t want to build either one from guesswork about
              classrooms we&apos;ve never sat in.
            </p>
          </section>

          <AuthorBio />
        </div>
        <Footer />
      </main>
    </>
  );
}
