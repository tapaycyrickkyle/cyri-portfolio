import type { MetadataRoute } from "next";

import { getProjects } from "../components/project-data";
import { services } from "../components/service-data";
import { SITE_URL } from "../lib/site";
import { projectSlug } from "../lib/project-slugs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/images/profile-picture.jpg`],
    },
    ...services.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${projectSlug(project.title)}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      images: (project.images?.length ? project.images : [project.image]).map(
        (image) => `${SITE_URL}${image}`,
      ),
    })),
  ];
}
