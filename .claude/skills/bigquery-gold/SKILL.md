---
name: bigquery-gold
description: BigQuery query and pipeline work on the Gold Layer analytics tables (Bronze→Silver→Gold medallion architecture) — the Phase 8 re-baseline query, GA4 BigQuery Export schema (event_params UNNEST), known field-name gotchas, backfill rules, dry-run cost discipline. Use when writing or debugging any BigQuery query against this project's data, or running the Phase 8 re-baseline.
---

# BigQuery Gold Skill

## Purpose
Ensures every BigQuery query against this project's data — especially the Phase 8
re-baseline query comparing SPA vs MPA performance — is correct against GA4's
actual export schema and this project's own hard-won field-name/scheduling
gotchas, not written from assumption. Covers the Bronze (raw GA4 export) →
Silver (cleaned) → Gold (aggregated, enriched) medallion architecture already
established in the live repo's `CLAUDE.md`.

---

## Activation Protocol (run before any BigQuery work)
1. Read `blueprint.md`'s Phase 8 section for the re-baseline query's exact
   requirements (segment by `page_render_mode`, not date range alone)
2. Read the live repo `CLAUDE.md`'s Pipeline Troubleshooting Log in full — it
   already documents real incidents (Bronze→Silver scheduling bug, field-name
   gotchas) that a fresh query can silently repeat if skipped
3. Confirm which layer (Bronze/Silver/Gold) actually has the data needed —
   don't assume Gold has a field that only exists in Bronze/Silver

---

## Decision Tree — which layer to query
```
├─ Raw per-event debugging, checking what a specific GA4 event actually sent →
│   Bronze (`analytics_531524363.events_*`) — requires UNNEST(event_params)
├─ Cleaned, deduplicated, flattened event-level data →
│   Silver (`silver.events_flat_table`)
├─ Session-level aggregates, dashboard/reporting queries, the Phase 8 re-baseline →
│   Gold (`gold.session_max_scroll_v3`) — the table this project's Looker Studio
│   dashboard and every baseline number so far are built on
└─ Unsure which layer has a field → check Bronze first (rawest), then confirm
    it survived the Silver/Gold transforms rather than assuming
```

---

## BigQuery Gate — run before any query is executed or trusted

| # | Check | Requirement | Status |
|---|---|---|---|
| 1 | Dry run first | Every query dry-run'd, estimated bytes scanned reported, before actual execution — per Google's own cost-control guidance and this project's existing Testing rule | — |
| 2 | Field name: `browser` | Never `browser_type` — confirmed wrong, doesn't exist, logged incident | — |
| 3 | `event_params` extraction | Uses `UNNEST(event_params)`, checks the correct value field (`string_value`/`int_value`/`double_value`) — Google's own docs warn the schema doesn't enforce which is populated | — |
| 4 | `dml_statistics.*` fields | Nested inside the struct (`dml_statistics.inserted_row_count` etc.), never top-level `total_rows_affected`/`num_dml_affected_rows` — those don't exist, logged incident | — |
| 5 | Backfill `@run_time` rule | Set to `X+1 00:00:00 UTC` to load date X; range end is exclusive; never a future timestamp — use a hardcoded `DECLARE` + direct MERGE instead if it would be | — |
| 6 | `Traffic Type` bot filter carried forward | Datacenter-city exclusion, blank-city exclusion, low-engagement fallback — applied identically to MPA data, bot contamination is architecture-independent | — |
| 7 | Phase 8 segmentation | Re-baseline query segments by `page_render_mode`, not date range alone — SPA and MPA rows coexist in the same table | — |
| 8 | Schedule timing awareness | Any new scheduled query checked against GA4's actual daily export completion time before setting a run time — the exact root cause of the original Bronze→Silver 30-day silent failure | — |

Cannot trust a query's result with blank rows — each is "checked" or "not applicable, because <reason>".

---

## What NOT to do (per Google's docs + this project's own logged incidents)
- Do not assume a scheduled query "succeeded" means it loaded real rows — the
  Bronze→Silver incident ran "successfully" for 30 days while inserting zero
  rows, because it ran before the day's GA4 export had finished writing
- Do not query `event_params` without `UNNEST()` — it's a repeated RECORD, not
  a flat column
- Do not assume all four `event_params.value` sub-fields are equivalent —
  check which one is actually populated for a given parameter
- Do not run an un-dry-run'd query against a large table "just to check
  something quickly" — dry run first, every time, no exceptions

---

## Method Reference

| Technique | Serves | Source |
|---|---|---|
| Dry run before execution, report estimated bytes | Cost control, catches an accidentally-unfiltered full-table scan before it runs | Google BigQuery cost-control documentation |
| `UNNEST(event_params)` + check all value fields | Correctly extracts GA4 custom parameters from the repeated RECORD structure | GA4 BigQuery Export schema documentation |
| Partition-aware queries (`event_date` filters) | Reduces bytes scanned on the existing `event_date`-partitioned Gold table | Google BigQuery partitioning documentation |
| Segment by `page_render_mode`, not date range | Lets SPA and MPA data coexist in the same table without a manual date cutoff | This project's own `blueprint.md` Phase 8 requirement |
| Schedule Silver/Gold queries after GA4's daily export completes | Directly prevents a repeat of the 30-day silent zero-row failure already logged in this project | This project's own Pipeline Troubleshooting Log |

Sources:
- [GA4 BigQuery Export schema documentation](https://support.google.com/analytics/answer/7029846)
- [BigQuery cost-control best practices](https://docs.cloud.google.com/bigquery/docs/best-practices-costs)
- [BigQuery partitioned tables documentation](https://docs.cloud.google.com/bigquery/docs/partitioned-tables)
- Live repo `CLAUDE.md` Pipeline Troubleshooting Log — Bronze→Silver scheduling incident, field-name gotchas, backfill rule (all pre-existing, cited not re-researched)
