import Table from '../common/Table'
import Badge from '../common/Badge'
import type { TableColumn } from '../common/Table'
import type { WeeklyData } from '@marketingkpi/core'

const formatKRW = (v: number) => v.toLocaleString('ko-KR')
const formatPct = (v: number) => `${v.toFixed(2)}%`

const roasThresholds = [
  { min: 1000, className: 'text-primary font-black' },
  { min: 500, className: 'text-secondary font-bold' },
]

const columns: TableColumn<WeeklyData>[] = [
  { key: 'week', label: '주차', render: (r) => <><div className="font-bold text-on-surface">{r.week}</div><div className="text-[11px] text-slate-400 font-medium">{r.period}</div></> },
  { key: 'kakao', label: '집행횟수', render: (r) => String(r.kakao.executeCount) },
  { key: 'kakao', label: '총 발송', render: (r) => formatKRW(r.kakao.sendCount) },
  { key: 'kakao', label: '집행비용', render: (r) => `₩${formatKRW(r.kakao.adSpend)}` },
  { key: 'kakao', label: '구매건수', render: (r) => String(r.kakao.purchases) },
  { key: 'kakao', label: '수익', render: (r) => `₩${formatKRW(r.kakao.revenue)}` },
  { key: 'kakao', label: 'ROAS', align: 'right', render: (r) => <Badge value={r.kakao.roas} format={formatPct} thresholds={roasThresholds} /> },
]

export default function KakaoWeeklyTable({ weeks }: { weeks: WeeklyData[] }) {
  return (
    <div className="bg-white rounded-xl editorialShadow border border-slate-100 overflow-hidden mb-6">
      <div className="px-8 py-5 border-b border-slate-100 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <h4 className="font-headline font-black text-sm text-on-surface">KAKAO</h4>
      </div>
      <Table columns={columns} rows={weeks} rowKey="week" minWidth="700px" />
    </div>
  )
}
