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

- `src/app/`: Home, `/work`, `/work/[slug]`, `/about`, `/experience`, `/contact`, custom 404, metadata, sitemap, robots and OG images.
- `src/data/profile.ts`: identity, correct LinkedIn, contact details, story, capability proof links and skills.
- `src/data/experience.ts`: confirmed roles/dates, earlier experience, education, credentials, confirmation flags and PDF state.
- `src/data/projects.ts`: existing project facts, categories, archive selection, four case-study slugs and conceptual diagram labels. Eight projects in the main archive; others are collapsed.
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
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Contact delivery through a verified sending domain |

`GEMINI_MODEL` defaults to `gemini-3.8-flash`, a current option for new projects in [Google’s model lifecycle guidance](https://ai.google.dev/gemini-api/docs/deprecations). Override it for your account.

`SITE_URL` drives metadata, sitemap, robots, CORS and assistant URLs. Set it before building when changing domains. The form recipient is the email in `profile.ts`.

APIs validate with Zod, cap request bytes and field lengths, reject foreign browser origins, and use hashed IP rate limits: 15 chat requests and 5 contact messages per ten minutes. Vercel's platform-provided forwarded IP is trusted only on Vercel. Local development uses one in-memory bucket. Production fails closed without Redis; other hosting requires a trusted IP source. No message content or provider response bodies are logged.

The contact form uses a honeypot, preserves text on failures and reports configuration/delivery errors. Chat streams NDJSON text, completion, error and related-page events. Its prompt is generated from the data files, qualifies pending facts, and directs unknown questions to Contact. Related chips are navigation suggestions from the supplied records, not fabricated model citations. Model behavior remains probabilistic; provider retention policies also apply.

## Vercel

Use this directory as project root and the Next.js framework preset. Remove any dashboard overrides for Vite's `dist` output or old build command. Keep the existing Vercel project connection. Configure server environment variables and rebuild. `vercel.json` gives chat a 30-second duration. Preview deployments need a matching `SITE_URL` for browser API calls. No Git push or deployment is performed by local verification.

## Verification

`npm test` checks fact propagation, project curation, validation, origin handling, request caps and safe API failures. Browser tests check routes, keyboard behavior, themes, filters, mocked chat/contact and WCAG rules. See [verification results](docs/VERIFICATION.md). Live provider success paths require configured services; tests never send real email.
