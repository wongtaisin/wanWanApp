// utils/request.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:3001/api'

// 获取本地 token
const getToken = () => {
  return uni.getStorageSync('token') || ''
}

// 刷新 token 的逻辑（示例）
const refreshToken = async () => {
  try {
    const refresh_token = uni.getStorageSync('refresh_token')
    if (!refresh_token) return null

    const res: any = await new Promise((resolve, reject) => {
      uni.request({
        url: `${BASE_URL}/auth/refresh`,
        method: 'POST',
        data: { refresh_token },
        success: res => resolve(res),
        fail: err => reject(err)
      })
    })

    if (res.statusCode === 200 && res.data.token) {
      uni.setStorageSync('token', res.data.token)
      return res.data.token
    } else {
      uni.removeStorageSync('token')
      uni.removeStorageSync('refresh_token')
      return null
    }
  } catch (err) {
    console.error('刷新 token 失败:', err)
    return null
  }
}

// 封装主请求方法
export const request = async (
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
          // token 过期 → 自动刷新
          const newToken = await refreshToken()
          if (newToken) {
            // 重新发起原请求
            uni.request({
              url: BASE_URL + url,
              method,
              data,
              header: {
                'content-type': 'application/json',
                Authorization: `Bearer ${newToken}`,
                ...header
              },
              success: res2 => resolve(res2.data),
              fail: err2 => reject(err2)
            })
          } else {
            uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
            uni.removeStorageSync('token')
            uni.removeStorageSync('refresh_token')
            uni.reLaunch({ url: '/pages/login/index' })
            reject('Token expired')
          }
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
