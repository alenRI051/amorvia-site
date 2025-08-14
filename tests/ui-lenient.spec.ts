import { test, expect } from '@playwright/test';
import { findBase } from './common';

test('Click two visible gameplay actions', async ({ page, request }) => {
  const base = await findBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // Exclude non-game controls and generic Close buttons
  const buttons = page.locator('button').filter({
    hasNot: page.getByText(/Crisis Support Hub|Language:|Background pack:|Close/i)
  });

  await expect(buttons.first(), 'No gameplay-like button found').toBeVisible();

  await buttons.first().click();
  const second = buttons.nth(1);
  if (await second.isVisible().catch(() => false)) await second.click();

  const body = (await page.textContent('main, body')) || '';
  expect(body.length).toBeGreaterThan(20);
});
