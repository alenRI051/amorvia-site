import { test, expect } from '@playwright/test';
import { pickBase } from './common';

test('Health endpoint responds (HTTP 200) on production', async ({ request, page }) => {
  const base = await pickBase(page, request);
  const url = base + '/api/health';

  const res = await request.get(url);
  if (res.ok()) {
    expect(res.status()).toBe(200);
    return;
  }

  const nav = await page.goto(url, { waitUntil: 'domcontentloaded' });
  expect(nav?.ok(), 'Expected HTTP 200 from /api/health').toBeTruthy();
});
