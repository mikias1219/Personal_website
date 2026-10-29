import type { MetadataRoute } from "next";
import { featuredProjects } from "@/data/projects";
import { absoluteUrl } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/work",
    "/about",
    "/experience",
    "/contact",
    ...featuredProjects.map((p) => `/work/${p.slug}`),
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
