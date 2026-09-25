#!/usr/bin/env node
// post-deploy.mjs v2 — full automation:
// 1. LinkedIn Ready → Live (URL check, IndexNow, Notion update, Gemini draft, → LinkedIn Scheduled)
// 2. LinkedIn Scheduled → post at IST 19-21 window → LinkedIn Posted
// 3. First comment with tracked URL (30s after post)
// 4. Claude/Grok draft when LinkedIn Draft is empty
// 5. Scheduled posting: only during IST 19:00-21:00 (US 08:30-10:30 ET)
// 6. Internal link injector: adds cross-links to related pages after publish
// 7. DM alert: writes "JEV"-style keyword to Notion comment for manual DM tracking
// 8. Distribution Log entry with full UTM URL
//
// Secrets: NOTION_TOKEN (required)
// Optional: COMPOSIO_API_KEY + COMPOSIO_LINKEDIN_ACCOUNT (preferred for LinkedIn)
//           LINKEDIN_ACCESS_TOKEN + LINKEDIN_AUTHOR_URN (fallback direct API)
//           GEMINI_API_KEY (post drafting, primary) or XAI_API_KEY (fallback)
//           INDEXNOW_KEY
//           FORCE_POST=true (override time window for testing)

const TOKEN = process.env.NOTION_TOKEN;
if (!TOKEN) { console.log('NOTION_TOKEN not set — skipping.'); process.exit(0); }

const SITE = (process.env.SITE_URL || 'https://tibinjacob.com').replace(/\/$/, '');
const REPO = process.env.GITHUB_REPOSITORY || 'digital-experts-team/AI-Growth-Portfolio';
const SHA  = process.env.GITHUB_SHA || '';
const TODAY = new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const DBS = {
  blog:      ['3e47f6baaf95815d8842daff3023852c', '/blog/',       'Blog Articles'],
  work:      ['3e47f6baaf95817ca4a2df293f942bf1', '/work/',       'Case Studies'],
  workflows: ['3e47f6baaf95811990fbdb7521ee0988', '/workflows/',  'Workflows'],
  glossary:  ['3e47f6baaf95815bab81da5f9bf12fe3', '/glossary/',   'Glossary'],
  pages:     ['3e47f6baaf9581568c14fdc5664aa546', '/',            'Site Pages'],
};
const LOG_DB = '3e47f6baaf9581bc8071f0abccd98252';

// ─── Notion helpers ──────────────────────────────────────────────────────────
async function notion(path, method = 'GET', body) {
  for (let a = 0; a < 5; a++) {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: { Authorization: `Bearer ${TOKEN}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 429 || res.status >= 500) { await sleep(1000 * (a + 1)); continue; }
    if (!res.ok) throw new Error(`Notion ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res.json();
  }
  throw new Error(`Notion ${path} failed after retries`);
}
const prop = (p, k) => {
  const v = p[k]; if (!v) return;
  if (v.type === 'title' || v.type === 'rich_text') return v[v.type].map(x => x.plain_text).join('') || undefined;
  if (v.type === 'select') return v.select?.name;
  if (v.type === 'checkbox') return v.checkbox;
  if (v.type === 'url') return v.url || undefined;
  if (v.type === 'date') return v.date?.start;
};
const rt  = s  => ({ rich_text: [{ text: { content: String(s).slice(0, 1990) } }] });
const uProp = u => ({ url: u });

async function query(db, filter) {
  return notion(`/databases/${db}/query`, 'POST', { filter });
}
async function patch(id, props) {
  return notion(`/pages/${id}`, 'PATCH', { properties: props });
}
async function pageBlocks(id) {
  const r = await notion(`/blocks/${id}/children?page_size=100`);
  return r.results.map(b => (b[b.type]?.rich_text || []).map(x => x.plain_text).join('')).filter(Boolean).join('\n');
}
async function addComment(pid, text) {
  await notion('/comments', 'POST', { parent: { page_id: pid }, rich_text: [{ text: { content: text.slice(0, 1990) } }] });
}

// ─── Timing: only post during IST 19:00–21:00 (US ET 08:30–10:30) ───────────
function isPostingWindow() {
  if (process.env.FORCE_POST === 'true') return true;
  const now = new Date();
  // IST = UTC+5:30
  const istHour = (now.getUTCHours() + 5 + (now.getUTCMinutes() >= 30 ? 1 : 0)) % 24;
  return istHour >= 19 && istHour < 21;
}

// ─── Live check ──────────────────────────────────────────────────────────────
async function isLive(url, title) {
  for (let i = 0; i < 4; i++) {
    try {
      const r = await fetch(url, { redirect: 'follow' });
      if (r.ok && (await r.text()).includes(title.slice(0, 40).replace(/&/g, '&amp;'))) return true;
    } catch {}
    await sleep(30000);
  }
  return false;
}

// ─── LinkedIn via Composio (preferred — no token expiry) ─────────────────────
async function postViaComposio(text) {
  const key = process.env.COMPOSIO_API_KEY;
  const acct = process.env.COMPOSIO_LINKEDIN_ACCOUNT || 'linkedin_benj-nimble';
  if (!key) return null;
  const r = await fetch('https://backend.composio.dev/api/v1/actions/LINKEDIN_CREATE_LINKED_IN_POST/execute', {
    method: 'POST',
    headers: { 'x-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      connectedAccountId: acct,
      input: { text, visibility: 'PUBLIC' },
    }),
  });
  if (!r.ok) return { error: `Composio ${r.status}: ${(await r.text()).slice(0, 200)}` };
  const d = await r.json();
  const postId = d?.data?.id || d?.response?.id;
  return { url: postId ? `https://www.linkedin.com/feed/update/${postId}/` : 'posted-via-composio' };
}

