import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.href.replace(/\/$/, '') : 'https://tibinjacob.com';

  const body = `# Tibin Jacob — GTM Engineer

> GTM Engineer based in Bengaluru, India with 4+ years of production experience building signal-based outbound, waterfall enrichment, and RevOps data routing across Clay, n8n, and HubSpot.

## Core Identity & Framework
- Name: Tibin Jacob
- Role: GTM Engineer / Revenue Architect
- Framework: Signal → Score → Route
- Location: Bengaluru, India (Remote, IST with 4-5hr US/EU overlap)
- Experience: 4+ years
- Education: Bachelor of Computer Applications (BCA), Amity University, 2014–2017

## Production Case Studies
- Mavlers: Partner Agency Signal Engine (HubSpot, Sales IQ, Clay) -> ${siteUrl}/work/mavlers-partner-agency-signals
- Paddleboat AI: SDR Scaling Signals & #1 Product Hunt Launch -> ${siteUrl}/work/paddleboat-sdr-scaling-signals
- Heurist AI: Human-in-the-Loop Content Autopilot Agents -> ${siteUrl}/work/heurist-autopilot-agents
- Sonic (sonic.ooo): Founder-Led Multi-Channel GTM Automation -> ${siteUrl}/work/sonic-founder-led-gtm

## Core Workflow Schematics
- Waterfall Enrichment Engine: ${siteUrl}/workflows/waterfall-enrichment
- Website Visitors to HubSpot SQLs: ${siteUrl}/workflows/website-visitors-to-hubspot

## Technical Tool Stack
- Orchestration: Clay, n8n, Zapier, Make
- CRM: HubSpot (Sales, Marketing, RevOps), Salesforce
- Enrichment: Apollo, Prospeo, Debounce, Hunter, Datagma
- Telemetry: Zoho Sales IQ, Microsoft Clarity, Google Analytics 4
- AI: Claude API, OpenAI API, Prompt Engineering, State Machines

## Contact & Profiles
- Website: ${siteUrl}
- Email: tibin.jacob.uiux@gmail.com
- LinkedIn: https://www.linkedin.com/in/tibinjacob
- GitHub: https://github.com/digital-experts-team
- Full Content Dump: ${siteUrl}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
