/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 16:18:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-24 16:23:08
 * @FilePath: \wanWanApp\src\pages\spend\utils.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
// toISOString().slice(0, 10) 时，它会输出 UTC 时间（世界标准时间），不是你本地的时区。如果你在东八区（比如中国时间），结果可能会被“减一天”。
export function getUTC() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const first = new Date(year, month, 1).toISOString().slice(0, 10)
  const last = new Date(year, month + 1, 0).toISOString().slice(0, 10)

  return { first, last }
}
