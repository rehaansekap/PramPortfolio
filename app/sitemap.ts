import { MetadataRoute } from "next";
import { getProjects } from "@/lib/data/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://raihansyeka.dev";
  const projects = await getProjects();
  const locales = ["id", "en"];

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Home
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    // Projects archive
    routes.push({
      url: `${baseUrl}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // About
    routes.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Project detail case studies
    for (const p of projects) {
      routes.push({
        url: `${baseUrl}/${locale}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  }

  return routes;
}
