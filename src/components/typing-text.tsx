"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  phrases: string[];
  className?: string;
};

export default function TypingText({
  phrases,
  className = "",
}: TypingTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (phrases.length === 0) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentPhrase.slice(0, displayText.length + 1);
          setDisplayText(nextText);

          if (nextText === currentPhrase) {
            setIsDeleting(true);
          }

          return;
        }

        const nextText = currentPhrase.slice(0, Math.max(displayText.length - 1, 0));
        setDisplayText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((currentIndex) => (currentIndex + 1) % phrases.length);
        }
      },
      !isDeleting && displayText === currentPhrase
        ? 1500
        : isDeleting
          ? 45
          : 85,
    );

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, phrases, prefersReducedMotion]);

  const resolvedText = prefersReducedMotion
    ? (phrases[phraseIndex % phrases.length] ?? "")
    : (displayText || "\u00A0");

  return (
    <span className={`typing-text ${className}`}>
      <span>{resolvedText}</span>
      <span className="typing-cursor" aria-hidden="true" />
    </span>
  );
}
