interface Props {
  value: number;
  className?: string;
}

export function ChangeIndicator({ value, className = '' }: Props) {
  const isPositive = value >= 0;
  const color = isPositive
    ? 'text-[var(--color-market-positive,#1E8E5A)]'
    : 'text-[var(--color-market-negative,#D24545)]';
  const sign = isPositive ? '+' : '';

  return (
    <span className={`font-mono text-xs font-semibold ${color} ${className}`}>
      {sign}{value.toFixed(2)}%
    </span>
  );
}
