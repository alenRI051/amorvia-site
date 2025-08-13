
# Amorvia — Clean Vercel-Ready Package

This folder contains the latest Amorvia build plus Vercel config.

## Quick start (any OS)
1. Open a terminal **in this folder**.
2. Run the script for your OS below (or copy/paste the commands).

### Windows (PowerShell)
```powershell
./init_and_push_https.ps1
```

### macOS / Linux
```bash
bash init_and_push_https.sh
```

This will:
- initialize a Git repository,
- set the remote to: https://github.com/alenRI051/amorvia-site.git
- make an initial commit,
- push to GitHub (you'll be prompted for your GitHub username and **personal access token**).

## After push: Deploy on Vercel
1. Go to vercel.com → New Project → Import `alenRI051/amorvia-site`.
2. Framework: **Other**; Build command: *(leave empty)*; Output directory: **.**
3. Deploy. Test `/api/health`.
4. Add your domain **amorvia.eu** in Vercel → follow DNS instructions.
