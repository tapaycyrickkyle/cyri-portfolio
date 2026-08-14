"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { ClientWebsiteItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";

export default function ClientWebsiteCarousel({
  websites,
}: {
  websites: ClientWebsiteItem[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    function updateScrollState() {
      const node = scrollerRef.current;

      if (!node) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = node;
      const maxScroll = scrollWidth - clientWidth;

      setCanGoPrevious(scrollLeft > 4);
      setCanGoNext(scrollLeft < maxScroll - 4);
    }

    updateScrollState();

    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollByStep(direction: -1 | 1) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const firstCard = scroller.querySelector<HTMLElement>("[data-slide]");
    const gap = parseFloat(
      getComputedStyle(scroller).gap.replace("px", "") || "0",
    );
    const step = (firstCard?.offsetWidth ?? 0) + gap;

    scroller.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  if (websites.length === 0) {
    return null;
  }

  return (
    <div className="client-websites-carousel">
      <div className="client-websites-controls">
        <div className="client-websites-controls-row">
          <span className="client-websites-controls-label">
            Slide through the websites
          </span>
          <div className="client-websites-controls-buttons">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canGoPrevious}
              className="client-websites-control-button"
              aria-label="Previous business websites"
            >
              <Icon name="arrow" className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canGoNext}
              className="client-websites-control-button"
              aria-label="Next business websites"
            >
              <Icon name="arrow" className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="client-websites-scroller"
        aria-label="Business websites carousel"
      >
        {websites.map((website) => (
          <article
            key={website.title}
            data-slide
            className="client-website-item"
          >
            <a
              href={website.href}
              target="_blank"
              rel="noreferrer"
              className="client-website-preview"
              aria-label={`Visit ${website.title}`}
            >
              {website.image ? (
                <Image
                  src={website.image}
                  alt={website.alt}
                  fill
                  sizes="(min-width: 1180px) 33vw, (min-width: 768px) 50vw, 92vw"
                  className="object-cover object-top"
                />
              ) : (
                <span className="client-website-live-preview">
                  <span>Live Website</span>
                  <strong>{website.title}</strong>
                </span>
              )}
            </a>

            <div className="client-website-copy">
              <div>
                <p className="client-website-kicker">Business Website</p>
                <h3>{website.title}</h3>
              </div>
              <p>{website.category}</p>
              <div className="client-website-footer">
                <span>Built with Next.js</span>
                <a
                  href={website.href}
                  target="_blank"
                  rel="noreferrer"
                  className="client-website-link"
                >
                  Visit Website
                  <Icon name="arrow" className="size-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}