/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-10-08 16:59:39
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-03 15:51:35
 * @FilePath: \wanWanApp\src\directive\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { decimal, number, oneORzero, percent } from './directives' // 数字指令
import hasPermi from './hasPermi' // 权限指令

const directive: Array<{ name: string; directive: any }> = [
  { name: 'decimal', directive: decimal },
  { name: 'number', directive: number },
  { name: 'percent', directive: percent },
  { name: 'oneORzero', directive: oneORzero },
  { name: 'hasPermi', directive: hasPermi }
]

export default directive
