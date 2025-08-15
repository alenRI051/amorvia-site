# Amorvia — Beta Patch

This package is a minimal, working build intended to resolve:
- 404 route issues on Vercel
- Background and character image loading/positioning
- Presence of `/api/health` endpoint
- PWA basics (manifest + service worker)

## Deploy (Vercel)
1. Create a new project from this folder.
2. Ensure **Root Directory** is the repo root (where `index.html` and `vercel.json` live).
3. After deploy, visit `/api/health` to verify serverless function.

## Local preview
Just open `index.html` with a static server:
```sh
python3 -m http.server 5173
# visit http://localhost:5173
```

## Customize
- Put real backgrounds in `assets/backgrounds/` and reference them in the UI.
- Replace character SVGs in `assets/characters/`.
- Update `data/scenarios.json` with scenario statuses/titles.
