/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 16:59:39
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-10-29 14:41:39
 * @FilePath: \wanWanApp\src\directive\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { decimal, number, oneORzero, percent } from './directives' // 数字指令

const directive: Array<{ name: string; directive: any }> = [
  { name: 'decimal', directive: decimal },
  { name: 'number', directive: number },
  { name: 'percent', directive: percent },
  { name: 'oneORzero', directive: oneORzero }
]

export default directive
