import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  Button,
  SectionHeading,
  Card,
} from "@/components/ui";
import { site, capabilities, socials } from "@/data/profile";
import { experience, certifications } from "@/data/experience";
import { featuredProjects, projectBySlug } from "@/data/projects";
import { SystemTrace } from "@/components/SystemTrace";
import { ProjectCard } from "@/components/ProjectCard";
import { CvDownload } from "@/components/Credentials";
import {
  AboutSection,
  SkillsSection,
  FullExperienceSection,
  CredentialsSection,
  ContactSection,
  AllProjects,
} from "@/components/PortfolioSections";
import { LocalTime } from "@/components/LocalTime";
import { PortfolioChat } from "@/components/PortfolioChat";
export default function Home() {
  return (
    <>
      <div className="hero-backdrop" id="top">
        <Container>
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="availability mono">
                <span className="signal" />
                {site.availability}
              </div>
              <p className="eyebrow hero-role">{site.role}</p>
              <h1 id="hero-title">
                I build products.
                <br />
                <span className="accent">
                  And the AI
                  <br className="hero-break" /> inside.
                </span>
              </h1>
              <p className="lead">
                Full-stack applications. Grounded AI systems.
                <br />
                Built to turn complex workflows into useful software.
              </p>
              <div className="actions">
                <Button href="/#work">View work ↓</Button>
                <CvDownload />
              </div>
              <div className="hero-links">
                {socials.map((s) => (
                  <a key={s.label} className="text-link" href={s.href}>
                    {s.label} ↗
                  </a>
                ))}
              </div>
              <div className="hero-person">
                <Image
                  src="/portraits/portrait-casual-480.webp"
                  width={44}
                  height={44}
                  alt=""
                  priority
                />
                <div>
                  <p>{site.name}</p>
                  <span className="mono muted">
                    <LocalTime />
                  </span>
                </div>
              </div>
            </div>
            <SystemTrace />
          </section>
          <div className="proof-strip">
            <div>
              <span className="proof-mark" aria-hidden="true">
                ✳
              </span>
              <p>
                {certifications[0].issuer} Certified
                <span>
                  {certifications[0].name.replace("Microsoft Certified: ", "")}{" "}
                  · {certifications[0].code}
                </span>
              </p>
            </div>
            <div>
              <span className="proof-mark" aria-hidden="true">
                ↳
              </span>
              <p>
                {experience[0].org}
                <span>
                  {experience[0].title} · {experience[0].period}
                </span>
              </p>
            </div>
            <div>
              <span className="proof-mark" aria-hidden="true">
                ◎
              </span>
              <p>
                From Addis, to anywhere
                <span>
                  {site.location} · {site.utcOffset}
                </span>
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Section id="work">
          <span id="projects" className="anchor-alias" aria-hidden="true" />
          <SectionHeading
            number="01"
            label="Selected work"
            title="Built to solve real problems."
          >
            <a className="text-link" href="#all-projects">
              Browse every project ↓
            </a>
          </SectionHeading>
          <div className="projects-grid">
            {featuredProjects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <p className="below-grid mono muted">
            Also in the archive:{" "}
            <Link className="accent" href="/work/banglachatpro">
              BanglaChatPro — AI customer care across channels ↗
            </Link>
          </p>
          <AllProjects />
        </Section>
        <AboutSection />
        <SkillsSection />
        <Section id="capabilities">
          <SectionHeading
            number="04"
            label="What I build"
            title="The whole system, connected."
          />
          <div className="capability-grid">
            {capabilities.map((c) => (
              <Card className="capability" key={c.title}>
                <span className="mono accent">{c.number} /</span>
                <h3>{c.title}</h3>
                <p className="muted">{c.description}</p>
                <ul>
                  {c.projects.map((slug) => {
                    const p = projectBySlug(slug);
                    return (
                      p && (
                        <li key={slug}>
                          <Link
                            href={
                              p.caseStudy
                                ? `/work/${slug}`
                                : p.githubLink || "/work"
                            }
                          >
                            {p.title} ↗
                          </Link>
                        </li>
                      )
                    );
                  })}
                </ul>
              </Card>
            ))}
          </div>
        </Section>
        <Section id="ask">
          <span id="chat" className="anchor-alias" aria-hidden="true" />
          <div className="chat-showcase">
            <div>
              <p className="eyebrow">Ask my portfolio</p>
              <h2>
                A conversation.
                <br />
                <span className="muted">Backed by the work.</span>
              </h2>
              <p className="lead">
                Ask about my projects, experience or how I build. Answers come
                from the same facts you see here.
              </p>
            </div>
            <PortfolioChat />
          </div>
        </Section>
        <FullExperienceSection />
        <CredentialsSection />
        <ContactSection />
      </Container>
    </>
  );
}
