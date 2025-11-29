<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-27 08:48:42
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-27 13:36:31
 * @FilePath: \wanWanApp\src\pages\log\detail.vue
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <uni-popup ref="popupRef" type="center">
    <uni-list :border="true" style="width: 680rpx">
      <uni-list-item title="ID" :rightText="`${String(params.user_id)}`" />
      <uni-list-item title="用户" :rightText="`${params.user_name}`" />
      <uni-list-item
        title="日期"
        :rightText="`${_utils.formatDate(params.create_time, 'yyyy-MM-dd hh:mm:ss')}`"
      />
      <uni-list-item title="设备" :note="params.user_agent" />
      <uni-list-item title="ip" :rightText="params.ip_address" />
      <uni-list-item title="模块" :rightText="params.module" />
      <uni-list-item title="接口形式" :rightText="params.request_method" />
      <uni-list-item title="请求地址" :note="params.request_url" />
      <uni-list-item title="提交参数" :note="params.request_params" />
    </uni-list>
  </uni-popup>
</template>

<script lang="ts" setup>
import _utils from '@/utils/utils'
import { ref } from 'vue'

const params = ref()
const popupRef = ref()

const init = (rows: any) => {
  params.value = rows
}

defineExpose({
  opens: (rows: any) => {
    popupRef.value.open()
    init(rows)
  },
  closes: () => popupRef.value.close()
})
</script>

<style lang="scss" scoped></style>
