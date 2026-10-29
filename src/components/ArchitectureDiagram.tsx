import type { Project } from "@/data/projects";
export function ArchitectureDiagram({ project }: { project: Project }) {
  const nodes = project.diagram || [];
  return (
    <figure className="architecture-diagram">
      <svg
        viewBox={`0 0 560 ${nodes.length * 88 + 24}`}
        role="img"
        aria-labelledby={`${project.slug}-diagram-title ${project.slug}-diagram-description`}
      >
        <title id={`${project.slug}-diagram-title`}>
          {`${project.title}: conceptual capability flow`}
        </title>
        <desc id={`${project.slug}-diagram-description`}>
          {`${nodes.join(" → ")}. Illustrative relationships; deployment details await confirmation.`}
        </desc>
        {nodes.map((label, i) => (
          <g key={label}>
            {i > 0 && (
              <path
                d={`M280 ${i * 88 - 4} V${i * 88 + 20} m-5 -6 5 6 5-6`}
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
              />
            )}
            <rect
              x="60"
              y={i * 88 + 24}
              width="440"
              height="60"
              rx="8"
              fill="var(--surface)"
              stroke="var(--line)"
            />
            <circle cx="86" cy={i * 88 + 54} r="4" fill="var(--accent)" />
            <text
              x="108"
              y={i * 88 + 59}
              fill="var(--text)"
              fontSize="16"
              fontFamily="sans-serif"
            >
              {label}
            </text>
            <text
              x="460"
              y={i * 88 + 59}
              fill="var(--muted)"
              fontSize="12"
              fontFamily="monospace"
            >
              {`0${i + 1}`}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mono muted">
        Conceptual capability overview · architecture verification pending
      </figcaption>
    </figure>
  );
}
