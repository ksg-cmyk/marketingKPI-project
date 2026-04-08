export interface KakaoWeekly {
  executeCount: number
  sendCount: number
  adSpend: number
  purchases: number
  revenue: number
  roas: number
}

export interface AppPushWeekly {
  executeCount: number
  clicks: number
  purchases: number
  revenue: number
}

export interface WeeklyData {
  week: string
  period: string
  kakao: KakaoWeekly
  appPush: AppPushWeekly
}

export interface MonthlyChannelData {
  month: string
  label: string
  totalRevenue: number
  totalAdSpend: number
  totalRoas: number
  weeks: WeeklyData[]
}

export interface ChannelEfficiencyData {
  months: MonthlyChannelData[]
}

// 카카오 건별
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
  purchases7d: number
}

export interface KakaoWeeklyDetail {
  week: string
  campaigns: KakaoCampaign[]
  total: KakaoCampaign
}

export interface KakaoMonthlyData {
  month: string
  label: string
  weeks: KakaoWeeklyDetail[]
}

export interface KakaoCampaignData {
  months: KakaoMonthlyData[]
}
