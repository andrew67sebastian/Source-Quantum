---
type: implementation-log
subject: Live Finance Dashboard — Implementation Notes (Next.js + yahoo-finance2 v3)
date: 2026-05-13
author: Andrew
tags: [dashboard, yahoo-finance2, web-dev, finance, nextjs, typescript, mentat]
status: shipped
linked-spec: "[[Intelligence/dashboard-live-finance-spec]]"
linked-project: "[[Projects/SQ Website Dashboard]]"
---

# Live Finance Dashboard — Implementation Notes

> Built on top of [[Intelligence/dashboard-live-finance-spec]]. This note covers what was actually shipped, deviations from spec, and the v3 API breakage that was discovered and fixed during implementation.

---

## What Was Built

A compact, self-contained market data widget living at `/mentat`. It polls Yahoo Finance every 30 seconds while running, showing price, change $, and change % for a configurable list of tickers. Green text = positive, red = negative.

### Live page
`/mentat` → `app/mentat/page.tsx` → renders `<FinanceTable />`

---

## File Map

| File | Role |
|------|------|
| `lib/finance-types.ts` | Shared TypeScript types (`TickerRow`, `FinanceApiResponse`) |
| `lib/finance-config.ts` | **Symbol list lives here** + formatting helpers + interval constants |
| `lib/finance-fetcher.ts` | Server-only: yahoo-finance2 v3 instance, module-level cache, stagger loop |
| `app/api/quotes/route.ts` | GET `/api/quotes` — calls fetcher, returns JSON |
| `components/FinanceTable.tsx` | Self-contained client component: Start/Stop, polls `/api/quotes`, renders table |
| `app/mentat/page.tsx` | Mentat page — imports and renders `<FinanceTable />` |

---

## Adding or Removing Symbols

Edit the `SYMBOLS` array at the top of `lib/finance-config.ts`:

```ts
// ── Add or remove symbols here ────────────────────────────────────────────
export const SYMBOLS: string[] = [
  '^SPX',    // S&P 500
  '^TNX',    // 10-Year Treasury Yield
  'BTC-USD', // Bitcoin
  // 'AAPL', 'MSFT', '^DJI', 'ETH-USD', etc.
];
```

Yahoo Finance ticker formats:
- Equities: `'AAPL'`, `'NVDA'`, `'BRK-B'`
- Indices: `'^SPX'`, `'^GSPC'`, `'^DJI'`, `'^TNX'`
- Crypto: `'BTC-USD'`, `'ETH-USD'`

No other file needs to change when editing this list.

---

## Deviation from Spec: yahoo-finance2 v3 API

**The spec targeted v2 (`^2.11.0`). pnpm resolved v3 (`3.14.0`) — a breaking change.**

### v2 (spec) — broken in v3
```ts
import yahooFinance from 'yahoo-finance2';
await yahooFinance.quote(symbol);  // throws in v3
```

### v3 (what ships) — correct
```ts
import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
await yf.quote(symbol);
```

The default export in v3 is the `YahooFinance` class itself. The instance is created at module level in `lib/finance-fetcher.ts` so it is shared across all requests (no re-instantiation overhead).

If you upgrade `yahoo-finance2` in future, check this first — it is the most likely thing to break silently.

---

## Warning / Error System (Three Layers)

### Layer 1 — Per-symbol catch (server)
Inside the fetch loop in `lib/finance-fetcher.ts`, each `yf.quote()` call is individually try/caught. If a symbol fails:
- Server logs: `[finance-fetcher] Failed to fetch ^SPX: <error>`
- A null-filled placeholder row is pushed so the table slot stays visible with `—` values
- The symbol is added to an `errors[]` list

### Layer 2 — Error field in API response
After all symbols are attempted, if `errors` is non-empty the route returns:
```json
{ "rows": [...], "lastUpdated": "...", "error": "Failed: ^SPX, ^TNX" }
```
Successful rows are included alongside failed ones — partial data is shown, not a blank table.

### Layer 3 — `⚠` footer in the UI
`components/FinanceTable.tsx` reads `data.error` and renders it in the table footer as amber `⚠ <message>`. The route-level 500 handler also sets `error: 'Internal server error'` which surfaces the same way.

**What "Failed" meant during initial deployment:** The v3 API was called incorrectly, so every single symbol threw. All rows were null-filled, all showed `—`, and the footer showed `⚠ Failed: ^SPX, ^TNX, BTC-USD`.

---

## Anti-Rate-Limit Rules (Non-Negotiable)

| Rule | Value | Where |
|------|-------|--------|
| Client poll interval | 30 000 ms | `REFRESH_INTERVAL_MS` in `finance-config.ts` |
| Per-symbol stagger | 150 ms | `REQUEST_STAGGER_MS` in `finance-config.ts` |
| Server-side cache TTL | 25 000 ms | `CACHE_TTL_MS` in `finance-config.ts` |
| Data delay disclosure | ~15 min | Hard-coded footer in `FinanceTable.tsx` |

The module-level cache in `finance-fetcher.ts` means concurrent browser tabs hit Yahoo Finance only once per 25-second window. The `export const dynamic = 'force-dynamic'` on the route handler prevents Next.js from statically caching it at build time.

---

## Known Constraints

- **`^SPX` vs `^GSPC`**: both work in yahoo-finance2. `^SPX` is the CME index; `^GSPC` is the NYSE composite. They return the same price.
- **`^TNX` volume**: Treasury yield has no meaningful `volume` field — omitted from the compact table.
- **Crypto `marketCap`**: intermittently null for `BTC-USD`. Not displayed in the compact table.
- **Module-level cache resets on server restart**: first request after a cold start always calls Yahoo Finance. Expected.
- **`FailedYahooValidationError`**: if Yahoo changes their response schema, validation errors appear. Add `{ validateResult: false }` to `yf.quote()` options as a last resort, but prefer bumping the library version.
- **Table size**: `max-w-sm` (384 px) — roughly ¼ of a 1600 px desktop screen. Stacks full-width on mobile.

---

## Package

```json
"yahoo-finance2": "^3.14.0"
```

Installed via pnpm. `server-only` (already present in the project) guards against accidental client-side import of the fetcher.

---

*Implemented: 2026-05-13*
