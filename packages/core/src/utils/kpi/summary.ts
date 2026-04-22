import type { KpiSummary, PerformanceRow } from '../../types'

export const computeKpiSummary = (rows: PerformanceRow[]): KpiSummary | null => {
  if (!rows.length) return null

  const cleanNum = (v: any) => parseFloat(String(v ?? '0').replace(/[^0-9.]/g, '')) || 0
  const totals = rows.reduce(
    (acc, r) => {
      acc.spend += cleanNum(r.spend)
      acc.revenue += cleanNum(r.revenue)
      acc.purchases += cleanNum(r.purchases)
      acc.clicks += cleanNum(r.clicks)
      return acc
    },
    { spend: 0, revenue: 0, purchases: 0, clicks: 0 }
  )

  const roas = totals.spend > 0 ? (totals.revenue / totals.spend) * 100 : 0
  const cpa = totals.purchases > 0 ? totals.spend / totals.purchases : 0
  const cvr = totals.clicks > 0 ? (totals.purchases / totals.clicks) * 100 : 0

  return {
    roas: { value: roas.toFixed(2) + '%', trend: '누계', trendText: '전체 광고비 대비 성과' },
    cac: { value: Math.round(cpa).toLocaleString() + ' KRW', trend: '-', trendText: '획득 당 비용' },
    cvr: { value: cvr.toFixed(2) + '%', benchmark: '구매 전환율' },
    erp: { value: roas.toFixed(2) + '%', label: '현재 ROAS', profit: Math.round(totals.revenue).toLocaleString() },
  }
}

export const computeRoasTrend = (rows: PerformanceRow[]) => {
  if (!rows.length) return Array(12).fill(0)

  const trend = Array(12).fill(0)
  rows.forEach((r) => {
    const match = String(r.month).match(/(\d+)/)
    if (match) {
      const idx = parseInt(match[1]) - 1
      if (idx >= 0 && idx < 12) {
        trend[idx] = parseFloat(String(r.roas).replace(/[^0-9.]/g, '')) || 0
      }
    }
  })
  return trend
}
