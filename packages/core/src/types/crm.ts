export interface MonthlyChannelData {
  totalRevenue: number
  totalAdSpend: number
  totalRoas: number
}

export interface WeeklyData {
  week: string
  period: string
  appPush: {
    executeCount: number
    clicks: number
    purchases: number
    revenue: number
  }
  kakao: {
    executeCount: number
    sendCount: number
    adSpend: number
    purchases: number
    revenue: number
    roas: number
  }
}

export interface KakaoCampaign {
  name: string
  purchases: number
  revenue: number
  cartAdd: number
  sessions: number
  adSpend: number
  sendCount: number
  views: number
  clicks: number
  ctr: number
  roas: number
  revenue7d: number
}

export interface KakaoMonthlyData {
  weeks: Array<{
    week: string
    campaigns: KakaoCampaign[]
    total: KakaoCampaign
  }>
}
