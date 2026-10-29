import { certifications, cv } from "@/data/experience";
import { Card } from "./ui";
export function Credentials({
  includePending = false,
}: {
  includePending?: boolean;
}) {
  return (
    <div className="credentials-grid">
      {certifications
        .filter((c) => includePending || !c.confirmation)
        .map((c) => (
          <Card className="credential" key={c.id}>
            <div className="credential-top">
              <span className="credential-symbol" aria-hidden="true">
                ✳
              </span>
              <span className="mono muted">{c.code || c.issuer}</span>
            </div>
            <h3>{c.name}</h3>
            <p className="muted">
              {c.issuer}
              {c.issued ? ` · Issued ${c.issued}` : ""}
            </p>
            {c.validTo && <p className="mono muted">Valid to {c.validTo}</p>}
            {c.confirmation && <p className="confirmation">{c.confirmation}</p>}
            <a
              className="text-link"
              href={c.verifyUrl || `/experience#verify-${c.id}`}
            >
              Verify{" "}
              {c.verifyUrl ? (
                "↗"
              ) : (
                <span className="mono muted">(link pending)</span>
              )}
            </a>
          </Card>
        ))}
    </div>
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
