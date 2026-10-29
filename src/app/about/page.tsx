import Image from "next/image";
import { Container, Section, SectionHeading } from "@/components/ui";
import { about, site, skills } from "@/data/profile";
import { education } from "@/data/experience";
import { ContactCTA } from "@/components/ContactCTA";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About",
  "Software development and AI engineering, based in Addis Ababa. My story, approach and technical foundations.",
  "/about",
);
export default function About() {
  return (
    <Container>
      <Section>
        <div className="about-hero">
          <div>
            <p className="eyebrow">A little about me</p>
            <h1>
              Software that
              <br />
              <span className="accent">makes itself useful.</span>
            </h1>
            <div className="about-story">
              {about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <figure className="about-portrait">
            <Image
              src="/portraits/portrait-suit-800.webp"
              width={800}
              height={1000}
              sizes="(max-width: 760px) 90vw, 400px"
              alt="Mikias Abate in a blue suit, adjusting his cuff"
              priority
            />
            <figcaption className="mono">
              {site.name} / {site.location}
            </figcaption>
          </figure>
        </div>
      </Section>
      <Section>
        <SectionHeading
          label="How I work"
          title="Follow the problem through."
        />
        <div className="approach-grid">
          {[
            {
              title: "Start with the workflow",
              text: "Understand what people need to do and where the current process gets in their way.",
            },
            {
              title: "Connect the pieces",
              text: "Treat the API, data model, AI service and interface as parts of one product.",
            },
            {
              title: "Make the behavior clear",
              text: "Show where answers come from, handle uncertainty and make the next action easy to find.",
            },
          ].map((s, i) => (
            <div key={s.title}>
              <p className="mono accent">0{i + 1} /</p>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading
          label="Technical foundations"
          title="Tools for the whole product."
        />
        <div className="skills-grid">
          {skills.map((s) => (
            <div key={s.title}>
              <h3>{s.title}</h3>
              <p className="muted">{s.items.join(" · ")}</p>
            </div>
          ))}
        </div>
        <div className="education-line">
          <p className="eyebrow">Education</p>
          <h3>{education.degree}</h3>
          <p className="muted">
            {education.school} · {education.period}
          </p>
        </div>
      </Section>
      <Section>
        <ContactCTA />
      </Section>
    </Container>
  );
}
