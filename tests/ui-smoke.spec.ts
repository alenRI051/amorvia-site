import { test, expect } from '@playwright/test';
import { findBase } from './common';

const SCENARIO_TITLES = [
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

test('Home renders and scenarios are discoverable', async ({ page, request }) => {
  const base = await findBase(page, request);
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });

  // Verify at least one known scenario title is visible
  const any = page.getByText(new RegExp(SCENARIO_TITLES.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i')).first();
  await expect(any, 'Expected at least one scenario title to be visible').toBeVisible();
});
