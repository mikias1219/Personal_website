"use client";
import { useState } from "react";
import type { Credential } from "@/data/experience";
import { CredentialCard } from "./CredentialCard";
export function CredentialGallery({
  credentials,
}: {
  credentials: Credential[];
}) {
  const [issuer, setIssuer] = useState<"All" | "Microsoft" | "DataCamp">("All");
  const filtered = credentials.filter(
    (c) => issuer === "All" || c.issuer === issuer,
  );
  return (
    <>
      <div className="credential-gallery-toolbar">
        <div
          className="filter-row"
          role="group"
          aria-label="Filter credentials by issuer"
        >
          {(["All", "Microsoft", "DataCamp"] as const).map((label) => (
            <button
              key={label}
              className={`filter-chip ${issuer === label ? "active" : ""}`}
              aria-pressed={issuer === label}
              onClick={() => setIssuer(label)}
            >
              {label}{" "}
              <span className="mono">
                {label === "All"
                  ? credentials.length
                  : credentials.filter((c) => c.issuer === label).length}
              </span>
            </button>
          ))}
        </div>
        <p className="mono muted" role="status">
          {filtered.length} credentials
        </p>
      </div>
      {(["Microsoft", "DataCamp"] as const)
        .filter((group) => issuer === "All" || issuer === group)
        .map((group) => (
          <section
            className="credential-issuer-section"
            key={group}
            aria-labelledby={`issuer-${group}`}
          >
            <div className="credential-group-heading">
              <h2 id={`issuer-${group}`}>{group}</h2>
              <p className="mono muted">
                {group === "Microsoft"
                  ? "Azure AI & machine learning"
                  : "AI & data engineering"}
              </p>
            </div>
            <div className="credential-gallery-grid">
              {filtered
                .filter((c) => c.issuer === group)
                .map((c) => (
                  <CredentialCard key={c.id} credential={c} detailed />
                ))}
            </div>
          </section>
        ))}
    </>
  );
}
