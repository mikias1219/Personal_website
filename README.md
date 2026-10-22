# mikiasabatesite.vercel.app

Personal site of Mikias Abate — software developer and AI engineer. Vite + React 18 + TypeScript + React Router.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # type-check + production build into dist/ (also writes sitemap.xml)
npm run preview   # serve the production build
```

## Where content lives

| What | File |
|------|------|
| Name, email, socials, About copy, highlights, Applied AI capabilities, skills | `src/data/profile.ts` |
| Hero headline/intro, featured projects and skill order per audience | `positioning` in `src/data/profile.ts` |
| Projects and case studies (`/work`, `/work/:slug`) | `src/data/projects.ts` |
| Experience, education, certifications, training, CV path | `src/data/experience.ts` |
| Downloadable CV | `public/MikiasAbate-CV.pdf` |
| Social preview image (1200×630) | `public/og-image.jpg` |

Search the codebase for `TODO:` to find details still to fill in (e.g. certification verification URLs).
When the CV changes, replace `public/MikiasAbate-CV.pdf` and update `src/data/experience.ts`.

## Tailoring for an application

Add `?for=` to the link you send. Each variant changes the hero headline, intro, featured projects and
skill-group order; edit them in `positioning` in `src/data/profile.ts`.

| Link | For |
|------|-----|
| `/` | Default: software developer & AI engineer |
| `/?for=ai` | AI engineer / LLM application roles |
| `/?for=backend` | Backend / API roles |
| `/?for=fullstack` | Full-stack roles |

## Structure

The home page is one scrolling page: hero → About → Applied AI → Skills → Experience → Projects →
Certifications & Education → Contact. `/work` lists every project with filters, and `/work/:slug` is a
case study. The old `/about` and `/contact` URLs redirect to their sections.

```
src/
  layouts/     RootLayout (header, footer, command palette, toasts)
  pages/       Home (all sections), Work (archive), CaseStudy, NotFound
  components/  UI building blocks (SectionLink scrolls to home-page sections)
  hooks/       theme, per-route meta tags, scroll reveal, active section, positioning variant
  data/        all site content
  styles/      tokens → base → layout → components → pages
```

The contact form sends through EmailJS (IDs in `src/components/ContactForm.tsx`).
Press Ctrl/⌘ K anywhere for the command palette.

## Deploy

**Vercel (live: https://mikiasabatesite.vercel.app)** — the GitHub repo is connected to Vercel, so every push
to `main` builds and deploys automatically. `vercel.json` sets the Vite build, rewrites page routes to
`index.html` so deep links work, and caches hashed assets for a year.

**Netlify (alternative)** — `netlify.toml` contains the equivalent settings.

If you move to a custom domain, update `site.url` in `src/data/profile.ts`, `SITE_URL` in
`vite.config.ts`, the absolute URLs in `index.html` and `public/robots.txt`.
