<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-17 14:25:36
 * @FilePath: \wanWanApp\src\pages\chart\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="chart-page">
    <view class="chart-segmented">
      <uni-segmented-control
        :current="current"
        :values="items"
        style-type="button"
        active-color="#343233"
        @clickItem="onClickItem"
      />
    </view>

    <Calendar v-if="current === 1" ref="calendarRef" v-model="params" />

    <uni-section title="支出类型" type="line" />
    <List ref="listRef" v-model="params" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import utils from '../spend/utils'
import Calendar from './calendar.vue'
import List from './list.vue'
import type { FormData } from './types'

const params = ref<FormData>({ startDate: '', endDate: '' })
const items = reactive(['周', '月', '年'])
const current = ref(0)

const onClickItem = (e: any) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }

  switch (e.currentIndex) {
    case 0:
      const week = getWeekRange()
      params.value.startDate = week.weekStart
      params.value.endDate = week.weekEnd
      break
    case 1:
      const month = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
      params.value.startDate = utils.getCurrentMonthRange(month).firstDay
      params.value.endDate = utils.getCurrentMonthRange(month).lastDay
      break
    case 2:
      const year = new Date().getFullYear()
      params.value.startDate = `${year}-01-01`
      params.value.endDate = `${year}-12-31`
      break
  }
}

// 以周一为一周开始，周日为结束
const getWeekRange = () => {
  const now = new Date()
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

onMounted(() => {
  onClickItem({ currentIndex: 0 })
})
</script>

<style lang="scss" scoped>
.chart-page {
  padding-bottom: 108rpx;

  .chart-segmented {
    background: #fede2b;
    padding: 0 40rpx;
    padding-bottom: 20rpx;
  }

  .slot-icon {
    width: 80rpx;
    height: 80rpx;
    margin-right: 20rpx;
  }

  .slot-box {
    width: 100%;
  }

  .slot-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #333;
  }
}
</style>
