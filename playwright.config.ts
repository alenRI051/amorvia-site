import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'https://www.amorvia.eu',
    trace: 'on-first-retry',
    headless: true,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
