import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Card } from "./ui";
export function ProjectCard({ project }: { project: Project }) {
  const href = project.caseStudy
    ? `/work/${project.slug}`
    : project.githubLink || project.demoLink || "/contact";
  return (
    <Card className="project-card">
      <ProjectVisual project={project} compact />
      <div className="project-copy">
        <p className="eyebrow">{project.categories.join(" / ")}</p>
        <h3>
          <Link href={href}>
            {project.title}
            <span aria-hidden="true">↗</span>
          </Link>
        </h3>
        <p className="muted">{project.outcome || project.summary}</p>
        <p className="mono stack-line">{project.stack?.join(" · ")}</p>
        <Link href={href} className="text-link">
          {project.caseStudy ? "Read case study" : "View project"} ↗
        </Link>
      </div>
    </Card>
  );
}
