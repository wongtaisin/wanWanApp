<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-15 11:29:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-05-07 15:03:19
 * @FilePath: \wanWanUA\src\pages\chart\week.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="week-year">
    <view class="arrow" @click="prevYear">«</view>
    <view class="year">{{ dateYear }}</view>
    <view class="arrow" :class="`${dateYear === nowYear ? 'not' : ''}`" @click="nextYear">»</view>
  </view>

  <scroll-view
    scroll-x="true"
    scroll-with-animation="true"
    :scroll-into-view="`id_${activeWeekId}`"
  >
    <view class="week-container">
      <view
        v-for="(item, i) in weekList"
        class="week-item"
        :id="`id_${i + 1}`"
        :key="i"
        :class="{ active: i + 1 === Number(activeWeekId) }"
        @click="handleClick(item)"
      >
        {{ item }}周
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { getCurrentWeekInYear, getDateRangeOfWeek, getWeeksInYear } from '@/pages/chart/utils'
import { onMounted, ref } from 'vue'

const nowYear = ref(new Date().getFullYear())
const dateYear = ref(nowYear.value)
const week = ref(getWeeksInYear(dateYear.value)) as any
const weekList = ref<string[]>([])
const currentWeek = getCurrentWeekInYear(dateYear.value)
weekList.value = [...Array(currentWeek).keys()].map(item => `${dateYear.value}-${item + 1}`)
const activeWeekLabel = ref<string>('')
activeWeekLabel.value = `${dateYear.value}-${currentWeek}`
const activeWeekId = ref<string>('0')
const emits = defineEmits(['click'])

/**
 * @description: 点击周项，获取周的日期范围
 * @param {string} item 2025-52， 表示2025年第52周
 *
 * @example: 2026-01周的日期范围是：2025-12-28 至 2026-01-03
 */
const handleClick = (item: string) => {
  const year = Number(item.split('-')[0])
  const week = Number(item.split('-')[1])
  activeWeekId.value = String(week)
  const { start, end } = getDateRangeOfWeek(year, week)
  emits('click', { start, end })
  console.log(`${year}-${week}周的日期范围是：${start} 至 ${end}`)
}

// 切换年份
const prevYear = () => {
  dateYear.value--
  handleYear(dateYear.value)
}

const nextYear = () => {
  if (dateYear.value === nowYear.value) {
    return
  }

  dateYear.value++
  handleYear(dateYear.value)
}

// 处理年份切换
const handleYear = (val: number) => {
  dateYear.value = val
  week.value = getWeeksInYear(dateYear.value)
  const currentWeek = getCurrentWeekInYear(dateYear.value)
  // 如果是当前年份，只显示到当周；否则显示全年周数
  const isCurrentYear = val === new Date().getFullYear()
  const weeksToShow = isCurrentYear ? currentWeek : week.value
  weekList.value = [...Array(weeksToShow).keys()].map(item => `${dateYear.value}-${item + 1}`)
  activeWeekLabel.value = `${dateYear.value}-${currentWeek}`
  handleClick(activeWeekLabel.value)
}

onMounted(() => {
  handleClick(activeWeekLabel.value)
})
</script>

<style lang="scss" scoped>
.week-year {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20rpx;
  font-size: 34rpx;
  padding-bottom: 20rpx;
  border-bottom: 1px solid #ededed;

  .arrow {
    padding: 0 40rpx;
    font-size: 32rpx;
    color: #555;
  }

  .not {
    color: #c1c2c2;
  }

  .year {
    font-size: 36rpx;
  }
}

.week-container {
  white-space: nowrap;
  width: 100%;
  padding: 20rpx 0;

  .week-item {
    display: inline-block;
    margin: 0 15rpx;
  }

  .week-item.active {
    color: #007aff;
    font-weight: bold;
  }
}
</style>
