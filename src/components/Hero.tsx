import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import { site } from "@/data/profile";
import { certifications, cv, experience } from "@/data/experience";
import { Button, Container } from "./ui";
import { LocalTime } from "./LocalTime";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

export function Hero() {
  const current = experience[0];
  const azureAi = certifications.find((c) => c.code === "AI-102");

  const chips = [
    {
      label: "Current role",
      value: `${current.title} at ${current.org}`,
      detail: current.period,
    },
    azureAi
      ? {
          label: "Certification",
          value: "Azure AI Engineer Associate",
          detail: azureAi.code,
        }
      : null,
    {
      label: "Location",
      value: site.location,
      detail: site.utcOffset,
    },
    {
      label: "Availability",
      value: site.availability,
      detail: null,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    detail: string | null;
  }[];

  return (
    <div id="top" className="border-b border-line bg-[radial-gradient(ellipse_at_top,_var(--accent-soft),_transparent_55%)]">
      <Container>
        <section
          className="grid items-center gap-10 py-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-14 md:py-20 lg:py-24"
          aria-labelledby="hero-title"
        >
          <Reveal>
            <p className="text-sm font-medium text-muted">
              {site.name} · {site.role}
            </p>
            <h1
              id="hero-title"
              className="mt-4 max-w-[18ch] text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
            >
              {site.headline}
            </h1>
            <p className="mt-5 max-w-[62ch] text-base text-muted md:text-lg">
              {site.statement} Currently {current.title} at {current.org} in
              Addis Ababa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`}>
                <Mail className="size-4" /> Contact me
              </Button>
              <Button href="/#work" variant="secondary">
                View projects <ArrowDown className="size-4" />
              </Button>
              <Button href={cv.url} variant="secondary" download={cv.filename}>
                <Download className="size-4" /> Download CV
              </Button>
            </div>
            <SocialLinks className="mt-6" includeEmail={false} />
            <p className="mt-5 text-sm text-muted">
              <LocalTime />
            </p>
          </Reveal>

          <Reveal delay={0.08} className="justify-self-center md:justify-self-end">
            <figure className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
              <Image
                src="/portraits/portrait-suit-800.webp"
                alt="Portrait of Mikias Abate"
                width={800}
                height={1000}
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="aspect-[4/5] w-full object-cover object-[50%_18%]"
              />
              <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
                {site.name} · Addis Ababa
              </figcaption>
            </figure>
          </Reveal>
        </section>

        <ul className="grid gap-6 border-t border-line py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {chips.map((chip) => (
            <li key={chip.label} className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {chip.label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug text-text">
                {chip.value}
              </p>
              {chip.detail ? (
                <p className="mt-1 text-xs text-muted">{chip.detail}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
