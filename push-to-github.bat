@echo off
echo ========================================
echo  Pushing to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Initializing git...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Committing...
git commit -m "Initial commit: AI Fish Breeding Zone Detection System"

echo.
echo Step 4: Adding remote...
git remote add origin https://github.com/shubham18-hub/fish-breeding-ai.git

echo.
echo Step 5: Setting branch to main...
git branch -M main

echo.
echo Step 6: Pushing to GitHub...
echo You will be asked for credentials:
echo Username: shubham18-hub
echo Password: Use your Personal Access Token (not password!)
echo.
echo Get token from: https://github.com/settings/tokens
echo.
git push -u origin main

echo.
echo ========================================
echo  Done! Check: https://github.com/shubham18-hub/fish-breeding-ai
echo ========================================
pause
