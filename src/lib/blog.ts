export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Real publish date (the day the article went live). */
  date: string;
  /** Set when an article is substantially revised. */
  updated?: string;
  readTime: string;
}

/**
 * Metadata for all blog posts. Content is in each page's TSX file.
 * Dates are honest: the first five articles all shipped in the July 13
 * deploy and were substantially revised at the end of July; the rest
 * carry their real publication date.
 */
/**
 * The day this batch of work goes live. Set this to the actual deploy date
 * before shipping — it drives the publish date on the newest articles and
 * the top entry of the homepage changelog, so it only needs changing here.
 */
export const SHIP_DATE = "2026-08-18";

export const blogPosts: BlogPost[] = [
  {
    slug: "best-questions-to-ask-in-guess-who",
    title: "Best Questions to Ask in Guess Who (Ranked by Effectiveness)",
    description:
      "Discover the most effective questions to ask in Guess Who, ranked by how well they split the board. Includes probability analysis of our 24 characters.",
    date: "2026-07-13",
    updated: "2026-07-30",
    readTime: "6 min read",
  },
  {
    slug: "how-to-win-at-guess-who",
    title: "How to Win at Guess Who: A Complete Strategy Guide",
    description:
      "Master the art of winning Guess Who with our in-depth strategy guide. Learn the binary search approach, opening theory, and when to make your final guess.",
    date: "2026-07-13",
    updated: "2026-07-30",
    readTime: "7 min read",
  },
  {
    slug: "best-free-online-board-games",
    title: "7 Best Free Online Board Games to Play with Friends",
    description:
      "Looking for free online board games? Here are our top picks you can play instantly in your browser — no downloads or sign-ups required.",
    date: "2026-07-13",
    updated: "2026-07-30",
    readTime: "6 min read",
  },
  {
    slug: "history-of-guess-who",
    title: "The History of Guess Who: From 1979 Board Game to Online",
    description:
      "Trace the evolution of Guess Who from its origins at Milton Bradley in 1979 through Hasbro's ownership to the modern online versions of today.",
    date: "2026-07-13",
    updated: "2026-07-30",
    readTime: "5 min read",
  },
  {
    slug: "guess-who-variations-and-house-rules",
    title: "5 Fun Guess Who Variations & House Rules to Try",
    description:
      "Spice up your Guess Who games with these creative variations and house rules. From speed rounds to reverse mode, these twists make every game feel fresh.",
    date: "2026-07-13",
    updated: SHIP_DATE,
    readTime: "5 min read",
  },
  {
    slug: "math-of-the-perfect-question",
    title: "The Math of the Perfect Question in Guess Who",
    description:
      "An information-theory look at Guess Who: why the best question splits the board in half, how to measure a question in bits, and what the theoretical minimum number of questions actually is.",
    date: SHIP_DATE,
    readTime: "9 min read",
  },
  {
    slug: "guess-who-for-classrooms-and-families",
    title: "Using Guess Who in Classrooms and with Younger Kids",
    description:
      "Guess Who quietly teaches deduction, descriptive vocabulary, and yes-or-no questioning. Practical ways teachers and parents can use it, with age-appropriate rule adjustments.",
    date: SHIP_DATE,
    readTime: "7 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Posts newest-first, for the blog index. */
export function getPostsNewestFirst(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}
