<template>
  <uni-popup ref="popupRef" type="bottom" background-color="#fff" borderRadius="20rpx 20rpx 0 0">
    <view style="padding: 20rpx">
      <view class="popup-title">{{ props.title }}</view>
      <CommonForm
        ref="commonFormRef"
        label-align="right"
        label-width="150rpx"
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

        <uni-forms-item label="店铺" name="shopId">
          <uni-easyinput
            v-model="params.shopName"
            placeholder="点击选择店铺"
            @focus="handleShopSelect"
          />
        </uni-forms-item>

        <!-- <uni-forms-item label="图片" name="image">
          <CommonAutoUploadFile
            limit="1"
            upload-url="/api/common/upload"
            file-mediatype="image"
            @success="handleUploadSuccess"
          />
        </uni-forms-item> -->

        <uni-forms-item label="备注" name="remark">
          <uni-easyinput type="textarea" v-model="params.remark" placeholder="请输入备注" />
        </uni-forms-item>

        <uni-forms-item label="创建时间" name="createDate" required>
          <uni-datetime-picker type="datetime" return-type="string" v-model="params.createDate" />
        </uni-forms-item>
      </CommonForm>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { useShop } from '@/store/common'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '新增'
})

interface FormData {
  expensesName: string
  money: string
  paymentId: number
  paymentName: string
  createDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

const userShop = useShop()
const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const popupRef = ref()
const emits = defineEmits(['onSubmit'])

// const handleUploadSuccess = (data: any) => {
//   // 存储上传成功后的图片URL
//   params.value.image = data.url
//   console.log('上传成功，图片URL:', data.url)
// }

const onSubmit = async (values: any) => {
  emits('onSubmit', values)
}

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

const handleShopSelect = () => {
  uni.navigateTo({
    url: '/pages/shop/indexedList'
  })
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
  // { prop: 'shopName', label: '店铺', placeholder: '请输入店铺' }
])

onShow(() => {
  params.value.shopId = userShop.data?.id
  params.value.shopName = userShop.data?.name
})

defineExpose({
  open: () => {
    popupRef.value.open()
    userShop.setUseShop(undefined)
  },
  close: () => popupRef.value.close()
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
