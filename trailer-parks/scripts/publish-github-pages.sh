#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPO="$(cd "$ROOT/.." && pwd)"
cd "$ROOT"

# Live working URL (GitHub project Pages). Do NOT set CNAME until www.mhportal.com DNS is ready.
SITE_URL="${SITE_URL:-https://turneratom.github.io/VitalAI-PWA}"

echo "Building static export for ${SITE_URL}..."
rm -rf out .next

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
# Critical: remove CNAME so GitHub does not redirect github.io → broken custom domain
rm -f out/CNAME
cp out/index.html out/404.html 2>/dev/null || true

publish_branch() {
  local BRANCH="$1"
  local WORK="/tmp/tp-pages-${BRANCH}-$$"
  echo "Publishing to ${BRANCH}..."
  cd "$REPO"
  git fetch origin "$BRANCH" 2>/dev/null || true
  git worktree remove -f "$WORK" 2>/dev/null || true
  rm -rf "$WORK"

  # Clear any stale worktrees holding this branch
  git worktree list --porcelain | awk '/^worktree /{print $2}' | while read -r wt; do
    case "$wt" in
      /tmp/tp-*) git worktree remove -f "$wt" 2>/dev/null || true ;;
    esac
  done

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
  else
    find "$WORK" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
    cp -a "$ROOT/out/." "$WORK/"
  fi

  touch "$WORK/.nojekyll"
  rm -f "$WORK/CNAME"

  cd "$WORK"
  git add -A
  # Ensure CNAME deletion is staged if it existed
  git rm -f --ignore-unmatch CNAME 2>/dev/null || true
  if git diff --cached --quiet; then
    echo "No changes on ${BRANCH}."
  else
    git -c user.email="brad@treadcompanies.com" -c user.name="Mobile Home Parks Deploy" \
      commit -m "Publish working Mobile Home Parks site (github.io, no broken CNAME)"
    git push -u origin "$BRANCH"
    echo "Pushed ${BRANCH}."
  fi
  cd "$REPO"
  git worktree remove -f "$WORK" 2>/dev/null || true
}

publish_branch gh-pages
publish_branch main

echo ""
echo "Live URL: ${SITE_URL}/"
echo "Do not add www.mhportal.com CNAME until DNS points to turneratom.github.io"
