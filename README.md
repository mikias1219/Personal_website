# Mikias Abate — portfolio

Next.js App Router, strict TypeScript, Tailwind CSS, Motion, MDX and Vercel AI SDK. Vercel deployment. Dark and light themes share CSS tokens. Geist Sans and Mono are self-hosted with `next/font/local`; the existing font files and their SIL Open Font License are retained.

## Run

Node.js 22+:

```bash
npm ci
cp .env.example .env.local
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Local site: http://localhost:3000. The supported Webpack builder avoids Turbopack subprocess restrictions in constrained environments.

## Content and routes

- `src/app/`: A continuous Home page with Work, About, Skills, full Experience, Credentials and Contact sections; optional `/work/[slug]` details, `/experience` print view, `/certifications`, custom 404, metadata, sitemap, robots and OG images.
- `src/data/profile.ts`: identity, correct LinkedIn, contact details, story, capability proof links and skills.
- `src/data/experience.ts`: confirmed roles/dates, earlier experience, education, credentials, confirmation flags and PDF state.
- `src/data/projects.ts`: existing project facts, categories, archive selection, four case-study slugs and conceptual diagram labels. All 17 original projects are available in the expandable, filterable archive on the main page.
- `src/content/work/*.mdx`: trusted repository-authored case-study section order. Reusable components resolve facts from the project records. Never compile visitor-provided MDX.
- `src/components/`: own UI primitives, responsive layout, theme controls, system trace, project visuals, chat, form and print controls.
- `src/app/globals.css`: theme and spacing tokens, Tailwind mappings, component styles and print rules.
- `src/lib/`: canonical config, metadata, generated assistant context, provider adapter, validation and API guards.
- `public/portraits/`: existing optimized WebP portraits.

The public PDF is outdated and never parsed to generate pages or assistant context. Replace it before distributing it as current, then set `cv.outdated` to `false` in the data file. [Content checklist](docs/CONTENT-CHECKLIST.md) lists all CONFIRM items, verification URLs and missing screenshots/metrics.

Open `/`, `/work`, `/work/selamnew-workspace`, `/work/knowledge-hub`, `/work/okde`, `/work/banglachatpro`, `/about`, `/experience`, `/contact` and any nonexistent path for review.

## Environment

See `.env.example`. All keys are server-only; never use `NEXT_PUBLIC_` for secrets.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical origin; default `https://mikiasabatesite.vercel.app` |
| `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_RESOURCE_NAME`, `AZURE_OPENAI_DEPLOYMENT` | Azure model, selected when all three exist |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Gemini fallback; default model `gemini-3.8-flash` |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Shared production rate limiting |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Contact delivery; existing recipient override supported |

`GEMINI_MODEL` defaults to `gemini-3.8-flash`, a current option for new projects in [Google’s model lifecycle guidance](https://ai.google.dev/gemini-api/docs/deprecations). Override it for your account.

`SITE_URL` drives metadata, sitemap, robots, CORS and assistant URLs. Set it before building when changing domains. The form recipient defaults to `profile.ts`; `CONTACT_TO_EMAIL` overrides it on the server. Without `CONTACT_FROM_EMAIL`, the Resend test sender can deliver only to the Resend account owner. A verified sender is needed for general delivery. Mail credentials remain only on Vercel by the user’s explicit preference.

APIs validate with Zod, cap request bytes and field lengths, reject foreign browser origins, and use hashed IP rate limits: 15 chat requests and 5 contact messages per ten minutes. Vercel's platform-provided forwarded IP is trusted only on Vercel. Local development uses one in-memory bucket. Redis is preferred for shared limits. The owner approved a temporary bounded per-instance fallback when Redis is absent; these limits reset on cold starts and do not aggregate across instances. Set `REQUIRE_SHARED_RATE_LIMIT=1` to require Redis. Other hosting requires a trusted IP source. No message content or provider response bodies are logged.

The contact form uses a honeypot, preserves text on failures and reports configuration/delivery errors. Chat streams NDJSON text, completion, error and related-page events. Its prompt is generated from the data files, qualifies pending facts, and directs unknown questions to Contact. Related chips are navigation suggestions from the supplied records, not fabricated model citations. Model behavior remains probabilistic; provider retention policies also apply.

## Vercel

Use this directory as project root and the Next.js framework preset. Remove any dashboard overrides for Vite's `dist` output or old build command. Keep the existing Vercel project connection. Configure server environment variables and rebuild. `vercel.json` gives chat a 30-second duration. Preview deployments need a matching `SITE_URL` for browser API calls. No Git push or deployment is performed by local verification.

## Verification

`npm test` checks fact propagation, project curation, validation, origin handling, request caps and safe API failures. Browser tests check routes, keyboard behavior, themes, filters, mocked chat/contact and WCAG rules. See [verification results](docs/VERIFICATION.md). Live provider success paths require configured services; tests never send real email.


## Current review

Use `npm run preview -- --port 3300` for an explicitly enabled loopback production preview. It permits only local origins; the flag is ignored on Vercel. Main section links scroll in the same document. `/about`, `/contact` and `/work` redirect to the corresponding main-page sections, preserving old URLs. Full project details and the print view remain optional. The detailed credential gallery is at `/certifications`.

Chat uses the AI SDK when the provider returns an answer. Errors and empty model streams switch to a clearly labeled **Portfolio lookup** using the same typed facts, with no invented claims. Unknown information points to Contact. A saved-data fallback is never presented as a generated AI response.

Mail configuration was inspected by variable names only in Vercel. Credentials were not copied locally. The one authorized live Gemini call returned no visible text; the empty-stream bug was fixed, reasoning configured for short answers, and fallback behavior tested without more paid calls.

Credential sources, dates and the four pending DataCamp PDF originals are documented in [docs/CREDENTIALS.md](docs/CREDENTIALS.md).
