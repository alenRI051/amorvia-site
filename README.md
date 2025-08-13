# Amorvia Playwright Test Pack (Hardcoded + Logic Check)

Runs against **https://www.amorvia.eu** by default and exercises basic gameplay.

## Files
- `playwright.config.ts` — BASE_URL hardcoded to amorvia.eu
- `tests/health.spec.ts` — checks `/api/health` returns 200 + `{status:"ok"}`
- `tests/ui-logic.spec.ts` — opens a scenario, clicks **two choices**, and verifies that at least one **stat** changes (if stats are visible)

## Run
```powershell
npx playwright test
npx playwright show-report
```

> Tip: Add stable selectors to your UI for bulletproof tests:
> - `data-testid="scenario-card"` on scenario tiles
> - `data-testid="node-text"` on dialogue/body
> - `data-testid="stat-trust"` `data-testid="stat-stress"` etc.
> - `data-testid="choice"` for each choice button
