"use client";
import { Icon } from "./Icon";

/** Both icons are in the DOM; CSS shows the one that matches the active theme, so there is no flash. */
export function ThemeToggle() {
  function toggle() {
    const current =
      document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    window.dispatchEvent(new Event("themechange"));
  }
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
    >
      <Icon name="sun" className="icon-sun" />
      <Icon name="moon" className="icon-moon" />
    </button>
  );
}
