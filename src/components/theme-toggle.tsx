"use client";

import { useEffect, useSyncExternalStore } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const STORAGE_KEY = "portfolio-theme";
const THEME_EVENT = "portfolio-theme-change";

function getThemeSnapshot() {
  if (typeof document === "undefined") {
    return false;
  }

  return document.documentElement.classList.contains("dark");
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onThemeChange = () => callback();
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  window.addEventListener(THEME_EVENT, onThemeChange);
  mediaQuery.addEventListener("change", onThemeChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onThemeChange);
    mediaQuery.removeEventListener("change", onThemeChange);
  };
}

function subscribeHydration() {
  return () => {};
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "drawer";
}) {
  const isDark = useSyncExternalStore(subscribe, getThemeSnapshot, () => false);
  const mounted = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (!storedTheme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      applyTheme(prefersDark);
    }
  }, []);

  function handleToggle() {
    const nextTheme = !getThemeSnapshot();

    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme ? "dark" : "light");
  }

  const effectiveIsDark = mounted ? isDark : false;
  const buttonLabel = mounted
    ? effectiveIsDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle color theme";

  return (
    variant === "drawer" ? (
      <button
        suppressHydrationWarning
        type="button"
        onClick={handleToggle}
        aria-label={buttonLabel}
        aria-pressed={effectiveIsDark}
        className={`theme-drawer-toggle group ${className}`.trim()}
      >
        <span className="theme-drawer-toggle-icon">
          <FontAwesomeIcon icon={effectiveIsDark ? faMoon : faSun} className="size-3.5" />
        </span>
        <span className="theme-drawer-toggle-copy">
          <span className="theme-drawer-toggle-kicker">Theme</span>
          <span className="theme-drawer-toggle-value">
            {effectiveIsDark ? "Dark" : "Light"}
          </span>
        </span>
      </button>
    ) : (
      <button
        suppressHydrationWarning
        type="button"
        onClick={handleToggle}
        aria-label={buttonLabel}
        aria-pressed={effectiveIsDark}
        className={`theme-switch group ${className}`.trim()}
      >
        <span className="theme-track">
          <span
            className={`theme-thumb ${effectiveIsDark ? "theme-thumb-dark" : "theme-thumb-light"}`}
          >
            <span className="theme-thumb-glow" />
            <span
              className={`theme-icon-stack ${effectiveIsDark ? "theme-icon-stack-dark" : "theme-icon-stack-light"}`}
            >
              <FontAwesomeIcon
                icon={faMoon}
                className={`theme-core-icon ${effectiveIsDark ? "theme-core-icon-visible" : "theme-core-icon-hidden"}`}
              />
              <FontAwesomeIcon
                icon={faSun}
                className={`theme-core-icon ${effectiveIsDark ? "theme-core-icon-hidden" : "theme-core-icon-visible"}`}
              />
            </span>
          </span>
        </span>

        <span className="theme-switch-label hidden sm:inline-flex">
          <span className="theme-switch-text">{effectiveIsDark ? "Dark" : "Light"}</span>
        </span>
      </button>
    )
  );
}
