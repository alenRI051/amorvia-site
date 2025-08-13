import { test, expect } from '@playwright/test';

test('API health is visible in browser and says status ok', async ({ page }) => {
  const resp = await page.goto('/api/health', { waitUntil: 'domcontentloaded' });
  expect(resp?.ok(), 'HTTP status not OK for /api/health').toBeTruthy();

  // Get any visible text from the page
  const raw = await page.textContent('body');
  expect(raw && raw.length > 0, 'No response body from /api/health').toBeTruthy();

  // Many setups render JSON within <pre>; try to parse
  let json: any = null;
  try {
    const pre = await page.textContent('pre');
    if (pre) json = JSON.parse(pre);
  } catch {}
  if (!json) {
    try { json = JSON.parse(raw || ''); } catch {}
  }

  if (json) {
    expect(json.status).toBe('ok');
  } else {
    // As a last resort, string includes checks
    expect((raw || '').toLowerCase()).toContain('status');
    expect((raw || '').toLowerCase()).toContain('ok');
  }
});
