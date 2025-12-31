<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-12 09:30:14
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-13 09:52:34
 * @FilePath: \wanWanApp\src\pages\shop\edit.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-popup ref="popupRef" type="bottom" background-color="#fff" borderRadius="20rpx 20rpx 0 0">
    <view style="padding: 20rpx">
      <view class="popup-title">{{ props.title }}</view>
      <CommonUniForm
        ref="commonFormRef"
        label-align="right"
        label-width="150rpx"
        :rules="rules"
        v-model="params"
        :columns="formColumns"
        @submit="onSubmit"
      />
    </view>
  </uni-popup>
</template>

<script lang="tsx" setup>
import { shopEdit } from '@/api/shop'
import _utils from '@/utils/utils'
import { onShow } from '@dcloudio/uni-app'
import UniDatetimePicker from '@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue'
import { computed, ref } from 'vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '新增'
})

interface FormData {
  id?: number
  shopName: string
  province: string
  city: string
  area: string
  address: string
  images: string
  remark: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

const params = ref<FormData>({
  shopName: '',
  province: '',
  city: '',
  area: '',
  address: '',
  images: '',
  remark: '',
  createDate: ''
})
const popupRef = ref()
const emits = defineEmits(['refresh'])

const onSubmit = async (values: any) => {
  const op = { ...values, ...params.value }
  // Object.keys(op).forEach(key => {
  //   if (op[key] === null || op[key] === undefined || op[key] === '') {
  //     delete op[key]
  //   }
  // })

  console.log(op, `编辑店铺`)

  await shopEdit(op)
  uni.showToast({ title: '编辑成功', icon: 'success' })
  popupRef.value.close()
  emits('refresh')
}

const rules = computed(() => ({
  shopName: { rules: [{ required: true, errorMessage: '店铺不能为空' }] },
  address: {
    rules: [{ required: !params.value.provinceCode ? false : true, errorMessage: '地址不能为空' }]
  },

  createDate: { rules: [{ required: true, errorMessage: '创建时间不能为空' }] }
}))

const formColumns = computed(() => [
  { prop: 'shopName', label: '店铺', placeholder: '请输入店铺', required: true },
  {
    prop: 'areaCode',
    label: '省/市/区',
    placeholder: '请选择省/市/区',
    slot: {
      render: (row: any) => (
        <AreaCityChina
          modelValue={row.areaCode}
          onUpdate:modelValue={(val: any) => {
            Object.assign(row, {
              province: val.province,
              provinceCode: val.provinceCode,
              city: val.city,
              cityCode: val.cityCode,
              area: val.area,
              areaCode: val.areaCode
            })
          }}
        />
      )
    }
  },
  {
    prop: 'address',
    label: '地址',
    placeholder: '请输入地址',
    required: !params.value.provinceCode ? false : true
  },
  { prop: 'remark', label: '备注', placeholder: '请输入备注', type: 'textarea' },
  {
    prop: 'createDate',
    label: '创建时间',
    placeholder: '请选择创建时间',
    slot: {
      render: (row: any) => (
        <UniDatetimePicker
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择创建时间"
          modelValue={row.createDate}
          onUpdate:modelValue={(val: any) => (row.createDate = val)}
        />
      )
    }
  }
])

onShow(() => {})

defineExpose({
  opens: (row: FormData) => {
    params.value = _utils.toCamelCase(row)
    setTimeout(() => {
      popupRef.value.open()
    }, 100)
  },
  closes: () => popupRef.value.close()
})
</script>

<style lang="scss" scoped>
.popup-title {
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
}
</style>
