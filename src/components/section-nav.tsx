"use client";

import { useEffect, useMemo, useState } from "react";

import type { NavigationItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";
import ThemeToggle from "./theme-toggle";

function getIdFromHref(href: string) {
  return href.replace("#", "");
}

export default function SectionNav({
  navigation,
}: {
  navigation: NavigationItem[];
}) {
  const [activeId, setActiveId] = useState(getIdFromHref(navigation[0].href));
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const sectionIds = useMemo(
    () => navigation.map((item) => getIdFromHref(item.href)),
    [navigation],
  );

  useEffect(() => {
    const updateActiveSection = () => {
      const activationOffset = window.scrollY + 140;
      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      let nextActiveId = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (section && section.offsetTop <= activationOffset) {
          nextActiveId = id;
        }
      }

      if (documentHeight - pageBottom < 24) {
        nextActiveId = sectionIds[sectionIds.length - 1];
      }

      setActiveId(nextActiveId);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

      setProgress(nextProgress);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
      window.requestAnimationFrame(() => {
        const activationOffset = window.scrollY + 140;
        let nextActiveId = sectionIds[0];

        for (const id of sectionIds) {
          const section = document.getElementById(id);

          if (section && section.offsetTop <= activationOffset) {
            nextActiveId = id;
          }
        }

        setActiveId(nextActiveId);
      });
    };

    window.addEventListener("hashchange", closeMenu);

    return () => window.removeEventListener("hashchange", closeMenu);
  }, [sectionIds]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-1 w-full bg-transparent">
        <div
          className="h-full origin-left bg-accent transition-transform duration-200"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <div className="nav-shell border-b border-outline/60">
        <div className="mx-auto grid h-[68px] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-[var(--page-gutter)] md:h-[72px] md:grid-cols-[1fr_auto_1fr]">
          <a
            href="#top"
            className="nav-brand text-lg font-semibold tracking-[-0.12em] text-foreground md:text-xl"
          >
            CY.DEV
          </a>

          <nav className="nav-row hidden items-center gap-1.5 md:flex">
            {navigation.map((item) => {
              const isActive = activeId === getIdFromHref(item.href);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveId(getIdFromHref(item.href))}
                  className={`nav-link px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                    isActive
                      ? "nav-link-active bg-accent text-accent-foreground shadow-sm"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((current) => !current)}
              className="mobile-menu-button inline-flex size-11 items-center justify-center rounded-full border border-outline text-foreground md:hidden"
            >
              <Icon name={menuOpen ? "x" : "menu"} className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`mobile-nav-sheet absolute inset-x-[var(--page-gutter)] top-[80px] border border-outline p-3 shadow-[var(--shadow-panel)] transition-all duration-300 sm:top-[84px] sm:p-4 ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="grid gap-2">
            {navigation.map((item) => {
              const isActive = activeId === getIdFromHref(item.href);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveId(getIdFromHref(item.href));
                    setMenuOpen(false);
                  }}
                  className={`border px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                    isActive
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-outline bg-surface-soft text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
