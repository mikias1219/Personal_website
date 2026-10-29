import Link from "next/link";
import { certifications, cv } from "@/data/experience";
import { CredentialCard } from "./CredentialCard";
export function Credentials({
  includePending = false,
}: {
  includePending?: boolean;
}) {
  return (
    <>
      <div className="credentials-grid">
        {certifications
          .filter((c) => includePending || !c.confirmation)
          .map((c) => (
            <CredentialCard key={c.id} credential={c} />
          ))}
      </div>
      <div className="credentials-more">
        <p className="mono muted">
          {certifications.length} credentials · Microsoft & DataCamp · Public
          verification links
        </p>
        <Link href="/certifications" className="text-link">
          Explore credentials & PDFs ↗
        </Link>
      </div>
    </>
  );
}
export function CvDownload() {
  return (
    <div className="cv-download">
      <a
        className="button button-secondary"
        href={cv.url}
        download={cv.filename}
      >
        Download CV ↓
      </a>
      <span className="mono muted">
        {cv.outdated
          ? "PDF awaiting update · see Experience for current details"
          : "PDF format"}
      </span>
    </div>
  );
}
