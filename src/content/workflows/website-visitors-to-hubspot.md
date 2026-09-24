---
title: "Website visitors to HubSpot: intent scoring and routing"
description: "A workflow that flags high-intent website visitors with Zoho SalesIQ, scores them against your ICP, and routes qualified accounts into HubSpot stages and sequences."
metaTitle: "Route Website Visitors into HubSpot (SalesIQ + n8n) | Tibin Jacob"
slug: "website-visitors-to-hubspot"
status: "live"
cluster: "Signals & Enrichment"
targetKeyword: "anonymous website visitor identification"
audience: ["Head of GTM", "Head of RevOps", "Demand gen leader"]
sourceRole: "Mavlers"
proofLink: "/work/mavlers-partner-agency-signals"
publishedDate: 2026-09-24
updatedDate: 2026-09-24
tools: ["Zoho SalesIQ", "n8n", "Clay", "HubSpot"]
trigger: "A visitor from a target account views high-intent pages (pricing, services, comparison)"
steps:
  - title: "Flag the visit"
    body: "Zoho SalesIQ identifies the visiting company and which pages they viewed."
  - title: "Enrich the account"
    body: "Add firmographics so the account can be judged against the ICP."
  - title: "Score against the ICP"
    body: "Combine fit (firmographics) with intent (pages and engagement) into one score."
  - title: "Set the lifecycle stage"
    body: "Accounts above the threshold become MQLs in HubSpot using the stage definitions sales already trusts; the rest go to nurture."
  - title: "Route and follow up"
    body: "SQL-ready accounts are assigned to an owner and pushed into a defined follow-up sequence."
faq:
  - q: "Can you identify anonymous website visitors?"
    a: "Tools like Zoho SalesIQ can identify the company behind many B2B visits, not the individual person. The workflow works at account level and then finds the right contacts."
  - q: "Why score intent and fit together?"
    a: "Intent alone brings in students and competitors; fit alone brings in accounts that aren't in market. Combining both keeps sales focused on accounts that match the ICP and are active now."
---

## What this workflow does

Most B2B visitors never fill in a form. This workflow catches high-intent visits at account level, checks them against your ICP, and turns the good ones into routed, owned records in HubSpot with a follow-up already scheduled.

## How the workflow runs

```text
SalesIQ visit ─▶ Enrich (firmographics) ─▶ ICP score (fit + intent)
                                              │
                        ┌─── below threshold ─┴─ above threshold ───┐
                        ▼                                           ▼
                     Nurture                      HubSpot MQL ─▶ SQL ─▶ owner + follow-up sequence
```

## When it fails

- **Company not identified:** the visit is logged but not routed.
- **Duplicate account:** matched to the existing HubSpot company instead of creating a new one.
- **No owner available:** falls back to a default owner and alerts the team.

## Stack

Zoho SalesIQ, n8n, Clay and HubSpot.

## Where I used this

The core of the Mavlers partner-agency motion. See the [Mavlers case study](/work/mavlers-partner-agency-signals), or [hire me for this](/hire).
