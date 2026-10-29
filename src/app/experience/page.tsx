import { Container, Section, SectionHeading } from "@/components/ui";
import { site, skills, socials } from "@/data/profile";
import {
  earlierExperience,
  education,
  certifications,
  cv,
} from "@/data/experience";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Credentials, CvDownload } from "@/components/Credentials";
import { PrintButton } from "@/components/PrintButton";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Experience",
  "Current experience, education and credentials for Mikias Abate, Software Developer & AI Engineer.",
  "/experience",
);
export default function Experience() {
  return (
    <Container className="experience-page">
      <Section>
        <p className="eyebrow">Experience / Curriculum vitae</p>
        <h1>{site.name}</h1>
        <p className="lead">
          {site.role}
          <br />
          {site.location} · {site.utcOffset}
        </p>
        <div className="cv-links">
          {socials.map((s) => (
            <a className="text-link" key={s.label} href={s.href}>
              {s.label === "Email" ? site.email : s.label} ↗
            </a>
          ))}
        </div>
        <div className="actions no-print">
          <CvDownload />
          <PrintButton />
        </div>
        {cv.outdated && <p className="cv-notice">
          This page contains current information. The downloadable PDF is
          outdated and is awaiting replacement.
        </p>}
      </Section>
      <Section>
        <SectionHeading
          label="Professional experience"
          title="Roles & contributions."
        />
        <ExperienceTimeline />
        <p className="earlier-experience">
          <strong>{earlierExperience.title}</strong> · {earlierExperience.org} ·{" "}
          {earlierExperience.type} · {earlierExperience.period}{" "}
          <span className="confirmation">
            ({earlierExperience.confirmation})
          </span>
        </p>
      </Section>
      <Section>
        <SectionHeading label="Education" title={education.degree} />
        <p>{education.school}</p>
        <p className="mono muted">{education.period}</p>
      </Section>
      <Section id="credentials">
        <SectionHeading label="Credentials" title="Learning, applied." />
        <Credentials includePending />
        <div className="verification-details">
          <h3>Credential verification details</h3>
          <ul>
            {certifications.map((c) => (
              <li id={`verify-${c.id}`} key={c.id}>
                <strong>{c.name}</strong>
                <p>
                  {c.verifyUrl ? (
                    <a className="text-link" href={c.verifyUrl}>
                      Verify credential ↗
                    </a>
                  ) : (
                    "Verification URL has not been supplied yet."
                  )}
                </p>
                {c.confirmation && <p>{c.confirmation}</p>}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section>
        <SectionHeading label="Skills" title="Technical toolkit." />
        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.title}>
              <h3>{s.title}</h3>
              <p className="muted">{s.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </Section>
    </Container>
  );
}
