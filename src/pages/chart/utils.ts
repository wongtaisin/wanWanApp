// toISOString().slice(0, 10) 时，它会输出 UTC 时间（世界标准时间），不是你本地的时区。如果你在东八区（比如中国时间），结果可能会被“减一天”。
function getUTC() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const first = new Date(year, month, 1).toISOString().slice(0, 10)
  const last = new Date(year, month + 1, 0).toISOString().slice(0, 10)

  return { first, last }
}

function getCurrentMonthRange() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  // 当月第一天
  const firstDay = new Date(year, month, 1)
  // 当月最后一天
  const lastDay = new Date(year, month + 1, 0)

  // 格式化为 YYYY-MM-DD
  const format = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  return {
    firstDay: format(firstDay),
    lastDay: format(lastDay)
  }
}

export default {
  getUTC,
  getCurrentMonthRange
}
