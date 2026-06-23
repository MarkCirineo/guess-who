import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { characters } from "@/lib/characters";

export const metadata: Metadata = {
  title: "How to Play Guess Who Online — Rules, Characters & Strategy",
  description:
    "Learn how to play Guess Who Online with our complete guide. Game rules, all 24 characters and their traits, strategy tips, and frequently asked questions.",
};

export default function HowToPlay() {
  return (
    <main className="content-page">
      <div
        className="content-card glass animate-slide-in"
        style={{ padding: "2.5rem" }}
      >
        <Link
          href="/"
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
          ← Back to Home
        </Link>

        <h1>How to Play Guess Who Online</h1>
        <p style={{ color: "hsl(230, 10%, 65%)", marginBottom: "2rem" }}>
          Everything you need to know to play, win, and have fun — whether
          you&apos;re a first-timer or a seasoned board game fan.
        </p>

        {/* What is Guess Who Online */}
        <section className="content-section">
          <h2>What is Guess Who Online?</h2>
          <p>
            Guess Who Online is a free, browser-based version of the classic
            board game Guess Who. Two players each receive a secret character
            from a shared board of 24 unique characters. The goal is simple: be
            the first to figure out your opponent&apos;s secret character by
            asking yes-or-no questions and using the answers to eliminate
            characters from your board.
          </p>
          <p>
            Unlike the physical board game, our online version lets you play
            with anyone, anywhere in the world. No app downloads, no account
            creation — just share a room code with a friend and start playing
            in seconds.
          </p>
        </section>

        {/* Game Modes */}
        <section className="content-section">
          <h2>Game Modes</h2>

          <h3 style={{ marginTop: "0.75rem" }}>🌐 Online Multiplayer</h3>
          <p>
            Play with a friend remotely. One player creates a room and receives
            a unique 6-letter code. The other player enters that code to join.
            You can play in <strong>Board Only</strong> mode if you&apos;re on a
            voice call together, or use the built-in <strong>turn-based
            question system</strong> where you take turns asking questions and
            the game tracks answers for you.
          </p>

          <h3 style={{ marginTop: "1rem" }}>📱 Local Pass &amp; Play</h3>
          <p>
            Share a single device with a friend. The game handles the
            &quot;pass the phone&quot; flow — after each player takes their
            turn, a transition screen appears so you can hand the device to your
            opponent without seeing their board. Perfect for road trips, waiting
            rooms, or anytime you&apos;re sitting next to each other.
          </p>
        </section>

        {/* How to Start */}
        <section className="content-section">
          <h2>Getting Started</h2>

          <h3 style={{ marginTop: "0.75rem" }}>Creating a Game (Online)</h3>
          <ol style={{ marginTop: "0.5rem" }}>
            <li>
              Go to the <Link href="/">home page</Link> and click{" "}
              <strong>Create Game</strong>.
            </li>
            <li>Enter your display name (this is what your opponent sees).</li>
            <li>
              You&apos;ll be placed in a waiting room with a unique room code
              displayed on screen.
            </li>
            <li>
              Share the room code with your friend via text, Discord, or
              however you communicate.
            </li>
            <li>
              Once your friend joins, choose your game mode and the match begins
              automatically.
            </li>
          </ol>

          <h3 style={{ marginTop: "1rem" }}>Joining a Game (Online)</h3>
          <ol style={{ marginTop: "0.5rem" }}>
            <li>
              Click <strong>Join Game</strong> on the home page.
            </li>
            <li>Enter your name and the room code from your friend.</li>
            <li>You&apos;ll connect instantly and the game is ready to go.</li>
          </ol>

          <h3 style={{ marginTop: "1rem" }}>Starting a Local Game</h3>
          <ol style={{ marginTop: "0.5rem" }}>
            <li>
              Click <strong>Local Pass &amp; Play</strong> on the home page.
            </li>
            <li>Enter names for both Player 1 and Player 2.</li>
            <li>
              Each player will be secretly assigned a character — the game
              handles showing and hiding boards between turns.
            </li>
          </ol>
        </section>

        {/* How a Turn Works */}
        <section className="content-section">
          <h2>How a Turn Works</h2>
          <p>
            Each turn follows a simple loop: ask a question, process the answer,
            and then either eliminate characters or make your final guess.
          </p>

          <h3 style={{ marginTop: "0.75rem" }}>1. Ask a Yes-or-No Question</h3>
          <p>
            On your turn, ask your opponent a question about their secret
            character. Questions must be answerable with a simple
            &quot;yes&quot; or &quot;no.&quot; Good questions target specific
            traits: &quot;Do they wear glasses?&quot;, &quot;Do they have red
            hair?&quot;, &quot;Are they wearing a hat?&quot;
          </p>

          <h3 style={{ marginTop: "1rem" }}>2. Eliminate Characters</h3>
          <p>
            Based on the answer, tap or click on characters to cross them out.
            If you asked &quot;Do they have glasses?&quot; and the answer was
            &quot;No,&quot; you can eliminate every character who wears glasses.
            Crossed-out characters become dimmed on your board so you can focus
            on the remaining possibilities.
          </p>

          <h3 style={{ marginTop: "1rem" }}>3. Make Your Final Guess</h3>
          <p>
            When you think you know who your opponent&apos;s character is, make
            a final guess. Be careful — if you guess wrong, you lose the game
            immediately! Only guess when you&apos;re confident you&apos;ve
            narrowed it down to one character.
          </p>
        </section>

        {/* All 24 Characters */}
        <section className="content-section">
          <h2>All 24 Characters &amp; Their Traits</h2>
          <p>
            Every game features the same 24 characters, each with a unique
            combination of physical traits. Knowing these traits is key to
            asking effective questions. Here&apos;s the complete reference:
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

        {/* Strategy Tips */}
        <section className="content-section">
          <h2>Strategy Tips</h2>

          <h3 style={{ marginTop: "0.75rem" }}>
            Start Broad, Then Narrow Down
          </h3>
          <p>
            The best opening questions eliminate roughly half the board. For
            example, &quot;Do they look feminine?&quot; splits the 24 characters
            almost evenly (12 and 12). Avoid hyper-specific questions early on
            like &quot;Do they wear a bowtie?&quot; — that only applies to 2
            characters, so a &quot;No&quot; answer barely helps.
          </p>

          <h3 style={{ marginTop: "1rem" }}>Use Hair Color Early</h3>
          <p>
            Hair color is one of the most useful traits because it has many
            possible values (black, brown, blonde, red, gray, white). Asking
            about hair color can quickly narrow your board by 4-6 characters
            in a single question.
          </p>

          <h3 style={{ marginTop: "1rem" }}>Track What You&apos;ve Learned</h3>
          <p>
            The game automatically dims eliminated characters, but it helps to
            think about what traits the remaining characters share. If all your
            remaining characters have short hair, you don&apos;t need to ask
            about hair length — move on to something that actually splits the
            remaining group.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            Don&apos;t Guess Too Early
          </h3>
          <p>
            A wrong final guess ends the game instantly. Even if you think you
            know the answer, consider asking one more question to confirm. The
            cost of an extra turn is much lower than the cost of guessing wrong.
            Ideally, only make your final guess when you&apos;ve narrowed it
            down to a single character.
          </p>

          <h3 style={{ marginTop: "1rem" }}>Pay Attention to Accessories</h3>
          <p>
            Accessories like earrings, necklaces, bowties, scarves, and
            headbands are often overlooked but can be powerful eliminators.
            &quot;Do they have any accessories?&quot; is a strong question
            since it splits the board into a meaningful group.
          </p>
        </section>

        {/* FAQ */}
        <section className="content-section">
          <h2>Frequently Asked Questions</h2>

          <h3 style={{ marginTop: "0.75rem" }}>
            Do I need to create an account?
          </h3>
          <p>
            No. Guess Who Online requires no sign-up, no email, and no
            password. Just enter a display name and play.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            Is it free?
          </h3>
          <p>
            Yes, completely free. The game is supported by non-intrusive
            advertising.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            Can I play on my phone?
          </h3>
          <p>
            Absolutely. The game is fully responsive and works on phones,
            tablets, and desktop browsers. No app download needed — just open
            the site in your browser.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            What happens if I lose connection?
          </h3>
          <p>
            If you temporarily lose your internet connection, the game will
            attempt to reconnect you automatically. If reconnection fails, you
            may need to rejoin the room using the same room code.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            How many characters are in the game?
          </h3>
          <p>
            There are 24 unique characters, each with their own distinct
            combination of traits like hair color, eye color, glasses, hats,
            facial hair, and accessories. See the full character table above
            for details.
          </p>

          <h3 style={{ marginTop: "1rem" }}>
            Can I play with more than two players?
          </h3>
          <p>
            Guess Who is designed as a two-player game. Each room supports
            exactly two players, staying true to the original board game
            format.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
