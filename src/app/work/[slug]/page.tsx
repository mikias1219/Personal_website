import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Code2, Lock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button, Container, Section } from "@/components/ui";
import { ProjectMedia } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import {
  CaseStudySections,
  type CaseSection,
} from "@/components/CaseStudySections";
import { featuredProjects, projectBySlug } from "@/data/projects";
import { site } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return project
    ? pageMetadata(project.title, project.summary, `/work/${slug}`)
    : {};
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project?.caseStudy) notFound();
  const source = await readFile(
    path.join(process.cwd(), "src/content/work", `${project.slug}.mdx`),
    "utf8",
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${slug}`),
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: project.stack?.join(", "),
  };
  const next =
    featuredProjects[
      (featuredProjects.findIndex((p) => p.slug === slug) + 1) %
        featuredProjects.length
    ];

  const toc = [
    { id: "overview", label: "Overview", show: true },
    { id: "screens", label: "Screens", show: !!project.screenshots?.length },
    { id: "role", label: "My role", show: !!project.role },
    { id: "how-it-works", label: "How it works", show: !!project.diagram?.length },
    { id: "decisions", label: "Key decisions", show: !!project.decisions?.length },
    { id: "outcome", label: "Outcome", show: !!project.outcome },
  ].filter((t) => t.show);

  return (
    <Container>
      <Section>
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted no-underline hover:text-text"
        >
          <ArrowLeft className="size-4" /> All work
        </Link>

        <header className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <ul className="mb-5 flex flex-wrap gap-2">
              {project.origin === "company" ? (
                <li className="btn-grad inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-on-accent">
                  <Building2 className="size-3.5" aria-hidden /> {project.org}
                </li>
              ) : (
                <li className="rounded-full border border-line px-3 py-1 text-sm">
                  Personal project
                </li>
              )}
              {project.categories.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line px-3 py-1 text-sm"
                >
                  {c}
                </li>
              ))}
              {project.year ? (
                <li className="rounded-full border border-line px-3 py-1 text-sm">
                  {project.year}
                </li>
              ) : null}
            </ul>
            <h1 className="text-4xl tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted">
              {project.tagline ?? project.outcome ?? project.summary}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {project.demoLink ? (
                <Button href={project.demoLink}>
                  Try the live demo <ArrowUpRight className="size-4" />
                </Button>
              ) : null}
              {project.githubLink ? (
                <Button
                  href={project.githubLink}
                  variant={project.demoLink ? "secondary" : "primary"}
                >
                  <Code2 className="size-4" /> View source
                </Button>
              ) : null}
              {project.private ? (
                <span className="inline-flex min-h-11 items-center gap-2 text-sm text-muted">
                  <Lock className="size-4" aria-hidden /> Private company code.
                  Happy to walk through it in an interview.
                </span>
              ) : null}
            </div>
          </div>
          <div className="rounded-[1.5rem] border border-line bg-gradient-to-br from-accent-soft via-surface-2 to-transparent p-5 sm:p-8">
            <ProjectMedia project={project} priority />
          </div>
        </header>

        {project.highlights?.length ? (
          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-surface p-5 md:p-6">
                <dt className="text-2xl font-semibold tracking-tight text-accent md:text-3xl">
                  {h.value}
                </dt>
                <dd className="mt-1 text-sm text-muted">{h.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="grid max-w-3xl gap-12 lg:order-1">
            <MDXRemote
              source={source}
              components={{
                CaseSection: ({ section }: { section: CaseSection }) => (
                  <CaseStudySections project={project} section={section} />
                ),
              }}
            />
          </div>
          <aside className="space-y-5 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                Project facts
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                {project.org ? (
                  <div>
                    <dt className="text-muted">Company</dt>
                    <dd className="font-medium">{project.org}</dd>
                  </div>
                ) : null}
                {project.year ? (
                  <div>
                    <dt className="text-muted">Year</dt>
                    <dd className="font-medium">{project.year}</dd>
                  </div>
                ) : null}
                {project.role ? (
                  <div>
                    <dt className="text-muted">My role</dt>
                    <dd className="font-medium">{project.role}</dd>
                  </div>
                ) : null}
                {project.stack?.length ? (
                  <div>
                    <dt className="text-muted">Stack</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2.5 py-0.5 text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <nav
              aria-label="On this page"
              className="hidden rounded-2xl border border-line bg-surface p-5 lg:block"
            >
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                On this page
              </h2>
              <ul className="mt-3 space-y-1">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="block rounded-lg px-2 py-1.5 text-sm text-muted no-underline hover:bg-surface-2 hover:text-text"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        <nav
          className="mt-16 border-t border-line pt-8"
          aria-label="Next case study"
        >
          <p className="text-sm text-muted">Next case study</p>
          <Link
            href={`/work/${next.slug}`}
            className="group mt-3 grid items-center gap-5 rounded-2xl border border-line bg-surface p-4 no-underline transition hover:border-accent/60 sm:grid-cols-[14rem_1fr_auto]"
          >
            <div className="overflow-hidden rounded-xl border border-line">
              <ProjectVisual project={next} />
            </div>
            <span>
              <span className="block text-xl font-semibold tracking-tight md:text-2xl">
                {next.title}
              </span>
              <span className="mt-1 block text-sm text-muted">
                {next.tagline ?? next.outcome}
              </span>
            </span>
            <ArrowRight className="size-6 transition group-hover:translate-x-1" />
          </Link>
          <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
            Want to talk about this work?
            <Button href="/#contact" variant="secondary">
              Get in touch
            </Button>
          </p>
        </nav>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </Container>
  );
}
