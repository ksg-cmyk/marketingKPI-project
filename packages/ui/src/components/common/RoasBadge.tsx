const formatPct = (v: number) => `${v.toFixed(2)}%`

export default function RoasBadge({ roas }: { roas: number }) {
  if (roas === 0) return <span className="text-slate-400">-</span>
  const color = roas >= 1000 ? "text-primary font-black" : roas >= 500 ? "text-secondary font-bold" : "text-slate-600"
  return <span className={color}>{formatPct(roas)}</span>
}
