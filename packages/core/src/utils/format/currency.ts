export const formatKRW = (amount: number): string =>
  amount.toLocaleString('ko-KR')

export const formatKRWShort = (amount: number): string => {
  if (amount >= 100_000_000) return `${(amount / 100_000_000).toFixed(1)}억`
  if (amount >= 10_000) return `${(amount / 10_000).toFixed(1)}만`
  return formatKRW(amount)
}

export const formatPercent = (value: number, decimals = 2): string =>
  `${value.toFixed(decimals)}%`
