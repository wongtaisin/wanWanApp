<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 16:59:39
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-13 09:25:57
 * @FilePath: \wanWanApp\src\components\uniForm.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <component :is="containerRender" />
</template>

<script lang="tsx" setup>
import UniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
import UniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue'
import UniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue'
import { computed, ref, useSlots } from 'vue'

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
const emits = defineEmits(['submit'])
const formRef = ref()
const slots = useSlots() // 插槽

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

const containerRender = () => (
  <UniForms
    ref={formRef}
    rules={props.rules}
    model={params.value}
    label-width={props.labelWidth}
    label-align={props.labelAlign}
  >
    {formColumns.value.map(column => (
      <UniFormsItem label={column.label} name={column.prop} required={column.required ?? false}>
        {column.slot ? (
          column.slot.render(params.value)
        ) : (
          <UniEasyinput
            onClick={column.handler}
            disabled={column.disabled}
            placeholder={column.placeholder}
            type={column.type || 'text'}
            clearable={column.clearable ?? true}
            modelValue={params.value[column.prop]}
            onUpdate:modelValue={(val: any) => (params.value[column.prop] = val.trim())}
          />
        )}
      </UniFormsItem>
    ))}
    {slots.default?.()}
    <uni-button type="primary" size="large" onClick={onSubmit}>
      提交
    </uni-button>
  </UniForms>
)
</script>

<style lang="scss" scoped></style>
