import { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

/** Metadata for all blog posts. Content is in each page's TSX file. */
export const blogPosts: BlogPost[] = [
  {
    slug: "best-questions-to-ask-in-guess-who",
    title: "Best Questions to Ask in Guess Who (Ranked by Effectiveness)",
    description:
      "Discover the most effective questions to ask in Guess Who, ranked by how well they split the board. Includes probability analysis of our 24 characters.",
    date: "2026-07-05",
    readTime: "5 min read",
  },
  {
    slug: "how-to-win-at-guess-who",
    title: "How to Win at Guess Who: A Complete Strategy Guide",
    description:
      "Master the art of winning Guess Who with our in-depth strategy guide. Learn the binary search approach, opening theory, and when to make your final guess.",
    date: "2026-07-04",
    readTime: "5 min read",
  },
  {
    slug: "best-free-online-board-games",
    title: "7 Best Free Online Board Games to Play with Friends",
    description:
      "Looking for free online board games? Here are our top picks you can play instantly in your browser — no downloads or sign-ups required.",
    date: "2026-07-03",
    readTime: "6 min read",
  },
  {
    slug: "history-of-guess-who",
    title: "The History of Guess Who: From 1979 Board Game to Online",
    description:
      "Trace the evolution of Guess Who from its origins at Milton Bradley in 1979 through Hasbro's ownership to the modern online versions of today.",
    date: "2026-07-02",
    readTime: "4 min read",
  },
  {
    slug: "guess-who-variations-and-house-rules",
    title: "5 Fun Guess Who Variations & House Rules to Try",
    description:
      "Spice up your Guess Who games with these creative variations and house rules. From speed rounds to reverse mode, these twists make every game feel fresh.",
    date: "2026-07-01",
    readTime: "4 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
