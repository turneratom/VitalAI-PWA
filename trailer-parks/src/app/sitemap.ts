import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { parks } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url || "https://turneratom.github.io/VitalAI-PWA";

  const staticPages = [
    "",
    "/list-your-park",
    "/marketplace",
    "/owners",
    "/buyers",
    "/analysts",
    "/banks",
    "/resources/owners",
    "/partner",
    "/links",
    "/outreach",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/list-your-park" ? 1 : path === "" ? 0.9 : 0.7,
  }));

  const parkPages = parks.map((park) => ({
    url: `${base}/parks/${park.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...parkPages];
}
