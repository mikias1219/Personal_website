import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Section, Badge } from "@/components/ui";
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
        <Link href="/#work" className="text-link">
          ← All work
        </Link>
        <header className="case-header">
          <p className="eyebrow">
            Case study / {project.year || "Selected work"}
          </p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
          <div className="actions">
            {project.categories.map((c) => (
              <Badge key={c}>{c}</Badge>
            ))}
          </div>
        </header>
        <div className="case-layout">
          <nav className="case-nav" aria-label="Case study sections">
            {[
              "Problem",
              "My role",
              "Architecture",
              "Key decisions",
              "Stack",
              "Outcome",
              "Links",
            ].map((s, i) => (
              <a
                key={s}
                href={`#${["problem", "role", "architecture", "decisions", "stack", "outcome", "links"][i]}`}
              >
                {s}
              </a>
            ))}
          </nav>
          <article className="case-prose">
            <MDXRemote
              source={source}
              components={{
                CaseSection: ({ section }: { section: CaseSection }) => (
                  <CaseStudySections project={project} section={section} />
                ),
              }}
            />
          </article>
        </div>
        <div className="next-project">
          <p className="eyebrow">Next case study</p>
          <Link href={`/work/${next.slug}`}>{next.title} ↗</Link>
        </div>
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
