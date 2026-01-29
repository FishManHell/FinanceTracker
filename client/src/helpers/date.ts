export function formatYearMonth(date?: Date | null): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')

  return `${year}-${month}`
}
