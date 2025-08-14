# Amorvia Playwright Tests v9 (helper + selectors fixed)

- **common.ts** exports `findBase` (named) and all specs import it consistently.
- **Selectors** match your live UI:
  - Choice buttons: use the three visible labels, fallback to buttons under "Choose your path".
  - Basic smoke checks look for "Amorvia BETA" and the two comboboxes.
  - Lenient test clicks two visible buttons, excluding Crisis Support / Language / Background / Close.

## Run
```powershell
npx playwright test
npx playwright show-report
```
