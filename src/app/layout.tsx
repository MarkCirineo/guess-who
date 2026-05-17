import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guess Who Online — Play with Friends",
  description:
    "Play the classic Guess Who board game online with friends. Create a room, share the code, and start guessing!",
  keywords: ["guess who", "board game", "multiplayer", "online game"],
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
      </head>
      <body className="bg-animated">{children}</body>
    </html>
  );
}
