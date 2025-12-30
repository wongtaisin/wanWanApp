/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-29 14:14:41
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-29 14:14:49
 * @FilePath: \wanWanApp\src\utils\uniStorage.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
const uniStorage = {
  getItem(key: string) {
    const v = uni.getStorageSync(key)
    return v == null || v === '' ? null : String(v)
  },
  setItem(key: string, value: string) {
    uni.setStorageSync(key, value)
  },
  removeItem(key: string) {
    uni.removeStorageSync(key)
  }
}

export default uniStorage
