import dayjs from 'dayjs'

export const formatMonth = (date: string): string =>
  dayjs(date).format('YYYY-MM')

export const formatDate = (date: string): string =>
  dayjs(date).format('YYYY.MM.DD')
