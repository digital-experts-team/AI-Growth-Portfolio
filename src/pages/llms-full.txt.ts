import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ? site.href.replace(/\/$/, '') : 'https://tibinjacob.com';
  const caseStudies = await getCollection('caseStudies');
  const workflows = await getCollection('workflows', ({ data }) => data.status === 'live');
  const glossary = await getCollection('glossary');

  let body = `# Tibin Jacob — Full GTM Engineering Knowledge & Architecture Reference
Site: ${siteUrl}
Author: Tibin Jacob, GTM Engineer (Bengaluru, India)

===================================================================
SECTION 1: CORE BIOGRAPHY & CAREER TIMELINE
===================================================================
Tibin Jacob is a GTM Engineer with 4+ years of hands-on experience designing and operating automated revenue systems.
Education: Bachelor of Computer Applications (BCA), Amity University, 2014–2017.

Timeline:
1. Mavlers (Apr 2026 – Sep 2026) · Remote, India · GTM Automation Lead
   White-label PPC/SEO/AEO agency. Built multi-signal intent routing to identify peer agency partners in HubSpot.
2. Heurist AI (Oct 2024 – Nov 2025) · Remote, US · GTM Automation — Autopilot Agents
   Decentralized AI cloud. Engineered autopilot content agents with state machines and Slack human approval gates.
3. Sonic (sonic.ooo) (Jan 2024 – Sep 2024) · Remote · Founder-led GTM Automation
   Multi-channel inbound intent routing for investor briefings and developer support triage.
4. Paddleboat AI (May 2022 – Dec 2023) · Bengaluru, Hybrid · GTM Engineer — Outbound & Sales Enablement
   AI sales roleplay platform. Flagged SDR team hiring spikes and contributed to #1 Product Hunt launch.

===================================================================
SECTION 2: CASE STUDIES
===================================================================
`;

  for (const cs of caseStudies) {
    const slug = cs.data.slug || cs.id;
    body += `\n### ${cs.data.title}\nCompany: ${cs.data.company} | Role: ${cs.data.role} | Dates: ${cs.data.dates}\nURL: ${siteUrl}/work/${slug}\nSummary: ${cs.data.description}\n\n`;
  }

  body += `\n===================================================================\nSECTION 3: PRODUCTION WORKFLOWS\n===================================================================\n`;
  for (const wf of workflows) {
    const slug = wf.data.slug || wf.id;
    body += `\n### ${wf.data.title}\nStack: ${wf.data.tools.join(', ')} | Trigger: ${wf.data.trigger}\nURL: ${siteUrl}/workflows/${slug}\nSummary: ${wf.data.description}\n\n`;
  }

  body += `\n===================================================================\nSECTION 4: GLOSSARY OF DEFINITIONS\n===================================================================\n`;
  for (const item of glossary) {
    const slug = item.data.slug || item.id;
    body += `\n### ${item.data.title}\nDefinition: ${item.data.definition}\nURL: ${siteUrl}/glossary/${slug}\n\n`;
  }

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
