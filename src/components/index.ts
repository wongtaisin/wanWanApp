/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-01-09 11:50:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-05 08:38:57
 * @FilePath: \wanWanApp\src\components\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import type { Component } from 'vue'
import CommonForm from './CommonForm.vue'
import ExpensesPopup from './expensesPopup.vue'
import MothPicker from './mothPicker.vue'
import Progress from './progress.vue'

// 全局组件注册配置
const components: Array<{ name: string; component: Component }> = [
  { name: 'CommonForm', component: CommonForm },
  { name: 'CommonMothPicker', component: MothPicker },
  { name: 'CommonExpensesPopup', component: ExpensesPopup },
  { name: 'CommonProgress', component: Progress }
]

export default components