// ─── LinkedIn via direct API (fallback) ──────────────────────────────────────
async function postDirectLinkedIn(text) {
  const token  = process.env.LINKEDIN_ACCESS_TOKEN;
  const author = process.env.LINKEDIN_AUTHOR_URN;
  if (!token || !author) return { skipped: 'No LinkedIn credentials' };
  const r = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'LinkedIn-Version': process.env.LINKEDIN_VERSION || '202608',
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author, commentary: text, visibility: 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
      lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false,
    }),
  });
  if (r.status !== 201) return { error: `LinkedIn direct ${r.status}: ${(await r.text()).slice(0, 200)}` };
  const urn = r.headers.get('x-restli-id');
  return { url: urn ? `https://www.linkedin.com/feed/update/${urn}/` : 'posted' };
}

async function postToLinkedIn(text) {
  // Try Composio first, fall back to direct API
  const c = await postViaComposio(text);
  if (c && !c.error) return c;
  if (c?.error) console.log(`  Composio: ${c.error} — trying direct API`);
  return postDirectLinkedIn(text);
}

// ─── Post first comment with UTM link ────────────────────────────────────────
async function postFirstComment(postUrn, commentText) {
  // Extract the URN from the post URL
  const urn = postUrn.replace('https://www.linkedin.com/feed/update/', '').replace('/', '');
  if (!urn || urn === 'posted-via-composio' || urn === 'posted') {
    console.log('  First comment: post URN not available, skipping auto-comment');
    return null;
  }
  await sleep(30000); // 30s delay so LinkedIn registers the post first

  // Try Composio comment
  const key = process.env.COMPOSIO_API_KEY;
  if (key) {
    const r = await fetch('https://backend.composio.dev/api/v1/actions/LINKEDIN_CREATE_COMMENT/execute', {
      method: 'POST',
      headers: { 'x-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        connectedAccountId: process.env.COMPOSIO_LINKEDIN_ACCOUNT || 'linkedin_benj-nimble',
        input: { urnId: urn, message: commentText },
      }),
    });
    if (r.ok) { console.log('  First comment posted via Composio'); return 'ok'; }
    console.log(`  Composio comment failed: ${r.status} — manual comment needed`);
  }

  // Fall back: direct LinkedIn comments API
  const token  = process.env.LINKEDIN_ACCESS_TOKEN;
  const author = process.env.LINKEDIN_AUTHOR_URN;
  if (token && author && urn.includes('activity')) {
    const r2 = await fetch(`https://api.linkedin.com/v2/socialActions/${encodeURIComponent(urn)}/comments`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Restli-Protocol-Version': '2.0.0' },
      body: JSON.stringify({ actor: author, message: { text: commentText } }),
    });
    if (r2.ok) { console.log('  First comment posted via direct API'); return 'ok'; }
    console.log(`  First comment direct API: ${r2.status}`);
  }
  return null;
}

