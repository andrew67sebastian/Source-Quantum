'use client';

import { useState } from 'react';
import { COMMODITIES_INDICES } from '@/config/marketIndices';
import { DEFAULT_TIMEZONE, TIMEZONE_OPTIONS } from '@/config/timezone';
import { PriceChart } from './PriceChart';

const COMMODITIES = COMMODITIES_INDICES.slice(0, 4);
const BONDS = COMMODITIES_INDICES.slice(4);

const TABS = ['Commodities', 'Bonds'] as const;

export function BondsCommodities() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-white/10">
        <div className="flex">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i as 0 | 1)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-2 transition-colors border-b-2 ${
                i === activeTab
                  ? 'border-white/60 text-white/80'
                  : 'border-transparent text-white/25 hover:text-white/50'
              }`}
            >
              {tab}
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

      {activeTab === 0 ? (
        <div className="grid grid-cols-2 border border-white/10">
          {COMMODITIES.map((item, i) => (
            <div
              key={item.symbol}
              /* border-r separates columns; border-b separates the two rows; hover:border-orange-500/60 highlights the cell border on hover */
              className={`group transition-colors hover:bg-orange-500/5 ${i % 2 === 0 ? 'border-r border-white/30' : ''} ${i < 2 ? 'border-b border-white/30' : ''}`}
            >
              <PriceChart
                symbol={item.symbol}
                label={item.label}
                color={item.color}
                timezone={timezone}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 border border-white/10">
          {BONDS.map((item, i) => (
            <div
              key={item.symbol}
              /* border-r separates the two bond cells; hover:bg-orange-500/5 is the orange cell highlight on hover */
              className={`transition-colors hover:bg-orange-500/5 ${i === 0 ? 'border-r border-white/10 hover:border-r-orange-500/60' : ''}`}
            >
              <PriceChart
                symbol={item.symbol}
                label={item.label}
                color={item.color}
                timezone={timezone}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BondsCommodities;
