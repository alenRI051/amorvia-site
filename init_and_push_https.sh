#!/usr/bin/env bash
set -e
git init
git branch -M main || true
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/alenRI051/amorvia-site.git
git add .
git commit -m "Clean deploy to Vercel (init)" || true
git push -u origin main
