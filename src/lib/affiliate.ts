/**
 * Amazon Associates product links.
 *
 * Product facts below come from each listing's own title and bullet points
 * (checked Oct 2026) — keep descriptions factual, never "we love this one".
 * Prices are deliberately omitted because they change constantly.
 *
 * Links point at amazon.com; OneLink (configured in Associate Central)
 * redirects UK/AU/CA visitors to the same product in their local store.
 */
export const AMAZON_TAG = "playguesswho-20";

export interface AffiliateProduct {
  asin: string;
  name: string;
  /** Short factual summary from the listing */
  blurb: string;
}

export const PRODUCTS = {
  guessWhoOriginal: {
    asin: "B09KWKKK63",
    name: "Guess Who? Original (Hasbro)",
    blurb:
      "The current Hasbro edition. Two double-sided character sheets with classic and superhero characters. 2 players, ages 6+.",
  },
  guessWhoClassic1980s: {
    asin: "B00S732WJE",
    name: "Guess Who? Classic Characters (Winning Moves)",
    blurb:
      "A reissue with the original 1980s cast of characters. 2 players, ages 6+.",
  },
  guessWhoPeopleAndPets: {
    asin: "B08MVWB4SC",
    name: "Guess Who? Plus — People & Pets",
    blurb: "Comes with a people set and a cats-and-dogs set. 2 players, ages 6+.",
  },
  guessWhoGrabAndGo: {
    asin: "B0CBKNRH4Y",
    name: "Guess Who? Grab and Go",
    blurb: "A compact travel version with built-in storage. 2 players, ages 6+.",
  },
  guessWhoCardGame: {
    asin: "B07MWJ699K",
    name: "Guess Who? Card Game",
    blurb:
      "A card-only version: lay out face cards instead of flipping frames. Ages 5+.",
  },
  guessWhoAnimalFriends: {
    asin: "B0BFG3GL1D",
    name: "Guess Who? Animal Friends",
    blurb: "48 animals across two sets, land and water, in place of faces.",
  },
  guessWhoDisneyPrincess: {
    asin: "B01H0CZ7BW",
    name: "Guess Who? Disney Princess Edition",
    blurb: "Disney princesses and their sidekicks across two sets. Ages 5+.",
  },
  hedbanz: {
    asin: "B0BRYH5FJ8",
    name: "Hedbanz (Spin Master)",
    blurb:
      "The card is on your own headband and you ask yes/no questions to work out what it is. 2–6 players, ages 6+.",
  },
  guessIn10Animals: {
    asin: "B07RMJ8SG6",
    name: "Guess in 10 – Animal Planet (Skillmatics)",
    blurb:
      "Up to 10 yes/no questions to identify an animal. Play one-on-one or in teams.",
  },
  battleship: {
    asin: "B09D4QRJ8Y",
    name: "Battleship Classic (Hasbro)",
    blurb: "The classic naval strategy game. 2 players, ages 7+.",
  },
  connectFour: {
    asin: "B06XY881H4",
    name: "Connect 4 (Hasbro)",
    blurb: "The classic four-in-a-row strategy game. Ages 6+.",
  },
  codenames: {
    asin: "B0FJMQB63N",
    name: "Codenames, 2nd Edition (CGE)",
    blurb: "The tabletop version of the word-association team game.",
  },
} satisfies Record<string, AffiliateProduct>;

export type ProductKey = keyof typeof PRODUCTS;

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}
