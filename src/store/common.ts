/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 14:17:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-10 15:05:58
 * @FilePath: \wanWanApp\src\store\common.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShops = defineStore('useShops', {
  state: () => ({
    data: ref()
  }),
  actions: {
    setUseShop(data: any) {
      this.data = data
    },
    getUseShop(data: any) {
      return data
    }
  },
  getters: {},
  persist: {
    key: 'useShop',
    storage: sessionStorage,
    pick: ['data']
  }
})

// 存储选中的店铺
export const useShop = defineStore(
  'useShop',
  () => {
    const data = ref<any>({})

    const setUseShop = (row: any) => {
      data.value = row
    }

    return {
      data,
      setUseShop
    }
  },
  {
    persist: {
      key: 'selectShop',
      storage: sessionStorage,
      pick: ['data']
    }
  }
)
