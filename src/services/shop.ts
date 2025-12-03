/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 11:02:33
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-03 13:55:37
 * @FilePath: \wanWanApp\src\services\shop.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/services/request'

export const shopAll = async () => {
  const res: any = await request('/shop/all', 'GET')
  return res
}

export const shopAdd = async (params: any) => {
  const res: any = await request('/shop/add', 'POST', params)
  return res
}

export const shopList = async (params: any) => {
  const res: any = await request('/shop/list', 'POST', params)
  return res
}

export const shopEdit = async (params: any) => {
  const res: any = await request('/shop/edit', 'POST', params)
  return res
}

export const shopDelete = async (id: any) => {
  const res: any = await request(`/shop/delete/${id}`, 'DELETE')
  return res
}
