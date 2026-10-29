# Verification — 29 October 2026

Next.js 16.4.3 / React 19.3.1 production build. Lint, strict TypeScript build and all **16 unit/API tests** passed. Tests cover credential IDs and real PDF files, confirmed content, origin checks, validation, rate limits, mocked AI streams, disclosed provider fallback and intercepted Resend success/rejection.

The production browser suite passed 11 routes with **zero automated accessibility violations and zero browser errors**. It checks same-document scrolling, all 17 projects, filters, themes, mobile overflow, keyboard focus, contact draft retention, actual saved-data chat fallback and WCAG A/AA rules. Reports and screenshots are local in ignored `reports/`.

## Lighthouse

Chrome Lighthouse 13.6.0 default mobile simulation against the local production build. Browser verification ran concurrently; these are lab measurements and deployment results can differ.

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 92 | 100 | 100 | 100 | 1.20s | 0.0000 |
| `/certifications` | 96 | 100 | 100 | 100 | 0.92s | 0.0000 |
| `/experience` | 94 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/work/selamnew-workspace` | 97 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/work/knowledge-hub` | 90 | 100 | 100 | 100 | 0.82s | 0.0000 |
| `/work/okde` | 97 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/work/banglachatpro` | 99 | 100 | 100 | 100 | 0.76s | 0.0000 |

The certification page meets the ≥95 target in every category. Some longer pages remain below the performance target; all measured pages have LCP below 2 seconds and zero measured layout shift. Reproduce with `TEST_BASE_URL=http://127.0.0.1:3302 node tests/lighthouse.mjs / /certifications /experience /work/selamnew-workspace /work/knowledge-hub /work/okde /work/banglachatpro`.

## External services and evidence

One explicitly authorized live Gemini call returned no visible text. Empty/error stream handling was corrected, short-answer reasoning configured, and the clearly labeled saved-data fallback tested without additional model calls. Mocked tests validate primary streaming but do not prove live provider availability.

No real email was sent. Existing Vercel environment variable names were inspected; mail credentials remain only on Vercel as requested. Local contact retains the draft and offers an email-app fallback. Resend delivery still needs a deployment/live check; its default test sender is restricted to the account owner.

Temporary bounded per-instance limits were explicitly authorized because Redis is absent. Shared Redis remains preferred; `REQUIRE_SHARED_RATE_LIMIT=1` enforces it. No push, deployment or Vercel settings changes were performed.

Two Microsoft certificate-panel print PDFs were saved and checked visually and with `pdftotext`. Four user-supplied original DataCamp PDFs are now saved with previews and exact issue dates. See [credential evidence](CREDENTIALS.md). The CV PDF remains outdated and separate from data-driven experience.

Main content is one scrolling page. `/about`, `/contact` and `/work` redirect to its sections. Optional pages: `/certifications`, `/experience` and four case studies. Sitemap contains seven canonical entries.
