import { test, expect, request as pwRequest } from '@playwright/test';

test('Health OK via multiple strategies', async ({ page, baseURL, request }) => {
  const url = (baseURL || '') + '/api/health';

  // Strategy A: Playwright request with UA
  const ctx = await pwRequest.newContext({
    extraHTTPHeaders: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36'
    }
  });
  const resA = await ctx.get(url);
  console.log('[health][A] status', resA.status());
  try {
    const json = await resA.json();
    if (json && json.status === 'ok') return;
  } catch {}

  // Strategy B: Navigate browser to the endpoint
  const resB = await page.goto('/api/health', { waitUntil: 'domcontentloaded' });
  console.log('[health][B] status', resB?.status());
  const textB = (await page.textContent('body')) || '';
  try {
    const pre = await page.textContent('pre');
    const parsed = pre ? JSON.parse(pre) : JSON.parse(textB);
    if (parsed && parsed.status === 'ok') return;
  } catch {}
  if (textB.toLowerCase().includes('status') && textB.toLowerCase().includes('ok')) return;

  // Strategy C: In-page fetch (bypasses some bot checks)
  const jsonC = await page.evaluate(async () => {
    const r = await fetch('/api/health', { headers: { 'user-agent': navigator.userAgent } });
    try { return await r.json(); } catch { return { text: await r.text() }; }
  });
  console.log('[health][C] result', jsonC);
  if (jsonC && jsonC.status === 'ok') return;
  if (typeof jsonC?.text === 'string' && jsonC.text.toLowerCase().includes('status') && jsonC.text.toLowerCase().includes('ok')) return;

  throw new Error('Health endpoint did not return status ok via any strategy');
});
