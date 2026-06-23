import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://playguesswho.net"),
  title: "Guess Who Online — Play with Friends",
  description:
    "Play the classic Guess Who board game online with friends. Create a room, share the code, and start guessing!",
  keywords: ["guess who", "board game", "multiplayer", "online game"],
  openGraph: {
    title: "Guess Who Online — Play with Friends",
    description:
      "Play the classic Guess Who board game online with friends. No downloads, no accounts — just create a room and play.",
    siteName: "Guess Who Online",
    type: "website",
    url: "https://playguesswho.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guess Who Online — Play with Friends",
    description:
      "The classic board game, now playable online with friends anywhere. Free, no sign-up required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          src="https://analytics.markcirineo.com/script.js"
          data-website-id="806d2232-74df-4f1a-9460-2dbebbfe3955"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8147469409497186"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-animated">{children}</body>
    </html>
  );
}
