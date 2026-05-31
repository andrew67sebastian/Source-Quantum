'use client';

import { TickMarkType } from 'lightweight-charts';
import type { DeepPartial, ChartOptions, LineSeriesPartialOptions, Time } from 'lightweight-charts';

export const POSITIVE_COLOR = '#1E8E5A';
export const NEGATIVE_COLOR = '#D24545';

export const DEFAULT_SERIES_OPTIONS: LineSeriesPartialOptions = {
  color: POSITIVE_COLOR,
  lineWidth: 1,
  crosshairMarkerVisible: true,
  crosshairMarkerRadius: 4,
  priceLineVisible: false,
  lastValueVisible: false,
};

export function createChartOptions(timezone: string): DeepPartial<ChartOptions> {
  return {
    layout: {
      background: { color: '#14171D' },
      textColor: '#767880',
      fontFamily: 'var(--font-geist-mono), monospace',
      fontSize: 11,
    },
    grid: {
      vertLines: { color: '#22262E' },
      horzLines: { color: '#22262E' },
    },
    crosshair: {
      vertLine: { color: '#B7B6B0', labelBackgroundColor: '#22262E' },
      horzLine: { color: '#B7B6B0', labelBackgroundColor: '#22262E' },
    },
    timeScale: {
      borderColor: '#22262E',
      timeVisible: true,
      secondsVisible: false,
      tickMarkFormatter: (time: Time, type: TickMarkType) => {
        if (typeof time !== 'number') return null;
        const d = new Date(time * 1000);
        switch (type) {
          case TickMarkType.Year:
            return d.toLocaleDateString('en-US', { timeZone: timezone, year: 'numeric' });
          case TickMarkType.Month:
            return d.toLocaleDateString('en-US', { timeZone: timezone, month: 'short', year: '2-digit' });
          case TickMarkType.DayOfMonth:
            return d.toLocaleDateString('en-US', { timeZone: timezone, month: 'short', day: 'numeric' });
          case TickMarkType.Time:
            return d.toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false });
          default:
            return null;
        }
      },
    },
    rightPriceScale: {
      borderColor: '#22262E',
    },
    localization: {
      timeFormatter: (time: Time) => {
        if (typeof time !== 'number') return '';
        const d = new Date(time * 1000);
        return d.toLocaleString('en-US', {
          timeZone: timezone,
          month: 'short', day: 'numeric', year: '2-digit',
          hour: '2-digit', minute: '2-digit', hour12: false,
        });
      },
    },
    handleScroll: true,
    handleScale: true,
  };
}
