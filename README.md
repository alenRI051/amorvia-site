# Amorvia Playwright Tests v7 (snapshot-aligned)

This set aligns selectors with your current UI:

- **ui-basic** checks `Amorvia BETA` and the two comboboxes (Language, Background pack).
- **ui-smoke** considers scenarios "discoverable" if at least one of the known scenario titles is visible.
- **ui-lenient** clicks any two visible buttons (excluding "Crisis Support Hub"), which matches your in-scenario choices.

All tests automatically try both `https://www.amorvia.eu` and `https://amorvia.eu`.

## Run
```powershell
npx playwright test
npx playwright show-report
```
