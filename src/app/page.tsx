import Image from "next/image";
import AutoScrollRail from "../components/auto-scroll-rail";
import ContactForm from "../components/contact-form";
import {
  contactLinks,
  footerLinks,
  heroSocialLinks,
  navigation,
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
import TypingText from "../components/typing-text";

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
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  return (
    <div id="top" className="page-shell relative isolate overflow-x-clip">
      <SectionNav navigation={navigation} />

      <main style={{ paddingTop: "var(--nav-offset)" }}>
        <section className="section-shell section-hero grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(17rem,0.96fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:gap-10">
          <Reveal className="hero-copy space-y-6 md:space-y-7">
            <div className="space-y-5 md:space-y-6">
              <p className="typing-line">
                Currently exploring{" "}
                <TypingText
                  phrases={[
                    "AI workflows.",
                    "agentic development.",
                    "automation tools.",
                    "web interfaces.",
                    "systems thinking.",
                  ]}
                />
              </p>
              <h1 className="max-w-none text-[clamp(2.15rem,10vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground">
                Building, learning, and improving through real-world projects.
              </h1>
              <p className="max-w-3xl text-[0.97rem] leading-7 text-muted sm:text-base md:text-[1rem] md:leading-8 lg:max-w-2xl lg:text-[1.02rem] xl:max-w-3xl xl:text-[1.08rem]">
                I&apos;m focused on <span className="scan-highlight-soft">web development</span>, while also exploring
                <span className="scan-highlight-soft"> mobile</span> and <span className="scan-highlight-soft">desktop applications</span> to stay flexible across
                platforms. I stay updated with current technologies, especially
                <span className="scan-highlight-soft"> AI</span> and <span className="scan-highlight-soft">automation</span>, and use them as practical tools to improve
                <span className="scan-highlight-soft"> workflows</span>, efficiency, and problem-solving. I&apos;m currently
                seeking opportunities to <span className="scan-highlight-soft">contribute</span>, learn, and grow through
                real-world development work.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#work" className="primary-button w-full sm:w-auto">
                View My Work
                <Icon name="arrow" className="size-4" />
              </a>
              <a
                href="/resume/Resume-Cyrick%20Kyle%20Tapay.pdf"
                download="Resume-Cyrick-Kyle-Tapay.pdf"
                className="secondary-button w-full sm:w-auto"
              >
                Download Resume
              </a>
              <a href="#contact" className="secondary-button w-full sm:w-auto">
                Contact Me
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
                      <Icon name={link.icon} className="size-5" />
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
                  <Icon name="terminal" className="size-5" />
                </div>
                <div>
                  <p className="hero-info-kicker">Current Focus</p>
                  <p className="hero-info-copy">
                    <span className="scan-highlight-soft">Web development</span> first, while continuing to explore <span className="scan-highlight-soft">mobile</span> and <span className="scan-highlight-soft">desktop apps</span>.
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
                      Next.js, React, Flutter, Supabase, Tauri, Git, Figma, and practical modern development tools.
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
                      <span className="scan-highlight-soft">Internships</span>, <span className="scan-highlight-soft">junior roles</span>, and collaborative projects where I can learn fast and <span className="scan-highlight-soft">contribute useful work</span>.
                    </p>
                  </div>
                </article>
              </div>

              <article className="surface-card hero-info-card">
                <div className="hero-info-icon">
                  <Icon name="globe" className="size-5" />
                </div>
                <div>
                  <p className="hero-info-kicker">Eligibility</p>
                  <p className="hero-info-copy">
                    <span className="scan-highlight-soft">
                      Career Service Professional Eligibility
                    </span>
                    , supporting readiness for formal and public-sector
                    opportunities.
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
                <p className="message-panel-kicker">What I am looking for</p>
                <ScrollMessage
                  text="I am looking for opportunities where I can contribute useful work, gain real experience, and keep growing across web, mobile, and desktop development."
                  className="message-panel-text"
                />
              </div>
            </Reveal>
          </div>
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
                <p className="message-panel-kicker">How I approach work</p>
                <ScrollMessage
                  text="I build with clarity, practicality, and continuous learning in mind, while staying open to tools and technologies that improve the way I work."
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
              title="Skills I am Practicing"
              description="The core tools and platforms I keep using as I grow across web development while continuing to build for mobile and desktop too."
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
                    {item.logoSrc ? (
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
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20 xl:gap-24">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Who I Am"
                description="I&apos;m Cyrick Kyle B. Tapay, focused on web development while continuing to grow across mobile and desktop application development."
              />
              <div className="space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                <p>
                  I&apos;m from Dolores, Eastern Samar, and I started with
                  simple layouts and curiosity before gradually moving toward
                  building digital solutions that feel useful and grounded in
                  real needs.
                </p>
                <p>
                  <span className="scan-highlight-soft">Web development</span> is my main focus, but I also explore <span className="scan-highlight-soft">mobile</span>
                  and <span className="scan-highlight-soft">desktop applications</span> to keep expanding my knowledge and stay
                  flexible across different platforms. I&apos;m still early in my
                  career, but I take <span className="scan-highlight-soft">iteration</span> seriously and aim to make
                  each build more disciplined, practical, and polished than the
                  last one.
                </p>
                <p>
                  I stay updated with current technologies, especially <span className="scan-highlight-soft">AI</span> and
                  <span className="scan-highlight-soft"> automation</span>, and I use them as practical tools to improve
                  <span className="scan-highlight-soft"> workflows</span>, efficiency, and the way I solve real-world
                  development problems.
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

            <Reveal delay={140} className="relative lg:flex lg:justify-end">
              <div className="profile-showcase mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:mx-0">
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
          <div className="surface-card grid gap-8 p-4 sm:p-6 md:gap-10 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-16 xl:p-12">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Let's Connect"
                description="I am looking for internships, junior opportunities, and projects where I can keep learning, contribute useful work, and grow across web, mobile, and desktop development."
              />
              <p className="max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                If you want to collaborate, ask about a project, or just say
                hello, I would be happy to hear from you.
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
                      <Icon name={item.icon} className="size-5" />
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
              We never stop learning.
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
                  <Icon name={item.icon} className="size-4" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
          <p className="font-mono text-sm text-muted/80">
            {"\u00A9"} {year} Crafted with precision and humility.
          </p>
        </div>
      </footer>
    </div>
  );
}
