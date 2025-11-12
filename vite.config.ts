/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-12 16:09:34
 * @FilePath: \wanWanApp\vite.config.ts
 * @Description: Vite 配置
 */

import uni from '@dcloudio/vite-plugin-uni'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    uni(),
    vueJsx({
      // ✅ 以下配置确保在小程序端 JSX 可正常编译
      transformOn: true, // 支持 onClick / onTap 等事件
      mergeProps: true, // 合并相同属性（防止重复属性警告）
      enableObjectSlots: false, // 避免部分平台 slot 编译出错
      isCustomElement: tag => tag.startsWith('uni-') // 将 uni- 开头的组件识别为自定义元素
    })
  ],
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
