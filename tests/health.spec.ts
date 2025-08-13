import { test, expect } from '@playwright/test';

test('API health returns 200 with status ok', async ({ request, baseURL }) => {
  const url = (baseURL || '') + '/api/health';
  const res = await request.get(url);
  await expect(res, 'health endpoint should respond').toBeOK();
  const body = await res.json();
  expect(body.status).toBe('ok');
  expect(typeof body.timestamp).toBe('string');
});
