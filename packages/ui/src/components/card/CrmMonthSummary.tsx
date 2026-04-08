import SummaryCards from './SummaryCards'
import type { MonthlyChannelData } from '@marketingkpi/core'

const formatKRW = (v: number) => v.toLocaleString('ko-KR')
const formatPct = (v: number) => `${v.toFixed(2)}%`

export default function CrmMonthSummary({ month }: { month: MonthlyChannelData }) {
  return (
    <SummaryCards
      cols={3}
      items={[
        { label: '월 수익', value: `₩${formatKRW(month.totalRevenue)}` },
        { label: '월 광고비용', value: `₩${formatKRW(month.totalAdSpend)}` },
        { label: '월 ROAS', value: formatPct(month.totalRoas) },
      ]}
    />
  )
}
