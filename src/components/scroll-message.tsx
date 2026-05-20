"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollMessage({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.18);
      },
      {
        threshold: [0, 0.18, 0.4],
        rootMargin: "-8% 0px -12% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={`scroll-message ${visible ? "scroll-message-visible" : ""} ${className}`}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="scroll-message-word"
          style={{ ["--word-delay" as string]: `${index * 60}ms` }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
