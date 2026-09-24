# DESIGN_PLAN.md — Architectural & Visual Blueprint

## 1. Palette (Exact Extracted Hex Values)
- `--bg`: `#000000` (Pitch Black base canvas)
- `--surface`: `#0a0a0a` (Clean subtle card container)
- `--surface-border`: `rgba(255, 255, 255, 0.08)` (Tactile 1px structural separator)
- `--text`: `#ffffff` (High-contrast primary reading layer)
- `--text-muted`: `#9ca3af` (Secondary metadata, 60–75 char max line length)
- `--gold-base`: `#D4AF37` (Core metallic gold accent)
- `--gold-light`: `#F6E27A` (Signal highlight)
- `--gold-dark`: `#8E6216` (Bronze anchor)
- `--gradient-signal`: `linear-gradient(90deg, #8E6216 0%, #D4AF37 50%, #F6E27A 100%)`
- `--gradient-cta`: `linear-gradient(180deg, #F9F295 0%, #E0AA3E 52%, #B88A44 100%)`

## 2. Typography Roles
- **Display (`Space Grotesk`)**: Technical authority. Used for single `h1` per page, section headings (`h2`), and pipeline stage headers. Letter-spacing: `-0.02em`.
- **Sans (`Inter`)**: Frictionless reading. Used for body, navigation, descriptions, technical step instructions, and metadata. Line-height: `1.6`.
- **Mono (`JetBrains Mono / monospace`)**: Tool badges, data payloads, triggers, webhook headers, and code snippets.

## 3. Four Core Principles
1. **The Hero Pipeline is the Single Bold Moment**: An animated, orchestrated SVG diagram demonstrating `Signal -> Score -> Route`. Live signals enter from the left, get enriched & scored in the center, and route into CRM / rep lanes. Respects `prefers-reduced-motion`.
2. **Signal Flow Discipline**: The gold gradient is strictly functional. It marks data traversal: pipeline lines, architecture flow diagrams, active timeline nodes, and primary conversion CTAs. Zero gratuitous background washes.
3. **Engineered Proof Over Fluff**: Case studies and workflows feature real architecture schematics, precise trigger/action matrices, failure handling, and verifiable facts. No invented metrics or vanity numbers.
4. **Static-First AEO/GEO Dominance**: Pre-rendered HTML for instant crawler extraction, `<AnswerBlock>` 40–60 word direct definitions under question `h2`s, `HowTo` + `FAQPage` + `Person` JSON-LD schemas, and auto-generated `/llms.txt`.

---

## 4. Layout Wireframes

### A. Homepage (`/`)
```text
+--------------------------------------------------------------------+
| [Tibin Jacob] [GTM Engineer]        Work  Workflows  Blog  [Hire Me] |
+--------------------------------------------------------------------+
|                                                                    |
| [H1] I build the systems that turn buying signals into             |
|      pipeline your sales team can work.                            |
|                                                                    |
| [Subline] GTM Engineer. Clay, n8n, HubSpot and AI agents, plus     |
|           the paid, SEO and content side that feeds them.          |
|                                                                    |
| [CTA: See how I work (/work)]      [CTA: Hire me (/hire)]          |
|                                                                    |
| +----------------------------------------------------------------+ |
| | HERO PIPELINE: Signal -> Score -> Route (SVG Live Flow)        | |
| | [Website Visit] ---> [ Clay / Waterfall ] ---> [ HubSpot SQL ] | |
| | [Hiring Spike]  ---> [ ICP Fit Matrix   ] ---> [ Slack Alert ] | |
| | [Funding Round] ---> [ Sales IQ Scoring ] ---> [ Sequence    ] | |
| +----------------------------------------------------------------+ |
|                                                                    |
| --- HOW I WORK: SIGNAL -> SCORE -> ROUTE (3 Key Workflows) ---    |
| [01. Signal Capture]      [02. Waterfall Score]   [03. Direct Route]
| Multi-intent triggers     Clay + LLM verification SLA-based CRM sync|
| -> /workflows/...         -> /workflows/...       -> /workflows/...|
|                                                                    |
| --- SELECTED WORK (Mavlers, Paddleboat AI, Heurist AI) ----------- |
| [Mavlers] Partner Agency Signal Engine (HubSpot + Sales IQ)        |
| [Paddleboat AI] SDR Scaling Trigger Architecture (#1 PH launch)    |
| [Heurist AI] Human-in-the-Loop Content Autopilot Agents            |
|                                                                    |
| --- WORKFLOW LIBRARY & TOOL STACK -------------------------------- |
| [Clay] [n8n] [HubSpot] [Apollo] [Sales IQ] [Claude] [Make] [Zapier]|
|                                                                    |
| --- WHO I WORK WITH ---------------------------------------------- |
| - Head of GTM: Predictable qualified pipeline without rep churn.   |
| - Head of RevOps: Clean CRM architecture, deduped write-backs.     |
| - Demand Gen Leaders: Turning intent data into immediate outbound. |
|                                                                    |
| --- LIVE DEMO CONTACT FORM (Routes to HubSpot Forms API) ----------|
| [Name] [Work Email] [Company] [Need] [Submit -> Trigger Pipeline]  |
| "Note: Submitting this form executes a live HubSpot API webhook."  |
+--------------------------------------------------------------------+
```

