/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-20 16:15:52
 * @FilePath: \wanWanApp\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    host: true,
    port: 8001,
    open: true,
    cors: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001/api',
        changeOrigin: true,
        rewrite: path => path.replace('/api', '')
      }
    }
  }
})
