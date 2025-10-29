<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:27:20
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-29 13:38:20
 * @FilePath: \wanWanApp\src\components\CommonForm.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-forms
    ref="formRef"
    :rules="rules"
    :model="params"
    :label-width="props.labelWidth"
    :label-align="props.labelAlign"
  >
    <template v-for="column in formColumns" :key="column.prop">
      <p v-if="column.title" class="title">{{ column.title }}</p>
      <template v-if="column.slot">
        <component :is="column.slot.render(params)" />
      </template>
      <template v-else>
        <uni-forms-item
          :label="column.label"
          :name="column.prop"
          :required="column.required ?? false"
        >
          <uni-easyinput
            :disabled="column.disabled"
            :placeholder="column.placeholder"
            v-model="params[column.prop]"
            @click="column.handler"
          />
        </uni-forms-item>
      </template>
      <p v-if="column.remark" class="remark">{{ column.remark }}</p>
    </template>

    <slot />

    <button type="primary" size="large" @click="onSubmit">提交</button>
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
}

const props = withDefaults(defineProps<Props>(), {
  labelAlign: 'left'
})

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const formColumns = computed(() => props.columns)
const emits = defineEmits(['refresh'])
const formRef = ref()

const onSubmit = async () => {
  formRef.value
    .validate()
    .then((res: any) => {
      emits('refresh', res)
    })
    .catch((err: any) => {
      console.error('err', err)
      // uni.showToast({ title: `${err[0].errorMessage}` })
    })
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 30rpx;
  color: #333;
  background: #f5f5f5;
  line-height: 72rpx;
  text-indent: 40rpx;
}

.remark {
  background: white;
  padding: 24rpx 30rpx;
  color: red;
}
</style>
