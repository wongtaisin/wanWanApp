<template>
  <view class="month-picker">
    <!-- 头部年份 -->
    <view class="header">
      <view class="arrow" @click="prevYear">«</view>
      <view class="year">{{ currentYear }}</view>
      <view class="arrow" @click="nextYear">»</view>
    </view>

    <!-- 月份网格 -->
    <view class="months">
      <view
        v-for="(m, index) in monthList"
        :key="index"
        class="month-item"
        :class="{ active: m.value === selectedMonth && currentYear === selectedYear }"
        @click="selectMonth(m.value)"
      >
        {{ m.label }}
        <view class="" style="font-size: 24rpx; color: red; margin-top: 10rpx">
          ￥{{ m.value }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue'

interface Props {
  modelValue?: string // 格式：YYYY-MM
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emits = defineEmits(['update:modelValue', 'change'])

// 当前年月
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1

const selectedYear = ref(props.modelValue ? Number(props.modelValue.split('-')[0]) : year)
const selectedMonth = ref(props.modelValue ? Number(props.modelValue.split('-')[1]) : month)

// UI 当前年的显示
const currentYear = ref(selectedYear.value)

// 月份列表
const monthList = [
  { value: 1, label: '1月' },
  { value: 2, label: '2月' },
  { value: 3, label: '3月' },
  { value: 4, label: '4月' },
  { value: 5, label: '5月' },
  { value: 6, label: '6月' },
  { value: 7, label: '7月' },
  { value: 8, label: '8月' },
  { value: 9, label: '9月' },
  { value: 10, label: '10月' },
  { value: 11, label: '11月' },
  { value: 12, label: '12月' }
]

// 切换年份
const prevYear = () => currentYear.value--
const nextYear = () => currentYear.value++

// 选择月份
const selectMonth = (m: number) => {
  selectedYear.value = currentYear.value
  selectedMonth.value = m

  const val = `${currentYear.value}-${String(m).padStart(2, '0')}`

  emits('update:modelValue', val)
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.month-picker {
  padding: 20rpx 0;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20rpx;
    font-size: 34rpx;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #ededed;
  }

  .arrow {
    padding: 0 40rpx;
    font-size: 32rpx;
    color: #555;
  }

  .year {
    font-size: 36rpx;
  }

  .months {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 30rpx;
    column-gap: 0;
    text-align: center;
  }

  .month-item {
    padding: 20rpx 0;
    font-size: 30rpx;
    color: #666;
  }

  .month-item.active {
    color: #007aff;
    font-weight: bold;
  }
}
</style>
