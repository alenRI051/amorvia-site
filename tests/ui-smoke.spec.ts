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

  const pattern = new RegExp(SCENARIO_TITLES.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');
  await expect(page.getByText(pattern).first(), 'Expected at least one scenario title').toBeVisible();
});
