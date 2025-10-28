<template>
  <!-- 弹出层 -->
  <van-popup v-model:show="data.isPicker" position="bottom" round @close="confirmOn">
    <van-picker
      ref="picker"
      title="请选择时间"
      :columns="data.columns"
      @change="onChange"
      @cancel="cancelOn"
      @confirm="onConfirm"
      v-model="data.selectedValues"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'

type PickerOption = { text: string; value: string }
type PickerColumn = PickerOption[]

// 修正columns和selectedValues的类型，保证类型推断
const data = reactive<{
  isPicker: boolean
  columns: PickerColumn[]
  selectedValues: string[]
}>({
  isPicker: false,
  columns: [],
  selectedValues: []
})

const props = defineProps({
  showPicker: { type: Boolean }, // 传入的显影状态
  values: { type: String } // 传入的值
})

//定义要向父组件传递的事件
const emits = defineEmits(['changeValue', 'confirm'])

watch(
  () => props.showPicker,
  val => {
    console.log(val)
    data.isPicker = val
    data.columns = []
    data.selectedValues = []
    getColumns()
  },
  {
    immediate: true //立即监听--进入就会执行一次 监听显影状态
  }
)

function onChange() {
  // 无用的方法
}

// 将下拉选项生成逻辑抽象为函数，减少代码重复
function rangeOptionArray(max: number, pad: boolean = true): PickerOption[] {
  const arr: PickerOption[] = []
  for (let i = 1; i <= max; i++) {
    const v = pad && i < 10 ? `0${i}` : `${i}`
    arr.push({ text: v, value: v })
  }
  return arr
}

function rangeOptionArray0(max: number): PickerOption[] {
  // 0~max-1，适合小时、分钟、秒
  const arr: PickerOption[] = []
  for (let i = 0; i < max; i++) {
    const v = i < 10 ? `0${i}` : `${i}`
    arr.push({ text: v, value: v })
  }
  return arr
}

function getColumns() {
  let strTime = props.values ?? ''
  let date = strTime ? new Date(strTime.replace(/-/g, '/')) : new Date()
  if (isNaN(date.getTime())) date = new Date()

  // 提取年、月、日、时、分、秒，并字符串化为两位
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  // 填充选中值
  data.selectedValues = [
    `${Y}`,
    M < 10 ? `0${M}` : `${M}`,
    D < 10 ? `0${D}` : `${D}`,
    h < 10 ? `0${h}` : `${h}`,
    m < 10 ? `0${m}` : `${m}`,
    s < 10 ? `0${s}` : `${s}`
  ]

  // 年
  const currentYear = new Date().getFullYear()
  const years: PickerOption[] = []
  for (let i = currentYear - 10; i < currentYear + 10; i++) {
    years.push({ text: `${i}`, value: `${i}` })
  }
  data.columns.push(years)

  // 月
  data.columns.push(rangeOptionArray(12))

  // 日（根据当前年和月天数判断天数）
  const days = getCountDays(Y, M)
  data.columns.push(rangeOptionArray(days))

  // 时，分，秒（0~23/59/59）
  data.columns.push(rangeOptionArray0(24))
  data.columns.push(rangeOptionArray0(60))
  data.columns.push(rangeOptionArray0(60))
}

function getCountDays(year: number, month: number) {
  //获取某年某月多少天
  let day = new Date(year, month, 0)
  return day.getDate()
}

// 关闭弹框
function confirmOn() {
  emits('changeValue')
}

//时间选择器关闭 值不改变并关闭弹框
function cancelOn() {
  confirmOn()
}

// 时间选择器确定 值改变 ，这里i 可以控制最后 的日期格式
function onConfirm({ selectedValues }: { selectedValues: string[] }) {
  // selectedValues: ['2024','06','01','12','30','11']
  let endVal = `${selectedValues[0]}-${selectedValues[1]}-${selectedValues[2]} ${selectedValues[3]}:${selectedValues[4]}:${selectedValues[5]}`
  confirmOn()
  emits('confirm', endVal)
}
</script>
