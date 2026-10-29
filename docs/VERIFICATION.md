# Verification — 29 October 2026

Next.js 16.4.3 / React 19.3.1 production build. Lint, strict TypeScript build and all **16 unit/API tests** passed. Tests cover credential IDs and real PDF files, confirmed content, origin checks, validation, rate limits, mocked AI streams, disclosed provider fallback and intercepted Resend success/rejection.

The production browser suite passed 11 routes with **zero automated accessibility violations and zero browser errors**. It checks same-document scrolling, all 17 projects, filters, themes, mobile overflow, keyboard focus, contact draft retention, actual saved-data chat fallback and WCAG A/AA rules. Reports and screenshots are local in ignored `reports/`.

## Current visual redesign

The final browser suite passed 11 routes with zero automated WCAG violations and no browser errors. Five viewport widths (320, 390, 768, 1024 and 1440px) were checked for horizontal overflow. Portraits, main sections, contact and footer were inspected visually in dark and light themes. A deferred-layout issue that obscured mobile PDF link hit targets was removed. The hero uses a directly served 45KB AVIF with the original WebP as fallback, avoiding first-request conversion latency.

Chrome Lighthouse 13.6.0 default mobile simulation against the final local production build:

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 95 | 100 | 100 | 100 | 2.93s | 0 |
| `/certifications` | 99 | 100 | 100 | 100 | 0.87s | 0 |

These are local lab measurements; deployment behavior can differ. Both pages meet the score target; the main page remains above the original 2-second LCP target under simulated slow mobile conditions. The case-study and print pages were route/accessibility checked; earlier Lighthouse scores were not reused as current measurements. Full JSON/HTML reports and screenshots remain in ignored `reports/`.

## External services and evidence

One explicitly authorized live Gemini call returned no visible text. Empty/error stream handling was corrected, short-answer reasoning configured, and the clearly labeled saved-data fallback tested without additional model calls. Mocked tests validate primary streaming but do not prove live provider availability.

No real email was sent. Existing Vercel environment variable names were inspected; mail credentials remain only on Vercel as requested. Local contact retains the draft and offers an email-app fallback. Resend delivery still needs a deployment/live check; its default test sender is restricted to the account owner.

Temporary bounded per-instance limits were explicitly authorized because Redis is absent. Shared Redis remains preferred; `REQUIRE_SHARED_RATE_LIMIT=1` enforces it. No push, deployment or Vercel settings changes were performed.

Two Microsoft certificate-panel print PDFs were saved and checked visually and with `pdftotext`. Four user-supplied original DataCamp PDFs are now saved with previews and exact issue dates. See [credential evidence](CREDENTIALS.md). The CV download was subsequently replaced unchanged with the user-selected v7 PDF; experience remains data-driven.

Main content is one scrolling page. `/about`, `/contact` and `/work` redirect to its sections. Optional pages: `/certifications`, `/experience` and four case studies. Sitemap contains seven canonical entries.
