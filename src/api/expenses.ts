/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-14 09:00:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-03 13:51:26
 * @FilePath: \wanWanApp\src\services\expenses.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/api/request'

export const expensesList = async (params: any) => {
  const res: any = await request('/expenses/list', 'POST', params)
  return res
}

export const expensesCheck = async (params: any) => {
  const res: any = await request('/expenses/check', 'POST', params)
  return res
}

export const expensesTotal = async (params: any) => {
  const res: any = await request('/expenses/total', 'GET', params)
  return res
}
