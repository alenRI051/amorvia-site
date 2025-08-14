import { test, expect } from '@playwright/test';
import { pickBase } from './common';

const KNOWN_TITLES = [
  'Co-Parenting After Separation',
  'Dating After Breakup',
  'Step-Parenting Dynamics',
  'Mental Health & Relationship Strain',
  'Long-Distance Relationship',
  'Cultural & Religious Differences',
  'Financial Crisis Together',
  'Toxic Relationship & Break-Up Path',
  'Infidelity Recovery & Repair',
  'Substance Use Relapse in the Relationship',
  'Pregnancy & New Baby Stress',
  'Immigration & Visa Pressure',
];

test('Open a scenario (if needed) and click two choices', async ({ page, request }) => {
  const base = await pickBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // If choices already visible, great.
  let choices = page.locator('button:not(:has-text("Crisis Support Hub"))');
  if (!(await choices.count())) {
    // Try to click a scenario title if it's clickable
    for (const title of KNOWN_TITLES) {
      const asButton = page.getByRole('button', { name: new RegExp(title, 'i') });
      if (await asButton.isVisible().catch(() => false)) { await asButton.click(); break; }
      const asLink = page.getByRole('link', { name: new RegExp(title, 'i') });
      if (await asLink.isVisible().catch(() => false)) { await asLink.click(); break; }
    }
    await page.waitForTimeout(300);
    choices = page.locator('button:not(:has-text("Crisis Support Hub"))');
  }

  // Filter out obvious non-game controls
  const gameplayButtons = choices.filter({
    hasNot: page.getByText(/Language:|Background pack:/i)
  });

  await expect(gameplayButtons.first(), 'No choice button visible').toBeVisible();

  await gameplayButtons.first().click();
  const second = gameplayButtons.nth(1);
  if (await second.isVisible().catch(() => false)) await second.click();

  const content = (await page.textContent('main, body')) || '';
  expect(content.length).toBeGreaterThan(20);
});
