import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Only ephemeral room instances are blocked — /local is a real
      // landing page with content and belongs in the index.
      disallow: ["/room/"],
    },
    sitemap: "https://playguesswho.net/sitemap.xml",
  };
}
