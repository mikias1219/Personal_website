"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/navigation";
import { site } from "@/data/profile";
import { cv } from "@/data/experience";
import { Button, Container } from "./ui";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-[var(--header-h)] items-center gap-4">
          <Link
            href="/#top"
            className="text-lg font-semibold tracking-tight no-underline"
          >
            {site.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </Link>
          <nav
            className="ml-auto hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className={`rounded-full px-3 py-2 text-sm font-medium no-underline transition ${
                  active === item.id
                    ? "bg-surface-2 text-text"
                    : "text-muted hover:bg-surface-2 hover:text-text"
                }`}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <Button
              href={cv.url}
              variant="secondary"
              className="hidden min-h-10 px-4 text-sm lg:inline-flex"
              download={cv.filename}
            >
              Download CV
            </Button>
            <Button
              href="/#contact"
              className="hidden min-h-10 px-4 text-sm lg:inline-flex"
            >
              Contact
            </Button>
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
            className="grid gap-1 border-t border-line pb-4 pt-2 lg:hidden"
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
      </Container>
    </header>
  );
}
