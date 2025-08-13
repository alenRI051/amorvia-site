import { test, expect } from '@playwright/test';
import { findWorkingBase } from './common';

test('Open a scenario (if needed) and click two choices', async ({ page, request }) => {
  const base = await findWorkingBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // If scenario tiles exist, open one; otherwise, continue (we may already be in a scenario)
  const card = page.locator('[data-testid="scenario-card"], [data-scenario]').first();
  if (await card.isVisible().catch(() => false)) {
    await card.click();
  }

  // Find choice buttons. Prefer data-testid; fallback to visible button texts from snapshot.
  const choices = page.locator(
    '[data-testid="choice"], [data-choice], ' +
    'button:has-text("Propose a structured parenting plan"), ' +
    'button:has-text("Communicate only through a co-parenting app"), ' +
    'button:has-text("Go through lawyers immediately"), ' +
    'button:has-text("Continue"), button:has-text("Next")'
  );

  await expect(choices.first(), 'No choice button visible').toBeVisible();

  // Click two choices if available
  await choices.first().click();
  if (await choices.nth(1).isVisible().catch(() => false)) {
    await choices.nth(1).click();
  }

  // Sanity: page has content after interactions
  const content = (await page.textContent('main, body')) || '';
  expect(content.length).toBeGreaterThan(20);
});
