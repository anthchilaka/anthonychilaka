---
name: website-build
description: React/TypeScript/Tailwind v4/Vite MPA page builds for the SPA-to-MPA portfolio migration — new route scaffolding, component placement, Firebase Hosting config, page_render_mode analytics signal, build/typecheck/deploy workflow. Use when creating or editing any page/component, touching vite.config.ts or firebase.json, or running the build/deploy sequence.
---

# Website Build Skill

## Purpose
React SPA migrating to MPA. Built for a web analyst — optimises for crawlability, accurate GTM/BigQuery data capture, and clean responsive pages. The `page_render_mode` BigQuery field is the canonical toggle that auto-detects when the SPA→MPA flip happens — every change touching rendering must respect this signal.

This is the widest-scope skill in the build, spanning Phases 1, 3, 4, 5, and 7 (scaffold, visual/interaction, local dev, build & preview, deploy) per `blueprint.md`'s phased plan.

---

## Activation Protocol (run before any build work)
1. Read `blueprint.md`'s "Current Change" section to confirm which phase is active
2. Check the planning Outputs folder's `CLAUDE.md` Diagnostic Log for any open build-blocking items
3. Confirm whether the task is a new page, an edit to an existing page/component, or a build/deploy operation — each follows a different path below

---

## Tech Stack
- React — per-page entry points (MPA model)
- TypeScript — strict mode
- Tailwind CSS v4
- Vite — multi-entry build
- Firebase Hosting — `cleanUrls: true`, no catch-all rewrite
- Firebase Studio (formerly Google Project IDX) — cloud IDE; all CLI runs in its terminal

---

## Decision Tree — where work goes
```
├─ New page/route → [page]/index.html + src/pages/[page]/main.tsx +
│   src/pages/[page]/[Page].tsx + entry in vite.config.ts + row in
│   sitemap.xml — never skip or reorder this sequence
├─ Reusable primitive (button, card, etc.) → src/components/ui/
├─ Shared helper/hook (analytics, SEO meta) → src/lib/
├─ Layout-level component (Header, Footer, PageShell, SeoHead) →
│   src/components/layout/
├─ Editing existing behavior → prefer editing the existing component over a
│   near-duplicate; do not create a new abstraction for one-off usage
└─ Build/deploy operation → Commands section below
```

Full file tree reference:
```
/
├── [page]/index.html          ← one HTML file per MPA route
├── src/
│   ├── pages/[page]/
│   │   ├── main.tsx           ← Vite entry + pushPageView call
│   │   └── [Page].tsx         ← page component
│   ├── components/
│   │   ├── layout/            ← Header, Footer, PageShell, SeoHead
│   │   └── ui/                ← atomic components
│   ├── lib/
│   │   ├── analytics.ts       ← dataLayer helpers
│   │   └── seo.ts             ← meta tag helpers
│   └── types/                 ← shared TypeScript interfaces
├── vite.config.ts             ← rollupOptions.input map (one entry per page)
└── firebase.json              ← cleanUrls: true, rewrites: []
```

---

## Coding Conventions
- Strict TypeScript — no `any`, no `as unknown`, no non-null assertions without a comment
- `type` for unions/primitives; `interface` for object shapes
- Functional components with explicit prop interfaces
- Named exports for shared modules
- Tailwind v4 utilities only — no custom CSS unless unavoidable
- Class ordering: Layout → Spacing → Sizing → Typography → Color → Border → Effects → Responsive

---

