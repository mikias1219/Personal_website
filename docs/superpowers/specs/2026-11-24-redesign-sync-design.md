# Portfolio redesign sync

Date: 2026-11-24  
Status: approved

## Goal

Replace the live `Personal_website` app with the approved redesign in `Personal_website-redesign/Personal_website-main`, without losing git history, Vercel wiring, or local secrets.

## Approach

Full tree sync from redesign → `Personal_website` (option A).

### Preserve

- `.git` and remotes
- `.env` (local secrets)
- `node_modules` until reinstall
- Existing Vercel project connection (`vercel.json` already matches redesign)

### Replace / add

- All `src/`, `public/`, `docs/` (CONTENT/CREDENTIALS/VERIFICATION), `tests/`
- Root configs: `package.json`, lockfile, `next.config.ts`, eslint/postcss/tsconfig, `.env.example`, README, AGENTS.md
- New fonts: Bricolage Grotesque, Figtree
- New components: Hero, Sections, MoreProjects, CertificateGallery
- New data: `about-me.ts`

### Remove (current-only, unused by redesign)

- Geist font files
- ArchitectureDiagram, ContactCTA, Credential*, ExperienceTimeline, HeroVisual, PortfolioSections, ProjectCard, ProjectVisual, SystemTrace, WorkArchive
- `reports/` preview artifacts (local only; not part of app)

## Verification

`npm ci` → `npm run lint` → `npm run typecheck` → `npm test` → `npm run build`

## Out of scope

- Deploy / git push (only if requested)
- Content rewrites beyond what the redesign already contains
