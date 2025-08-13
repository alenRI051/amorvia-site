import { defineConfig } from '@playwright/test';

const BASE = process.env.BASE_URL || 'https://www.amorvia.eu';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
    headless: true,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
