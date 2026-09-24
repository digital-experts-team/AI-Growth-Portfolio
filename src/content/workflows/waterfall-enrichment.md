---
title: "Waterfall enrichment agent"
description: "A waterfall enrichment workflow that queries data providers in order until a field is filled, verifies it, and writes it back to HubSpot."
metaTitle: "Waterfall Enrichment Workflow (Clay, Apollo, HubSpot) | Tibin Jacob"
slug: "waterfall-enrichment"
status: "live"
cluster: "Signals & Enrichment"
targetKeyword: "waterfall enrichment"
audience: ["GTM Engineer", "Head of RevOps", "Head of GTM"]
sourceRole: "General"
proofLink: "/work/paddleboat-sdr-scaling-signals"
publishedDate: 2026-09-24
updatedDate: 2026-09-24
tools: ["Clay", "Apollo", "n8n", "HubSpot"]
trigger: "A new or updated account or contact is missing a key field (work email, phone, company data)"
steps:
  - title: "Trigger"
    body: "A new or updated record in HubSpot or Clay is missing a field the team needs, such as a work email or company size."
  - title: "Query the first provider"
    body: "Look the record up in the first provider in the waterfall, ordered by cost and fit for your market."
  - title: "Fall back in order"
    body: "If the first provider returns nothing or an unverified value, query the next one, and so on down the list."
  - title: "Verify"
    body: "Check the value before it is used: email verification for emails, format and domain checks for other fields."
  - title: "Write back"
    body: "Write the verified value to HubSpot with its source, so reps and reports know where every field came from."
faq:
  - q: "What is waterfall enrichment?"
    a: "Waterfall enrichment queries several data providers in sequence until a field is filled with a verified value, instead of relying on one provider's coverage."
  - q: "Why order providers by cost?"
    a: "Starting with the cheapest provider that fits your market and only paying for premium lookups when earlier ones miss keeps enrichment costs down while coverage goes up."
  - q: "What happens when every provider misses?"
    a: "The record is flagged for manual research or excluded from outbound, so reps never work unverified data."
---

## What waterfall enrichment is

Waterfall enrichment queries several data providers in sequence until a field is filled with a verified value. No single provider covers every market, so a waterfall fills the gaps one provider leaves while keeping cost under control.

## How the workflow runs

```text
Missing field ─▶ Provider 1 ─(miss)─▶ Provider 2 ─(miss)─▶ Provider 3
                     │                    │                    │
                     └──────(hit)─────────┴──────(hit)─────────┘
                                          ▼
                                       Verify ─▶ Write back to HubSpot (with source)
```

## When it fails

- **Rate limits:** requests are retried with a delay rather than dropped.
- **No match anywhere:** the record is flagged instead of sent to outbound.
- **Conflicting values:** the verified value wins, and the conflict is logged for review.

## Stack

Clay, Apollo, n8n and HubSpot.

## Where I used this

Enrichment of flagged accounts in the Paddleboat AI signal system. See the [Paddleboat AI case study](/work/paddleboat-sdr-scaling-signals), or [hire me for this](/hire).
