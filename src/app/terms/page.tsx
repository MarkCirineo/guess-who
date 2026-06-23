import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Guess Who Online",
  description:
    "Terms of Service for Guess Who Online. Read the rules, disclaimers, and conditions that govern your use of our free multiplayer browser game.",
};

export default function TermsOfService() {
  return (
    <main className="content-page">
      <div className="content-card glass animate-slide-in" style={{ padding: "2.5rem" }}>
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

        <h1>Terms of Service</h1>
        <p style={{ color: "hsl(230, 10%, 50%)", fontSize: "0.8rem", marginBottom: "2rem" }}>
          Last updated: June 21, 2026
        </p>

        <section className="content-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Guess Who Online (&quot;the Service&quot;), available at
            playguesswho.net, you agree to be bound by these Terms of Service
            (&quot;Terms&quot;). If you do not agree with any part of these Terms, you
            must discontinue use of the Service immediately. These Terms apply to all
            visitors, players, and anyone else who accesses or uses the Service,
            regardless of whether they are actively playing a game or simply browsing
            the site.
          </p>
        </section>

        <section className="content-section">
          <h2>2. Description of Service</h2>
          <p>
            Guess Who Online is a free, browser-based multiplayer game inspired by the
            classic board game. The Service allows two players to play against each
            other in real-time by creating or joining game rooms using unique room
            codes. No accounts, downloads, or installations are required — players
            simply choose a display name, create or join a room, and begin playing
            immediately.
          </p>
          <p>
            Games are conducted entirely within the browser. Each player is secretly
            assigned a character, and players take turns asking yes-or-no questions to
            narrow down their opponent&apos;s character. The Service also offers a local
            pass-and-play mode for players sharing a single device. We reserve the
            right to modify, suspend, or discontinue any aspect of the Service at any
            time without prior notice.
          </p>
        </section>

        <section className="content-section">
          <h2>3. User Conduct</h2>
          <p>
            When using the Service, you agree to behave respectfully toward other
            players and to use the Service only for its intended purpose. Specifically,
            you agree not to:
          </p>
          <ul style={{ marginTop: "0.5rem" }}>
            <li>
              Use offensive, discriminatory, or otherwise inappropriate display names
              or language during gameplay.
            </li>
            <li>
              Attempt to exploit, hack, reverse-engineer, or interfere with the
              Service, its servers, or its underlying infrastructure in any way.
            </li>
            <li>
              Use automated scripts, bots, or other tools to interact with the Service
              in an unauthorized manner.
            </li>
            <li>
              Deliberately disrupt the gameplay experience for other players, including
              but not limited to stalling, spamming, or intentionally disconnecting
              from games.
            </li>
            <li>
              Use the Service for any unlawful purpose or in violation of any
              applicable local, national, or international law.
            </li>
          </ul>
          <p>
            We reserve the right to restrict access to the Service for any user who
            violates these guidelines, at our sole discretion and without prior notice.
          </p>
        </section>

        <section className="content-section">
          <h2>4. Intellectual Property</h2>
          <p>
            The game, its visual design, original character artwork, user interface, and
            underlying source code are the property of Guess Who Online and its
            creators. You may not reproduce, distribute, modify, or create derivative
            works from any part of the Service without explicit written permission.
          </p>
          <p>
            <strong>Trademark Disclaimer:</strong> &quot;Guess Who&quot; is a registered
            trademark of Hasbro, Inc. Guess Who Online is an independent, fan-made
            project created for entertainment purposes. It is not affiliated with,
            endorsed by, or sponsored by Hasbro, Inc. in any way. All trademarks
            referenced on this site remain the property of their respective owners.
          </p>
        </section>

        <section className="content-section">
          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an &quot;as is&quot; and &quot;as available&quot;
            basis without warranties of any kind, whether express or implied, including
            but not limited to implied warranties of merchantability, fitness for a
            particular purpose, or non-infringement. We do not guarantee that the
            Service will be uninterrupted, error-free, secure, or available at any
            particular time. Game sessions may be lost due to network issues, server
            maintenance, or other technical factors beyond our control.
          </p>
        </section>

        <section className="content-section">
          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Guess Who Online, its
            creators, and its contributors shall not be held liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or
            related to your use of the Service. This includes, without limitation,
            damages for loss of data, loss of profits, or any other intangible losses,
            even if we have been advised of the possibility of such damages. Your sole
            remedy for dissatisfaction with the Service is to stop using it.
          </p>
        </section>

        <section className="content-section">
          <h2>7. Third-Party Services</h2>
          <p>
            The Service integrates the following third-party services to support its
            operation:
          </p>
          <ul style={{ marginTop: "0.5rem" }}>
            <li>
              <strong>Google AdSense</strong> — used to display advertisements on the
              site. Google may use cookies and similar tracking technologies to serve
              ads based on your browsing activity. For more information, see{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                how Google uses data from partner sites
              </a>
              .
            </li>
            <li>
              <strong>Umami Analytics</strong> — a privacy-focused, cookieless analytics
              tool used to collect anonymous usage statistics such as page views and
              visitor counts. No personally identifiable information is collected
              through this service.
            </li>
          </ul>
          <p>
            We are not responsible for the practices or policies of these third-party
            services. We encourage you to review their respective privacy policies for
            more details on how they handle your information.
          </p>
        </section>

        <section className="content-section">
          <h2>8. Changes to These Terms</h2>
          <p>
            We reserve the right to update or modify these Terms at any time at our sole
            discretion. When changes are made, we will update the &quot;Last
            updated&quot; date at the top of this page. Your continued use of the
            Service after any such changes constitutes your acceptance of the revised
            Terms. We encourage you to review this page periodically to stay informed
            about the conditions governing your use of the Service.
          </p>
        </section>

        <section className="content-section">
          <h2>9. Contact</h2>
          <p>
            If you have any questions, concerns, or feedback regarding these Terms of
            Service, please contact us at{" "}
            <a href="mailto:contact@playguesswho.net">contact@playguesswho.net</a>. We
            will make reasonable efforts to respond to inquiries in a timely manner.
          </p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
