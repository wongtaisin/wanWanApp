<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-24 14:01:24
 * @FilePath: \wanWanApp\src\pages\chart\list.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-list v-for="[item, value] in Object.entries(tableData)">
    <uni-list-item
      :title="classify[item].label"
      :note="`${value} 元 / ${totals} 元 = ${Number(
        ((Number(value) / Number(totals)) * 100).toFixed(2).replace(/\.?0+$/, '')
      )}%`"
      link
      @click="handleOpens(item)"
    >
      <template v-slot:header>
        <svg class="slot-icon">
          <use :xlink:href="`#${classify[item].icon}`" />
        </svg>
      </template>
      <!-- <template v-slot:body>
          <view class="slot-box">
            <view class="slot-text">
              <view>
                {{ classify[item].label }}
                {{ Number(((tableData[item] / totals) * 100).toFixed(2)) }}%
              </view>
              <view>
                {{ tableData[item] }}
              </view>
            </view>
            <CommonProgress
              style="margin-top: 20rpx"
              :percent="Number(((tableData[item] / totals) * 100).toFixed(2))"
              :height="12"
              active
            />
          </view>
        </template> -->
      <template v-slot:footer>
        <text class="slot-text">{{ tableData[item] }}</text>
      </template>
    </uni-list-item>
  </uni-list>
</template>

<script lang="ts" setup>
import { expensesCheck } from '@/services/expenses'
import { computed, ref, watch } from 'vue'
import type { FormData } from './types'

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const tableData = ref<any>({})
const totals = ref(0)
const emits = defineEmits(['update:modelValue', 'change'])

const classify: any = {
  eat: { label: '吃', icon: 'icon-food-mifan' },
  drink: { label: '喝', icon: 'icon-kekoukele2' },
  play: { label: '玩', icon: 'icon-a-GamePadyouxishoubing' },
  glad: { label: '乐', icon: 'icon-zhoubianyule' },
  tolls: { label: '过路费', icon: 'icon-guolufei' },
  oil: { label: '车油', icon: 'icon-jiayouzhan2' },
  parking: { label: '停车费', icon: 'icon-tingchefeiyong' },
  traffic: { label: '交通费', icon: 'icon-gongjiaoche' },
  supermarket: { label: '超市', icon: 'icon-chaoshi2' },
  online_shopping: { label: '网购', icon: 'icon-wanggou' },
  phone_bill: { label: '话费', icon: 'icon-dianhua' },
  red_packet: { label: '红包', icon: 'icon-hongbao2' },
  vip: { label: 'vip', icon: 'icon-vip1' },
  other: { label: '其他', icon: 'icon-qitafeiyong' }
}

const handleOpens = (item: string) => {
  emits('update:modelValue', { ...params.value, expensesName: [item] })
  emits('change', { ...params.value, expensesName: [item] })
}

const initCheck = async () => {
  const { sum, total } = await expensesCheck({
    // userId: 1, // TODO: 从登录状态获取
    name: [
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
    ],
    startDate: params.value.startDate,
    endDate: params.value.endDate
  })

  tableData.value = { ...sum }
  totals.value = total
}

watch(
  () => params.value,
  () => {
    if (params.value.startDate && params.value.endDate) {
      initCheck()
    }
  },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
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
</style>
