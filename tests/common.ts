// tests/common.ts
import { request, expect, Page, APIRequestContext } from '@playwright/test';

export const CANDIDATES = ['https://www.amorvia.eu', 'https://amorvia.eu'];

export async function findWorkingBase(page: Page, requestCtx?: APIRequestContext): Promise<string> {
  const ctx = requestCtx || await request.newContext({
    extraHTTPHeaders: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36' }
  });
  for (const base of CANDIDATES) {
    try {
      const res = await ctx.get(base + '/api/health');
      console.log('[probe][A]', base, res.status());
      if (res.ok()) {
        try { const j = await res.json(); if (j?.status === 'ok') return base; } catch {}
      }
    } catch (e) { /* ignore and try next */ }

    try {
      const r = await page.goto(base + '/api/health', { waitUntil: 'domcontentloaded' });
      console.log('[probe][B]', base, r?.status());
      const txt = (await page.textContent('body')) || '';
      if (txt.toLowerCase().includes('status') && txt.toLowerCase().includes('ok')) return base;
    } catch (e) { /* ignore */ }
  }
  throw new Error('No working base URL found among: ' + CANDIDATES.join(', '));
}
