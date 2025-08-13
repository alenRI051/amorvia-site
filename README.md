# Amorvia Playwright Test Pack

This pack gives you a quick **smoke + health** suite for the Amorvia beta.

## Files
- `playwright.config.ts` — sets `BASE_URL` (defaults to `https://www.amorvia.eu`)
- `tests/health.spec.ts` — checks `/api/health` returns `200` and `{ status: "ok" }`
- `tests/ui-smoke.spec.ts` — loads the home page, finds entry points, ensures scenarios are discoverable, and clicks into one

## Setup
```bash
# From your project root
npm i -D @playwright/test
npx playwright install
```

## Run
```bash
# If your domain is different, set BASE_URL
export BASE_URL="https://www.amorvia.eu"   # PowerShell: $env:BASE_URL="https://www.amorvia.eu"
npx playwright test
```

## View report
```bash
npx playwright show-report
```

> Tip: Add data-testid attributes like `data-testid="scenario-card"` and `data-testid="node-text"` for more robust selectors.
