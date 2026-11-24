import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Brain,
  Cloud,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Layout,
  MapPin,
  Building2,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { about, site, skills } from "@/data/profile";
import {
  certifications,
  cv,
  education,
  earlierExperience,
  experience,
} from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { Badge, Button, Card, Container, Section, SectionHead } from "./ui";
import { ProjectCard } from "./ProjectCard";
import { MoreProjects } from "./MoreProjects";
import { ContactForm } from "./ContactForm";
import { ContactCta } from "./ContactCta";
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

export function WorkSection() {
  return (
    <Section id="work" ariaLabelledby="work-title">
      <Container>
        <SectionHead
          titleId="work-title"
          eyebrow="01 · Selected work"
          title="Things I’ve built"
          lede="Four projects that show how Mikias builds products and AI features end to end."
          action={
            <Link
              href="/#all-projects"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent no-underline"
            >
              Browse every project <ArrowUpRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <MoreProjects />
      </Container>
    </Section>
  );
}

export function Timeline() {
  return (
    <ol className="relative space-y-5 pl-8 md:pl-10">
      <span
        className="timeline-line absolute bottom-2 left-[0.55rem] top-2 w-px md:left-[0.8rem]"
        aria-hidden
      />
      {experience.map((role) => (
        <li
          key={`${role.title}-${role.org}-${role.period}`}
          className="relative"
        >
          <span
            className={`absolute -left-8 top-6 size-3 rounded-full ring-4 ring-bg md:-left-10 md:size-3.5 ${
              role.current ? "btn-grad pulse-dot" : "bg-line"
            }`}
            aria-hidden
          />
          <div className="card-glow rounded-[1.25rem] border border-line bg-surface p-5 shadow-card md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                {role.title}
                {role.current ? (
                  <span className="btn-grad ml-2 inline-flex rounded-full px-2.5 py-0.5 align-middle text-xs font-semibold text-on-accent">
                    Current
                  </span>
                ) : null}
              </h3>
              <p className="text-sm font-medium text-accent">{role.period}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {role.org}
              {role.location ? ` · ${role.location}` : ""}
              {role.type ? ` · ${role.type}` : ""}
            </p>
            {role.points.length > 0 ? (
              <ul className="mt-3 max-w-3xl space-y-2 text-sm text-muted md:text-[0.95rem]">
                {role.points.slice(0, 3).map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" ariaLabelledby="experience-title">
      <Container>
        <SectionHead
          titleId="experience-title"
          eyebrow="02 · Experience"
          title="Where I’ve worked"
          lede="Roles and dates, newest first. What I worked on at each stop."
          action={
            <Button href="/experience" variant="secondary" className="min-h-10 text-sm">
              Printable view
            </Button>
          }
        />
        <Timeline />
        <p className="mt-6 text-sm text-muted">
          Earlier: {earlierExperience.title} · {earlierExperience.org} ·{" "}
          {earlierExperience.type} · {earlierExperience.period}
        </p>
      </Container>
    </Section>
  );
}

const skillIcons: Record<string, LucideIcon> = {
  "AI & Machine Learning": Brain,
  "Backend & APIs": Server,
  "Frontend & Mobile": Layout,
  "Cloud & DevOps": Cloud,
};

export function SkillsSection() {
  return (
    <Section id="skills" ariaLabelledby="skills-title">
      <Container>
        <SectionHead
          titleId="skills-title"
          eyebrow="03 · Skills"
          title="Tools I use every day"
          lede="Grouped by the kind of work, from AI features to the pipelines that ship them."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((group, index) => {
            const Icon = skillIcons[group.title] ?? Sparkles;
            return (
              <Reveal key={group.title} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge>{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export function CredentialsSection() {
  const preview = certifications.slice(0, 4);
  return (
    <Section id="credentials" ariaLabelledby="credentials-title">
      <Container>
        <SectionHead
          titleId="credentials-title"
          eyebrow="04 · Credentials"
          title="Certified, and verifiable"
          lede="Every credential links to its issuer, so you can check it yourself."
          action={
            <Link
              href="/certifications"
              className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-accent no-underline"
            >
              Full gallery <ArrowUpRight className="size-4" />
            </Link>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {preview.map((c) => (
            <Card key={c.id} className="flex flex-col gap-3">
              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <BadgeCheck className="size-4 text-ok" aria-hidden />
                {c.issuer}
                {c.code ? ` · ${c.code}` : ""}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">
                {c.name.replace("Microsoft Certified: ", "")}
              </h3>
              <p className="text-sm text-muted">
                Issued {c.issued} · Valid until {c.validTo}
              </p>
              <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm font-semibold">
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 text-accent no-underline"
                >
                  Verify <ExternalLink className="size-4" />
                </a>
                {c.pdfUrl ? (
                  <a
                    href={c.pdfUrl}
                    download
                    className="inline-flex min-h-11 items-center gap-1 text-muted no-underline hover:text-text"
                  >
                    <FileText className="size-4" /> PDF
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
        <Card className="mt-6 flex items-center gap-4">
          <span className="inline-grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <GraduationCap className="size-6" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {education.degree}
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {education.school} · {education.period}
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  );
}

export function AboutSection() {
  const facts = [
    { label: "Based in", value: site.location, icon: MapPin },
    { label: "Works at", value: experience[0].org, icon: Building2 },
    { label: "Studied at", value: education.school, icon: GraduationCap },
  ];

  return (
    <Section id="about" ariaLabelledby="about-title">
      <Container>
        <SectionHead
          titleId="about-title"
          eyebrow="05 · About"
          title="A bit about me"
          lede="Short and to the point."
        />
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="max-w-[70ch] space-y-4 text-base text-muted md:text-lg">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-line bg-surface p-4"
                >
                  <fact.icon className="size-4 text-accent" aria-hidden />
                  <dt className="mt-2 text-xs uppercase tracking-wide text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-text">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-card">
            <Image
              src="/portraits/portrait-casual-800.webp"
              alt="Portrait of Mikias Abate"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 90vw, 360px"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </figure>
        </div>
      </Container>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" ariaLabelledby="contact-title">
      <Container>
        <SectionHead
          titleId="contact-title"
          eyebrow="06 · Contact"
          title="Let’s work together"
          lede="Say hello about a role, a contract, or a product problem. I reply fast."
        />
        <ContactCta />
        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Card className="flex flex-col gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block break-all text-lg font-semibold tracking-tight text-accent underline decoration-2 underline-offset-4"
              >
                {site.email}
              </a>
            </div>
            <p className="text-sm text-muted">{site.availability}</p>
            <SocialLinks />
            <Button
              href={cv.url}
              variant="secondary"
              className="mt-auto self-start"
              download={cv.filename}
            >
              <Download className="size-4" /> Download CV
            </Button>
          </Card>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
