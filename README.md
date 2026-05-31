# Source Quantum

A modern financial intelligence platform for equity markets, crypto, and macroeconomic analysis. Built with Next.js 16, Sanity CMS, Clerk authentication, and real-time market data via yahoo-finance2.

---

## What This Project Is

Source Quantum is a web application that combines:
- **Live market data** — real-time quotes, indices, charts, and heatmaps
- **Research content** — blog-style posts and PDFs managed through a headless CMS
- **Analytics dashboard** — TradingView-powered widgets and lightweight-charts
- **Protected team space** — Clerk-gated `/dev-team` and `/studio` routes

The editorial philosophy is fundamentals-first, risk-aware analysis. The design language is dark-mode terminal aesthetic with monospace typography.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, Radix UI, Framer Motion, styled-components |
| CMS | Sanity v5 (Studio at `/studio`) |
| Auth | Clerk (`@clerk/nextjs` v7) |
| Real-time backend | Convex v1.35 (initialized, not yet in use) |
| Market data | yahoo-finance2 v3 (server-side, cached) |
| Charting | lightweight-charts v5 + TradingView widgets |
| Package manager | pnpm |

---

## Project Structure

```
sourcequantum/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page (Hero section)
│   ├── layout.tsx              # Root layout — Clerk provider, fonts
│   ├── dashboard/              # Analytics dashboard (sidebar layout)
│   ├── mentat/                 # Live market dashboard (main feature)
│   │   └── macro/              # Macro overview (TradingView mini-chart)
│   ├── research/               # Blog listing (Sanity posts)
│   │   └── [slug]/             # Dynamic post detail pages
│   ├── insight/                # Insights page
│   ├── subscribe/              # Newsletter signup
│   ├── dev-team/               # Protected — Clerk required
│   ├── studio/[[...tool]]/     # Sanity Studio — Clerk required
│   └── api/
│       ├── quotes/             # Live ticker data endpoint
│       ├── market/history/     # Historical price data
│       └── dxy/                # Dollar Index endpoint
│
├── components/
│   ├── market/                 # Market-specific components
│   │   ├── PriceChart.tsx      # Interactive price chart
│   │   ├── MarketIndicesPanel.tsx
│   │   ├── HeatmapPanel.tsx
│   │   ├── BondsCommodities.tsx
│   │   ├── DXYRibbon.tsx
│   │   └── ...
│   ├── ui/                     # Radix-based UI primitives (shadcn)
│   ├── FinanceTable.tsx        # Live quotes table with polling
│   ├── hero-section.tsx        # Landing hero
│   ├── app-sidebar.tsx         # Navigation sidebar
│   ├── header.tsx / header-alt.tsx
│   ├── blog-card.tsx / blog-content.tsx
│   ├── tradingviewwidget.tsx   # TradingView embed wrapper
│   └── convexclientprovider.tsx
│
├── lib/
│   ├── finance-config.ts       # Tracked symbols, poll intervals, formatters
│   ├── finance-fetcher.ts      # Server-only yahoo-finance2 fetcher + cache
│   ├── finance-types.ts        # TickerRow, FinanceApiResponse types
│   ├── constants.ts            # Nav items, TradingView widget configs
│   └── utils.ts                # cn() helper (clsx + tailwind-merge)
│
├── config/
│   ├── marketIndices.ts        # Symbol/label pairs for indices & commodities
│   ├── timeframes.ts           # Chart timeframe definitions (1D–5Y)
│   ├── chartConfig.ts          # lightweight-charts styling (colors, grid)
│   └── timezone.ts             # Timezone configuration
│
├── hooks/
│   ├── useMarketData.ts        # Global polling registry (listener pattern)
│   ├── useHistoricalData.ts    # Historical data fetch + timeframe state
│   ├── useTradingViewWidget.tsx # External script loader for TradingView
│   └── use-mobile.ts           # Responsive breakpoint hook
│
├── sanity/
│   ├── schemaTypes/            # Document schemas: post, author, pdf
│   ├── lib/
│   │   ├── client.ts           # Sanity client (CDN-enabled)
│   │   ├── fetch.ts            # sanityFetch() with draft mode + ISR tags
│   │   ├── query.ts            # GROQ queries (posts, post, pdf, paths)
│   │   └── image.ts / live.ts
│   └── structure.ts            # Studio structure config
│
├── convex/                     # Convex backend (initialized, no schema yet)
│   └── _generated/             # Auto-generated types — do not edit manually
│
├── middleware.ts               # Clerk route protection
├── next.config.ts              # Image domains, Turbopack config
├── sanity.config.ts            # Studio config (schema, plugins)
└── sanity.cli.ts               # CLI config for GROQ typegen
```

