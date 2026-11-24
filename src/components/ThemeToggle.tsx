"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("themechange", onStoreChange);
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", onStoreChange);
  return () => {
    window.removeEventListener("themechange", onStoreChange);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", onStoreChange);
  };
}

function currentTheme(): "light" | "dark" {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "light");

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    dispatchEvent(new Event("themechange"));
  }

  return (
    <button
      type="button"
      className="inline-grid size-11 place-items-center rounded-full border border-line text-text transition hover:bg-surface-2"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      onClick={toggle}
    >
      {theme === "dark" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </button>
  );
}
