import type { RoiDetailRow } from "@marketingkpi/types";

interface RoiProfitTableProps {
  rows: RoiDetailRow[];
}

export default function RoiProfitTable({ rows }: RoiProfitTableProps) {
  return (
    <section className="bg-white rounded-xl editorialShadow border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-primary/10 flex justify-between items-center bg-primary/5">
        <div>
          <h3 className="text-xl fontHeadline font-black text-primary uppercase">ROI 및 최종 수익 분석 장부</h3>
          <p className="text-slate-500 text-sm mt-1 font-medium italic">매출액 대비 원가, 물류비, PG수수료를 제한 최종 경영 지표입니다.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">월</th>
              <th className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-widest whitespace-nowrap text-right">매출액</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">매출원가</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">원가율</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">물류비용(5%)</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">PG수수료(3%)</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">광고비(VAT포함)</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">ERP ROAS</th>
              <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest whitespace-nowrap text-right bg-secondary/5 font-black">수익 (EBITDA)</th>
              <th className="px-6 py-4 text-[10px] font-black text-secondary uppercase tracking-widest whitespace-nowrap text-right">종합 ROI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const isTotal = row.month === "총계" || row.month === "평균";
              return (
                <tr 
                  key={idx} 
                  className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors ${isTotal ? 'bg-primary/10 font-bold border-t-2 border-primary/20' : ''}`}
                >
                  <td className="px-6 py-4 text-xs text-slate-900 font-black whitespace-nowrap">{row.month}</td>
                  <td className="px-6 py-4 text-[13px] text-primary font-black text-right whitespace-nowrap">{row.revenue}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.cogs}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap italic">{row.cogsRate}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.logistics}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.pgFee}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 text-right whitespace-nowrap">{row.spend}</td>
                  <td className="px-6 py-4 text-xs text-slate-900 font-bold text-right whitespace-nowrap">{row.erpRoas}</td>
                  <td className="px-6 py-4 text-[14px] text-secondary font-black text-right whitespace-nowrap bg-secondary/5">{row.profit}</td>
                  <td className="px-6 py-4 text-xs font-black text-right whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md ${isTotal ? 'text-secondary' : 'bg-secondary/10 text-secondary'}`}>
                      {row.roi}
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
