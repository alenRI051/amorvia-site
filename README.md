# Amorvia Playwright Tests — Fixed

This pack fixes the failure where the test expected a scenario card even when the page was already inside a scenario.

## What changed
- `ui-logic.spec.ts` no longer asserts a scenario card exists. It opens one **if present**, otherwise proceeds straight to choices.
- Choice selectors prefer `data-testid="choice"` but include fallbacks for the exact button texts seen on your page.

## Files
- `tests/common.ts` (dual-domain probe)
- `tests/health.spec.ts`
- `tests/ui-logic.spec.ts` (fixed)
- `playwright.config.ts`

## Run
```powershell
npx playwright test
npx playwright show-report
```
