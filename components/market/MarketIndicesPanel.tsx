'use client';

import { useState } from 'react';
import { MARKET_INDICES } from '@/config/marketIndices';
import { DEFAULT_TIMEZONE, TIMEZONE_OPTIONS } from '@/config/timezone';
import { PriceChart } from './PriceChart';

export function MarketIndicesPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const active = MARKET_INDICES[activeTab];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-white/10">
        <div className="flex">
          {MARKET_INDICES.map((index, i) => (
            <button
              key={index.symbol}
              onClick={() => setActiveTab(i)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-2 transition-colors border-b-2 ${
                i === activeTab
                  ? 'border-white/60 text-white/80'
                  : 'border-transparent text-white/25 hover:text-white/50'
              }`}
            >
              {index.label}
            </button>
          ))}
        </div>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="mr-2 font-mono text-[10px] uppercase tracking-widest bg-transparent text-white/30 border-0 outline-none cursor-pointer hover:text-white/60 transition-colors"
        >
          {TIMEZONE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#14171D] text-white/70">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {/* hover:bg-orange-500/5 — orange highlight on the chart area only, tabs excluded */}
      <div className="hover:bg-orange-500/5 transition-colors">
        <PriceChart
          key={active.symbol}
          symbol={active.symbol}
          label={active.label}
          color={active.color}
          timezone={timezone}
        />
      </div>
    </div>
  );
}
