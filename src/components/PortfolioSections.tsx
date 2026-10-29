import Image from "next/image";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";
import Link from "next/link";
import { about, site, skills } from "@/data/profile";
import { experience, earlierExperience, education } from "@/data/experience";
import { projects, projectBySlug } from "@/data/projects";
import { Section, SectionHeading, Card } from "./ui";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ContactForm } from "./ContactForm";
import { Credentials, CvDownload } from "./Credentials";
import { WorkArchive } from "./WorkArchive";
import { LocalTime } from "./LocalTime";
export function AboutSection() {
  return (
    <Section id="about">
      <div className="about-hero">
        <div>
          <SectionHeading
            number="02"
            label="About me"
            title="The person behind the products."
          />
          <div className="about-story">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="profile-facts">
            <div>
              <dt>Currently</dt>
              <dd>
                {experience[0].title} · {experience[0].org}
              </dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {education.degree} · {education.school}
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>
                {site.location} · {site.utcOffset}
              </dd>
            </div>
          </dl>
          <SocialLinks className="hero-links" />
        </div>
        <figure className="about-portrait">
          <Image
            src="/portraits/portrait-suit-800.webp"
            width={800}
            height={1000}
            sizes="(max-width: 760px) 90vw, 400px"
            alt="Mikias Abate in a blue suit, adjusting his cuff"
          />
          <figcaption className="mono">
            {site.name} / {site.location}
          </figcaption>
        </figure>
      </div>
      <div className="restored-highlights">
        <p className="eyebrow">Selected contributions</p>
        <ul>
          <li>{projectBySlug("selamnew-workspace")?.summary}</li>
          <li>{experience[1].points[0]}</li>
          <li>{projectBySlug("selamnew-collaboration")?.summary}</li>
          <li>
            {experience.find((role) => role.org === "Atlas Group")?.points[0]}{" "}
            <span className="confirmation">
              Atlas Group · details to confirm.
            </span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        number="03"
        label="Technical skills"
        title="Tools for the whole product."
      />
      <div className="skills-grid">
        {skills.map((s, index) => (
          <Card className="skill-group" key={s.title}>
            <div className="skill-group-heading">
              <span className="feature-icon">
                <Icon
                  name={
                    index === 0
                      ? "brain"
                      : index === 1
                        ? "code"
                        : index === 2
                          ? "layers"
                          : "cloud"
                  }
                />
              </span>
              <h3>{s.title}</h3>
              <span className="mono muted">0{index + 1}</span>
            </div>
            <ul className="skill-items">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
export function FullExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading number="05" label="Experience" title="Where I’ve worked.">
        <CvDownload />
      </SectionHeading>
      <ExperienceTimeline />
      <p className="earlier-experience">
        <strong>{earlierExperience.title}</strong> · {earlierExperience.org} ·{" "}
        {earlierExperience.type} · {earlierExperience.period}{" "}
        <span className="confirmation">({earlierExperience.confirmation})</span>
      </p>
      <Link className="text-link experience-print-link" href="/experience">
        Print-friendly experience <Icon name="arrow-up-right" />
      </Link>
    </Section>
  );
}
export function CredentialsSection() {
  return (
    <Section id="credentials">
      <span id="certifications" className="anchor-alias" aria-hidden="true" />
      <SectionHeading
        number="06"
        label="Credentials & education"
        title="A foundation to build on."
      />
      <Credentials includePending />
      <div className="education-line">
        <p className="eyebrow">Education</p>
        <h3>{education.degree}</h3>
        <p className="muted">
          {education.school} · {education.period}
        </p>
      </div>
    </Section>
  );
}
export function AllProjects() {
  return (
    <details className="all-projects" id="project-archive">
      <summary>
        Explore all {projects.length} projects{" "}
        <span className="mono">AI · Web · Mobile · DevOps</span>
      </summary>
      <div className="archive-expanded" id="all-projects">
        <h3 className="sr-only">Complete project archive</h3>
        <WorkArchive projects={projects} />
      </div>
    </details>
  );
}
export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        number="07"
        label="Contact"
        title="What can we build together?"
      />
      <p className="lead">
        Tell me about the role, the product or the problem. A little context is
        a good place to start.
      </p>
      <div className="contact-layout">
        <aside>
          <div className="availability mono">
            <span className="signal" />
            {site.availability}
          </div>
          <h3>Direct is good, too.</h3>
          <a className="contact-email" href={`mailto:${site.email}`}>
            <Icon name="mail" /> {site.email} <Icon name="arrow-up-right" />
          </a>
          <nav aria-label="Contact profiles" className="contact-socials">
            <SocialLinks includeEmail={false} />
          </nav>
          <p className="mono muted">
            {site.location}
            <br />
            {site.timeZone}
          </p>
          <LocalTime />
          <div className="actions">
            <CvDownload />
          </div>
        </aside>
        <ContactForm />
      </div>
    </Section>
  );
}
