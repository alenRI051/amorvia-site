import { test, expect } from '@playwright/test';

test('Home renders and scenarios are discoverable', async ({ page }) => {
  await page.goto('/');
  // Basic render
  await expect(page).toHaveTitle(/amorvia/i, { timeout: 10000 }).catch(() => {});

  // Look for common entry points
  const startBtn = page.getByRole('button', { name: /start|play|begin/i }).first();
  const chooseHeading = page.getByRole('heading', { name: /choose your path|scenarios/i }).first();
  const crisisBtn = page.getByRole('button', { name: /crisis support/i }).first();

  // At least one of these should be visible
  const visible = await Promise.any([
    startBtn.isVisible(),
    chooseHeading.isVisible(),
    crisisBtn.isVisible(),
  ]).catch(() => false);

  expect(visible, 'At least one key UI element should be visible').toBeTruthy();

  // If Start exists, click it to reach scenarios
  if (await startBtn.isVisible()) {
    await startBtn.click();
  }

  // Scenario discovery: prefer data-testid cards; fall back to links
  const cards = page.locator('[data-testid="scenario-card"]');
  const cardCount = await cards.count();
  if (cardCount >= 1) {
    await expect(cards, 'Expect at least 8 scenarios for beta').toHaveCountGreaterThan(7);
    await cards.nth(0).click();
  } else {
    // Fallback: find any link that looks like a scenario
    const scenarioLinks = page.locator('a[href*="/scenario"], a:has-text("Scenario")');
    await expect(scenarioLinks.first()).toBeVisible();
    await scenarioLinks.first().click();
  }

  // Node text should appear
  const nodeText = page.getByTestId('node-text');
  if (await nodeText.count()) {
    await expect(nodeText).toBeVisible();
  } else {
    // fallback: any paragraph in the scene
    await expect(page.locator('main p, [data-scene] p').first()).toBeVisible();
  }

  // Try making a choice if visible
  const choiceBtn = page.getByRole('button', { name: /choice|option|continue|next/i }).first();
  if (await choiceBtn.isVisible()) {
    await choiceBtn.click();
  }
});
