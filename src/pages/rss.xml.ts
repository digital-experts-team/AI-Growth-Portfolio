import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { marked } from 'marked';
import fs from 'node:fs';
import path from 'node:path';

marked.setOptions({
  gfm: true,
  breaks: true,
});

function getRawBody(entry: any, dir: string): string {
  if (entry.body && typeof entry.body === 'string' && entry.body.trim().length > 0) {
    return entry.body.trim();
  }
  const possiblePaths = [
    entry.filePath,
    path.join(process.cwd(), dir, `${entry.id}.md`),
    path.join(process.cwd(), dir, `${entry.id}.mdx`),
    path.join(process.cwd(), dir, `${entry.data?.slug || entry.id}.md`),
    path.join(process.cwd(), dir, `${entry.data?.slug || entry.id}.mdx`),
  ].filter(Boolean);

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf-8');
      const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
      return match ? match[1].trim() : raw.trim();
    }
  }
  return '';
}

function cleanHtml(html: string): string {
  return html
    .replace(/src="\/images\//g, 'src="https://tibinjacob.com/images/')
    .replace(/src='\/images\//g, "src='https://tibinjacob.com/images/")
    .replace(/href="\/([a-zA-Z0-9_\-\/]+)"/g, 'href="https://tibinjacob.com/$1"');
}

function renderPostContent(post: any): string {
  let md = '';
  if (post.data.shortAnswer) {
    md += `> **Summary / Key Takeaway:** ${post.data.shortAnswer}\n\n`;
  }
  const rawBody = getRawBody(post, 'src/content/posts');
  md += rawBody;

  if (post.data.faq && post.data.faq.length > 0) {
    md += '\n\n## Frequently Asked Questions\n\n';
    for (const item of post.data.faq) {
      md += `### ${item.q}\n\n${item.a}\n\n`;
    }
  }

  if (post.data.proofLink) {
    md += `\n\n---\n*Production architecture reference: [View Case Study or Workflow](https://tibinjacob.com${post.data.proofLink})*\n`;
  }

  return cleanHtml(marked.parse(md) as string);
}

function renderWorkflowContent(wf: any): string {
  let md = '';
  if (wf.data.description) {
    md += `> **System Blueprint:** ${wf.data.description}\n\n`;
  }
  if (wf.data.trigger) {
    md += `**Trigger:** \`${wf.data.trigger}\`\n\n`;
  }
  if (wf.data.tools && wf.data.tools.length > 0) {
    md += `**Stack & Tools:** ${wf.data.tools.join(', ')}\n\n`;
  }

  const rawBody = getRawBody(wf, 'src/content/workflows');
  if (rawBody) {
    md += rawBody + '\n\n';
  }

  if (wf.data.steps && wf.data.steps.length > 0 && (!rawBody || !rawBody.includes(wf.data.steps[0].title))) {
    md += '## Execution Pipeline & Architecture Steps\n\n';
    wf.data.steps.forEach((step: { title: string; body: string }, i: number) => {
      md += `${i + 1}. **${step.title}**\n   ${step.body}\n\n`;
    });
  }

  if (wf.data.faq && wf.data.faq.length > 0) {
    md += '## Frequently Asked Questions\n\n';
    for (const item of wf.data.faq) {
      md += `### ${item.q}\n\n${item.a}\n\n`;
    }
  }

  return cleanHtml(marked.parse(md) as string);
}

function renderCaseStudyContent(cs: any): string {
  let md = '';
  if (cs.data.description) {
    md += `> **Case Study Overview:** ${cs.data.description}\n\n`;
  }
  if (cs.data.company || cs.data.role) {
    md += `**Company:** ${cs.data.company || ''} | **Role:** ${cs.data.role || ''} | **Timeline:** ${cs.data.dates || ''}\n\n`;
  }

  const rawBody = getRawBody(cs, 'src/content/caseStudies');
  if (rawBody) {
    md += rawBody + '\n\n';
  }

  if (cs.data.faq && cs.data.faq.length > 0) {
    md += '## Frequently Asked Questions\n\n';
    for (const item of cs.data.faq) {
      md += `### ${item.q}\n\n${item.a}\n\n`;
    }
  }

  return cleanHtml(marked.parse(md) as string);
}

export const GET: APIRoute = async (context) => {
  // Only include items with status === 'live'
  const posts = await getCollection('posts', ({ data }) => data.status === 'live');
  const workflows = await getCollection('workflows', ({ data }) => data.status === 'live');
  const caseStudies = await getCollection('caseStudies', ({ data }) => data.status === 'live');

  const site = 'https://tibinjacob.com';

  const postItems = posts.map((post) => {
    const slug = post.data.slug || post.id;
    const link = `${site}/blog/${slug}`;
    const pubDate = new Date(post.data.updatedDate || post.data.publishedDate);
    const content = renderPostContent(post);
    const categories = Array.from(new Set([
      post.data.cluster,
      post.data.type,
      post.data.targetKeyword,
      ...(post.data.audience || [])
    ].filter((c): c is string => typeof c === 'string' && c.trim().length > 0))).slice(0, 4);

    return {
      title: post.data.title,
      link,
      pubDate,
      description: post.data.description,
      content,
      categories,
    };
  });

  const workflowItems = workflows.map((wf) => {
    const slug = wf.data.slug || wf.id;
    const link = `${site}/workflows/${slug}`;
    const pubDate = new Date(wf.data.updatedDate || wf.data.publishedDate);
    const content = renderWorkflowContent(wf);
    const categories = Array.from(new Set([
      wf.data.cluster,
      wf.data.targetKeyword,
      ...(wf.data.tools || []),
      ...(wf.data.audience || [])
    ].filter((c): c is string => typeof c === 'string' && c.trim().length > 0))).slice(0, 4);

    return {
      title: wf.data.title,
      link,
      pubDate,
      description: wf.data.description,
      content,
      categories,
    };
  });

  const caseStudyItems = caseStudies.map((cs) => {
    const slug = cs.data.slug || cs.id;
    const link = `${site}/work/${slug}`;
    const pubDate = new Date(cs.data.updatedDate || cs.data.publishedDate);
    const content = renderCaseStudyContent(cs);
    const categories = Array.from(new Set([
      cs.data.cluster,
      cs.data.tag ? cs.data.tag.replace(/^#/, '') : '',
      cs.data.targetKeyword,
      cs.data.company,
      ...(cs.data.audience || [])
    ].filter((c): c is string => typeof c === 'string' && c.trim().length > 0))).slice(0, 4);

    return {
      title: cs.data.title,
      link,
      pubDate,
      description: cs.data.description,
      content,
      categories,
    };
  });

  const allItems = [...postItems, ...workflowItems, ...caseStudyItems];

  // Sort newest first
  allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Tibin Jacob — AI Growth Expert for B2B Companies',
    description: 'Production architectures, signal-based outbound workflows, and revenue engineering articles by Tibin Jacob.',
    site,
    items: allItems,
    customData: `<language>en-us</language>`,
  });
};

