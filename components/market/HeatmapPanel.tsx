'use client'

import React, { useState } from 'react'
import TradingViewWidget from '@/components/tradingviewwidget'
import { SECTORS_HEATMAP_CONFIG, CURRENCY_HEATMAP_CONFIG } from '@/lib/constants'

const TABS = [
  {
    label: 'S&P 500',
    scriptURL: 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js',
    config: SECTORS_HEATMAP_CONFIG,
    className: 'custom-heatmap-sectors',
  },
  {
    label: 'Forex',
    scriptURL: 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js',
    config: CURRENCY_HEATMAP_CONFIG,
    className: 'custom-heatmap-currency',
  },
]

export function HeatmapPanel() {
  const [activeTab, setActiveTab] = useState(0)
  const active = TABS[activeTab]

  return (
    <div>
      <div className="flex">
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`font-mono text-[10px] uppercase tracking-widest px-3 py-2 transition-colors border-b-2 ${
              i === activeTab
                ? 'border-white/60 text-white/80'
                : 'border-transparent text-white/25 hover:text-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TradingViewWidget
        scriptURL={active.scriptURL}
        config={active.config}
        className={active.className}
      />
    </div>
  )
}
