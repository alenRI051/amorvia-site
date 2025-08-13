
git init
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/alenRI051/amorvia-site.git
git add .
git commit -m "Clean deploy to Vercel (init)"
git push -u origin main
