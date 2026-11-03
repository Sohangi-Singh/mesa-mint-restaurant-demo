import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
  { path: "/reservations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/our-story", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return routes.map((route) => ({
    url: new URL(route.path, base).href,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
