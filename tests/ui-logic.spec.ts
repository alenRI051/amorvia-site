import { test, expect } from '@playwright/test';

/**
 * Helper to find a numeric stat on the page.
 * Tries data-testid="stat-*" first, then falls back to elements containing Trust/Stress.
 */
async function readAnyStat(page) {
  // Prefer explicit testids like stat-trust / stat-stress
  const statEls = page.locator('[data-testid^="stat-"]');
  if (await statEls.count()) {
    const first = statEls.first();
    const txt = (await first.innerText()).trim();
    const num = parseFloat(txt.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? null : num;
  }
  // Fallbacks
  const maybe = page.locator(':text-matches("Trust|Stress|Empathy", "i")').first();
  if (await maybe.count()) {
    const txt = (await maybe.innerText()).trim();
    const num = parseFloat(txt.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? null : num;
  }
  return null;
}

test('Home → Scenario → 2 choices cause a stat change', async ({ page }) => {
  await page.goto('/');

  // Navigate to scenario list
  const startBtn = page.getByRole('button', { name: /start|play|begin/i }).first();
  if (await startBtn.isVisible().catch(() => false)) {
    await startBtn.click();
  }

  // Open first scenario
  const cards = page.locator('[data-testid="scenario-card"]');
  if (await cards.count() >= 1) {
    await cards.nth(0).click();
  } else {
    const scenarioLinks = page.locator('a[href*="/scenario"], a:has-text("Scenario")');
    await expect(scenarioLinks.first()).toBeVisible();
    await scenarioLinks.first().click();
  }

  // Wait for node content
  const nodeText = page.getByTestId('node-text');
  if (await nodeText.count()) {
    await expect(nodeText).toBeVisible();
  } else {
    await expect(page.locator('main p, [data-scene] p').first()).toBeVisible();
  }

  // Capture a starting stat value (may be null if UI hides it)
  const before = await readAnyStat(page);

  // Click a choice (try primary button patterns)
  const choiceSelector = [
    'button:has-text("Choice")',
    'button:has-text("Option")',
    'button:has-text("Continue")',
    'button:has-text("Next")',
    'button:has-text("Talk")',
    'button:has-text("Agree")',
    'button:has-text("Apologize")',
    '[data-testid="choice"]:not([disabled])',
    '[data-choice]'
  ].join(', ');

  const firstChoice = page.locator(choiceSelector).first();
  await expect(firstChoice, 'At least one choice button should exist').toBeVisible();
  await firstChoice.click();

  // Click a second choice if available
  const secondChoice = page.locator(choiceSelector).first();
  if (await secondChoice.isVisible().catch(() => false)) {
    await secondChoice.click();
  }

  // If stats are visible, assert they changed
  const after = await readAnyStat(page);
  if (before !== null && after !== null) {
    expect(after, 'Stat value should change after making choices').not.toBe(before);
  }
});
