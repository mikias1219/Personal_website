"use client";
import { useState } from "react";
import type { Category, Project } from "@/data/projects";

const categories: ("All" | Category)[] = [
  "All",
  "AI & LLM",
  "Full-stack",
  "Mobile",
  "DevOps",
];
const PREVIEW = 6;

export function MoreProjects({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<"All" | Category>("All");
  const [expanded, setExpanded] = useState(false);
  const filtered = projects.filter(
    (p) => category === "All" || p.categories.includes(category),
  );
  const visible = expanded ? filtered : filtered.slice(0, PREVIEW);
  return (
    <div className="more-projects" id="all-projects">
      <div className="more-head">
        <h3>More projects</h3>
        <div className="filters" role="group" aria-label="Filter projects by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <ul className="project-list">
        {visible.map((p) => (
          <li className="project-item" key={p.slug}>
            <div>
              <h4>
                {p.title}
                {p.year && <span>{p.year}</span>}
              </h4>
              <p className="project-summary">{p.summary}</p>
            </div>
            <div className="project-meta">
              {p.stack && <p>{p.stack.join(", ")}</p>}
              <p className="project-links">
                {p.githubLink && (
                  <a className="text-link" href={p.githubLink}>
                    Code
                  </a>
                )}
                {p.demoLink && (
                  <a className="text-link" href={p.demoLink}>
                    Live demo
                  </a>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="sr-only" role="status">
        Showing {visible.length} of {filtered.length} projects
      </p>
      {filtered.length > PREVIEW && (
        <button
          type="button"
          className="button button-secondary show-more"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show fewer" : `Show all ${filtered.length}`}
        </button>
      )}
    </div>
  );
}
