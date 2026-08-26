# Trailer Parks

The leader in mobile home park transactions. A fee-free, one-stop marketplace connecting owners, buyers, analysts, and lenders.

## Features

- **Owners** — List parks for free with verified financial reporting
- **Buyers** — Browse deals with full T-12 statements and underwriting metrics
- **Analysts** — Interactive underwriting workbench with DCF, sensitivity analysis, and deal scorecards
- **Lenders** — Pre-vetted deal flow with standardized financials and loan pipeline management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Recharts

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/marketplace` | Browse all listings |
| `/parks/[id]` | Park detail with full financials |
| `/owners` | Owner dashboard & listing form |
| `/buyers` | Buyer portal & deal comparison |
| `/analysts` | Underwriting workbench |
| `/banks` | Lender portal & loan pipeline |
