<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-29 08:32:05
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
          v-for="item in gridColumns"
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

    <van-action-sheet
      v-model:show="pickerVisible"
      destroy-on-close
      position="bottom"
      :title="pickerType === 1 ? '支付类型' : '店铺'"
    >
      <van-picker
        :columns="pickerType === 1 ? paymentColumns : shopColumns"
        :model-value="pickerValue"
        @confirm="handleConfirm"
        @cancel="pickerVisible = false"
      />
    </van-action-sheet>
  </view>

  <DateTimePicker
    :showPicker="dateTimeVisible"
    @changeValue="() => (dateTimeVisible = false)"
    @confirm="(val: string) => (params.createDate = val)"
  />
</template>

<script setup lang="tsx">
import DateTimePicker from '@/components/dateTimePicker.vue'
import { request } from '@/services/request'
import _utils from '@/utils/utils'
import { Field } from 'vant'
import { onMounted, ref, watch } from 'vue'

interface FormData {
  expensesName: string
  money: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}
const params = ref<FormData>({
  expensesName: '',
  money: '',
  shopName: '',
  paymentName: '',
  createDate: ''
})
const dialogVisible = ref(false)
const pickerVisible = ref(false)
const pickerValue = ref()
const pickerType = ref(1) // 1 支付类型，2 店铺
const paymentColumns = [
  { value: 1, text: '现金' },
  { value: 2, text: '微信支付' },
  { value: 3, text: '支付宝' },
  { value: 4, text: '信用卡' },
  { value: 5, text: '储蓄卡' },
  { value: 6, text: '抖音支付' }
]
const shopColumns = ref<any[]>([])
const dateTimeVisible = ref(false)

const loadShop = async () => {
  const res: any = await request('/shop/all', 'GET')
  shopColumns.value = res.map((item: any) => ({
    value: item.id,
    text: item.shop_name
  }))
}

const handleClick = (item: { label: string; prop: string; iconName: string }) => {
  dialogVisible.value = true
  params.value.createDate = _utils.formatDate(Date.now(), 'yyyy-MM-dd hh:mm:ss')
  params.value.paymentName = '微信支付'
  params.value.expensesName = item.prop
}

const handleConfirm = ({ selectedOptions }: any) => {
  const name = pickerType.value === 1 ? 'paymentName' : 'shopName'
  params.value[name] = selectedOptions[0].text
  pickerVisible.value = false
}

const onSubmit = async (values: any) => {
  console.log(values, params.value, `新增消费`)
  request('/expensesDetail/add', 'POST', params.value)
    .then((res: any) => {
      uni.showToast({ title: `新增成功`, icon: 'success' })
    })
    .catch((err: any) => {
      console.error('新增失败:', err)
    })
    .finally(() => {
      dialogVisible.value = false
    })
}

const gridColumns = ref([
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
    prop: 'expensesName',
    label: '支出类型',
    placeholder: '请输入expensesName',
    required: true,
    readonly: true,
    disabled: true
  },
  {
    prop: 'money',
    label: '金额',
    placeholder: '请输入金额',
    type: 'number',
    required: true
  },
  {
    prop: 'paymentName',
    label: '支付类型',
    placeholder: '请选择支付类型',
    required: true,
    readonly: true,
    slot: {
      render: (row: any) => (
        <Field
          required
          readonly
          label="支付类型"
          placeholder="请选择支付类型"
          onClick={() => {
            pickerVisible.value = true
            pickerType.value = 1
          }}
          modelValue={row.paymentName}
          onUpdate:modelValue={(value: any) => (row.paymentName = value)}
        />
      )
    }
  },
  {
    prop: 'shopName',
    label: '店铺',
    placeholder: '请选择店铺',
    readonly: true,
    slot: {
      render: (row: any) => (
        <Field
          readonly
          label="店铺"
          placeholder="请选择店铺"
          onClick={() => {
            pickerVisible.value = true
            pickerType.value = 2
          }}
          modelValue={row.shopName}
          onUpdate:modelValue={(value: any) => (row.shopName = value)}
        />
      )
    }
  },
  {
    prop: 'createDate',
    label: '创建时间',
    placeholder: '请输入创建时间',
    required: true,
    slot: {
      render: (row: any) => (
        <Field
          required
          readonly
          label="创建时间"
          placeholder="请输入创建时间"
          onClick={() => (dateTimeVisible.value = true)}
          modelValue={row.createDate}
          onUpdate:modelValue={(value: any) => (row.createDate = value)}
        />
      )
    }
  }
  // { prop: 'remark', label: '备注', placeholder: '请输入备注' }
])

watch(
  () => dialogVisible.value,
  (newVal: any, _oldVal: any) => {
    if (newVal === false) {
      params.value = {
        expensesName: '',
        money: '',
        shopName: '',
        paymentName: '',
        createDate: ''
      }
    }
  },
  { immediate: true }
)

onMounted(loadShop)
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
