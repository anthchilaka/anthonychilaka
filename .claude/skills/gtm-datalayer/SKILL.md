---
name: gtm-datalayer
description: GTM dataLayer implementation and validation for the SPA-to-MPA migration — dataLayer.push() timing/syntax, page_render_mode signal, scroll-depth events, GTM Preview validation before deploy. Use when wiring analytics into a new MPA page's main.tsx, debugging a GTM/dataLayer issue, or running the Phase 6 GTM/GA4 validation gate.
---

# GTM DataLayer Skill

## Purpose
Ensures every MPA route correctly pushes `page_render_mode` and the existing
scroll-depth events to `dataLayer`, verified via GTM Preview before any deploy.
This is Phase 6's blocking gate in `blueprint.md` — nothing promotes to the
Firebase Hosting preview channel until this passes.

Key architectural fact this skill exists to protect: **MPA means full page
reloads, not a single persistent SPA session.** `dataLayer` resets on every
navigation. Any variable that mattered on the SPA (where it persisted across
virtual pageviews) must be explicitly re-pushed on every single MPA page load,
not assumed to carry over.

---

## Activation Protocol (run before any GTM/dataLayer work)
1. Read `blueprint.md`'s Phase 6 section for the current validation status
2. Check the planning Outputs folder's `CLAUDE.md` Diagnostic Log for the GTM
   mobile scroll-depth validation item (deferred from Phase 1, due here)
3. Confirm the container ID (`GTM-MQV493DM`) and measurement ID (`G-GFK6117QNY`)
   match what's actually deployed — don't assume from memory

---

## Decision Tree — when/where each dataLayer event gets pushed
```
├─ page_render_mode (canonical MPA signal) → push BEFORE the GTM container
│   snippet loads, in <head>, so Tag Manager has it at container init —
│   pushing after container load queues it, doesn't guarantee it's read first
├─ page_view → fires via GTM's default trigger on the MPA's real full page
│   load; still call pushPageView() explicitly in every main.tsx to guarantee
│   page_render_mode rides along on the same push
├─ Scroll depth (25/50/75/90%) → Intersection Observer / scroll listener,
│   ported unchanged from the SPA implementation, discrete event per threshold
└─ Any new custom event → dataLayer.push({event: 'name', ...params}), event
    name lowercase, parameter names snake_case, must exactly match the GTM
    Custom Event trigger name (case-sensitive)
```

---

## GTM/DataLayer Gate — run before Phase 6 passes

| # | Check | Requirement | Status |
|---|---|---|---|
| 1 | `page_render_mode` push timing | Pushed before the GTM container script tag, not after | — |
| 2 | `page_render_mode` value | `'mpa'` on every route, never omitted — safety rule from website-build skill | — |
| 3 | Re-declared per page | Since MPA resets `dataLayer` on every navigation, confirm every route's `main.tsx` does its own push, not relying on a value set on a prior page | — |
| 4 | Naming consistency | Same variable name used identically across all pages (e.g. always `page_render_mode`, never a mixed variant) | — |
| 5 | `dataLayer` never overwritten | Only `dataLayer.push()` used — grep for any `window.dataLayer =` reassignment | — |
| 6 | Scroll-depth events fire | 25/50/75/90% events reach `dataLayer` on the new MPA pages, confirmed via GTM Preview, not just curl-confirmed script reachability | — |
| 7 | GTM Preview run | Connected to the local preview or Firebase Hosting preview channel URL, `page_view` and scroll events observed firing with correct parameters | — |
| 8 | Custom dimension registration (optional) | `page_render_mode` registered in GA4 Admin if GA4 UI/Explore reporting on it is ever needed — not required for the BigQuery Gold layer work, which already receives it | — |

Cannot mark Phase 6 complete with blank rows — each is "done" or "deferred: <reason>".

---

## What NOT to do (per Google's own dataLayer guidance)
- Do not overwrite `window.dataLayer` after initialization — always `push()`
- Do not assume a variable persists across MPA page loads the way it did on the
  SPA — full page reload means full `dataLayer` reset, re-push every time
- Do not treat "GTM container script returns HTTP 200" as proof events are
  firing — that only confirms the script loaded, not that any event reached
  `dataLayer`. This exact gap already happened once in this project (Phase 1
  diagnostics, deferred to this phase for that reason)
- Do not use inconsistent casing or naming for the same variable across pages

---

## Method Reference

| Technique | Serves | Source |
|---|---|---|
| Push `page_render_mode` before the container snippet | Guarantees Tag Manager has it at container init, not queued after | Google dataLayer documentation |
| snake_case parameters, lowercase event names | GA4 naming convention alignment | Google GA4 event parameters docs |
| Re-declare persistent variables on every page | MPA full-reload resets `dataLayer`; SPA persistence assumptions don't carry over | Google dataLayer documentation (multi-page guidance) |
| GTM Preview mode before every deploy | Only way to confirm real event firing, not just script reachability | Google Tag Manager documentation |
| Register custom dimension in GA4 Admin | Needed for GA4 UI/Explore reporting; NOT required for the BigQuery raw export this project's Gold layer already relies on | GA4 event parameters docs + this project's own confirmed-working `session_max_scroll_v3` table |

Sources:
- [Google Tag Manager dataLayer documentation](https://developers.google.com/tag-platform/tag-manager/datalayer)
- [GA4 event parameters documentation](https://developers.google.com/analytics/devguides/collection/ga4/event-parameters)
- [GA4 BigQuery Export documentation](https://support.google.com/analytics/answer/9358801)
