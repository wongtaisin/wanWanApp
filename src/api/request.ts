/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-13 09:48:34
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-03-12 17:55:00
 * @FilePath: \wanWanApp\src\api\request.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

const URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL

const BASE_URL = `${URL}/api`

const getToken = () => {
  return uni.getStorageSync('token') || ''
}

// 从 header 中提取 token
const getHeaderToken = (header?: Record<string, any>) => {
  if (!header) return ''
  const raw =
    header.Authorization || // 优先取 Authorization
    header.authorization || // 次之取 authorization
    header.AUTHORIZATION || // 再次取 AUTHORIZATION
    header['authorization'] || // 再次取 authorization
    header['Authorization'] || // 最后取 Authorization
    '' // 兜底为空字符串
  if (!raw || typeof raw !== 'string') return ''
  return raw.startsWith('Bearer ') ? raw.slice(7) : raw
}

// 从 header 中提取 token 并保存到本地存储（H5 平台）
const saveTokenFromHeader = (header?: Record<string, any>) => {
  const nextToken = getHeaderToken(header)
  if (nextToken) {
    uni.setStorageSync('token', nextToken)
  }
}

// 从响应体中提取 token 并保存到本地存储（App/小程序平台）
const saveTokenFromBody = (data?: any) => {
  if (data && typeof data === 'object' && typeof data._newToken === 'string' && data._newToken) {
    uni.setStorageSync('token', data._newToken)
  }
}

export const request = (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data = {},
  header = {}
): Promise<any> => {
  const token = getToken()

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
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        /* #ifdef H5 */
        saveTokenFromHeader(res.header) // H5 平台：从响应头读取刷新的 token
        /* #endif */

        /* #ifdef APP */
        saveTokenFromBody(res.data) // App/小程序平台：从响应体读取刷新的 token
        /* #endif */

        const { statusCode, data: responseData } = res

        // 🔹 情况1：HTTP 层面 401（后端真返回 401）
        if (statusCode === 401) {
          handleAuthError()
          return reject({ type: 'AUTH_EXPIRED', original: res })
        }

        // 🔹 情况2：HTTP 请求成功（通常是 200），解析业务响应
        if (statusCode >= 200 && statusCode < 300) {
          // 假设后端结构：{ code: number; data: any; message: string }
          const { code, data, message } = responseData as any

          if (code === 200) {
            resolve(data)
          } else if (code === 401) {
            // 🔸 业务层 401（后端返回 200 但 body.code=401）
            handleAuthError()
            reject({ type: 'AUTH_EXPIRED', original: responseData })
          } else {
            // 其他业务错误
            const msg = message || '请求失败'
            uni.showToast({ title: msg, icon: 'none' })
            reject({ type: 'BUSINESS_ERROR', code, message, original: responseData })
          }
        } else {
          // 🔹 HTTP 非 2xx 错误（如 500、404 等）
          const msg = (responseData as any)?.message || '请求出错'
          uni.showToast({ title: msg, icon: 'none' })
          reject({ type: 'HTTP_ERROR', statusCode, original: res })
        }
      },
      fail: err => {
        // 网络层错误：断网、超时、域名解析失败等
        uni.showToast({ title: '网络异常，请检查网络', icon: 'none' })
        reject({ type: 'NETWORK_ERROR', original: err })
      }
    })
  })
}

// 抽离认证过期处理
function handleAuthError() {
  uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
  uni.removeStorageSync('token')
  uni.removeStorageSync('refresh_token')
  uni.reLaunch({ url: '/pages/login/index' })
}
