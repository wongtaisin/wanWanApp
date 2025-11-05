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
</template>

<script lang="ts" setup>
import { request } from '@/services/request'
import { computed, onMounted, ref } from 'vue'

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

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const popupRef = ref()
const shopLocal = ref()
const emits = defineEmits(['onSubmit'])

const loadShop = async () => {
  const res: any = await request('/shop/all', 'GET')
  shopLocal.value = res.map((item: any) => ({
    value: item.id,
    text: item.shop_name
  }))
}

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

defineExpose({
  open: () => popupRef.value.open(),
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
