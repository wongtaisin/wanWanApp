<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 16:12:42
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-12 15:18:13
 * @FilePath: \wanWanApp\src\pages\shop\add.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <view class="shop-add">
    <CommonForm
      ref="commonFormRef"
      label-align="right"
      label-width="150rpx"
      :rules="rules"
      v-model="params"
      :columns="formColumns"
      @refresh="onSubmit"
    >
      <uni-forms-item label="省/市/区">
        <AreaCityChina @change="handleChange" />
      </uni-forms-item>

      <uni-forms-item label="详细地址" name="address">
        <uni-easyinput v-model="params.address" placeholder="请输入详细地址" />
      </uni-forms-item>

      <uni-forms-item label="备注" name="remark">
        <uni-easyinput
          v-model="params.remark"
          :maxlength="100"
          type="textarea"
          placeholder="请输入备注"
        />
      </uni-forms-item>
    </CommonForm>
  </view>
</template>

<script lang="ts" setup>
import AreaCityChina from '@/components/areaCityChina.vue'
import { shopAdd } from '@/services/shop'
import { reactive, ref } from 'vue'

interface FormData {
  shopName: string
  province: string
  city: string
  area: string
  address: string
  images: string
  remark: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

const initialFormData: FormData = {
  shopName: '',
  province: '',
  city: '',
  area: '',
  address: '',
  images: '',
  remark: ''
}

const params = reactive<FormData>({ ...initialFormData })
const formRef = ref()

const handleChange = ({ value }: any) => {
  const china = ['province', 'city', 'area']
  china.forEach((key, index) => (params[key] = value[index].text || ''))
  console.log(params, `params`)
}

const rules = {
  shopName: { rules: [{ required: true, errorMessage: '店铺不能为空' }] }
}

const formColumns = [{ prop: 'shopName', label: '店铺', placeholder: '请输入店铺', required: true }]

const onSubmit = () => {
  // 清理空字符串
  Object.entries(params).forEach(([key, value]) => {
    if (value === '') {
      delete params[key]
    }
  })

  formRef.value
    .validate()
    .then(async (res: any) => {
      const op = { ...res, ...params }
      console.log(op, `新增店铺`)
      await shopAdd(op)
      uni.showToast({ title: '新增店铺成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    })
    .catch((err: any) => console.error('err', err))
}
</script>

<style scoped lang="scss">
.shop-add {
  padding: 40rpx;
}
</style>
