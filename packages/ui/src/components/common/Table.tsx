import type { ReactNode } from 'react'

export interface TableColumn<T> {
  key: keyof T | string
  label: string
  align?: 'left' | 'right' | 'center'
  render?: (row: T) => ReactNode
}

export interface TableFooterCell {
  value: ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
}

interface TableProps<T> {
  columns: TableColumn<T>[]
  rows: T[]
  rowKey: keyof T | ((row: T) => string)
  rowClassName?: (row: T) => string
  footer?: TableFooterCell[]
  minWidth?: string
}

export default function Table<T>({ columns, rows, rowKey, rowClassName, footer, minWidth = '600px' }: TableProps<T>) {
  const getKey = (row: T) =>
    typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey])

  const alignClass = (align?: 'left' | 'right' | 'center') =>
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className="overflow-x-auto customScrollbar">
      <table className={`w-full text-left border-collapse min-w-[${minWidth}]`}>
        <thead>
          <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
            {columns.map((col, i) => (
              <th key={String(col.key)} className={`${i === 0 ? 'px-8' : 'px-6'} py-5 ${alignClass(col.align)}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[13px] font-semibold text-slate-600 divide-y divide-slate-50">
          {rows.map((row) => (
            <tr key={getKey(row)} className={`hover:bg-slate-50 transition-colors ${rowClassName?.(row) ?? ''}`}>
              {columns.map((col, i) => (
                <td key={String(col.key)} className={`${i === 0 ? 'px-8' : 'px-6'} py-4 ${alignClass(col.align)}`}>
                  {col.render ? col.render(row) : String((row as any)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer && (
          <tfoot>
            <tr className="bg-primary border-t border-primary/10 text-white">
              {footer.map((cell, i) => (
                <td key={i} className={`${i === 0 ? 'px-8' : 'px-6'} py-6 font-bold ${alignClass(cell.align)} ${cell.className ?? ''}`}>
                  {cell.value}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
