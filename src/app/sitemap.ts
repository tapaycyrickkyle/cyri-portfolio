import type { MetadataRoute } from "next";

import { getProjects } from "../components/project-data";
import { SITE_URL } from "../lib/site";
import { projectSlug } from "../lib/project-slugs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const projects = await getProjects();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${projectSlug(project.title)}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
