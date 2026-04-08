const formatPct = (v: number) => `${v.toFixed(2)}%`

export default function CtrBadge({ ctr }: { ctr: number }) {
  const color = ctr >= 40 ? "text-primary font-black" : "text-slate-600"
  return <span className={color}>{formatPct(ctr)}</span>
}
