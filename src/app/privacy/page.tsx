import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Guess Who Online",
  description:
    "Privacy policy for Guess Who Online. Learn how we handle your data, cookies, and third-party services.",
};

export default function PrivacyPolicy() {
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

        <h1>Privacy Policy</h1>
        <p
          style={{
            color: "hsl(230, 10%, 50%)",
            fontSize: "0.8rem",
            marginBottom: "2rem",
          }}
        >
          Last updated: June 21, 2026
        </p>

        <Section title="Overview">
          <p>
            Guess Who Online is a free multiplayer browser game. We are committed
            to keeping your experience simple and your data minimal. This policy
            explains what information is collected and how it is used.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>
            <strong>Player Name.</strong>{" "}When you create or join a game, you
            enter a display name. This name is stored temporarily in your
            browser&apos;s session storage and shared with other players in your
            game room. It is not saved to any database and is lost when you close
            the tab.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>No Accounts.</strong> We do not require registration, email
            addresses, passwords, or any personally identifiable information.
          </p>
        </Section>

        <Section title="Cookies & Advertising">
          <p>
            We use <strong>Google AdSense</strong> to display advertisements.
            Google may use cookies and similar technologies to serve ads based on
            your prior visits to this site or other websites. You can opt out of
            personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              Google Ads Settings
            </a>
            .
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            For more information on how Google uses data, see{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              How Google uses information from sites that use its services
            </a>
            .
          </p>
        </Section>

        <Section title="Analytics">
          <p>
            We use a privacy-focused analytics tool to understand general usage
            patterns (e.g., page views, visitor counts). This tool does not use
            cookies and does not collect personally identifiable information.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>The following third-party services are used on this site:</p>
          <ul
            style={{
              marginTop: "0.5rem",
              paddingLeft: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
            }}
          >
            <li>
              <strong>Google AdSense</strong> — advertising and cookies
            </li>
            <li>
              <strong>Umami Analytics</strong> — privacy-focused, cookieless
              analytics
            </li>
          </ul>
        </Section>

        <Section title="Children's Privacy">
          <p>
            This site is a casual game that does not knowingly collect personal
            information from children under 13. Since no accounts or personal
            data are required, children can play without submitting any
            identifying information.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this policy from time to time. Changes will be
            reflected on this page with an updated date.
          </p>
        </Section>

        <Section title="Contact Us" last>
          <p>
            If you have any questions or concerns about this privacy policy,
            please reach out to us at{" "}
            <a
              href="mailto:contact@playguesswho.net"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              contact@playguesswho.net
            </a>
            . You can also visit our{" "}
            <Link
              href="/contact"
              style={{ color: "hsl(220, 83%, 68%)" }}
            >
              contact page
            </Link>{" "}
            for more ways to get in touch.
          </p>
        </Section>
      </div>

      <Footer />
    </main>
  );
}

function Section({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      style={{
        marginBottom: last ? 0 : "1.75rem",
        paddingBottom: last ? 0 : "1.75rem",
        borderBottom: last ? "none" : "1px solid hsl(230, 15%, 20%)",
      }}
    >
      <h2
        style={{
          fontSize: "1.05rem",
          fontWeight: 700,
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: "hsl(230, 10%, 65%)",
          fontSize: "0.9rem",
          lineHeight: 1.7,
        }}
      >
        {children}
      </div>
    </section>
  );
}
