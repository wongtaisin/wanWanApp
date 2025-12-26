/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 11:50:03
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-08 16:43:06
 * @FilePath: \wanWanApp\src\components\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import type { Component } from 'vue'

import AutoUploadFile from '@/components/autoUploadFile.vue'
import CommonForm from '@/components/common/forms.vue'
import CommonProgress from '@/components/common/progress.vue'
import ExpensesPopup from '@/components/expensesPopup.vue'
import MothPicker from '@/components/mothPicker.vue'

// 全局组件注册配置
const components: Array<{ name: string; component: Component }> = [
  { name: 'AutoUploadFile', component: AutoUploadFile },
  { name: 'CommonForm', component: CommonForm },
  { name: 'CommonProgress', component: CommonProgress },
  { name: 'ExpensesPopup', component: ExpensesPopup },
  { name: 'MothPicker', component: MothPicker }
]

export default components
