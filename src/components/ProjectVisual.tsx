import type { Project } from "@/data/projects";
export function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div
      className={`project-visual ${compact ? "compact" : ""}`}
      role="img"
      aria-label={`${project.title} conceptual overview: ${project.diagram?.join(" → ")}`}
    >
      <div className="visual-top mono">
        <span>{project.slug.replaceAll("-", ".")}</span>
        <span aria-hidden="true">↗</span>
      </div>
      <div className="visual-nodes">
        {project.diagram?.map((node, i) => (
          <div className="visual-node" key={node}>
            <span className="node-dot" />
            <span>{node}</span>
            <span className="mono muted">0{i + 1}</span>
          </div>
        ))}
      </div>
      <p className="visual-caption mono">
        CONCEPTUAL OVERVIEW · NOT A PRODUCT SCREENSHOT
      </p>
    </div>
  );
}
