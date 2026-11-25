import Link from "next/link";
import { ArrowUpRight, Building2, Code2, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge, Button } from "./ui";
import { ProjectVisual } from "./ProjectVisual";
import { ShotFrame } from "./ShotFrame";
import { Reveal } from "./Reveal";

/** Cover media: a framed screenshot, a plain composite, or the diagram fallback. */
export function ProjectMedia({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const first = project.screenshots?.[0];
  if (project.image && project.frame === "browser" && first) {
    return (
      <ShotFrame
        src={project.image}
        alt={`${project.title} screenshot`}
        width={first.width}
        height={Math.round((first.width * 10) / 16)}
        label={project.title}
        priority={priority}
        className="transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--glow)]"
      />
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-line shadow-card transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--glow)]">
      <ProjectVisual project={project} />
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const href = `/work/${project.slug}`;
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <article className="card-glow group grid overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-card lg:grid-cols-[1.1fr_1fr]">
        <Link
          href={href}
          aria-label={`${project.title}: read the case study`}
          className={`relative flex items-center bg-gradient-to-br from-accent-soft via-surface-2 to-transparent p-5 no-underline sm:p-8 lg:p-10 ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <span
            className="pointer-events-none absolute left-5 top-4 text-6xl font-semibold tracking-tighter text-text/[0.06] sm:left-8 lg:text-8xl"
            aria-hidden
          >
            {number}
          </span>
          <div className="relative w-full">
            <ProjectMedia project={project} priority={index === 0} />
          </div>
        </Link>

        <div className="flex flex-col gap-5 p-6 md:p-8 lg:p-10">
          <div className="flex flex-wrap gap-2">
            {project.origin === "company" ? (
              <span className="btn-grad inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8rem] font-semibold text-on-accent">
                <Building2 className="size-3.5" aria-hidden /> {project.org}
              </span>
            ) : (
              <Badge>Personal project</Badge>
            )}
            {project.categories.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
            {project.year ? <Badge>{project.year}</Badge> : null}
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              <Link href={href} className="no-underline hover:text-accent">
                {project.title}
              </Link>
            </h3>
            {project.tagline ? (
              <p className="mt-2 text-base font-medium text-accent md:text-lg">
                {project.tagline}
              </p>
            ) : null}
            <p className="mt-3 text-sm text-muted md:text-base">
              {project.summary}
            </p>
          </div>

          {project.highlights?.length ? (
            <dl className="grid grid-cols-3 gap-3 border-y border-line py-4">
              {project.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="text-lg font-semibold tracking-tight text-text md:text-xl">
                    {h.value}
                  </dt>
                  <dd className="mt-0.5 text-xs leading-snug text-muted">
                    {h.label}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.role ? (
            <p className="text-sm">
              <span className="font-semibold">My role: </span>
              <span className="text-muted">{project.role}</span>
            </p>
          ) : null}

          {project.stack?.length ? (
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <Button href={href}>
              Read case study <ArrowUpRight className="size-4" />
            </Button>
            {project.demoLink ? (
              <Button href={project.demoLink} variant="secondary">
                Live demo <ArrowUpRight className="size-4" />
              </Button>
            ) : null}
            {project.githubLink ? (
              <Button href={project.githubLink} variant="ghost">
                <Code2 className="size-4" /> Source
              </Button>
            ) : null}
            {project.private ? (
              <span className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted">
                <Lock className="size-4" aria-hidden /> Private company code
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
