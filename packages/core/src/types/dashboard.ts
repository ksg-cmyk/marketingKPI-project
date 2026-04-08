import type { KpiMetric } from './kpi'
import type { BrandCode } from './brand'

export interface DashboardSummary {
  brand: BrandCode
  year: number
  metrics: KpiMetric
}

export interface SpendRevenueBarData {
  label: string
  value: string
  spendWidth: string
  revenueWidth: string
}

export interface PerformanceRow {
  month: string
  spend: string
  impressions: string
  clicks: string
  ctr: string
  cpc: string
  cpm: string
  purchases: string
  cvr: string
  cpa: string
  revenue: string
  roas: string
  isSummary?: boolean
}

export interface KpiCardItem {
  value: string
  trend: string
  trendText: string
}

export interface KpiSummary {
  roas: KpiCardItem
  cac: KpiCardItem
  cvr: { value: string; benchmark: string }
  erp: { value: string; label: string; profit: string }
}
