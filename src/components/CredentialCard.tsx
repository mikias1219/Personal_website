import Image from "next/image";
import { Icon } from "./Icon";
import type { Credential } from "@/data/experience";
import { Card } from "./ui";
export function CredentialCard({
  credential: c,
  detailed = false,
}: {
  credential: Credential;
  detailed?: boolean;
}) {
  return (
    <Card
      className={`credential-record ${detailed ? "credential-record-detailed" : ""}`}
      id={`credential-${c.id}`}
    >
      <div className="credential-record-top">
        <span
          className={`issuer-mark issuer-${c.issuer.toLowerCase()}`}
          aria-hidden="true"
        >
          {c.issuer === "Microsoft" ? (
            <span className="microsoft-grid">
              <i />
              <i />
              <i />
              <i />
            </span>
          ) : (
            "DC"
          )}
        </span>
        <div>
          <p className="credential-issuer">{c.issuer}</p>
          <p className="mono muted">
            {c.level} · {c.code || c.category}
          </p>
        </div>
        <span className={`credential-status ${c.status.toLowerCase()}`}>
          <span className="signal" />
          {c.status}
        </span>
      </div>
      {detailed && c.previewUrl && c.pdfUrl && (
        <a
          href={c.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="certificate-preview"
          aria-label={`Open ${c.name} PDF`}
        >
          <Image
            src={c.previewUrl}
            width={1000}
            height={707}
            sizes="(max-width:760px) 90vw, 550px"
            alt={`Issuer certificate for ${c.name}, awarded to Mikias Abate`}
          />
          <span className="mono">OPEN CERTIFICATE ↗</span>
        </a>
      )}
      <div className="credential-record-body">
        <p className="eyebrow">{c.category}</p>
        <h3>{c.name.replace("Microsoft Certified: ", "")}</h3>
        {detailed && <p className="credential-summary">{c.summary}</p>}
        <dl className="credential-dates">
          <div>
            <dt>Issued</dt>
            <dd>{c.issued}</dd>
          </div>
          <div>
            <dt>Valid until</dt>
            <dd>{c.validTo}</dd>
          </div>
        </dl>
        {detailed && (
          <>
            <div className="credential-identifier">
              <span className="mono muted">CREDENTIAL ID</span>
              <code>{c.credentialId}</code>
              {c.certificationNumber && (
                <p>
                  Certification number: <code>{c.certificationNumber}</code>
                </p>
              )}
            </div>
            <div className="credential-coverage">
              <p className="mono muted">Areas covered</p>
              <ul>
                {c.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="credential-record-actions">
        <a
          href={c.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
          aria-label={`Verify ${c.name} with ${c.issuer}`}
        >
          Verify credential <Icon name="arrow-up-right" />
        </a>
        {c.pdfUrl && (
          <a className="credential-pdf" href={c.pdfUrl} download>
            <Icon name="download" /> PDF
          </a>
        )}
      </div>
    </Card>
  );
}
