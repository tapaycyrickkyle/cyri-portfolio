"use client";

import { useEffect, useState } from "react";

import type { NavigationItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";
import ThemeToggle from "./theme-toggle";

export default function SectionNav({
  navigation: _navigation,
}: {
  navigation: NavigationItem[];
}) {
  const [progress, setProgress] = useState(0);
  const [toggleVisible, setToggleVisible] = useState(true);
  const [toggleOpen, setToggleOpen] = useState(false);

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
    let lastScrollY = window.scrollY;

    const updateToggleVisibility = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (Math.abs(scrollDelta) < 8) {
        return;
      }

      if (currentScrollY <= 24) {
        setToggleVisible(true);
      } else if (scrollDelta > 0) {
        setToggleVisible(false);
      } else {
        setToggleVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateToggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateToggleVisibility);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-1 w-full bg-transparent">
        <div
          className="h-full origin-left bg-accent transition-transform duration-200"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <div className="pointer-events-none fixed right-0 top-4 sm:top-5">
        <div
          className={`pointer-events-auto transition-all duration-300 ${
            toggleVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="theme-drawer flex items-center">
            <button
              type="button"
              aria-label={toggleOpen ? "Hide theme toggle" : "Show theme toggle"}
              aria-expanded={toggleOpen}
              onClick={() => setToggleOpen((current) => !current)}
              className={`theme-drawer-trigger inline-flex h-11 items-center justify-center text-foreground transition-all duration-300 ${
                toggleOpen ? "theme-drawer-trigger-open w-11" : "w-10"
              }`}
            >
              <Icon
                name="angle-right"
                className={`size-4 transition-transform duration-300 ${
                  toggleOpen ? "translate-x-1" : "rotate-180"
                }`}
              />
            </button>
            <div
              className={`theme-drawer-panel transition-all duration-300 ${
                toggleOpen
                  ? "max-w-[14rem] translate-x-0 opacity-100"
                  : "max-w-0 translate-x-3 opacity-0"
              }`}
            >
              <ThemeToggle variant="drawer" className="theme-switch-embedded" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
