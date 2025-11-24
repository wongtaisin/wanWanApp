/**
 * 获取当前日期所在周的周一和周日
 * @param {Date} data 可选，默认当前日期 yyyy-MM-dd
 * @returns 包含周一和周日的对象，格式为 { weekStart: 'yyyy-MM-dd', weekEnd: 'yyyy-MM-dd' }
 */
export const getWeekRange = (data?: Date) => {
  const now = data || new Date()
  const day = now.getDay() // 0 (周日) - 6 (周六)
  const diffToMonday = (day === 0 ? -6 : 1) - day // 周一与当前日期的差值
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday) // 周一
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6) // 周日

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(
      2,
      '0'
    )}`

  return {
    weekStart: fmt(weekStart),
    weekEnd: fmt(weekEnd)
  }
}

export const expensesNames = [
  'eat',
  'drink',
  'play',
  'glad',
  'tolls',
  'oil',
  'parking',
  'traffic',
  'supermarket',
  'online_shopping',
  'phone_bill',
  'red_packet',
  'vip',
  'other'
]
