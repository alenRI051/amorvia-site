import { test, expect } from '@playwright/test';
import { findBase } from './common';

test('Navigate into gameplay and click a couple of actions', async ({ page, request }) => {
  const base = await findBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // If we are already in a scenario, choice buttons exist; otherwise, scenario titles are visible.
  // Click any two visible buttons that are not the Crisis Support toggle.
  const buttons = page.locator('button:not(:has-text("Crisis Support Hub"))');
  await expect(buttons.first(), 'No clickable buttons found').toBeVisible();

  // Click first two visible buttons (best-effort)
  await buttons.first().click();
  const btn2 = buttons.nth(1);
  if (await btn2.isVisible().catch(() => false)) {
    await btn2.click();
  }

  // Page still has content
  const content = (await page.textContent('main, body')) || '';
  expect(content.length).toBeGreaterThan(20);
});
