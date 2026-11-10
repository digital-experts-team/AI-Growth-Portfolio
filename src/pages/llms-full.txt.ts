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
- Mavlers (May 2026 – Sep 2026) · GTM Automation Lead
- Heurist AI (Jun 2024 – Oct 2025) · GTM Automations and Marketing Ops
- Sonic (Sep 2023 – Jul 2024) · Product Growth - GTM
- PaddleBoat (Oct 2022 – May 2023) · GTM Engineer
- Foolproof (Oct 2020 – Jan 2021) · Technical Consultant
- Crosspay (Jun 2019 – Oct 2020) · Product Marketing Growth
- Zoople Technologies (Dec 2018 – Aug 2019) · UX/UI Developer

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
