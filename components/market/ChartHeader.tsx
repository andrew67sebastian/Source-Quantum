import { ChangeIndicator } from './ChangeIndicator';

interface Props {
  label: string;
  price: number;
  changePercent: number;
  isLoading?: boolean;
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function ChartHeader({ label, price, changePercent, isLoading }: Props) {
  return (
    <div className="flex items-baseline justify-between px-3 py-2">
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      {isLoading ? (
        <div className="flex items-baseline gap-2">
          <div className="h-4 w-20 bg-white/10 animate-pulse rounded" />
          <div className="h-3 w-12 bg-white/10 animate-pulse rounded" />
        </div>
      ) : (
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-sm font-bold text-white/90">
            {priceFormatter.format(price)}
          </span>
          <ChangeIndicator value={changePercent} />
        </div>
      )}
    </div>
  );
}
