import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { parks } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url || "https://trailer-parks.vercel.app";

  const staticPages = [
    "",
    "/list-your-park",
    "/featured",
    "/buyer-pro",
    "/marketplace",
    "/owners",
    "/buyers",
    "/analysts",
    "/banks",
    "/resources/owners",
    "/partner",
    "/links",
    "/outreach",
    "/valuation",
    "/deal-room",
    "/lender-intro",
    "/underwriting",
    "/comps",
    "/loi",
    "/rent-roll",
    "/cap-rate",
    "/noi",
    "/tax",
    "/insurance",
    "/survey",
    "/epa",
    "/zoning",
    "/title",
    "/flood",
    "/utility",
    "/traffic",
    "/septic",
    "/wells",
    "/wetlands",
    "/access",
    "/soils",
    "/drainage",
    "/easement",
    "/setbacks",
    "/pads",
    "/skirts",
    "/tie-downs",
    "/foundations",
    "/fencing",
    "/meters",
    "/lighting",
    "/signage",
    "/mailboxes",
    "/wifi",
    "/laundry",
    "/playground",
    "/clubhouse",
    "/pool",
    "/gym",
    "/office",
    "/parking",
    "/mailroom",
    "/storage",
    "/pavilion",
    "/dog-park",
    "/firepit",
    "/bbq",
    "/gazebo",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority:
      path === "/list-your-park" || path === "/featured" || path === "/buyer-pro"
        ? 1
        : path === ""
          ? 0.9
          : 0.7,
  }));

  const parkPages = parks.map((park) => ({
    url: `${base}/parks/${park.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...parkPages];
}
