# Content gaps for recruiters

Facts the portfolio chat and site cannot answer today because they are not in `src/data/*`. Fill these into `src/data/about-me.ts` (or the other data files) when ready. Until then, the assistant says the information is not documented and points to Contact.

| Topic | Typical recruiter question | Status |
| --- | --- | --- |
| Languages | Which languages does he speak? | Not documented |
| Relocation | Is he willing to relocate? | Not documented |
| Remote preference | Remote, hybrid, or on-site? | Documented: open to full-time remote or hybrid worldwide (`site.availability`) |
| Notice period | How soon can he start? | Not documented |
| Salary | What are salary expectations? | Not documented |
| Work authorization | Work authorization / visa status outside Ethiopia? | Not documented |
| Preferred roles | Preferred titles or team types? | Not documented |
| Interests | Personal interests outside work? | Not documented |
| AI GTP title | What does “AI GTP” expand to, and what did he do? | Pending confirmation in experience data |
| Atlas Group | Confirmed scope of the freelance engagement? | Pending confirmation in experience data |
| Earlier self-employed work | Details for Sep 2022 – Mar 2024? | Pending confirmation |
| Project screenshots | Real UI screenshots for featured projects | Optional `image` field exists; none set |
| Quantified metrics | Users, latency, revenue, or scale numbers | Not documented — do not invent |

## Design notes

- Project cards generate architecture visuals from `diagram` / `stack` labels when `image` is absent.
- Experience rows with empty `points` (e.g. AI GTP) show title, company and dates only — no invented bullets.
- Internal `confirmation` notes are never shown on the public UI.
