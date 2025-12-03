/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 11:02:33
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-03 13:58:36
 * @FilePath: \wanWanApp\src\services\log.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/services/request'

export const operationLog = async (params: any) => {
  const res: any = await request('/operation-logs', 'GET', params)
  return res
}

export const operationDelete = async (id: number) => {
  const res: any = await request(`/operation-logs/${id}`, 'DELETE')
  return res
}
