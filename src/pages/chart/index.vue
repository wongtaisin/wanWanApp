<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-03 14:51:57
 * @FilePath: \wanWanApp\src\pages\chart\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="chart-page">
    <uni-row class="top">
      <uni-col :span="8">
        <text class="text">{{ month.slice(0, 4) }}年</text>
        <CommonMothPicker v-model="month" @change="onChange">
          <p class="money" @click="handleDate">
            {{ month.slice(5, 7) }}
            <text style="font-size: 28rpx">月</text>
          </p>
        </CommonMothPicker>
      </uni-col>
      <uni-col :span="8">
        <text class="text">收入</text>
        <p class="money">10086</p>
      </uni-col>
      <uni-col :span="8">
        <text class="text">支出</text>
        <p class="money">{{ moneyTotal }}</p>
      </uni-col>
    </uni-row>

    <uni-list v-for="group in tableData" :key="group.date">
      <view class="list-top">
        <uni-row>
          <uni-col :span="12">
            <text>{{ group.date }}</text>
          </uni-col>
          <uni-col :span="12" style="text-align: right">
            <text>支出：{{ group.total }}</text>
          </uni-col>
        </uni-row>
      </view>

      <uni-swipe-action ref="swipeActionRef">
        <!-- 右侧带角标 -->
        <uni-swipe-action-item
          v-for="(item, i) in group.list"
          :key="item.id"
          :right-options="options"
          @click="onClick($event, item)"
          @change="swipeChange($event, i)"
        >
          <uni-list-chat
            :title="item.shop_name"
            avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
            :note="item.create_date"
          >
            <view class="chat-custom-right">
              <text>-{{ item.money }}</text>
            </view>
          </uni-list-chat>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </uni-list>
  </view>

  <ExpensesPopup
    ref="expensesPopupRef"
    title="编辑"
    v-model="expensesParams"
    @onSubmit="onSubmit"
  />
</template>

<script setup lang="ts">
import { expensesDetailDelete, expensesDetailList, expensesTotal } from '@/services/chart'
import { expensesDetailEdit } from '@/services/expenses'
import { onMounted, reactive, ref } from 'vue'
import ExpensesPopup from '../common/expensesPopup.vue'
import utils from './utils'

const options = reactive([
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  },
  {
    text: '修改',
    style: {
      backgroundColor: '#007aff'
    }
  }
])

const month = ref(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`)
const tableData = ref<any>([])
const params = ref({
  page: 1,
  pageSize: 10,
  userId: 1,
  startDate: utils.getCurrentMonthRange(month.value).firstDay,
  endDate: utils.getCurrentMonthRange(month.value).lastDay
})
const moneyTotal = ref(0)
const expensesPopupRef = ref()
const expensesParams = ref<any>({})
const swipeActionRef = ref<any[]>([] as any[])

/**
 * 初始化数据
 */
const init = async () => {
  const result: any = await expensesDetailList(params.value)

  // 重新设计list，需要把每一天的支出都展示出来
  const grouped = Object.values(
    result.list.reduce((acc: any, item: any) => {
      const date = item.create_date.split(' ')[0] // 只取年月日
      if (!acc[date]) {
        acc[date] = { date, list: [], total: 0 }
      }
      acc[date].list.push(item)
      acc[date].total += parseFloat(item.money)
      return acc
    }, {})
  )
  tableData.value = grouped || []

  // 支出总金额
  const { total }: any = await expensesTotal({
    userId: 1,
    startDate: params.value.startDate,
    endDate: params.value.endDate
  })
  moneyTotal.value = total || 0
}

const handleDate = () => {
  console.log(`时间`)
}

const onChange = (e: any) => {
  month.value = e // 可设置可不设置，因为组件里使用了双向绑定
  params.value.startDate = utils.getCurrentMonthRange(month.value).firstDay
  params.value.endDate = utils.getCurrentMonthRange(month.value).lastDay
  init()
}

const onClick = async (e: any, row: any) => {
  console.log(e, row)
  if (e.content.text === '修改') {
    expensesParams.value = row
    expensesParams.value.expensesName = row.expenses_name
    expensesParams.value.shopName = row.shop_name
    expensesParams.value.paymentName = row.payment_name
    expensesParams.value.createDate = row.create_date
    // TODO: 需要一个getInfo 要获取到 shopId 和 paymentId
    // 使用 setTimeout 延迟打开弹窗，避免事件冒泡导致立即关闭
    setTimeout(() => {
      expensesPopupRef.value.open()
    }, 100)
  } else {
    Promise.all([await expensesDetailDelete(row.id), await init()])
  }
}

const swipeChange = (e: any, index: number) => {
  console.log(e, index)
}

const onSubmit = async (values: any) => {
  // 清理空字符串
  Object.keys(expensesParams.value).forEach(key => {
    if (expensesParams.value[key] === '') {
      delete expensesParams.value[key]
    }
  })

  console.log(values, `编辑消费`, expensesParams.value)

  try {
    await expensesDetailEdit(expensesParams.value)
    uni.showToast({
      title: `编辑成功`,
      icon: 'success'
    })
    const refs: any = swipeActionRef.value
    // 优化：兼容 ref="swipeActionRef" 可能为数组或单个实例，统一关闭所有 swipeAction 实例
    if (Array.isArray(refs)) {
      refs.forEach(inst => inst?.closeAll?.())
    } else {
      refs?.closeAll?.()
    }
    init()
  } catch {
    console.error(`报错`)
  } finally {
    expensesPopupRef.value.close()
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.chart-page {
  padding-bottom: 108rpx;
  .top {
    padding: 20rpx;
    background: #fede2b;

    .text {
      color: #7c7b7b;
    }

    .money {
      margin-top: 20rpx;
      font-size: 46rpx;
    }
  }

  .list-top {
    padding: 0 30rpx;
    line-height: 68rpx;
    color: #a0a0a0;
  }

  .chat-custom-right {
    display: flex;
    align-items: center;
    height: 68rpx;
  }
}
</style>
