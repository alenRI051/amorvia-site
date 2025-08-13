import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: { timeout: 15000 },
  use: {
    baseURL: 'https://www.amorvia.eu',
    trace: 'retain-on-failure',
    headless: true,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
