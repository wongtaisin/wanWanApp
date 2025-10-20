<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-14 15:43:17
 * @FilePath: \wanWanApp\src\pages\expenses\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="expenses-content">
    <view class="title"> 请选择您的支出类型 </view>
    <view class="grid-container">
      <uni-grid :column="4">
        <uni-grid-item v-for="(item, i) in tableData" :key="i" @click="handleClick(item)">
          <view style="text-align: center; padding: 20rpx 0">
            <uni-icons :type="item.iconName" :size="22" />
            <text class="grid-text">{{ item.label }}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <uni-popup v-model:show="dialogVisible" mode="bottom">
      <view style="background: #fff; padding: 20rpx; border-radius: 20rpx 20rpx 0 0">
        <view style="font-size: 32rpx; font-weight: bold; text-align: center; margin-bottom: 30rpx">
          新增消费
        </view>
        <CommonForm ref="commonFormRef" v-model="params" :columns="formColumns" @refresh="onSubmit">
          <uni-forms-item label="备注" name="remark">
            <textarea v-model="params.remark" class="textarea" />
          </uni-forms-item>
        </CommonForm>
        <button class="close-btn" @click="dialogVisible = false">关闭</button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { request } from '@/services/request'
import _utils from '@/utils/utils'
import { ref } from 'vue'

interface FormData {
  expenses_name: string
  money: string
  create_date: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}
const params = ref<FormData>({
  expenses_name: '',
  money: '',
  create_date: ''
})
const dialogVisible = ref(false)

const handleClick = (item: { label: string; prop: string; iconName: string }) => {
  dialogVisible.value = true
  params.value.create_date = _utils.formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss')
  params.value.expenses_name = item.prop

  console.log(item.prop, `点击了${item.label}`)
}

const onSubmit = async (values: any) => {
  console.log(values)

  request('/expensesDetail/add', 'POST', values)
    .then((res: any) => {
      uni.showToast({ title: res.message, icon: 'success' })
    })
    .catch((err: any) => {
      console.error('新增失败:', err)
    })
    .finally(() => {
      dialogVisible.value = false
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
  { label: 'vip', prop: 'vip', iconName: 'star-fill' }
])

const formColumns = ref([
  {
    prop: 'expenses_name',
    label: '支出类型',
    placeholder: '请输入expenses_name',
    required: true,
    readonly: true
  },
  { prop: 'money', label: '金额', placeholder: '请输入金额', required: true },
  { prop: 'create_date', label: '创建时间', placeholder: '请输入创建时间', required: true }
  // { prop: 'remark', label: '备注', placeholder: '请输入备注' }
])
</script>

<style lang="scss">
.expenses-content {
  width: 100%;
  height: 100vh;
  background: #f0f2f5;

  .title {
    font-size: 32rpx;
    color: #333;
    background: #f5f5f5;
    line-height: 72rpx;
    text-indent: 40rpx;
  }

  .grid-text {
    font-size: 24rpx;
    color: #333;
    display: block;
    margin-top: 10rpx;
  }

  .textarea {
    width: 100%;
    height: 150rpx;
    border: 1rpx solid #dcdfe6;
    border-radius: 4rpx;
    padding: 10rpx;
    box-sizing: border-box;
    font-size: 28rpx;
  }

  .close-btn {
    width: 100%;
    height: 80rpx;
    margin-top: 20rpx;
    background: #f5f5f5;
    color: #666;
    border: none;
    border-radius: 4rpx;
    font-size: 28rpx;
  }
}
</style>
