import { test, expect } from '@playwright/test';
import { findWorkingBase } from './common';

test('Health OK on at least one domain', async ({ page, request }) => {
  const base = await findWorkingBase(page, request);
  await page.goto(base + '/api/health', { waitUntil: 'domcontentloaded' });
  const raw = (await page.textContent('body')) || '';
  try {
    const pre = await page.textContent('pre');
    const json = pre ? JSON.parse(pre) : JSON.parse(raw);
    expect(json.status).toBe('ok');
  } catch {
    expect(raw.toLowerCase()).toContain('status');
    expect(raw.toLowerCase()).toContain('ok');
  }
});
