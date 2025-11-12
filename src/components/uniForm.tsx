/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-12 11:10:55
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-12 15:09:43
 * @FilePath: \wanWanApp\src\components\UniForm.tsx
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import UniEasyinput from '@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue'
import UniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue'
import UniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue'
import { computed, defineComponent, ref } from 'vue'

interface FormData {
  [key: string]: any
}

export default defineComponent({
  name: 'commonUniForm',
  props: {
    columns: {
      type: Array as () => FormData[],
      required: true
    },
    labelWidth: String,
    labelAlign: {
      type: String as () => 'left' | 'right',
      default: 'left'
    },
    rules: Object,
    modelValue: {
      type: Object as () => FormData,
      default: () => ({})
    }
  },
  emits: ['update:modelValue', 'submit'],
  setup(props, { emit, slots }) {
    const formRef = ref()
    const params = computed(() => props.modelValue)
    const formColumns = computed(() => props.columns)

    const onSubmit = async () => {
      formRef.value
        ?.validate()
        .then((res: any) => {
          emit('submit', res)
        })
        .catch((err: any) => {
          console.error('验证失败', err)
        })
    }

    return () => (
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
                disabled={column.disabled}
                placeholder={column.placeholder}
                type={column.type || 'text'}
                clearable={column.clearable ?? true}
                modelValue={params.value[column.prop]}
                onUpdate:modelValue={(val: any) => {
                  params.value[column.prop] = val
                  emit('update:modelValue', params.value)
                }}
                onClick={column.handler}
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
  }
})
