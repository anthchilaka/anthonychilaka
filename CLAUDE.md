# CLAUDE.md — Web Analyst Project: SPA → MPA Migration

## Project Overview
This project is a production website for a web analyst managing two workstreams:
1. Website modification — SEO/GEO optimisation, SPA → MPA migration, performance
2. Analytics engineering — GTM event tracking → BigQuery pipeline management

Primary users: the web analyst and engineering stakeholders.
Optimises for: accurate data capture, crawlable fast-loading pages, clean handoff between GTM and BigQuery.
IDE: Firebase Studio (formerly Google Project IDX). Claude Code v2.1.126 runs in the Firebase Studio terminal.
Avoid over-engineering. Prefer smaller focused changes over rewrites.

---

## Tech Stack
- React (SPA live on production — MPA build in development)
- TypeScript — strict mode
- Tailwind CSS v4
- Vite (multi-entry MPA config — one entry per page)
- Firebase Hosting (`cleanUrls: true`, no catch-all rewrite)
- Google Tag Manager — event-driven `dataLayer` pushes
- GA4 → BigQuery export pipeline
- BigQuery: Bronze (raw) → Silver (cleaned) → Gold (aggregated, enriched)

Do not introduce: Redux, styled-components, Material UI, or SPA catch-all rewrites in `firebase.json`.

---

## Architecture

```
/src/components/     — reusable UI components
/src/pages/          — route-level page components (SPA currently)
/public/             — static assets
/queries/gold/       — Gold Layer SQL (primary analysis layer)
/queries/backfill/   — backfill scripts and validation
/gtm/                — dataLayer event schemas
.idx/dev.nix         — Nix environment config (Node 22, firebase-tools, onStart hook)
```

Gold Layer tables:
- Gold: `anthony-chilaka-analytics.gold.session_max_scroll_v3`
- Silver: `anthony-chilaka-analytics.silver.events_flat_table`
- GA4 raw: `anthony-chilaka-analytics.analytics_531524363.events_*`

Rules:
- Keep page-level composition in route files
- Prefer server-side data fetching unless client interactivity is required
- Keep side effects out of UI components
- SPA is live on production — MPA is being built in development. Always confirm which context before making changes.

---

## Coding Conventions
- Strict TypeScript — no `any`, no `as unknown`
- Prefer functional components and named exports for shared modules
- Use `async/await` over chained promises
- `type` for unions/primitives; `interface` for object shapes
- Descriptive variable names over abbreviations
- Comments only when intent is non-obvious
- No dead code or commented-out blocks

---

## UI and Design Rules
- Tailwind v4 utility classes only — no custom CSS unless unavoidable
- Class ordering: Layout → Spacing → Sizing → Typography → Color → Border → Effects → Responsive
- Every page must include `<title>`, `<meta name="description">`, Open Graph tags, and JSON-LD structured data
- Responsive-first; verify mobile on every UI change
- Every interactive element must have visible hover, focus, and disabled states

---

## Content and Copy Guidance
- Concise, direct language — skip basic explanations unless asked
- Headlines clear before clever; body copy focused on outcomes
- For SQL: always include a comment block at the top (what it does, which layer it targets)
- For React/TS: show the full component or hook, not a snippet, unless it is a single-line fix
- When a change could break SEO, GTM tracking, or the BigQuery pipeline — call it out explicitly before proceeding

---

## Testing and Quality
Before considering a task complete:
- Run `npx tsc --noEmit` — fix all type errors
- Run `npm run build` — no warnings
- Verify empty, loading, and error states for UI changes
- GTM: validate new events in GTM Preview mode before merging
- BigQuery: always dry-run first; report estimated bytes before executing

Testing rules:
- Add unit tests for reusable logic
- Do not add heavy test scaffolding for simple presentational sections
- Ensure responsive behaviour for all UI changes

---

## File and Component Placement Rules
- New page components → `src/pages/[page]/`
- Reusable UI primitives → `src/components/ui/`
- Shared helpers and hooks → `src/lib/`
- GTM event schemas → `gtm/`
- BigQuery Gold queries → `queries/gold/`
- Do not create a new abstraction for one-off usage
- Prefer editing existing components over creating near-duplicates

---

## Safety Rules
- Do not add a catch-all `**` rewrite in `firebase.json` — breaks MPA direct navigation and crawling
- Do not omit `page_render_mode` from any `page_view` event — BigQuery uses it as the SPA→MPA signal
- Do not modify Firebase hosting config without running the pre-deploy checklist
- Do not rename public API routes unless explicitly requested
- Do not change BigQuery schema without calling it out clearly
- Flag major architectural changes before implementing them
- GTM events are source of truth — if GA4 data looks wrong, validate `dataLayer` push first
- Gold Layer field is `browser` not `browser_type` — always use the correct name

