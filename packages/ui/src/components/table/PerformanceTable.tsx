import Table from '../common/Table'
import type { TableColumn, TableFooterCell } from '../common/Table'
import { PERFORMANCE_COLUMNS } from '@marketingkpi/core'
import type { PerformanceRow } from '@marketingkpi/core'

interface PerformanceTableProps {
  rows: PerformanceRow[]
  footer?: TableFooterCell[]
}

const columns: TableColumn<PerformanceRow>[] = PERFORMANCE_COLUMNS.map((col, i) => {
  const keyMap: Record<string, keyof PerformanceRow> = {
    '월': 'month',
    '광고비(VAT포함)': 'spend',
    '노출수': 'impressions',
    '클릭 수': 'clicks',
    'CTR': 'ctr',
    'CPC': 'cpc',
    'CPM': 'cpm',
    '매체 구매': 'purchases',
    '구매 CVR': 'cvr',
    '구매 CPA': 'cpa',
    '매체매출': 'revenue',
    'ROAS': 'roas',
  }
  const rowKey = keyMap[col.key] ?? 'month' as keyof PerformanceRow
  const isLast = i === PERFORMANCE_COLUMNS.length - 1

  return {
    key: rowKey,
    label: col.label,
    align: isLast ? 'right' : 'left',
    render: (r: PerformanceRow) => {
      const val = r[rowKey]
      if (rowKey === 'month') return <span className={r.isSummary ? 'font-black text-primary' : 'font-bold text-on-surface'}>{val}</span>
      if (isLast) return <span className="font-bold">{val}</span>
      return <>{val}</>
    },
  }
})

export default function PerformanceTable({ rows = [], footer }: PerformanceTableProps) {
  return (
    <section className="bg-white rounded-xl editorialShadow border border-slate-100 overflow-hidden">
      <Table
        columns={columns}
        rows={rows}
        rowKey="month"
        rowClassName={(r) => r.isSummary ? 'bg-primary/5 font-black' : ''}
        footer={footer}
        minWidth="1000px"
      />
    </section>
  )
}
