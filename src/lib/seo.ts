import type { Metadata } from "next";

export const SITE_URL = "https://playguesswho.net";
export const SITE_NAME = "Guess Who Online";
export const AUTHOR = {
  "@type": "Organization",
  name: "PlayGuessWho Team",
  description:
    "The team that builds and runs Guess Who Online, including its 24 original characters and real-time multiplayer engine.",
  url: `${SITE_URL}/about`,
} as const;

export const ORGANIZATION = {
  "@type": "Organization",
  name: "ArcadeKit",
  url: "https://arcadekit.games",
} as const;

/** Publisher block used by Article schema, with the editorial policy linked. */
export const PUBLISHER = {
  ...ORGANIZATION,
  publishingPrinciples: `${SITE_URL}/editorial-policy`,
} as const;

/**
 * Builds page-level metadata with a canonical URL and page-specific
 * Open Graph / Twitter tags (instead of inheriting the homepage defaults).
 */
export function pageMetadata({
  title,
  description,
  path,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: ogType,
      // Explicit because a page-level openGraph object replaces the
      // root-resolved one (which carried the file-convention image).
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

/** JSON-LD builder: Article schema for blog posts. */
export function articleJsonLd({
  title,
  description,
  path,
  published,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    datePublished: published,
    dateModified: updated ?? published,
    author: AUTHOR,
    publisher: PUBLISHER,
    mainEntityOfPage: `${SITE_URL}${path}`,
    image: `${SITE_URL}/opengraph-image`,
  };
}

/** JSON-LD builder: BreadcrumbList for article pages. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** JSON-LD builder: FAQPage from question/answer pairs. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** JSON-LD builder: WebSite + Organization for the homepage. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Free browser-based multiplayer version of the classic Guess Who board game. Play online with friends — no downloads, no sign-ups.",
    publisher: {
      ...ORGANIZATION,
      founder: AUTHOR,
    },
  };
}
