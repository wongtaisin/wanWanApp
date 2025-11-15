/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-14 09:00:29
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-15 17:12:59
 * @FilePath: \wanWanApp\src\services\expenses.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/services/request'

export const expensesList = async (params: any) => {
  const res: any = await request('/expenses/list', 'POST', params)
  return res
}

export const expensesCheck = async (params: any) => {
  const res: any = await request('/expenses/check', 'POST', params)
  return res
}

export const expensesDetailAdd = async (params: any) => {
  const res: any = await request('/expensesDetail/add', 'POST', params)
  return res
}

export const expensesDetailEdit = async (params: any) => {
  const res: any = await request('/expensesDetail/edit', 'POST', params)
  return res
}
