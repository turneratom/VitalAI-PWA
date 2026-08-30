#!/usr/bin/env bash
# Push each staged project under projects/ to its own GitHub repo as main.
# Prerequisites: empty repos already exist under turneratom/, and git can push.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OWNER="${GITHUB_OWNER:-turneratom}"

# dir:repo
PAIRS=(
  "everything-films:everything-films"
)

# Optionally include the five from the separate-projects split when those folders exist:
for extra in mobile-home-parks turner-capital tread-affiliates turner-biographies project-ais; do
  if [[ -d "$ROOT/projects/$extra" ]]; then
    PAIRS+=("$extra:$extra")
  fi
done

for pair in "${PAIRS[@]}"; do
  dir="${pair%%:*}"
  repo="${pair##*:}"
  src="$ROOT/projects/$dir"
  if [[ ! -d "$src" ]]; then
    echo "Missing $src" >&2
    exit 1
  fi
  url="https://github.com/${OWNER}/${repo}.git"
  echo "==> ${dir} → ${url}"
  if ! gh repo view "${OWNER}/${repo}" >/dev/null 2>&1; then
    echo "    Repo not found. Create it first:"
    echo "      gh repo create ${OWNER}/${repo} --private"
    continue
  fi
  tmp="$(mktemp -d)"
  git init -b main "$tmp"
  cp -a "$src"/. "$tmp"/
  (
    cd "$tmp"
    rm -rf .git/modules 2>/dev/null || true
    git add -A
    if git diff --cached --quiet; then
      echo "    Nothing to commit."
      exit 0
    fi
    git -c user.email="brad@treadcompanies.com" -c user.name="Bradley Turner" \
      commit -m "Initial import: ${dir} as standalone business"
    git remote add origin "$url"
    git push -u origin main
  )
  rm -rf "$tmp"
  echo "    Done."
done

echo
echo "Next: In Cursor → Open Project → select each new repo."
echo "Start new Cloud Agents from those projects, not from VitalAI-PWA."
