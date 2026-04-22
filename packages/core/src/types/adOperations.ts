import type { KpiMetric } from './kpi'

export type CampaignStatus = 'active' | 'paused' | 'ended'

export interface Campaign {
  id: string
  name: string
  brand: string
  status: CampaignStatus
  budget: number
  metrics: KpiMetric
  startDate: string
  endDate: string
}

export interface AdOperationsReport {
  year: number
  brand: string
  campaigns: Campaign[]
}
