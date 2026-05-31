'use client';

import { useState, useEffect, useRef } from 'react';
import type { FinanceApiResponse } from '@/lib/finance-types';
import { MAX_HISTORY_POINTS } from '@/config/timeframes';

export interface DataPoint {
  time: number;
  value: number;
}

interface SymbolState {
  price: number;
  changePercent: number;
  history: DataPoint[];
  isLoading: boolean;
  isError: boolean;
}

type Listener = (state: SymbolState) => void;

interface RegistryEntry {
  state: SymbolState;
  listeners: Set<Listener>;
}

const registry = new Map<string, RegistryEntry>();
let intervalId: ReturnType<typeof setInterval> | null = null;
let subscriberCount = 0;

const POLL_INTERVAL_MS = 30_000;

function getOrCreate(symbol: string): RegistryEntry {
  if (!registry.has(symbol)) {
    registry.set(symbol, {
      state: { price: 0, changePercent: 0, history: [], isLoading: true, isError: false },
      listeners: new Set(),
    });
  }
  return registry.get(symbol)!;
}

function notify(symbol: string) {
  const entry = registry.get(symbol);
  if (!entry) return;
  entry.listeners.forEach((fn) => fn({ ...entry.state, history: [...entry.state.history] }));
}

async function fetchAll() {
  let data: FinanceApiResponse;
  try {
    const res = await fetch('/api/quotes');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch {
    registry.forEach((entry, symbol) => {
      if (entry.state.isLoading) {
        entry.state = { ...entry.state, isLoading: false, isError: true };
        notify(symbol);
      }
    });
    return;
  }

  const now = Math.floor(Date.now() / 1000);

  for (const row of data.rows) {
    if (!registry.has(row.symbol)) continue;
    const entry = registry.get(row.symbol)!;
    if (row.price === null) continue;

    const newPoint: DataPoint = { time: now, value: row.price };
    const history = [...entry.state.history];

    if (history.length > 0 && history[history.length - 1].time === now) {
      history[history.length - 1] = newPoint;
    } else {
      history.push(newPoint);
      if (history.length > MAX_HISTORY_POINTS) history.shift();
    }

    entry.state = {
      price: row.price,
      changePercent: row.changePct ?? 0,
      history,
      isLoading: false,
      isError: false,
    };
    notify(row.symbol);
  }
}

function startPolling() {
  fetchAll();
  intervalId = setInterval(fetchAll, POLL_INTERVAL_MS);
}

function stopPolling() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function useMarketData(symbol: string) {
  const entry = getOrCreate(symbol);
  const [state, setState] = useState<SymbolState>(() => ({
    ...entry.state,
    history: [...entry.state.history],
  }));

  const listenerRef = useRef<Listener | null>(null);

  useEffect(() => {
    const entry = getOrCreate(symbol);
    const listener: Listener = (s) => setState(s);
    listenerRef.current = listener;
    entry.listeners.add(listener);

    subscriberCount++;
    if (subscriberCount === 1) startPolling();

    return () => {
      entry.listeners.delete(listener);
      subscriberCount--;
      if (subscriberCount === 0) stopPolling();
    };
  }, [symbol]);

  return state;
}
