import Image from "next/image";
import AutoScrollRail from "../components/auto-scroll-rail";
import ClientWebsiteCarousel from "../components/client-website-carousel";
import ContactForm from "../components/contact-form";
import {
  clientWebsites,
  contactLinks,
  footerLinks,
  heroSocialLinks,
  navigation,
  solutionAreas,
  techStackItems,
} from "../components/portfolio-content";
import { getMediaEdits } from "../components/media-data";
import { getProjects } from "../components/project-data";
import MediaCarousel from "../components/media-carousel";
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
        <section className="section-shell section-hero grid gap-6 sm:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(min(100%,18rem),0.92fr)] xl:items-start xl:gap-10">
          <Reveal className="hero-copy space-y-6 md:space-y-7">
            <div className="space-y-5 md:space-y-6">
              <h1 className="max-w-none text-[clamp(2.15rem,10vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground">
                I turn business problems into practical digital solutions.
              </h1>
              <p className="max-w-3xl text-[0.97rem] leading-7 text-muted sm:text-base md:text-[1rem] md:leading-8 lg:max-w-2xl lg:text-[1.02rem] xl:max-w-3xl xl:text-[1.08rem]">
                I&apos;m a <span className="scan-highlight-soft">web developer and AI automation specialist</span> who builds
                modern websites, AI-assisted workflows, and practical internal tools. I help business owners turn
                repetitive work, unclear processes, and scattered information into
                <span className="scan-highlight-soft"> clearer digital solutions</span>.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#solutions" className="primary-button w-full sm:w-auto">
                Explore Solutions
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

          </Reveal>

          <Reveal delay={220} className="hero-side">
            <div className="hero-side-stack">
              <article className="surface-card hero-info-card hero-info-card-featured">
                <div className="hero-info-icon">
                  <Icon name="code" className="size-5" />
                </div>
                  <div>
                    <p className="hero-info-kicker">Current Focus</p>
                    <p className="hero-info-copy">
                      Building websites, AI automations, and workflow systems that connect business needs to practical digital solutions.
                    </p>
                  </div>
                </article>

              <div className="hero-side-grid">
                <article className="surface-card hero-info-card">
                  <div className="hero-info-icon">
                    <Icon name="dashboard" className="size-5" />
                  </div>
                  <div>
                    <p className="hero-info-kicker">Building With</p>
                    <p className="hero-info-copy">
                      Modern web apps, AI tools, dashboards, structured data, and responsive interfaces.
                    </p>
                  </div>
                </article>

                <article className="surface-card hero-info-card">
                  <div className="hero-info-icon">
                    <Icon name="rocket" className="size-5" />
                  </div>
                  <div>
                    <p className="hero-info-kicker">Available For</p>
                    <p className="hero-info-copy">
                      Business websites, AI-assisted workflows, internal tools, dashboards, and process improvements.
                    </p>
                  </div>
                </article>
              </div>

              <article className="surface-card hero-info-card">
                <div className="hero-info-icon">
                  <Icon name="globe" className="size-5" />
                </div>
                  <div>
                    <p className="hero-info-kicker">How I Help</p>
                    <p className="hero-info-copy">
                      I start with the problem, map the workflow, and build the simplest useful solution for the people doing the work.
                    </p>
                  </div>
              </article>
            </div>
          </Reveal>
        </section>

        <section className="message-band">
          <div className="section-shell">
            <Reveal>
              <div className="message-panel">
                <p className="message-panel-kicker">For business owners</p>
                <ScrollMessage
                  text="If something in your business is repetitive, unclear, or difficult to manage, let&apos;s talk about whether a website, automation, or workflow tool can help."
                  className="message-panel-text"
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="solutions" className="section-shell">
          <Reveal>
            <SectionHeading
              title="What I Can Help With"
              description="From a clearer online presence to smarter workflows, I build practical digital solutions around the problem your business needs to solve."
            />
          </Reveal>

          <div className="section-content-gap grid border-y border-outline lg:grid-cols-4">
            {solutionAreas.map((area, index) => (
              <Reveal
                key={area.title}
                delay={index * 70}
                className="border-t border-outline first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0"
              >
                <article className="h-full px-0 py-6 lg:px-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon name={area.icon} className="size-5 text-muted-soft" />
                  </div>
                  <h3 className="mt-10 text-xl font-medium tracking-[-0.04em] text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {area.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="client-websites" className="section-shell">
          <Reveal>
            <SectionHeading
              title="Selected Work: Websites"
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
            <div className="grid gap-6 sm:gap-8 md:gap-12 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-center xl:gap-20 2xl:gap-24">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Who I Am"
                description="I&apos;m Cyrick Kyle B. Tapay, a web developer and AI automation specialist focused on practical digital solutions."
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
                  I approach each project by understanding the problem first, then choosing the simplest useful solution—whether that is a clearer website, an automated workflow, or a custom internal tool.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="border-l-2 border-accent pl-4">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Education
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-foreground">
                    BS in Information Technology
                  </span>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Location
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-foreground">
                    Dolores, E. Samar
                  </span>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Eligibility
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-foreground">
                    Career Service Professional
                  </span>
                </div>
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
                    <span className="flex size-11 items-center justify-center rounded-full border border-outline bg-surface-soft transition-colors group-hover:border-outline-strong">
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
