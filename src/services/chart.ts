/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-03 09:25:45
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-06 15:12:08
 * @FilePath: \wanWanApp\src\services\chart.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/services/request'

const expensesCheck = async (params: any) => {
  const res: any = await request('/expenses/check', 'POST', params)
  return res
}

export { expensesCheck }
