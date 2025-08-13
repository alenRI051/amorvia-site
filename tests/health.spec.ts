import { test, expect, request as pwRequest } from '@playwright/test';

const domains = [
  'https://www.amorvia.eu',
  'https://amorvia.eu'
];

async function checkHealth(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    try {
      const json = await res.json();
      return json.status === 'ok';
    } catch {
      const text = await res.text();
      return text.toLowerCase().includes('status') && text.toLowerCase().includes('ok');
    }
  } catch {
    return false;
  }
}

test('Health passes on either www or apex domain', async () => {
  let passed = false;
  for (const domain of domains) {
    const url = domain + '/api/health';
    console.log('[health] Trying', url);
    if (await checkHealth(url)) {
      console.log('[health] OK at', url);
      passed = true;
      break;
    } else {
      console.log('[health] FAIL at', url);
    }
  }
  expect(passed, 'No domain returned healthy status').toBeTruthy();
});