---

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Typecheck: `npx tsc --noEmit`
- Firebase deploy: `firebase deploy --only hosting`
- Backfill rule: to load date X into silver or gold, set `@run_time` to X+1 00:00:00 UTC

---

## Active Skills
| Task | Skill |
|---|---|
| Website, MPA build, Firebase deploy | `/website-build` |
| SEO audit or GEO content | `/seo-geo` |
| GTM event implementation | `/gtm-datalayer` |
| BigQuery query or pipeline debug | `/bigquery-gold` |
| Claude Code setup or MCP config | `/claude-code-setup` |

## Active MCPs
| MCP | Purpose |
|---|---|
| Context7 | Live docs — React, TS, Tailwind v4, Vite, Firebase. Always active. |
| Playwright | Browser automation, screenshot diffs, event validation |
| BigQuery | NL → SQL on Gold Layer. IAM granted May 2026. |

---

## How to Use This Log
This section is the persistent memory for this project. Every session that
diagnoses, fixes, or changes anything in the pipeline or codebase must add an
entry here before closing. Format every entry as follows:

```
### [Short title] (Mon YYYY)
- Symptom:
- Root cause:
- Fix applied:
- Status: OPEN | RESOLVED | MONITORING
- Next step (if OPEN):
```

Claude must read this section at the start of every session and ask the user
whether any OPEN items have been resolved before starting new work.

---

## Pipeline Troubleshooting Log

### Bronze → Silver scheduled query never fired automatically (Apr–May 2026)
- Symptom: Manual backfill worked correctly. Automatic schedule never loaded
  correct data for ~30 days since pipeline was built. Silver table stuck —
  missing every day of data unless manually backfilled. Looker Studio reflected
  the Silver gap. GA4 Bronze had events but Silver showed 0 rows for those dates.
- Root cause: Silver scheduled query was running at 01:00 UTC — before GA4
  daily export completes. GA4 standard daily export typically completes during
  early afternoon in the reporting timezone (Lagos WAT = UTC+1). The MERGE ran
  successfully and reported "succeeded" but found 0 rows in the Bronze shard
  because GA4 had not yet finished writing events_YYYYMMDD at 01:00 UTC.
  This caused 30 days of silent zero-row runs. Manual backfills also wrote
  0 rows for the same reason when triggered before export completion.
- Fix applied:
  1. Silver schedule moved from 01:00 UTC → 14:00 UTC (3:00 PM Lagos WAT)
  2. Gold schedule moved from 02:00 UTC → 15:00 UTC (4:00 PM Lagos WAT)
  3. May 1st manually loaded via direct MERGE query in BigQuery editor
     (Silver: 3 rows inserted, Gold: 1 session inserted)
  4. Looker Studio data refresh triggered after Gold update
- Status: RESOLVED
- Date resolved: May 2026

### Pipeline schedule times (confirmed May 2026)
- Silver scheduled query: 14:00 UTC daily = 3:00 PM Lagos (WAT)
- Gold scheduled query: 15:00 UTC daily = 4:00 PM Lagos (WAT)
- GA4 daily export completes: early afternoon Lagos time — no guaranteed SLA
  for standard properties. 14:00 UTC provides safe buffer.
- Always allow Silver to complete before Gold runs — 1 hour gap is sufficient
  given Silver runs take under 2 minutes on current data volumes.

### Known field name — browser segmentation (confirmed May 2026)
- Gold Layer field is `browser` — NOT `browser_type`
- Always use `browser` in any Gold Layer query or dashboard dimension

### Backfill rule (confirmed, always apply)
- To load date X into Silver or Gold: set `@run_time` to X+1 00:00:00 UTC
- BigQuery Schedule backfill date range: start is inclusive, end is exclusive
  — to load one day, set start = X+1, end = X+2
- Backfill end time cannot be in the future — use direct MERGE query in
  BigQuery editor instead, with hardcoded DECLARE run_time TIMESTAMP

### INFORMATION_SCHEMA.JOBS DML field names (confirmed May 2026)
- Correct fields for rows affected: `dml_statistics.inserted_row_count`,
  `dml_statistics.deleted_row_count`, `dml_statistics.updated_row_count`
- These are nested inside a struct — not top-level fields
- `total_rows_affected` and `num_dml_affected_rows` do NOT exist