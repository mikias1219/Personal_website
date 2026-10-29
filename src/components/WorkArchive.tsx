"use client";
import { useState } from "react";
import type { Category, Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
const categories: ("All" | Category)[] = [
  "All",
  "AI & LLM",
  "Full-stack",
  "Mobile",
  "DevOps",
];
export function WorkArchive({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<"All" | Category>("All");
  const filtered = projects.filter(
    (p) => category === "All" || p.categories.includes(category),
  );
  return (
    <>
      <div
        className="filter-row"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((c) => (
          <button
            className={`filter-chip ${category === c ? "active" : ""}`}
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <p role="status" className="mono archive-count">
        {filtered.length} projects / {category}
      </p>
      <div className="projects-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
