import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { CredentialGallery } from "@/components/CredentialGallery";
import { certifications } from "@/data/experience";
import { site } from "@/data/profile";
import { absoluteUrl } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Certifications",
  "Explore Mikias Abate’s Microsoft and DataCamp certifications, issue and validity dates, credential IDs, verification links and available certificate PDFs.",
  "/certifications",
);
export default function Certifications() {
  const pdfs = certifications.filter((c) => c.pdfUrl);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${site.name} — Certifications`,
    url: absoluteUrl("/certifications"),
    about: { "@type": "Person", name: site.name },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: certifications.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "EducationalOccupationalCredential",
          name: c.name,
          identifier: c.credentialId,
          credentialCategory: c.category,
          recognizedBy: { "@type": "Organization", name: c.issuer },
          url: c.verifyUrl,
        },
      })),
    },
  };
  return (
    <Container>
      <Section className="certifications-page">
        <Link className="text-link" href="/#credentials">
          ← Back to portfolio
        </Link>
        <header className="certifications-hero">
          <div>
            <p className="eyebrow">Credentials / {site.name}</p>
            <h1>
              Credentials
              <br />
              <span className="accent">you can verify.</span>
            </h1>
            <p className="lead">
              AI engineering, machine learning and data engineering. Every
              credential has a public verification link, with PDF copies
              available below.
            </p>
          </div>
          <div className="credential-passport">
            <p className="mono">LEARNING RECORD / 2025–2027</p>
            <div>
              <strong>
                {certifications.length.toString().padStart(2, "0")}
              </strong>
              <span>
                role-based
                <br />
                credentials
              </span>
            </div>
            <p className="mono muted">Microsoft · DataCamp</p>
            <span className="passport-line" />
            <p className="mono accent">
              Public evidence. Practical foundations.
            </p>
          </div>
        </header>
        <dl className="credential-stats">
          <div>
            <dt>Credentials</dt>
            <dd>{certifications.length}</dd>
          </div>
          <div>
            <dt>Issuers</dt>
            <dd>2</dd>
          </div>
          <div>
            <dt>Verification links</dt>
            <dd>{certifications.length}</dd>
          </div>
          <div>
            <dt>PDF copies</dt>
            <dd>
              {pdfs.length}
              <a href="#pdf-library">Open library ↓</a>
            </dd>
          </div>
        </dl>
        <CredentialGallery credentials={certifications} />
        <section className="credential-pdf-library" id="pdf-library">
          <div>
            <p className="eyebrow">Take the evidence with you</p>
            <h2>Certificate PDF library.</h2>
            <p className="muted">
              The Microsoft PDFs are print copies of the public issuer records,
              including the credential identifiers and dates. The DataCamp PDFs
              are the original certificates.
            </p>
          </div>
          <div className="pdf-library-list">
            {pdfs.map((c) => (
              <a key={c.id} href={c.pdfUrl} download>
                <span className="pdf-filetype mono">PDF</span>
                <div>
                  <strong>{c.name.replace("Microsoft Certified: ", "")}</strong>
                  <span className="mono muted">
                    {c.issuer} · {c.code}
                  </span>
                </div>
                <span aria-hidden="true">↓</span>
              </a>
            ))}
          </div>
        </section>
        <div className="credential-footer-note">
          <p>
            Verification links open the issuer’s credential page. Certificate
            IDs make each record traceable.
          </p>
          <Link className="text-link" href="/#contact">
            Talk about a role or project ↗
          </Link>
        </div>
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
