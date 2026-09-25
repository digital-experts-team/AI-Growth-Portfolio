---
title: "Paddleboat AI: Scaling SDR Team Intent Signals"
description: "How I built a multi-signal outbound architecture targeting sales leaders scaling their SDR teams, driving a #1 Product Hunt launch."
metaTitle: "Paddleboat AI Case Study — SDR Scaling Signals | Tibin"
slug: "paddleboat-sdr-scaling-signals"
status: "live"
cluster: "GTM Engineering"
targetKeyword: "sdr scaling signals gtm"
audience: ["VP Sales", "Head of GTM", "SDR Manager"]
sourceRole: "Paddleboat AI"
company: "Paddleboat AI"
role: "GTM Engineer — Outbound & Sales Enablement"
dates: "May 2022 – Dec 2023"
image: "/images/case-studies/paddleboat.jpg"
tag: "#Signals"
author: "Tibin Jacob"
authorAvatar: "/images/tibin-avatar.jpg"
proofLink: "/workflows/waterfall-enrichment"
publishedDate: 2023-12-15
updatedDate: 2026-09-18
faq:
  - q: "What buying signals flagged companies ready for AI sales coaching?"
    a: "Signals included active SDR job postings, recent Series A/B funding rounds, and executive sales leadership transitions."
---

## Executive Summary

Paddleboat AI provides an interactive AI sales coaching and roleplay platform. To maximize outbound ROI, we needed to identify B2B SaaS companies at the exact moment they were aggressively hiring and scaling new sales development representatives (SDRs).

## The Core Bottleneck

Broad outbound campaigns targeting all SaaS VP Sales contacts suffered from low urgency. Companies without active onboarding cohorts saw AI coaching as a future consideration rather than an urgent requirement.

## Architecture Schematic

```text
[Signal Watcher: Job Postings + Funding] ──> [Apollo Org Scrape]
                                                    │
                   ┌────────────────────────────────┘
                   ▼
      [SDR Team Size > 5 & Roles Open]
       ├── FALSE ──> Low-touch Newsletter Nurture
       └── TRUE  ──> [Clay Waterfall Enrichment (Work Email + Phone)]
                       └──> [Personalized Sales Coaching Playbook]
                              └──> Push to SDR Sequence
```

## How I Built It

1. **Multi-Signal Intent Engine**: Combined website intent data with external job board postings (LinkedIn Talent Solutions, job board APIs) and Crunchbase funding alerts.
2. **ICP Difficulty Matrix**: Collaborated directly with founders and senior SDRs to structure rep personas based on buyer objection hardness, tech vertical, and deal complexity.
3. **LLM Scorecards & Missed Opportunity Alerts**: Configured automated scorecard summaries highlighting objection handling gaps during reps' practice calls.
4. **Launch Orchestration**: Aligned the signal-driven pipeline with our public release, contributing directly to achieving a #1 Product of the Day launch on Product Hunt.

## Verified Results

- Engineered an automated GTM system targeting VP and Head of Sales at 50–500 person SaaS organizations.
- Turned real sales representative feedback into modular product designs and objection templates.
- Contributed to achieving the #1 Product Hunt launch position through coordinated customer engagement and automated outbound outreach.

## What I Would Do Differently

TODO(tibin): Add details on automated SDR rep ramp time tracking and direct CRM scorecard synchronization.
