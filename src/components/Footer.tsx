import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-column">
          <h3>Play</h3>
          <ul>
            <li>
              <Link href="/">Play Online</Link>
            </li>
            <li>
              <Link href="/how-to-play">How to Play</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Info</h3>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <a
                href="https://buymeacoffee.com/arcadekit"
                target="_blank"
                rel="noopener"
                id="bmc-footer-link"
              >
                ☕ Buy Me a Coffee
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Guess Who Online</span>
        <span>
          A game from{" "}
          <a
            href="https://arcadekit.games"
            target="_blank"
            rel="noopener"
            id="arcadekit-footer-link"
          >
            ArcadeKit
          </a>
          {" · "}
          <a
            href="https://arcadekit.games"
            target="_blank"
            rel="noopener"
            id="arcadekit-footer-more"
          >
            More Games →
          </a>
        </span>
      </div>
    </footer>
  );
}
