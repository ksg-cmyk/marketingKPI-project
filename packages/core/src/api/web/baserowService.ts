import axios from 'axios'
import type { Brand, PerformanceRow } from '../../types'
import { toPerformanceRow } from '../../utils/mappers'
import { computeRoasTrend } from '../../utils/kpi'

// ── Mock 데이터 (주석 처리) ────────────────────────────────────────────────────
// import childiData from '../../data/brands/childi.json'
// import universalOverallData from '../../data/brands/universal-overall.json'
// import ordinaryHolidayData from '../../data/brands/ordinary-holiday.json'
//
// const brandDataMap: Record<string, any> = {
//   '차일디': childiData,
//   '유니버셜오버롤': universalOverallData,
//   '오디너리홀리데이': ordinaryHolidayData,
// }
//
// export const fetchAvailableBrands = async (): Promise<Brand[]> => {
//   return Object.keys(brandDataMap).map((code) => ({ code, name: code }))
// }
//
// export const fetchPerformanceRows = async (brandCode: string): Promise<PerformanceRow[]> => {
//   return (brandDataMap[brandCode]?.results ?? []).map(toRow)
// }
// ─────────────────────────────────────────────────────────────────────────────

const HOST = import.meta.env.VITE_BASEROW_HOST
const TOKEN = import.meta.env.VITE_BASEROW_TOKEN
const TABLE_ID = import.meta.env.VITE_BASEROW_TABLE_ID
const BRAND_TABLE_ID = import.meta.env.VITE_BASEROW_BRAND_TABLE_ID
const CHANNEL_TABLE_ID = import.meta.env.VITE_BASEROW_CHANNEL_TABLE_ID

const api = axios.create({
  baseURL: `${HOST}/api/database/rows/table`,
  headers: { Authorization: `Token ${TOKEN}` },
  params: { user_field_names: true },
})

const fetchAllRows = async (tableId: string, params = {}): Promise<any[]> => {
  // return [] // 주석 해제시 모든 API 호출 비활성화
  const results: any[] = []
  let page = 1
  while (true) {
    const { data } = await api.get(`/${tableId}/`, { params: { page, size: 100, ...params } })
    results.push(...data.results)
    if (!data.next) break
    page++
  }
  return results
}

let cachedBrands: Brand[] | null = null

export const fetchAvailableBrands = async (): Promise<Brand[]> => {
  if (cachedBrands) return cachedBrands
  const { data } = await api.get(`/${BRAND_TABLE_ID}/`)
  cachedBrands = data.results.map((r: any) => ({ code: r.brandName, name: r.brandName }))
  return cachedBrands!
}

export const fetchPerformanceRows = async (brandCode: string): Promise<PerformanceRow[]> => {
  const rows = await fetchAllRows(TABLE_ID, { 'filter__brand__equal': brandCode })
  return rows.map(toPerformanceRow)
}

export const fetchChannelEfficiencyRows = async (): Promise<any[]> => {
  return fetchAllRows(CHANNEL_TABLE_ID)
}

export const fetchRoasTrend = computeRoasTrend
