import { test, expect } from '@playwright/test';
import { findBase } from './common';

test('Home loads and shows some content', async ({ page, request }) => {
  const base = await findBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  // Assert stable page marker
  await expect(page.getByText(/Amorvia\s+BETA/i)).toBeVisible();
  // Also ensure language and background controls exist
  await expect(page.getByLabel(/Language:/i)).toBeVisible();
  await expect(page.getByLabel(/Background pack:/i)).toBeVisible();
});
