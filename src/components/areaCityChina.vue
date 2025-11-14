<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 16:49:02
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-14 16:44:27
 * @FilePath: \wanWanApp\src\components\areaCityChina.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <!-- :map="{ text: 'catName', value: 'catName' }" -->
  <uni-data-picker
    :localdata="cateList"
    v-model="params"
    popup-title="请选择省/市/区"
    @change="onchange"
    @nodeclick="onNodeclick"
  />
</template>

<script lang="ts" setup>
import { areaData } from '@/services/common'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const cateList = ref<any[]>([])

const init = async () => {
  const result = await areaData()
  cateList.value = result
}

const params = defineModel('modelValue', { default: '' })

const emits = defineEmits(['change', 'nodeclick', 'update:modelValue'])

const onchange = (e: any) => {
  const item = {} as any
  const val = e.detail.value
  const textKeys = ['province', 'city', 'area']
  textKeys.forEach((key, i) => (item[key] = val[i]?.text))
  const codeKeys = ['provinceCode', 'cityCode', 'areaCode']
  codeKeys.forEach((key, i) => (item[key] = val[i]?.value))
  emits('change', item)
  emits('update:modelValue', item)
}

const onNodeclick = (e: any) => {
  emits('nodeclick', e)
}

onShow(() => {
  init()
})
</script>
