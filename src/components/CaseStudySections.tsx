import Link from "next/link";
import { Icon } from "./Icon";
import type { Project } from "@/data/projects";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
export type CaseSection =
  | "problem"
  | "role"
  | "architecture"
  | "decisions"
  | "stack"
  | "outcome"
  | "links";
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <aside className="placeholder">
      <span className="mono">CONTENT TO ADD</span>
      <p>{children}</p>
    </aside>
  );
}
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
        <section id="problem">
          <h2>Problem</h2>
          <p>{project.summary}</p>
          <Placeholder>
            TODO: add the original problem statement, constraints and intended
            users.
          </Placeholder>
        </section>
      );
    case "role":
      return (
        <section id="role">
          <h2>My role</h2>
          <p>
            {project.role ||
              "Project included in my portfolio; detailed ownership is awaiting documentation."}
          </p>
          <Placeholder>
            TODO: confirm individual ownership, collaborators and delivery
            scope.
          </Placeholder>
        </section>
      );
    case "architecture":
      return (
        <section id="architecture">
          <h2>Architecture</h2>
          <p>
            This conceptual overview groups the capabilities and technologies
            recorded in the project data. Deployment details await verification.
          </p>
          <ArchitectureDiagram project={project} />
          <Placeholder>
            TODO: add the verified architecture diagram and a product
            screenshot.
          </Placeholder>
        </section>
      );
    case "decisions":
      return (
        <section id="decisions">
          <h2>Key decisions & trade-offs</h2>
          <Placeholder>
            TODO: document an actual technical decision, alternatives considered
            and the trade-off.
          </Placeholder>
        </section>
      );
    case "stack":
      return (
        <section id="stack">
          <h2>Stack</h2>
          <ul className="stack-list">
            {project.stack?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      );
    case "outcome":
      return (
        <section id="outcome">
          <h2>Outcome</h2>
          <p>{project.outcome}</p>
          <Placeholder>
            TODO: add a measured result, evaluation method and time period. No
            performance or business metric has been supplied.
          </Placeholder>
        </section>
      );
    case "links":
      return (
        <section id="links">
          <h2>Links</h2>
          {project.githubLink && (
            <p>
              <a className="text-link" href={project.githubLink}>
                <Icon name="github" /> Source on GitHub{" "}
                <Icon name="arrow-up-right" />
              </a>
            </p>
          )}
          {project.demoLink && (
            <p>
              <a className="text-link" href={project.demoLink}>
                <Icon name="globe" /> Live demo <Icon name="arrow-up-right" />
              </a>
            </p>
          )}
          {!project.githubLink && !project.demoLink && (
            <p>
              A public repository or demo has not been supplied.{" "}
              <Link className="text-link" href="/#contact">
                Ask about this project ↗
              </Link>
            </p>
          )}
        </section>
      );
  }
}
