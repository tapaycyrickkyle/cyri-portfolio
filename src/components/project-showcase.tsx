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
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

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

  const projectImages = selectedProject?.images?.length
    ? selectedProject.images
    : selectedProject
      ? [selectedProject.image]
      : [];

  const canBrowseImages = projectImages.length > 1;

  function openProject(project: ProjectItem) {
    setActiveImageIndex(0);
    setSelectedProject(project);
  }

  function showPreviousImage() {
    setActiveImageIndex(
      (current) => (current - 1 + projectImages.length) % projectImages.length,
    );
  }

  function showNextImage() {
    setActiveImageIndex((current) => (current + 1) % projectImages.length);
  }

  return (
    <>
      <section id="work" className="section-shell">
        <Reveal>
          <div className="section-divider-block flex flex-col gap-6 border-b border-outline/50 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
                Projects I Have Worked On
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base md:text-lg">
                A collection of student projects, interface concepts, and
                workflow studies that show how I learn, build, and improve
                through hands-on work.
              </p>
            </div>
            {projects.length > 3 ? (
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setShowAllProjects((current) => !current)}
                className="project-see-all-button"
              >
                {showAllProjects ? "Show Less" : "See All"}
              </button>
            ) : null}
          </div>
        </Reveal>

        <div className="section-content-gap project-strip-wrap">
          <div
            className="project-strip"
            data-expanded={showAllProjects}
            role="list"
            aria-label="Projects"
          >
            {visibleProjects.map((project, index) => (
            <Reveal
              key={project.title}
              delay={index * 80}
              className="project-strip-item"
            >
              <article className="project-card-clean group h-full" role="listitem">
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
                        {String(projects.indexOf(project) + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  <div className="project-card-copy">
                    <div className="space-y-5">
                      <div className="project-card-kicker-row">
                        <span className="project-card-kicker">
                          Project {String(projects.indexOf(project) + 1).padStart(2, "0")}
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

                      <div className="space-y-2.5">
                        <h3 className="text-[1.75rem] font-semibold tracking-[-0.05em] text-foreground">
                          {project.title}
                        </h3>
                        <p className="project-card-description text-base leading-7 text-muted">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <span className="project-card-footer-note">
                        Click for concept details
                      </span>
                      <button
                        suppressHydrationWarning
                        type="button"
                        onClick={() => openProject(project)}
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
        </div>
      </section>

      {selectedProject ? (
        <div className="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto overscroll-contain p-2 sm:p-4 md:items-center md:p-6 lg:p-8">
          <button
            type="button"
            aria-label="Close project details"
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />
          <div className="dialog-panel relative z-10 flex h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] w-full max-w-[calc(100vw-1rem)] flex-col overflow-hidden border border-outline bg-surface shadow-[var(--shadow-panel)] sm:max-w-[calc(100vw-2rem)] sm:max-h-[calc(100dvh-2rem)] md:h-auto md:max-h-[94vh] md:max-w-6xl">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-3 top-3 z-20 inline-flex size-11 items-center justify-center border border-white/20 bg-black/55 text-white backdrop-blur-sm sm:right-4 sm:top-4 lg:hidden"
              aria-label="Close project details"
            >
              <Icon name="x" className="size-5" />
            </button>
            <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,0.88fr)_minmax(0,1fr)] gap-0 sm:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:grid-rows-1 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.8fr)]">
              <div className="flex min-h-0 flex-col overflow-hidden border-b border-outline bg-[#0d0f12] lg:border-b-0 lg:border-r">
                <div className="relative flex min-h-0 flex-1 items-center justify-center p-2 sm:p-4">
                  <Image
                    src={projectImages[activeImageIndex]}
                    alt={selectedProject.alt}
                    fill
                    sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw"
                    quality={100}
                    priority
                    className="object-contain"
                  />
                  <div className="pointer-events-none absolute inset-2.5 border border-white/10 sm:inset-4" />
                  {canBrowseImages ? (
                    <>
                      <button
                        suppressHydrationWarning
                        type="button"
                        aria-label="Previous project image"
                        onClick={showPreviousImage}
                        className="absolute left-2.5 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm sm:left-5 sm:size-11"
                      >
                        <Icon name="arrow" className="size-4 rotate-180" />
                      </button>
                      <button
                        suppressHydrationWarning
                        type="button"
                        aria-label="Next project image"
                        onClick={showNextImage}
                        className="absolute right-2.5 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm sm:right-5 sm:size-11"
                      >
                        <Icon name="arrow" className="size-4" />
                      </button>
                      <div className="absolute bottom-2.5 right-2.5 z-10 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:bottom-5 sm:right-5 sm:px-3 sm:text-[11px]">
                        {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                        {String(projectImages.length).padStart(2, "0")}
                      </div>
                    </>
                  ) : null}
                </div>

                {canBrowseImages ? (
                  <div className="flex shrink-0 gap-1.5 overflow-x-auto border-t border-white/10 bg-black/60 p-2 sm:gap-2 sm:p-4">
                    {projectImages.map((image, index) => (
                      <button
                        key={`${selectedProject.title}-${image}`}
                        suppressHydrationWarning
                        type="button"
                        aria-label={`Show project image ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border sm:h-20 sm:w-28 ${
                          index === activeImageIndex
                            ? "border-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
                            : "border-white/15 opacity-75"
                        }`}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="7rem"
                          quality={100}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="min-h-0 space-y-4 overflow-y-auto p-3 sm:p-5 lg:max-h-[92vh] lg:space-y-5 lg:p-7 xl:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                      {selectedProject.status}
                    </p>
                    <h3 className="mt-3 break-words text-[1.45rem] font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="hidden lg:inline-flex size-11 items-center justify-center border border-outline bg-surface-soft text-foreground"
                  >
                    <Icon name="x" className="size-5" />
                  </button>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                  {selectedProject.role ? (
                    <div className="border border-outline bg-surface-soft px-3 py-2.5 sm:px-4 sm:py-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
                        Role
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {selectedProject.role}
                      </p>
                    </div>
                  ) : null}
                  {selectedProject.projectType ? (
                    <div className="border border-outline bg-surface-soft px-3 py-2.5 sm:px-4 sm:py-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
                        Type
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {selectedProject.projectType}
                      </p>
                    </div>
                  ) : null}
                  {selectedProject.year ? (
                    <div className="border border-outline bg-surface-soft px-3 py-2.5 sm:px-4 sm:py-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
                        Year
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {selectedProject.year}
                      </p>
                    </div>
                  ) : null}
                </div>

                <p className="break-words text-[0.95rem] leading-6 text-muted sm:text-base sm:leading-7">
                  {selectedProject.summary}
                </p>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Technologies
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="project-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-soft">
                    Highlights
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedProject.focus.map((item) => (
                      <span
                        key={item}
                        className="max-w-full break-words border border-outline px-3 py-1 text-xs text-foreground"
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
                      <li key={item} className="flex min-w-0 gap-3">
                        <span className="mt-1 text-accent">
                          <Icon name="check" className="size-4" />
                        </span>
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sticky bottom-0 z-10 flex flex-col gap-2.5 border-t border-outline bg-surface/95 px-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:px-0 sm:py-2 sm:backdrop-blur-0 sm:flex-row sm:flex-wrap">
                  <a href="#contact" className="primary-button w-full sm:w-auto">
                    Ask About This Project
                  </a>
                  {selectedProject.githubLink ? (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="secondary-button w-full sm:w-auto"
                    >
                      View GitHub
                    </a>
                  ) : null}
                  <a
                    href={projectImages[activeImageIndex]}
                    target="_blank"
                    rel="noreferrer"
                    className="secondary-button w-full sm:w-auto"
                  >
                    Open Full Image
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
