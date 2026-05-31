// ── Add or remove symbols here ────────────────────────────────────────────────
export const SYMBOLS: string[] = [
  '^SPX',    // S&P 500
  '^DJI',    // Dow Jones
  '^NDX',    // Nasdaq
  '^JNK',    // High Yield Corporate Bond ETF
  '^TNX',    // 10-Year Treasury Yield
  'BTC-USD', // Bitcoin
  '^N225',   // Nikkei 225
  '^FTSE',   // FTSE 100
  '^JKSE',   // Jakarta Composite Index
  '^HSI',    // Hang Seng Index
  '^NSEI',   // Nifty 50
  'GC=F',   // Gold Futures
  'CL=F',   // Crude Oil Futures
  'SI=F',    // Silver Futures
];
// ─────────────────────────────────────────────────────────────────────────────

export const REFRESH_INTERVAL_MS = 30_000;
export const REQUEST_STAGGER_MS = 150;
export const CACHE_TTL_MS = 25_000;

export function formatPrice(value: number | null): string {
  if (value === null) return '—';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatChange(value: number | null): string {
  if (value === null) return '—';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

export function formatChangePct(value: number | null): string {
  if (value === null) return '—';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
