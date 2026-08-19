import Link from "next/link";

/** "About the author" block shown at the end of every article. */
export default function AuthorBio() {
  return (
    <div className="author-bio">
      <span className="author-avatar" aria-hidden="true">
        🎭
      </span>
      <p>
        <span className="bio-name">About the PlayGuessWho Team</span>
        We build and run Guess Who Online. We designed the game&apos;s 24
        original characters and built its real-time multiplayer engine. Our
        strategy articles are computed from the actual character data behind
        the game, and we explain how we get our numbers in our{" "}
        <Link href="/editorial-policy">editorial policy</Link>. We also run{" "}
        <a href="https://arcadekit.games" target="_blank" rel="noopener">
          ArcadeKit
        </a>
        , a small collection of free browser games. Read more{" "}
        <Link href="/about">about the project</Link>{" "}
        or{" "}
        <Link href="/contact">get in touch</Link>.
      </p>
    </div>
  );
}
