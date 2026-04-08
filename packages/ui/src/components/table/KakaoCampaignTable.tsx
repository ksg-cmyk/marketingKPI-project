import Table from '../common/Table'
import Badge from '../common/Badge'
import type { TableColumn } from '../common/Table'
import type { KakaoMonthlyData, KakaoCampaign } from '@marketingkpi/core'

const formatKRW = (v: number) => v.toLocaleString('ko-KR')
const formatPct = (v: number) => `${v.toFixed(2)}%`

const roasThresholds = [
  { min: 1000, className: 'text-primary font-black' },
  { min: 500, className: 'text-secondary font-bold' },
]

const ctrThresholds = [
  { min: 40, className: 'text-primary font-black' },
]

const columns: TableColumn<KakaoCampaign>[] = [
  { key: 'name', label: '캠페인명', render: (r) => <span className="font-bold text-on-surface text-xs">{r.name}</span> },
  { key: 'purchases', label: '구매' },
  { key: 'revenue', label: '구매수익(GA)', render: (r) => `₩${formatKRW(r.revenue)}` },
  { key: 'cartAdd', label: '장바구니' },
  { key: 'sessions', label: '세션수', render: (r) => formatKRW(r.sessions) },
  { key: 'adSpend', label: '광고비용', render: (r) => `₩${formatKRW(r.adSpend)}` },
  { key: 'sendCount', label: '발송수', render: (r) => formatKRW(r.sendCount) },
  { key: 'views', label: '열람수', render: (r) => formatKRW(r.views) },
  { key: 'clicks', label: '클릭수', render: (r) => formatKRW(r.clicks) },
  { key: 'ctr', label: '클릭률', render: (r) => <Badge value={r.ctr} format={formatPct} thresholds={ctrThresholds} /> },
  { key: 'roas', label: 'ROAS', render: (r) => <Badge value={r.roas} format={formatPct} thresholds={roasThresholds} /> },
  { key: 'revenue7d', label: '구매금액(7일)', align: 'right', render: (r) => `₩${formatKRW(r.revenue7d)}` },
]

export default function KakaoCampaignTable({ weeks }: { weeks: KakaoMonthlyData['weeks'] }) {
  return (
    <div className="space-y-6">
      {weeks.map((w) => (
        <div key={w.week} className="bg-white rounded-xl editorialShadow border border-slate-100 overflow-hidden">
          <div className="px-8 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <h4 className="font-headline font-black text-sm text-on-surface">{w.week}</h4>
          </div>
          <Table
            columns={columns}
            rows={[...w.campaigns, { ...w.total, name: '총계' }]}
            rowKey="name"
            rowClassName={(r) => r.name === '총계' ? 'bg-primary/5 border-t-2 border-primary/10 font-black' : ''}
            minWidth="1100px"
          />
        </div>
      ))}
    </div>
  )
}
