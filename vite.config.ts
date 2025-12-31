/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 15:10:00
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-31 09:43:14
 * @FilePath: \wanWanApp\vite.config.ts
 * @Description: Vite 配置
 */

import uni from '@dcloudio/vite-plugin-uni'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  plugins: [
    uni(),
    vueJsx(),
    AutoImport({
      // 自动导入相关函数
      imports: ['vue', 'pinia'],

      // 📜 自动生成类型声明
      dts: path.resolve(pathSrc, 'types/auto-imports.d.ts'),

      // 自动导入自己的组合函数（可选）
      dirs: ['src/composables'], // 会自动导入该目录下所有 export 的函数

      // 支持 Vue 模板中使用（非 <script setup> 场景）
      vueTemplate: true,

      // ESLint 支持（解决 no-undef）
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // 设为 true 表示这些全局变量是只读的
      }
    }),
    // 自动注册自编组件
    Components({
      // 📂 扫描目录
      dirs: ['src/components'], // 自动注册 components 目录下的组件

      // 🔌 支持的文件扩展名
      extensions: ['vue', 'tsx'], // 自动注册 vue, tsx 文件

      // 🔍 是否深度扫描子目录
      deep: true, // 深度搜索组件目录，包括子目录

      // 📜 自动生成全局组件类型声明
      dts: path.resolve(pathSrc, 'types/auto-components.d.ts'),
      // dtsTsx: true, // 自动生成 tsx 类型声明文件（如果使用 TSX）

      // 🧬 命名空间：启用目录作为前缀
      directoryAsNamespace: true, // 允许子目录作为组件的命名空间前缀，如：<CommonHeader />
      collapseSamePrefixes: true, // 合并文件夹和组件的相同前缀（区分驼峰式命名空间）；以防止命名空间组件名称中出现重复；避免 User/UserCard → UserUserCard，会合并为 UserCard

      // 🌐 全局命名空间（可选）：允许 <Common/Button /> 写法
      globalNamespaces: ['Common'], // 可以在任何组件中直接使用 Common/组件名 来引用, 如：<Common/Button /> ；如不需要路径式写法，可设为 []

      // 🪝 自动导入指令（默认扫描 src/directives）
      directives: true,
      // directiveDirs: ['src/directives'], // 如需自定义路径可取消注释

      // 🎯 控制“在哪些文件中自动注入 import”
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.[jt]sx?$/ // 支持 .ts, .tsx, .js, .jsx
      ],

      // 🚫 排除不需要处理的目录
      exclude: [/[\\/]node_modules[\\/]/], // 排除 node_modules 目录

      // 🛡️ 安全选项：
      allowOverrides: false, // 禁止同名组件覆盖
      importPathTransform: v => v, // 🔄 导入路径转换（一般无需修改）

      // Vue 版本（可省略，自动检测）
      version: 3
    })
  ],
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  server: {
    host: true,
    port: 8001,
    open: true,
    cors: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001/api',
        // target: 'http://8.155.51.40:3001/api',
        changeOrigin: true,
        rewrite: path => path.replace('/api', '')
      }
    }
  }
})
