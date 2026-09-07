---
name: seo-geo
description: SEO and GEO (AI search discoverability) work on the SPA-to-MPA portfolio migration — schema.org markup, meta tags, heading structure, robots.txt crawler permissions, llms.txt, geographic discoverability (11 Nigerian cities + EMEA positioning), content positioning around the AI automation + data analytics niche. Use when scaffolding or reviewing any route's SEO/GEO checklist, or when robots.txt, structured data, area-served targeting, or AI-crawler discoverability comes up.
---

# SEO/GEO Skill

## Purpose
Ensures every MPA route passes both classic SEO (Google ranking/crawlability) and
GEO (discoverability via AI answer engines — Google AI Overviews, Claude's
Claude-User/Claude-SearchBot, ChatGPT's OAI-SearchBot) before being marked
scaffolded. Positioned specifically around Anthony Chilaka's niche: AI automation
practitioner with a data analytics background — every applicable page's opening
content should carry that positioning, not generic portfolio copy.

Also ensures the site is geographically discoverable for freelance/EMEA work and
across 11 named Nigerian cities (see Geographic Discoverability below) — added
Sep 2026, since Anthony is actively searching for freelance EMEA roles.

Build strategy (resolved Sep 2026, see blueprint.md): where Google's and OpenAI's
own docs differ on a technique, build for the superset, not the minimum either one
requires. Neither vendor's docs said a technique *hurts* — only whether it's
required. Full research trail: planning Outputs folder's `CLAUDE.md` and
`linkedin-post.md`.

---

## Activation Protocol (run before any SEO/GEO work)
1. Read `blueprint.md`'s Phase 2 section for the current route list and status
2. Check the planning Outputs folder's `CLAUDE.md` Diagnostic Log for any open
   SEO/GEO findings (Lighthouse SEO score, Agentic Browsing score, llms.txt status)
3. Confirm which route is being worked on and whether it's new content or a
   revision to already-shipped content

---

## Decision Tree — schema.org type per route
```
├─ /, /about                 → Person + ProfilePage (positioning: AI automation + data analytics)
├─ /ai-automation             → CreativeWork per case study (problem → tool → quantified outcome)
├─ /portfolio, /walkthroughs  → CreativeWork per project
├─ /services                  → Service (+ areaServed — see Geographic Discoverability below)
├─ /templates                 → Product or CreativeWork (assess per item)
├─ /blog, /blog/[slug]        → Article / BlogPosting
└─ /contact                   → ContactPage
```

---

## Geographic discoverability (added Sep 2026)

Two distinct signals — not interchangeable, don't blend them into one line of copy
or one schema value:

- **EMEA** — plain-language positioning copy only (hero line, meta description,
  e.g. "available for freelance work across EMEA"). Not a real resolvable
  place — schema.org's `areaServed` property and Google Business Profile's
  service-area list both expect actual geographic entities. EMEA does no
  structural work in either and must never be used as an `areaServed` value.
- **11 named locations** — Lagos, Ibadan, Port Harcourt, Kaduna, Abuja, Bauchi,
  Kano, Plateau, Jos, Owerri, Awka. These ARE real, resolvable places:
  - Use them literally in the `/services` `Service` schema's `areaServed`
    property (confirmed: `Service` supports `areaServed` natively; do not use
    the deprecated `ProfessionalService` type)
  - List them in Google Business Profile as a **Service Area Business** (SAB)
    — up to 20 areas allowed, no physical office/signage required in any of
    them (confirmed via Google's own docs; this is a distinct GBP business
    type from the storefront listing craftbyTAG's own project uses, which
    does require physical signage — don't conflate the two)
  - Write a real "Areas I work with" section on `/about` or `/services`
    naming all 11 explicitly — schema alone doesn't satisfy GEO's
    answer-first/extractable-plain-text requirement; both are needed

---

## SEO/GEO Gate — run before a route is marked complete

| # | Check | Requirement | Status |
|---|---|---|---|
| 1 | Crawlable `<h1>` | Present, sr-only only if visually redundant | — |
| 2 | Heading hierarchy | H1 → H2 → H3, no skipped levels | — |
| 3 | Answer-first opening | Core fact/value stated plainly in first 80–100 words | — |
| 4 | Positioning (home/about/services/ai-automation only) | Opening explicitly frames AI automation + data analytics niche, not generic portfolio language | — |
| 5 | Alt text | Every image, descriptive, not decorative filler | — |
| 6 | Title + meta description | Static tags, `"{Page} — {Brand}"`, description <160 chars | — |
| 7 | schema.org JSON-LD | Type per Decision Tree above, matches visible content exactly — required, not optional (OpenAI's own docs say it raises citation odds; costs nothing with Google) | — |
| 8 | Internal links | Descriptive anchor text, never "click here" | — |
| 9 | Page experience | Mobile responsive, fast load — Lighthouse Performance ≥85 (per website-build skill) | — |
| 10 | robots.txt — full crawler list | `Googlebot`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` all explicitly listed, not just covered by the wildcard `Allow: /` | — |
| 11 | llms.txt entry | Optional/low-priority — no engine's own docs confirm it's read, Google explicitly says skip it; include only once all routes are final and low-cost to add | — |
| 12 | Geographic discoverability | `Service` schema on `/services` carries `areaServed` with all 11 named locations (never "EMEA"); a real "Areas I work with" section exists naming all 11; EMEA appears only as plain positioning copy elsewhere | — |

A route cannot be marked done for Phase 2 with blank rows — each is "done" or "deferred: <reason>", same convention as the website-build skill's testing checklist.

---

## What NOT to do (per Google's and OpenAI's own guidance)
- Do not rewrite or "chunk" content specifically to please AI crawlers — write for the
  human reader first; every engine's own docs converge on this
- Do not treat llms.txt as a hard requirement — Google explicitly says it isn't, and
  no engine confirms reading it
- Do not add schema.org types you're not eligible for — incorrect markup is worse
  than none
- Do not skip a crawler's search-specific bot (Claude-SearchBot, OAI-SearchBot)
  just because its training-bot counterpart (ClaudeBot, GPTBot) is already allowed
  — they're independently controlled and serve different purposes
- Do not use "EMEA" as an `areaServed` value or a GBP service area — it isn't a
  resolvable place and does no structural work there
- Do not use the deprecated `ProfessionalService` schema type — use `Service`

---

## Method Reference

| Technique | Serves | Source |
|---|---|---|
| Answer-first, 80–100 word opening | Google AI Overviews extraction + OpenAI "comprehensive answers" criteria | Google AI-optimization guide, OpenAI Publishers FAQ |
| Clear H1→H2→H3, semantic HTML | All three engines independently | Google, OpenAI docs |
| schema.org JSON-LD (Article/FAQPage/HowTo types especially) | Not required by Google, but OpenAI's own docs say it raises ChatGPT citation odds | Google Search Central, OpenAI Publishers FAQ |
| robots.txt — allow all 6 named crawlers | Claude search visibility (Claude-SearchBot), ChatGPT search visibility (OAI-SearchBot), plus each engine's training bot | Anthropic crawler docs, OpenAI crawler docs |
| Unique, non-commodity expert content | Google quality systems + AI Overviews eligibility | Google AI-optimization guide |
| llms.txt | Unconfirmed value across all three engines; low-cost, low-priority addition | No official requirement found from Google, Anthropic, or OpenAI |
| `Service` schema `areaServed`, 11 literal place names (never "EMEA") | schema.org and GBP both require real resolvable geographic entities to function structurally; a region acronym does nothing | schema.org `Service`/`areaServed` documentation |
| Google Business Profile — Service Area Business (SAB) | Legitimate, Google-sanctioned way to list up to 20 service areas with zero physical-presence requirement — distinct from a storefront listing | Google Business Profile documentation |

Sources:
- [Google's Guide to Optimizing for Generative AI Features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518)
- [OpenAI Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856)
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [schema.org ProfessionalService (deprecated) / Service documentation](https://schema.org/ProfessionalService)
- [Google Business Profile — manage your business address / Service Area Business](https://support.google.com/business/answer/2853879)
