import { KpiCards, SectionHeader, RoasTrendChart } from "@marketingkpi/ui"
import { computeKpiSummary, fetchRoasTrend } from "@marketingkpi/core"
import type { PerformanceRow } from "@marketingkpi/core"
import PerformanceAnalysisPage from "../performance-analysis"

interface DashboardPageProps {
  currentBrand: string
  rows: PerformanceRow[]
}

export default function DashboardPage({ currentBrand, rows }: DashboardPageProps) {
  const kpiData = computeKpiSummary(rows)
  const roasTrend = fetchRoasTrend(rows)

  // 로딩 상태 상세화
  if (!kpiData) return (
    <div className="p-20 m-10 text-center bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p className="text-xl fontHeadline font-black text-on-surface">종합 대시보드 로딩 중...</p>
      <p className="text-slate-400 mt-2">브랜드: {currentBrand || '차일디'}</p>
    </div>
  )

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <SectionHeader 
        title="종합 마케팅 대시보드"
        description="모든 브랜드의 캠페인 지표를 실시간으로 요약 분석합니다."
      />
      
      {/* 핵심 지표 요약 카드 */}
      <KpiCards metrics={kpiData} />

      {/* ROAS 트랜트 시각화 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <RoasTrendChart data={roasTrend} />
      </div>

      <div className="w-full h-px bg-slate-200 my-10" />

      {/* 월별 성과 상세 테이블 (리졸브된 중첩 여백 없이 깨끗하게 출력됩니다) */}
      <PerformanceAnalysisPage brand={currentBrand || "childi"} rows={rows} />
      
      <div className="h-10" />
    </div>
  )
}
