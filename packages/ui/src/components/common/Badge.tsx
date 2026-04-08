interface ThresholdColor {
  min: number
  className: string
}

interface BadgeProps {
  value: number
  format?: (v: number) => string
  thresholds?: ThresholdColor[]
  emptyText?: string
}

const defaultFormat = (v: number) => `${v.toFixed(2)}%`

export default function Badge({ value, format = defaultFormat, thresholds = [], emptyText = '-' }: BadgeProps) {
  if (value === 0) return <span className="text-slate-400">{emptyText}</span>

  const matched = [...thresholds].sort((a, b) => b.min - a.min).find((t) => value >= t.min)
  const className = matched?.className ?? 'text-slate-600'

  return <span className={className}>{format(value)}</span>
}
