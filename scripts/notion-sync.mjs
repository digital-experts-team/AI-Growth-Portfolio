#!/usr/bin/env node
// Notion → site sync. Finds entries with Status = "Approved", validates them,
// converts them to Markdown in the right content folder, and sets Status = "Publishing".
// post-deploy.mjs later confirms each Publishing page is live and marks it "Live".
// Needs: NOTION_TOKEN (secret). Node 22+ (built-in fetch). No dependencies.
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, extname } from 'node:path';

const TOKEN = process.env.NOTION_TOKEN;
if (!TOKEN) { console.log('NOTION_TOKEN not set — skipping sync.'); process.exit(0); }
const SITE = (process.env.SITE_URL || 'https://tibinjacob.com').replace(/\/$/, '');
const DBS = {
  blog: '3e47f6baaf95815d8842daff3023852c',
  work: '3e47f6baaf95817ca4a2df293f942bf1',
  workflows: '3e47f6baaf95811990fbdb7521ee0988',
  glossary: '3e47f6baaf95815bab81da5f9bf12fe3',
  pages: '3e47f6baaf9581568c14fdc5664aa546',
};
const FOLDER = { blog: 'src/content/posts', work: 'src/content/caseStudies', workflows: 'src/content/workflows', glossary: 'src/content/glossary', pages: 'src/page-content' };
const CLUSTERS = ['RevOps', 'GTM Engineering', 'Signals & Enrichment', 'AI Agents', 'Demand / Agency', 'AI Search', 'Performance Marketing', 'Core'];
const today = new Date().toISOString().slice(0, 10);

async function notion(path, method = 'GET', body) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: { Authorization: `Bearer ${TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 || res.status >= 500) { await new Promise((r) => setTimeout(r, 1000 * (attempt + 1))); continue; }
    if (!res.ok) throw new Error(`Notion ${method} ${path} → ${res.status}: ${await res.text()}`);
    return res.json();
  }
  throw new Error(`Notion ${path} failed after retries`);
}
async function children(id) {
  let out = [], cursor;
  do {
    const r = await notion(`/blocks/${id}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`);
    out = out.concat(r.results); cursor = r.has_more ? r.next_cursor : null;
  } while (cursor);
  return out;
}
const prop = (p, k) => {
  const v = p[k]; if (!v) return undefined;
  switch (v.type) {
    case 'title': case 'rich_text': return v[v.type].map((x) => x.plain_text).join('') || undefined;
    case 'select': return v.select?.name;
    case 'multi_select': return v.multi_select.map((x) => x.name);
    case 'number': return v.number ?? undefined;
    case 'checkbox': return v.checkbox;
    case 'date': return v.date?.start;
    case 'url': return v.url || undefined;
    default: return undefined;
  }
};
const text = (rt) => rt.map((r) => {
  let t = r.plain_text;
  let link = r.href ? r.href.replace(/^https?:\/\/(www\.)?tibinjacob\.com/, '') || '/' : null;
  if (r.annotations?.code) t = '`' + t + '`';
  if (r.annotations?.bold && t.trim()) t = `**${t}**`;
  if (link) t = `[${t}](${link})`;
  return t;
}).join('');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

async function convert(pageId, slug, errors) {
  const blocks = await children(pageId);
  let answer, section = null, n = 0, img = 0;
  const body = [], steps = [], faq = [];
  for (const b of blocks) {
    const t = b.type, d = b[t];
    if (t === 'heading_2') {
      section = text(d.rich_text).trim(); n = 0;
      if (!['faq', 'steps'].includes(section.toLowerCase())) body.push(`\n## ${section}\n`);
      continue;
    }
    if (section?.toLowerCase() === 'faq' && t === 'toggle') {
      const kids = await children(b.id);
      faq.push({ q: text(d.rich_text).trim(), a: kids.map((k) => text(k[k.type].rich_text || [])).join(' ').trim() });
      continue;
    }
    if (section?.toLowerCase() === 'steps' && t === 'numbered_list_item') {
      const s = text(d.rich_text); const m = s.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      steps.push({ title: (m ? m[1] : s.slice(0, 60)).replace(/\.$/, ''), body: (m ? m[2] : s).trim() });
      continue;
    }
    if (t === 'callout' && !answer && d.icon?.emoji === '💡') { answer = text(d.rich_text).trim(); continue; }
    if (t !== 'numbered_list_item') n = 0;
    if (t === 'heading_3') body.push(`\n### ${text(d.rich_text)}\n`);
    else if (t === 'paragraph') {
      const s = text(d.rich_text);
      const loom = s.match(/^https:\/\/www\.loom\.com\/share\/([\w-]+)/);
      body.push(loom ? `\n<a class="loom-embed" href="${s}" data-loom-id="${loom[1]}">Watch the 2-minute walkthrough</a>\n` : `\n${s}\n`);
    }
    else if (t === 'bulleted_list_item') body.push(`- ${text(d.rich_text)}`);
    else if (t === 'numbered_list_item') body.push(`${++n}. ${text(d.rich_text)}`);
    else if (t === 'quote') body.push(`\n> ${text(d.rich_text)}\n`);
    else if (t === 'code') {
      const code = d.rich_text.map((x) => x.plain_text).join('');
      body.push(d.language === 'mermaid' ? `\n<pre class="mermaid">\n${esc(code)}\n</pre>\n` : `\n\`\`\`${d.language || 'text'}\n${code}\n\`\`\`\n`);
    } else if (t === 'image') {
      const url = d.type === 'file' ? d.file.url : d.external.url;
      const alt = text(d.caption || []).trim();
      if (!alt) { errors.push('Every image needs a caption (used as alt text).'); continue; }
      const ext = (extname(new URL(url).pathname) || '.png').toLowerCase();
      const out = `public/content-images/${slug}/${++img}${ext}`;
      mkdirSync(dirname(out), { recursive: true });
      const res = await fetch(url); // Notion file URLs expire ~1h, so download now
      if (!res.ok) { errors.push(`Image download failed (${res.status}).`); continue; }
      writeFileSync(out, Buffer.from(await res.arrayBuffer()));
      body.push(`\n![${alt.replace(/[\[\]]/g, '')}](/content-images/${slug}/${img}${ext})\n`);
    }
  }
  const md = body.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  return { answer, md, steps, faq };
}

