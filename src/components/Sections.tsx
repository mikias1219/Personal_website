import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";
import { LocalTime } from "./LocalTime";
import { ContactForm } from "./ContactForm";
import { MoreProjects } from "./MoreProjects";
import { Button, Section, SectionHead } from "./ui";
import { about, site, skills } from "@/data/profile";
import {
  certifications,
  cv,
  earlierExperience,
  education,
  experience,
} from "@/data/experience";
import { featuredProjects, projects } from "@/data/projects";

export function WorkSection() {
  const rest = projects.filter((p) => !featuredProjects.includes(p));
  return (
    <Section id="work">
      <SectionHead
        title="Selected work"
        lede="Four projects to start with. Each has a short case study."
      />
      <ul className="work-list">
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            <Link className="work-row" href={`/work/${p.slug}`}>
              <div>
                <p className="work-kind">{p.categories.join(", ")}</p>
                <h3 className="work-title">{p.title}</h3>
                <p className="work-outcome">{p.outcome ?? p.summary}</p>
              </div>
              <div className="work-side">
                <p>{p.stack?.join(", ")}</p>
                <span className="work-go">
                  Read case study <Icon name="arrow-up-right" width={18} height={18} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <MoreProjects projects={rest} />
    </Section>
  );
}

export function AboutSection() {
  const current = experience[0];
  return (
    <Section id="about">
      <SectionHead title="About" />
      <div className="about">
        <div>
          <div className="about-text">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="facts">
            <div>
              <dt>Currently</dt>
              <dd>
                {current.title} at {current.org}
              </dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>
                {education.degree}, {education.school}
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>
                {site.location} ({site.utcOffset})
              </dd>
            </div>
          </dl>
        </div>
        <figure className="portrait">
          <Image
            src="/portraits/portrait-suit-800.webp"
            width={800}
            height={1000}
            sizes="(max-width: 52rem) 288px, 320px"
            alt="Mikias Abate in a blue suit, adjusting his cuff"
          />
          <figcaption>{site.name}, {site.location}</figcaption>
        </figure>
      </div>
    </Section>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHead title="Experience">
        <div className="inline-actions">
          <Button href={cv.url} variant="secondary" size="small" download={cv.filename}>
            <Icon name="download" /> Download CV
          </Button>
          <Link className="text-link" href="/experience">
            Printable version
          </Link>
        </div>
      </SectionHead>
      <Timeline />
    </Section>
  );
}

export function Timeline() {
  return (
    <ol className="timeline">
      {experience.map((role) => (
        <li className="role" key={`${role.org}-${role.period}`}>
          <p className="role-period">{role.period}</p>
          <div>
            <h3>
              {role.title}
              {role.current && <span className="badge-current">Current</span>}
            </h3>
            <p className="role-org">
              {role.org}
              {role.location ? `, ${role.location}` : ""}
            </p>
            {role.points.length > 0 && (
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
      <li className="role">
        <p className="role-period">{earlierExperience.period}</p>
        <div>
          <h3>{earlierExperience.title}</h3>
          <p className="role-org">
            {earlierExperience.org}, {earlierExperience.type.toLowerCase()}
          </p>
        </div>
      </li>
    </ol>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHead title="Skills" />
      <dl className="skills">
        {skills.map((group) => (
          <div className="skill-row" key={group.title}>
            <dt>{group.title}</dt>
            <dd>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function CredentialsSection() {
  return (
    <Section id="credentials">
      <SectionHead title="Credentials and education">
        <Link className="text-link" href="/certifications">
          All certificates and PDFs
        </Link>
      </SectionHead>
      <ul className="cred-list">
        {certifications.map((c) => (
          <li className="cred" key={c.id}>
            <div>
              <h3>{c.name.replace("Microsoft Certified: ", "")}</h3>
              <p className="cred-meta">
                {c.issuer}
                {c.code ? `, ${c.code}` : ""}
              </p>
            </div>
            <p className="cred-meta">
              Issued {c.issued}
              <br />
              Valid until {c.validTo}
            </p>
            <p className="cred-links">
              <a className="text-link" href={c.verifyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${c.name} with ${c.issuer}`}>
                Verify
              </a>
              {c.pdfUrl && (
                <a className="text-link" href={c.pdfUrl} download>
                  PDF
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
      <div className="education">
        <h3>{education.degree}</h3>
        <p className="muted">
          {education.school}, {education.period}
        </p>
      </div>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section id="contact">
      <div className="contact">
        <div className="contact-side">
          <h2 className="section-title">Get in touch</h2>
          <p className="section-lede">
            Tell me about the role, the product or the problem. A little
            context is a good place to start.
          </p>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <SocialLinks includeEmail={false} />
          <div className="hero-facts">
            <p>
              <span className="dot" aria-hidden="true" />
              {site.availability}
            </p>
            <p>
              <LocalTime />
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
