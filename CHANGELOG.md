# Build Log

Dated record of each phase of the SPA → MPA migration and diagnostic project. Updated at the end of every phase — see commit history for the full detail.

## Phase 1 — Baseline & Plan (29 Jun 2026)

- Reviewed live repo structure: React SPA, Vite, Firebase Hosting, hash-anchor navigation (`/#about`, `/#services`, etc.)
- Reviewed Looker Studio dashboard for the SPA data source — identified likely bot/crawler contamination (datacenter cities dominating session geography) as a probable root cause of an earlier engagement-time/scroll-depth contradiction
- Evaluated two candidate architectures for the MPA side of the comparison: React Router v6 (client-routed SPA) vs. true static multi-page Vite build — verified against each framework's own documentation
- **Decision:** building a true static multi-page Vite output, not a client-routed SPA, to actually isolate the SEO/crawlability variable the comparison is meant to measure
- Published this repo's first real README, replacing the default Vite template

## Phase 2 — Diagnostic Findings (pending)

- GA4 bot filter verification + Looker Studio exclusion filter
- Re-baselined Avg Session Duration / Avg Engagement Time post-filter
- High Intent Sessions calculated field audit
- GTM mobile scroll validation
- Lighthouse Mobile audit (FCP, LCP, CLS, TBT)
- BigQuery bimodal session-distribution query

## Phase 3 — MPA Build (not started)

- Multi-entry Vite scaffold, per-page SEO/JSON-LD, MPA-target `firebase.json`

## Phase 4 — Full Comparison Report (not started)

- Side-by-side SPA vs. MPA analytics comparison against the benchmarks defined during baseline
