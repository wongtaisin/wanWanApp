/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-09-11 16:36:48
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-30 11:20:38
 * @FilePath: \wanWanApp\src\main.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import './uni.scss'

// 导入工具函数
import Pinia from './store/index'
import install from './utils/index'

console.log('环境变量：', import.meta.env.MODE, import.meta.env.VITE_API_BASE_URL)

// #ifdef H5
import VConsole from 'vconsole'

if (import.meta.env.MODE === 'development') {
  new VConsole()
}
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia).use(install)

  return { app }
}
