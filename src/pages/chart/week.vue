<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-15 11:29:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-29 10:12:30
 * @FilePath: \wanWanApp\src\pages\chart\week.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="week-year">当前年份：{{ dateYear }}年</view>

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

const dateYear = new Date().getFullYear()
const week = ref(getWeeksInYear(dateYear)) as any
const weekList = ref<string[]>([])
weekList.value = [...Array(week.value).keys()].map(item => `${dateYear}-${item + 1}`)
const activeWeekLabel = ref<string>('')
activeWeekLabel.value = `${dateYear}-${getCurrentWeekInYear(dateYear)}`
const activeWeekId = ref<string>('0')
const emits = defineEmits(['click'])

/**
 * @description: 点击周项，获取周的日期范围
 * @param {string} item 2025-52， 表示2025年第52周
 *
 * @example: 2025-52周的日期范围是：2025-12-28 至 2026-01-03
 */
const handleClick = (item: string) => {
  const week = Number(item.split('-')[1])
  const year = Number(item.split('-')[0])
  activeWeekId.value = String(week)
  const { start, end } = getDateRangeOfWeek(year, week)
  emits('click', { start, end })
  console.log(`${year}-${week}周的日期范围是：${start} 至 ${end}`)
}

onMounted(() => {
  handleClick(`${dateYear}-${getCurrentWeekInYear(dateYear)}`)
})
</script>

<style lang="scss" scoped>
.week-year {
  text-align: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #ededed;
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