// ─── LLM draft ───────────────────────────────────────────────────────────────
async function draftWithLLM(title, url, pageText) {
  const utmUrl = `${url}?utm_source=linkedin&utm_medium=social&utm_campaign=${url.split('/').pop()}`;
  const system = `You write LinkedIn posts for Tibin Jacob, GTM Engineer and AI growth expert for B2B.
Rules: ONLY facts in the article. No invented numbers, clients or results. No links in the post body.
Max 3 hashtags (#GTMEngineering #RevOps #AIAgents or similar). No engagement bait like "comment YES".
No "🚀 Excited to share". Write in first person, plain language, short paragraphs.
Output EXACTLY two labeled sections:
CAROUSEL (7 slides)
[numbered slide list, last slide: "Full article: ${url.replace(SITE, 'tibinjacob.com')}"]

TEXT POST
[under 200 words. Hook line. 3-4 insight lines. One question. No link.]`;
  const user = `Article title: ${title}\nURL: ${utmUrl}\n\nArticle text:\n${pageText.slice(0, 10000)}`;

  if (process.env.GEMINI_API_KEY) {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: system + '\n\n' + user }] }], generationConfig: { maxOutputTokens: 1200, temperature: 0.7 } }) }
    );
    if (r.ok) {
      const d = await r.json();
      return d.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || null;
    }
    console.log('  Gemini draft failed:', (await r.text().catch(() => r.status)));
  }
  if (process.env.XAI_API_KEY) {
    const r = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.XAI_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'grok-4', messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
    });
    if (r.ok) return (await r.json()).choices[0].message.content;
  }
  return null;
}

// ─── Extract TEXT POST section from LinkedIn Draft ────────────────────────────
function extractTextPost(draft) {
  if (!draft) return null;
  const m = draft.split(/\n\s*TEXT POST[^\n]*\n/i);
  const text = (m.length > 1 ? m[1] : /CAROUSEL/i.test(draft) ? null : draft);
  return text ? text.trim() : null;
}

// ─── Internal link injector ───────────────────────────────────────────────────
async function injectInternalLinks(newSlug, newTitle, newUrl, internalLinksField) {
  if (!internalLinksField) return;
  // Parse "Internal Links" field: paths separated by ·
  const targets = internalLinksField.split('·').map(s => s.trim()).filter(s => s.startsWith('/'));

  for (const targetPath of targets.slice(0, 4)) { // max 4 updates per publish
    // Find the page in Notion by slug
    for (const [, [db]] of Object.entries(DBS)) {
      const { results } = await query(db, { property: 'URL Slug', rich_text: { equals: targetPath } });
      if (!results.length) continue;
      const targetPage = results[0];
      const currentNotes = prop(targetPage.properties, 'Notes') || '';
      if (currentNotes.includes(newSlug)) continue; // already noted
      const note = `\n[AUTO] ${TODAY}: Add link to ${newTitle} (${newUrl}) — see Internal Links field.`;
      await patch(targetPage.id, { Notes: rt((currentNotes + note).slice(0, 1990)) });
      await addComment(targetPage.id,
        `🔗 New related page live: [${newTitle}](${newUrl})\nConsider adding a link to this from the relevant section of this page.`
      );
      console.log(`  Internal link alert added to ${targetPath}`);
    }
  }
}

