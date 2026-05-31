import { AltHeader } from '@/components/header-alt'
import { FinanceTable } from '@/components/FinanceTable'
import TradingViewWidget from '@/components/tradingviewwidget'
import {
  TIMELINE_WIDGET_CONFIG,
  EVENTS_WIDGET_CONFIG,
} from '@/lib/constants'
import { MarketIndicesPanel } from '@/components/market/MarketIndicesPanel'
import { HeatmapPanel } from '@/components/market/HeatmapPanel'
import { ReactNode } from 'react'
import BondsCommodities from '@/components/market/BondsCommodities'
import { DXYRibbon } from '@/components/market/DXYRibbon'



function Panel({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className='bg-terminal-surface border border-white/5'>
      {label && (
        <div className='px-3 py-2 border-b border-white/5 font-sans font-bold text-[10px] uppercase tracking-widest text-white/90'>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

export default function MentatPage() {
  return (
    <div className='w-full bg-terminal-bg h-[calc(100dvh+50px)] overflow-x-hidden flex flex-col'>
      <AltHeader />
      <div className='flex flex-row gap-3 w-full px-4 py-6 flex-1 min-h-0'>

        {/* Column 1 — Live quotes + Screener */}
        <div className='flex flex-col md:gap-3 gap-auto justify-between w-[40%] max-h-full shrink-0 overflow-x-hidden'>
          <Panel label="Live Quotes">
            <FinanceTable />
          </Panel>

          <Panel label="Heatmap">
            <HeatmapPanel />
          </Panel>
        </div>

        {/* Column 2 — Market indices + Bonds & Commodities */}
        <div className='flex-1 tv-news flex max-w-full flex-col md:gap-3 gap-auto justify-between min-w-0 overflow-x-clip'>
          <Panel label="Market Indices">
            <MarketIndicesPanel />
          </Panel>
          <div className=''>
          <Panel label="Bonds & Commodities">
            <BondsCommodities />
          </Panel>
          </div>
          <div>
          <Panel>
            <DXYRibbon />
          </Panel>
          </div>
        </div>

        {/* Column 3 — News feed + Economic calendar */}
        <div className='flex flex-col md:gap-3 gap-auto justify-between w-[400px] h-full shrink-0 tv-news'>
          <Panel label="Market News">
            <TradingViewWidget
              scriptURL="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
              config={TIMELINE_WIDGET_CONFIG}
              className="custom-news-feed"
            />
          </Panel>
          <Panel label="Economic Calendar">
            <TradingViewWidget
              scriptURL="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
              config={EVENTS_WIDGET_CONFIG}
              className="custom-events-feed"
            />
          </Panel>
        </div>

      </div>
    </div>
  )
}
