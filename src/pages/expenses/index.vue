<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-02 08:48:04
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
            <svg class="icon">
              <use :xlink:href="`#${item.icon}`" />
            </svg>
            <text class="grid-text">{{ item.label }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <CommonExpensesPopup ref="expensesPopupRef" v-model="params" @submit="onSubmit" />
  </view>
</template>

<script lang="ts" setup>
import { request } from '@/api/request'
import _utils from '@/utils/utils'
import { ref } from 'vue'

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
  paymentName: '微信',
  createDate: ''
}

const params = ref<FormData>({ ...initialFormData })
const expensesPopupRef = ref()

const handleClick = (item: { label: string; prop: string; icon: string }) => {
  expensesPopupRef.value.open() // 打开弹窗
  params.value = { ...initialFormData }
  params.value.createDate = _utils.formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss')
  params.value.expensesName = item.prop
}

const onSubmit = async (values: any) => {
  const mergedRow = { ...values, ...params.value }

  console.log(`新增消费`, mergedRow)

  await request('/expensesDetail/add', 'POST', params.value)
    .then((_res: any) => {
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
      expensesPopupRef.value.close()
    })
}

const tableData = ref([
  { label: '吃', prop: 'eat', icon: 'icon-food-mifan' },
  { label: '喝', prop: 'drink', icon: 'icon-kekoukele2' },
  { label: '玩', prop: 'play', icon: 'icon-a-GamePadyouxishoubing' },
  { label: '乐', prop: 'glad', icon: 'icon-zhoubianyule' },
  { label: '过路费', prop: 'tolls', icon: 'icon-guolufei' },
  { label: '车油', prop: 'oil', icon: 'icon-jiayouzhan2' },
  { label: '停车费', prop: 'parking', icon: 'icon-tingchefeiyong' },
  { label: '交通费', prop: 'traffic', icon: 'icon-gongjiaoche' },
  { label: '超市', prop: 'supermarket', icon: 'icon-chaoshi2' },
  { label: '网购', prop: 'online_shopping', icon: 'icon-wanggou' },
  { label: '话费', prop: 'phone_bill', icon: 'icon-dianhua' },
  { label: '红包', prop: 'red_packet', icon: 'icon-hongbao2' },
  { label: 'vip', prop: 'vip', icon: 'icon-vip1' },
  { label: '其他', prop: 'other', icon: 'icon-qitafeiyong' }
])
</script>

<style lang="scss" scoped>
.expenses-content {
  width: 100vw;
  margin-top: 40rpx;
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

  .icon {
    width: 80rpx;
    height: 80rpx;
    margin: 0 auto;
  }
}
</style>
