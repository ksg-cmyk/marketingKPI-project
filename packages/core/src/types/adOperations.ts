import type { KpiMetric } from './kpi'
import type { BrandCode } from './brand'

export type CampaignStatus = 'active' | 'paused' | 'ended'

export interface Campaign {
  id: string
  name: string
  brand: BrandCode
  status: CampaignStatus
  budget: number
  metrics: KpiMetric
  startDate: string
  endDate: string
}

export interface AdOperationsReport {
  year: number
  brand: BrandCode
  campaigns: Campaign[]
}
