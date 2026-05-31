'use client'

import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import React, { memo } from 'react';

interface TradingViewWidgetProps {
    title?: string;
    scriptURL: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
}

function TradingViewWidget({ title, scriptURL, config, height = 600, className = '' }: TradingViewWidgetProps) {
  const containerRef = useTradingViewWidget(scriptURL, config, height);
  const containerClassName = `tradingview-widget-container${className ? ` ${className}` : ''}`;

  return (
    <div className='w-full'>
        {title && <h3 className='font-display-serif text-2xl text-foreground mb-5'>{title}</h3>}
        <div className={containerClassName} ref={containerRef}>
          <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
        </div>
    </div>
  );
}

export default memo(TradingViewWidget);