---

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/mentat` | Public | Live market dashboard |
| `/mentat/macro` | Public | Macro TradingView overview |
| `/research` | Public | Blog/research article listing |
| `/research/[slug]` | Public | Individual article |
| `/insight` | Public | Insights page |
| `/subscribe` | Public | Newsletter signup |
| `/dashboard` | Public | Analytics dashboard |
| `/dev-team` | Clerk protected | Internal team page |
| `/studio` | Clerk protected | Sanity CMS authoring UI |
| `/api/quotes` | Internal | GET — live ticker data |
| `/api/market/history` | Internal | GET — historical OHLCV |
| `/api/dxy` | Internal | GET — Dollar Index data |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- A Sanity account (project already exists: `77hvsvuc`)
- A Clerk account (development keys in `.env.local`)
- A Convex account (dev deployment: `dev:famous-marten-322`)

### Installation

```bash
# Clone the repo
git clone https://github.com/andrew67sebastian/Source-Quantum.git
cd Source-Quantum

# Install dependencies
pnpm install

# Copy environment variables (ask a team member for values)
cp .env.example .env.local

# Start the dev server
pnpm dev
```

The app runs at `http://localhost:3000`.

---

## Environment Variables

Create a `.env.local` file in the project root. All variables below are required.

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=77hvsvuc
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # Required for draft/preview mode

# Convex (real-time backend)
CONVEX_DEPLOYMENT=dev:famous-marten-322
NEXT_PUBLIC_CONVEX_URL=https://famous-marten-322.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_URL=https://famous-marten-322.convex.site

# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

> The `.env*` pattern is in `.gitignore` — never commit these files.

---

## Key Features

### Live Market Dashboard (`/mentat`)

The core feature. A three-column layout showing:

- **Column 1** — Live quotes table (`FinanceTable`) + sector heatmap
- **Column 2** — Market indices panel, bonds/commodities, DXY ribbon
- **Column 3** — Market news feed + economic calendar (TradingView widgets)

**How the data pipeline works:**

```
User clicks "Start" in FinanceTable
  → frontend polls /api/quotes every 30 seconds
    → server calls fetchAllQuotes() in lib/finance-fetcher.ts
      → checks module-level cache (25s TTL)
        → if stale: fetches each symbol from yahoo-finance2 with 150ms stagger
          → caches result, returns { rows, lastUpdated }
```

**Tracked symbols** (defined in `lib/finance-config.ts`):

| Category | Symbols |
|---|---|
| US Indices | ^SPX, ^DJI, ^NDX |
| Fixed Income | ^JNK, ^TNX |
| Global Indices | ^N225, ^FTSE, ^JKSE, ^HSI, ^NSEI |
| Crypto | BTC-USD |
| Commodities / Futures | GC=F (Gold), CL=F (Oil), SI=F (Silver) |

**Rate limiting rules:**
- Frontend polls no faster than every 30 seconds
- Server staggers per-symbol requests by 150ms
- Server cache TTL: 25 seconds
- Futures symbols require a special validation bypass (yahoo-finance2 v3 limitation)

### Research (`/research`)

Blog-style articles fetched from Sanity at request time using `sanityFetch()`. Supports:
- Static path generation for SEO
- Draft mode preview (requires `SANITY_API_READ_TOKEN`)
- ISR revalidation via tags
- Multi-language posts (English / Indonesian)

