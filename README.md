# Amorvia CI + Tests bundle

This zip contains:
- Passing Playwright tests (`tests/`) with consistent helper export `findBase`
- GitHub Actions workflow `.github/workflows/playwright.yml` to run tests on every push/PR
- Sample React components in `samples/` showing how to add stable `data-testid` selectors

## Install & run locally
```bash
npm i -D @playwright/test
npx playwright install
npx playwright test
npx playwright show-report
```

## CI
Push `.github/workflows/playwright.yml` to enable Playwright in GitHub Actions.
Artifacts include the HTML report.

## Adding stable selectors
Use test ids like:
- `data-testid="scenario-card"` on each scenario tile
- `data-testid="choice"` on gameplay choice buttons

Update the app to use the `samples/ScenarioCard.tsx` and `samples/ChoiceButton.tsx` patterns.
