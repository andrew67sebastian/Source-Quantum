import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
import type { ChartResultArray } from 'yahoo-finance2/esm/src/modules/chart.js';

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

interface DataPoint { time: number; value: number; }
interface CacheEntry { points: DataPoint[]; fetchedAt: number; }
const serverCache = new Map<string, CacheEntry>();

const CACHE_TTL_MS: Record<string, number> = {
  '1D':  60_000,
  '5D':  180_000,
  '1M':  1_800_000,
  '3M':  1_800_000,
  'YTD': 1_800_000,
  '1Y':  1_800_000,
  '5Y':  3_600_000,
};

interface Params {
  interval: '1m' | '5m' | '1d' | '1wk';
  period1: () => Date;
  normalizeToDay: boolean;
  includePrePost?: boolean;
}

const TIMEFRAME_PARAMS: Record<string, Params> = {
  '1D':  { interval: '1m',  period1: () => new Date(Date.now() - 2 * 86_400_000),        normalizeToDay: false, includePrePost: false },
  '5D':  { interval: '5m',  period1: () => new Date(Date.now() - 7 * 86_400_000),        normalizeToDay: false, includePrePost: false },
  '1M':  { interval: '1d',  period1: () => new Date(Date.now() - 31 * 86_400_000),       normalizeToDay: true },
  '3M':  { interval: '1d',  period1: () => new Date(Date.now() - 92 * 86_400_000),       normalizeToDay: true },
  'YTD': { interval: '1d',  period1: () => new Date(new Date().getFullYear(), 0, 1),     normalizeToDay: true },
  '1Y':  { interval: '1d',  period1: () => new Date(Date.now() - 366 * 86_400_000),      normalizeToDay: true },
  '5Y':  { interval: '1wk', period1: () => new Date(Date.now() - 5 * 366 * 86_400_000), normalizeToDay: true },
};

function toSeconds(date: Date, normalizeToDay: boolean): number {
  if (!normalizeToDay) return Math.floor(date.getTime() / 1000);
  const iso = date.toISOString().split('T')[0];
  return Math.floor(new Date(iso + 'T00:00:00Z').getTime() / 1000);
}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const timeframe = searchParams.get('timeframe') ?? '1D';

  if (!symbol) return NextResponse.json({ error: 'symbol required' }, { status: 400 });

  const params = TIMEFRAME_PARAMS[timeframe];
  if (!params) return NextResponse.json({ error: 'unknown timeframe' }, { status: 400 });

  const cacheKey = `${symbol}:${timeframe}`;
  const cached = serverCache.get(cacheKey);
  const ttl = CACHE_TTL_MS[timeframe] ?? 300_000;
  if (cached && Date.now() - cached.fetchedAt < ttl) {
    return NextResponse.json({ points: cached.points });
  }

  try {
    const raw = await yf.chart(
      symbol,
      { period1: params.period1(), interval: params.interval, includePrePost: params.includePrePost ?? true },
      { validateResult: false },
    ) as ChartResultArray;

    const seen = new Set<number>();
    const points: DataPoint[] = (raw.quotes ?? [])
      .filter((q) => q.close != null)
      .map((q) => ({ time: toSeconds(new Date(q.date), params.normalizeToDay), value: q.close as number }))
      .sort((a, b) => a.time - b.time)
      .filter((p) => { if (seen.has(p.time)) return false; seen.add(p.time); return true; });

    serverCache.set(cacheKey, { points, fetchedAt: Date.now() });
    return NextResponse.json({ points });
  } catch (err) {
    console.error('[market/history]', symbol, timeframe, err);
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 });
  }
}
