export interface SummaryCardItem {
  label: string
  value: string
  sub?: string
  trend?: string
  trendUp?: boolean
  progress?: number
}

interface SummaryCardsProps {
  items: SummaryCardItem[]
  cols?: 2 | 3 | 4
}

export default function SummaryCards({ items, cols = 4 }: SummaryCardsProps) {
  const colClass = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 xl:grid-cols-4' }[cols]

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6`}>
      {items.map((item) => (
        <div key={item.label} className="bg-white p-8 rounded-xl editorialShadow border border-slate-100 hover:border-primary/20 transition-all">
          <p className="text-slate-500 fontHeadline text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{item.label}</p>
          <div className="flex items-baseline justify-between">
            <h2 className="text-4xl fontHeadline font-black text-on-surface tracking-tighter">{item.value}</h2>
            {item.trend && (
              <span className="text-secondary font-bold text-xs bg-secondary-container/30 px-2 py-1 rounded">{item.trend}</span>
            )}
          </div>
          {item.sub && <p className="mt-4 text-slate-400 text-xs font-medium">{item.sub}</p>}
          {item.trendUp !== undefined && (
            <div className={`flex items-center mt-4 space-x-1 ${item.trendUp ? 'text-secondary' : 'text-primary'}`}>
              <span className="material-symbols-outlined text-sm">{item.trendUp ? 'trending_up' : 'trending_down'}</span>
              <span className="text-xs font-extrabold uppercase">{item.sub}</span>
            </div>
          )}
          {item.progress !== undefined && (
            <div className="mt-6 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-700" style={{ width: `${item.progress}%` }} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
