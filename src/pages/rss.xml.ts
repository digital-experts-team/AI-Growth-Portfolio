import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const caseStudies = await getCollection('caseStudies');
  const workflows = await getCollection('workflows', ({ data }) => data.status === 'live');

  const items = [
    ...caseStudies.map((cs) => ({
      title: cs.data.title,
      pubDate: cs.data.publishedDate,
      description: cs.data.description,
      link: `/work/${cs.data.slug || cs.id}`,
    })),
    ...workflows.map((wf) => ({
      title: wf.data.title,
      pubDate: wf.data.publishedDate,
      description: wf.data.description,
      link: `/workflows/${wf.data.slug || wf.id}`,
    })),
  ];

  return rss({
    title: 'Tibin Jacob — GTM Engineering & RevOps Feed',
    description: 'Production architectures, signal-based outbound workflows, and revenue engineering articles by Tibin Jacob.',
    site: context.site || 'https://tibinjacob.com',
    items,
    customData: `<language>en-us</language>`,
  });
};
