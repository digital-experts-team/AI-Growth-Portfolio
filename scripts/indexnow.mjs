#!/usr/bin/env node
/**
 * IndexNow submission script
 * Notifies search engines (Bing, Yandex, Naver) of updated and published URLs on deploy.
 */

const SITE_URL = process.env.SITE_URL || 'https://tibinjacob.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8a8b139b4f6479698fbfd8ef9c7db3a';

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/about`,
  `${SITE_URL}/hire`,
  `${SITE_URL}/work`,
  `${SITE_URL}/work/mavlers-partner-agency-signals`,
  `${SITE_URL}/work/paddleboat-sdr-scaling-signals`,
  `${SITE_URL}/work/heurist-autopilot-agents`,
  `${SITE_URL}/work/sonic-founder-led-gtm`,
  `${SITE_URL}/workflows`,
  `${SITE_URL}/workflows/waterfall-enrichment`,
  `${SITE_URL}/workflows/website-visitors-to-hubspot`,
  `${SITE_URL}/glossary`,
  `${SITE_URL}/demand`,
  `${SITE_URL}/blog`,
];

async function submitIndexNow() {
  console.log(`Pinging IndexNow for ${urls.length} URLs on ${SITE_URL}...`);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (res.status === 200 || res.status === 202) {
      console.log('IndexNow ping successfully submitted.');
    } else {
      console.warn(`IndexNow response code: ${res.status}`);
    }
  } catch (err) {
    console.warn('IndexNow ping warning:', err.message);
  }
}

submitIndexNow();
