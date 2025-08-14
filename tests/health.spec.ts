import { test, expect } from '@playwright/test';
import { findBase } from './common';

test('Health endpoint responds (HTTP 200)', async ({ request, page }) => {
  const base = await findBase(page, request);
  const url = base + '/api/health';

  const res = await request.get(url);
  if (res.ok()) { expect(res.status()).toBe(200); return; }

  const nav = await page.goto(url, { waitUntil: 'domcontentloaded' });
  expect(nav?.ok()).toBeTruthy();
});
