// tests/common.ts
import { request, Page, APIRequestContext } from '@playwright/test';

export const CANDIDATES = ['https://www.amorvia.eu', 'https://amorvia.eu'];

export async function findBase(page: Page, requestCtx?: APIRequestContext): Promise<string> {
  const ctx = requestCtx || await request.newContext({
    extraHTTPHeaders: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36' }
  });
  for (const base of CANDIDATES) {
    try {
      const res = await ctx.get(base + '/');
      if (res.ok()) return base;
    } catch {}
  }
  return CANDIDATES[0];
}
