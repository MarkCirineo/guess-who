import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/room/", "/local"],
    },
    sitemap: "https://playguesswho.net/sitemap.xml",
  };
}
