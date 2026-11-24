import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import { site } from "@/data/profile";
import { certifications, cv, experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { Button, Container } from "./ui";
import { LocalTime } from "./LocalTime";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";
import { PortfolioChat } from "./PortfolioChat";

export function Hero() {
  const current = experience[0];
  const split = site.headline.indexOf("the AI");
  const lead = split > 0 ? site.headline.slice(0, split) : site.headline;
  const tail = split > 0 ? site.headline.slice(split) : "";

  const stats = [
    { value: `${projects.length}`, label: "Selected projects" },
    { value: `${certifications.length}`, label: "Certifications" },
    { value: "3", label: "Stacks: API · Web · Mobile" },
  ];

  return (
    <div id="top" className="relative isolate overflow-hidden">
      <div className="aurora" aria-hidden />
      <div className="grid-bg" aria-hidden />
      <Container className="relative z-10">
        <section
          className="grid items-center gap-12 pb-14 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pb-20 lg:pt-16"
          aria-labelledby="hero-title"
        >
          <Reveal>
            <div className="flex items-center gap-3">
              <Image
                src="/portraits/portrait-suit-480.webp"
                alt={`Portrait of ${site.name}`}
                width={160}
                height={160}
                priority
                className="size-16 rounded-full object-cover object-[50%_12%] shadow-card ring-1 ring-line"
              />
              <div>
                <p className="font-semibold leading-tight">{site.name}</p>
                <p className="text-sm text-muted">
                  {current.title} · {current.org}
                </p>
              </div>
            </div>

            <p className="relative mt-7 flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
              <span
                className="pulse-dot relative size-2 rounded-full bg-ok"
                aria-hidden
              />
              {site.availability}
            </p>

            <h1
              id="hero-title"
              className="mt-5 max-w-[21ch] text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              {lead}
              {tail ? <span className="grad-text block">{tail}</span> : null}
            </h1>
            <p className="mt-5 max-w-[56ch] text-base text-muted md:text-lg">
              {site.statement}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cv.url} download={cv.filename}>
                <Download className="size-4" /> Download CV
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary">
                <Mail className="size-4" /> Contact me
              </Button>
              <Button href="/#work" variant="ghost">
                See my work <ArrowDown className="size-4" />
              </Button>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl px-4 py-3"
                >
                  <dd className="grad-text text-3xl font-semibold tracking-tight">
                    {s.value}
                  </dd>
                  <dt className="mt-0.5 text-xs leading-snug text-muted">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <SocialLinks includeEmail={false} />
              <p className="text-sm text-muted">
                <LocalTime />
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative">
              <div
                className="absolute -inset-2 -z-10 rounded-[2rem] opacity-30 blur-2xl"
                style={{ background: "var(--grad)" }}
                aria-hidden
              />
              <div
                id="ask"
                className="chat-surface flex h-[36rem] scroll-mt-28 flex-col overflow-hidden rounded-[1.5rem] shadow-card sm:h-[38rem]"
              >
                <PortfolioChat variant="hero" headingId="hero-chat-title" />
              </div>
            </div>
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
