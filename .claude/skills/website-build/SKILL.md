# Website Build Skill

## Project Overview
React SPA migrating to MPA. Built for a web analyst — optimises for crawlability, accurate GTM/BigQuery data capture, and clean responsive pages.
The `page_render_mode` BigQuery field is the canonical toggle that auto-detects when the SPA→MPA flip happens. Every change touching rendering must respect this signal.

---

## Tech Stack
- React — per-page entry points (MPA model)
- TypeScript — strict mode
- Tailwind CSS v4
- Vite — multi-entry build
- Firebase Hosting — `cleanUrls: true`, no catch-all rewrite
- Google Project IDX — cloud IDE; all CLI runs in the IDX terminal

---

## Architecture

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

Where new code goes:
- New page sections → `src/pages/[page]/`
- Reusable primitives → `src/components/ui/`
- Shared helpers → `src/lib/`
- Do not create a new abstraction for one-off usage
- Prefer editing existing components over near-duplicates

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

## Testing and Quality
Before a task is complete:
- `npx tsc --noEmit` — zero errors
- `npm run build` — no warnings
- Every new page entry added to `vite.config.ts`
- Every `main.tsx` calls `pushPageView` with `page_render_mode: 'mpa'`
- GTM Preview confirms `page_view` fires with correct `page_render_mode`
- Lighthouse Performance ≥ 85 on new/changed pages
- `sitemap.xml` updated; `firebase.json` has no catch-all rewrite

Testing rules:
- Unit tests for reusable logic only
- No heavy scaffolding for simple presentational sections
- Verify empty, loading, and error states where relevant

---

## File and Component Placement Rules
- New page → `[page]/index.html` + `src/pages/[page]/main.tsx` + `src/pages/[page]/[Page].tsx` + entry in `vite.config.ts` + row in `sitemap.xml`
- Reusable UI → `src/components/ui/`
- Shared helpers → `src/lib/`
- Never skip or reorder the new-page sequence above

---

## Safety Rules
- Do not add a catch-all `**` rewrite in `firebase.json` — breaks MPA direct navigation and crawling
- Do not omit `page_render_mode` from any `page_view` event — BigQuery uses it as the SPA→MPA signal
- Do not use deprecated Tailwind v3 utilities — resolve via Context7
- Do not modify Firebase hosting config without running the pre-deploy checklist
- Flag major architectural changes before implementing

---

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Typecheck: `npx tsc --noEmit`
- Firebase emulator: `firebase emulators:start --only hosting`
- Deploy: `firebase deploy --only hosting`

**Context7 MCP is always active.** Never rely on training data for Tailwind v4, React 19, Vite 5+, Firebase Hosting, or TypeScript 5+ — resolve via Context7 at query time.

| Common issue | Fix |
|---|---|
| Direct URL → 404 | Remove `**` catch-all rewrite from `firebase.json` |
| `page_render_mode` missing in BigQuery | Add `pushPageView` call to `main.tsx`; redeploy |
| New page not in build output | Add entry to `vite.config.ts` rollupOptions.input |
| Tailwind classes not applying | Check Tailwind v4 docs via Context7 |
| TypeScript errors on build | Run `tsc --noEmit` and fix before building |
