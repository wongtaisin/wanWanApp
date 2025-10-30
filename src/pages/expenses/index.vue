<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-30 16:56:07
 * @FilePath: \wanWanApp\src\pages\expenses\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="expenses-content">
    <uni-section title="请选择您的支出类型" type="line"></uni-section>
    <view class="grid-container">
      <uni-grid :column="4">
        <uni-grid-item v-for="(item, i) in tableData" :key="i" @click="handleClick(item)">
          <view style="text-align: center; padding: 20rpx 0">
            <uni-icons :type="item.iconName" :size="28" />
            <text class="grid-text">{{ item.label }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <uni-popup ref="popupRef" type="bottom" background-color="#fff" borderRadius="20rpx 20rpx 0 0">
      <view style="padding: 20rpx">
        <view class="popup-title"> 新增消费</view>
        <CommonForm
          ref="commonFormRef"
          label-align="right"
          label-width="140rpx"
          :rules="rules"
          v-model="params"
          :columns="formColumns"
          @refresh="onSubmit"
        >
          <uni-forms-item label="支付类型" name="paymentId" required>
            <uni-data-select
              placeholder="请选择支付类型"
              v-model="params.paymentId"
              :localdata="range"
              @change="(val: number) => handleChange(range, val, 'paymentName')"
            />
          </uni-forms-item>
          <uni-forms-item label="店铺" name="shopName">
            <uni-data-select
              placeholder="请选择店铺"
              v-model="params.shopId"
              :localdata="shopLocal"
              @change="(val: number) => handleChange(shopLocal, val, 'shopName')"
            />
          </uni-forms-item>
          <uni-forms-item label="备注" name="remark">
            <uni-easyinput type="textarea" v-model="params.remark" placeholder="请输入备注" />
          </uni-forms-item>

          <uni-forms-item label="创建时间" name="createDate" required>
            <uni-datetime-picker type="datetime" return-type="string" v-model="params.createDate" />
          </uni-forms-item>
        </CommonForm>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { request } from '@/services/request'
import _utils from '@/utils/utils'
import { onMounted, ref } from 'vue'

interface FormData {
  expensesName: string
  money: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}
const params = ref<FormData>({
  expensesName: '',
  money: '',
  // shopName: '',
  paymentId: 2,
  paymentName: '微信支付',
  createDate: ''
})
const popupRef = ref()
const shopLocal = ref()

const loadShop = async () => {
  const res: any = await request('/shop/all', 'GET')
  shopLocal.value = res.map((item: any) => ({
    value: item.id,
    text: item.shop_name
  }))
}

const handleClick = (item: { label: string; prop: string; iconName: string }) => {
  popupRef.value.open() // 打开弹窗
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

/**
 * @description 下拉选择
 * @param {any[]} list
 * @param {number} val // 下拉选择的值
 * @param {string} name
 */
const handleChange = (list: any[], val: number, name: string) => {
  const found = list.find((item: any) => item.value === val)
  params.value[name] = found?.text ?? ''
}

const range = [
  { value: 1, text: '现金' },
  { value: 2, text: '微信支付' },
  { value: 3, text: '支付宝' },
  { value: 4, text: '信用卡' },
  { value: 5, text: '储蓄卡' },
  { value: 6, text: '抖音支付' }
]

const rules = {
  money: { rules: [{ required: true, errorMessage: '金额不能为空' }] },
  createDate: { rules: [{ required: true, errorMessage: '创建时间不能为空' }] },
  paymentId: {
    rules: [
      { required: true, errorMessage: '支付类型不能为空' },
      { format: 'number', errorMessage: '支付类型只能输入数字' }
    ]
  }
}

const formColumns = ref([
  {
    prop: 'expensesName',
    label: '支出类型',
    placeholder: '请输入expensesName',
    required: true,
    readonly: true,
    disabled: true
  },
  { prop: 'money', label: '金额', placeholder: '请输入金额', required: true }
])

onMounted(loadShop)
</script>

<style lang="scss">
.expenses-content {
  width: 100%;
  height: 100vh;

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
