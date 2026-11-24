import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { site, socials } from "@/data/profile";
import { navigation } from "@/lib/navigation";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40 py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{site.role}</p>
          </div>
          <nav
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"
            aria-label="Footer"
          >
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="inline-flex min-h-11 items-center no-underline hover:text-text"
              >
                {item.label}
              </Link>
            ))}
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex min-h-11 items-center no-underline hover:text-text"
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {s.label}
              </a>
            ))}
            <Link
              href="/#top"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium text-text no-underline"
            >
              Back to top <ArrowUp className="size-4" />
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
