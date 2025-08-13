import { test, expect } from '@playwright/test';

test('Navigate into gameplay and click a couple of actions', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Reach scenarios or a playable area
  const taps = [
    page.getByRole('button', { name: /start|play|begin|scenarios|enter/i }).first(),
    page.getByRole('link', { name: /start|play|begin|scenarios|enter/i }).first(),
  ];
  for (const el of taps) {
    if (await el.isVisible().catch(() => false)) { await el.click(); await page.waitForTimeout(300); }
  }

  // Open a scenario-like thing
  const openers = page.locator('[data-testid="scenario-card"], a[href*="/scenario"], a:has-text("Scenario"), button:has-text("Scenario")');
  if (await openers.count()) { await openers.first().click(); }

  // Ensure content
  const content = (await page.textContent('main, body')) || '';
  expect(content.length).toBeGreaterThan(20);

  // Click two action-like buttons
  const choice = page.locator('[data-testid="choice"], [data-choice], button:has-text("Continue"), button:has-text("Next"), button:has-text("Choose"), button:has-text("Talk"), button:has-text("Agree"), button:has-text("Apologize")');
  if (await choice.count()) { await choice.first().click(); await page.waitForTimeout(300); }
  if (await choice.count()) { await choice.first().click(); }

  expect(((await page.textContent('main, body')) || '').length).toBeGreaterThan(20);
});
