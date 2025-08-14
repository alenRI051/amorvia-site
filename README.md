# Amorvia — Tests + CI Bundle

This bundle contains:
- `tests/` — Playwright tests aligned with the current UI
- `.github/workflows/playwright.yml` — GitHub Actions to run tests on every push/PR to `main`
- `playwright.config.ts` — config with trace on failure

## Local run
```bash
npm i -D @playwright/test
npx playwright install
npx playwright test
npx playwright show-report
```

## CI
Push `.github/workflows/playwright.yml`. After one run, add a Ruleset for `main` and require the `e2e` check to pass before merging.

## Tip: Stabilize selectors
In your app, add:
- `data-testid="scenario-card"` on scenario tiles
- `data-testid="choice"` on choice buttons
