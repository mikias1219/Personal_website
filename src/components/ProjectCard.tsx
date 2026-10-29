import Link from "next/link";
import { Icon } from "./Icon";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Card } from "./ui";
export function ProjectCard({ project }: { project: Project }) {
  const href = project.caseStudy
    ? `/work/${project.slug}`
    : project.githubLink || project.demoLink || "/#contact";
  return (
    <Card className="project-card">
      {project.diagram?.length ? (
        <ProjectVisual project={project} compact />
      ) : (
        <div className="project-stack-visual">
          <span className="mono accent">{project.categories.join(" / ")}</span>
          <p>{project.stack?.slice(0, 3).join(" · ")}</p>
        </div>
      )}
      <div className="project-copy">
        <p className="eyebrow">{project.categories.join(" / ")}</p>
        <h3>
          <Link href={href}>
            {project.title}
            <Icon name="arrow-up-right" />
          </Link>
        </h3>
        <p className="muted">{project.outcome || project.summary}</p>
        <p className="mono stack-line">{project.stack?.join(" · ")}</p>
        <Link href={href} className="text-link">
          <Icon
            name={
              project.caseStudy
                ? "layers"
                : project.githubLink
                  ? "github"
                  : "globe"
            }
          />{" "}
          {project.caseStudy ? "Read case study" : "View project"}{" "}
          <Icon name="arrow-up-right" />
        </Link>
      </div>
    </Card>
  );
}
