import 'server-only';

// yahoo-finance2 v3: default export is the YahooFinance class, must be instantiated
import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

import { SYMBOLS, REQUEST_STAGGER_MS, CACHE_TTL_MS } from './finance-config';
import type { TickerRow, FinanceApiResponse } from './finance-types';

let cachedData: TickerRow[] = [];
let cacheTimestamp = 0;

function isCacheValid() {
  return Date.now() - cacheTimestamp < CACHE_TTL_MS && cachedData.length > 0;
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function fetchSymbol(symbol: string): Promise<TickerRow> {
  // Futures (e.g. GC=F, CL=F, SI=F) have quoteType "FUTURE" which is absent from
  // yahoo-finance2 v3's validation schema — bypass validation for them only.
  const isFuture = symbol.endsWith('=F');
  const result = await yf.quote(
    symbol,
    {
      fields: [
        'symbol',
        'shortName',
        'longName',
        'regularMarketPrice',
        'regularMarketChange',
        'regularMarketChangePercent',
        'currency',
      ],
    },
    isFuture ? { validateResult: false } : undefined,
  );

  return {
    symbol: result.symbol,
    name: result.shortName ?? result.longName ?? symbol,
    price: result.regularMarketPrice ?? null,
    change: result.regularMarketChange ?? null,
    changePct: result.regularMarketChangePercent ?? null,
    currency: result.currency ?? 'USD',
    lastFetched: new Date().toISOString(),
  };
}

export async function fetchAllQuotes(): Promise<FinanceApiResponse> {
  if (isCacheValid()) {
    return { rows: cachedData, lastUpdated: new Date(cacheTimestamp).toISOString() };
  }

  const rows: TickerRow[] = [];
  const errors: string[] = [];

  for (const symbol of SYMBOLS) {
    try {
      rows.push(await fetchSymbol(symbol));
    } catch (err) {
      console.error(`[finance-fetcher] Failed to fetch ${symbol}:`, err);
      errors.push(symbol);
      rows.push({
        symbol,
        name: symbol,
        price: null,
        change: null,
        changePct: null,
        currency: 'USD',
        lastFetched: new Date().toISOString(),
      });
    }
    await sleep(REQUEST_STAGGER_MS);
  }

  cachedData = rows;
  cacheTimestamp = Date.now();

  return {
    rows,
    lastUpdated: new Date().toISOString(),
    ...(errors.length > 0 && { error: `Failed: ${errors.join(', ')}` }),
  };
}
