// tests/common.ts
import { request, APIRequestContext, Page } from '@playwright/test';

// If BASE_URL is provided (e.g., from post-deploy workflow), use it directly.
const OVERRIDE = process.env.BASE_URL && process.env.BASE_URL.trim();
export const DOMAINS = OVERRIDE ? [OVERRIDE] : ['https://www.amorvia.eu', 'https://amorvia.eu'];

/** Return the first base URL that responds OK for '/'. */
export async function findBase(page: Page, ctx?: APIRequestContext): Promise<string> {
  const client = ctx || await request.newContext({
    extraHTTPHeaders: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  for (const base of DOMAINS) {
    try {
      const res = await client.get(base + '/');
      if (res.ok()) return base;
    } catch {}
  }
  return DOMAINS[0];
}