### B. Case Study Page (`/work/[slug]`)
```text
+--------------------------------------------------------------------+
| Breadcrumbs: Home / Work / Mavlers Partner Agency Signals          |
| Title: Mavlers: Partner Agency Signal-Based Outbound Engine        |
| Meta: Role: GTM Automation Lead | Apr 2026 - Sep 2026 | Remote     |
+--------------------------------------------------------------------+
| [AnswerBlock: Executive Summary (45 words)]                        |
|                                                                    |
| ## 1. Context & Business Model                                     |
| White-label delivery model selling to peer digital agencies.       |
|                                                                    |
| ## 2. The Core Bottleneck                                          |
| Generic brand MQLs vs. high-intent agency owners looking for scale.|
|                                                                    |
| ## 3. Architecture Schematic (Interactive / Static SVG)            |
| [Sales IQ Tracking] ---> [Filter: Agency ICP] ---> [HubSpot CRM]   |
|                                   |                                |
|                             [Rep Alert]                            |
|                                                                    |
| ## 4. Technical Execution                                          |
| - Inbound-to-outbound event loop                                  |
| - MQL -> SQL qualification criteria alignment                      |
| - ICP workshop translated to productized agency offer              |
|                                                                    |
| ## 5. Results & Documented Outcomes                                |
| Sales team working SQL-ready partner accounts with zero manual     |
| prospecting friction.                                              |
|                                                                    |
| [See Related Workflow]                   [Hire Me For This Motion] |
+--------------------------------------------------------------------+
```

### C. Workflow Page (`/workflows/[slug]`)
```text
+--------------------------------------------------------------------+
| Breadcrumbs: Home / Workflows / Waterfall Enrichment Engine        |
| Title: Automated Waterfall Enrichment Engine with Clay & Apollo    |
| Last Updated: Sep 2026 | Stack: Clay, Apollo, Prospeo, HubSpot     |
+--------------------------------------------------------------------+
| [AnswerBlock: Direct Answer on how waterfall enrichment works]     |
|                                                                    |
| [Architecture Diagram: Trigger -> Provider 1 -> Provider 2 -> CRM] |
|                                                                    |
| ## 1. Trigger Specification                                        |
| Webhook payload / CSV import / Intent signal                       |
|                                                                    |
| ## 2. Step-by-Step Execution (<Steps> Component)                   |
| 1. Normalize company domain and executive name                     |
| 2. Query Primary Provider (Apollo)                                 |
| 3. If invalid / unverified -> Cascade to Secondary (Prospeo/Clay)  |
| 4. Validate MX & SMTP deliverability                               |
| 5. Deduplicate against HubSpot Contact records                     |
|                                                                    |
| ## 3. Failure Handling & Circuit Breakers                          |
| Quota limits, 429 backoff, fallback routing to manual queue.       |
|                                                                    |
| ## 4. Video Walkthrough Facade & Template Download                 |
| [Lazy-loaded Loom Facade]   [Download n8n/Clay JSON Blueprint]     |
|                                                                    |
| ## 5. Frequently Asked Questions (<FAQ> Component + JSON-LD)       |
| [Q: What is the cost saving of waterfalling vs single providers?]  |
| [Q: How do you prevent CRM data pollution?]                        |
+--------------------------------------------------------------------+
```

## 5. Review & Revisions Note
- *Initial thought*: Add animated glowing background gradients to the cards.
- *Revision made*: **Removed**. As directed, the gradient is exclusively reserved for **Signal Flow** (the Hero pipeline, connector lines, active timeline checkpoints, and high-impact action buttons). Cards have a crisp 1px neutral border (`rgba(255, 255, 255, 0.08)`) with pitch-black backgrounds to emphasize technical rigor over consumer dazzle.
- *Typography check*: Ensure contrast on dark background meets WCAG AA (pure white `#ffffff` on `#000000` has a contrast ratio of 21:1; gold `#D4AF37` on dark surface `#0a0a0a` has > 7:1).
