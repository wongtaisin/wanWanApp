/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-04 08:33:16
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-16 11:04:28
 * @FilePath: \wanWanApp\src\services\user.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/api/request'

export const login = async (params: any) => {
  const res: any = await request('/login/signIn', 'POST', params)
  return res
}

export const userInfo = async () => {
  const res: any = await request('/user/userInfo', 'GET')
  return res
}
