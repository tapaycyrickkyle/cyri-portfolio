"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { NavigationItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";
import type { IconName } from "./portfolio-icon";

export default function SectionNav({
  navigation,
}: {
  navigation: NavigationItem[];
}) {
  const [progress, setProgress] = useState(0);
  const [activeHref, setActiveHref] = useState<`#${string}`>("#top");

  const sidebarItems = useMemo(
    () => [{ label: "Home", href: "#top" as const }, ...navigation],
    [navigation],
  );

  const sidebarIcons: IconName[] = [
    "dashboard",
    "briefcase",
    "book",
    "terminal",
    "user",
    "mail",
  ];

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
    const updateActiveSection = () => {
      const currentY = window.scrollY + window.innerHeight * 0.28;
      let nextActiveHref: `#${string}` = "#top";

      for (const item of sidebarItems) {
        const target = document.querySelector(item.href);

        if (!(target instanceof HTMLElement)) {
          continue;
        }

        if (target.offsetTop <= currentY) {
          nextActiveHref = item.href;
        }
      }

      if (window.scrollY <= 24) {
        nextActiveHref = "#top";
      }

      setActiveHref(nextActiveHref);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sidebarItems]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-1 w-full bg-transparent">
        <div
          className="h-full origin-left bg-accent transition-transform duration-200"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <aside className="portfolio-sidebar" aria-label="Portfolio menu">
        <a href="#top" className="portfolio-sidebar-brand" aria-label="Back to top">
          <span className="portfolio-sidebar-avatar">
            <Image
              src="/images/profile-picture.jpg"
              alt=""
              width={36}
              height={36}
              sizes="36px"
            />
            <span className="portfolio-sidebar-status" />
          </span>
          <span className="portfolio-sidebar-brand-text">
            <span className="portfolio-sidebar-name">Cyrick.Tapay</span>
            <span className="portfolio-sidebar-subtitle">Portfolio</span>
          </span>
        </a>

        <nav className="portfolio-sidebar-nav">
          <p className="portfolio-sidebar-label">Menu</p>
          {sidebarItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={() => setActiveHref(item.href)}
              className={`portfolio-sidebar-link ${
                activeHref === item.href ? "portfolio-sidebar-link-active" : ""
              }`}
            >
              <Icon
                name={sidebarIcons[index] ?? "link"}
                className="size-4"
              />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </header>
  );
}
