'use client';

import { useState } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { useHistoricalData } from '@/hooks/useHistoricalData';
import { DEFAULT_TIMEFRAME } from '@/config/timeframes';
import { POSITIVE_COLOR, NEGATIVE_COLOR } from '@/config/chartConfig';
import { DEFAULT_TIMEZONE } from '@/config/timezone';
import { ChartHeader } from './ChartHeader';
import { LightweightChartCanvas } from './LightweightChartCanvas';
import { TimeframeSelector } from './TimeframeSelector';

interface Props {
  symbol: string;
  label: string;
  color?: string;
  timezone?: string;
  defaultTimeframe?: string;
  className?: string;
}

export function PriceChart({ symbol, label, color, timezone = DEFAULT_TIMEZONE, defaultTimeframe, className = '' }: Props) {
  const [timeframe, setTimeframe] = useState(defaultTimeframe ?? DEFAULT_TIMEFRAME);

  const { price, isLoading: priceLoading } = useMarketData(symbol);
  const { points, changePercent, isLoading: histLoading, isError } = useHistoricalData(symbol, timeframe);

  const lineColor = color ?? (changePercent >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR);

  return (
    <div className={`flex flex-col ${className}`}>
      <ChartHeader
        label={label}
        price={price}
        changePercent={changePercent}
        isLoading={priceLoading && histLoading}
      />
      {isError ? (
        <div
          className="flex items-center justify-center font-mono text-[10px] text-white/20 uppercase tracking-widest"
          style={{ height: 'var(--chart-height, 220px)' }}
        >
          Data unavailable
        </div>
      ) : histLoading ? (
        <div
          className="flex items-center justify-center font-mono text-[10px] text-white/20 uppercase tracking-widest animate-pulse"
          style={{ height: 'var(--chart-height, 220px)' }}
        >
          Loading…
        </div>
      ) : (
        <LightweightChartCanvas
          data={points}
          timezone={timezone}
          color={lineColor}
        />
      )}
      <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
    </div>
  );
}
