---
title: "Marketing agents with retries and human review"
description: "I built a content workflow for X and LinkedIn with visible run states, retries, and human approval before publishing."
slug: "heurist-autopilot-agents"
cluster: "AI Agents"
company: "Heurist AI"
role: "GTM Automations and Marketing Ops"
dates: "Jun 2024 – Oct 2025"
tag: "Failure handling · Human approval"
image: "https://images.unsplash.com/photo-1777769643176-d7b3250bfdbc?auto=format&fit=crop&w=1200&h=800&q=80"
authorAvatar: "/images/tibin-avatar.jpg"
publishedDate: 2025-11-20
---

## The problem

Marketing needed a repeatable way to produce content for X and LinkedIn while keeping control over what went live. When a step failed, the team needed to know where the run had stopped.

## What I built

I built agents for content generation and distribution and gave the workflow explicit execution states. The team could see whether a run was generating content, waiting for approval, or blocked by an error. I added retries and error handling so failed steps could be recovered.

## How marketing used it

A reviewer approved the content before publication. If a step failed, the run exposed the error and could retry the failed step. A run that still needed attention stayed visible to the team.

## Workflow

**Generate → Review → Approve → Publish**

**Retry path** · Failed step → Retry → Resume or flag for review
