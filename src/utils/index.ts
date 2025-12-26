/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-09 09:59:21
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-26 09:08:46
 * @FilePath: \wanWanApp\src\utils\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import components from '@/components/index'
import directives from '@/directives/index'
import type { App, Component } from 'vue'
import _utils from './utils'

/**
 * 注册全局工具函数和指令
 * @desc 将工具函数和自定义指令注册到Vue应用实例中
 * @param {App} app - Vue应用实例
 */
const install = (app: App): void => {
  // 注册工具函数
  app.config.globalProperties.$utils = _utils

  // 注册指令
  directives.forEach(({ name, directive }: { name: string; directive: any }) => {
    app.directive(name, directive)
  })

  // 注册组件
  components.forEach(({ name, component }: { name: string; component: Component }) => {
    app.component(name, component)
  })
}

// 声明类型,扩展Vue全局属性
declare module 'vue' {
  interface ComponentCustomProperties {
    $utils: typeof _utils // 声明$utils工具函数的类型
  }
}

// 导出install函数供main.ts使用
export default install
