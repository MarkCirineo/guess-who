import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "The History of Guess Who: From 1979 Board Game to Online — Guess Who Online",
  description:
    "Trace the evolution of Guess Who from its origins at Milton Bradley in 1979 through Hasbro's ownership to the modern online versions of today.",
};

export default function HistoryArticle() {
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

        <h1>The History of Guess Who: From 1979 Board Game to Online</h1>
        <p
          style={{
            color: "hsl(230, 10%, 50%)",
            fontSize: "0.8rem",
            marginBottom: "2rem",
          }}
        >
          Published July 2, 2026 · 4 min read
        </p>

        <section className="content-section">
          <p>
            Guess Who is one of the most recognizable board games in the
            world. For nearly five decades, it has been a staple of family
            game nights, school classrooms, and casual hangouts. But how did
            a simple deduction game with flip-up character frames become a
            global icon? Let&apos;s trace its journey from a 1979 tabletop
            invention to the online versions played today.
          </p>
        </section>

        <section className="content-section">
          <h2>The Origins (1979)</h2>
          <p>
            Guess Who was created by Ora and Theo Coster, an Israeli husband
            and wife team of game designers who operated under the name
            Theora Design. The Costers were prolific inventors — they created
            over 150 games during their careers — but Guess Who became their
            most famous creation by far.
          </p>
          <p>
            The game was originally published by Milton Bradley in 1979. The
            concept was elegantly simple: two players each had an identical
            board of 24 character portraits on hinged plastic frames. Each
            player secretly selected a character card, and then took turns
            asking yes-or-no questions about physical traits to narrow down
            the possibilities. When you eliminated a character, you flipped
            their frame down.
          </p>
          <p>
            What made the game special was its accessibility. The rules were
            simple enough for children as young as six, but the deduction
            mechanics kept older players engaged. It was a two-player game in
            a market dominated by party games and multi-player affairs, giving
            it a unique niche.
          </p>
        </section>

        <section className="content-section">
          <h2>The Milton Bradley Era (1980s–1990s)</h2>
          <p>
            Guess Who quickly became one of Milton Bradley&apos;s flagship
            titles. It sold millions of copies worldwide and became a fixture
            in households across North America, Europe, and beyond. The
            original character set — with its distinctive big noses, wild
            hairstyles, hats, and glasses — became iconic. Characters like
            &quot;Tom,&quot; &quot;Maria,&quot; and &quot;Bernard&quot; were
            recognized by an entire generation.
          </p>
          <p>
            The game entered pop culture, getting referenced in TV shows,
            movies, and comedy sketches. Its simple premise made it easy to
            parody and riff on. During the 1990s, themed editions started
            appearing — Disney characters, Marvel superheroes, and other
            licensed versions brought fresh faces to the game while keeping
            the core mechanics intact.
          </p>
        </section>

        <section className="content-section">
          <h2>Hasbro Takes Over (1998–Present)</h2>
          <p>
            Hasbro had acquired Milton Bradley back in 1984, but continued
            using the Milton Bradley brand name for many years. By 1998,
            Hasbro fully consolidated its brands, and Guess Who officially
            became a Hasbro product. New editions followed with updated
            character designs, refreshed artwork, and modernized packaging.
          </p>
          <p>
            The core gameplay, however, remained virtually unchanged — a
            testament to how well-designed the original concept was. The
            24-character format, the flip-up frames, and the yes-or-no
            question structure survived every iteration. When a game mechanic
            works this well for this long, you don&apos;t fix what
            isn&apos;t broken.
          </p>
        </section>

        <section className="content-section">
          <h2>The Diversity Update (2014)</h2>
          <p>
            In 2014, Hasbro faced growing criticism that the original Guess
            Who character set lacked diversity. The classic edition featured
            predominantly white, male characters — only 5 out of 24 were
            women in some versions. After public pressure and media coverage,
            Hasbro updated the character roster to include characters of
            different ethnicities, ages, and styles.
          </p>
          <p>
            The update was well-received. The game became more inclusive and
            representative of its global player base while keeping the same
            fundamental deduction mechanics that made it a classic. Modern
            editions continue to reflect this diversity, ensuring every
            player can see themselves in the game.
          </p>
        </section>

        <section className="content-section">
          <h2>Going Digital</h2>
          <p>
            As gaming moved online, Guess Who followed. Mobile apps brought
            the game to smartphones, and browser-based versions made it
            playable from any device. Online adaptations added features the
            physical game never had: real-time multiplayer with players
            across the world, automatic character tracking, and instant
            rematches without reshuffling cards.
          </p>
          <p>
            Our version at{" "}
            <Link href="/" style={{ color: "hsl(220, 83%, 68%)" }}>
              playguesswho.net
            </Link>{" "}
            continues this tradition. It&apos;s free, instant, and playable
            from any device — keeping the spirit of the original while
            removing the barriers of needing a physical board, being in the
            same room, or even owning the game. Create a room, share a code,
            and you&apos;re playing in seconds.
          </p>
        </section>

        <section className="content-section">
          <h2>A Game That Endures</h2>
          <p>
            Few board games have remained as consistently popular as Guess
            Who. Its genius lies in its simplicity — the rules can be
            explained in 30 seconds, but the strategic depth of choosing
            optimal questions keeps experienced players coming back. From
            Ora and Theo Coster&apos;s original design in 1979 to the
            digital versions played today, the core experience remains the
            same: two players, 24 faces, and one question at a time.
          </p>
          <p
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: "hsla(220, 83%, 58%, 0.06)",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              color: "hsl(230, 10%, 55%)",
              fontStyle: "italic",
            }}
          >
            Guess Who is a trademark of Hasbro, Inc. This site is an
            independent fan project and is not affiliated with, endorsed by,
            or sponsored by Hasbro.
          </p>
        </section>

        <section
          className="content-section"
          style={{ borderBottom: "none", paddingBottom: 0 }}
        >
          <h2>Continue the Tradition</h2>
          <p>
            Ready to be part of the next chapter?{" "}
            <Link href="/" style={{ color: "hsl(220, 83%, 68%)" }}>
              Play Guess Who Online
            </Link>{" "}
            — it&apos;s free, no sign-up required. The game that started on
            kitchen tables in 1979 is now just a click away.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
