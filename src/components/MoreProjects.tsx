"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { projects, type Category } from "@/data/projects";
import { Badge, Button } from "./ui";

const filters: Array<"All" | Category> = [
  "All",
  "AI & LLM",
  "Full-stack",
  "Mobile",
  "DevOps",
];

export function MoreProjects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [expanded, setExpanded] = useState(false);

  const list = useMemo(() => {
    const rest = projects.filter((p) => !p.featured);
    return filter === "All"
      ? rest
      : rest.filter((p) => p.categories.includes(filter));
  }, [filter]);

  const shown = expanded ? list : list.slice(0, 6);

  return (
    <div id="all-projects" className="scroll-mt-24 pt-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">More projects</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`rounded-full border px-3.5 py-2 text-sm transition ${
                filter === f
                  ? "border-text bg-text text-bg"
                  : "border-line bg-surface text-muted hover:border-text hover:text-text"
              }`}
              aria-pressed={filter === f}
              onClick={() => {
                setFilter(f);
                setExpanded(false);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-muted" role="status">
        Showing {shown.length} of {list.length}
      </p>

      <ul className="divide-y divide-line border-y border-line">
        {shown.map((p) => (
          <li
            key={p.slug}
            className="project-item grid gap-3 py-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center"
          >
            <div>
              <h4 className="text-lg font-semibold tracking-tight">
                {p.title}
                {p.year ? (
                  <span className="ml-2 text-sm font-normal text-muted">
                    {p.year}
                  </span>
                ) : null}
              </h4>
              <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">
                {p.summary}
              </p>
              {p.stack?.length ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.stack.slice(0, 5).map((s) => (
                    <li key={s}>
                      <Badge>{s}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-semibold md:justify-end">
              {p.caseStudy ? (
                <a
                  href={`/work/${p.slug}`}
                  className="inline-flex min-h-11 items-center gap-1 text-accent no-underline"
                >
                  Case study <ArrowUpRight className="size-4" />
                </a>
              ) : null}
              {p.githubLink ? (
                <a
                  href={p.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 text-muted no-underline hover:text-text"
                >
                  <Code2 className="size-4" /> GitHub
                </a>
              ) : null}
              {p.demoLink ? (
                <a
                  href={p.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 text-muted no-underline hover:text-text"
                >
                  Demo <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {list.length > 6 ? (
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show fewer" : `Show all ${list.length} projects`}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
