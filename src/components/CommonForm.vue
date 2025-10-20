<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:27:20
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-20 15:52:32
 * @FilePath: \wanWanApp\src\components\CommonForm.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-forms label-position="left" :model="params">
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
          :rules="[{ required: column.required, message: column.placeholder }]"
        >
          <input
            :placeholder="column.placeholder"
            :readonly="column.readonly ?? false"
            v-model="params[column.prop]"
            @click="column.handler"
            class="form-input"
          />
        </uni-forms-item>
      </template>
      <p v-if="column.remark" class="remark">{{ column.remark }}</p>
    </template>

    <slot />

    <uni-button
      style="width: 90%; margin: 5.33vw auto"
      type="primary"
      size="large"
      @click="onSubmit(params)"
    >
      提交
    </uni-button>
  </uni-forms>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface FormData {
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

interface Props {
  columns: FormData[]
  align?: 'left' | 'right' // 弃用
}

const props = withDefaults(defineProps<Props>(), {
  align: 'left'
})

const modelValue = defineModel<FormData>('modelValue', { default: {} })
const params = computed(() => modelValue.value)
const formColumns = computed(() => props.columns)
const emits = defineEmits(['refresh'])

const onSubmit = async (values: any) => {
  emits('refresh', values)
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

.form-input {
  width: 100%;
  height: 80rpx;
  border: 1rpx solid #dcdfe6;
  border-radius: 4rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}
</style>
