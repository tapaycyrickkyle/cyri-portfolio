import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getService, services } from "../../../components/service-data";
import { SITE_NAME, SITE_URL } from "../../../lib/site";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const url = `${SITE_URL}/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: `${service.metaTitle} | ${SITE_NAME}`,
      description: service.description,
      images: [
        {
          url: "/images/profile-picture.jpg",
          alt: "Portrait of Cyrick Kyle B. Tapay.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | ${SITE_NAME}`,
      description: service.description,
      images: ["/images/profile-picture.jpg"],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const url = `${SITE_URL}/services/${service.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.serviceType,
        url,
        description: service.description,
        areaServed: {
          "@type": "Country",
          name: "Philippines",
        },
        provider: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Portfolio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: service.serviceType,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <div className="page-shell project-detail-shell relative isolate overflow-x-clip">
      <header className="border-b border-outline/60 bg-surface/95">
        <div className="mx-auto flex max-w-[86rem] flex-wrap items-start justify-between gap-3 px-[var(--page-gutter)] py-4 sm:flex-nowrap sm:items-center sm:gap-4 sm:py-5">
          <Link
            href="/"
            className="brand-badge text-lg font-semibold tracking-[-0.12em] text-foreground"
          >
            Cyrick.Tapay
          </Link>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:justify-end">
            <Link
              href="/"
              className="secondary-button w-full justify-center sm:w-auto"
            >
              Back to portfolio
            </Link>
            <Link
              href="/#contact"
              className="primary-button w-full justify-center sm:w-auto"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </header>

      <main>
        <article className="section-shell min-w-0 space-y-12 py-16 sm:space-y-16 sm:py-24">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />

          <div className="max-w-4xl space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
              {service.eyebrow}
            </p>
            <h1 className="text-[clamp(2.35rem,7vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-foreground">
              {service.title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {service.intro}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/#contact" className="primary-button">
                Discuss your project
              </Link>
              <Link href="/#work" className="secondary-button">
                View selected work
              </Link>
            </div>
          </div>

          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-16">
            <section aria-labelledby="offerings-heading" className="min-w-0">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                  What I can help with
                </p>
                <h2
                  id="offerings-heading"
                  className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
                >
                  Practical work with a clear purpose.
                </h2>
              </div>
              <div className="mt-6 border-y border-outline/70">
                {service.offerings.map((offering, index) => (
                  <div
                    key={offering.title}
                    className={`grid gap-3 py-5 sm:grid-cols-[minmax(10rem,0.38fr)_minmax(0,1fr)] sm:gap-8 ${
                      index < service.offerings.length - 1
                        ? "border-b border-outline/70"
                        : ""
                    }`}
                  >
                    <h3 className="text-lg font-medium leading-7 text-foreground">
                      {offering.title}
                    </h3>
                    <p className="text-base leading-7 text-muted">
                      {offering.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="min-w-0 space-y-8 border-t border-outline pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                  Good fit for
                </p>
                <ul className="mt-4 space-y-3 text-base leading-7 text-muted">
                  {service.bestFor.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.72em] size-1.5 shrink-0 bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-outline/70 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                  Capabilities
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium leading-6 text-foreground">
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <section aria-labelledby="process-heading" className="space-y-6">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                How I work
              </p>
              <h2
                id="process-heading"
                className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
              >
                Start with the business problem.
              </h2>
            </div>
            <ol className="border-y border-outline/70">
              {service.process.map((step, index) => (
                <li
                  key={step.number}
                  className={`grid gap-4 py-6 sm:grid-cols-[4rem_minmax(12rem,0.55fr)_minmax(0,1fr)] sm:gap-8 ${
                    index < service.process.length - 1
                      ? "border-b border-outline/70"
                      : ""
                  }`}
                >
                  <span className="font-mono text-sm tracking-[0.12em] text-muted-soft">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-medium leading-7 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-base leading-7 text-muted">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="related-work-heading" className="space-y-6">
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                Selected work
              </p>
              <h2
                id="related-work-heading"
                className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl"
              >
                See how the work comes together.
              </h2>
            </div>
            <div className="border-y border-outline/70">
              {service.relatedProjects.map((project, index) => (
                <div
                  key={project.title}
                  className={`flex flex-col gap-4 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 ${
                    index < service.relatedProjects.length - 1
                      ? "border-b border-outline/70"
                      : ""
                  }`}
                >
                  <div className="max-w-2xl space-y-1">
                    <h3 className="text-lg font-medium leading-7 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-base leading-7 text-muted">
                      {project.description}
                    </p>
                  </div>
                  <Link
                    href={project.href}
                    className="secondary-button shrink-0 justify-center sm:self-start"
                  >
                    Explore work
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="border-y border-outline/70 py-8 sm:py-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div className="max-w-2xl space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                  Based in Dolores, Eastern Samar, Philippines
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                  Have a website or workflow that needs to work better?
                </h2>
                <p className="text-base leading-7 text-muted sm:text-lg">
                  Tell me what is unclear, repetitive, or slowing your team down.
                  We can explore a practical next step.
                </p>
              </div>
              <Link
                href="/#contact"
                className="primary-button shrink-0 justify-center"
              >
                Contact Cyrick
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="site-footer border-t border-outline/50 py-10">
        <div className="mx-auto flex max-w-[86rem] flex-wrap items-start justify-between gap-3 px-[var(--page-gutter)] text-sm text-muted sm:flex-nowrap sm:items-center sm:gap-4">
          <span>© {new Date().getFullYear()} Cyrick Kyle Tapay.</span>
          <Link href="/" className="text-foreground hover:text-accent">
            Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
}
