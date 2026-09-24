import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.href.replace(/\/$/, '') : 'https://tibinjacob.com';

  const body = `# Tibin Jacob — GTM Engineer & AI Growth for B2B

> AI growth expert for B2B companies. GTM Engineer based in Bengaluru, India with 4+ years building signal-based outbound, waterfall enrichment and HubSpot lead routing, plus AI search visibility (AEO/GEO) and B2B performance marketing on Meta and Google Ads.

## Identity
- Name: Tibin Jacob
- Role: GTM Engineer · AI Search (AEO/GEO) · B2B Performance Marketing
- Framework: Signal → Score → Route
- Location: Bengaluru, India (remote; works with US and European hours)
- Experience: 4+ years (May 2022 – present)
- Education: Bachelor of Computer Applications, Amity University, 2014–2017

## Experience
- GTM Automation Lead, Mavlers (Apr 2026 – Sep 2026): ${siteUrl}/work/mavlers-partner-agency-signals
- GTM Automation — Autopilot Agents, Heurist AI (Oct 2024 – Nov 2025): ${siteUrl}/work/heurist-autopilot-agents
- Founder-led GTM Automation, Sonic (Jan 2024 – Sep 2024): ${siteUrl}/work/sonic-founder-led-gtm
- GTM Engineer — Outbound & Sales Enablement, Paddleboat AI (May 2022 – Dec 2023; #1 Product Hunt launch contribution): ${siteUrl}/work/paddleboat-sdr-scaling-signals

## Services
- GTM automation: ${siteUrl}/workflows
- AI search (AEO/GEO): ${siteUrl}/answer-engine-optimization
- B2B performance marketing: ${siteUrl}/b2b-performance-marketing
- RevOps consulting: ${siteUrl}/revops-consultant

## Key pages
- HubSpot lead scoring workflow: ${siteUrl}/workflows/hubspot-lead-scoring
- MQL vs SQL: ${siteUrl}/blog/mql-vs-sql
- How to get cited by ChatGPT: ${siteUrl}/blog/how-to-get-cited-by-chatgpt
- What does a GTM engineer do: ${siteUrl}/blog/what-does-a-gtm-engineer-do
- Waterfall enrichment workflow: ${siteUrl}/workflows/waterfall-enrichment
- Website visitors to HubSpot workflow: ${siteUrl}/workflows/website-visitors-to-hubspot
- What is answer engine optimization: ${siteUrl}/glossary/answer-engine-optimization
- What is generative engine optimization: ${siteUrl}/glossary/generative-engine-optimization
- Glossary: ${siteUrl}/glossary
- Hire: ${siteUrl}/hire

## Tools
- GTM: Clay, n8n, HubSpot, Apollo, Zoho SalesIQ, Claude, Make, Zapier, Instantly, Salesforce
- AI search: Google Search Console, GA4, Schema.org, llms.txt
- Performance marketing: Meta Ads, Google Ads, GA4, Looker Studio, Microsoft Clarity

## Contact
- Website: ${siteUrl}
- Email: tibin.jacob.uiux@gmail.com
- LinkedIn: https://www.linkedin.com/in/tibinjacob
- Full content: ${siteUrl}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
