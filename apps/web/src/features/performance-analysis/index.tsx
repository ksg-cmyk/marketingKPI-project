import { useState, useEffect } from "react"
import { PerformanceTable, SectionHeader } from "@marketingkpi/ui"
import { fetchPerformanceRows, PERFORMANCE_COLUMNS } from "@marketingkpi/core"
import type { PerformanceRow } from "@marketingkpi/core"

interface PerformanceAnalysisPageProps {
  brand: string
  rows?: PerformanceRow[]
}

export default function PerformanceAnalysisPage({ brand, rows: externalRows }: PerformanceAnalysisPageProps) {
  const [data, setData] = useState<PerformanceRow[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const process = (rows: PerformanceRow[]) => {
      const monthlyData = rows.filter(r => !String(r.month || '').includes('총'))

      if (monthlyData.length > 0) {
        const totals = monthlyData.reduce((acc, cur) => {
          const cleanNum = (v: string | number | undefined) => parseFloat(String(v ?? '0').replace(/[^0-9.]/g, '')) || 0
          acc.spend += cleanNum(cur.spend)
          acc.impressions += cleanNum(cur.impressions)
          acc.clicks += cleanNum(cur.clicks)
          acc.purchases += cleanNum(cur.purchases)
          acc.revenue += cleanNum(cur.revenue)
          return acc
        }, { spend: 0, impressions: 0, clicks: 0, purchases: 0, revenue: 0 })

        const totalCTR = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0
        const totalCPC = totals.clicks > 0 ? totals.spend / totals.clicks : 0
        const totalCPM = totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0
        const totalCVR = totals.clicks > 0 ? (totals.purchases / totals.clicks) * 100 : 0
        const totalCPA = totals.purchases > 0 ? totals.spend / totals.purchases : 0
        const totalROAS = totals.spend > 0 ? (totals.revenue / totals.spend) * 100 : 0

        const summaryRow: PerformanceRow = {
          month: '총계',
          spend: Math.round(totals.spend).toLocaleString(),
          impressions: Math.round(totals.impressions).toLocaleString(),
          clicks: Math.round(totals.clicks).toLocaleString(),
          ctr: totalCTR.toFixed(2) + '%',
          cpc: Math.round(totalCPC).toLocaleString(),
          cpm: Math.round(totalCPM).toLocaleString(),
          purchases: totals.purchases.toLocaleString(),
          cvr: totalCVR.toFixed(2) + '%',
          cpa: Math.round(totalCPA).toLocaleString(),
          revenue: Math.round(totals.revenue).toLocaleString(),
          roas: totalROAS.toFixed(2) + '%',
          isSummary: true,
        }

        setData([...monthlyData, summaryRow])
      } else {
        setData([])
      }

      setLoading(false)
    }

    if (externalRows) {
      process(externalRows)
    } else {
      fetchPerformanceRows(brand).then(process)
    }
  }, [brand, externalRows])

  const handleExportCSV = () => {
    if (data.length === 0) return
    const headers = PERFORMANCE_COLUMNS.map(col => col.label)
    const rows = data.map(r => [
      r.month,
      String(r.spend).replace(/,/g, ''),
      String(r.impressions).replace(/,/g, ''),
      String(r.clicks).replace(/,/g, ''),
      r.ctr,
      String(r.cpc).replace(/,/g, ''),
      String(r.purchases).replace(/,/g, ''),
      r.cvr,
      String(r.cpa).replace(/,/g, ''),
      String(r.revenue).replace(/,/g, ''),
      r.roas,
    ])
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n")
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${brand}_광고성과장부_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredData = data.filter(r => {
    if (r.isSummary) return true
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return Object.values(r).some(val => String(val).toLowerCase().includes(searchLower))
  })

  if (loading) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <SectionHeader
        title="연간 광고 성과 장부"
        description="월별 실적을 기반으로 실시간 계산된 합산 실적 보고서입니다."
        actions={
          <>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <span className="material-symbols-outlined text-sm text-slate-400 mr-2">search</span>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none text-xs focus:ring-0 w-32 placeholder:text-slate-300 font-bold"
                placeholder="내용 검색..."
                type="text"
              />
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>CSV 내보내기</span>
            </button>
          </>
        }
      />

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <PerformanceTable rows={filteredData} />
      </div>
    </div>
  )
}
