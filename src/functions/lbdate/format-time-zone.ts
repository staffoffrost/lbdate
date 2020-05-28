
export function formatTimeZone(mins: number): string {
  const isNegative = mins < 0
  if (isNegative) mins = mins * -1
  const hours = mins / 60
  const hoursStr = (hours - hours % 1).toString()
  const minsStr = (mins % 60).toString()
  const padTime = (n: string): string => n.length == 1 ? '0' + n : n
  return `${isNegative || mins == 0 ? '+' : '-'}${padTime(hoursStr)}:${padTime(minsStr)}`
}
