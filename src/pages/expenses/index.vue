<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-03 11:46:25
 * @FilePath: \wanWanApp\src\pages\expenses\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="expenses-content">
    <!-- <uni-section title="请选择您的支出类型" type="line"/> -->
    <view class="grid-container">
      <uni-grid :column="4" :show-border="false">
        <uni-grid-item v-for="(item, i) in tableData" :key="i" @click="handleClick(item)">
          <view style="text-align: center; padding: 20rpx 0">
            <uni-icons :type="item.iconName" :size="28" />
            <text class="grid-text">{{ item.label }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <ExpensesPopup ref="popupRef" v-model="params" @onSubmit="onSubmit" />
  </view>
</template>

<script setup lang="ts">
import { request } from '@/services/request'
import _utils from '@/utils/utils'
import { ref } from 'vue'
import ExpensesPopup from '../common/expensesPopup.vue'

interface FormData {
  expensesName: string
  money: string
  paymentId: number
  paymentName: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

// 表单数据初始值
const initialFormData: FormData = {
  expensesName: '',
  money: '',
  // shopName: '',
  paymentId: 2,
  paymentName: '微信支付',
  createDate: ''
}

const params = ref<FormData>({ ...initialFormData })
const popupRef = ref()

const handleClick = (item: { label: string; prop: string; iconName: string }) => {
  popupRef.value.open() // 打开弹窗
  params.value = { ...initialFormData }
  params.value.createDate = _utils.formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss')
  params.value.expensesName = item.prop
}

const onSubmit = async (values: any) => {
  // 清理空字符串
  Object.keys(params.value).forEach(key => {
    if (params.value[key] === '') {
      delete params.value[key]
    }
  })

  console.log(values, `新增消费`, params.value)

  await request('/expensesDetail/add', 'POST', params.value)
    .then((res: any) => {
      const tit =
        tableData.value.find((item: any) => item.prop === values.expensesName)?.label || ''
      uni.showToast({
        title: `${tit}花费：￥${values.money}`,
        icon: 'success'
      })
    })
    .catch((err: any) => {
      console.error('新增失败:', err)
    })
    .finally(() => {
      popupRef.value.close()
    })
}

const tableData = ref([
  { label: '吃', prop: 'eat', iconName: 'gift' },
  { label: '喝', prop: 'drink', iconName: 'bag' },
  { label: '玩', prop: 'play', iconName: 'play-circle' },
  { label: '乐', prop: 'glad', iconName: 'heart-fill' },
  { label: '过路费', prop: 'tolls', iconName: 'rmb-circle' },
  { label: '车油', prop: 'oil', iconName: 'car-fill' },
  { label: '停车', prop: 'parking', iconName: 'car' },
  { label: '交通', prop: 'traffic', iconName: 'car' },
  { label: '超市', prop: 'supermarket', iconName: 'shopping-cart' },
  { label: '网购', prop: 'online_shopping', iconName: 'shopping-cart-fill' },
  { label: '话费', prop: 'phone_bill', iconName: 'phone' },
  { label: '红包', prop: 'red_packet', iconName: 'red-packet' },
  { label: 'vip', prop: 'vip', iconName: 'star-fill' },
  { label: '其他', prop: 'other', iconName: 'star-fill' }
])
</script>

<style lang="scss">
.expenses-content {
  width: 100vw;
  /* #ifdef APP */
  padding-bottom: calc(env(safe-area-inset-bottom) - 40rpx);
  /* #endif */

  /* #ifdef H5 */
  padding-bottom: var(--window-bottom);
  /* #endif */

  .grid-text {
    font-size: 28rpx;
    color: #333;
    display: block;
    margin-top: 10rpx;
  }

  .popup-title {
    font-size: 34rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30rpx;
  }
}
</style>
