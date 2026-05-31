'use client';

import { useState, useRef, useCallback } from 'react';
import type { FinanceApiResponse, TickerRow } from '@/lib/finance-types';
import { REFRESH_INTERVAL_MS, formatPrice, formatChange, formatChangePct } from '@/lib/finance-config';

function changeColor(changePct: number | null): string {
  if (changePct === null) return 'text-white/40';
  if (changePct > 0) return 'text-green-400';
  if (changePct < 0) return 'text-red-400';
  return 'text-white/60';
}

function Row({ row }: { row: TickerRow }) {
  const cc = changeColor(row.changePct);
  return (
    <tr className="border-t border-white/8 hover:bg-white/4 transition-colors">
      <td className="px-3 py-2 font-mono text-xs font-bold text-white tracking-wider whitespace-nowrap">
        {row.symbol}
      </td>
      <td className="max-w-[120px] px-3 py-2 text-xs text-foreground/40 font-mono whitespace-nowrap overflow-hidden text-ellipsis">
        {row.name}
      </td>
      <td className="px-3 py-2 font-mono text-xs text-right text-white/80 whitespace-nowrap">
        {formatPrice(row.price)}
      </td>
      <td className={`px-3 py-2 font-mono text-xs text-right whitespace-nowrap ${cc}`}>
        {formatChange(row.change)}
      </td>
      <td className={`px-3 py-2 font-mono text-xs text-right font-semibold whitespace-nowrap ${cc}`}>
        {formatChangePct(row.changePct)}
      </td>
    </tr>
  );
}

export function FinanceTable() {
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<FinanceApiResponse>({ rows: [], lastUpdated: null });
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quotes');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: FinanceApiResponse = await res.json();
      setData(json);
    } catch (err) {
      console.error('[FinanceTable] fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleStart() {
    if (running) return;
    setRunning(true);
    fetchData();
    intervalRef.current = setInterval(fetchData, REFRESH_INTERVAL_MS);
  }

  function handleStop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  }

  const lastTime = data.lastUpdated
    ? new Date(data.lastUpdated).toLocaleTimeString()
    : null;

  return (
    <div className="w-full border border-white/5 bg-terminal-surface backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/90">
            {running ? (loading ? 'Updating…' : 'Live') : 'Paused'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lastTime && (
            <span className="font-mono text-[10px] text-white/25">{lastTime}</span>
          )}
          <button
            onClick={running ? handleStop : handleStart}
            className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 border transition-colors ${
              running
                ? 'border-red-400/40 text-red-400 hover:bg-red-400/10'
                : 'border-green-400/40 text-green-400 hover:bg-green-400/10'
            }`}
          >
            {running ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-widest text-white/25 whitespace-nowrap">
              Ticker
            </th>
            <th className="px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-widest text-white/25 whitespace-nowrap">
              Name
            </th>
            <th className="px-3 py-1.5 text-right font-mono text-[10px] uppercase tracking-widest text-white/25 whitespace-nowrap">
              Price
            </th>
            <th className="px-3 py-1.5 text-right font-mono text-[10px] uppercase tracking-widest text-white/25 whitespace-nowrap">
              Chg
            </th>
            <th className="px-3 py-1.5 text-right font-mono text-[10px] uppercase tracking-widest text-white/25 whitespace-nowrap">
              Chg%
            </th>
          </tr>
        </thead>
        <tbody>
          {data.rows.length > 0 ? (
            data.rows.map((row) => <Row key={row.symbol} row={row} />)
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-6 text-center font-mono text-[10px] text-white/20 uppercase tracking-widest"
              >
                Press Start to load
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-white/5">
        <span className="font-mono text-[9px] text-white/15 italic">
          Data delayed ~15 min
        </span>
        {data.error && (
          <span className="ml-2 font-mono text-[9px] text-yellow-400/60">
            ⚠ {data.error}
          </span>
        )}
      </div>
    </div>
  );
}
