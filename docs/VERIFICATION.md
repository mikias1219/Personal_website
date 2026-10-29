# Verification — 29 October 2026

Production build: Next.js 16.4.3 / React 19.3.1. Chrome Lighthouse 13.6.0, default mobile simulation, local production server. These are local lab measurements; deployed network/server behavior can differ.

## Automated checks

- All six migration checkpoints: lint, strict type-check and production build passed. Logs: `reports/phase-a.log` through `reports/phase-f.log` (local, ignored).
- Final unit/API suite: **10 tests passed**. Includes actual AI SDK provider-stream conversion with a mocked Gemini response, intercepted Resend acceptance/rejection, rate-limit boundary, origin/validation/body caps and confirmed-fact propagation.
- Production browser suite: **10 routes passed**, **zero WCAG violations** (A/AA through WCAG 2.2 automated rules), **zero browser errors**. Dark/light themes, persistence, mobile overflow, reduced motion, project filters, contact validation and retained draft, chat source chips and modal focus/Escape verified.
- All four case-study pages were rechecked after fixing an SVG title/description hydration mismatch.
- Generated Home/per-page OG images returned valid PNGs; Person JSON-LD contains the confirmed LinkedIn and positioning. Sitemap has nine canonical entries and robots references it.
- Portraits and the Home layout were visually inspected on desktop and mobile. Experience print output was generated for review.

## Lighthouse results

| Route | Performance | Accessibility | Best practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 | 100 | 0.93s | 0.0034 |
| `/work` | 99 | 100 | 100 | 100 | 0.81s | 0.0000 |
| `/work/selamnew-workspace` | 99 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/work/knowledge-hub` | 99 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/work/okde` | 99 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/work/banglachatpro` | 98 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/about` | 100 | 100 | 100 | 100 | 0.78s | 0.0000 |
| `/experience` | 96 | 100 | 100 | 100 | 0.76s | 0.0000 |
| `/contact` | 97 | 100 | 100 | 100 | 0.76s | 0.0000 |

Every measured page meets the ≥95 target in all four categories and LCP <2s. Maximum measured LCP is under 0.93s; maximum CLS is 0.0034.

Full HTML/JSON Lighthouse reports and screenshots are in local `reports/` (ignored). Reproduce with `node tests/lighthouse.mjs`; set `TEST_BASE_URL` for another local port. `npm run test:browser` runs browser checks. Chrome must be available, or supply `CHROME_PATH`.

## External service limitations

No real email was sent and no paid model call was made. Live Azure/Gemini, Redis-backed production limits and real Resend delivery require account/environment configuration. Mocked provider success/error tests verify the application contract, not account permissions or provider availability. The preview disables delivery/model keys and restricts browser API origins to the configured `SITE_URL`.

## Review routes

`/`, `/work`, the four `/work/[slug]` pages, `/about`, `/experience`, `/contact`, and a nonexistent path for the custom 404. See the content checklist for confirmations and evidence placeholders.
