**SPA → MPA Migration & Diagnostic | React, Vite Multi-Page, Firebase, GTM/GA4/BigQuery | Web Performance & SEO Engineering**

### 📋 Executive Summary
This repo documents a live, transparent migration of a production React SPA to a true static multi-page architecture — tracked from baseline diagnosis through final results, not delivered as a finished artifact. The SPA showed contradictory engagement signals and, on investigation, likely bot/crawler contamination in the analytics pipeline itself. Rather than rebuild blind, this project diagnoses the data before attributing any cause to architecture. The MPA side is deliberately built as true static multi-page output — not a client-routed SPA with nicer URLs — because the goal is industry-standard SEO/GEO crawlability, verified against framework documentation before implementation began.

### 🎯 Business Problem
A personal portfolio SPA produced unreliable engagement data (contradictory scroll-depth vs. engagement-time signals) and only one indexable URL. Before committing to an architecture rewrite, two questions had to be answered first: is the data itself trustworthy, and would a client-side-routed SPA actually fix the SEO problem, or just the bookmarking problem? Both were investigated before any code was written.

### 🔍 Methodology
Diagnostic-first, then architecture-verified-before-build. A Looker Studio dashboard audit surfaced likely bot contamination ahead of the planned GA4/GTM diagnostic checklist. Separately, an existing React Router v6 migration plan was checked against React Router's own SSR documentation, confirming client-side-only rendering wouldn't resolve the SEO goal — leading to a true Vite multi-page build decision instead.

### 🛠️ Skills Demonstrated
- **Web/Frontend:** React, TypeScript, Vite (multi-page build configuration), Firebase Hosting
- **Analytics Engineering:** GTM scroll-depth events, GA4 configuration, GA4→BigQuery export, bot-traffic detection in dashboard data
- **SQL/BigQuery:** Bronze→Silver→Gold layered modeling, MERGE statements, session-level aggregation
- **Technical due diligence:** verifying a migration plan against primary framework documentation before implementation, not after

### 📊 Current Status (build-in-progress)
- ✅ SPA baseline metrics captured; dashboard reviewed and bot-contamination issue identified
- ✅ Architecture decision made: true static multi-page build (not client-routed SPA) — documented and justified
- ⏳ Diagnostic fixes queued ahead of MPA build
- ⏳ MPA code not yet started — intentionally sequenced after clean data

### 🚀 Next Steps
1. ⏳ Push diagnostic findings (bot-filter fix, GA4 re-baseline, GTM mobile validation, Lighthouse audit)
2. ⏳ Push MPA scaffold (multi-entry Vite build, per-page SEO/JSON-LD)
3. ⏳ Push full SPA vs. MPA analytics comparison report
