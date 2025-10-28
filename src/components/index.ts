/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-09 11:50:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-01-14 11:01:10
 * @FilePath: \phone\src\components\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import type { Component } from 'vue'
import CommonForm from './CommonForm.vue'
import CommonDateTimePicker from './dateTimePicker.vue'

// 全局组件注册配置
const components: Array<{ name: string; component: Component }> = [
  { name: 'CommonForm', component: CommonForm },
  { name: 'CommonDateTimePicker', component: CommonDateTimePicker }
]

export default components