## UI and Design Rules
- Every page uses `PageShell` for shared layout (Header, Footer, nav)
- `SeoHead` is mandatory on every page — title, description, canonical, Open Graph, JSON-LD
- Title format: `{Page} — {Brand}` | description: under 160 chars, factual
- Semantic HTML: `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
- Factual claims in first 100 words (AI search engines prioritise opening paragraph)
- Internal links must use descriptive anchor text — never "click here"
- Responsive-first; verify mobile on every UI change

---

## Content and Copy Guidance
- Concise, direct — skip basic explanations unless asked
- Headlines clear before clever; body copy focused on outcomes
- Avoid vague section titles: "Our Services" → "Digital Analytics Consulting Services"
- After any routing or rendering change, flag whether it affects SPA crawlability

---

## Build Gate — run before a task is marked complete

| # | Check | Requirement | Status |
|---|---|---|---|
| 1 | Typecheck | `npx tsc --noEmit` — zero errors | — |
| 2 | Build | `npm run build` — no warnings | — |
| 3 | Vite entry | New page added to `vite.config.ts` rollupOptions.input | — |
| 4 | Analytics signal | `main.tsx` calls `pushPageView` with `page_render_mode: 'mpa'` — never omitted | — |
| 5 | GTM confirmation | GTM Preview confirms `page_view` fires with correct `page_render_mode` | — |
| 6 | Performance | Lighthouse Performance ≥ 85 on new/changed pages | — |
| 7 | Sitemap | `sitemap.xml` updated for any new route | — |
| 8 | Firebase config | `firebase.json` has no catch-all rewrite | — |
| 9 | States | Empty, loading, and error states verified where relevant | — |

Cannot mark a task complete with blank rows — each is "done" or "deferred: <reason>", same convention as the other 3 skills in this build.

Testing rules:
- Unit tests for reusable logic only
- No heavy scaffolding for simple presentational sections

---

## What NOT to do
- Do not add a catch-all `**` rewrite in `firebase.json` — breaks MPA direct navigation and crawling
- Do not omit `page_render_mode` from any `page_view` event — BigQuery uses it as the SPA→MPA signal
- Do not use deprecated Tailwind v3 utilities — resolve via Context7
- Do not modify Firebase hosting config without running the pre-deploy checklist
- Do not create a new abstraction for one-off usage — prefer editing existing components
- Flag major architectural changes before implementing

---

## Method Reference

| Rule | Why | Decided in |
|---|---|---|
| True static MPA, no client-side router | React Router alone doesn't fix crawlability — content only exists after JS executes; verified against React Router's own docs via context7 | `blueprint.md` Overview / CLAUDE.md "MPA architecture decision" entry (Jun 2026) |
| `page_render_mode` never omitted | Canonical BigQuery signal distinguishing SPA vs MPA traffic — the entire before/after comparison depends on it | `blueprint.md` Phase 6 requirement |
| No catch-all rewrite in `firebase.json` | MPA needs each route to resolve to its own real HTML file; a catch-all breaks direct navigation and crawler access | `blueprint.md` Target (MPA) section |
| Context7 for Tailwind v4/React 19/Vite 5+/Firebase Hosting | Fast-moving libraries — training data goes stale; resolve at query time, never from memory | This project's own Documentation Verification rule (Outputs `CLAUDE.md`) |
| Semantic HTML, factual claims in first 100 words | Serves both classic crawlability and AI Overviews extraction | Cross-references `/seo-geo` skill's own Google-doc-sourced findings |

---

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Typecheck: `npx tsc --noEmit`
- Firebase emulator: `firebase emulators:start --only hosting`
- Deploy: `firebase deploy --only hosting`

| Common issue | Fix |
|---|---|
| Direct URL → 404 | Remove `**` catch-all rewrite from `firebase.json` |
| `page_render_mode` missing in BigQuery | Add `pushPageView` call to `main.tsx`; redeploy |
| New page not in build output | Add entry to `vite.config.ts` rollupOptions.input |
| Tailwind classes not applying | Check Tailwind v4 docs via Context7 |
| TypeScript errors on build | Run `tsc --noEmit` and fix before building |

---

## Sources
- Context7 MCP — live docs for Tailwind v4, React 19, Vite 5+, Firebase Hosting, TypeScript 5+ (always active, resolve at query time, never from training data)
- `blueprint.md` and the Outputs folder's `CLAUDE.md` Diagnostic Log — this project's own architecture decisions and their rationale
