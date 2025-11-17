/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-11-17 14:24:46
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-11-17 14:29:33
 * @FilePath: \wanWanApp\src\pages\chart\types.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
export interface FormData {
  startDate: string
  endDate: string
  [key: string]: string | number | Record<string, any>[] | undefined | null | any
}

export interface SelectedItem {
  date: string
  info: string
  data?: {
    custom: string
    name: string
  }
}

export interface Info {
  lunar: boolean
  range: boolean
  insert: boolean
  selected: SelectedItem[]
}
