<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-15 11:53:44
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

  <Spend ref="spendRef" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Spend from './spend.vue'

interface Props {
  totals?: string | number
  tableData: any
  params?: any
}

const props = withDefaults(defineProps<Props>(), {
  totals: 0
})

const tableData = computed(() => props.tableData)
const totals = computed(() => props.totals)
const params = computed(() => props.params)

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

const spendRef = ref()
const handleOpens = (item: string) => {
  spendRef.value.opens({
    expensesName: [item],
    startDate: params.value.startDate,
    endDate: params.value.endDate
  })
}
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
