"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { CSSProperties, ReactNode } from "react";

export default function AutoScrollRail({
  children,
  className = "",
  trackClassName = "",
  paused = false,
  duration = 34,
  duplicateForLoop = true,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  paused?: boolean;
  duration?: number;
  duplicateForLoop?: boolean;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const railChildren = useMemo(() => {
    if (!duplicateForLoop) {
      return <div className="card-rail-group">{children}</div>;
    }

    return (
      <>
        <div className="card-rail-group">{children}</div>
        <div className="card-rail-group" aria-hidden="true">
          {children}
        </div>
      </>
    );
  }, [children, duplicateForLoop]);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(rail);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={railRef}
      className={className}
      data-paused={paused || !isVisible}
      style={
        {
          "--rail-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      <div className={trackClassName || "card-rail-track"}>{railChildren}</div>
    </div>
  );
}
