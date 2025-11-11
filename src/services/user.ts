/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-04 08:33:16
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-11 14:47:17
 * @FilePath: \wanWanApp\src\services\user.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/services/request'

const login = async (params: any) => {
  const res: any = await request('/login', 'POST', params)
  return res
}

export { login }
