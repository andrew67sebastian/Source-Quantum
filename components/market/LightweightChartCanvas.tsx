'use client';

import { useEffect, useRef } from 'react';
import { createChart, LineSeries } from 'lightweight-charts';
import type { IChartApi, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { createChartOptions, DEFAULT_SERIES_OPTIONS } from '@/config/chartConfig';
import { DEFAULT_TIMEZONE } from '@/config/timezone';
import type { DataPoint } from '@/hooks/useHistoricalData';

interface Props {
  data: DataPoint[];
  timezone?: string;
  color?: string;
  className?: string;
}

export function LightweightChartCanvas({ data, timezone = DEFAULT_TIMEZONE, color, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      ...createChartOptions(timezone),
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });
    const series = chart.addSeries(LineSeries, DEFAULT_SERIES_OPTIONS);
    chartRef.current = chart;
    seriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.applyOptions(createChartOptions(timezone));
  }, [timezone]);

  useEffect(() => {
    if (!seriesRef.current) return;
    seriesRef.current.applyOptions({ color: color ?? DEFAULT_SERIES_OPTIONS.color });
  }, [color]);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;
    seriesRef.current.setData(data as { time: UTCTimestamp; value: number }[]);
    if (data.length > 0) chartRef.current.timeScale().fitContent();
  }, [data]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: 'var(--chart-height, 220px)' }}
    />
  );
}
