import { test, expect } from '@playwright/test';

test('Open a scenario and click two choices (best-effort)', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // Try to reach scenarios
  const start = page.getByRole('button', { name: /start|play|begin/i }).first();
  if (await start.isVisible().catch(() => false)) {
    await start.click();
  }

  // Click a first scenario-like element
  const scenarioCandidate = page.locator('[data-testid="scenario-card"], a[href*="/scenario"], a:has-text("Scenario")').first();
  await expect(scenarioCandidate, 'Could not find any scenario to open').toBeVisible();
  await scenarioCandidate.click();

  // Wait for content
  await page.waitForLoadState('domcontentloaded');
  const bodyText = (await page.textContent('body')) || '';
  expect(bodyText.length).toBeGreaterThan(20);

  // Try to click two choice-like buttons
  const choiceSelector = [
    '[data-testid="choice"]:not([disabled])',
    '[data-choice]',
    'button:has-text("Choice")',
    'button:has-text("Option")',
    'button:has-text("Continue")',
    'button:has-text("Next")',
    'button:has-text("Talk")',
    'button:has-text("Agree")',
    'button:has-text("Apologize")',
  ].join(', ');

  const firstChoice = page.locator(choiceSelector).first();
  await expect(firstChoice, 'No choice button visible on first node').toBeVisible({ timeout: 5000 });
  await firstChoice.click();
  await page.waitForTimeout(300);

  const secondChoice = page.locator(choiceSelector).first();
  if (await secondChoice.isVisible().catch(() => false)) {
    await secondChoice.click();
  }

  // Optional: look for any stat change text in the body as heuristic
  const afterText = (await page.textContent('body')) || '';
  expect(afterText.length).toBeGreaterThan(20);
});
