import type { MediaSummaryRow } from '@marketingkpi/core'

interface MediaPerformanceTableProps {
  rows: MediaSummaryRow[];
}

export default function MediaPerformanceTable({ rows }: MediaPerformanceTableProps) {
  return (
    <section className="bg-white rounded-xl editorialShadow border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="text-xl fontHeadline font-black text-on-surface">광고 매체별 집행 현황</h3>
          <p className="text-slate-500 text-sm mt-1 font-medium">각 매체 및 상품별 세부 성과 데이터를 분석합니다.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">브랜드</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">매체</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">광고 상품</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">광고비 (VAT포함)</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">노출수</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">클릭수</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">CTR</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">CPM</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">CPC</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">매체구매</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">구매 CVR</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isTotal = row.brand === "총계";
              return (
                <tr 
                  key={idx} 
                  className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors ${isTotal ? 'bg-primary/5 font-bold' : ''}`}
                >
                  <td className="px-6 py-4 text-xs text-slate-600 font-bold whitespace-nowrap">{row.brand}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 font-semibold whitespace-nowrap">{row.media}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">{row.product}</td>
                  <td className="px-6 py-4 text-xs text-slate-900 font-bold text-right whitespace-nowrap">{row.spend}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.impressions}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.clicks}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.ctr}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.cpm}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.cpc}</td>
                  <td className="px-6 py-4 text-xs text-slate-900 font-bold text-right whitespace-nowrap">{row.purchases}</td>
                  <td className="px-6 py-4 text-[11px] text-right whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md font-black ${isTotal ? 'text-primary' : 'bg-slate-100 text-slate-600'}`}>
                      {row.cvr}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
