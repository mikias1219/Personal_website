import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, ExternalLink, FileText } from "lucide-react";
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
import { SocialLinks } from "./SocialLinks";
import { Reveal } from "./Reveal";

export function WorkSection() {
  return (
    <Section id="work" ariaLabelledby="work-title">
      <Container>
        <SectionHead
          titleId="work-title"
          title="Selected work"
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
    <ol className="border-t border-line">
      {experience.map((role) => (
        <li
          key={`${role.title}-${role.org}-${role.period}`}
          className="grid gap-2 border-b border-line py-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8"
        >
          <p className="text-sm text-muted">{role.period}</p>
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {role.title}
              {role.current ? (
                <span className="ml-2 inline-flex rounded-full bg-accent px-2.5 py-0.5 align-middle text-xs font-semibold text-on-accent">
                  Current
                </span>
              ) : null}
            </h3>
            <p className="mt-1 text-muted">
              {role.org}
              {role.location ? ` · ${role.location}` : ""}
              {role.type ? ` · ${role.type}` : ""}
            </p>
            {role.points.length > 0 ? (
              <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5 text-sm text-muted md:text-base">
                {role.points.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
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
          title="Experience"
          lede="Roles and dates, newest first. What he worked on at each stop."
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

export function SkillsSection() {
  return (
    <Section id="skills" ariaLabelledby="skills-title">
      <Container>
        <SectionHead
          titleId="skills-title"
          title="Skills"
          lede="Tools he uses day to day, grouped by the kind of work."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 0.04}
              className={index === 0 ? "sm:col-span-2" : ""}
            >
              <Card>
                <h3 className="text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
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
          title="Certifications and education"
          lede="Verified credentials and his degree. Open issuer links to check them yourself."
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
              <p className="text-sm text-muted">
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
        <Card className="mt-6">
          <h3 className="text-lg font-semibold tracking-tight">Education</h3>
          <p className="mt-2 text-base">
            {education.degree}
          </p>
          <p className="mt-1 text-sm text-muted">
            {education.school} · {education.period}
          </p>
        </Card>
      </Container>
    </Section>
  );
}

export function AboutSection() {
  const facts = [
    { label: "Based in", value: site.location },
    { label: "Works at", value: experience[0].org },
    { label: "Studied at", value: education.school },
  ];

  return (
    <Section id="about" ariaLabelledby="about-title">
      <Container>
        <SectionHead
          titleId="about-title"
          title="About"
          lede="A short introduction in his own words."
        />
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="max-w-[70ch] space-y-4 text-base text-muted md:text-lg">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-medium text-text">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
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
          title="Contact"
          lede="Say hello about a role, contract, or product problem."
        />
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <a
              href={`mailto:${site.email}`}
              className="inline-block text-xl font-semibold tracking-tight text-accent underline decoration-2 underline-offset-4 md:text-2xl"
            >
              {site.email}
            </a>
            <p className="mt-4 text-muted">{site.availability}</p>
            <SocialLinks className="mt-6" />
            <Button
              href={cv.url}
              variant="secondary"
              className="mt-8"
              download={cv.filename}
            >
              <Download className="size-4" /> Download CV
            </Button>
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
