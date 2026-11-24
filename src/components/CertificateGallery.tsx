"use client";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";
import type { Credential } from "@/data/experience";

type Issuer = "All" | Credential["issuer"];

function CertificateCard({ c }: { c: Credential }) {
  return (
    <article className="cert-card cert-record" id={`credential-${c.id}`}>
      <div>
        <p className="cred-meta">
          {c.issuer}, {c.level}
          {c.code ? ` (${c.code})` : ""}
        </p>
        <h3>{c.name.replace("Microsoft Certified: ", "")}</h3>
      </div>
      {c.previewUrl && c.pdfUrl && (
        <a
          className="cert-preview"
          href={c.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the ${c.name} certificate PDF`}
        >
          <Image
            src={c.previewUrl}
            width={1000}
            height={707}
            sizes="(max-width: 52rem) 90vw, 520px"
            alt={`Certificate for ${c.name}, awarded to Mikias Abate`}
          />
        </a>
      )}
      <p>{c.summary}</p>
      <dl className="cert-facts">
        <dt>Issued</dt>
        <dd>{c.issued}</dd>
        <dt>Valid until</dt>
        <dd>{c.validTo}</dd>
        <dt>Credential ID</dt>
        <dd>{c.credentialId}</dd>
        {c.certificationNumber && (
          <>
            <dt>Certification no.</dt>
            <dd>{c.certificationNumber}</dd>
          </>
        )}
      </dl>
      <ul className="cert-covers" aria-label="Areas covered">
        {c.skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="cred-links">
        <a
          className="text-link"
          href={c.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify ${c.name} with ${c.issuer}`}
        >
          Verify with {c.issuer} <Icon name="arrow-up-right" width={16} height={16} />
        </a>
        {c.pdfUrl && (
          <a className="text-link" href={c.pdfUrl} download>
            <Icon name="download" width={16} height={16} /> PDF
          </a>
        )}
      </p>
    </article>
  );
}

export function CertificateGallery({ credentials }: { credentials: Credential[] }) {
  const [issuer, setIssuer] = useState<Issuer>("All");
  const options: Issuer[] = ["All", "Microsoft", "DataCamp"];
  const shown = credentials.filter((c) => issuer === "All" || c.issuer === issuer);
  return (
    <>
      <div className="cert-toolbar">
        <div className="filters" role="group" aria-label="Filter certificates by issuer">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              className="chip"
              aria-pressed={issuer === o}
              onClick={() => setIssuer(o)}
            >
              {o} ({o === "All" ? credentials.length : credentials.filter((c) => c.issuer === o).length})
            </button>
          ))}
        </div>
        <p className="muted" role="status">
          Showing {shown.length} of {credentials.length}
        </p>
      </div>
      {(["Microsoft", "DataCamp"] as const)
        .filter((g) => issuer === "All" || issuer === g)
        .map((g) => (
          <section className="cert-group" key={g} aria-labelledby={`issuer-${g}`}>
            <h2 id={`issuer-${g}`}>{g}</h2>
            <div className="cert-grid">
              {shown
                .filter((c) => c.issuer === g)
                .map((c) => (
                  <CertificateCard key={c.id} c={c} />
                ))}
            </div>
          </section>
        ))}
    </>
  );
}
