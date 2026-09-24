---
title: "MQL vs SQL: How to Define Them So Sales Trusts the Handoff"
description: "MQL vs SQL explained: who decides each, how to write definitions both teams accept, where SAL fits, and how to automate the handoff in HubSpot."
metaTitle: "MQL vs SQL: Definitions Sales Will Trust | Tibin Jacob"
slug: "mql-vs-sql"
status: "live"
targetKeyword: "mql vs sql"
cluster: "RevOps"
audience: ["Head of GTM", "Head of RevOps", "Demand gen leader"]
sourceRole: "General"
proofLink: "/work/mavlers-partner-agency-signals"
publishedDate: "2026-09-25"
updatedDate: "2026-09-25"
faq:
  - q: "What is the difference between an MQL and an SQL?"
    a: "An MQL is a lead marketing considers ready for sales based on fit and engagement. An SQL is a lead sales has reviewed and accepted as a real opportunity. The MQL is marketing's call; the SQL is sales' call."
  - q: "Which comes first, MQL or SQL?"
    a: "The MQL comes first. Marketing qualifies the lead, sales accepts it (often as an SAL), and after a conversation confirms need and timing it becomes an SQL."
  - q: "What is a good MQL to SQL conversion rate?"
    a: "It varies widely by industry, deal size and how strict your MQL definition is. Track your own rate over time and use rejection reasons to improve it rather than chasing a benchmark."
  - q: "Who should define MQL and SQL criteria?"
    a: "Marketing and sales together, written down in one sentence each, with RevOps building the scoring and routing that enforces them."
type: "pillar"
---

> **Short answer:** An MQL (marketing qualified lead) is a lead that fits your ideal customer profile and has shown enough interest that marketing believes it's worth sales' time. An SQL (sales qualified lead) is a lead sales has reviewed and accepted as a real opportunity to pursue. The MQL is marketing's judgment; the SQL is sales' judgment.

## MQL vs SQL at a glance

- **Who decides:** marketing (or an automated score) decides MQL; sales decides SQL.
- **What it's based on:** MQL is based on fit and engagement signals; SQL is based on a human conversation or review confirming need, authority and timing.
- **What happens next:** an MQL gets routed to sales for follow-up; an SQL becomes an opportunity or deal.
- **What it measures:** MQL volume measures marketing's reach into the ICP; MQL to SQL conversion measures whether marketing and sales agree on quality.

## Why the definitions break down

The arguments between marketing and sales are rarely about effort. They're about definitions nobody wrote down:

- **Volume targets.** When marketing is measured on MQL count, the threshold quietly drops until MQLs stop meaning anything.
- **Activity without fit.** A lead that downloads three ebooks but works at a company you can't sell to is engaged, not qualified.
- **No SLA.** If sales doesn't have to accept or reject an MQL within a set time, leads go stale and both sides blame each other.
- **One blended score.** Mixing fit and engagement into one number hides why a lead scored high. See [HubSpot lead scoring with two scores](/workflows/hubspot-lead-scoring).

## How to define an MQL that sales will accept

Write it as one sentence both teams sign off on. A useful structure:

**"A contact becomes an MQL when their company matches our ICP (fit) AND they've taken a high-intent action in the last N days (engagement)."**

Then make each part concrete:

1. **Fit:** the industries, company sizes, regions and job titles you actually sell to. See [ICP scoring](/glossary/icp-scoring).
2. **Engagement:** which actions count as high intent (pricing page visits, demo requests, replies, repeat visits from the same account) and which don't (a single blog read).
3. **Time window:** engagement older than your sales cycle shouldn't count.
4. **Disqualifiers:** competitors, students, personal email domains, existing customers.

## How to define an SQL

An SQL is the point where sales says "yes, this is worth pursuing." Most teams confirm some version of:

- A real problem the product solves
- Someone with influence over the buying decision
- A reason to act in a reasonable time frame

The key is that SQL status is set by sales, not by an automated score, so it stays an honest check on MQL quality.

## Where SAL fits in

Many teams add an **SAL (sales accepted lead)** between the two: sales has accepted the MQL and agreed to work it, but hasn't yet qualified it as an opportunity. The SAL stage is what makes the handoff measurable. See [MQL vs SQL vs SAL](/glossary/sal).

## How the handoff works in HubSpot

<pre class="mermaid">
flowchart LR
  A[&quot;Lead&quot;] --&gt; B{&quot;Fit + engagement thresholds met?&quot;}
  B --&gt;|yes| C[&quot;MQL: routed to owner + task&quot;]
  B --&gt;|no| N[&quot;Nurture&quot;]
  C --&gt; D{&quot;Sales accepts within SLA?&quot;}
  D --&gt;|yes| E[&quot;SAL&quot;]
  D --&gt;|no| R[&quot;Rejected with reason → back to nurture&quot;]
  E --&gt; F{&quot;Qualified after conversation?&quot;}
  F --&gt;|yes| G[&quot;SQL → opportunity&quot;]
  F --&gt;|no| R
</pre>

The automated part (scoring, stage change, routing, tasks) is covered in the [HubSpot lead scoring workflow](/workflows/hubspot-lead-scoring). The human part (accept, reject, qualify) needs a required rejection reason, so you can see why MQLs fail and fix the definition.

## How I've used this

At Mavlers, the leads were partner agencies rather than brands. I scored visitors against the partner-agency ICP and routed them into HubSpot using the MQL to SQL stages sales already trusted, instead of inventing new ones. That choice mattered as much as the scoring logic: sales worked the accounts because the stages meant what they already expected. [Read the Mavlers case study](/work/mavlers-partner-agency-signals).

## What to measure

- **MQL to SQL conversion rate:** the single best check on whether your MQL definition works.
- **Time from MQL to first touch:** see [speed to lead](/glossary/speed-to-lead).
- **Rejection reasons:** the most common reasons tell you which part of the definition to tighten.
- **Pipeline by source:** which channels produce SQLs, not just MQLs.

If your MQLs and SQLs don't line up, I can help define and build the handoff as your [RevOps consultant](/revops-consultant).
