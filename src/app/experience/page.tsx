import { Container, Section, Button } from "@/components/ui";
import { Timeline } from "@/components/Sections";
import { PrintButton } from "@/components/PrintButton";
import { Download } from "lucide-react";
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
        <header className="max-w-3xl">
          <h1 className="text-4xl tracking-tight md:text-5xl">{site.name}</h1>
          <p className="mt-3 text-lg text-muted">
            {site.role}, {site.location} ({site.utcOffset})
          </p>
          <p className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
            {socials.map((s) => (
              <a
                className="min-h-11 inline-flex items-center text-accent no-underline"
                key={s.label}
                href={s.href}
              >
                {s.label === "Email" ? site.email : s.label}
              </a>
            ))}
          </p>
          <p className="no-print mt-5 flex flex-wrap gap-3">
            <Button href={cv.url} download={cv.filename}>
              <Download className="size-4" /> Download CV
            </Button>
            <PrintButton />
          </p>
        </header>
      </Section>
      <Section>
        <h2 className="mb-6 text-3xl tracking-tight">Experience</h2>
        <Timeline />
      </Section>
      <Section>
        <h2 className="mb-4 text-3xl tracking-tight">Education</h2>
        <h3 className="text-xl font-semibold">{education.degree}</h3>
        <p className="mt-1 text-muted">
          {education.school}, {education.period}
        </p>
      </Section>
      <Section>
        <h2 className="mb-6 text-3xl tracking-tight">Skills</h2>
        <dl className="divide-y divide-line border-y border-line">
          {skills.map((g) => (
            <div
              key={g.title}
              className="grid gap-2 py-4 md:grid-cols-[13rem_minmax(0,1fr)]"
            >
              <dt className="font-semibold">{g.title}</dt>
              <dd className="text-muted">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="credentials">
        <h2 className="mb-6 text-3xl tracking-tight">Credentials</h2>
        <ul className="divide-y divide-line border-y border-line">
          {certifications.map((c) => (
            <li
              className="grid gap-2 py-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] md:items-center"
              key={c.id}
              id={`verify-${c.id}`}
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {c.name.replace("Microsoft Certified: ", "")}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {c.issuer}, issued {c.issued}, valid until {c.validTo}
                </p>
              </div>
              <p className="text-sm text-muted">ID {c.credentialId}</p>
              <p>
                <a
                  className="inline-flex min-h-11 items-center font-semibold text-accent no-underline"
                  href={c.verifyUrl}
                >
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
