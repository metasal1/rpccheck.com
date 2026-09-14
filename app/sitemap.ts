import type { MetadataRoute } from "next"

const SITE = "https://rpccheck.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    {
      url: `${SITE}/what-is-rpc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}
