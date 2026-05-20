"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { ProjectItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";
import Reveal from "./reveal";

export default function ProjectShowcase({
  projects,
}: {
  projects: ProjectItem[];
}) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProject]);

  return (
    <>
      <section id="work" className="section-shell">
        <Reveal>
          <div className="section-divider-block flex flex-col gap-6 border-b border-outline/50 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                Things I Have Worked On
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base md:text-lg">
                A collection of student projects, interface concepts, and
                workflow studies that show how I learn, build, and improve
                through hands-on work.
              </p>
            </div>
            <a
              href="#contact"
              className="text-xs font-medium uppercase tracking-[0.26em] text-foreground underline underline-offset-4"
            >
              Start a Project Conversation
            </a>
          </div>
        </Reveal>

        <div className="section-content-gap grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 110}
            >
              <article className="project-card-clean group h-full">
                <div className="surface-card project-card-frame h-full overflow-hidden">
                  <div className="project-card-image-shell">
                    <div className="project-card-image aspect-[16/11]">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="project-image-wash absolute inset-0" />
                      <div className="project-status-badge">
                        {project.status}
                      </div>
                      <div className="project-index-badge">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <div className="project-card-copy">
                    <div className="space-y-5">
                      <div className="project-card-kicker-row">
                        <span className="project-card-kicker">
                          Project {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="project-card-divider-dot" />
                        <span className="project-card-kicker">
                          Practice Work
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-chip">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-[1.75rem] font-semibold tracking-[-0.05em] text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-base leading-7 text-muted">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <span className="project-card-footer-note">
                        Click for concept details
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="project-detail-link"
                      >
                        View Details
                        <Icon
                          name="arrow"
                          className="size-4 transition-transform group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {selectedProject ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-2.5 sm:p-4 md:items-center md:p-8">
          <button
            type="button"
            aria-label="Close project details"
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />
          <div className="dialog-panel relative z-10 flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden border border-outline bg-surface shadow-[var(--shadow-panel)]">
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[220px] border-b border-outline md:min-h-[520px] md:border-b-0 md:border-r">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.alt}
                  fill
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-5 overflow-y-auto p-4 sm:p-6 md:max-h-[92vh] md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                      {selectedProject.status}
                    </p>
                    <h3 className="mt-3 text-[1.7rem] font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex size-11 items-center justify-center border border-outline bg-surface-soft text-foreground"
                  >
                    <Icon name="x" className="size-5" />
                  </button>
                </div>

                <p className="text-base leading-7 text-muted">
                  {selectedProject.summary}
                </p>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Focus Areas
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.focus.map((item) => (
                      <span
                        key={item}
                        className="border border-outline px-3 py-1 text-xs text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Outcomes
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-muted">
                    {selectedProject.outcomes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 text-accent">
                          <Icon name="check" className="size-4" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                  <a href="#contact" className="primary-button w-full sm:w-auto">
                    Ask About This Project
                  </a>
                  <a
                    href={selectedProject.image}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button w-full sm:w-auto"
                  >
                    View Visual
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
