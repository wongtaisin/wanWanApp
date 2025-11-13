/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 11:02:33
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-13 10:40:20
 * @FilePath: \wanWanApp\src\services\shop.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/services/request'

const shopAll = async () => {
  const res: any = await request('/shop/all', 'GET')
  return res
}

const shopAdd = async (params: any) => {
  const res: any = await request('/shop/add', 'POST', params)
  return res
}

const shopList = async (params: any) => {
  const res: any = await request('/shop/list', 'POST', params)
  return res
}

const shopEdit = async (params: any) => {
  const res: any = await request('/shop/edit', 'POST', params)
  return res
}

const shopDelete = async (id: any) => {
  const res: any = await request(`/shop/delete/${id}`, 'DELETE')
  return res
}

export { shopAdd, shopAll, shopDelete, shopEdit, shopList }
