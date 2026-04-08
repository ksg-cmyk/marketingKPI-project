import SummaryCards from './SummaryCards'
import type { SummaryCardItem } from './SummaryCards'
import type { KpiSummary } from '@marketingkpi/core'

export default function KpiCards({ metrics }: { metrics: KpiSummary }) {
  const items: SummaryCardItem[] = [
    { label: '광고 수익률 (ROAS)', value: metrics.roas?.value || '-', trend: metrics.roas?.trend, sub: metrics.roas?.trendText, progress: 71 },
    { label: '고객 획득 비용 (CAC)', value: metrics.cac?.value || '-', sub: metrics.cac?.trendText, trendUp: false },
    { label: '구매 전환율 (CVR)', value: metrics.cvr?.value || '-', sub: metrics.cvr?.benchmark },
    { label: '최종 지표 (ERP)', value: metrics.erp?.value || metrics.erp?.profit || '-', sub: metrics.erp?.label || 'ERP 기준 성과', trendUp: true },
  ]
  return <SummaryCards items={items} cols={4} />
}
