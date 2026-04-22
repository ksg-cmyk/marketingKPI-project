export const calcRoas = (revenue: number, adSpend: number): number =>
  adSpend === 0 ? 0 : (revenue / adSpend) * 100

export const calcCpa = (adSpend: number, purchases: number): number =>
  purchases === 0 ? 0 : adSpend / purchases

export const calcCvr = (purchases: number, clicks: number): number =>
  clicks === 0 ? 0 : (purchases / clicks) * 100

export const calcCtr = (clicks: number, impressions: number): number =>
  impressions === 0 ? 0 : (clicks / impressions) * 100

export const calcCpc = (adSpend: number, clicks: number): number =>
  clicks === 0 ? 0 : adSpend / clicks

export * from './summary'
