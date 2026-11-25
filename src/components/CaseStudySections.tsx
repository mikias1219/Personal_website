import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "./ui";
import { ProjectVisual } from "./ProjectVisual";
import { ShotFrame } from "./ShotFrame";

export type CaseSection =
  | "problem"
  | "screens"
  | "role"
  | "architecture"
  | "decisions"
  | "stack"
  | "outcome"
  | "links";

/**
 * One block of a case study. Blocks without recorded facts render nothing,
 * so the page never shows placeholders or "to do" notes.
 */
export function CaseStudySections({
  project,
  section,
}: {
  project: Project;
  section: CaseSection;
}) {
  switch (section) {
    case "problem":
      return (
        <section id="overview" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="max-w-[70ch] text-base text-muted md:text-lg">
            {project.summary}
          </p>
        </section>
      );
    case "screens":
      return project.screenshots?.length ? (
        <section id="screens" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Screens</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {project.screenshots.map((shot) => {
              const portrait = shot.height > shot.width;
              return (
                <li
                  key={shot.src}
                  className={`space-y-2 ${portrait ? "" : "sm:col-span-2"}`}
                >
                  <figure className="space-y-3">
                    {portrait || project.frame !== "browser" ? (
                      <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          className={`h-auto ${portrait ? "mx-auto max-w-[320px]" : "w-full"}`}
                          sizes="(max-width: 768px) 100vw, 768px"
                        />
                      </div>
                    ) : (
                      <ShotFrame
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        label={project.title}
                        sizes="(max-width: 1024px) 100vw, 768px"
                      />
                    )}
                    <figcaption className="text-sm text-muted">
                      {shot.caption}
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null;
    case "role":
      return project.role ? (
        <section id="role" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">My role</h2>
          <p className="max-w-[70ch] text-base text-muted md:text-lg">
            {project.role}
          </p>
        </section>
      ) : null;
    case "architecture":
      return project.diagram?.length ? (
        <section id="how-it-works" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="overflow-hidden rounded-2xl border border-line">
            <ProjectVisual project={{ ...project, image: undefined }} />
          </div>
          <ol className="flex flex-wrap items-center gap-2">
            {project.diagram.map((step) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-xl border border-line bg-surface px-3 py-2 text-sm font-medium">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted">
            A high-level overview of recorded capabilities, not a deployment
            diagram.
          </p>
        </section>
      ) : null;
    case "decisions":
      return project.decisions?.length ? (
        <section id="decisions" className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Key decisions
          </h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {project.decisions.map((d) => (
              <li
                key={d.title}
                className="space-y-1 rounded-2xl border border-line bg-surface p-4"
              >
                <h3 className="text-base font-semibold">{d.title}</h3>
                <p className="text-sm text-muted">{d.body}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null;
    case "stack":
      return project.stack?.length ? (
        <section id="stack" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null;
    case "outcome":
      return project.outcome ? (
        <section id="outcome" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Outcome</h2>
          <p className="max-w-[70ch] text-base text-muted md:text-lg">
            {project.outcome}
          </p>
        </section>
      ) : null;
    case "links":
      return project.githubLink || project.demoLink ? (
        <section id="links" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Links</h2>
          <p className="flex flex-wrap gap-4 text-sm font-semibold">
            {project.githubLink ? (
              <a
                className="inline-flex min-h-11 items-center gap-2 text-accent no-underline"
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="size-4" /> Source on GitHub
              </a>
            ) : null}
            {project.demoLink ? (
              <a
                className="inline-flex min-h-11 items-center gap-2 text-accent no-underline"
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" /> Live demo
              </a>
            ) : null}
          </p>
        </section>
      ) : null;
  }
}
