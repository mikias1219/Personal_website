import { Container, Section, SectionHead, Button } from "@/components/ui";
import { Timeline } from "@/components/Sections";
import { PrintButton } from "@/components/PrintButton";
import { Icon } from "@/components/Icon";
import { site, skills, socials } from "@/data/profile";
import { certifications, cv, education } from "@/data/experience";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Experience",
  "Current experience, education and credentials for Mikias Abate, Software Developer & AI Engineer.",
  "/experience",
);

export default function Experience() {
  return (
    <Container>
      <Section>
        <header className="page-head">
          <h1>{site.name}</h1>
          <p className="page-lead">
            {site.role}, {site.location} ({site.utcOffset})
          </p>
          <p className="inline-actions" style={{ marginTop: "1rem" }}>
            {socials.map((s) => (
              <a className="text-link" key={s.label} href={s.href}>
                {s.label === "Email" ? site.email : s.label}
              </a>
            ))}
          </p>
          <p className="inline-actions no-print" style={{ marginTop: "1.25rem" }}>
            <Button href={cv.url} size="small" download={cv.filename}>
              <Icon name="download" /> Download CV
            </Button>
            <PrintButton />
          </p>
        </header>
      </Section>
      <Section>
        <SectionHead title="Experience" />
        <Timeline />
      </Section>
      <Section>
        <SectionHead title="Education" />
        <h3 style={{ fontSize: "1.25rem" }}>{education.degree}</h3>
        <p className="muted">
          {education.school}, {education.period}
        </p>
      </Section>
      <Section>
        <SectionHead title="Skills" />
        <dl className="skills">
          {skills.map((g) => (
            <div className="skill-row" key={g.title}>
              <dt>{g.title}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="credentials">
        <SectionHead title="Credentials" />
        <ul className="cred-list">
          {certifications.map((c) => (
            <li className="cred" key={c.id} id={`verify-${c.id}`}>
              <div>
                <h3>{c.name.replace("Microsoft Certified: ", "")}</h3>
                <p className="cred-meta">
                  {c.issuer}, issued {c.issued}, valid until {c.validTo}
                </p>
              </div>
              <p className="cred-meta">ID {c.credentialId}</p>
              <p className="cred-links">
                <a className="text-link" href={c.verifyUrl}>
                  Verify
                </a>
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </Container>
  );
}
