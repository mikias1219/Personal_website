import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { WorkArchive } from "@/components/WorkArchive";
import { archiveProjects, earlierProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Work",
  "Selected AI systems, full-stack products, mobile apps and cloud delivery projects.",
  "/work",
);
export default function Work() {
  return (
    <Container>
      <Section>
        <p className="eyebrow">The project archive</p>
        <h1>
          From the interface
          <br />
          <span className="accent">to the intelligence.</span>
        </h1>
        <p className="lead">
          A selection of what I’ve built. Explore the system, the stack and the
          decisions behind the work.
        </p>
        <h2 className="sr-only">Selected projects</h2>
        <WorkArchive projects={archiveProjects} />
        <details className="earlier-work">
          <summary>
            Earlier & other work{" "}
            <span className="mono">{earlierProjects.length} projects</span>
          </summary>
          <ul>
            {earlierProjects.map((p) => (
              <li key={p.slug}>
                <div>
                  <h3>{p.title}</h3>
                  <p className="muted">{p.summary}</p>
                </div>
                {(p.githubLink || p.demoLink) && (
                  <Link
                    href={p.githubLink || p.demoLink!}
                    className="text-link"
                  >
                    View project ↗
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </details>
      </Section>
    </Container>
  );
}
