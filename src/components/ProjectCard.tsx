import Link from "next/link";
import { ArrowUpRight, Building2, Code2, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "./ui";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const href = `/work/${project.slug}`;

  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article className="card-glow group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-surface shadow-card">
        <ProjectVisual project={project} />
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
          <div className="flex flex-wrap gap-2">
            {project.origin === "company" ? (
              <span className="btn-grad inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8rem] font-semibold text-on-accent">
                <Building2 className="size-3.5" aria-hidden /> {project.org}
              </span>
            ) : null}
            {project.categories.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
            {project.year ? <Badge>{project.year}</Badge> : null}
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
              <Link href={href} className="no-underline hover:text-accent">
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-muted md:text-base">
              {project.summary}
            </p>
          </div>
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
          {project.outcome ? (
            <p className="text-sm text-muted">
              <span className="font-semibold text-text">Result: </span>
              {project.outcome}
            </p>
          ) : null}
          <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm font-semibold">
            {project.caseStudy ? (
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex min-h-11 items-center gap-1 text-accent no-underline"
              >
                Case study <ArrowUpRight className="size-4" />
              </Link>
            ) : null}
            {project.private ? (
              <span className="inline-flex min-h-11 items-center gap-1.5 text-muted">
                <Lock className="size-4" aria-hidden /> Private repository
              </span>
            ) : null}
            {project.githubLink ? (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-muted no-underline hover:text-text"
              >
                <Code2 className="size-4" /> GitHub
              </a>
            ) : null}
            {project.demoLink ? (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-muted no-underline hover:text-text"
              >
                Live demo <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
