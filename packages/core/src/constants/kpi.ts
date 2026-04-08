export const KPI_LABELS = {
  roas: 'ROAS',
  revenue: '매출',
  adSpend: '광고비',
  cpa: 'CPA',
  cvr: '전환율',
  ctr: 'CTR',
  cpc: 'CPC',
  clicks: '클릭수',
  impressions: '노출수',
  purchases: '구매수',
} as const

export const KPI_BENCHMARKS = {
  roas: 400,
  cvr: 4.8,
  ctr: 2.0,
} as const

// baserowMockData.json 키 → PerformanceRow 필드 매핑
export const PERFORMANCE_COLUMNS: { key: string; label: string }[] = [
  { key: '월', label: '월' },
  { key: '광고비(VAT포함)', label: '광고비' },
  { key: '노출수', label: '노출수' },
  { key: '클릭 수', label: '클릭수' },
  { key: 'CTR', label: 'CTR' },
  { key: 'CPC', label: 'CPC' },
  { key: 'CPM', label: 'CPM' },
  { key: '매체 구매', label: '매체구매' },
  { key: '구매 CVR', label: 'CVR' },
  { key: '구매 CPA', label: 'CPA' },
  { key: '매체매출', label: '매체매출' },
  { key: 'ROAS', label: 'ROAS' },
]
