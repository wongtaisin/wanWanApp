/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-29 14:46:55
 * @FilePath: \wanWanApp\vite.config.ts
 * @Description: Vite 配置，统一转换 uni-ui px
 */

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import postcssPxtransform from 'postcss-pxtransform'
// import designWidth from './src/utils/designWidth' // TODO: 无法很好的转换，丢弃

const platform = process.env.UNI_PLATFORM

export default defineConfig({
  plugins: [uni()],
  // css: {
  //   postcss: {
  //     plugins: [
  //       postcssPxtransform({
  //         platform,
  //         designWidth, // 设计稿宽度
  //         unitPrecision: 5, // 保留 5 位小数
  //         minPixelValue: 1, // 小于 1px 不转换
  //         selectorBlackList: ['.ignore', '.hairlines'], // 忽略类名
  //       })
  //     ]
  //   }
  // },
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
