#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(cd "$ROOT/.." && pwd)"
cd "$ROOT"

SITE_URL="${SITE_URL:-https://www.mhportal.com}"
CNAME_HOST="${CNAME_HOST:-www.mhportal.com}"

echo "Building static export for ${SITE_URL}..."
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
export STATIC_EXPORT=true
export NEXT_PUBLIC_SITE_URL="$SITE_URL"
npm run build
restore_api
trap - EXIT

if [ ! -d out ]; then
  echo "Build did not produce out/. Aborting."
  exit 1
fi

touch out/.nojekyll
echo "$CNAME_HOST" > out/CNAME
# Client-route fallback for GitHub Pages
cp out/index.html out/404.html 2>/dev/null || true

publish_branch() {
  local BRANCH="$1"
  local WORK="/tmp/tp-pages-${BRANCH}"
  echo "Publishing to ${BRANCH}..."
  cd "$REPO"
  git fetch origin "$BRANCH" 2>/dev/null || true
  git worktree remove -f "$WORK" 2>/dev/null || true
  rm -rf "$WORK"

  if git show-ref --verify --quiet "refs/remotes/origin/${BRANCH}"; then
    git worktree add -B "$BRANCH" "$WORK" "origin/${BRANCH}"
  elif git show-ref --verify --quiet "refs/heads/${BRANCH}"; then
    git worktree add -B "$BRANCH" "$WORK" "$BRANCH"
  else
    git worktree add --detach "$WORK"
    (
      cd "$WORK"
      git checkout --orphan "$BRANCH"
      git rm -rf . >/dev/null 2>&1 || true
    )
  fi

  # Replace site artifacts; keep source dirs on main
  if [ "$BRANCH" = "main" ]; then
    cd "$WORK"
    for name in index.html index.txt 404.html 404 .nojekyll CNAME _next _not-found \
      marketplace parks owners buyers banks analysts links list-your-park \
      outreach partner resources upload-list downloads robots.txt sitemap.xml \
      favicon.ico file.svg globe.svg next.svg vercel.svg window.svg \
      __next.__PAGE__.txt __next._full.txt __next._index.txt __next._tree.txt \
      PINNED-LINKS.md; do
      rm -rf "$name"
    done
    cp -a "$ROOT/out/." .
    # Do not overwrite monorepo source with export leftovers that collide
  else
    find "$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
    cp -a "$ROOT/out/." "$WORK/"
  fi

  touch "$WORK/.nojekyll"
  echo "$CNAME_HOST" > "$WORK/CNAME"

  cd "$WORK"
  git add -A
  if git diff --cached --quiet; then
    echo "No changes on ${BRANCH}."
  else
    git -c user.email="brad@treadcompanies.com" -c user.name="Trailer Parks Deploy" \
      commit -m "Publish MH Portal (www.mhportal.com) static site"
    git push -u origin "$BRANCH"
    echo "Pushed ${BRANCH}."
  fi
  git worktree remove -f "$WORK" 2>/dev/null || true
}

publish_branch gh-pages
publish_branch main

# Best-effort: set custom domain on GitHub Pages
gh api repos/turneratom/VitalAI-PWA/pages -X PUT \
  -f cname="$CNAME_HOST" \
  -f build_type=legacy \
  -F source[branch]=main \
  -F source[path]=/ 2>&1 || true

echo ""
echo "Published for custom domain: ${SITE_URL}"
echo "DNS still required (if not already pointing at GitHub Pages):"
echo "  CNAME  www  →  turneratom.github.io"
echo "  A      @    →  185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153"
echo "Then: GitHub → Settings → Pages → Custom domain = www.mhportal.com (Enforce HTTPS)"
