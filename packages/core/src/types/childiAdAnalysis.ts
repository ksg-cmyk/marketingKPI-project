import type { KpiMetric } from './kpi'
import type { YearMonth } from './period'

export interface MonthlyPerformance {
  month: YearMonth
  metrics: KpiMetric
  isPeak?: boolean
}

export interface ChildiAdAnalysisReport {
  year: number
  monthly: MonthlyPerformance[]
  total: KpiMetric
}
