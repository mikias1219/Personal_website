"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/navigation";
import { site } from "@/data/profile";
import { cv } from "@/data/experience";
import { Container } from "./ui";
import { ThemeToggle } from "./ThemeToggle";
import { useChatPanel } from "./ChatProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { openPanel } = useChatPanel();

  /** If the hero chat is on screen, use it; otherwise open the floating panel. */
  function askAi() {
    const ask = document.getElementById("ask");
    const input = document.getElementById("portfolio-question");
    if (ask && input) {
      const r = ask.getBoundingClientRect();
      if (r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.3) {
        input.focus();
        return;
      }
    }
    openPanel();
  }

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 pt-3">
      <Container>
        <div
          className={`glass rounded-full px-3 transition-shadow duration-300 sm:px-4 ${
            scrolled ? "shadow-card" : ""
          }`}
        >
          <div className="flex min-h-14 items-center gap-3">
            <Link
              href="/#top"
              className="inline-flex items-center gap-2 pl-1 text-base font-semibold tracking-tight no-underline"
              aria-label={`${site.name} — home`}
            >
              <span
                className="btn-grad inline-grid size-8 place-items-center rounded-full text-sm font-bold text-on-accent"
                aria-hidden
              >
                M
              </span>
              <span className="hidden sm:inline">{site.name}</span>
            </Link>
            <nav
              className="ml-auto hidden items-center gap-0.5 lg:flex"
              aria-label="Primary"
            >
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium no-underline transition ${
                    active === item.id
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-text"
                  }`}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:ml-2">
              <button
                type="button"
                onClick={askAi}
                className="btn-grad hidden min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-on-accent transition active:scale-[0.97] sm:inline-flex"
                aria-haspopup="dialog"
              >
                <Sparkles className="size-4" aria-hidden /> Ask AI
                <kbd className="hidden rounded bg-black/15 px-1.5 py-0.5 text-[0.65rem] font-semibold md:inline">
                  ⌘K
                </kbd>
              </button>
              <ThemeToggle />
              <button
                type="button"
                className="inline-grid size-11 place-items-center rounded-full border border-line lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
          {open && (
            <nav
              id="mobile-nav"
              className="grid gap-1 border-t border-line pb-3 pt-2 lg:hidden"
              aria-label="Mobile"
            >
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className="rounded-xl px-3 py-3 text-base font-medium text-text no-underline hover:bg-surface-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                className="rounded-xl px-3 py-3 text-left text-base font-medium text-accent hover:bg-surface-2"
                onClick={() => {
                  setOpen(false);
                  openPanel();
                }}
              >
                Ask the AI assistant
              </button>
              <a
                href={cv.url}
                download={cv.filename}
                className="rounded-xl px-3 py-3 text-base font-medium text-text no-underline hover:bg-surface-2"
                onClick={() => setOpen(false)}
              >
                Download CV
              </a>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
}