// ─── Log to Distribution & Backlinks Log ─────────────────────────────────────
async function logDist(type, pageId, entry, postUrl, commentUrl, utmUrl) {
  const [, , relName] = DBS[type];
  await notion('/pages', 'POST', { parent: { database_id: LOG_DB }, properties: {
    Entry:        { title: [{ text: { content: entry.slice(0, 1990) } }] },
    Type:         { select: { name: 'LinkedIn Post' } },
    Platform:     rt('LinkedIn'),
    URL:          uProp(postUrl),
    Date:         { date: { start: TODAY } },
    Status:       { select: { name: 'Live' } },
    'Link Type':  { select: { name: 'No link' } },
    Notes:        rt(`First comment URL: ${utmUrl}${commentUrl ? ` | Comment post: ${commentUrl}` : ' | Manual comment needed'}`),
    [relName]:    { relation: [{ id: pageId }] },
  }});
}

// ─── Keyword DM alert (writes Notion comment for manual DM sending) ───────────
async function dmAlert(pageId, slug, triggerKeyword) {
  const dmTemplate =
    `Here's the article: ${SITE}${slug.startsWith('/') ? slug : '/'+slug}?utm_source=linkedin&utm_medium=dm&utm_campaign=${slug.split('/').pop()}` +
    `\n\nComment what you're most interested in and I'll send the relevant section.`;
  await addComment(pageId,
    `📬 DM ALERT: When someone comments "${triggerKeyword}" on the LinkedIn post:\n\nSend them:\n${dmTemplate}\n\n(Manual send — LinkedIn API does not support DMs)`
  );
}

// ─── Main LinkedIn publish ────────────────────────────────────────────────────
async function publishLinkedIn(type, page, liveUrl) {
  const p = page.properties;
  const title = prop(p, 'H1') || prop(p, 'Title');
  const slug  = prop(p, 'URL Slug') || '';
  const draft = prop(p, 'LinkedIn Draft');
  const firstCommentText = prop(p, 'LinkedIn First Comment') ||
    `${liveUrl}?utm_source=linkedin&utm_medium=social&utm_campaign=${slug.split('/').pop()}`;

  // Check timing window
  if (!isPostingWindow()) {
    console.log(`  LinkedIn: outside posting window — will retry next run (FORCE_POST=true to override)`);
    return;
  }

  if (!draft) {
    console.log(`  LinkedIn: drafting with LLM for "${title}"`);
    const text = await draftWithLLM(title, liveUrl, await pageBlocks(page.id));
    if (text) {
      await patch(page.id, { 'LinkedIn Draft': rt(text) });
      page.properties['LinkedIn Draft'] = { type: 'rich_text', rich_text: [{ plain_text: text }] };
    }
  }

  const postText = extractTextPost(prop(page.properties, 'LinkedIn Draft'));
  if (!postText) { console.log(`  LinkedIn: no TEXT POST section found`); return; }

  // Post the text
  const res = await postToLinkedIn(postText);
  if (res.skipped) { console.log(`  LinkedIn: ${res.skipped}`); return; }
  if (res.error)   { await patch(page.id, { 'Publish Error': rt(res.error) }); console.log(`  LinkedIn error: ${res.error}`); return; }

  console.log(`  LinkedIn posted: ${res.url}`);

  // Post first comment (30s delay built in)
  const utmUrl = `${liveUrl}?utm_source=linkedin&utm_medium=social&utm_campaign=${slug.split('/').pop()}`;
  const commentResult = await postFirstComment(res.url, firstCommentText || utmUrl);

  // Update Notion
  await patch(page.id, { 'LinkedIn Posted': { checkbox: true }, 'LinkedIn Post URL': uProp(res.url), Status: { select: { name: 'Live' } } });

  // Log to Distribution Log
  await logDist(type, page.id, `LinkedIn: ${title}`, res.url, commentResult, utmUrl);

  // DM alert comment (for lead magnet posts with a trigger keyword)
  const notes = prop(p, 'Notes') || '';
  const kwMatch = notes.match(/comment\s+"([A-Z]+)"/i);
  if (kwMatch) await dmAlert(page.id, slug, kwMatch[1]);

  // Inject internal link alerts
  const iLinks = prop(p, 'Internal Links');
  if (iLinks) await injectInternalLinks(slug, title, liveUrl, iLinks);

  console.log(`  ✓ Full LinkedIn automation complete for "${title}"`);
}

