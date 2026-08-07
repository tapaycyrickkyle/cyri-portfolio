"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

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
  const [drawerSpin, setDrawerSpin] = useState(false);
  const isDark = useSyncExternalStore(subscribe, getThemeSnapshot, () => false);
  const mounted = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (!storedTheme) {
      applyTheme(false);
    }
  }, []);

  function handleToggle() {
    const nextTheme = !getThemeSnapshot();

    if (variant === "drawer") {
      setDrawerSpin(false);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setDrawerSpin(true);
        });
      });
    }

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
        <span
          className={`theme-drawer-toggle-icon ${
            drawerSpin ? "theme-drawer-toggle-icon-spin" : ""
          }`}
          onAnimationEnd={() => setDrawerSpin(false)}
        >
          {effectiveIsDark ? (
            <Moon className="size-3.5" aria-hidden="true" strokeWidth={1.9} />
          ) : (
            <Sun className="size-3.5" aria-hidden="true" strokeWidth={1.9} />
          )}
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
              <Moon
                className={`theme-core-icon ${effectiveIsDark ? "theme-core-icon-visible" : "theme-core-icon-hidden"}`}
                aria-hidden="true"
                strokeWidth={1.9}
              />
              <Sun
                className={`theme-core-icon ${effectiveIsDark ? "theme-core-icon-hidden" : "theme-core-icon-visible"}`}
                aria-hidden="true"
                strokeWidth={1.9}
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