const yaml = (obj) => '---\n' + Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && !v.length && false)).map(([k, v]) => {
  if (Array.isArray(v) && v.length && typeof v[0] === 'object') return `${k}:\n` + v.map((it) => Object.entries(it).map(([kk, vv], i) => `${i ? '    ' : '  - '}${kk}: ${JSON.stringify(vv)}`).join('\n')).join('\n');
  return `${k}: ${JSON.stringify(v)}`;
}).join('\n') + '\n---\n\n';

let changed = 0;
for (const [type, db] of Object.entries(DBS)) {
  const r = await notion(`/databases/${db}/query`, 'POST', { filter: { property: 'Status', select: { equals: 'Approved' } } });
  for (const page of r.results) {
    const p = page.properties, errors = [];
    const title = prop(p, 'H1') || prop(p, 'Title');
    const slugPath = prop(p, 'URL Slug') || '';
    const slug = slugPath.split('/').filter(Boolean).pop();
    const description = prop(p, 'Meta Description');
    if (!prop(p, 'Facts Verified vs Resume')) errors.push('Tick "Facts Verified vs Resume" before approving.');
    if (!slug) errors.push('URL Slug is empty.');
    if (!description) errors.push('Meta Description is empty.');
    else if (description.length > 160) errors.push(`Meta Description is ${description.length} characters (max 160).`);
    let parts = null;
    if (!errors.length) parts = await convert(page.id, slug, errors);
    if (errors.length) {
      await notion(`/pages/${page.id}`, 'PATCH', { properties: { Status: { select: { name: 'In Review' } }, 'Publish Error': { rich_text: [{ text: { content: errors.join(' ') } }] } } });
      console.log(`✗ ${title}: ${errors.join(' ')}`); continue;
    }
    const cluster = CLUSTERS.includes(prop(p, 'Cluster')) ? prop(p, 'Cluster') : 'Core';
    const fmBase = {
      title, description, metaTitle: prop(p, 'Meta Title'), slug, status: 'live',
      targetKeyword: prop(p, 'Target Keyword'), cluster, audience: prop(p, 'Audience') || [],
      proofLink: prop(p, 'Proof Link'), publishedDate: prop(p, 'Published Date') || today, updatedDate: today,
      faq: parts.faq.length ? parts.faq : undefined,
    };
    const answer = parts.answer ? `> **Short answer:** ${parts.answer}\n\n` : '';
    let file, content;
    if (type === 'blog') { fmBase.type = (prop(p, 'Type') || 'Spoke').toLowerCase(); file = `${FOLDER.blog}/${slug}.md`; content = yaml(fmBase) + answer + parts.md; }
    else if (type === 'workflows') { Object.assign(fmBase, { tools: prop(p, 'Tools') || [], trigger: prop(p, 'Trigger') || 'Manual', steps: parts.steps }); file = `${FOLDER.workflows}/${slug}.md`; content = yaml(fmBase) + answer + parts.md; }
    else if (type === 'glossary') { Object.assign(fmBase, { definition: prop(p, 'Definition (40–60 words)') || parts.answer || description, related: [] }); file = `${FOLDER.glossary}/${slug}.md`; content = yaml(fmBase) + parts.md; }
    else if (type === 'work') { const [role, dates] = (prop(p, 'Role & Dates') || ' · ').split(' · '); Object.assign(fmBase, { company: prop(p, 'Company') || title, role: role || '', dates: dates || '' }); file = `${FOLDER.work}/${slug}.md`; content = yaml(fmBase) + answer + parts.md; }
    else { file = `${FOLDER.pages}/${slug}.md`; content = answer + parts.md; if (!existsSync(`src/pages/${slug}.astro`)) console.log(`! ${slug}: page-content written, but src/pages/${slug}.astro route does not exist yet.`); }
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 16);
    if (hash === prop(p, 'Content Hash') && existsSync(file)) { console.log(`= ${title}: unchanged`); continue; }
    mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, content);
    await notion(`/pages/${page.id}`, 'PATCH', { properties: {
      Status: { select: { name: 'Publishing' } }, 'Content Hash': { rich_text: [{ text: { content: hash } }] },
      'Last Synced': { date: { start: today } }, 'Publish Error': { rich_text: [] },
    } });
    console.log(`✓ ${title} → ${file}`); changed++;
  }
}
console.log(`${changed} page(s) synced.`);
