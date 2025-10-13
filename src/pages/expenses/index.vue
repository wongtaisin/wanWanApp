<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-13 16:00:25
 * @FilePath: \wanWanApp\src\pages\expenses\index.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="expenses-content">
    <view class="title"> 请选择您的支出类型 </view>
    <view class="grid-container">
      <van-grid :columns="3">
        <van-grid-item
          v-for="item in tableData"
          :key="item.prop"
          :text="item.label"
          :prop="item.prop"
          @click="handleClick(item)"
        >
          <template #icon>
            <van-icon :name="item.iconName" />
          </template>
        </van-grid-item>
      </van-grid>
    </view>

    <van-action-sheet v-model:show="dialogVisible" title="新增消费">
      <CommonForm ref="commonFormRef" v-model="params" :columns="formColumns" @refresh="onSubmit">
        <van-field
          show-word-limit
          autosize
          label="备注"
          rows="3"
          label-align="top"
          label-width="auto"
          type="textarea"
          maxlength="300"
          name="remark"
          placeholder="请填写备注"
          v-model="params.remark"
        />
      </CommonForm>
    </van-action-sheet>
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
  { label: '吃', prop: 'eat', iconName: 'food' },
  { label: '喝', prop: 'drink', iconName: 'drink' },
  { label: '玩', prop: 'play', iconName: 'play-circle-o' },
  { label: '乐', prop: 'glad', iconName: 'hotel-o' },
  { label: '过路费', prop: 'tolls', iconName: 'road' },
  { label: '车油', prop: 'oil', iconName: 'gas' },
  { label: '停车', prop: 'parking', iconName: 'parking' },
  { label: '交通', prop: 'traffic', iconName: 'logistics' },
  { label: '超市', prop: 'supermarket', iconName: 'shop-o' },
  { label: '网购', prop: 'online_shopping', iconName: 'shopping-cart-o' },
  { label: '话费', prop: 'phone_bill', iconName: 'phone-o' },
  { label: '红包', prop: 'red_packet', iconName: 'bill-o' },
  { label: 'vip', prop: 'vip', iconName: 'vip-card-o' }
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
    font-size: 16px;
    color: #333;
    background: #f5f5f5;
    line-height: 36px;
    text-indent: 20px;
  }

  .van-icon {
    font-size: 28px;
    margin-bottom: 5px;
  }
}
</style>
