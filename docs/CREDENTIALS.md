# Credential evidence — 29 October 2026

All six verification URLs were supplied by Mikias. Microsoft sharing URLs redirect to the public credential records below. The two saved PDFs are **browser print copies of those genuine public certificate panels**, not invented or re-typeset certificates.

| Credential | Credential ID | Issued | Valid until | Evidence |
| --- | --- | --- | --- | --- |
| Microsoft Azure AI Engineer Associate (AI-102) | 9CBA5A4FC0E8DBE8 | 8 Apr 2026 | 9 Apr 2027 | Microsoft public record; PDF saved |
| Microsoft Azure Data Scientist Associate (DP-100) | E13F0127DECF94B4 | 2 Jun 2025 | 3 Jun 2027 | Microsoft public record; PDF saved |
| DataCamp Data Engineer | DE0012274611368 | Sep 2025 | Sep 2027 | Supplied link; dates/ID match public LinkedIn |
| DataCamp Data Engineer Associate | DEA0012533890898 | Aug 2025 | Aug 2027 | Supplied link; dates/ID match public LinkedIn |
| DataCamp AI Engineer for Developers Associate | AIEDA0015379738598 | Aug 2025 | Aug 2027 | Supplied link; dates/ID match public LinkedIn |
| DataCamp AI Engineer for Data Scientists Associate | AEDS0019404147147 | Aug 2025 | Aug 2027 | Supplied link; dates/ID match public LinkedIn |

Microsoft records:

- https://learn.microsoft.com/en-us/users/mikiasabate-1946/credentials/9CBA5A4FC0E8DBE8
- https://learn.microsoft.com/en-us/users/mikiasabate-1946/credentials/E13F0127DECF94B4

DP-100 is active on the current issuer record. Its earlier `// CONFIRM` flag has been removed. The older LinkedIn expiration entry is superseded by the current Microsoft record.

DataCamp blocks both automated HTTP and ordinary headless browser access behind Cloudflare verification. No challenge was bypassed and no certificate was fabricated. The four DataCamp originals must be attached by the user; until then the site shows real verification links without misleading PDF buttons. Keep the original IDs when adding the files, set `pdfUrl` / `pdfKind: 'issuer-original'` in `src/data/experience.ts`, and optionally add a real thumbnail via `previewUrl`.

Saved files are in `public/certificates/`. Certificate thumbnails are rendered from the saved PDFs. The two print copies were checked with `pdftotext` and visually inspected for the holder name, credential ID, certification number, issue date and expiration date.
