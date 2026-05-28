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
  const [selectedItem, setSelectedItem] = useState<MediaEditItem | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (items.length <= 1 || selectedItem) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [items.length, selectedItem]);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedItem]);

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
    <>
      <div className="media-carousel media-carousel-bleed">
        <div className="media-carousel-editorial">
          <div className="media-carousel-top">
            <div className="media-carousel-canvas overflow-hidden">
            <button
              suppressHydrationWarning
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
                <div className="media-carousel-mainmedia">
                  <div
                    className="media-carousel-track flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {items.map((item) => (
                      <div
                        key={item.title}
                        className="media-carousel-slide relative h-full w-full shrink-0"
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

                  <button
                    suppressHydrationWarning
                    type="button"
                    onClick={() => setSelectedItem(items[activeIndex])}
                    aria-label={`Open full view of ${items[activeIndex]?.title}`}
                    className="media-carousel-mainbutton"
                  />

                  <div className="media-active-meta">
                    <span className="media-active-kicker">Edited Visuals</span>
                    <div className="media-active-actions">
                      <span className="media-active-count">
                        Click image to expand
                      </span>
                      <div className="media-carousel-controls">
                        <button
                          suppressHydrationWarning
                          type="button"
                          aria-label="Previous media item"
                          onClick={goPrev}
                          className="media-carousel-button"
                        >
                          <Icon name="arrow" className="size-4 rotate-180" />
                        </button>
                        <button
                          suppressHydrationWarning
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
            </div>

            <button
              suppressHydrationWarning
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
            className="media-carousel-thumbnails surface-card"
            role="tablist"
            aria-label="Edited visuals gallery"
          >
            {items.map((item, index) => (
              <button
                key={item.title}
                ref={(element) => {
                  thumbRefs.current[index] = element;
                }}
                suppressHydrationWarning
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${item.title}`}
                aria-selected={index === activeIndex}
                role="tab"
                className={`media-carousel-thumb ${index === activeIndex ? "media-carousel-thumb-active" : ""}`}
              >
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
      {selectedItem ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto overscroll-contain p-2.5 sm:p-4 md:items-center md:p-8">
          <button
            type="button"
            aria-label="Close full image view"
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />
          <div className="dialog-panel relative z-10 flex w-full max-w-[calc(100vw-1.25rem)] flex-col overflow-hidden border border-white/10 bg-[#0d0f12] shadow-[var(--shadow-panel)] sm:max-w-[calc(100vw-2rem)] md:max-w-6xl">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-3 top-3 z-[3] inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-sm sm:right-4 sm:top-4"
              aria-label="Close full image view"
            >
              <Icon name="x" className="size-5" />
            </button>

            <div className="relative flex h-[min(78dvh,52rem)] min-h-[15rem] items-center justify-center bg-[#0d0f12] p-2.5 sm:h-[min(84dvh,52rem)] sm:p-4">
              <Image
                src={selectedItem.image}
                alt={selectedItem.alt}
                fill
                sizes="(min-width: 1280px) 72rem, (min-width: 768px) 88vw, 100vw"
                quality={100}
                priority
                className="object-contain"
              />
              <div className="pointer-events-none absolute inset-2.5 border border-white/10 sm:inset-4" />
              <div className="absolute bottom-3 left-3 right-3 z-[2] flex flex-wrap items-end justify-between gap-2.5 sm:bottom-5 sm:left-5 sm:right-5 sm:gap-3">
                <span className="border border-white/15 bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                  Edited Visual
                </span>
                <span className="max-w-full break-words border border-white/15 bg-black/55 px-3 py-1 text-left text-sm font-medium text-white backdrop-blur-sm sm:max-w-[60%] sm:text-right sm:text-base">
                  {selectedItem.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
