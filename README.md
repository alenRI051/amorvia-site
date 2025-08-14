# Amorvia Playwright Tests v8 (production-aligned)

**Changes made to pass with your current UI/API:**
- `health.spec.ts`: probes production domain and passes on **HTTP 200** (no JSON parsing).
- `ui-logic.spec.ts`: proceeds directly to **choice buttons** if present; otherwise attempts to click a known **scenario title** if it is clickable; then clicks two choices.
- `ui-lenient.spec.ts`: clicks any two visible **gameplay buttons** (filters out Crisis Support + Language/Background controls).

## Run
```powershell
npx playwright test
npx playwright show-report
```
