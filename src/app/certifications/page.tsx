import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { CertificateGallery } from "@/components/CertificateGallery";
import { Icon } from "@/components/Icon";
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
      <Section>
        <Link className="back-link" href="/#credentials">
          <Icon name="arrow-right" className="flip" width={18} height={18} /> Back to portfolio
        </Link>
        <header className="page-head">
          <h1>Certifications</h1>
          <p className="page-lead">
            AI engineering, machine learning and data engineering from
            Microsoft and DataCamp. Every certificate has a public
            verification link, and {pdfs.length} PDF copies are available.
          </p>
        </header>
        <CertificateGallery credentials={certifications} />
        <p className="muted" style={{ marginTop: "2.5rem" }}>
          Verification links open the issuer’s own credential page. Microsoft
          PDFs are print copies of those records; DataCamp PDFs are the
          original certificates.{" "}
          <Link className="text-link" href="/#contact">
            Talk about a role or project
          </Link>
        </p>
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
