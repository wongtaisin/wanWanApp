<template>
  <view class="shop-add">
    <uni-forms ref="formRef" :model="params" :rules="rules">
      <uni-forms-item label="店铺" name="shopName" :required="true">
        <uni-easyinput v-model="params.shopName" placeholder="请输入店铺" />
      </uni-forms-item>
      <uni-forms-item label="省份" name="province">
        <AreaCityChina />
      </uni-forms-item>
      <uni-forms-item label="详细地址" name="address">
        <uni-easyinput v-model="params.address" placeholder="请输入详细地址" />
      </uni-forms-item>
      <uni-button type="primary" size="large" @click="onSubmit">提交</uni-button>
    </uni-forms>
  </view>
</template>

<script lang="ts" setup>
// import { shopAdd } from '@/services/shop'
import AreaCityChina from '@/components/areaCityChina.vue'
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

const rules = {
  shopName: { rules: [{ required: true, errorMessage: '用户名不能为空' }] },
  province: { rules: [{ required: true, errorMessage: '省份不能为空' }] }
}

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
      console.log(res, `新增店铺`, params)
      // await shopAdd(res)
      uni.showToast({ title: '新增店铺成功', icon: 'success' })
      // uni.navigateBack()
    })
    .catch((err: any) => {
      console.error('err', err)
      uni.showToast({ title: `${err[0].errorMessage}` })
    })
}
</script>

<style scoped lang="scss">
.shop-add {
  padding: 40rpx;
}
</style>
