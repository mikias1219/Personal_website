import Image from "next/image";
import type { Category, Project } from "@/data/projects";

const tints: Record<Category, string> = {
  "AI & LLM": "from-sky-500/15 via-blue-500/10 to-transparent",
  "Full-stack": "from-emerald-500/15 via-teal-500/10 to-transparent",
  Mobile: "from-amber-500/15 via-orange-500/10 to-transparent",
  DevOps: "from-violet-500/15 via-indigo-500/10 to-transparent",
};

const stroke: Record<Category, string> = {
  "AI & LLM": "#6d7cff",
  "Full-stack": "#14b8a6",
  Mobile: "#f59e0b",
  DevOps: "#a78bfa",
};

export function ProjectVisual({ project }: { project: Project }) {
  const category = project.categories[0] ?? "Full-stack";
  const color = stroke[category];
  const steps = project.diagram?.length
    ? project.diagram
    : (project.stack ?? []).slice(0, 4);

  if (project.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden border-b border-line bg-gradient-to-br ${tints[category]}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 560 350"
        className="h-full w-full"
        role="presentation"
      >
        <defs>
          <pattern
            id={`dots-${project.slug}`}
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="560" height="350" fill={`url(#dots-${project.slug})`} />
        {(steps.length ? steps : [project.title]).map((step, i) => {
          const y = 56 + i * 62;
          return (
            <g key={`${step}-${i}`}>
              {i > 0 && (
                <line
                  x1="88"
                  y1={y - 30}
                  x2="88"
                  y2={y - 8}
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="3 4"
                />
              )}
              <rect
                x="48"
                y={y}
                width="464"
                height="44"
                rx="12"
                fill="var(--surface)"
                stroke={color}
                strokeOpacity="0.35"
              />
              <circle cx="88" cy={y + 22} r="6" fill={color} />
              <text
                x="112"
                y={y + 28}
                fill="var(--text)"
                fontSize="16"
                fontFamily="var(--font-geist-sans), sans-serif"
              >
                {step.length > 42 ? `${step.slice(0, 40)}…` : step}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
