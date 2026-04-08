const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]

interface RoasTrendChartProps {
  data?: number[]; // [ROAS1, ROAS2, ..., ROAS12]
}

export default function RoasTrendChart({ data = [] }: RoasTrendChartProps) {
  // 데이터가 없거나 부족할 때를 대비한 기본값 ([0, 0, ...])
  const chartData = data.length >= 12 ? data.slice(0, 12) : [...data, ...Array(12 - data.length).fill(0)];
  
  // 최댓값과 최고월 계산
  const maxVal = Math.max(...chartData, 1);
  const peakIndex = chartData.indexOf(maxVal);
  const peakMonth = months[peakIndex];

  // SVG 경로 생성 (1000x300 뷰박스 기준)
  const points = chartData.map((val, i) => {
    const x = (i / 11) * 1000;
    const y = 300 - (val / (maxVal * 1.2)) * 300; // 여백을 위해 maxVal * 1.2로 스케일링
    return `${x},${y}`;
  });

  const linePath = `M${points.join(' L')}`;
  const areaPath = `${linePath} L1000,300 L0,300 Z`;

  return (
    <div className="lg:col-span-12 bg-white p-8 rounded-xl editorialShadow border border-slate-100 flex flex-col min-h-[500px]">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h3 className="text-2xl fontHeadline font-black text-on-surface mb-1">월별 ROAS 추이</h3>
          <p className="text-slate-400 text-sm font-medium">2025 회계연도 성과 추적</p>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-lg border border-primary/10 flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-black text-primary uppercase tracking-wider">정점: {peakMonth} ({maxVal.toLocaleString() || '0'}%)</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end relative">
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-300 font-bold pointer-events-none pb-12">
          <div className="border-b border-slate-50 w-full pb-1">{Math.round(maxVal * 1.2)}%</div>
          <div className="border-b border-slate-50 w-full pb-1">{Math.round(maxVal * 0.8)}%</div>
          <div className="border-b border-slate-50 w-full pb-1">{Math.round(maxVal * 0.4)}%</div>
          <div className="w-full pb-1">0%</div>
        </div>
        <div className="relative flex-1 px-4 pt-4 mb-4">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
            <defs>
              <linearGradient id="gradient-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#004B87" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#gradient-area)" opacity="0.08" />
            <path d={linePath} fill="none" stroke="#004B87" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" />
          </svg>
        </div>
        <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter border-t border-slate-100 pt-4">
          {months.map((m, idx) => (
            <span key={m} className={idx === peakIndex ? "text-primary font-black scale-110" : ""}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
