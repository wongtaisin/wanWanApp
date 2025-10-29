/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-09-11 16:36:48
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-29 11:31:25
 * @FilePath: \wanWanApp\src\main.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { createSSRApp } from 'vue'
import App from './App.vue'
import './uni.scss'

// 导入工具函数
import Pinia from './store'
import install from './utils'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia).use(install)

  return { app }
}
