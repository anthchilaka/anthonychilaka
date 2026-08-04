# Blueprint — Anthony Chilaka Portfolio (SPA → MPA Migration)

## Overview

Anthony Chilaka's portfolio site (`www.anthonychilaka.com`), built React + TypeScript + Tailwind v4 + Vite, hosted on Firebase. Site is mid-migration from a single-page app (SPA — one `index.html`, hash-anchor navigation like `#about`, `#services`) to a true static multi-page app (MPA — separate HTML entry per route). The migration exists to fix a crawlability/SEO/GEO problem the SPA architecture cannot solve on its own: content only exists after JS executes, and a client-side router alone (e.g. React Router) does not fix that — it only fixes bookmarking and the back button. See `.claude/skills/website-build/SKILL.md` for full architecture and conventions.

This is also a measured comparison project — GTM/GA4/BigQuery track both the SPA baseline and the MPA build via the `page_render_mode` field, so the before/after impact of the migration can be quantified, not just assumed.

## Project Outline — current state → target state

**Current (SPA, live at `www.anthonychilaka.com`):**
- Single `index.html`, one long scrolling page, anchor navigation (`/#about`, `/#services`, `/#portfolio`, `/#contact`)
- `firebase.json` uses a catch-all `**` rewrite (required for the SPA)
- GA4 + GTM (container `GTM-MQV493DM`, measurement ID `G-GFK6117QNY`) tracking scroll depth (25/50/75/90%) and custom events to BigQuery (`session_max_scroll_v3` gold-layer table)
- Clean pre-MPA baseline (Jun 1 – Aug 3, 2026, bot-filtered): Sessions 29, Users 29, % Avg Scroll 48.16, Avg Eng. 6.62s, High Int. Session 6 — this is the number the MPA build is measured against

**Target (MPA):**
- True static multi-page Vite build — one HTML entry per route, no client-side router
- `firebase.json` for the MPA target: `cleanUrls: true`, no rewrites block (separate from the SPA's catch-all target)
- Route map (adapted from the mauriciojuba.com visual/structural reference — CSS/HTML5/GSAP only, no WebGL, confirmed portable to this stack):

| Route | Content | Notes |
|---|---|---|
| `/` | Home / hero | |
| `/portfolio` | Featured work | Scroll-triggered reveal (GSAP + ScrollTrigger) |
| `/walkthroughs` | Project walkthroughs | Pixelating effect per thumbnail, triggered on scroll-into-view (Intersection Observer) — works on mobile, not hover-only; reuses the existing GTM 25/50/75/90% scroll-depth event pattern |
| `/ai-automation` | Workflow automation case studies (Claude Code, Claude Cowork, n8n, etc.) | Styled as case studies (problem → tool/approach → quantified outcome), matching `/portfolio` — quantified business impact over hobby-tinkering framing, since the portfolio's purpose is job applications |
| `/services` | Services | |
| `/templates` | Templates | |
| `/blog`, `/blog/[slug]` | Blog | New — not on the current SPA |
| `/about` | About | |
| `/contact` | Contact | Hover effect + font animation on heading and interactive elements |

- SEO/GEO consolidated plan, applied per page as each route is scaffolded:
  1. Crawlable `<h1>` (sr-only where needed) + matching `schema.org` JSON-LD in the same `<head>`
  2. Alt text rewrite across all images
  3. Replace `walkthroughloading.webp` / `portfolioloading.webp` placeholders with real text + CTA, written as self-contained Q&A/description blocks
  4. Real static `<title>` + meta description per page (not `react-helmet-async`)
  5. `llms.txt` at site root — last, once all routes are final

## Current Change — MPA build, phased plan

**Phase 0 — Housekeeping (before coding):** `docs\manual-setup-guide.md` (in the planning Outputs folder, not this repo) references two files that don't exist yet — resolve before relying on them.

**Phase 1 — Scaffold:** per-page HTML entries for the route map above; `vite.config.ts` multi-entry config; MPA-target `firebase.json`.

**Phase 2 — SEO/GEO content:** apply the 5-item plan above per route as it's scaffolded.

**Phase 3 — Visual/interaction build:** route-specific effects per the table above, GSAP/CSS/Intersection-Observer based, no WebGL.

**Phase 4 — Local dev loop:** `npm install` → `npm run dev` → implement page-by-page → `npx tsc --noEmit` after every change, zero errors before continuing.

**Phase 5 — Build & preview:** `npm run build` (no warnings) → `npm run preview` → verify empty/loading/error states and mobile responsiveness.

**Phase 6 — GTM/GA4 validation (blocking gate):** GTM Preview against local preview or a Firebase Hosting preview channel. Confirm `page_view` events include `page_render_mode: 'mpa'` (canonical SPA/MPA signal in BigQuery — never omit). Confirm scroll events (25/50/75/90%) still fire to `dataLayer`. Do not deploy until this passes.

**Phase 7 — Deploy (staged):** deploy first to a **Firebase Hosting preview channel** (e.g. `firebase hosting:channel:deploy mpa-build`), not directly to production — this project's whole purpose is a clean before/after comparison, so validating on a preview channel first avoids contaminating the exact data being measured. Confirm no catch-all `**` rewrite crept into the MPA `firebase.json`. Only promote/deploy to `www.anthonychilaka.com` once Phase 6 validation and an initial slice of Phase 8 look correct on the preview channel. After promoting, spot-check direct navigation to each route (not just client-side nav from home).

**Phase 8 — Re-baseline:** wait 24h+ for traffic on the new pages → re-run the Gold Layer query against `session_max_scroll_v3`, segmented by `page_render_mode` rather than date range alone (both SPA and MPA rows can coexist in the same table) → compare against the baseline in the Overview section above → report the result back to the planning Outputs folder's diagnostic log.

## Analytics decisions to apply during Phase 2 / Phase 6 (tracking work)

1. **Do not port the SPA's `reached_90`-only High Intent Session definition to MPA unchanged.** On the SPA, real multi-page navigation was structurally unreachable, so every engagement signal leaned on dwell time alone — the weak, bot-fakeable branch. MPA introduces real per-route pageviews, so redefine high intent to include pageview count, e.g. `reached_90 AND real_pageview_count >= 2`, mirroring GA4's own engaged-session standard (10s dwell OR 2+ pageviews OR 1 conversion event) rather than reusing a definition built around a single-page constraint.
2. **Verify `page_render_mode` is actually set correctly.** The skill and this file both require every `main.tsx` to call `pushPageView` with `page_render_mode: 'mpa'` — confirm this actually lands in BigQuery during Phase 6 GTM validation, not just that the code was written.
3. Carry the existing `Traffic Type` bot-filter logic (datacenter-city exclusion, blank-city exclusion, low-engagement fallback) forward unchanged for MPA data — bot contamination is architecture-independent.
