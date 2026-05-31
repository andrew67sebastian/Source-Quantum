'use client';

import { useState, useEffect, useRef } from 'react';

export interface DataPoint { time: number; value: number; }

interface HistoricalState {
  points: DataPoint[];
  changePercent: number;
  isLoading: boolean;
  isError: boolean;
}

interface CacheEntry { state: HistoricalState; fetchedAt: number; }
const clientCache = new Map<string, CacheEntry>();

const CLIENT_TTL_MS: Record<string, number> = {
  '1D':  60_000,
  '5D':  180_000,
  '1M':  1_800_000,
  '3M':  1_800_000,
  'YTD': 1_800_000,
  '1Y':  1_800_000,
  '5Y':  3_600_000,
};

async function loadHistory(symbol: string, timeframe: string): Promise<HistoricalState> {
  const res = await fetch(
    `/api/market/history?symbol=${encodeURIComponent(symbol)}&timeframe=${encodeURIComponent(timeframe)}`,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { points } = await res.json() as { points: DataPoint[] };
  const first = points[0]?.value;
  const last = points[points.length - 1]?.value;
  const changePercent = first != null && last != null && first !== 0
    ? ((last - first) / first) * 100
    : 0;
  return { points, changePercent, isLoading: false, isError: false };
}

export function useHistoricalData(symbol: string, timeframe: string): HistoricalState {
  const cacheKey = `${symbol}:${timeframe}`;
  const ttl = CLIENT_TTL_MS[timeframe] ?? 300_000;

  const getCached = (): HistoricalState | null => {
    const entry = clientCache.get(cacheKey);
    if (entry && Date.now() - entry.fetchedAt < ttl) return entry.state;
    return null;
  };

  const [state, setState] = useState<HistoricalState>(() => {
    const cached = getCached();
    return cached ?? { points: [], changePercent: 0, isLoading: true, isError: false };
  });

  const activeKey = useRef(cacheKey);
  activeKey.current = cacheKey;

  useEffect(() => {
    const cached = getCached();
    if (cached) { setState(cached); return; }

    setState({ points: [], changePercent: 0, isLoading: true, isError: false });

    loadHistory(symbol, timeframe)
      .then((result) => {
        clientCache.set(cacheKey, { state: result, fetchedAt: Date.now() });
        if (activeKey.current === cacheKey) setState(result);
      })
      .catch(() => {
        if (activeKey.current === cacheKey) {
          setState({ points: [], changePercent: 0, isLoading: false, isError: true });
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, timeframe]);

  return state;
}
