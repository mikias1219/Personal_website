# Content handoff

Confirmed facts in `src/data/*` override the outdated public PDF.

## CONFIRM

- AI GTP: expand the exact title and supply a role description. Dates and hybrid status are retained exactly.
- Atlas Group freelance, Feb–Jul 2025: confirm the retained engagement details; absent from LinkedIn.
- Self-employed part-time full-stack developer, Sep 2022–Mar 2024: confirm details; displayed as one short line.
- DP-100: confirm status, dates and verification URL. Excluded from Home proof and marked pending elsewhere.

All four have `// CONFIRM` comments in `src/data/experience.ts`.

## TODO

- Replace `public/MikiasAbate-CV.pdf`. The original binary still has incorrect facts; links warn that it awaits an update. `/experience` is generated from current typed data.
- Supply individual verification URLs for AI-102, DataCamp Data Engineer, the other two DataCamp credentials, and DP-100 if confirmed. Pending Verify links lead to an explanation.
- For each of Selamnew Workspace, Knowledge Hub, OKDE and BanglaChatPro: supply original problem/constraints, personal ownership/collaborators, verified architecture, actual screenshots, a real decision/trade-off, and a measured outcome with evaluation method/time period.
- Supply a public repository/demo for Selamnew Workspace if shareable.
- Configure AI, Redis and Resend environment variables for deployment.

Conceptual diagrams are labeled. No new performance or business metrics were invented.
