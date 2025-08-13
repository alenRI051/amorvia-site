// tests/common.ts
import { request, Page, APIRequestContext } from '@playwright/test';

export const CANDIDATES = ['https://www.amorvia.eu', 'https://amorvia.eu'];

export async function findWorkingBase(page: Page, requestCtx?: APIRequestContext): Promise<string> {
  const ctx = requestCtx || await request.newContext({
    extraHTTPHeaders: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36' }
  });
  for (const base of CANDIDATES) {
    try {
      const res = await ctx.get(base + '/api/health');
      if (res.ok()) { const j = await res.json().catch(() => ({} as any)); if (j?.status === 'ok') return base; }
    } catch {}
    try {
      const r = await page.goto(base + '/api/health', { waitUntil: 'domcontentloaded' });
      const txt = (await page.textContent('body')) || '';
      if (r?.ok() && txt.toLowerCase().includes('status') && txt.toLowerCase().includes('ok')) return base;
    } catch {}
  }
  throw new Error('No working base URL found among: ' + CANDIDATES.join(', '));
}
