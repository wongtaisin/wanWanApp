<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-15 11:29:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-03 14:21:18
 * @FilePath: \wanWanApp\src\pages\chart\calendar.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-calendar
    class="uni-calendar--hook"
    :selected="info.selected"
    :lunar="info.lunar"
    :range="info.range"
    :insert="info.insert"
    @change="change"
    @monthSwitch="monthSwitch"
  />
</template>

<script lang="ts" setup>
import type { FormData, Info, SelectedItem } from '@/pages/chart/types'
import { expensesList } from '@/services/expenses'
import _utils from '@/utils/utils'
import { computed, onMounted, ref } from 'vue'

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const emits = defineEmits<{
  (e: 'update:modelValue', value: FormData): void
  (e: 'change', value: string): void
  (e: 'monthSwitch', value: string): void
}>()

const info = ref<Info>({
  lunar: false,
  range: false,
  insert: true,
  selected: [] as SelectedItem[]
})

const change = (e: any) => {
  console.log('change 返回:', e)
  emits('change', e.fulldate)
}

const monthSwitch = (e: any) => {
  console.log('monthSwitch 返回:', e)
  const month = `${e.year}-${e.month}`
  emits('monthSwitch', month)
  const { firstDay, lastDay } = _utils.getCurrentMonthRange(month)
  params.value.startDate = firstDay
  params.value.endDate = lastDay
  init()
}

const init = async () => {
  const res = await expensesList({ ...params.value, userId: 1 })
  info.value.selected = res.sum.map((item: SelectedItem) => ({
    date: item.date,
    info: `￥${item.info}`,
    data: {
      custom: item.info,
      name: item.date
    }
  }))
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
// :deep {
//   .uni-calendar-item--isDay,
//   .uni-calendar-item--checked {
//     background-color: #fff;
//     color: #007aff;
//     font-weight: bold;
//   }

//   .uni-calendar-item--extra {
//     color: #e43d33;
//   }
// }
</style>
