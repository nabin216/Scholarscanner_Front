import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Scholarship } from '@/types/scholarship';

// Build-time access to every scholarship. `npm run build` runs scripts/fetch-scholarships.mjs first,
// which saves a snapshot to .cache/scholarships.json. In `next dev` the snapshot may be missing,
// so fall back to the API.

const CACHE_FILE = path.join(process.cwd(), '.cache', 'scholarships.json');
const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.scholarscanner.com/api';

let cached: Promise<Scholarship[]> | null = null;

const fetchFromApi = async (): Promise<Scholarship[]> => {
  const all: Scholarship[] = [];
  let url: string | null = `${API}/scholarships/?page_size=100&ordering=deadline`;
  while (url) {
    const res: Response = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
    const data = await res.json();
    all.push(...(data.results || []));
    url = data.next;
  }
  return all;
};

const load = async (): Promise<Scholarship[]> => {
  try {
    return JSON.parse(await readFile(CACHE_FILE, 'utf8')) as Scholarship[];
  } catch {
    return fetchFromApi();
  }
};

export const getAllScholarships = (): Promise<Scholarship[]> => {
  if (!cached) cached = load();
  return cached;
};

export const getScholarship = async (slug: string): Promise<Scholarship | undefined> =>
  (await getAllScholarships()).find((s) => s.slug === slug);
