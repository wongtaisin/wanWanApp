<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 16:07:15
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-12 10:05:15
 * @FilePath: \wanWanApp\src\pages\shop\index.vue
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
          :right-options="[
            { text: '删除', style: { backgroundColor: '#dd524d' } },
            { text: '修改', style: { backgroundColor: '#007aff' } }
          ]"
          @click="onClick($event, item, i)"
          @change="swipeChange($event, i)"
        >
          <uni-list-item
            :title="item.shop_name"
            :note="[item.province, item.city, item.area, item.address].filter(Boolean).join('')"
          >
            <template v-slot:header>
              <image
                class="slot-image"
                src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
                mode="widthFix"
                style="width: 86rpx; margin-right: 20rpx"
              />
            </template>
          </uni-list-item>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </uni-list>
    <!-- 加载提示 -->
    <uni-load-more :status="status" />
  </scroll-view>

  <Edit ref="editRef" />
</template>

<script lang="ts" setup>
import { shopList } from '@/services/shop'
import { onMounted, ref } from 'vue'
import Edit from './edit.vue'

const status = ref('more') // more/loading/noMore
const params = ref({
  page: 1,
  pageSize: 15
})
const tableData = ref<any>([])
const swipeActionRef = ref()
const editRef = ref<any>()

const onClick = async (e: any, row: any, i: number) => {
  if (e.content.text === '修改') {
    // await shopEdit(row.id)
    editRef.value.opens(row)
    console.log(`修改`)
  } else {
    Promise.all([
      // await shopDelete(row.id),
      tableData.value.splice(0, i)
    ])

    console.log(`删除`)
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
  const { list, total } = await shopList(params.value)
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
