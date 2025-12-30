/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 14:17:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-29 11:47:33
 * @FilePath: \wanWanApp\src\store\common.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import uniStorage from '@/utils/uniStorage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
      storage: uniStorage,
      paths: ['data']
    }
  }
)
