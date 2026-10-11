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
| Name, email, socials, proof strip, stack, "How I work" | `src/data/profile.ts` |
| Projects and case studies (`/work`, `/work/:slug`) | `src/data/projects.ts` |
| Experience, education, certifications, CV path | `src/data/experience.ts` |
| Downloadable CV | `public/MikiasAbate-CV.pdf` |
| Social preview image | `public/og-image.jpg` |

Search the codebase for `TODO:` to find details still to fill in.
When the CV changes, replace `public/MikiasAbate-CV.pdf` and update `src/data/experience.ts`.

## Structure

```
src/
  layouts/     RootLayout (header, footer, command palette, toasts)
  pages/       Home, Work, CaseStudy, About, Contact, NotFound
  components/  UI building blocks
  hooks/       theme, per-route meta tags, scroll reveal, local time
  data/        all site content
  styles/      tokens → base → layout → components → pages
```

## Deploy

**Vercel (live: https://mikiasabatesite.vercel.app)** — the GitHub repo is connected to Vercel, so every push
to `main` builds and deploys automatically. `vercel.json` sets the Vite build, rewrites page routes to
`index.html` so deep links work, and caches hashed assets for a year.

**Netlify (alternative)** — `netlify.toml` contains the equivalent settings.

If you move to a custom domain, update `site.url` in `src/data/profile.ts`, `SITE_URL` in
`vite.config.ts`, the absolute URLs in `index.html` and `public/robots.txt`.
