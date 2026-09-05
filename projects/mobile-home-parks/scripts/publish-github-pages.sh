#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(cd "$ROOT/.." && pwd)"
cd "$ROOT"

echo "Building static export for GitHub Pages..."
rm -rf out .next

# API routes cannot be statically exported; stash them for the Pages build only.
API_STASH=""
if [ -d "src/app/api" ]; then
  API_STASH=$(mktemp -d)
  mv src/app/api "$API_STASH/api"
fi
restore_api() {
  if [ -n "${API_STASH:-}" ] && [ -d "$API_STASH/api" ]; then
    mkdir -p src/app
    mv "$API_STASH/api" src/app/api
    rmdir "$API_STASH" 2>/dev/null || true
  fi
}
trap restore_api EXIT

export GITHUB_PAGES=true
export NEXT_PUBLIC_SITE_URL="https://turneratom.github.io/VitalAI-PWA"
npm run build
restore_api
trap - EXIT

if [ ! -d out ]; then
  echo "Build did not produce out/. Aborting."
  exit 1
fi

touch out/.nojekyll
# Client-route fallback for GitHub Pages
cp out/index.html out/404.html 2>/dev/null || true

echo "Publishing to gh-pages branch..."
cd "$REPO"
git fetch origin gh-pages 2>/dev/null || true
git worktree remove -f /tmp/tp-gh-pages 2>/dev/null || true
rm -rf /tmp/tp-gh-pages

if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
  git worktree add -B gh-pages /tmp/tp-gh-pages origin/gh-pages
elif git show-ref --verify --quiet refs/heads/gh-pages; then
  git worktree add -B gh-pages /tmp/tp-gh-pages gh-pages
else
  git worktree add --detach /tmp/tp-gh-pages
  (
    cd /tmp/tp-gh-pages
    git checkout --orphan gh-pages
    git rm -rf . >/dev/null 2>&1 || true
  )
fi

find /tmp/tp-gh-pages -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -a "$ROOT/out/." /tmp/tp-gh-pages/
touch /tmp/tp-gh-pages/.nojekyll

cd /tmp/tp-gh-pages
git add -A
if git diff --cached --quiet; then
  echo "No changes to publish."
else
  git -c user.email="brad@treadcompanies.com" -c user.name="Trailer Parks Deploy" \
    commit -m "Publish Trailer Parks to GitHub Pages"
  git push -u origin gh-pages --force
  echo "Pushed gh-pages."
fi

# Point GitHub Pages at gh-pages branch (may require write; ignore failure)
gh api repos/turneratom/VitalAI-PWA/pages -X PUT \
  -f build_type=legacy \
  -F source[branch]=gh-pages \
  -F source[path]=/ 2>&1 || \
gh api repos/turneratom/VitalAI-PWA/pages -X POST \
  -f build_type=legacy \
  -F source[branch]=gh-pages \
  -F source[path]=/ 2>&1 || true

echo "Permanent URL: https://turneratom.github.io/VitalAI-PWA/"
