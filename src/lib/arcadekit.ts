/**
 * Links to ArcadeKit: live features and the coming-soon page.
 *
 * The `feature` values are a fixed contract with arcadekit.games/coming-soon —
 * don't rename them without updating that page too.
 */
export type ComingSoonFeature = "custom-boards";

export type CtaLocation = "game-over" | "waiting-room" | "home";

export const COMING_SOON_FEATURES: Record<
  ComingSoonFeature,
  { emoji: string; label: string; event: string }
> = {
  // Reframed Oct 2026 from "your own photos" to a mix-and-match board maker
  // (existing art, your own names). New event name keeps the two tests apart.
  "custom-boards": {
    emoji: "🧩",
    label: "Make your own board",
    event: "cta-board-maker",
  },
};

function utm(location: CtaLocation): URLSearchParams {
  return new URLSearchParams({
    utm_source: "playguesswho",
    utm_medium: "cta",
    utm_content: location,
  });
}

export function comingSoonUrl(feature: ComingSoonFeature, location: CtaLocation): string {
  const params = new URLSearchParams({ feature, ...Object.fromEntries(utm(location)) });
  return `https://arcadekit.games/coming-soon?${params}`;
}

/**
 * Rule Out board packs (live). Monster Mash is free with an account; Dogs and
 * Fantasy are paid. Lands scrolled to Monster Mash, whose button starts a room
 * with that board selected.
 */
export const PACKS_EVENT = "play-packs";

export function packsUrl(location: CtaLocation): string {
  return `https://arcadekit.games/games/rule-out/packs?${utm(location)}#monster-mash`;
}
