/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-13 09:48:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-28 10:23:07
 * @FilePath: \wanWanApp\src\services\request.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
const BASE_URL = '/api'

// 获取本地 token
const getToken = () => {
  return uni.getStorageSync('token') || ''
}

// 封装主请求方法
export const request = (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data = {},
  header = {}
) => {
  let token = getToken()

  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...header
      },
      success: async (res: any) => {
        const { statusCode, data } = res
        if (statusCode === 401) {
          // ✅ token 过期 → 重新登录
          uni.showToast({ title: data.message || '登录已过期，请重新登录', icon: 'none' })
          uni.removeStorageSync('token')
          uni.removeStorageSync('refresh_token')
          uni.reLaunch({ url: '/pages/login/index' })
          reject('Token expired')
        } else if (statusCode !== 200) {
          uni.showToast({ title: data.message || '请求出错', icon: 'none' })
          reject(res)
        } else {
          const { code, data, message } = res.data
          if (code === 200) {
            resolve(data)
          } else {
            console.error(res.data)
            uni.showToast({ title: message || '请求出错', icon: 'none' })
          }
        }
      },
      fail: err => {
        uni.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}
