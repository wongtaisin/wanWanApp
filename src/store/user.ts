/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-03 14:57:14
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-03 15:36:12
 * @FilePath: \wanWanApp\src\store\user.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

import { userInfo } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserInfo {
  userId: string // 用户id
  userName: string // 用户名
  phone: string // 手机号
}

export const getInfo = defineStore('getInfo', {
  state: () => ({
    user: ref<UserInfo>({
      userId: '',
      userName: '',
      phone: ''
    }), // 用户信息
    permissions: ref<string[]>([]) // 权限
  }),
  actions: {
    // 使用接口调用
    async getUserInfo() {
      const res = await userInfo()
      return res
    },
    // 设置用户信息
    setUserInfo(data: any) {
      this.user = data.user
      this.permissions = data.permissions
    }
  },
  getters: {
    fetchUserInfo: (state: any) => state.user
  },
  persist: {
    key: 'userInfo',
    storage: sessionStorage,
    pick: ['user', 'permissions'] // 指定state 那些参数需要持久化, [] 表示 undefine 或者 null
  }
})
