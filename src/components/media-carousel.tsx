"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { MediaEditItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";

export default function MediaCarousel({
  items,
}: {
  items: MediaEditItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    const rail = railRef.current;
    const thumb = thumbRefs.current[activeIndex];

    if (!rail || !thumb) {
      return;
    }

    const thumbCenter = thumb.offsetLeft + thumb.offsetWidth / 2;
    const targetLeft = Math.max(0, thumbCenter - rail.clientWidth / 2);

    rail.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  if (items.length === 0) {
    return null;
  }

  function goTo(index: number) {
    setActiveIndex(index);
  }

  function goPrev() {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }

  function goNext() {
    setActiveIndex((current) => (current + 1) % items.length);
  }

  const prevIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  return (
    <div className="media-carousel media-carousel-bleed surface-card overflow-hidden">
      <div className="media-carousel-editorial">
        <div className="media-carousel-top">
          <div className="media-carousel-canvas">
            <button
              type="button"
              onClick={() => goTo(prevIndex)}
              aria-label={`Show ${items[prevIndex]?.title}`}
              className="media-side-panel media-side-panel-left"
            >
              <span className="media-side-note">Previous</span>
              <span className="media-side-frame">
                <Image
                  src={items[prevIndex].image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 14rem, 0px"
                  className="object-cover"
                />
              </span>
            </button>

            <div className="media-carousel-mainstage">
              <div className="media-carousel-mainframe">
                <div
                  className="media-carousel-track flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="relative h-full min-h-[320px] w-full shrink-0 lg:min-h-[560px]"
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 52rem, 100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.08),rgba(7,7,7,0.18)_38%,rgba(7,7,7,0.58))]" />
                    </div>
                  ))}
                </div>

                <div className="media-active-meta">
                  <span className="media-active-kicker">Edited Visuals</span>
                  <div className="media-active-actions">
                    <span className="media-active-count">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                    <div className="media-carousel-controls">
                      <button
                        type="button"
                        aria-label="Previous media item"
                        onClick={goPrev}
                        className="media-carousel-button"
                      >
                        <Icon name="arrow" className="size-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next media item"
                        onClick={goNext}
                        className="media-carousel-button"
                      >
                        <Icon name="arrow" className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => goTo(nextIndex)}
              aria-label={`Show ${items[nextIndex]?.title}`}
              className="media-side-panel media-side-panel-right"
            >
              <span className="media-side-note">Next</span>
              <span className="media-side-frame">
                <Image
                  src={items[nextIndex].image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 14rem, 0px"
                  className="object-cover"
                />
              </span>
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="media-carousel-thumbnails"
          role="tablist"
          aria-label="Edited visuals gallery"
        >
          {items.map((item, index) => (
            <button
              key={item.title}
              ref={(element) => {
                thumbRefs.current[index] = element;
              }}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show ${item.title}`}
              aria-pressed={index === activeIndex}
              aria-selected={index === activeIndex}
              role="tab"
              className={`media-carousel-thumb ${index === activeIndex ? "media-carousel-thumb-active" : ""}`}
            >
              <span className="media-carousel-thumb-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="media-carousel-thumb-image">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </span>
              <span className="media-carousel-thumb-copy">
                <span className="media-carousel-thumb-kicker">{item.label}</span>
                <span className="media-carousel-thumb-title">{item.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
