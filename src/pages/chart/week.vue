<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-15 11:29:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-28 17:26:49
 * @FilePath: \wanWanApp\src\pages\chart\week.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="week-container">
    <!-- <view>当前年份：{{ dateYear }}年</view> -->
    <view v-for="item in weekList" :key="item" class="week-item" @click="handleClick(item)">{{
      item
    }}</view>
  </view>
</template>

<script lang="ts" setup>
import _utils from '@/utils/utils'
import { ref } from 'vue'

const dateYear = new Date().getFullYear()
const week = ref(getWeeksInYear(dateYear)) as any
const weekList = ref([]) as any

weekList.value = [...Array(week.value).keys()].map(item => {
  return `${dateYear}-${item + 1}周`
})

const handleClick = (item: string) => {
  const week = item.split('周')[0]
  const weekNum = Number(week.split('-')[1])
  const yearNum = Number(week.split('-')[0])
  const { start, end } = getDateRangeOfWeek(yearNum, weekNum)
  console.log(`${yearNum}-${weekNum}周的日期范围是：${start} 至 ${end}`)
}

function getWeeksInYear(year: number): number {
  const dec28 = new Date(year, 11, 28)
  const dayOfYear = (dec28.getTime() - new Date(year, 0, 1).getTime()) / 86400000
  // ISO week 1 starts the week containing Jan 4th.
  // The number of weeks is the week number of Dec 28th.
  return Math.ceil((dayOfYear + 1) / 7)
}

/**
 * 根据年份和 ISO 周数计算该周的开始日期（周一）和结束日期（周日）。
 * 遵循 ISO 8601 标准：周一是一周的第一天。
 * @param year 年份 (例如: 2025)
 * @param week 周数 (例如: 42)
 * @returns 包含开始日期和结束日期对象的范围
 */
function getDateRangeOfWeek(year: number, week: number): { start: string; end: string } {
  // 创建一个日期对象，设置为该年份的 1 月 1 日
  const d: Date = new Date(year, 0, 1)

  // 获取 1 月 1 日是星期几 (0=周日, 1=周一, ..., 6=周六)
  const dayOfWeek = d.getDay()

  // ISO 8601 标准要求第一周包含 1 月 4 日。
  // 计算需要偏移多少天才能到达第一周的周一。
  // 如果 1 月 1 日是周五、周六或周日，则第一周实际上是下一周。
  let dayOffset = dayOfWeek <= 4 ? 1 - dayOfWeek : 8 - dayOfWeek

  // 将日期设置为当年第一周的周一
  d.setDate(d.getDate() + dayOffset)

  // 将日期前进到目标周数
  // 我们已经定位在第 1 周的开始，所以只需要加上 (week - 1) * 7 天
  d.setDate(d.getDate() + (week - 1) * 7)

  // d 现在是目标周的周一 (开始日期)
  const start: Date = new Date(d)

  // 结束日期是开始日期 + 6 天 (周日)
  const end: Date = new Date(start)

  end.setDate(end.getDate() + 6)

  return {
    start: _utils.formatDate(start.getTime(), 'yyyy-MM-dd'),
    end: _utils.formatDate(end.getTime(), 'yyyy-MM-dd')
  }
}
</script>

<style lang="scss" scoped>
.week-container {
  display: flex; /* 使用 Flexbox 布局 */
  overflow-x: auto; /* 允许内容横向溢出时显示滚动条 */
  overflow-y: hidden; /* 隐藏纵向滚动条，保持页面整洁 */
  white-space: nowrap; /* 防止内部元素换行 */
  padding: 20rpx 0; /* 内边距 */

  .week-item {
    flex-shrink: 0; /* 防止元素缩小 */
    flex: 0 0 auto; /* 不允许元素拉伸，保持其原始宽度 */
    margin: 0 15rpx; /* 外边距 */
  }
}
</style>
