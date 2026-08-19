import Link from "next/link";

/** Site-wide header navigation shown on content pages and the homepage. */
export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="header-logo">
        <span aria-hidden="true">🎭</span> Guess Who Online
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        <Link href="/how-to-play">How to Play</Link>
        <Link href="/characters">Characters</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/" className="nav-cta">
          Play Free
        </Link>
      </nav>
    </header>
  );
}
