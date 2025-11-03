<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-03 10:59:54
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-03 14:14:45
 * @FilePath: \wanWanApp\src\components\mothPicker.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <picker mode="date" fields="month" :value="params" @change="onChange">
    <!-- <view class="picker">
      {{ params }}
    </view> -->
    <slot />
  </picker>
</template>

<script lang="ts" setup>
const params = defineModel<string>('modelValue', { default: '' })
const emits = defineEmits(['change'])

const onChange = (e: any) => {
  params.value = e.detail.value
  emits('change', e.detail.value)
}
</script>
