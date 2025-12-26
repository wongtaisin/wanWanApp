<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:27:20
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-27 08:15:51
 * @FilePath: \wanWanApp\src\components\common\forms.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-forms
    ref="formRef"
    :rules="props.rules"
    :model="params"
    :label-width="props.labelWidth"
    :label-align="props.labelAlign"
  >
    <uni-forms-item
      v-for="(column, i) in formColumns"
      :key="i"
      :label="column.label"
      :name="column.prop"
      :required="column.required ?? false"
    >
      <uni-easyinput
        :disabled="column.disabled ?? false"
        :type="column.type"
        :placeholder="column.placeholder || '请输入'"
        v-model="params[column.prop]"
        @click="column.handler"
      />
    </uni-forms-item>

    <slot />

    <button class="forms-button" @click="onSubmit">{{ props.buttonText }}</button>
  </uni-forms>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface FormData {
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

interface Props {
  columns: FormData[]
  labelWidth?: string
  labelAlign?: 'left' | 'right'
  rules?: Record<string, any> // 验证
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  labelAlign: 'left',
  buttonText: '提交'
})

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const formColumns = computed(() => props.columns)
const emits = defineEmits(['submit'])
const formRef = ref()

const onSubmit = async () => {
  formRef.value
    .validate()
    .then((res: any) => {
      emits('submit', res)
    })
    .catch((err: any) => {
      console.error('err', err)
      // uni.showToast({ title: `${err[0].errorMessage}` })
    })
}
</script>

<style lang="scss" scoped>
.forms-button {
  background: #007aff;
  color: white;
  font-size: 28rpx;

  &:hover {
    background: #3f98f7;
  }
}
</style>
