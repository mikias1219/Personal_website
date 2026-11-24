"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { navigation } from "@/lib/navigation";
import { site } from "@/data/profile";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = navigation.filter((l) => l.id !== "contact");
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={`${site.name}, home`}>
          {site.name}
        </Link>
        <nav className="primary-nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.id} href={`/#${l.id}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="button button-primary button-small" href="/#contact">
            Contact
          </Link>
          <button
            ref={toggle}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <div className="container">
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
              <Link key={l.id} href={`/#${l.id}`} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
