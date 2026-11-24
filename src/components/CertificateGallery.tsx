"use client";

import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Credential } from "@/data/experience";

type Issuer = "All" | Credential["issuer"];

function CertificateCard({ c }: { c: Credential }) {
  return (
    <article
      className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 shadow-card"
      id={`credential-${c.id}`}
    >
      <div>
        <p className="text-sm text-muted">
          {c.issuer}, {c.level}
          {c.code ? ` (${c.code})` : ""}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight">
          {c.name.replace("Microsoft Certified: ", "")}
        </h3>
      </div>
      {c.previewUrl && c.pdfUrl ? (
        <a
          className="overflow-hidden rounded-xl border border-line bg-surface-2"
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
            className="w-full"
          />
        </a>
      ) : null}
      <p className="text-sm text-muted md:text-base">{c.summary}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-muted">Issued</dt>
        <dd>{c.issued}</dd>
        <dt className="text-muted">Valid until</dt>
        <dd>{c.validTo}</dd>
        <dt className="text-muted">Credential ID</dt>
        <dd className="break-all">{c.credentialId}</dd>
        {c.certificationNumber ? (
          <>
            <dt className="text-muted">Certification no.</dt>
            <dd className="break-all">{c.certificationNumber}</dd>
          </>
        ) : null}
      </dl>
      <ul className="flex flex-wrap gap-2" aria-label="Areas covered">
        {c.skills.map((s) => (
          <li
            key={s}
            className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted"
          >
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-auto flex flex-wrap gap-4 text-sm font-semibold">
        <a
          className="inline-flex min-h-11 items-center gap-1 text-accent no-underline"
          href={c.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Verify ${c.name} with ${c.issuer}`}
        >
          Verify with {c.issuer} <ExternalLink className="size-4" />
        </a>
        {c.pdfUrl ? (
          <a
            className="inline-flex min-h-11 items-center gap-1 text-muted no-underline hover:text-text"
            href={c.pdfUrl}
            download
          >
            <Download className="size-4" /> PDF
          </a>
        ) : null}
      </p>
    </article>
  );
}

export function CertificateGallery({
  credentials,
}: {
  credentials: Credential[];
}) {
  const [issuer, setIssuer] = useState<Issuer>("All");
  const options: Issuer[] = ["All", "Microsoft", "DataCamp"];
  const shown = credentials.filter(
    (c) => issuer === "All" || c.issuer === issuer,
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter certificates by issuer"
        >
          {options.map((o) => (
            <button
              key={o}
              type="button"
              className={`rounded-full border px-3.5 py-2 text-sm transition ${
                issuer === o
                  ? "border-text bg-text text-bg"
                  : "border-line bg-surface text-muted hover:border-text hover:text-text"
              }`}
              aria-pressed={issuer === o}
              onClick={() => setIssuer(o)}
            >
              {o} (
              {o === "All"
                ? credentials.length
                : credentials.filter((c) => c.issuer === o).length}
              )
            </button>
          ))}
        </div>
        <p className="text-sm text-muted" role="status">
          Showing {shown.length} of {credentials.length}
        </p>
      </div>
      {(["Microsoft", "DataCamp"] as const)
        .filter((g) => issuer === "All" || issuer === g)
        .map((g) => (
          <section className="mt-10" key={g} aria-labelledby={`issuer-${g}`}>
            <h2 id={`issuer-${g}`} className="mb-5 text-2xl font-semibold">
              {g}
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
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
