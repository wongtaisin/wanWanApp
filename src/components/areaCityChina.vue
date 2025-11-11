<!--
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 16:49:02
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-11 09:56:22
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
import cityRows from '@/json/area-city-china.json'
import { ref } from 'vue'

const params = ref()

const handleTree = (data: any, parent_code = null) => {
  let res = []
  let keys = {
    id: 'code',
    pid: 'parent_code',
    children: 'children',
    text: 'name',
    value: 'code'
  }
  let oneItemDEMO = {
    text: '',
    value: '',
    children: []
  }
  let oneItem = {} as any

  // 循环
  for (let index in data) {
    // 判断
    if (parent_code === null) {
      // 顶级菜单 - 省
      if (!data[index].hasOwnProperty(keys.pid) || data[index][keys.pid] == parent_code) {
        // 不存在parent_code，或者已匹配
        oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
        oneItem.text = data[index][keys.text]
        oneItem.value = data[index][keys.value]

        // 递归下去
        oneItem.children = handleTree(data, data[index][keys.id])
        res.push(oneItem)
      }
    } else {
      // 非顶级菜单 - 市、区、街道
      if (data[index].hasOwnProperty(keys.pid) && data[index][keys.pid] == parent_code) {
        // 已匹配
        oneItem = JSON.parse(JSON.stringify(oneItemDEMO))
        oneItem.text = data[index][keys.text]
        oneItem.value = data[index][keys.value]

        // 递归下去
        oneItem.children = handleTree(data, data[index][keys.id])
        res.push(oneItem)
      }
    }
  }

  return res
}

const cateList = handleTree(cityRows)
const emits = defineEmits(['change', 'nodeclick'])

const onchange = (e: any) => {
  emits('change', e.detail)
}

const onNodeclick = (e: any) => {
  emits('nodeclick', e)
}
</script>
