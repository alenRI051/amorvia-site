import { test, expect } from '@playwright/test';

test('Home loads and shows some content', async ({ page }) => {
  const resp = await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(resp?.ok(), 'Home responded with a non-OK status').toBeTruthy();

  // Look for any meaningful text or element on the page
  const bodyText = (await page.textContent('body')) || '';
  expect(bodyText.length).toBeGreaterThan(20);

  // If crisis support button exists, open/close it
  const crisisBtn = page.getByRole('button', { name: /crisis support|help|support/i }).first();
  if (await crisisBtn.isVisible().catch(() => false)) {
    await crisisBtn.click();
    await page.waitForTimeout(300);
  }
});
