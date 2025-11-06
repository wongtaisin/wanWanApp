/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 16:18:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-03 11:17:18
 * @FilePath: \wanWanApp\src\pages\chart\utils.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
// toISOString().slice(0, 10) 时，它会输出 UTC 时间（世界标准时间），不是你本地的时区。如果你在东八区（比如中国时间），结果可能会被“减一天”。
function getUTC() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const first = new Date(year, month, 1).toISOString().slice(0, 10)
  const last = new Date(year, month + 1, 0).toISOString().slice(0, 10)

  return { first, last }
}

/**
 * @description 获取当前月份的开始和结束日期
 * @param time 2025-11
 * @returns { firstDay: '2025-11-01', lastDay: '2025-11-30' }
 */
function getCurrentMonthRange(time: string) {
  // 解析 YYYY-MM 格式的字符串
  const [yearStr, monthStr] = time.split('-')
  const year = parseInt(yearStr, 10)
  const month = parseInt(monthStr, 10) - 1 // getMonth() 返回 0-11，所以减 1

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
