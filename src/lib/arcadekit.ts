/**
 * Links to upcoming features on ArcadeKit's coming-soon page.
 *
 * The `feature` values are a fixed contract with arcadekit.games/coming-soon —
 * don't rename them without updating that page too.
 */
export type ComingSoonFeature = "custom-boards" | "stats" | "packs";

export type CtaLocation = "game-over" | "waiting-room" | "home";

export const COMING_SOON_FEATURES: Record<
  ComingSoonFeature,
  { emoji: string; label: string; event: string }
> = {
  "custom-boards": {
    emoji: "📸",
    label: "Play with your own photos",
    event: "cta-custom-boards",
  },
  stats: {
    emoji: "📊",
    label: "Save your stats & streaks",
    event: "cta-stats",
  },
  packs: {
    emoji: "🎨",
    label: "New themed boards",
    event: "cta-packs",
  },
};

export function comingSoonUrl(feature: ComingSoonFeature, location: CtaLocation): string {
  const params = new URLSearchParams({
    feature,
    utm_source: "playguesswho",
    utm_medium: "cta",
    utm_content: location,
  });
  return `https://arcadekit.games/coming-soon?${params}`;
}
