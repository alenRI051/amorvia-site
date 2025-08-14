import { test, expect } from '@playwright/test';
import { findBase } from './common';

const CHOICE_TEXTS = [
  'Propose a structured parenting plan',
  'Communicate only through a co-parenting app',
  'Go through lawyers immediately',
];

test('Open a scenario (if needed) and click two choices', async ({ page, request }) => {
  const base = await findBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // If specific choice buttons exist, we are already in a scenario.
  let choice = page.locator(CHOICE_TEXTS.map(t => `button:has-text("${t}")`).join(', '));
  if (!(await choice.count())) {
    // Try clicking the first scenario title if it's a link/button
    const firstTitle = page.getByText(/Co-Parenting After Separation/i).first();
    if (await firstTitle.isVisible().catch(() => false)) {
      const btn = page.getByRole('button', { name: /Co-Parenting After Separation/i }).first();
      const link = page.getByRole('link', { name: /Co-Parenting After Separation/i }).first();
      if (await btn.isVisible().catch(() => false)) await btn.click();
      else if (await link.isVisible().catch(() => false)) await link.click();
      await page.waitForTimeout(300);
    }
    // Refresh choice locator
    choice = page.locator(CHOICE_TEXTS.map(t => `button:has-text("${t}")`).join(', '));
  }

  // As a fallback, look for any buttons within a section that mentions "Choose your path"
  if (!(await choice.count())) {
    const section = page.locator(':text("Choose your path")').locator('..');
    const inSection = section.locator('button');
    if (await inSection.count()) choice = inSection;
  }

  await expect(choice.first(), 'No choice button visible').toBeVisible();
  await choice.first().click();
  if (await choice.nth(1).isVisible().catch(() => false)) await choice.nth(1).click();

  const content = (await page.textContent('main, body')) || '';
  expect(content.length).toBeGreaterThan(20);
});
