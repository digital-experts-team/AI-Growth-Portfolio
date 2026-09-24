#!/usr/bin/env node
// Post-deploy: confirm "Publishing" pages are live, mark them "Live" in Notion,
// ping IndexNow, draft LinkedIn posts, and publish approved LinkedIn posts.
// Secrets: NOTION_TOKEN (required); LINKEDIN_ACCESS_TOKEN + LINKEDIN_AUTHOR_URN (optional, to post);
// ANTHROPIC_API_KEY or XAI_API_KEY (optional, to draft posts when LinkedIn Draft is empty); INDEXNOW_KEY (optional).
const TOKEN = process.env.NOTION_TOKEN;
if (!TOKEN) { console.log('NOTION_TOKEN not set — skipping.'); process.exit(0); }
const SITE = (process.env.SITE_URL || 'https://tibinjacob.com').replace(/\/$/, '');
const REPO = process.env.GITHUB_REPOSITORY || 'digital-experts-team/AI-Growth-Portfolio';
const SHA = process.env.GITHUB_SHA || '';
const DBS = {
  blog: ['3e47f6baaf95815d8842daff3023852c', '/blog/', 'Blog Articles'],
  work: ['3e47f6baaf95817ca4a2df293f942bf1', '/work/', 'Case Studies'],
  workflows: ['3e47f6baaf95811990fbdb7521ee0988', '/workflows/', 'Workflows'],
  glossary: ['3e47f6baaf95815bab81da5f9bf12fe3', '/glossary/', 'Glossary'],
  pages: ['3e47f6baaf9581568c14fdc5664aa546', '/', 'Site Pages'],
};
const LOG_DB = '3e47f6baaf9581bc8071f0abccd98252';
const today = new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function notion(path, method = 'GET', body) {
  for (let a = 0; a < 5; a++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, { method, headers: { Authorization: `Bearer ${TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    if (res.status === 429 || res.status >= 500) { await sleep(1000 * (a + 1)); continue; }
    if (!res.ok) throw new Error(`Notion ${path} → ${res.status}: ${await res.text()}`);
    return res.json();
  }
}
const prop = (p, k) => { const v = p[k]; if (!v) return; if (v.type === 'title' || v.type === 'rich_text') return v[v.type].map((x) => x.plain_text).join('') || undefined; if (v.type === 'select') return v.select?.name; if (v.type === 'checkbox') return v.checkbox; if (v.type === 'url') return v.url || undefined; if (v.type === 'date') return v.date?.start; };
const rt = (s) => ({ rich_text: [{ text: { content: String(s).slice(0, 1990) } }] });
const query = (db, filter) => notion(`/databases/${db}/query`, 'POST', { filter });

async function isLive(url, title) {
  for (let i = 0; i < 4; i++) {
    try { const r = await fetch(url, { redirect: 'follow' }); if (r.ok && (await r.text()).includes(title.slice(0, 40).replace(/&/g, '&amp;'))) return true; } catch {}
    await sleep(30000);
  }
  return false;
}
function postText(draft) {
  if (!draft) return null;
  const m = draft.split(/\n\s*TEXT POST[^\n]*\n/i);
  return (m.length > 1 ? m[1] : /CAROUSEL/i.test(draft) ? null : draft).trim() || null;
}
async function draftWithLLM(title, url, pageText) {
  const system = 'You write LinkedIn posts for Tibin Jacob, a GTM Engineer (AI search, B2B performance marketing). Use ONLY facts in the article. No invented numbers, clients or results. No links in the post. Max 3 hashtags. No engagement bait. Output two sections exactly: "CAROUSEL (7 slides)" as a numbered list whose last slide prints the URL, then "TEXT POST" (under 180 words, plain first-person story + one lesson + one question).';
  const user = `Article title: ${title}\nURL: ${url}\n\nArticle:\n${pageText.slice(0, 12000)}`;
  if (process.env.ANTHROPIC_API_KEY) {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' }, body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6', max_tokens: 1200, system, messages: [{ role: 'user', content: user }] }) });
    if (r.ok) return (await r.json()).content.map((c) => c.text || '').join('');
  } else if (process.env.XAI_API_KEY) {
    const r = await fetch('https://api.x.ai/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ model: process.env.XAI_MODEL || 'grok-4', messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }) });
    if (r.ok) return (await r.json()).choices[0].message.content;
  }
  return null;
}
async function postToLinkedIn(text) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN, author = process.env.LINKEDIN_AUTHOR_URN;
  if (!token || !author) return { skipped: 'LINKEDIN_ACCESS_TOKEN / LINKEDIN_AUTHOR_URN not set' };
  const r = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'LinkedIn-Version': process.env.LINKEDIN_VERSION || '202608', 'X-Restli-Protocol-Version': '2.0.0', 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, commentary: text, visibility: 'PUBLIC', distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] }, lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false }),
  });
  if (r.status !== 201) return { error: `LinkedIn ${r.status}: ${(await r.text()).slice(0, 300)}` };
  const urn = r.headers.get('x-restli-id');
  return { url: urn ? `https://www.linkedin.com/feed/update/${urn}/` : 'posted' };
}
async function pageText(id) {
  const r = await notion(`/blocks/${id}/children?page_size=100`);
  return r.results.map((b) => (b[b.type]?.rich_text || []).map((x) => x.plain_text).join('')).filter(Boolean).join('\n');
}
async function logPost(type, pageId, entry, url) {
  const [, , relName] = DBS[type];
  await notion('/pages', 'POST', { parent: { database_id: LOG_DB }, properties: {
    Entry: { title: [{ text: { content: entry } }] }, Type: { select: { name: 'LinkedIn Post' } }, Platform: rt('LinkedIn'),
    URL: { url }, Date: { date: { start: today } }, Status: { select: { name: 'Live' } }, 'Link Type': { select: { name: 'No link' } },
    [relName]: { relation: [{ id: pageId }] },
  } });
}
async function publishLinkedIn(type, page) {
  const p = page.properties, title = prop(p, 'H1') || prop(p, 'Title');
  const text = postText(prop(p, 'LinkedIn Draft'));
  if (!text) return console.log(`  LinkedIn: no TEXT POST in draft for "${title}"`);
  const res = await postToLinkedIn(text);
  if (res.skipped) return console.log(`  LinkedIn: ${res.skipped}`);
  if (res.error) { await notion(`/pages/${page.id}`, 'PATCH', { properties: { 'Publish Error': rt(res.error) } }); return console.log(`  LinkedIn error: ${res.error}`); }
  await notion(`/pages/${page.id}`, 'PATCH', { properties: { 'LinkedIn Posted': { checkbox: true }, 'LinkedIn Post URL': { url: res.url } } });
  await logPost(type, page.id, `LinkedIn post: ${title}`, res.url);
  console.log(`  LinkedIn posted: ${res.url}`);
}

// 1) Publishing → Live
for (const [type, [db, prefix]] of Object.entries(DBS)) {
  const { results } = await query(db, { property: 'Status', select: { equals: 'Publishing' } });
  for (const page of results) {
    const p = page.properties, title = prop(p, 'H1') || prop(p, 'Title');
    const slug = (prop(p, 'URL Slug') || '').split('/').filter(Boolean).pop();
    const url = `${SITE}${prefix}${slug}`;
    if (!(await isLive(url, title))) { console.log(`… ${url} not live yet`); continue; }
    await notion(`/pages/${page.id}`, 'PATCH', { properties: {
      Status: { select: { name: 'Live' } }, 'Live URL': { url }, 'Published Date': { date: { start: prop(p, 'Published Date') || today } },
      ...(SHA ? { 'Commit URL': { url: `https://github.com/${REPO}/commit/${SHA}` } } : {}), 'Publish Error': { rich_text: [] },
    } });
    console.log(`✓ Live: ${url}`);
    if (process.env.INDEXNOW_KEY) await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${process.env.INDEXNOW_KEY}`).catch(() => {});
    const mode = prop(p, 'LinkedIn Mode') || 'Review';
    if (mode === 'Skip') continue;
    if (!prop(p, 'LinkedIn Draft')) {
      const draft = await draftWithLLM(title, url, await pageText(page.id));
      if (draft) { await notion(`/pages/${page.id}`, 'PATCH', { properties: { 'LinkedIn Draft': rt(draft) } }); page.properties['LinkedIn Draft'] = { type: 'rich_text', rich_text: [{ plain_text: draft }] }; console.log('  LinkedIn draft written'); }
    }
    if (mode === 'Auto' && !prop(p, 'LinkedIn Posted')) await publishLinkedIn(type, page);
  }
}
// 2) Review mode: post anything Live + LinkedIn Approved + not yet posted
for (const [type, [db]] of Object.entries(DBS)) {
  const { results } = await query(db, { and: [
    { property: 'Status', select: { equals: 'Live' } },
    { property: 'LinkedIn Approved', checkbox: { equals: true } },
    { property: 'LinkedIn Posted', checkbox: { equals: false } },
  ] });
  for (const page of results) await publishLinkedIn(type, page);
}
