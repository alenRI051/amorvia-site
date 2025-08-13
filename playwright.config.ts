import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  expect: { timeout: 20000 },
  use: {
    baseURL: 'https://www.amorvia.eu',
    trace: 'retain-on-failure',
    headless: true,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
});
