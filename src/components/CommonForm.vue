<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:27:20
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-28 11:33:49
 * @FilePath: \wanWanApp\src\components\CommonForm.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <template v-for="column in formColumns" :key="column.prop">
        <p v-if="column.title" class="title">{{ column.title }}</p>
        <template v-if="column.slot">
          <component :is="column.slot.render(params)" />
        </template>
        <template v-else>
          <van-field
            :type="column.type"
            :input-align="column.align"
            :error-message-align="column.align"
            :required="column.required ?? false"
            :readonly="column.readonly ?? false"
            :is-link="column.isLink ?? false"
            :name="column.prop"
            :label="column.label"
            :placeholder="column.placeholder"
            :rules="[{ required: column.required, message: column.placeholder }]"
            @click="column.handler"
            v-model="params[column.prop]"
          />
        </template>
        <p v-if="column.remark" class="remark">{{ column.remark }}</p>
      </template>
    </van-cell-group>

    <slot />

    <van-button
      style="width: 90%; margin: 5.33vw auto"
      round
      block
      type="primary"
      native-type="submit"
    >
      提交
    </van-button>
  </van-form>
</template>

<script setup lang="ts">
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
  font-size: 15px;
  color: #333;
  background: #f5f5f5;
  line-height: 36px;
  text-indent: 20px;
}

.remark {
  background: white;
  padding: 12px 15px;
  color: red;
}
</style>
