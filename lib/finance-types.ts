export interface TickerRow {
  symbol: string;
  name: string;
  price: number | null;
  change: number | null;
  changePct: number | null;
  currency: string;
  lastFetched: string;
}

export interface FinanceApiResponse {
  rows: TickerRow[];
  lastUpdated: string | null;
  error?: string;
}
