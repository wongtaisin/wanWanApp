// utils/request.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3001/api'

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
      url: BASE_URL + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...header
      },
      success: async res => {
        // ✅ 业务层错误判断
        if (res.statusCode === 401) {
          // token 过期 → 重新登录
          uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
          uni.removeStorageSync('token')
          uni.removeStorageSync('refresh_token')
          uni.reLaunch({ url: '/pages/login/index' })
          reject('Token expired')
        } else if (res.statusCode !== 200) {
          uni.showToast({ title: (res.data as any).message || '请求出错', icon: 'none' })
          reject(res)
        } else {
          resolve(res.data)
        }
      },
      fail: err => {
        uni.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}
