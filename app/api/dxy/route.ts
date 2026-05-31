import 'server-only';
import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

const yf = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

const CACHE_TTL = 60_000;

interface FxQuote { price: number; change: number; changePct: number; }
interface CachedData {
  dxy: FxQuote;
  usdjpy: FxQuote;
  gbpusd: FxQuote;
  audusd: FxQuote;
  fetchedAt: number;
}
let cached: CachedData | null = null;

export const dynamic = 'force-dynamic';

async function fetchQuote(symbol: string): Promise<FxQuote> {
  const result = await yf.quote(
    symbol,
    { fields: ['regularMarketPrice', 'regularMarketChange', 'regularMarketChangePercent'] },
    { validateResult: false },
  );
  return {
    price: result.regularMarketPrice ?? 0,
    change: result.regularMarketChange ?? 0,
    changePct: result.regularMarketChangePercent ?? 0,
  };
}

export async function GET() {
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) {
    return NextResponse.json(cached);
  }
  try {
    const [dxy, usdjpy, gbpusd, audusd] = await Promise.all([
      fetchQuote('DX-Y.NYB'),
      fetchQuote('USDJPY=X'),
      fetchQuote('GBPUSD=X'),
      fetchQuote('AUDUSD=X'),
    ]);
    const data: CachedData = { dxy, usdjpy, gbpusd, audusd, fetchedAt: Date.now() };
    cached = data;
    return NextResponse.json(data);
  } catch (err) {
    console.error('[api/dxy]', err);
    return NextResponse.json({ error: 'fetch failed' }, { status: 500 });
  }
}
