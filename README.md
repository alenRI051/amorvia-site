# Protection Bundle (CI + Code Owner Enforcement)

This bundle adds two required checks you can enforce with a GitHub Ruleset for `main`:

1) **e2e** — Playwright test suite
2) **both-codeowners** — Fails unless BOTH specified Code Owners approve the PR

## Install
1. Extract this zip into your repo root (it will create `.github/workflows/…`).
2. Commit and push a feature branch:
   ```bash
   git checkout -b ci-protection
   git add .github/workflows
   git commit -m "Add Playwright e2e + both-codeowners checks"
   git push -u origin ci-protection
   ```
3. Open a Pull Request to `main` so both workflows run once and become selectable as status checks.

## Create the Ruleset in GitHub UI
- Repo → **Settings → Rules → Rulesets → New ruleset**
- **Target**: Branch → include `main`
- **Enforcement**: Active
- **Rules**:
  - ✅ Require a pull request before merging
  - ✅ Require status checks to pass before merging → add:
    - `e2e`
    - `both-codeowners`
  - ✅ (Optional) Require branches to be up to date
  - ✅ (Optional) Require signed commits
  - ✅ (Optional) Require review from Code Owners
- Save the ruleset.

## Configure required owners
Edit `.github/workflows/require-both-codeowners.yml`:
```yaml
env:
  REQUIRED_OWNERS: alenRI051,nova-ai   # comma-separated GitHub usernames (no @)
```

If you use CODEOWNERS (recommended), ensure you have:
```
.github/CODEOWNERS
*   @alenRI051 @nova-ai
```

## Notes
- The **Ruleset UI** is the reliable way; JSON import formats vary across plans.
- Job names must match exactly: `e2e` and `both-codeowners`.
