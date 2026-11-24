import { Icon } from "./Icon";
import type { Project } from "@/data/projects";

export type CaseSection =
  | "problem"
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
        <section id="overview">
          <h2>What it is</h2>
          <p>{project.summary}</p>
        </section>
      );
    case "role":
      return project.role ? (
        <section id="role">
          <h2>My role</h2>
          <p>{project.role}</p>
        </section>
      ) : null;
    case "architecture":
      return project.diagram?.length ? (
        <section id="how-it-fits">
          <h2>How it fits together</h2>
          <ol className="flow">
            {project.diagram.map((step) => (
              <li key={step}>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="flow-note">
            A high-level overview of what the project covers, not a deployment
            diagram.
          </p>
        </section>
      ) : null;
    case "decisions":
      return null;
    case "stack":
      return project.stack?.length ? (
        <section id="stack">
          <h2>Stack</h2>
          <ul className="tags">
            {project.stack.map((s) => (
              <li className="tag" key={s}>
                {s}
              </li>
            ))}
          </ul>
        </section>
      ) : null;
    case "outcome":
      // The outcome is already the lead sentence in the page header.
      return null;
    case "links":
      return project.githubLink || project.demoLink ? (
        <section id="links">
          <h2>Links</h2>
          <p className="inline-actions">
            {project.githubLink && (
              <a className="text-link" href={project.githubLink}>
                <Icon name="github" /> Source on GitHub
              </a>
            )}
            {project.demoLink && (
              <a className="text-link" href={project.demoLink}>
                <Icon name="globe" /> Live demo
              </a>
            )}
          </p>
        </section>
      ) : null;
  }
}
