import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ? site.href.replace(/\/$/, '') : 'https://gtm-expert-tibin.vercel.app';

  const robots = `User-agent: *
Allow: /

# GEO Machine Documentation
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
