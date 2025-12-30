/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-03 14:57:14
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-29 14:22:00
 * @FilePath: \wanWanApp\src\store\user.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { userInfo } from '@/api/user'
import uniStorage from '@/utils/uniStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface UseInfo {
  userId: string
  userName: string
  phone: string
}

export const useInfoStore = defineStore(
  'userInfo',
  () => {
    const user = ref<UseInfo>({
      userId: '',
      userName: '',
      phone: ''
    })
    const permissions = ref<string[]>([])

    const getUserInfo = async () => {
      const res = await userInfo()
      return res
    }

    const setUserInfo = (data: any) => {
      user.value = data.user
      permissions.value = data.permissions
    }

    const fetchUserInfo = computed(() => user.value)

    return {
      user,
      permissions,
      getUserInfo,
      setUserInfo,
      fetchUserInfo
    }
  },
  {
    persist: {
      key: 'userInfo',
      storage: uniStorage,
      paths: ['user', 'permissions']
    }
  }
)
