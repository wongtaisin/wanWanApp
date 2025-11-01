<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-01 10:32:58
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-01 16:03:07
 * @FilePath: \wanWanApp\src\pages\chart\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="chart-page">
    <uni-row class="top">
      <uni-col :span="8">
        <text class="text">{{ params.startDate.slice(0, 4) }}年</text>
        <p class="money">
          {{ params.startDate.slice(5, 7) }}
          <text style="font-size: 28rpx">月</text>
        </p>
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

    <uni-list>
      <view class="list-top">
        <uni-row>
          <uni-col :span="12">
            <text>2025-11-01</text>
          </uni-col>
          <uni-col :span="12" style="text-align: right">
            <text>支出：32</text>
          </uni-col>
        </uni-row>
      </view>

      <uni-swipe-action>
        <!-- 右侧带角标 -->
        <uni-swipe-action-item
          v-for="(item, i) in tableData"
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
</template>

<script setup lang="ts">
import { request } from '@/services/request'
import { onMounted, reactive, ref } from 'vue'
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

const tableData = ref<any>([])
const params = ref({
  page: 1,
  pageSize: 10,
  userId: 1,
  startDate: utils.getCurrentMonthRange().firstDay,
  endDate: utils.getCurrentMonthRange().lastDay
})
const moneyTotal = ref(0)

/**
   * 初始化数据
   * @example 重新设计list，需要把每一天的支出都展示出来
   [
      {
        list:[
          {
            id: 1,
            shop_name: '店铺1',
            money: 32,
            create_date: '2025-11-01 10:00:00'
          },
          {
            id: 2,
            shop_name: '店铺2',
            money: 32,
            create_date: '2025-11-02 10:00:00'
          }
        ],
        date:'2025-11-01',
        total:64
      }
    ]
   */
const init = async () => {
  const res: any = await request('/expensesDetail/list', 'POST', params.value)
  tableData.value = res.list || []

  // 支出总金额
  const { total }: any = await request('/expenses/total', 'GET', params.value)
  moneyTotal.value = total
}

const onClick = (e: any, row: any) => {
  console.log(e, row)
}

const swipeChange = (e: any, index: number) => {
  console.log(e, index)
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.chart-page {
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
