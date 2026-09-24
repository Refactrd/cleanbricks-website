import type { MetadataRoute } from "next";
import { posts } from "@/lib/journal";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/services",
    "/pricing",
    ...services.map((s) => s.href),
    "/about",
    "/how-it-works",
    "/faqs",
    "/journal",
    ...posts.map((p) => `/journal/${p.slug}`),
    "/contact",
    "/book",
  ];
  const lastModified = new Date();
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
