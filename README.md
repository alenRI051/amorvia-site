# Amorvia API Pack (Vercel)

This package provides a **working `/api/health`** endpoint for Vercel plus a small `/api/echo` helper.

## Files
- `api/health.js` — returns `200` with JSON: `{ status: "ok", uptime, timestamp, version }`
- `api/echo.js` — echoes POST body for quick testing
- `vercel.json` — preserves `/api/*` routes and rewrites everything else to `/`

## How to use
1. Drop the **`api` folder** and **`vercel.json`** at the **root** of your project repository.
2. Commit & push to GitHub (or import into Vercel).
3. Open: `https://<your-domain>/api/health` — you should see a JSON body with `"status":"ok"`.

## Local test (curl)
```bash
curl -i https://<your-domain>/api/health
curl -s https://<your-domain>/api/health | jq
curl -s -X POST https://<your-domain>/api/echo -H "content-type: application/json" -d '{"hello":"world"}'
```

## Notes
- Uses **CommonJS** syntax for compatibility with Vercel Node functions.
- Adds `Cache-Control: no-store` to avoid stale responses.
- If you already have `vercel.json`, merge the **rewrite** so that `/api` is excluded from any catch-all.
