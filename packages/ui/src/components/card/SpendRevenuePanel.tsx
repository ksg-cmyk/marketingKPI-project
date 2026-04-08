import type { SpendRevenueBarData } from "@marketingkpi/core";

interface SpendRevenuePanelProps {
  barData: SpendRevenueBarData[];
}

export default function SpendRevenuePanel({ barData = [] }: SpendRevenuePanelProps) {
  return (
    <div className="lg:col-span-4 bg-slate-50 p-8 rounded-xl border border-slate-200 flex flex-col">
      <h3 className="text-xl fontHeadline font-black text-on-surface mb-10">광고비 대비 매출</h3>

      <div className="space-y-8 flex-1">
        {(barData || []).map((item) => (
          <div key={item.label} className="space-y-3">
            <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider">
              <span>{item.label}</span>
              <span className="text-primary">{item.value}</span>
            </div>
            <div className="h-8 w-full bg-white rounded-lg border border-slate-200 overflow-hidden flex">
              <div className="h-full bg-primary flex-shrink-0 transition-all duration-700" style={{ width: item.spendWidth }} />
              <div className="h-full bg-secondary-container flex-shrink-0 transition-all duration-700" style={{ width: item.revenueWidth }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-white rounded-xl border border-primary/10 shadow-sm">
        <div className="flex items-center space-x-3 mb-3">
          <span className="materialSymbolsOutlined text-primary text-xl">insights</span>
          <span className="text-xs font-black text-primary uppercase tracking-widest">효율성 인사이트</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          3월 효율이 3,013%로 연내 최고치를 기록했습니다. 4분기 예산의 15%를 성수기 시즌으로 재배정하는 것을 권장합니다.
        </p>
      </div>
    </div>
  )
}
