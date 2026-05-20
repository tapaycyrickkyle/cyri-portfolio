import Image from "next/image";
import ContactForm from "../components/contact-form";
import {
  contactLinks,
  footerLinks,
  futureAreas,
  heroSocialLinks,
  mediaEdits,
  navigation,
  projects,
  techStackItems,
} from "../components/portfolio-content";
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

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div id="top" className="page-shell relative isolate overflow-x-clip">
      <SectionNav navigation={navigation} />

      <main className="pt-20 md:pt-24 lg:pt-22 xl:pt-24">
        <section className="section-shell section-hero grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(17rem,0.96fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] xl:gap-10">
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
              <h1 className="max-w-none text-[2.2rem] font-semibold leading-[0.94] tracking-[-0.075em] text-foreground sm:text-[3.2rem] md:text-[3.45rem] lg:text-[3.6rem] xl:text-[4.8rem]">
                Building thoughtful products while finding my place in tech.
              </h1>
              <p className="max-w-3xl text-[0.98rem] leading-7 text-muted sm:text-base md:text-[1rem] md:leading-8 lg:max-w-2xl lg:text-[1.02rem] xl:max-w-3xl xl:text-[1.08rem]">
                I&apos;m an IT student focused on front-end development, UI
                implementation, and practical AI-assisted workflows. I enjoy
                building structured interfaces, improving usability, and
                learning through real project work. I&apos;m currently looking
                for internships, junior opportunities, and collaborative work
                where I can keep growing while contributing something useful.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#work" className="primary-button w-full sm:w-auto">
                View My Work
                <Icon name="arrow" className="size-4" />
              </a>
              <a
                href="/cyrick-kyle-b-tapay-cv.txt"
                download="Cyrick-Kyle-B-Tapay-CV.txt"
                className="secondary-button w-full sm:w-auto"
              >
                Download CV
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
                    Front-end development, UI implementation, and practical AI-assisted workflows.
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
                      Next.js, React, Supabase, Figma, Git, and design systems that stay clean and useful.
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
                      Internships, junior opportunities, and collaborative projects where I can keep learning through execution.
                    </p>
                  </div>
                </article>
              </div>

              <article className="surface-card hero-info-card">
                <div className="hero-info-icon">
                  <Icon name="globe" className="size-5" />
                </div>
                <div>
                  <p className="hero-info-kicker">Based In</p>
                  <p className="hero-info-copy">
                    Dolores, Eastern Samar, Philippines. Open to onsite internships, junior roles, and practical team-based opportunities.
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
                <p className="message-panel-kicker">More than a list of projects</p>
                <ScrollMessage
                  text="I care about how things are structured, how they feel to use, and what they teach me while I build them."
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
                <p className="message-panel-kicker">Still learning. Still building.</p>
                <ScrollMessage
                  text="The path is non-linear, but every iteration makes the next one stronger."
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
              description="The core tools and platforms I keep using as I build and improve."
            />
          </Reveal>

          <div className="section-content-gap grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(8.5rem,1fr))]">
            {techStackItems.map((item, index) => (
              <Reveal
                key={item.label}
                delay={index * 70}
                variant="up"
                className="reveal-no-blur"
              >
                <article className="surface-card tech-stack-card skill-card p-4 sm:p-5">
                  <div className="tech-stack-icon-shell">
                    {item.logoSrc ? (
                      <img
                        src={item.logoSrc}
                        alt=""
                        aria-hidden="true"
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
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="profile"
          className="section-shell"
        >
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Who I Am"
                description="I&apos;m Cyrick Kyle B. Tapay, an IT student focused on building useful interfaces and growing into reliable product work."
              />
              <div className="space-y-4 text-base leading-7 text-muted sm:text-lg sm:leading-8">
                <p>
                  I&apos;m Cyrick Kyle B. Tapay from Dolores, Eastern Samar. I
                  started with simple layouts and curiosity, then gradually
                  moved toward building interfaces that feel useful,
                  understandable, and grounded in real needs.
                </p>
                <p>
                  I&apos;m strongest when design and logic have to meet in the
                  middle. I enjoy front-end development, UI implementation,
                  and practical workflow thinking, especially when a project
                  needs clearer structure and better usability. I&apos;m still
                  early in my career, but I take iteration seriously and I
                  like turning each build into something more disciplined than
                  the last one.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </Reveal>

            <Reveal delay={140} className="relative lg:flex lg:justify-end">
              <div className="profile-frame relative mx-auto aspect-square w-full max-w-[19rem] overflow-hidden border border-outline bg-surface p-5 shadow-[var(--shadow-panel)] sm:max-w-[22rem] sm:p-6 md:max-w-[25rem] md:p-8 lg:mx-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(30,30,30,0.08)_0.8px,_transparent_0.8px)] [background-size:20px_20px] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0.8px,_transparent_0.8px)]" />
                <div className="relative z-10 h-full overflow-hidden">
                  <Image
                    src="/images/profile-picture.jpg"
                    alt="Portrait of Cyrick Kyle B. Tapay."
                    fill
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-shell">
          <Reveal>
            <SectionHeading
              title="Areas I Want to Explore"
              description="The kinds of roles, technologies, and problem spaces that feel closest to where I want to grow, especially through AI, automation, and practical systems work."
            />
          </Reveal>

          <div className="section-content-gap grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(14rem,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))]">
            {futureAreas.map((area, index) => (
              <Reveal
                key={area.title}
                className="h-full"
                delay={index * 90}
                variant={index % 2 === 0 ? "left" : "right"}
              >
                <article className="surface-card future-card group h-full p-6 transition-all duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <p className="future-card-kicker font-mono text-[11px] uppercase tracking-[0.22em] text-muted-soft">
                      Growth Area
                    </p>
                    <span className="future-card-count">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <span className="future-card-icon-shell">
                      <Icon
                        name={area.icon}
                        className="future-card-icon size-5 text-accent transition-colors"
                      />
                    </span>
                    <h3 className="future-card-title text-xl font-semibold text-foreground transition-colors">
                      {area.title}
                    </h3>
                  </div>
                  <p className="future-card-body mt-5 text-sm leading-6 text-muted transition-colors">
                    {area.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="section-shell"
        >
          <div className="surface-card grid gap-10 p-5 sm:p-6 md:p-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal className="space-y-8">
              <SectionHeading
                title="Let's Connect"
                description="I am looking for internships, junior opportunities, and projects where I can keep learning while shipping something useful."
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
              <ContactForm email="tapaycyrickkyle@gmail.com" />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer border-t border-outline/50 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-[var(--page-gutter)] text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <a
              href="#top"
              className="brand-badge text-lg font-semibold tracking-[-0.12em] text-foreground"
            >
              CY.DEV
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
