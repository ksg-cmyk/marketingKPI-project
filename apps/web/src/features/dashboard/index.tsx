import { useState, useEffect } from "react"
import { KpiCards, SectionHeader, RoasTrendChart } from "@marketingkpi/ui"
import { fetchKpiSummary, fetchPerformanceRows } from "@marketingkpi/core"
import type { BrandCode, KpiSummary } from "@marketingkpi/core"
import PerformanceAnalysisPage from "../performance-analysis"

interface DashboardPageProps {
  currentBrand: BrandCode
}

export default function DashboardPage({ currentBrand }: DashboardPageProps) {
  const [kpiData, setKpiData] = useState<KpiSummary | null>(null)
  const [roasTrend, setRoasTrend] = useState<number[]>([])

  useEffect(() => {
    if (!currentBrand) return;

    const loadData = async () => {
      const summary = await fetchKpiSummary(currentBrand)
      setKpiData(summary)

      const rows = await fetchPerformanceRows(currentBrand)
      
      // 12개월 0으로 초기화된 배열 생성
      const monthlyRoas = Array(12).fill(0);
      
      rows.forEach(r => {
        const monthStr = String(r.month || '');
        if (monthStr.includes('총')) return; // 총계 무시

        // "11월" 또는 "field_12817" 등의 데이터에서 월 숫자(1~12) 추출
        const monthMatch = monthStr.match(/(\d+)/);
        if (monthMatch) {
          const monthIdx = parseInt(monthMatch[1]) - 1; // 0 ~ 11 인덱스
          if (monthIdx >= 0 && monthIdx < 12) {
            const val = String(r.roas || '0').replace(/[^0-9.]/g, '');
            monthlyRoas[monthIdx] = parseFloat(val) || 0;
          }
        }
      });
      
      setRoasTrend(monthlyRoas)
    }
    loadData()
  }, [currentBrand])

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
      <PerformanceAnalysisPage brand={currentBrand || "childi"} />
      
      <div className="h-10" />
    </div>
  )
}
