---
name: n8n-uptime-monitoring
description: n8n-based uptime/failure monitoring using the Dapye ops-bot pattern — Schedule Trigger + HTTP Request site checks, Healthchecks.io dead-man's-switch heartbeats, a shared Telegram+email Notify sub-workflow. Use when building or debugging any site-uptime check, cron dead-man's-switch, or alert-relay workflow for anthonychilaka.com, craftbyTAG, or any project Dapye monitors.
---

# n8n Uptime Monitoring Skill

## Purpose
Ensures every uptime/failure-monitoring workflow built for Dapye (Anthony's
self-hosted ops bot, `Outputs\Dapye\`) follows the same proven pattern rather
than being redesigned per source. Covers two live use cases today —
`www.anthonychilaka.com` site uptime (W3) and `stjosephcraftbytag.store` site
uptime (W4) — and is written to extend cleanly to future sources (StRita,
CraftByTag Academy, anything else Dapye grows to watch).

Core principle, carried directly from Dapye's own build-log: **relay via each
source's own native failure signal where one exists (n8n Error Workflow,
BigQuery query results); build a direct HTTP check only when no native signal
exists** (a plain Squarespace or static site has none). Never reimplement
detection a platform already does natively.

---

## Activation Protocol (run before any uptime-monitoring work)
1. Read `Outputs\Dapye\build-log.md`'s Status table for the current state of
   whichever check (W3, W4, or a new one) is being built or debugged
2. Confirm Dapye's own infra (I1) is actually provisioned before assuming any
   workflow can go live — as of the last check, it wasn't
3. Confirm which alert channels are actually available for this source right
   now (Telegram+email is always live in v1; WhatsApp is not, until Meta/WABA
   verification completes — check `Outputs\Dapye\build-log.md`'s D3 row)

---

## Decision Tree — which check pattern applies
```
├─ Does the source have its own native failure signal?
│   ├─ YES (n8n Error Workflow, a queryable freshness table, a platform's own
│   │        failure webhook) → wire directly to that signal, don't build a
│   │        separate polling check on top of it
│   └─ NO (a plain website with no native hook — Squarespace, static hosting)
│            → Schedule Trigger → HTTP Request → IF non-200/timeout
├─ Every check's result (either branch above) → routes through the ONE
│   shared Notify sub-workflow (Telegram + Email) — never duplicate send
│   logic per source
└─ Every scheduled job → its own Healthchecks.io success/fail ping, kept
    SEPARATE from Dapye's own independent heartbeat ping (the heartbeat
    proves Dapye itself is alive; a per-job ping proves that job specifically
    ran — conflating the two misses a workflow going silently `active: false`)
```

---

## Uptime Check Gate — run before a check is marked live

| # | Check | Requirement | Status |
|---|---|---|---|
| 1 | Workflow published, not just saved | Schedule Trigger does nothing on an unpublished workflow — confirmed via n8n's own docs, not assumed | — |
| 2 | HTTP Request "Never Error" left OFF | Must stay off so a non-200/timeout actually fails the node and reaches the IF branch | — |
| 3 | Timeout explicitly set | Not left at platform default — set a real ms value matched to the site's normal response time | — |
| 4 | IF node branches correctly | Non-200/timeout → Notify sub-workflow; 200 → Healthchecks.io success ping | — |
| 5 | Telegram chat_id verified | Not documented in n8n's own docs — confirm separately via Telegram's own API (e.g. `@userinfobot`) before assuming it's correct | — |
| 6 | Resend send checked for `error` | The Resend SDK returns `{data, error}`, does not throw — an unchecked `error` field silently swallows a failed send | — |
| 7 | Shared Notify sub-workflow has its own trigger | "Execute Sub-workflow Trigger" node ("When Executed by Another Workflow"), "Accept all data" mode — confirmed as the correct pattern per n8n's own docs | — |
| 8 | Heartbeat kept separate from per-job pings | Two distinct Healthchecks.io checks, not one merged check | — |
| 9 | WhatsApp not wired prematurely | For craftbyTAG (W4) specifically: Telegram+email only until Meta/WABA verification actually completes, even though the client-facing plan names WhatsApp | — |
| 10 | Real failure test run | Deliberately trigger a failure (bad URL, throwaway) before calling the check "done" — matches Dapye's own Verification plan discipline | — |

Cannot mark a check live with blank rows — each is "done" or "deferred: <reason>", same convention as every other skill in this build.

---

## What NOT to do
- Do not rely on a third-party monitoring tool's own native alerting when it
  can't reach the channel actually needed — confirmed UptimeRobot's free tier
  is email-only, Telegram is paid-plan-gated, so it can't carry this
  project's actual alert requirements on its own
- Do not assume "workflow saved" means "workflow running" — Schedule Trigger
  requires an explicit publish step
- Do not duplicate Notify/send logic per source — one shared sub-workflow,
  called via Execute Workflow, every time
- Do not treat a Resend API response as successful without checking the
  `error` field — the SDK does not throw on failure
- Do not wire WhatsApp before Meta/WABA verification actually completes, even
  when a project's own plan document names it as the target channel

---

## Method Reference

| Technique | Why | Source |
|---|---|---|
| HTTP Request node, "Never Error" OFF | Only 2xx counts as success by default — no extra error-handling node needed for basic uptime detection | n8n HTTP Request node documentation |
| Explicit Schedule Trigger publish + timezone check | Unpublished schedule silently does nothing; this exact failure mode already happened to Kachi | n8n Schedule Trigger documentation |
| Shared Notify sub-workflow via Execute Workflow | Avoids duplicating Telegram/email send logic per source; sub-workflow needs its own "Execute Sub-workflow Trigger" | n8n Execute Workflow documentation |
| Healthchecks.io plain HTTP ping (success/fail/start) | Simple `GET`/`POST` to `hc-ping.com/<uuid>` — no SDK needed, rate limit (5/min) irrelevant at this volume | Healthchecks.io HTTP API documentation |
| Resend `{data, error}` response check | SDK doesn't throw on failure — an unchecked response silently drops a failed alert email | Resend Node.js SDK documentation |
| Direct check over third-party tool alerting | UptimeRobot free tier can't relay to Telegram/WhatsApp; a direct n8n check costs nothing extra and isn't channel-limited | Confirmed via Kachi's own live UptimeRobot setup (email-only alerts on free tier) |

Sources:
- [n8n HTTP Request node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [n8n Schedule Trigger node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [n8n Telegram node docs](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.telegram/)
- [n8n Telegram credentials docs](https://docs.n8n.io/integrations/builtin/credentials/telegram/)
- [n8n Execute Workflow node docs](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executeworkflow/)
- [Healthchecks.io HTTP API docs](https://healthchecks.io/docs/http_api/)
- [Resend Node.js SDK docs](https://resend.com/docs/send-with-nodejs)
- `Outputs\Dapye\build-log.md` — this project's own architecture design and W3/W4 decisions (pre-existing, cited not re-researched)
