# Amorvia API (Vercel-ready)

Drop **api/** and **vercel.json** in your repo root and push to Vercel.
- `/api/health` → 200 with `{ status: "ok", uptime, timestamp, version, region }`
- `/api/echo`   → echoes request for quick checks

## Verify after deploy
https://<your-domain>/api/health
https://<your-domain>/api/echo

## Notes
- `vercel.json` excludes `/api/*` from SPA rewrites.
- CORS set to `*` for quick testing (tighten later if needed).
