/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-10 11:02:33
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-14 16:41:54
 * @FilePath: \wanWanApp\src\services\common.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { request } from '@/api/request'

const areaData = async () => {
  const res: any = await request('/common/areaData', 'GET')
  return res
}

export { areaData }
