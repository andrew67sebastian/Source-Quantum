import { AltHeader } from '@/components/header-alt'
import React from 'react'

const MacroPage = () => {
  return (
    <div>
        <div>
            <AltHeader />
        </div>
        <div>
            <script type="module" src="https://widgets.tradingview-widget.com/w/en/tv-mini-chart.js"></script>

            <tv-mini-chart symbol="NASDAQ:AAPL"></tv-mini-chart>
        </div>

    </div>
  )
}

export default MacroPage
