export const MAX_HISTORY_POINTS = 2000;

export const TIMEFRAMES: { label: string; key: string }[] = [
  { label: '1D', key: '1D' },
  { label: '5D', key: '5D' },
  { label: '1M', key: '1M' },
  { label: '3M', key: '3M' },
  { label: 'YTD', key: 'YTD' },
  { label: '1Y', key: '1Y' },
  { label: '5Y', key: '5Y' },
];

function ytdTicks(): number {
  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  return Math.max(1, Math.floor((now.getTime() - jan1.getTime()) / (1000 * 30)));
}

export const TIMEFRAME_WINDOWS: Record<string, number> = {
  '1D': 390,
  '5D': 1950,
  '1M': 8400,
  '3M': 25200,
  get YTD() { return ytdTicks(); },
  '1Y': 100800,
  '5Y': 504000,
};

export const DEFAULT_TIMEFRAME = '1D';
