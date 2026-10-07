import Image from "next/image";
import Link from "next/link";
import AutoScrollRail from "../components/auto-scroll-rail";
import ClientWebsiteCarousel from "../components/client-website-carousel";
import ContactForm from "../components/contact-form";
import {
  clientWebsites,
  contactLinks,
  experienceItems,
  footerLinks,
  heroSocialLinks,
  navigation,
  techStackItems,
} from "../components/portfolio-content";
import { getMediaEdits } from "../components/media-data";
import { getProjects } from "../components/project-data";
import { serviceLinks } from "../components/service-data";
import MediaCarousel from "../components/media-carousel";
import ExperienceDuration from "../components/experience-duration";
import { Icon } from "../components/portfolio-icon";
import ProjectShowcase from "../components/project-showcase";
import Reveal from "../components/reveal";
import ScrollMessage from "../components/scroll-message";
import SectionNav from "../components/section-nav";
import { SkillBrandIcon } from "../components/skill-brand-icon";
import {
  isSocialBrandName,
  SocialBrandIcon,
} from "../components/social-brand-icon";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdajjakw";

function SectionHeading({
  title,
  description,
  centered = false,
}: {
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <h2 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted sm:text-base md:text-lg">
        {description}
      </p>
    </div>
  );
}

export default async function Home() {
  const year = new Date().getFullYear();
  const projects = await getProjects();
  const mediaEdits = await getMediaEdits();
  const formspreeEndpoint =
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? FORMSPREE_ENDPOINT;

  return (
    <div id="top" className="page-shell relative isolate overflow-x-clip">
      <SectionNav navigation={navigation} />

      <main style={{ paddingTop: "var(--nav-offset)" }}>
        <section className="section-shell section-hero">
          <Reveal className="hero-copy space-y-6 md:space-y-7">
            <div className="hero-copy-grid">
              <h1 className="max-w-none text-[clamp(2.15rem,10vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground">
                I turn business problems into practical digital solutions.
              </h1>
              <div className="hero-support space-y-6 md:space-y-7">
                <p className="max-w-3xl text-[0.97rem] leading-7 text-muted sm:text-base md:text-[1rem] md:leading-8 lg:max-w-2xl lg:text-[1.02rem] xl:max-w-3xl xl:text-[1.08rem]">
                  I&apos;m a <span className="scan-highlight-soft">web developer and AI automation specialist</span> who builds
                  modern websites, AI-assisted workflows, and practical internal tools. I help business owners turn
                  repetitive work, unclear processes, and scattered information into
                  <span className="scan-highlight-soft"> clearer digital solutions</span>.
                </p>
                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a href="#work" className="primary-button w-full sm:w-auto">
                    Explore My Work
                    <Icon name="arrow" className="size-4" />
                  </a>
                  <a
                    href="/CV/CV-Cyrick-Tapay.pdf"
                    download="CV-Cyrick-Tapay.pdf"
                    className="secondary-button w-full sm:w-auto"
                  >
                    Download CV
                  </a>
                  <a href="#contact" className="secondary-button w-full sm:w-auto">
                    Let&apos;s Talk
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-outline/60 pt-4 text-sm">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
                    Services
                  </span>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-foreground underline decoration-outline-strong underline-offset-4 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Reveal delay={150}>
                  <div className="pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-soft">
                      Verify my profiles
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {heroSocialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                          aria-label={link.label}
                          title={link.label}
                          className="hero-social-link"
                        >
                          <SocialBrandIcon name={link.icon} className="size-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="message-band">
          <div className="section-shell">
            <Reveal>
              <div className="message-panel">
                <p className="message-panel-kicker">For business owners</p>
                <ScrollMessage
                  text="Something in your business slowing you down? Let&apos;s talk about a practical solution—whether that&apos;s a better website, AI automation, or a simpler workflow."
                  className="message-panel-text"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="section-shell">
          <Reveal>
            <SectionHeading
              title="Experience"
              description="Freelance work across web development, AI automation, and visual content production."
            />
          </Reveal>

          <div className="section-content-gap border-y border-outline/60">
            {experienceItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 120}>
                <article
                  className={`grid gap-7 py-8 sm:py-10 md:grid-cols-[minmax(12rem,0.34fr)_minmax(0,1fr)] md:gap-10 ${
                    index < experienceItems.length - 1
                      ? "border-b border-outline/60"
                      : ""
                  }`}
                >
                  <div className="space-y-3 md:border-r md:border-outline/60 md:pr-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium tracking-[0.08em] text-muted-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-outline/70" aria-hidden="true" />
                    </div>
                    <p className="text-sm leading-6 text-foreground">
                      {item.dateRange}{" "}
                      <span aria-hidden="true">·</span>{" "}
                      <ExperienceDuration
                        startMonth={item.startMonth}
                        initialDuration={item.initialDuration}
                      />
                    </p>
                    <p className="text-sm leading-6 text-muted">{item.location}</p>
                  </div>

                  <div className="min-w-0 space-y-5">
                    <div className="flex items-start gap-3">
                      <Image
                        src={item.logoSrc}
                        alt={item.logoAlt}
                        width={44}
                        height={44}
                        className={`size-11 shrink-0 border border-outline object-contain ${
                          item.logoBackground === "white"
                            ? "bg-white"
                            : "bg-surface-soft"
                        }`}
                      />
                      <div className="min-w-0">
                        <h3 className="text-[clamp(1.65rem,3vw,2.35rem)] font-medium leading-[1.12] tracking-[-0.03em] text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {item.organization} <span aria-hidden="true">·</span>{" "}
                          {item.employmentType}
                        </p>
                      </div>
                    </div>

                    <p className="max-w-3xl text-base leading-7 text-muted">
                      {item.summary}
                    </p>

                    <ul className="space-y-2 text-base leading-7 text-muted">
                      {item.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex gap-3">
                          <span
                            className="mt-[0.72em] size-1.5 shrink-0 bg-accent"
                            aria-hidden="true"
                          />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-outline/60 pt-3">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                        >
                          <Icon name={item.icon} className="size-4" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="client-websites" className="section-shell">
          <Reveal>
            <SectionHeading
              title="Websites I’ve Built"
              description="Live websites and landing pages I built for business owners, service providers, and growing brands."
            />
          </Reveal>

<Reveal className="section-content-gap">
            <ClientWebsiteCarousel websites={clientWebsites} />
          </Reveal>
        </section>

        <ProjectShowcase projects={projects} />

        <section className="section-shell">
          <Reveal>
            <SectionHeading
              title="Edited Visuals"
              description="A small collection of photo and video edits where I focus on clarity, presentation, and giving the final output a more polished feel."
            />
          </Reveal>

          <Reveal delay={120} className="section-content-gap">
            <MediaCarousel items={mediaEdits} />
          </Reveal>
        </section>

        <section
          id="learning"
          className="message-band"
        >
          <div className="section-shell">
            <Reveal>
              <div className="message-panel">
                <p className="message-panel-kicker">How I solve problems</p>
                <ScrollMessage
                  text="I start by understanding the business problem, then map the information and workflow before building a practical website, automation, or internal tool."
                  className="message-panel-text"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="skills"
          className="section-shell"
        >
          <Reveal>
            <SectionHeading
              title="Capabilities & Tools"
              description="The frameworks, data tools, AI tools, and creative software I use to build websites, automation workflows, dashboards, and practical digital solutions."
            />
          </Reveal>

          <AutoScrollRail
            className="section-content-gap card-rail card-rail-bleed card-rail-skills"
            trackClassName="card-rail-track"
            duration={42}
            autoScroll={false}
          >
            {techStackItems.map((item) => (
              <div
                key={item.label}
                className="card-rail-item card-rail-item-skill"
              >
                <article className="surface-card tech-stack-card skill-card p-4 sm:p-5">
                  <div className="tech-stack-icon-shell">
                    {item.brandIcon ? (
                      <SkillBrandIcon
                        name={item.brandIcon}
                        className="tech-stack-icon"
                      />
                    ) : item.logoSrc ? (
                      <Image
                        src={item.logoSrc}
                        alt=""
                        aria-hidden="true"
                        width={64}
                        height={64}
                        sizes="64px"
                        className={`tech-stack-icon brand-skill-icon ${
                          item.invertInDark ? "brand-skill-icon-invert-dark" : ""
                        } ${item.wideLogo ? "brand-skill-icon-wide" : ""}`}
                      />
                    ) : item.icon ? (
                      <Icon name={item.icon} className="tech-stack-icon" />
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-center text-[11px] font-semibold tracking-[0.1em] text-foreground sm:text-xs">
                    {item.label}
                  </h3>
                </article>
              </div>
            ))}
          </AutoScrollRail>
        </section>

        <section
          id="profile"
          className="section-shell"
        >
            <div className="grid gap-6 sm:gap-8 md:gap-12 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center xl:gap-x-20 xl:gap-y-12 2xl:gap-x-24">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Who I Am"
                description="I&apos;m Cyrick Kyle B. Tapay, a freelance web developer and AI automation specialist based in the Philippines."
              />
              <div className="space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                <p>
                  I&apos;m from Dolores, Eastern Samar, and I work with business
                  owners who need a clearer online presence, smoother workflows,
                  or better tools for the way they work.
                </p>
                <p>
                  My work combines <span className="scan-highlight-soft">web development</span>,
                  <span className="scan-highlight-soft"> AI-assisted automation</span>, and workflow design. I build
                  websites, dashboards, and systems that organize information and make recurring work easier to manage.
                </p>
                <p>
                  I passed the Career Service Examination at the Professional
                  Level and hold Career Service Professional Eligibility in the
                  Philippines.
                </p>
                <p>
                  I approach each project by understanding the problem first, then choosing the simplest useful solution—whether that is a clearer website, an automated workflow, or a custom internal tool.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140} className="relative xl:flex xl:justify-end">
              <div className="profile-showcase mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] xl:mx-0">
                <div className="profile-showcase-orbit profile-showcase-orbit-left" />
                <div className="profile-showcase-orbit profile-showcase-orbit-right" />
                <div className="profile-frame profile-showcase-frame">
                  <div className="profile-showcase-grid" />
                  <div className="profile-showcase-card">
                    <div className="profile-showcase-image-shell">
                      <Image
                        src="/images/profile-picture.jpg"
                        alt="Portrait of Cyrick Kyle B. Tapay."
                        fill
                        sizes="(min-width: 1024px) 34rem, (min-width: 640px) 24rem, 100vw"
                        className="object-cover object-center transition duration-700 hover:scale-[1.03]"
                      />
                    </div>
                    <div className="profile-showcase-caption">
                      <span className="profile-showcase-kicker">Cyrick.Tapay</span>
                      <span className="profile-showcase-rule" />
                      <span className="profile-showcase-role">IT</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220} className="xl:col-span-2">
              <dl className="profile-details-rail">
                <div className="profile-details-item">
                  <dt className="profile-details-label">Education</dt>
                  <dd className="profile-details-value">BS in Information Technology</dd>
                </div>
                <div className="profile-details-item">
                  <dt className="profile-details-label">Location</dt>
                  <dd className="profile-details-value">Dolores, E. Samar</dd>
                </div>
                <div className="profile-details-item">
                  <dt className="profile-details-label">Eligibility</dt>
                  <dd className="profile-details-value">Career Service Professional Eligibility</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section
          id="contact"
          className="section-shell"
        >
          <div className="surface-card grid gap-5 p-4 sm:gap-8 sm:p-6 md:gap-10 md:p-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-14 2xl:gap-16 xl:p-12">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Let&apos;s Talk About the Problem"
                description="Tell me what you want to improve, automate, or make clearer, and we can explore the right digital solution for your business."
              />
              <p className="max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                You don&apos;t need to have the technical answer yet. Tell me what is
                difficult, repetitive, unclear, or slowing your team down. We can
                explore whether a website, automation, or workflow tool is the
                right solution.
              </p>
              <div className="space-y-4">
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="contact-link group flex items-center gap-4 text-foreground"
                  >
                    <span className="flex size-11 items-center justify-center border border-outline bg-surface-soft transition-colors group-hover:border-outline-strong">
                      {isSocialBrandName(item.icon) ? (
                        <SocialBrandIcon name={item.icon} className="size-5" />
                      ) : (
                        <Icon name={item.icon} className="size-5" />
                      )}
                    </span>
                    <span className="break-all font-mono text-sm sm:break-normal">{item.label}</span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm
                email="tapaycyrickkyle@gmail.com"
                endpoint={formspreeEndpoint}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer border-t border-outline/50 py-12">
        <div className="mx-auto flex max-w-[86rem] flex-col items-center justify-between gap-6 px-[var(--page-gutter)] text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <a
              href="#top"
              className="brand-badge text-lg font-semibold tracking-[-0.12em] text-foreground"
            >
              Cyrick.Tapay
            </a>
            <p className="font-mono text-sm text-muted">
              Digital solutions for business owners.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 md:justify-start">
              {footerLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  {isSocialBrandName(item.icon) ? (
                    <SocialBrandIcon name={item.icon} className="size-4" />
                  ) : (
                    <Icon name={item.icon} className="size-4" />
                  )}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <p className="font-mono text-sm text-muted/80">
            {"\u00A9"} {year} Cyrick Kyle Tapay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
