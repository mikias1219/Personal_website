import { Container, Section } from "@/components/ui";
import { site, socials } from "@/data/profile";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact",
  "Get in touch about software development, AI engineering, full-time roles or contract projects.",
  "/contact",
);
export default function Contact() {
  return (
    <Container>
      <Section>
        <p className="eyebrow">Start a conversation</p>
        <h1>
          What can we
          <br />
          <span className="accent">build together?</span>
        </h1>
        <p className="lead">
          Tell me about the role, the product or the problem. A little context
          is a good place to start.
        </p>
        <div className="contact-layout">
          <aside>
            <div className="availability mono">
              <span className="signal" />
              {site.availability}
            </div>
            <h2>Direct is good, too.</h2>
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email} ↗
            </a>
            <nav aria-label="Contact profiles" className="contact-socials">
              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <a key={s.label} className="text-link" href={s.href}>
                    {s.label} ↗
                  </a>
                ))}
            </nav>
            <p className="mono muted">
              {site.location}
              <br />
              {site.timeZone} · {site.utcOffset}
            </p>
          </aside>
          <ContactForm />
        </div>
      </Section>
    </Container>
  );
}
