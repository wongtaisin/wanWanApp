<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-24 14:07:44
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

    <!-- 年视图：截取前7位，如 2025-01-01 → 2025-01 -->
    <MonthPicker
      v-if="current === 2"
      ref="monthPickerRef"
      :model-value="params.startDate.slice(0, 7)"
      @update:model-value="
        val => {
          params.startDate = `${val}-01`
          params.endDate = `${utils.getCurrentMonthRange(val).lastDay}`
          // handleOpens({ ...params, expensesName: expensesNames })
        }
      "
      @year-change="
        val => {
          params.startDate = `${val}-01-01`
          params.endDate = `${val}-12-31`
        }
      "
    />

    <uni-section title="支出类型" type="line" />
    <List ref="listRef" v-model="params" @change="val => handleOpens(val)" />

    <Spend ref="spendRef" />
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import utils from '../spend/utils'
import Calendar from './calendar.vue'
import List from './list.vue'
import MonthPicker from './monthPicker.vue'
import Spend from './spend.vue'
import type { FormData } from './types'
import { getWeekRange } from './utils'

interface ListForm {
  expensesName: string[]
}

interface SpendForm {
  startDate: string
  endDate: string
  expensesName: ListForm['expensesName']
}

const params = ref<FormData>({ startDate: '', endDate: '' })
const items = reactive(['周', '月', '年'])
const current = ref(0)
const spendRef = ref()

const handleOpens = (rows: SpendForm) => {
  spendRef.value.opens(rows)
}

const onClickItem = (e: { currentIndex: number }) => {
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
