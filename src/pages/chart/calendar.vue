<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-15 11:29:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-17 14:15:48
 * @FilePath: \wanWanApp\src\pages\chart\calendar.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-calendar
    class="uni-calendar--hook"
    :selected="info.selected"
    :showMonth="false"
    @change="change"
    @monthSwitch="monthSwitch"
  />
</template>

<script lang="ts" setup>
import { expensesList } from '@/services/expenses'
import { computed, ref, watch } from 'vue'
import utils from '../spend/utils'
import type { FormData, Info, SelectedItem } from './types'

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const emits = defineEmits<{
  (e: 'update:modelValue', value: FormData): void
}>()

const info = ref<Info>({
  lunar: true,
  range: true,
  insert: false,
  selected: [] as SelectedItem[]
})

const change = (e: any) => {
  console.log('change 返回:', e)
}

const monthSwitch = (e: any) => {
  const month = `${e.year}-${e.month}`
  params.value.startDate = utils.getCurrentMonthRange(month).firstDay
  params.value.endDate = utils.getCurrentMonthRange(month).lastDay
  emits('update:modelValue', params.value)
}

const initList = async () => {
  const res = await expensesList({ ...params.value })
  info.value.selected = res.sum.map((item: SelectedItem) => ({
    date: item.date,
    info: item.info,
    data: item.data
  }))
}

watch(
  () => params.value,
  () => {
    if (params.value.startDate && params.value.endDate) {
      initList()
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped></style>
