import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_NAME, SITE_URL } from "../../../lib/site";
import { CASE_STUDY_SLUGS, projectSlug } from "../../../lib/project-slugs";
import {
  getCaseStudyProject,
  getCaseStudyProjects,
} from "../../../components/project-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getCaseStudyProjects();

  return projects.map((project) => ({
    slug: projectSlug(project.title),
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseStudyProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} Case Study`;
  const description = project.description;
  const url = `${SITE_URL}/work/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: project.image,
          alt: project.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getCaseStudyProject(slug);

  if (!project || !CASE_STUDY_SLUGS.includes(slug as (typeof CASE_STUDY_SLUGS)[number])) {
    notFound();
  }

  const galleryImages = project.images?.length
    ? project.images
    : [project.image];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    url: `${SITE_URL}/work/${slug}`,
    description: project.description,
    image: galleryImages.map((image) => `${SITE_URL}${image}`),
    creator: {
      "@type": "Person",
      name: "Cyrick Kyle B. Tapay",
      url: SITE_URL,
    },
    keywords: project.tags.join(", "),
  };

  return (
    <div className="page-shell relative isolate overflow-x-clip">
      <header className="border-b border-outline/60 bg-surface/95">
        <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-4 px-[var(--page-gutter)] py-5">
          <Link
            href="/"
            className="brand-badge text-lg font-semibold tracking-[-0.12em] text-foreground"
          >
            Cyrick.Tapay
          </Link>
          <Link href="/#work" className="secondary-button">
            Back to Projects
          </Link>
        </div>
      </header>

      <main>
        <article className="section-shell space-y-10 py-16 sm:space-y-14 sm:py-24">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />

          <div className="max-w-3xl space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
              Selected case study
            </p>
            <h1 className="text-[clamp(2.4rem,8vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-foreground">
              {project.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden border border-outline bg-[#0d0f12]">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              priority
              sizes="(min-width: 1280px) 86rem, 100vw"
              className="object-contain"
            />
          </div>

          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", project.role],
              ["Type", project.projectType],
              ["Year", project.year],
              ["Status", project.status],
            ].map(([label, value]) =>
              value ? (
                <div
                  key={label}
                  className="border border-outline bg-surface-soft px-4 py-4"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium text-foreground">
                    {value}
                  </dd>
                </div>
              ) : null,
            )}
          </dl>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-16">
            <div className="space-y-10">
              <section aria-labelledby="overview-heading" className="space-y-4">
                <h2
                  id="overview-heading"
                  className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
                >
                  Project overview
                </h2>
                <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
                  {project.summary}
                </p>
              </section>

              <section aria-labelledby="outcomes-heading" className="space-y-4">
                <h2
                  id="outcomes-heading"
                  className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
                >
                  Outcomes
                </h2>
                <ul className="space-y-4 text-base leading-8 text-muted sm:text-lg">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <span className="mt-2 size-2 shrink-0 bg-accent" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-6 border-t border-outline pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                  Technologies
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="project-chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                {project.githubLink ? (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button justify-center"
                  >
                    View GitHub Repository
                  </a>
                ) : null}
                <Link href="/#contact" className="primary-button justify-center">
                  Ask About This Project
                </Link>
              </div>
            </aside>
          </div>

          {galleryImages.length > 1 ? (
            <section aria-labelledby="screenshots-heading" className="space-y-6">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                  Visual record
                </p>
                <h2
                  id="screenshots-heading"
                  className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
                >
                  Project screenshots
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {galleryImages.slice(1).map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-[16/10] overflow-hidden border border-outline bg-[#0d0f12]"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} interface screenshot ${index + 2}.`}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>

      <footer className="site-footer border-t border-outline/50 py-10">
        <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-4 px-[var(--page-gutter)] text-sm text-muted">
          <span>© {new Date().getFullYear()} Cyrick Kyle Tapay.</span>
          <Link href="/" className="text-foreground hover:text-accent">
            Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
