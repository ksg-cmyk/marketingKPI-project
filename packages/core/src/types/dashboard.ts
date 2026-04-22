import type { KpiMetric } from './kpi'

export interface DashboardSummary {
  brand: string
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

export interface MediaSummaryRow {
  brand: string
  media: string
  product: string
  spend: string
  impressions: string
  clicks: string
  ctr: string
  cpm: string
  cpc: string
  purchases: string
  cvr: string
}

export interface RoiDetailRow {
  month: string
  revenue: string
  cogs: string
  cogsRate: string
  logistics: string
  pgFee: string
  spend: string
  erpRoas: string
  profit: string
  roi: string
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
