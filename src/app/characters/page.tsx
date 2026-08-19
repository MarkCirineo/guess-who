import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorByline from "@/components/AuthorByline";
import AuthorBio from "@/components/AuthorBio";
import JsonLd from "@/components/JsonLd";
import { characters } from "@/lib/characters";
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "All 24 Guess Who Online Characters — Traits, Stats & Analysis",
  description:
    "Meet all 24 original Guess Who Online characters. Full trait reference — hair color, eyes, glasses, hats, accessories — plus analysis of how the roster is balanced for fair questions.",
  path: "/characters",
  ogType: "article",
});

export default function CharactersPage() {
  return (
    <>
      <Header />
      <main className="content-page">
        <JsonLd
          data={[
            articleJsonLd({
              title: "All 24 Guess Who Online Characters — Traits, Stats & Analysis",
              description:
                "Full reference for the 24 original Guess Who Online characters and how their traits are balanced.",
              path: "/characters",
              published: "2026-07-30",
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Characters", path: "/characters" },
            ]),
          ]}
        />
        <div
          className="content-card glass animate-slide-in"
          style={{ padding: "2.5rem" }}
        >
          <h1>Meet All 24 Characters</h1>
          <AuthorByline published="2026-07-30" readTime="8 min read" />

          <section className="content-section">
            <p>
              Every game of Guess Who Online is played on the same board of 24
              characters. When we built the game, we made a deliberate choice
              not to copy the classic Hasbro cast — partly because the artwork
              belongs to Hasbro, and partly because designing our own roster
              meant we could balance the traits mathematically so that no
              question is ever useless. None of the faces here are
              Hasbro&apos;s — the whole roster is original to this game.
            </p>
            <p>
              This page is the complete reference: every character, every
              trait, and some honest analysis of how the roster is balanced —
              including the numbers we used when designing it. If you&apos;re
              trying to sharpen your question strategy, this is the data to
              study before reading the{" "}
              <Link href="/blog/best-questions-to-ask-in-guess-who">
                question rankings
              </Link>
              .
            </p>
          </section>

          <section className="content-section">
            <h2>The Full Roster</h2>
            <div className="portrait-grid">
              {characters.map((c) => (
                <div className="portrait" key={c.id}>
                  <img
                    src={c.avatar}
                    alt={`${c.name} — ${c.attributes.hairLength === "bald" ? "bald" : `${c.attributes.hairColor} ${c.attributes.hairLength} hair`}, ${c.attributes.eyeColor} eyes${c.attributes.glasses ? ", glasses" : ""}${c.attributes.hat ? ", hat" : ""}${c.attributes.facialHair ? ", facial hair" : ""}`}
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="content-section">
            <h2>How the Roster Is Balanced</h2>
            <p>
              A Guess Who board lives or dies by its trait distribution. If a
              trait is too rare, questions about it are wasted turns; if
              it&apos;s too common, the answer barely narrows anything down.
              The ideal question splits the board exactly in half — so we
              designed the roster around a few near-perfect splits:
            </p>
            <ul style={{ marginTop: "0.75rem" }}>
              <li>
                <strong>Gender presentation: 12 vs 12.</strong> A perfect
                half-split, and the reason &quot;Do they look feminine?&quot;
                is the mathematically strongest opening question on this
                board.
              </li>
              <li>
                <strong>Smiling: 14 vs 10.</strong> Close to even, and easy
                to skip past when you&apos;re scanning a board for glasses
                and hats — which is exactly what makes it a strong,
                under-used opener.
              </li>
              <li>
                <strong>Accessories: 15 with, 9 without.</strong> Earrings,
                necklaces, bowties, scarves, and headbands add up faster than
                players expect.
              </li>
              <li>
                <strong>Glasses: 8 · Hats: 8 · Facial hair: 7.</strong> The
                classic questions each hit roughly a third of the board —
                useful, but not as strong as they feel.
              </li>
            </ul>
            <p>
              Hair color is deliberately spread across six values — black
              (6), brown (6), blonde (4), red (4), gray (2), and white (2) —
              so hair questions stay useful deep into the game. Eye color
              runs brown (11), blue (7), green (6). Hair length is short
              (10), medium (7), long (5), with exactly two bald characters.
            </p>
          </section>

          <section className="content-section">
            <h2>The Rare Traits (and Why They Matter)</h2>
            <p>
              Rare traits are terrible opening questions and brilliant
              closing ones. Once you&apos;re down to a handful of candidates,
              one rare-trait question can settle the game:
            </p>
            <ul style={{ marginTop: "0.75rem" }}>
              <li>
                <strong>Bowties (2):</strong> only Ethan and Marco wear one.
              </li>
              <li>
                <strong>Headbands (2):</strong> Hannah and Tara.
              </li>
              <li>
                <strong>Bald (2):</strong> Oscar and Will — a &quot;yes&quot;
                to &quot;Are they bald?&quot; late in the game is usually
                checkmate.
              </li>
              <li>
                <strong>White hair (2):</strong> Luna and Xena.{" "}
                <strong>Gray hair (2):</strong> George and Tara.
              </li>
              <li>
                <strong>Double accessories (2):</strong> Fiona and Rosa each
                wear two.
              </li>
            </ul>
            <p>
              Our favorite corner case in the data: Marco is the only
              character on the board wearing glasses, a hat, <em>and</em> an
              accessory at once — three separate &quot;yes&quot; answers that
              each point straight at him. Fiona carries three visible extras
              too (a hat plus earrings and a necklace, tying Rosa for the
              most accessories on the board), which makes both of them
              unusually fast to isolate once one of those questions comes
              back &quot;yes&quot;.
            </p>
          </section>

          <section className="content-section">
            <h2>Complete Trait Reference</h2>
            <p>
              The full data behind every character. This is the same table
              the game uses internally — nothing hidden:
            </p>
            <div style={{ overflowX: "auto", marginTop: "1rem" }}>
              <table className="trait-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Hair</th>
                    <th>Length</th>
                    <th>Eyes</th>
                    <th>Glasses</th>
                    <th>Hat</th>
                    <th>Facial Hair</th>
                    <th>Smiling</th>
                    <th>Accessories</th>
                  </tr>
                </thead>
                <tbody>
                  {characters.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600, color: "hsl(0, 0%, 90%)" }}>
                        {c.name}
                      </td>
                      <td>{c.attributes.hairColor}</td>
                      <td>{c.attributes.hairLength}</td>
                      <td>{c.attributes.eyeColor}</td>
                      <td>{c.attributes.glasses ? "✓" : "—"}</td>
                      <td>{c.attributes.hat ? "✓" : "—"}</td>
                      <td>{c.attributes.facialHair ? "✓" : "—"}</td>
                      <td>{c.attributes.smile ? "✓" : "—"}</td>
                      <td>
                        {c.attributes.accessories.length > 0
                          ? c.attributes.accessories.join(", ")
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="content-section">
            <h2>Design Notes</h2>
            <p>
              A few principles behind the roster. First, distinctiveness at
              small sizes matters more than detail — on a phone screen each
              portrait is barely a centimeter wide, so
              silhouettes, hair shapes, and strong color contrasts do the
              heavy lifting. Second, the roster needed to look like the
              people who actually play: the 24 characters span a range of
              ages, skin tones, and styles, which the original 1979 board
              famously did not (Hasbro themselves{" "}
              <Link href="/blog/history-of-guess-who">
                updated the official cast in 2014
              </Link>{" "}
              for the same reason). Third, no trait was allowed to sit at the
              extremes: the rarest values on the board — bowties, headbands,
              bald heads, gray hair, white hair — still appear exactly twice,
              so a rare-trait question is always a real question rather than
              a dead end.
            </p>
          </section>

          <section
            className="content-section"
            style={{ borderBottom: "none", paddingBottom: 0 }}
          >
            <h2>Put the Data to Work</h2>
            <p>
              Now that you know the board,{" "}
              <Link href="/">play a game online</Link> or read{" "}
              <Link href="/blog/how-to-win-at-guess-who">
                the strategy guide
              </Link>{" "}
              to turn these numbers into wins. For the quick version: open
              with the 12–12 gender split, follow with hair color, and save
              the rare traits for the endgame.
            </p>
          </section>

          <AuthorBio />
        </div>

        <Footer />
      </main>
    </>
  );
}
