import Table from '../common/Table'
import type { TableColumn } from '../common/Table'
import type { WeeklyData } from '@marketingkpi/core'

const formatKRW = (v: number) => v.toLocaleString('ko-KR')

const columns: TableColumn<WeeklyData>[] = [
  { key: 'week', label: '주차', render: (r) => <><div className="font-bold text-on-surface">{r.week}</div><div className="text-[11px] text-slate-400 font-medium">{r.period}</div></> },
  { key: 'appPush', label: '실행수', render: (r) => formatKRW(r.appPush.executeCount) },
  { key: 'appPush', label: '클릭수', render: (r) => formatKRW(r.appPush.clicks) },
  { key: 'appPush', label: '구매건수', render: (r) => String(r.appPush.purchases) },
  { key: 'appPush', label: '수익', align: 'right', render: (r) => `₩${formatKRW(r.appPush.revenue)}` },
]

export default function AppPushTable({ weeks }: { weeks: WeeklyData[] }) {
  return (
    <div className="bg-white rounded-xl editorialShadow border border-slate-100 overflow-hidden">
      <div className="px-8 py-5 border-b border-slate-100 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        <h4 className="font-headline font-black text-sm text-on-surface">APP PUSH</h4>
      </div>
      <Table columns={columns} rows={weeks} rowKey="week" minWidth="600px" />
    </div>
  )
}