// ─── STEP 1: Publishing → Live ───────────────────────────────────────────────
for (const [type, [db, prefix]] of Object.entries(DBS)) {
  const { results } = await query(db, { property: 'Status', select: { equals: 'LinkedIn Ready' } });
  for (const page of results) {
    const p = page.properties;
    const title = prop(p, 'H1') || prop(p, 'Title');
    const slug  = (prop(p, 'URL Slug') || '').split('/').filter(Boolean).pop();
    const liveUrl = `${SITE}${prefix}${slug}`;

    if (!(await isLive(liveUrl, title))) { console.log(`… ${liveUrl} not live yet`); continue; }

    await patch(page.id, {
      Status:           { select: { name: 'Live' } },
      'Live URL':       uProp(liveUrl),
      'Published Date': { date: { start: prop(p, 'Published Date') || TODAY } },
      'Last Synced':    { date: { start: TODAY } },
      ...(SHA ? { 'Commit URL': uProp(`https://github.com/${REPO}/commit/${SHA}`) } : {}),
      'Publish Error':  { rich_text: [] },
    });
    console.log(`✓ Live: ${liveUrl}`);

    if (process.env.INDEXNOW_KEY) {
      await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(liveUrl)}&key=${process.env.INDEXNOW_KEY}`).catch(() => {});
      console.log('  IndexNow pinged');
    }

    const mode = prop(p, 'LinkedIn Mode') || 'Review';
    if (mode === 'Skip') {
      console.log(`  LinkedIn: Skip mode — not scheduling`);
      continue;
    }

    // Draft the LinkedIn post now that we have the live URL
    let draft = prop(p, 'LinkedIn Draft');
    if (!draft) {
      console.log(`  Gemini drafting LinkedIn post for "${title}"...`);
      draft = await draftWithLLM(title, liveUrl, await pageBlocks(page.id));
      if (draft) {
        await patch(page.id, { 'LinkedIn Draft': rt(draft) });
        console.log(`  LinkedIn draft written by Gemini`);
      }
    }

    // Move to LinkedIn Scheduled — post-deploy step 2 will pick it up at the right time
    await patch(page.id, { Status: { select: { name: 'LinkedIn Scheduled' } } });
    console.log(`  Status → LinkedIn Scheduled (will post IST 19:00-21:00)`);
  }
}

// ─── STEP 2: LinkedIn Scheduled → post at IST 19:00-21:00 ──────────────────
// Also handles: Live + LinkedIn Approved (manual approve override)
for (const [type, [db]] of Object.entries(DBS)) {
  // Auto: LinkedIn Scheduled entries, post during time window
  const { results: scheduled } = await query(db, { and: [
    { property: 'Status',          select:   { equals: 'LinkedIn Scheduled' } },
    { property: 'LinkedIn Posted', checkbox: { equals: false } },
  ]});
  for (const page of scheduled) {
    const slug    = (prop(page.properties, 'URL Slug') || '').split('/').filter(Boolean).pop();
    const [, prefix] = DBS[type];
    const liveUrl = `${SITE}${prefix}${slug}`;
    const liMode  = prop(page.properties, 'LinkedIn Mode') || 'Review';

    if (liMode === 'Auto') {
      await publishLinkedIn(type, page, liveUrl);
    } else {
      // Review mode: post only if LinkedIn Approved is ticked
      if (prop(page.properties, 'LinkedIn Approved')) {
        await publishLinkedIn(type, page, liveUrl);
      } else {
        console.log(`  Waiting for LinkedIn Approved tick: "${prop(page.properties, 'H1') || prop(page.properties, 'Title')}"`);
      }
    }
  }

  // Manual override: Live + LinkedIn Approved ticked directly
  const { results: manual } = await query(db, { and: [
    { property: 'Status',           select:   { equals: 'Live' } },
    { property: 'LinkedIn Approved',checkbox: { equals: true  } },
    { property: 'LinkedIn Posted',  checkbox: { equals: false } },
  ]});
  for (const page of manual) {
    const slug    = (prop(page.properties, 'URL Slug') || '').split('/').filter(Boolean).pop();
    const [, prefix] = DBS[type];
    const liveUrl = `${SITE}${prefix}${slug}`;
    await publishLinkedIn(type, page, liveUrl);
  }
}
