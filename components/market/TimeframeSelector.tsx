import { TIMEFRAMES } from '@/config/timeframes';

interface Props {
  selected: string;
  onChange: (timeframe: string) => void;
  className?: string;
}

export function TimeframeSelector({ selected, onChange, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-0.5 px-3 py-1.5 border-t border-white/10 ${className}`}>
      {TIMEFRAMES.map(({ label, key }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`font-mono text-[10px] px-2 py-0.5 transition-colors ${
            selected === key
              ? 'text-white/90 bg-white/10'
              : 'text-white/30 hover:text-white/60'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
