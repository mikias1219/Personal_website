"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="wordmark" href="/" aria-label="Mikias Abate — home">
          MA
          <span className="signal" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path.startsWith(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-secondary contact-nav" href="/contact">
            Contact <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
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
            {[...links, { href: "/contact", label: "Contact" }].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label} <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
