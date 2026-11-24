import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Section } from "@/components/ui";
import { Icon } from "@/components/Icon";
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
        <Link href="/#work" className="back-link">
          <Icon name="arrow-right" className="flip" width={18} height={18} /> All work
        </Link>
        <header className="page-head">
          <h1>{project.title}</h1>
          <p className="page-lead">{project.outcome ?? project.summary}</p>
          <ul className="tags">
            {project.categories.map((c) => (
              <li className="tag" key={c}>
                {c}
              </li>
            ))}
            {project.year && <li className="tag">{project.year}</li>}
          </ul>
        </header>
        <div className="case">
          <MDXRemote
            source={source}
            components={{
              CaseSection: ({ section }: { section: CaseSection }) => (
                <CaseStudySections project={project} section={section} />
              ),
            }}
          />
        </div>
        <nav className="next-case" aria-label="Next case study">
          <span className="muted">Next case study</span>
          <Link href={`/work/${next.slug}`}>{next.title}</Link>
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
