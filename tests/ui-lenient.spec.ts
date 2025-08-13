import { test, expect } from '@playwright/test';

test('Navigate into gameplay and click a couple of actions', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Try a set of steps to reach scenarios
  const tryClicks = async (locator) => {
    if (await locator.isVisible().catch(() => false)) {
      await locator.click();
      await page.waitForTimeout(300);
    }
  };

  await tryClicks(page.getByRole('button', { name: /start|play|begin|scenarios/i }).first());
  await tryClicks(page.getByRole('link', { name: /start|play|begin|scenarios/i }).first());

  // Open something that looks like a scenario
  const scenarioLike = page.locator('[data-testid="scenario-card"], a[href*="/scenario"], a:has-text("Scenario"), button:has-text("Scenario")').first();
  if (await scenarioLike.isVisible().catch(() => false)) {
    await scenarioLike.click();
  }

  // Content should be present
  const body = await page.textContent('body');
  expect((body || '').length).toBeGreaterThan(20);

  // Click two generic action buttons if present
  const action = page.locator('[data-testid="choice"], [data-choice], button:has-text("Continue"), button:has-text("Next"), button:has-text("Choose"), button:has-text("Talk"), button:has-text("Agree"), button:has-text("Apologize")').first();
  if (await action.isVisible().catch(() => false)) {
    await action.click();
    await page.waitForTimeout(300);
  }
  const action2 = page.locator('[data-testid="choice"], [data-choice], button:has-text("Continue"), button:has-text("Next"), button:has-text("Choose"), button:has-text("Talk"), button:has-text("Agree"), button:has-text("Apologize")').first();
  if (await action2.isVisible().catch(() => false)) {
    await action2.click();
  }

  // Pass if we stayed on a page with content (basic sanity)
  const after = await page.textContent('body');
  expect((after || '').length).toBeGreaterThan(20);
});
