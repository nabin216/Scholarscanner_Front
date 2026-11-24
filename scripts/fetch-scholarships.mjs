// Downloads every scholarship from the API once, before `next build`, so that each pre-rendered
// page (detail pages, landing pages, sitemap, homepage) reads the same snapshot from disk instead of
// calling the API hundreds of times from parallel build workers.
//
// The build fails if the API can't be reached: deploying a site with no scholarship pages would
// remove ~1,000 pages from Google, so it's better to keep the previous deployment live.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.scholarscanner.com/api';
const OUT = path.join(process.cwd(), '.cache', 'scholarships.json');
const MIN_EXPECTED = 50;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (res.ok) return res.json();
      console.warn(`HTTP ${res.status} for ${url} (attempt ${attempt})`);
    } catch (err) {
      console.warn(`${err.message} for ${url} (attempt ${attempt})`);
    }
    await sleep(attempt * 3000);
  }
  throw new Error(`Could not fetch ${url}`);
}

const all = [];
let url = `${API}/scholarships/?page_size=100&ordering=deadline`;
while (url) {
  const data = await getJson(url);
  all.push(...(data.results || []));
  url = data.next;
}

if (all.length < MIN_EXPECTED) {
  console.error(`Only ${all.length} scholarships came back from ${API}; refusing to build.`);
  process.exit(1);
}

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(all));
console.log(`Saved ${all.length} scholarships to ${path.relative(process.cwd(), OUT)}`);
