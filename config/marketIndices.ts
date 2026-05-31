export interface MarketIndex {
  symbol: string;
  label: string;
  color?: string;
}

export const MARKET_INDICES: MarketIndex[] = [
  { symbol: '^SPX', label: 'S&P 500' },
  { symbol: '^NDX', label: 'NASDAQ' },
  { symbol: 'BTC-USD', label: 'Bitcoin' },
  { symbol: '^DJI', label: 'Dow Jones' },
  { symbol: '^JKSE', label: 'IHSG' },
  { symbol: '^HSI', label: 'Hang Seng' },
  { symbol: '^N225', label: 'Nikkei 225' },
  { symbol: '^KS11', label: 'KOSPI' },
];

export interface CommoditiesIndex {
  symbol: string;
  label: string;
  color?: string;
}

export const COMMODITIES_INDICES: CommoditiesIndex[] = [
  { symbol: 'GC=F', label: 'Gold' },
  { symbol: 'CL=F', label: 'Crude Oil' },
  { symbol: 'SI=F', label: 'Silver' },
  { symbol: 'NG=F', label: 'Natural Gas' },
  { symbol: '^TNX', label: 'US 10Y Treasury' },
  { symbol: '^TYX', label: 'US 30Y Treasury'},
];
