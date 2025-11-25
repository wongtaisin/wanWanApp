<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 16:07:15
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-25 08:54:43
 * @FilePath: \wanWanApp\src\pages\log\index.vue
 * @Description: 店铺列表
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
-->
<template>
  <scroll-view scroll-y style="height: calc(100vh - 22rpx)" @scrolltolower="loadMore">
    <uni-list>
      <uni-swipe-action ref="swipeActionRef">
        <!-- 右侧带角标 -->
        <uni-swipe-action-item
          v-for="(item, i) in tableData"
          :key="item.id"
          :right-options="[{ text: '删除', style: { backgroundColor: '#dd524d' } }]"
          @click="handleClick($event, item, i)"
          @change="swipeChange($event, i)"
        >
          <uni-list-item
            :title="item.request_url"
            :note="`${item.user_name} ${_utils.formatDate(
              item.create_time,
              'yyyy-MM-dd hh:mm:ss'
            )}`"
          >
            <template v-slot:footer>
              <view class="chat-custom-right">
                <uni-tag
                  :text="statusMap[item.status_code].text"
                  :type="statusMap[item.status_code].type"
                  :circle="true"
                />
              </view>
            </template>
          </uni-list-item>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </uni-list>
    <!-- 加载提示 -->
    <uni-load-more :status="status" />
  </scroll-view>
</template>

<script lang="ts" setup>
import { operationDelete, operationLog } from '@/services/log'
import _utils from '@/utils/utils'
import { onMounted, ref } from 'vue'

const status = ref('more') // more/loading/noMore
const params = ref({ page: 1, pageSize: 20 })
const tableData = ref<any>([])
const swipeActionRef = ref()

const statusMap = {
  200: { text: '成功', type: 'success' },
  304: { text: '未修改', type: 'warning' },
  400: { text: '客户端错误', type: 'danger' },
  401: { text: '未授权', type: 'danger' },
  403: { text: '禁止访问', type: 'danger' },
  404: { text: '资源不存在', type: 'danger' },
  500: { text: '服务器错误', type: 'danger' }
} as any

const handleClick = async (e: any, row: any, i: number) => {
  if (e.content.text === '修改') {
    console.log(`修改`)
  } else {
    await operationDelete(row.id)
    tableData.value.splice(i, 1)
    uni.showToast({ title: '删除成功', icon: 'success' })
  }
}

const swipeChange = (e: any, index: number) => {
  console.log(e, index)
}

const loadMore = () => {
  if (status.value !== 'more') return
  params.value.page++
  init()
}

const init = async () => {
  status.value = 'loading'
  const { list, total } = await operationLog(params.value)
  tableData.value = [...tableData.value, ...list]
  status.value = tableData.value.length >= total ? 'noMore' : 'more'
}

onMounted(init)
</script>

<style lang="scss" scoped>
.shop-page {
  height: 100vh;
}
</style>
