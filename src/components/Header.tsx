"use client";
import Link from "next/link";
import { Icon } from "./Icon";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { navigation } from "@/lib/navigation";
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (path !== "/") {
      document.documentElement.style.setProperty("--scroll-progress", "0");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = "";
      for (const { id } of navigation) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line)
          current = id;
      }
      setActive(current);
      const distance = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(distance > 0 ? scrollY / distance : 0),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [path]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="wordmark"
          href="/#top"
          aria-label="Mikias Abate — home"
        >
          <span className="brand-symbol">
            m<span>.</span>
          </span>
          <span className="brand-name">
            mikias<span className="muted"> / engineer</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {navigation
            .filter((l) => l.id !== "contact")
            .map((l) => (
              <Link
                key={l.id}
                href={`/#${l.id}`}
                aria-current={
                  path === "/" && active === l.id ? "location" : undefined
                }
              >
                {l.label}
              </Link>
            ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link
            className="button button-secondary contact-nav"
            aria-label="Contact"
            href="/#contact"
          >
            Let’s talk <Icon name="arrow-up-right" />
          </Link>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                toggle.current?.focus();
              }
            }}
          >
            {navigation.map((l) => (
              <Link
                key={l.id}
                href={`/#${l.id}`}
                onClick={() => setOpen(false)}
                aria-current={
                  path === "/" && active === l.id ? "location" : undefined
                }
              >
                {l.label} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