### Authentication

Clerk handles auth. The middleware in `middleware.ts` protects:
- `/dev-team/*` — team-only pages
- `/studio/*` — Sanity CMS (so only team members can publish content)

All other routes are public.

### Charting

Two charting systems run in parallel:
- **lightweight-charts** — native canvas charts (`PriceChart.tsx`) for OHLCV/line data with 1D–5Y timeframes
- **TradingView widgets** — embedded iframes for extended data (timelines, screeners, heatmaps, economic calendar)

---

## Content Management (Sanity)

Sanity Studio is accessible at `/studio` (requires Clerk login).

### Schema Types

| Type | Fields |
|---|---|
| **post** | title, subtitle, slug, author (ref), publishedAt, language (en/id), tags, image, body (blocks) |
| **author** | name, slug, image, education, major, bio (blocks) |
| **pdf** | title, slug, file (asset), description |

### Publishing an article

1. Go to `/studio`
2. Create a new **Post** document
3. Fill in title, slug (auto-generates from title), author, and body
4. Set `publishedAt` to schedule when it appears publicly
5. Hit Publish — it immediately appears at `/research/[slug]`

### GROQ Queries

All queries live in `sanity/lib/query.ts`. To add one:

```ts
export const myQuery = defineQuery(`*[_type == "post" && "macro" in tags]{
  title, slug, publishedAt
}`)
```

Use it with `sanityFetch({ query: myQuery })` in any server component.

---

## Development Notes

### Adding a new page

1. Create `app/your-route/page.tsx`
2. If it needs auth, add the path to the matcher in `middleware.ts`
3. Add it to the nav in `lib/constants.ts`

### Adding a new tracked symbol

Edit `lib/finance-config.ts` and add the ticker to the symbols array. The fetcher and `FinanceTable` pick it up automatically on the next poll.

### Adding a new market component

1. Create the component in `components/market/`
2. Use `useMarketData(symbol)` for live prices — it handles polling lifecycle automatically
3. Use `useHistoricalData(symbol, timeframe)` for OHLCV chart data

### Working with Convex

Convex is wired up but has no schema or functions yet. It is ready for real-time features (e.g., user watchlists, price alerts, comments).

> **Important:** Always read `convex/_generated/ai/guidelines.md` before writing any Convex code. It contains rules that override general Convex documentation.

To install Convex agent skills for common tasks:
```bash
npx convex ai-files install
```

To add a function:
1. Create a file in `convex/` (e.g., `convex/watchlist.ts`)
2. Define queries/mutations with `query()` / `mutation()`
3. Run `npx convex dev` alongside `pnpm dev` to sync

---

## Scripts

```bash
pnpm dev        # Start dev server with Turbopack (port 3000)
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # ESLint check
```

---

## Known Constraints

| Area | Constraint |
|---|---|
| yahoo-finance2 v3 | Futures require validation bypass; treasury yield volume fields omitted |
| Convex | Backend initialized but no schema or functions defined yet |
| `/dashboard` | Template scaffold — not fully implemented |
| Mobile | Mentat page uses fixed widths; not fully responsive on small screens |
| Historical charts | Data is in-memory only; lost on page reload |
| Rate limiting | Hard-coded poll intervals; no dynamic throttling |

---

## Branch Strategy

```
main              ← stable, production-ready code only
  └── design-v2   ← current active development branch
  └── feature/*   ← new features (branch from main, PR back to main)
  └── fix/*       ← bug fixes
```

Never commit directly to `main`. Open a PR from your feature branch.

---

## Contributing

1. Branch from `main`: `git checkout -b feature/your-feature`
2. Make changes and commit with clear messages explaining *why*, not just *what*
3. Push: `git push -u origin feature/your-feature`
4. Open a pull request on GitHub targeting `main`
5. Get a review before merging

Never commit `.env*` files, `node_modules/`, or build artifacts (`/.next/`, `/out/`).
