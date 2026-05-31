'use client';

import { useEffect, useRef, useState } from 'react';
import { ChangeIndicator } from './ChangeIndicator';

interface FxQuote {
  price: number;
  change: number;
  changePct: number;
}

interface FxData {
  dxy: FxQuote;
  usdjpy: FxQuote;
  gbpusd: FxQuote;
  audusd: FxQuote;
}

const SLIDES = [
  { key: 'dxy',    label: 'DXY',     sublabel: 'US Dollar Index', decimals: 2 },
  { key: 'usdjpy', label: 'USD/JPY', sublabel: 'Dollar Yen',      decimals: 3 },
  { key: 'gbpusd', label: 'GBP/USD', sublabel: 'Cable',           decimals: 4 },
  { key: 'audusd', label: 'AUD/USD', sublabel: 'Aussie',          decimals: 4 },
] as const;

function FxCell({
  label,
  sublabel,
  quote,
  decimals,
  loading,
  border,
}: {
  label: string;
  sublabel: string;
  quote: FxQuote | undefined;
  decimals: number;
  loading: boolean;
  border?: boolean;
}) {
  const isPositive = (quote?.changePct ?? 0) >= 0;
  return (
    <div className={`flex-shrink-0 flex flex-col justify-center gap-1 px-5 py-3 ${border ? 'border-l border-white/5' : ''}`}>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">{label}</span>
        <span className="font-mono text-[9px] text-white/15">·</span>
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">{sublabel}</span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-2xl font-semibold tracking-tight text-white/90">
          {loading ? '—' : (quote?.price?.toFixed(decimals) ?? '—')}
        </span>
        {!loading && quote && (
          <div className="flex items-baseline gap-1.5">
            <ChangeIndicator value={quote.changePct} className="text-sm" />
            <span className={`font-mono text-xs tabular-nums opacity-50 ${isPositive ? 'text-[var(--color-market-positive,#1E8E5A)]' : 'text-[var(--color-market-negative,#D24545)]'}`}>
              ({isPositive ? '+' : ''}{quote.change.toFixed(decimals)})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

const STEP = 200;

export function DXYRibbon() {
  const [data, setData] = useState<FxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [maxOff, setMaxOff] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  function measure() {
    if (!containerRef.current || !trackRef.current) return;
    setMaxOff(Math.max(0, trackRef.current.scrollWidth - containerRef.current.clientWidth));
  }

  function prev() {
    setOffset((o) => Math.max(0, o - STEP));
  }

  function next() {
    setOffset((o) => Math.min(maxOff, o + STEP));
  }

  async function fetchData() {
    try {
      const res = await fetch('/api/dxy');
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
    } catch {}
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { measure(); }, [loading]);

  const canPrev = offset > 0;
  const canNext = offset < maxOff;

  return (
    <div className="relative py-1 flex items-center">
      <div ref={containerRef} className="overflow-hidden w-full">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {SLIDES.map((s, i) => (
            <FxCell
              key={s.key}
              label={s.label}
              sublabel={s.sublabel}
              quote={data?.[s.key]}
              decimals={s.decimals}
              loading={loading}
              border={i > 0}
            />
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className={`absolute left-0 top-0 h-full px-2 flex items-center transition-all ${canPrev ? 'text-white/30 hover:text-white/70' : 'text-white/0 pointer-events-none'}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M7.5 2L4 6l3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        onClick={next}
        className={`absolute right-0 top-0 h-full px-2 flex items-center transition-all ${canNext ? 'text-white/30 hover:text-white/70' : 'text-white/0 pointer-events-none'}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2L8 6l-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
