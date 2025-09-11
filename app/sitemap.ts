// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const routes = ["", "/#projects", "/#experience", "/#about", "/#contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date()
  }));
  return routes;
}
