---
title: "HubSpot Lead Scoring & Routing Workflow (Fit + Engagement)"
description: "Build HubSpot lead scoring that sales trusts: separate fit and engagement scores, agreed thresholds, and automatic MQL stage changes, routing and follow-up."
metaTitle: "HubSpot Lead Scoring & Routing Workflow | Tibin Jacob"
slug: "hubspot-lead-scoring"
status: "live"
targetKeyword: "hubspot lead scoring"
cluster: "RevOps"
audience: ["Head of GTM", "Head of RevOps", "Demand gen leader"]
sourceRole: "General"
proofLink: "/work/mavlers-partner-agency-signals"
publishedDate: "2026-09-25"
updatedDate: "2026-09-25"
faq:
  - q: "What is a good lead score threshold in HubSpot?"
    a: "There isn't a universal number. Set the threshold with sales by looking at which past leads became opportunities, start slightly strict, and review it monthly against MQL-to-SQL conversion."
  - q: "Should I use one score or two?"
    a: "Two. A fit score and an engagement score tell you different things, and requiring both to pass is what keeps low-fit, high-activity contacts out of your SDRs' queue."
  - q: "How often should lead scoring be reviewed?"
    a: "Monthly at first, then quarterly once conversion from MQL to SQL is stable."
  - q: "Can lead scoring trigger routing automatically?"
    a: "Yes. A HubSpot workflow can change the lifecycle stage when thresholds are met, then assign an owner, create a task and enroll the contact in a sequence."
tools: ["HubSpot", "Clay", "Apollo", "Zoho SalesIQ", "n8n"]
trigger: "A contact is created or updated, or shows new engagement"
steps:
  - title: "Write the ICP down with sales"
    body: "Agree on industries, company size, regions and buyer titles before touching HubSpot. This is the part people skip, and it's why sales stops trusting the score."
  - title: "Enrich for fit"
    body: "Fill company size, industry and other fit fields with a waterfall (see the [waterfall enrichment workflow](/workflows/waterfall-enrichment)) so the fit score isn't built on empty fields."
  - title: "Build the fit score in HubSpot"
    body: "Use HubSpot's lead scoring tool or score properties with positive points for ICP matches and negative points for clear disqualifiers (competitors, students, personal email domains)."
  - title: "Build the engagement score"
    body: "Weight high-intent actions above low-intent ones, and add decay so activity older than your sales cycle stops counting."
  - title: "Set thresholds with sales"
    body: "Agree on the MQL threshold for each score, and write the definition down. My [MQL vs SQL guide](/blog/mql-vs-sql) covers how to phrase it."
  - title: "Trigger the lifecycle stage"
    body: "A HubSpot workflow moves contacts to MQL when both thresholds are met, and back to nurture if engagement decays."
  - title: "Route and assign"
    body: "Assign an owner by territory, segment or round robin, create a task, and enroll the contact in the follow-up sequence. Details in [lead routing](/glossary/lead-routing)."
  - title: "Review monthly"
    body: "Compare scores against which MQLs actually became SQLs and opportunities, then adjust the weights."
---

> **Short answer:** HubSpot lead scoring works when it combines two scores: fit (how closely a company matches your ICP) and engagement (what they are doing right now). Score both, set a threshold sales agrees on, and let the score trigger the lifecycle stage change and routing, instead of asking reps to eyeball a single number.

## Why most HubSpot lead scoring fails

Most scoring models I see fail for the same three reasons:

- **One blended number.** A student who reads ten blog posts and a VP at a perfect-fit account who visits pricing once can end up with the same score. A single score hides the difference between fit and intent.
- **Points nobody agreed on.** Marketing sets the weights, sales never sees them, and within a month reps ignore the score.
- **Scores that trigger nothing.** A score that sits on the record without changing a stage, an owner or a task is a report, not a system.

## The model: fit score + engagement score

**Fit score (who they are).** Built from firmographics that match your ICP: industry, company size, region, tech stack, and the job title of the contact. Fit changes slowly, so it can be enriched once and refreshed on a schedule.

**Engagement score (what they are doing).** Built from recent behavior: visits to high-intent pages (pricing, services, comparisons), form fills, email replies, and site intent signals from a tool like Zoho SalesIQ. Engagement should decay over time so old activity doesn't keep a lead hot forever.

**The rule that makes it work:** a contact only becomes an MQL when both scores clear their threshold. High fit with low engagement goes to a nurture or outbound list; high engagement with low fit gets a lighter-touch path.

## How it looks end to end

<pre class="mermaid">
flowchart LR
  A[&quot;New or updated contact&quot;] --&gt; B[&quot;Enrich firmographics&quot;]
  B --&gt; C[&quot;Fit score (ICP match)&quot;]
  A --&gt; D[&quot;Engagement score (intent + activity, with decay)&quot;]
  C --&gt; E{&quot;Both above threshold?&quot;}
  D --&gt; E
  E --&gt;|yes| F[&quot;Lifecycle stage: MQL&quot;]
  E --&gt;|no| G[&quot;Nurture / outbound list&quot;]
  F --&gt; H[&quot;Assign owner + task + sequence&quot;]
  H --&gt; I[&quot;SQL when sales accepts&quot;]
</pre>

## When it fails

- **Empty fit fields:** if enrichment misses, the contact is flagged for research instead of scoring as zero-fit.
- **Score inflation:** engagement decay stops old activity from keeping leads hot.
- **Duplicate records:** dedupe before scoring, or the same person gets routed twice (see [CRM write-back](/glossary/crm-write-back)).
- **No owner available:** fall back to a default owner and alert the team so nothing sits unassigned.

## Stack

HubSpot (scoring, lifecycle stages, workflows, sequences), Clay and Apollo for enrichment, Zoho SalesIQ for site intent, n8n for anything HubSpot workflows can't do natively.

## Where I used this

At Mavlers I scored partner-agency visitors against the ICP and moved them through the same MQL to SQL stages sales already trusted, so internal sales worked SQL-ready accounts. Read the [Mavlers case study](/work/mavlers-partner-agency-signals), or see how visitors are captured in the [website visitors to HubSpot workflow](/workflows/website-visitors-to-hubspot).

Need this built in your HubSpot? [Work with me as your RevOps consultant](/revops-consultant) or [hire me for this](/hire).
