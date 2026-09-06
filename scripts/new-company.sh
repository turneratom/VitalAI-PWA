#!/usr/bin/env bash
# Scaffold a new company under projects/<slug>/
# Usage: ./scripts/new-company.sh "Meridian" "Boutique private travel agency"
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NAME="${1:-}"
IDEA="${2:-}"

if [[ -z "$NAME" ]]; then
  echo "Usage: $0 \"Company Name\" \"one-line idea\"" >&2
  exit 1
fi

slug="$(echo "$NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
dir="$ROOT/projects/$slug"

if [[ -d "$dir" ]]; then
  echo "Already exists: $dir" >&2
  exit 1
fi

mkdir -p "$dir"

cat > "$dir/CURSOR-PROJECT.md" << EOF
# Cursor project: ${NAME}

Open this folder (or the \`${slug}\` GitHub repo) as its **own** Cursor project.

- Product name: **${NAME}**
- Idea: ${IDEA:-TBD}
- **Not** other Tread companies — work only in this project

## Roles

- Bradley: human ideas, priorities, approvals
- Agents: execute jobs inside this company only

Name threads after the **job**, e.g. \`Landing polish\`, \`Outreach wave 1\`.

## Do not continue this product inside VitalAI-PWA

New Cloud Agents for ${NAME} must start from the \`${slug}\` project/environment.
EOF

cat > "$dir/README.md" << EOF
# ${NAME}

**Standalone business.** ${IDEA:-TBD}

## This is its own Cursor project / GitHub repo

Do not develop ${NAME} inside \`VitalAI-PWA\`. See \`CURSOR-PROJECT.md\` and root \`OPS.md\`.

Suggested repo: \`turneratom/${slug}\`  
Suggested Pages URL after split: \`https://turneratom.github.io/${slug}/\`

## Contact

brad@treadcompanies.com
EOF

cat > "$dir/index.html" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${NAME}</title>
  <meta name="description" content="${IDEA:-${NAME}}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Sora:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --ink: #12202a;
      --fog: #eef3f6;
      --accent: #2a6f7a;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100svh;
      font-family: "Sora", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(ellipse at 20% 0%, rgba(42, 111, 122, 0.18), transparent 50%),
        radial-gradient(ellipse at 90% 20%, rgba(18, 32, 42, 0.08), transparent 45%),
        var(--fog);
      display: grid;
      align-items: end;
      padding: 2rem 6vw 12vh;
    }
    h1 {
      font-family: "Fraunces", Georgia, serif;
      font-size: clamp(3rem, 10vw, 6rem);
      line-height: 0.95;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
    }
    p {
      font-weight: 300;
      max-width: 28rem;
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 1.75rem;
    }
    a {
      color: #fff;
      background: var(--accent);
      text-decoration: none;
      padding: 0.9rem 1.35rem;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-weight: 500;
      display: inline-block;
    }
  </style>
</head>
<body>
  <main>
    <h1>${NAME}</h1>
    <p>${IDEA:-New company staged for its own Cursor project.}</p>
    <a href="mailto:brad@treadcompanies.com?subject=${NAME}%20inquiry">Email</a>
  </main>
</body>
</html>
EOF

echo "Created $dir"
echo "Next: create empty GitHub repo turneratom/${slug}, then ./scripts/push-separated-projects.sh"
