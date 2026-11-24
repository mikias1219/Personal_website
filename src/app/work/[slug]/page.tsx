import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Section } from "@/components/ui";
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

  return (
    <Container>
      <Section>
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted no-underline hover:text-text"
        >
          <ArrowLeft className="size-4" /> All work
        </Link>
        <header className="mt-6 max-w-3xl">
          <h1 className="text-4xl tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted">
            {project.outcome ?? project.summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
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
        </header>
        <div className="mt-10 grid max-w-3xl gap-10">
          <MDXRemote
            source={source}
            components={{
              CaseSection: ({ section }: { section: CaseSection }) => (
                <CaseStudySections project={project} section={section} />
              ),
            }}
          />
        </div>
        <nav
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
          aria-label="Next case study"
        >
          <span className="text-sm text-muted">Next case study</span>
          <Link
            href={`/work/${next.slug}`}
            className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight no-underline hover:underline"
          >
            {next.title} <ArrowRight className="size-5" />
          </Link>
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
