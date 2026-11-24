# Mikias Abate — portfolio

Next.js App Router, strict TypeScript, Tailwind CSS (reset only), MDX and Vercel AI SDK. Vercel deployment. Light and dark themes share CSS tokens. Bricolage Grotesque (headings) and Figtree (text) are self-hosted with `next/font/local`; their SIL Open Font License is in `src/app/fonts/OFL.txt`.

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

- `src/app/page.tsx`: one home page. A hero with the intro and the **Ask about Mikias** chat, then Selected work, About, Experience, Skills, Credentials and Contact.
- Other routes: `/work/[slug]` (four short case studies), `/certifications` (certificates with PDFs and verification links), `/experience` (printable CV view), custom 404, metadata, sitemap, robots and OG images. `/about`, `/contact` and `/work` redirect to the matching section of the home page.
- `src/data/profile.ts`: identity, headline, contact details, story and skills.
- `src/data/experience.ts`: roles and dates, earlier experience, education, credentials, CV.
- `src/data/projects.ts`: all 17 projects, categories, the four featured case studies and the overview flow labels.
- `src/data/about-me.ts`: **extra facts for the chat** (languages, relocation, working style, anything not covered above). Add question and answer pairs here and the assistant can answer them. Leave it empty and the assistant says it does not have that information and points to Contact.
- `src/content/work/*.mdx`: the order of the blocks in each case study. A block with no recorded facts renders nothing, so no placeholders are ever shown.
- `src/components/`: `Hero`, `Sections` (all home sections), `PortfolioChat` (the chat panel, used in the hero and in the floating drawer), `ChatLauncher`, `ChatProvider` (one shared conversation), `MoreProjects`, `CertificateGallery`, `ContactForm`, `Header`, `Footer`.
- `src/app/globals.css`: design tokens (colors, shadow, spacing) and every style, in one file of about 1,600 lines.
- `src/lib/`: canonical config, metadata, assistant context, provider adapter, validation and API guards.
- `public/portraits/`: optimized portraits.

The public CV download is the user-selected v7 PDF, copied unchanged on 29 October 2026. It is never parsed to generate pages or assistant context. [Content checklist](docs/CONTENT-CHECKLIST.md) lists all CONFIRM items, verification URLs and missing screenshots/metrics.

Open `/`, `/work/selamnew-workspace`, `/work/knowledge-hub`, `/work/okde`, `/work/banglachatpro`, `/certifications`, `/experience` and any nonexistent path for review.

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

Credential sources, dates and all six available PDF copies are documented in [docs/CREDENTIALS.md](docs/CREDENTIALS.md).

## Visual system

Calm and plain. A soft green-grey page, white surfaces and deep green ink, with one marigold accent used for the main buttons and the chat. Headings use Bricolage Grotesque and text uses Figtree. Sections are simple lists, not grids of cards; the chat is the one bold element. Light and dark themes follow the visitor's system setting and can be switched in the header. Motion is limited to one entrance on the hero and the chat messages, and is turned off for visitors who prefer reduced motion.

The chat opens as a panel in the hero. Once it scrolls out of view, a floating **Ask about Mikias** button opens the same conversation in a drawer, so a visitor can ask a question from anywhere on the page.
