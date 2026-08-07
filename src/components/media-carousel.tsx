"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { MediaEditItem } from "./portfolio-content";
import { Icon } from "./portfolio-icon";

export default function MediaCarousel({
  items,
}: {
  items: MediaEditItem[];
}) {
  const [selectedItem, setSelectedItem] = useState<MediaEditItem | null>(null);

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

  if (items.length === 0) {
    return null;
  }

  function getShape(item: MediaEditItem) {
    const ratio = item.width / item.height;

    if (ratio >= 2.15) {
      return "wide";
    }

    if (ratio >= 1.2) {
      return "landscape";
    }

    if (ratio <= 0.72) {
      return "poster";
    }

    return "portrait";
  }

  const galleryRows = [0, 1, 2].map((rowIndex) =>
    items.filter((_, itemIndex) => itemIndex % 3 === rowIndex),
  );
  const expandedVisual = selectedItem ? (
    <div
      className="media-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Full image view of ${selectedItem.title}`}
      onClick={() => setSelectedItem(null)}
    >
      <div
        className="dialog-panel media-lightbox-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setSelectedItem(null)}
          className="media-lightbox-close"
          aria-label="Close full image view"
        >
          <Icon name="x" className="size-5" />
        </button>

        <div className="media-lightbox-stage">
          <Image
            src={selectedItem.image}
            alt={selectedItem.alt}
            fill
            sizes="100vw"
            quality={100}
            priority
            className="object-contain"
          />
        </div>

        <div className="media-lightbox-caption">
          <span>Edited Visual</span>
          <strong>{selectedItem.title}</strong>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="media-carousel media-carousel-bleed">
        <div className="media-gallery" aria-label="Edited visuals gallery">
          <div className="media-gallery-stack">
            {galleryRows.map((rowItems, rowIndex) => (
              <div
                key={`media-gallery-row-${rowIndex}`}
                className="media-gallery-row"
                data-row={rowIndex + 1}
              >
                <div className="media-gallery-row-track">
                  {[...rowItems, ...rowItems].map((item, itemIndex) => (
                    <button
                      key={`${item.image}-${rowIndex}-${itemIndex}`}
                      type="button"
                      aria-label={`Open full view of ${item.title}`}
                      className="media-gallery-item"
                      data-shape={getShape(item)}
                      style={{
                        aspectRatio: `${item.width} / ${item.height}`,
                        position: "relative",
                      }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <Image
                        src={item.image}
                        alt={itemIndex < rowItems.length ? item.alt : ""}
                        fill
                        sizes="(min-width: 1280px) 30rem, (min-width: 768px) 24rem, 68vw"
                        className="object-contain"
                      />
                      <span className="media-gallery-caption">
                        <span>{item.label}</span>
                        <strong>{item.title}</strong>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {expandedVisual && typeof document !== "undefined"
        ? createPortal(expandedVisual, document.body)
        : null}
    </>
  );
}
